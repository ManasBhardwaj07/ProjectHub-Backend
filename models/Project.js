import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {                      // ✅ changed from 'title' to 'name'
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Project', projectSchema);