import { useState } from "react";
import { Bell, Search, UploadIcon, User } from "lucide-react";
import { useAuth } from "../../contextApi/AuthContext";
import UploadModal from "./UploadModal";

export const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-end px-4 py-3 lg:px-6">
        
        <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            <UploadIcon className="h-4 w-4 mr-1" />
            Upload
          </button>

        <div className="flex items-center ml-4">
          <button className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
            <Bell className="h-6 w-6" />
          </button>
          
          <div className="ml-3 relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {user?.charAt(0)?.toUpperCase() || <User size={16} />}
              </div>
            </button>
            
            {isProfileOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Your Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign out
                </a>
              </div>
            )}
            {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    
          </div>
          
        </div>
      </div>
    </header>
  );
};