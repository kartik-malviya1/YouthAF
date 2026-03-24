import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

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

// Data storage paths
const DATA_DIR = path.join(__dirname, 'data');
const MEDIA_FILE = path.join(DATA_DIR, 'media.json');
const MEMBERS_FILE = path.join(DATA_DIR, 'members.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Initialize data directory and files
async function initializeData() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Initialize media.json if it doesn't exist
    try {
      await fs.access(MEDIA_FILE);
    } catch {
    await fs.writeFile(MEDIA_FILE, JSON.stringify([]));
    }
    
    // Initialize members.json if it doesn't exist
    try {
      await fs.access(MEMBERS_FILE);
    } catch {
    await fs.writeFile(MEMBERS_FILE, JSON.stringify([]));
    }
    
    // Initialize users.json if it doesn't exist
    try {
      await fs.access(USERS_FILE);
    } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// Helper functions
async function readData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

async function writeData(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// Authentication middleware
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

// Admin middleware
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
    const users = await readData(USERS_FILE);
    const user = users.find(u => u.email === email);

    if (!user || !await bcrypt.compare(password, user.password)) {
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
    const users = await readData(USERS_FILE);
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      isAdmin,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeData(USERS_FILE, users);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      user: { id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin },
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
    const media = await readData(MEDIA_FILE);
    res.json(media);
  } catch (error) {
    console.error('Failed to fetch media:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

app.post('/api/media', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const media = await readData(MEDIA_FILE);
    const newMedia = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    media.push(newMedia);
    const success = await writeData(MEDIA_FILE, media);
    
    if (success) {
      res.status(201).json(newMedia);
    } else {
      res.status(500).json({ error: 'Failed to save media' });
    }
  } catch (error) {
    console.error('Failed to create media:', error);
    res.status(500).json({ error: 'Failed to create media' });
  }
});

app.put('/api/media/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const media = await readData(MEDIA_FILE);
    const index = media.findIndex(m => m.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    media[index] = { ...media[index], ...req.body, updatedAt: new Date().toISOString() };
    const success = await writeData(MEDIA_FILE, media);
    
    if (success) {
      res.json(media[index]);
    } else {
      res.status(500).json({ error: 'Failed to update media' });
    }
  } catch (error) {
    console.error('Failed to update media:', error);
    res.status(500).json({ error: 'Failed to update media' });
  }
});

app.delete('/api/media/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const media = await readData(MEDIA_FILE);
    const filteredMedia = media.filter(m => m.id !== req.params.id);
    
    if (media.length === filteredMedia.length) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    const success = await writeData(MEDIA_FILE, filteredMedia);
    
    if (success) {
      res.json({ message: 'Media deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete media' });
    }
  } catch (error) {
    console.error('Failed to delete media:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

// MEMBERS ROUTES
app.get('/api/members', async (req, res) => {
  try {
    const members = await readData(MEMBERS_FILE);
    res.json(members);
  } catch (error) {
    console.error('Failed to fetch members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

app.post('/api/members', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const members = await readData(MEMBERS_FILE);
    const newMember = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    members.push(newMember);
    const success = await writeData(MEMBERS_FILE, members);
    
    if (success) {
      res.status(201).json(newMember);
    } else {
      res.status(500).json({ error: 'Failed to save member' });
    }
  } catch (error) {
    console.error('Failed to create member:', error);
    res.status(500).json({ error: 'Failed to create member' });
  }
});

app.put('/api/members/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const members = await readData(MEMBERS_FILE);
    const index = members.findIndex(m => m.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    members[index] = { ...members[index], ...req.body, updatedAt: new Date().toISOString() };
    const success = await writeData(MEMBERS_FILE, members);
    
    if (success) {
      res.json(members[index]);
    } else {
      res.status(500).json({ error: 'Failed to update member' });
    }
  } catch (error) {
    console.error('Failed to update member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
});

app.delete('/api/members/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const members = await readData(MEMBERS_FILE);
    const filteredMembers = members.filter(m => m.id !== req.params.id);
    
    if (members.length === filteredMembers.length) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    const success = await writeData(MEMBERS_FILE, filteredMembers);
    
    if (success) {
      res.json({ message: 'Member deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete member' });
    }
  } catch (error) {
    console.error('Failed to delete member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

// Initialize and start server
initializeData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
