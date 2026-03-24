# Backend Setup Guide

This application now uses a backend API instead of localStorage for data persistence.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Admin User
```bash
npm run setup-admin
```
This creates an admin user with:
- Email: admin@youthaid.com
- Password: admin123

### 3. Start the Backend Server
```bash
npm run server
```
The server will run on http://localhost:5000

### 4. Start the Frontend
In a separate terminal:
```bash
npm run dev
```
The frontend will run on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/register` - Register new user

### Media
- `GET /api/media` - Get all media items
- `POST /api/media` - Create new media item (admin only)
- `PUT /api/media/:id` - Update media item (admin only)
- `DELETE /api/media/:id` - Delete media item (admin only)

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create new member (admin only)
- `PUT /api/members/:id` - Update member (admin only)
- `DELETE /api/members/:id` - Delete member (admin only)

## Data Storage

Data is stored in JSON files in the `data/` directory:
- `data/users.json` - User accounts
- `data/media.json` - Media content (blogs, news)
- `data/members.json` - Member information

## Environment Variables

Create a `.env` file in the root directory:
```
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## Security Notes

- Change the default admin password after first login
- Use a strong JWT_SECRET in production
- The API uses JWT tokens for authentication
- Admin-only routes are protected

## Migration from localStorage

The application has been migrated from localStorage to a backend API:
- ✅ Authentication now uses JWT tokens
- ✅ Media data is stored on the server
- ✅ Member data is stored on the server
- ✅ Admin permissions are enforced on the backend
- ✅ Error handling and loading states added

## Development

The backend uses Express.js with:
- ES modules (import/export)
- JSON file storage (easy for development)
- JWT authentication
- CORS enabled for frontend development
- bcryptjs for password hashing
