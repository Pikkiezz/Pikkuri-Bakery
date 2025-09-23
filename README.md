# Mini E-commerce Full Stack App

A full-stack e-commerce application built with Next.js (frontend) and Elysia (backend).

## Project Structure

```
├── frontend/          # Next.js frontend application
├── server/            # Elysia backend API server
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context

### Backend
- **Framework**: Elysia
- **Language**: TypeScript
- **Database**: MySQL with Prisma ORM
- **Runtime**: Bun

## Getting Started

### Prerequisites
- Node.js 18+
- Bun (for backend)
- MySQL database

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd mini-ecommerce
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../server
bun install
```

4. Set up environment variables
```bash
# Copy .env.example to .env in server folder
cp server/.env.example server/.env
```

5. Set up database
```bash
cd server
npx prisma generate
npx prisma db push
```

### Running the Application

1. Start the backend server
```bash
cd server
bun run start
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Endpoints

- Products: `/api/v1/products`
- Users: `/api/v1/users`
- Cart: `/api/v1/cart`
- Orders: `/api/v1/orders`
- Reviews: `/api/v1/reviews`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a Pull Request
