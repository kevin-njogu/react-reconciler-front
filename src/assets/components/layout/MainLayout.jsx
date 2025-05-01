import { Outlet } from 'react-router';
import SideBar from './SideBar';

const MainLayout = () => {
    return (
        <div className="flex flex-col md:flex-row gap-2 w-full h-screen ">
            <SideBar />

            <div className="p-4 sm:ml-64 w-full  h-screen">
                <div className="flex flex-col p-4 ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default MainLayout;
