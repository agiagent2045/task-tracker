const AnalyticsPanel = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600">4</p>
        </div>
      </div>
      <div className="mt-6 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Chart visualization will be displayed here</p>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
