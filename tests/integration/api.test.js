//api.test.js
require('dotenv').config();

describe('API Integration Tests', () => {
  const API_URL = process.env.API_URL;

  describe('Health Check', () => {
    test("API at '/health' says ok", async () => {
      const promise = await fetch(`${API_URL}/health`);
      const data = await promise.json();
      
      console.log(data);
      expect(data).toMatchObject({ 
        status: 'ok'
      });
    });
  });

  describe('Tasks API', () => {
    test("GET '/api/tasks' returns tasks list", async () => {
      const promise = await fetch(`${API_URL}/api/tasks`);
      const data = await promise.json();
      
      console.log(data);
      expect(data).toMatchObject({
        result: true,
        tasks: expect.any(Array)
      });
    });

    test("POST '/api/tasks' creates a new task", async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'todo'
      };

      const promise = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });
      const data = await promise.json();
      
      console.log(data);
      expect(data).toMatchObject({
        result: true,
        task: expect.objectContaining({
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          id: expect.any(String)
        })
      });
    });

    test("GET '/api/tasks/:id' returns specific task", async () => {
      const createPromise = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Task pour GET :id test',
          description: 'Test Description'
        })
      });
      const createData = await createPromise.json();
      const taskId = createData.task.id;
      
      const promise = await fetch(`${API_URL}/api/tasks/${taskId}`);
      const data = await promise.json();
      
      console.log(data);
      expect(data).toMatchObject({
        result: true,
        task: expect.objectContaining({
          id: taskId,
          title: 'Task pour GET :id test',
        })
      });
    });

    test("PUT '/api/tasks/:id' updates a task", async () => {
      
      const createPromise = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Task à update',
          description: 'description',
          status: 'todo'
        })
      });
      const createData = await createPromise.json();
      const taskId = createData.task.id;
      
      const updateData = {
        title: 'Updated Task',
        description: 'Updated description',
        status: 'in-progress'
      };

      const promise = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      const data = await promise.json();
      
      console.log(data);
      expect(data).toMatchObject({
        result: true,
        message: "Tâche mise à jour !",
        task: expect.objectContaining({
          title: updateData.title,
          description: updateData.description,
          status: updateData.status
        })
      });
    });

    test("DELETE '/api/tasks/:id' deletes a task", async () => {
      
      const createPromise = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Task à supprimer',
          description: 'description',
          status: 'todo'
        })
      });
      const createData = await createPromise.json();
      const taskId = createData.task.id;
      
      const promise = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE'
      });
      const data = await promise.json();
      
      console.log(data);
      expect(data).toMatchObject({
        result: true,
        message: "Tâche supprimée !"
      });
    });

    test("GET '/api/tasks/:id' returns error for non-existent task", async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';
      
      const promise = await fetch(`${API_URL}/api/tasks/${fakeId}`);
      const data = await promise.json();
      
      console.log(data);
      expect(data).toMatchObject({
        result: false,
        error: "Tâche non trouvée"
      });
    });
  });
});
