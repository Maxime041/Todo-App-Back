const { DataTypes } = require('sequelize');

function defineTaskModel(sequelize) {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('todo', 'in-progress', 'done'),
      defaultValue: 'todo',
      allowNull: false
    }
  }, {
    timestamps: true,
    tableName: 'tasks'
  });
  return Task;
}

module.exports = defineTaskModel;