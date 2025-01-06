# Blog Post API

## Overview
This API allows users to manage blog posts, including user authentication and post management. It provides endpoints to register users, log in, and perform CRUD operations on blog posts.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- body-parser
- cookie-parser
- express-session
- connect-mongo

## Installation
1. Clone the repository
    ```sh
    git clone https://github.com/yourusername/yourrepository.git
    ```
2. Navigate to the project directory
    ```sh
    cd yourrepository
    ```
3. Install the dependencies
    ```sh
    npm install
    ```
4. Set up the environment variables (create a `.env` file in the root directory)
    ```
    MONGODB_URI=mongodb://localhost:27017/session
    JWT_SECRET=your_jwt_secret
    SESSION_SECRET=your_session_secret
    ```

## Usage
1. Start the server
    ```sh
    npm start
    ```
2. The server will be running on `http://localhost:3000`

## Endpoints

### Authentication
- **Register**
    ```
    POST /api/v1/auth/register
    ```
    Request Body:
    ```json
    {
        "username": "your_username",
        "email": "your_email",
        "password": "your_password"
    }
    ```

- **Login**
    ```
    POST /api/v1/auth/login
    ```
    Request Body:
    ```json
    {
        "email": "your_email",
        "password": "your_password"
    }
    ```

- **Get Account Details**
    ```
    GET /api/v1/auth/account/:id
    ```
    URL Parameter:
    - `id`: User ID

### Blog Posts
- **Get All Posts**
    ```
    GET /api/v1/post
    ```

- **Get Post by ID**
    ```
    GET /api/v1/post/:id
    ```
    URL Parameter:
    - `id`: Post ID

- **Get Posts by User**
    ```
    GET /api/v1/post/userspost/:id
    ```
    URL Parameter:
    - `id`: User ID

- **Create a Post**
    ```
    POST /api/v1/post
    ```
    Request Body:
    ```json
    {
        "title": "Post Title",
        "content": "Post Content",
        "author": "User ID"
    }
    ```

- **Update a Post**
    ```
    PATCH /api/v1/post/:id
    ```
    URL Parameter:
    - `id`: Post ID
    Request Body:
    ```json
    {
        "title": "Updated Title",
        "content": "Updated Content"
    }
    ```

- **Delete a Post**
    ```
    DELETE /api/v1/post/:id
    ```
    URL Parameter:
    - `id`: Post ID

## Middleware
- **verifyToken**: Middleware for verifying JWT tokens.

## Database
The MongoDB database is used for storing user and post data. Ensure MongoDB is running and properly configured in your environment.

## Error Handling
The API provides meaningful error messages for various error conditions.

## License
This project is licensed under the MIT License.

