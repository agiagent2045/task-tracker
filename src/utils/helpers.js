// Constants
export const TASK_STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export const TASK_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

// Helper functions
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getStatusColor = (status) => {
  const colors = {
    [TASK_STATUS.TODO]: 'gray',
    [TASK_STATUS.IN_PROGRESS]: 'blue',
    [TASK_STATUS.DONE]: 'green',
  };
  return colors[status] || 'gray';
};

export const getPriorityColor = (priority) => {
  const colors = {
    [TASK_PRIORITY.LOW]: 'green',
    [TASK_PRIORITY.MEDIUM]: 'yellow',
    [TASK_PRIORITY.HIGH]: 'red',
  };
  return colors[priority] || 'gray';
};

export const filterTasksByStatus = (tasks, status) => {
  return tasks.filter((task) => task.status === status);
};

export const sortTasksByPriority = (tasks) => {
  const priorityOrder = {
    [TASK_PRIORITY.HIGH]: 1,
    [TASK_PRIORITY.MEDIUM]: 2,
    [TASK_PRIORITY.LOW]: 3,
  };
  return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};
