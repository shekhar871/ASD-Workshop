# ASD Workshop - Express.js API with In-Memory Caching

A simple RESTful Product API built with Node.js and Express that demonstrates in-memory caching and cache invalidation strategies.

## Overview

This project was built during the ASD workshop to practice backend architecture and caching. It implements a layered architecture (Routes -> Controllers -> Services -> Database layer) and includes a custom in-memory caching middleware with time-to-live (TTL) and cache invalidation on write operations.

## Features

- **CRUD Operations**: Complete product management (GET, POST, PUT, PATCH, DELETE).
- **In-Memory Cache**: Custom middleware caching GET responses with a 60-second TTL.
- **Cache Invalidation**: Automatically clears relevant cache keys when products are created, updated, or deleted so data stays fresh.
- **File-based Storage**: Persists data using a local `db.json` file.

## Project Structure

```text
├── controllers/
│   └── productController.js   # Handles requests, caching & cache invalidation
├── database/
│   ├── db.json               # JSON database file
│   └── productDatabase.js    # File system read/write operations
├── middleware/
│   └── cache.js              # In-memory cache middleware & helpers (TTL: 60s)
├── routes/
│   └── productRoutes.js      # API route definitions
├── services/
│   └── productService.js     # Business logic & CRUD operations
├── package.json
└── server.js                 # App entry point (port 3000)
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shekhar871/ASD-Workshop.git
   cd ASD-Workshop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   *The server will run on `http://localhost:3000` with nodemon.*

## API Endpoints

| Method | Endpoint | Description | Cache Behavior |
|---|---|---|---|
| `GET` | `/products` | Get all products | Cached (60s TTL) |
| `GET` | `/products/:id` | Get product by ID | Cached (60s TTL) |
| `POST` | `/products` | Create a new product | Invalidates `/products` cache |
| `PUT` | `/products/:id` | Replace existing product | Invalidates list & item cache |
| `PATCH` | `/products/:id` | Update product fields | Invalidates list & item cache |
| `DELETE` | `/products/:id` | Delete product by ID | Invalidates list & item cache |

### Sample Payloads

**Create Product (`POST /products`):**
```json
{
  "name": "Wireless Mouse",
  "price": 29.99
}
```

**Update Product (`PATCH /products/:id`):**
```json
{
  "price": 24.99
}
```

## How Caching Works

1. When a `GET` request is made, `cacheMiddleware` checks if data exists in memory and is under the 60-second TTL.
2. If found (Cache Hit), it immediately returns the cached data without hitting the service/db layer.
3. If not found (Cache Miss), the request proceeds, reads from `db.json`, and saves the result to the cache.
4. On any write operation (`POST`, `PUT`, `PATCH`, `DELETE`), specific cache keys are removed (`deleteCache`) to prevent stale data.
