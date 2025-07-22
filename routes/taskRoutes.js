// routes/taskRoutes.js
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/projects/:projectId/tasks', authMiddleware, getTasksByProject);
router.post('/projects/:projectId/tasks', authMiddleware, createTask);
router.put('/tasks/:taskId', authMiddleware, updateTask);
router.delete('/tasks/:taskId', authMiddleware, deleteTask);

export default router;