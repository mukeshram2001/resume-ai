import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BarChart3, FlaskConical } from 'lucide-react';

const NavigationBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="container mx-auto px-responsive">
        <div className="flex justify-around h-16 items-center">
          <Link to="/app" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/app" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <BarChart3 className="h-6 w-6" />
            <span className="text-xs">Analysis</span>
          </Link>
          <Link to="/lab" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <FlaskConical className="h-6 w-6" />
            <span className="text-xs">Resume Lab</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
