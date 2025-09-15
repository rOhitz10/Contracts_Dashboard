import { Outlet } from "react-router-dom";
import { Sidebar } from "../common/Sidebar";
import { Header } from "../common/Header";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        <Header />
        
        <main className="flex-1 overflow-auto p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};