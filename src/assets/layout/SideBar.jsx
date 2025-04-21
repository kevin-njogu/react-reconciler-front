import { NavLink } from 'react-router';
import { HiRefresh } from 'react-icons/hi';
import { LuTimerReset } from 'react-icons/lu';

const SideBar = () => {
    return (
        <div className="bg-gray-50 h-14 md:h-full md:w-1/6 p-2 flex justify-center items-center md:justify-start md:items-start">
            <nav className="w-full p-2 md:h-full flex flex-col gap-6">
                <div>
                    <h2 className="text-2xl font-light tracking-wider">Reconciler</h2>
                </div>

                <div>
                    <ul className="flex flex-row gap-4 md:flex-col">
                        <li>
                            <NavLink to={'/home'} className="sidebarNavItem">
                                <div className="flex flex-row justify-start items-center gap-3">
                                    <span>
                                        <HiRefresh className="text-2xl" />
                                    </span>
                                    <span className="tracking-wide">Reconcile</span>
                                </div>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/outstandings'} className="sidebarNavItem">
                                <div className="flex flex-row justify-start items-center gap-3">
                                    <span>
                                        <LuTimerReset className="text-2xl" />
                                    </span>
                                    <span className="tracking-wide">Outstanding</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default SideBar;
