# Set Up the Backend

## Navigate to the backend folder.
```
cd backend
```

## Install the required dependencies.

```
npm install
```

### Create a .env file in the root of the backend folder and add the following environment variables:

```
MONGO_URI=your-mongodb-connection-uri
JWT_SECRET=your-secret-key
CLOUDINARY_URL=your-cloudinary-url
PORT=8081
```
Start the backend server.
```
npm start
```

The backend server will run on http://localhost:8081.
