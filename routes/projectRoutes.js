import express from 'express';
import Project from '../models/Project.js';
import { createProject, } from '../controllers/projectController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // ✅ required

const router = express.Router();

router.post('/', authMiddleware, createProject); // Secure project creation

// Get all projects
router.get('/', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Error fetching user projects:', err);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});


// Update project
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating project' });
  }
});

// Delete project
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

export default router;