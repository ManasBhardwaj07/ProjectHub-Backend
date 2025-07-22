import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Socket.io setup with CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// ✅ Attach io to app for controller access
app.set('io', io);

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', taskRoutes);

// ✅ Socket.io Events
io.on('connection', (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`);

  // ✅ Project Events - broadcast to others
  socket.on('project:create', (project) => {
    socket.broadcast.emit('project:created', project);
  });

  socket.on('project:update', (project) => {
    socket.broadcast.emit('project:updated', project);
  });

  socket.on('project:delete', (projectId) => {
    socket.broadcast.emit('project:deleted', projectId);
  });

  // ✅ Task Events - broadcast to others
  socket.on('task:create', (task) => {
    socket.broadcast.emit('task:created', task);
  });

  socket.on('task:update', (task) => {
    socket.broadcast.emit('task:updated', task);
  });

  socket.on('task:delete', (taskId) => {
    socket.broadcast.emit('task:deleted', taskId);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
});

// ✅ Connect MongoDB and Start Server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });