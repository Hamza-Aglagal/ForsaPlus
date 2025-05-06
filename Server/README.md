# ForsaPlus Backend API

This is the backend API for the ForsaPlus mobile application.

## Setup

1. Make sure MongoDB is installed and running
2. Install dependencies:
   ```
   npm install
   ```
3. Create a .env file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/forsaplus
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```
4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

#### Register a new user
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "userType": "university",
    "interests": ["technology", "education"]
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "userType": "university",
      "interests": ["technology", "education"]
    }
  }
  ```

#### Login user
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "userType": "university",
      "interests": ["technology", "education"]
    }
  }
  ```

#### Get current user
- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Headers**: 
  ```
  Authorization: Bearer jwt_token_here
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "userType": "university",
      "interests": ["technology", "education"],
      "profileImage": ""
    }
  }
  ```

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Successfully created
- 400: Bad request (validation error)
- 401: Unauthorized
- 403: Forbidden
- 500: Server error 