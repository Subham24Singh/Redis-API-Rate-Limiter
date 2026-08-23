# Redis API Rate Limiter

A scalable REST API built with Node.js, Express, MongoDB, and Redis implementing distributed rate limiting and load testing.

## Prerequisites

Make sure the following are installed:

* Node.js (v18 or later)
* MongoDB
* Redis Server
* Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Subham24Singh/redis-api-rate-limiter.git
cd redis-api-rate-limiter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 4. Start MongoDB

```bash
mongod
```

### 5. Start Redis Server

```bash
redis-server
```

### 6. Run the Application

```bash
node app.js
```

The server will start on:

```text
http://localhost:3000
```

## API Endpoints

### Get Songs

```http
GET /api/songs
```

### Add Song

```http
POST /api/songs
```

## Rate Limiting

* Maximum 5 requests per minute per IP
* Returns HTTP 429 when limit is exceeded

## Performance Testing

Run benchmark:

```bash
node benchmark.js
```

This executes load testing using Autocannon and displays:

* Request throughput
* Average latency
* Response percentiles
* Error statistics

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Redis (ioredis)
* Autocannon
