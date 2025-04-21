import { NavLink } from 'react-router';
import { HiRefresh } from 'react-icons/hi';
import { LuTimerReset } from 'react-icons/lu';
import { IoMenuSharp } from 'react-icons/io5';

const SideBar = () => {
    return (
        <>
            <button
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
                <span className="sr-only">Open sidebar</span>
                <span>
                    <IoMenuSharp />
                </span>
            </button>

            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <NavLink to={'/'} className="sidebarNavItem">
                                <span>
                                    <HiRefresh className="sidebarIcon" aria-hidden="true" />
                                </span>
                                <span className="ms-3">Reconcile</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/outstandings'} className="sidebarNavItem">
                                <span>
                                    <LuTimerReset className="sidebarIcon" />
                                </span>
                                <span className="ms-3">Outstanding</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
