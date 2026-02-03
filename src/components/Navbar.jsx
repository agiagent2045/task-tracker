import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold">
              Task Tracker
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/dashboard"
              className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Dashboard
            </Link>
            <Link
              to="/tasks"
              className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Tasks
            </Link>
            <Link
              to="/analytics"
              className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Analytics
            </Link>
            <Link
              to="/"
              className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
