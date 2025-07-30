// tests/unit/task.test.js
const Task = require('../../src/models/task');

describe('Task Model', () => {
  describe('create', () => {
    it('should create a task with valid data', () => {
      const taskData = {
        title: 'Test task',
        description: 'Test description'
      };

      const task = Task.build(taskData);

      expect(task.title).toBe(taskData.title);
      expect(task.description).toBe(taskData.description);
      expect(task.status).toBe('todo');
      expect(task.id).toBeDefined();
    });

    it('should throw error without title', async () => {
      const task = Task.build({});
      
      await expect(task.validate()).rejects.toThrow('Title is required');
    });
  });
});