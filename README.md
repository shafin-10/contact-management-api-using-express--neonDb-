# Contact Management API

A RESTful Contact Management API built with **Node.js, Express.js, TypeScript, and Neon PostgreSQL**. This project was developed as a hands-on learning project to practice TypeScript, backend development, REST API design, and relational database operations.

## 🚀 Technologies Used

- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend web framework
- **TypeScript** – Static typing and improved code maintainability
- **PostgreSQL** – Relational database
- **Neon Database** – Serverless PostgreSQL hosting
- **pg** – PostgreSQL client for Node.js
- **tsx** – TypeScript execution and development watch mode
- **dotenv** – Environment variable management

## ✨ Features

- Create new contact messages
- Retrieve all contact messages
- Retrieve a specific contact by ID
- Update existing contact information
- Delete contact messages
- Parameterized SQL queries to help prevent SQL injection
- Automatic table creation during application initialization
- Environment-based database configuration
- JSON-based API responses
- Error handling for database operations

## 📁 Project Structure
```text
contact-management-api-using-express--neonDb/
│
├── src/
│   ├── config/
│   │   └── index.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository
```bash
git clone https://github.com/shafin-10/contact-management-api-using-express--neonDb.git
```

### 2. Navigate to the project directory
```bash
cd contact-management-api-using-express--neonDb
```

### 3. Install dependencies
```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:
```env
PORT=5000
DATABASE_URL=your_neon_postgresql_connection_string
```

Replace the database URL with your Neon PostgreSQL connection string. Make sure the environment variable names match those used in your configuration file.

### 5. Run the development server
```bash
npm run dev
```

The server will start at:
```text
http://localhost:5000
```

## 📡 API Endpoints

Base URL: `http://localhost:5000/api/v1`

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| POST   | `/contacts`     | Create a new contact     |
| GET    | `/contacts`     | Retrieve all contacts    |
| GET    | `/contacts/:id` | Retrieve a contact by ID |
| PUT    | `/contacts/:id` | Update a contact         |
| DELETE | `/contacts/:id` | Delete a contact         |

### 1. Create a Contact

**POST** `/contacts`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a potential project."
}
```

### 2. Get All Contacts

**GET** `/contacts`

Returns a list of all contact messages.

### 3. Get Contact by ID

**GET** `/contacts/1`

Returns the contact associated with the specified ID.

### 4. Update Contact

**PUT** `/contacts/1`

Request body:
```json
{
  "name": "John Smith",
  "subject": "Updated Project Inquiry"
}
```

The update query uses PostgreSQL's `COALESCE()` function to preserve existing values when fields are omitted.

### 5. Delete Contact

**DELETE** `/contacts/1`

Deletes the contact associated with the specified ID.

## 🗄️ Database Schema

The application automatically creates the `contacts` table if it does not already exist.

| Column     | Data Type    | Description               |
| ---------- | ------------ | ------------------------- |
| id         | SERIAL       | Primary key               |
| name       | VARCHAR(255) | Contact name              |
| email      | VARCHAR(255) | Contact email             |
| subject    | VARCHAR(255) | Message subject           |
| message    | TEXT         | Contact message           |
| created_at | TIMESTAMPTZ  | Record creation timestamp |
| updated_at | TIMESTAMPTZ  | Record update timestamp   |

## 🎯 Learning Objectives

Through this project, I practiced:

- Setting up an Express.js application with TypeScript
- Working with asynchronous JavaScript and `async/await`
- Handling HTTP requests and responses
- Implementing RESTful CRUD operations
- Connecting Node.js applications to PostgreSQL
- Executing parameterized SQL queries using `pg`
- Managing environment variables
- Handling errors and HTTP status codes
- Working with a cloud-hosted PostgreSQL database using Neon

## 👨‍💻 Author

**Shafin Shahriar**

- GitHub: [shafin-10](https://github.com/shafin-10)
- LinkedIn: [shafin-shahriar](https://www.linkedin.com/in/shafin-shahriar/)
- Email: [shafinshahriar2001@gmail.com](mailto:shafinshahriar2001@gmail.com)

---

⭐ If you find this project useful, feel free to explore the repository!
