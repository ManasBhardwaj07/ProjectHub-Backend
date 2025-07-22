// models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['todo', 'in progress', 'done'],
        default: 'todo',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    dueDate: {
  type: Date,
},


});

export default mongoose.model('Task', taskSchema);