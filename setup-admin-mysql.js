import bcrypt from 'bcryptjs';
import pool from './config/database.js';

async function createAdminUser() {
  try {
    // Test database connection first
    const connected = await pool.testConnection();
    if (!connected) {
      console.error('❌ Cannot connect to database');
      globalThis.process?.exit(1);
    }

    // Initialize tables
    await pool.initializeDatabaseTables();

    // Check if admin already exists
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      ['admin@youthaid.com']
    );

    if (existing.length > 0) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminId = Date.now().toString();

    await pool.execute(
      'INSERT INTO users (id, email, password, isAdmin) VALUES (?, ?, ?, ?)',
      [adminId, 'admin@youthaid.com', hashedPassword, true]
    );

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@youthaid.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️  Please change the password after first login.');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    // Close the pool
    await pool.end();
  }
}

createAdminUser();
