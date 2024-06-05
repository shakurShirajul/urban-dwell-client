import React, { useContext } from 'react';
import logo from '../assets/images/logo/urbanDwell.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const Nav = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut();
    }

    const NavBarLink =
        <>
            <li><a>Home</a></li>
            <li><a>Apartment</a></li>
        </>

    console.log(user);
    return (
        <div className='border-b font-poppins'>
            <div className='container mx-auto'>
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-roboto">
                                {
                                    NavBarLink
                                }
                            </ul>
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className='space-x-2 flex'>
                                <img src={logo} alt="" className='w-24 h-w-24' />
                                <Link to='/'>
                                    <div className='text-3xl font-urbanJungle'>
                                        <h1 className='text-[#274c07]'>Urban</h1>
                                        <h1 className='text-[#173842]'>Dwell</h1>
                                    </div>
                                </Link>
                            </div>
                            <div>
                                <div className="hidden lg:flex">
                                    <ul className="menu menu-horizontal font-poppins text-xl uppercase font-semibold text-[#0066b1]">
                                        {
                                            NavBarLink
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        {
                            user ?
                                (
                                    <div>
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                <div className="w-14 rounded-full">
                                                    <img src={user.photoURL} />
                                                </div>
                                            </div>
                                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                                <li className='pointer-events-none select-none cursor-default'>
                                                    <p className='font-semibold'>{user.displayName}</p>
                                                </li>
                                                <li><Link>Dashboard</Link></li>
                                                <li><button onClick={handleLogOut}>Logout</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <Link to='/login' className=''><button className="btn btn-success">Login</button></Link>
                                )
                        }
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Nav;