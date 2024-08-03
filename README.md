# Next.js CRUD Application - For a Blogging Application

A robust API built to handle single and multiple document queries over distinct endpoints using Next.js and Prisma ORM, deployed on an EC2 machine with CI/CD enabling seamless CRUD operations.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)

## Features

- CRUD operations for managing documents
- Single and multiple document queries
- Distinct endpoints for various operations
- Dockerized application for easy deployment
- CI/CD pipeline for automated deployment
- Deployed on EC2 for scalability and reliability

## Technologies Used

- Next.js
- Prisma ORM
- PostgreSQL
- Docker
- GitHub Actions (CI/CD)
- AWS EC2

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm
- Docker
- Git

### Installation

1. Clone the repository.
   ```bash
   git clone https://github.com/kvardaan/Next.js-CRUD-Application.git
   cd nextjs-crud-application
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Set up environment variables. Create a `.env` file in the root directory and add the following -
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/blog-app"
   NODE_ENV=development
   ```
4. Run Prisma migrations -
   ```bash
   npm run db:migrate
   ```
5. Seed the database -
   ```bash
   npm run db:seed
   ```

## Usage

To run the application locally -

```bash
npm run dev
```

To watch the database -

```bash
npm run db:watch
```

The application will be available at `http://localhost:3000`.

## API Endpoints

### Users

- POST /api/v1/users/ - Add a new user
- PATCH /api/v1/users/:id - Edit user information
- DELETE /api/v1/users/:id - Delete a user
- GET /api/v1/users/:id - Get user details by ID

### User Profiles

- POST /api/v1/users/profiles/ - Add a user profile
- PATCH /api/v1/users/profiles/ - Edit user profile

### Blogs

- POST /api/v1/blogs/ - Add a new blog post
- PATCH /api/v1/blogs/:id - Edit a blog post
- DELETE /api/v1/blogs/:id - Delete a blog post
- GET /api/v1/blogs/:id - Get blog post details by ID

Note: Replace `:id` with the actual ID of the user or blog post when making requests.

The application will be available at `http://localhost:3000`. All endpoints are prefixed with it for local development.

## CI/CD Pipeline

This project uses GitHub Actions for CI/CD. The pipeline -

1. Runs tests on every push and pull request
2. Builds a Docker image
3. Deploys to EC2 on successful builds of the main branch

## Deployment

The application is automatically deployed to AWS EC2 through the CI/CD pipeline.

---

> [!NOTE]  
> Suggestions are welcomed for additional endpoints or improvements to the existing API structure. If you have ideas for enhancing the functionality or user experience, please feel free to open an issue or submit a pull request.
