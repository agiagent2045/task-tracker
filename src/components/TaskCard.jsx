const TaskCard = ({ task }) => {
  const { title, status, description, priority } = task || {
    title: 'Sample Task',
    status: 'In Progress',
    description: 'This is a sample task description',
    priority: 'Medium'
  };

  const statusColors = {
    'To Do': 'bg-gray-200 text-gray-800',
    'In Progress': 'bg-blue-200 text-blue-800',
    'Done': 'bg-green-200 text-green-800'
  };

  const priorityColors = {
    'Low': 'border-l-4 border-green-500',
    'Medium': 'border-l-4 border-yellow-500',
    'High': 'border-l-4 border-red-500'
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition ${priorityColors[priority] || 'border-l-4 border-gray-500'}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-200 text-gray-800'}`}>
          {status}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Priority: {priority}</span>
      </div>
    </div>
  );
};

export default TaskCard;
