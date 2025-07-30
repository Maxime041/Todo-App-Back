const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Task', taskSchema);