import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CampaignIcon from '@mui/icons-material/Campaign';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PersonIcon from '@mui/icons-material/Person';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';

const Dashboard = () => {

    const activeButton = "border border-green-600 font-semibold";

    const { user } = useContext(AuthContext);
    const { data: role = [], isPending, isLoading } = useQuery({
        queryKey: ['role'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/users/role?email=${user.email}`, { withCredentials: true })
            return res.data;
        }
    })

    const isRole = role.user_role;
    let sideBarNavigation;


    console.log(isRole);

    const adminSide = <>
        <li><NavLink to='/dashboard/adminprofile' className={({ isActive }) => isActive && activeButton}><AdminPanelSettingsIcon />Admin Profile</NavLink></li>
        <li><NavLink to='/dashboard/managemember' className={({ isActive }) => isActive && activeButton}><PersonIcon />Manage Member</NavLink></li>
        <li><NavLink to='/dashboard/makeannouncement' className={({ isActive }) => isActive && activeButton}><CampaignIcon />Make Announnement</NavLink></li>
        <li><NavLink to='/dashboard/agreementrequest' className={({ isActive }) => isActive && activeButton}><HandshakeIcon />Agrement Request</NavLink></li>
        <li><NavLink to='/dashboard/managecoupons' className={({ isActive }) => isActive && activeButton}><ConfirmationNumberIcon />Manage Coupons</NavLink></li>
    </>

    const memberSide = <>
        <li><NavLink to='/dashboard/myprofile' className={({ isActive }) => isActive && activeButton}><AccountBoxIcon />My Profile</NavLink></li>
        <li><NavLink to='/dashboard/makepayment' className={({ isActive }) => isActive && activeButton}><PaidIcon />Make Payment</NavLink></li>
        <li><NavLink to='/dashboard/paymenthistory' className={({ isActive }) => isActive && activeButton}><ReceiptIcon />Payment History</NavLink></li>
        <li><NavLink to='/dashboard/announcement' className={({ isActive }) => isActive && activeButton}><CampaignIcon />Announcement</NavLink></li>
    </>;

    const userSide = <>
        <li><NavLink to='/dashboard/myprofile' className={({ isActive }) => isActive && activeButton}><AccountBoxIcon />My Profile</NavLink></li>
        <li><NavLink to='/dashboard/announcement' className={({ isActive }) => isActive && activeButton}><CampaignIcon />Announcements</NavLink></li>
    </>;


    if (isRole === "admin") {
        sideBarNavigation = adminSide;
    }
    else if (isRole === "user") {
        sideBarNavigation = userSide;
    }
    else if (isRole === "member") {
        sideBarNavigation = memberSide;
    }

    return (
        <div className='p-5 lg:p-0'>
            <div className='flex flex-col lg:flex-row'>
                <div className='lg:w-80 border border-green-800'>
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                                <MenuOpenIcon />
                            </label>
                        </div>

                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                {
                                    sideBarNavigation
                                }
                                <div className="divider"></div>
                                <li>
                                    <NavLink to='/'>
                                        <HomeIcon/>
                                        Home
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex-1 p-10 min-h-screen border border-green-950'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;