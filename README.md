# Builder Module Project

A personal educational project to learn and implement enterprise-level architecture patterns. This project demonstrates a Builder Module system with separate admin and user interfaces.

## 🎯 Project Purpose

This is a learning exercise to understand:
- Enterprise architecture patterns
- Full-stack development best practices
- Scalable system design
- Authentication and authorization flows
- Modern development workflows

## 🛠️ Tech Stack

### Backend
- Node.js (18+)
- Express
- PostgreSQL with Sequelize/Knex
- Redis for caching
- KafkaJS for event streaming
- JWT authentication
- Winston for logging
- Prometheus metrics

### Frontend
- React + Vite
- React Router
- React Query
- Material UI / Tailwind CSS
- TypeScript

### Testing & Quality
- Jest + Supertest (Backend)
- Vitest + React Testing Library (Frontend)
- ESLint + Prettier

### DevOps
- Docker & Docker Compose
- CI/CD with Jenkins/GitHub Actions

## 🏗️ Current Progress

- ✅ Basic authentication system
- ✅ User management
- ✅ Admin controls
- ✅ JWT implementation

## 🚀 Getting Started

1. Clone the repository
```sh
git clone <repository-url>
```

2. Install dependencies
```sh
npm install
```

3. Set up the environment variables
```sh
cp .env.example .env
# Update .env with your configuration
```

4. Run the application
```sh
npm run dev
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### User Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/user/register` | Register new user |
| POST | `/auth/user/login` | User login |
| POST | `/auth/user/logout` | User logout |
| GET | `/auth/user/profile` | Get user profile |

#### Admin Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/admin/register` | Register new admin |
| POST | `/auth/admin/login` | Admin login |
| POST | `/auth/admin/logout` | Admin logout |
| GET | `/auth/admin/dashboard` | Get admin dashboard |

### Request & Response Examples

#### User Registration
```json
// Request
POST /api/auth/user/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}

// Response
{
  "status": "success",
  "message": "User registered successfully",
  "userId": "123456"
}
```

#### User Login
```json
// Request
POST /api/auth/user/login
{
  "email": "john@example.com",
  "password": "securePassword123"
}

// Response
{
  "status": "success",
  "token": "eyJhbGciOiJ...",
  "user": {
    "id": "123456",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Authentication
All protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Error Responses
```json
{
  "status": "error",
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

Common Error Codes:
- `AUTH_001`: Invalid credentials
- `AUTH_002`: Token expired
- `AUTH_003`: Invalid token
- `VAL_001`: Validation error