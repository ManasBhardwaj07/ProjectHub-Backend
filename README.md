# 📦 ProjectHub – Backend

This is the **backend server** for **ProjectHub**, a powerful real-time collaboration platform built with the **MERN stack**, secured by **JWT Authentication**, and supports password resets via **Gmail SMTP**.

---

## 🚀 Features

- 🔐 User Registration & Login (JWT-based Auth)
- 🔁 Real-time sync for Projects & Tasks via **Socket.IO**
- 🛠️ Project and Task CRUD (Kanban support)
- ✉️ Password Reset via Email (secure token-based links)
- ☁️ MongoDB Atlas for cloud database

---

## ⚙️ Tech Stack

- **Node.js**, **Express**
- **MongoDB Atlas**, **Mongoose**
- **JWT** for Authentication
- **bcryptjs** for Password Hashing
- **nodemailer** for Email Support
- **Socket.IO** for WebSocket communication
- **dotenv** for environment config

---

## 🌐 Base API Endpoint

```
http://localhost:5000/api
```

---

## 🔐 Environment Variables (`.env`)

### For **local development**:

```env
PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@projecthub.mongodb.net/?retryWrites=true&w=majority

JWT_SECRET=your_jwt_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

FRONTEND_URL=http://localhost:5173
```




---

## 💻 Local Development

1. Clone the repository:

```bash
git clone https://github.com/ManasBhardwaj07/ProjectHub-Backend.git
cd ProjectHub-Backend
```

2. Create a `.env` file using the template above.

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
nodemon server.js
```

🔗 Backend will be available at:  
**`http://localhost:5000`**

---

## 🚀 Deployment (Render)

1. Go to [render.com](https://render.com)

2. Create a new **Web Service**

3. Connect your GitHub repo

4. Add the `.env` variables to **Render → Environment Settings**

5. Set the following settings:

```
Build Command:   npm install
Start Command:   node server.js
Port:            10000
```

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
