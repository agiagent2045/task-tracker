import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import AnalyticsPanel from '../components/AnalyticsPanel';

const Dashboard = () => {
  // Dummy data for demonstration
  const dummyTasks = [
    {
      id: 1,
      title: 'Design Homepage',
      status: 'In Progress',
      description: 'Create wireframes and mockups for the new homepage design',
      priority: 'High'
    },
    {
      id: 2,
      title: 'API Integration',
      status: 'To Do',
      description: 'Integrate REST API endpoints for user authentication',
      priority: 'High'
    },
    {
      id: 3,
      title: 'Write Documentation',
      status: 'In Progress',
      description: 'Document all API endpoints and usage examples',
      priority: 'Medium'
    },
    {
      id: 4,
      title: 'Code Review',
      status: 'Done',
      description: 'Review pull requests from team members',
      priority: 'Low'
    },
    {
      id: 5,
      title: 'Database Migration',
      status: 'To Do',
      description: 'Migrate database schema to latest version',
      priority: 'High'
    },
    {
      id: 6,
      title: 'Bug Fixes',
      status: 'Done',
      description: 'Fix reported bugs in the user profile section',
      priority: 'Medium'
    }
  ];

  const tasksByStatus = {
    'To Do': dummyTasks.filter(task => task.status === 'To Do'),
    'In Progress': dummyTasks.filter(task => task.status === 'In Progress'),
    'Done': dummyTasks.filter(task => task.status === 'Done')
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        
        {/* Analytics Panel */}
        <div className="mb-8">
          <AnalyticsPanel />
        </div>
        
        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(tasksByStatus).map(([status, tasks]) => (
            <div key={status} className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                {status}
                <span className="ml-2 bg-gray-300 text-gray-700 text-xs rounded-full px-2 py-1">
                  {tasks.length}
                </span>
              </h2>
              <div className="space-y-4">
                {tasks.length > 0 ? (
                  tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <div className="text-gray-500 text-sm text-center py-8">
                    No tasks in this column
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
