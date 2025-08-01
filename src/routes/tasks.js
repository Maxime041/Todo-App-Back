const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Get /api/tasks
router.get('/', async function (req, res, next) {
  try {
    const tasks = await Task.find();
    res.json({ result: true, tasks: tasks });
  } catch (error) {
    next(error);
  }
});

// Get /api/tasks/:id
router.get('/:id', async function (req, res, next) {
  try {
    const task = await Task.findOne({ id: req.params.id });
    if (task) {
      res.json({ result: true, task: task });
    } else {
      res.json({ result: false, error: "Tâche non trouvée" });
    }
  } catch (error) {
    next(error);
  }
});

// Post /api/tasks
router.post('/', async function (req, res, next) {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 'todo'
    });
    await task.save();
    res.json({ result: true, task: task });
  } catch (error) {
    next(error);
  }
});

// Put /api/tasks/:id
router.put('/:id', async function (req, res, next) {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
      },
      { new: true }
    );
    if (updatedTask) {
      res.json({ result: true, message: "Tâche mise à jour !", task: updatedTask });
    } else {
      res.json({ result: false, error: "Tâche non trouvée" });
    }
  } catch (error) {
    next(error);
  }
});

// Delete /api/tasks/:id
router.delete('/:id', async function (req, res, next) {
  try {
    const deletedTask = await Task.findOneAndDelete({ id: req.params.id });
    if (deletedTask) {
      res.json({ result: true, message: "Tâche supprimée !" });
    } else {
      res.json({ result: false, error: "Tâche non trouvée" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;