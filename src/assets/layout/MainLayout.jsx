import { Outlet } from 'react-router';
import SideBar from './SideBar';

const MainLayout = () => {
    return (
        <div className="flex flex-col md:flex-row gap-2 w-full h-screen bg-gray-200">
            <SideBar />

            <div className="flex-1 p-6 flex flex-col gap-6">
                <div className="flex flex-col-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default MainLayout;
