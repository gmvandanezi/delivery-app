> # React-Node Delivery App 

Welcome to the delivery app. This application works as an online ordering service. It's built using React for the frontend and Node.js with Prisma for the backend.

## Getting Started 🚀

Prerequisites:
Node.js and npm installed on your machine.
An account on ElephantSQL for the database.

# Setting Up:

Clone the Repository:
```
git clone https://github.com/gmvandanezi/delivery-app.git
```
```
cd my-recipe-app
```

## Setting up the Backend:

Navigate to the backend directory:
```
cd backend
```

Install the necessary packages:
```
npm install
```

ElephantSQL Setup:
Create a new database instance on ElephantSQL.
Copy the connection string provided by ElephantSQL.

Prisma Setup:
Replace the DATABASE_URL in the .env file with your ElephantSQL connection string.

Initialize Prisma and generate the Prisma client:
```
npx prisma init
```
```
npx prisma generate
```

Start the backend server:
```
npm start
```

## Setting up the Frontend:

Navigate to the frontend directory:
```
cd frontend
```

Install the necessary packages:
```
npm install
```

Start the frontend development server:
```
npm run dev
```

