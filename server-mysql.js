import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import pool, { testConnection, initializeDatabaseTables } from './config/database.js';

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get environment variables with fallbacks
const PORT = Number(globalThis.process?.env?.PORT) || 5000;
const JWT_SECRET = globalThis.process?.env?.JWT_SECRET || 'your-secret-key';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
async function initializeDatabase() {
  try {
    const connected = await testConnection();
    if (!connected) {
      console.error('Failed to connect to database');
      globalThis.process?.exit(1);
    }
    
    await initializeDatabaseTables();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    globalThis.process?.exit(1);
  }
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Middleware to check if user is admin
function requireAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// AUTH ROUTES
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    const user = rows[0];
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      user: { id: user.id, email: user.email, isAdmin: user.isAdmin },
      token
    });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, isAdmin = false } = req.body;
    
    // Check if user already exists
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const userId = Date.now().toString();
    await pool.execute(
      'INSERT INTO users (id, email, password, isAdmin) VALUES (?, ?, ?, ?)',
      [userId, email, hashedPassword, isAdmin]
    );

    const token = jwt.sign(
      { id: userId, email: email, isAdmin: isAdmin },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      user: { id: userId, email: email, isAdmin: isAdmin },
      token
    });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// MEDIA ROUTES
app.get('/api/media', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM media ORDER BY date DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Failed to fetch media:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

app.post('/api/media', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { title, content, type, image } = req.body;
    const mediaId = Date.now().toString();
    
    await pool.execute(
      'INSERT INTO media (id, title, content, type, image, date) VALUES (?, ?, ?, ?, ?, NOW())',
      [mediaId, title, content, type, image]
    );
    
    const [newMedia] = await pool.execute(
      'SELECT * FROM media WHERE id = ?',
      [mediaId]
    );
    
    res.status(201).json(newMedia[0]);
  } catch (error) {
    console.error('Failed to create media:', error);
    res.status(500).json({ error: 'Failed to create media' });
  }
});

app.put('/api/media/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type, image } = req.body;
    
    const [result] = await pool.execute(
      'UPDATE media SET title = ?, content = ?, type = ?, image = ? WHERE id = ?',
      [title, content, type, image, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    const [updated] = await pool.execute(
      'SELECT * FROM media WHERE id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Failed to update media:', error);
    res.status(500).json({ error: 'Failed to update media' });
  }
});

app.delete('/api/media/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.execute(
      'DELETE FROM media WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Failed to delete media:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

// MEMBERS ROUTES
app.get('/api/members', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM members ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Failed to fetch members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

app.post('/api/members', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, role, image } = req.body;
    const memberId = Date.now().toString();
    
    await pool.execute(
      'INSERT INTO members (id, name, role, image) VALUES (?, ?, ?, ?)',
      [memberId, name, role, image]
    );
    
    const [newMember] = await pool.execute(
      'SELECT * FROM members WHERE id = ?',
      [memberId]
    );
    
    res.status(201).json(newMember[0]);
  } catch (error) {
    console.error('Failed to create member:', error);
    res.status(500).json({ error: 'Failed to create member' });
  }
});

app.put('/api/members/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, image } = req.body;
    
    const [result] = await pool.execute(
      'UPDATE members SET name = ?, role = ?, image = ? WHERE id = ?',
      [name, role, image, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    const [updated] = await pool.execute(
      'SELECT * FROM members WHERE id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Failed to update member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
});

app.delete('/api/members/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.execute(
      'DELETE FROM members WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Failed to delete member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

// Initialize and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Connected to MySQL database: YAG`);
  });
});
