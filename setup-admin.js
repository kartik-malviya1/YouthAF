import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, 'data', 'users.json');

async function createAdminUser() {
  try {
    // Ensure data directory exists
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    
    // Read existing users or create empty array
    let users = [];
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      users = JSON.parse(data);
    } catch {
      // File doesn't exist, create empty array
      users = [];
    }
    
    // Check if admin already exists
    const existingAdmin = users.find(u => u.email === 'admin@youthaid.com');
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = {
      id: Date.now().toString(),
      email: 'admin@youthaid.com',
      password: hashedPassword,
      isAdmin: true,
      createdAt: new Date().toISOString()
    };
    
    users.push(adminUser);
    
    // Save users
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@youthaid.com');
    console.log('Password: admin123');
    console.log('Please change the password after first login.');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();
