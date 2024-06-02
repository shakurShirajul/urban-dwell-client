import React from 'react';
import logo from '../assets/images/logo/urbanDwell.png'
import { Link } from 'react-router-dom';

const Nav = () => {
    const NavBarLink =
        <>
            <li><a>Home</a></li>
            <li><a>Apartment</a></li>
        </>
    return (
        <div className='mb-20'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                NavBarLink
                            }
                        </ul>
                    </div>
                    <div className='flex items-center justify-center'>
                        {/* <img src={logo} alt="" className='w-28 h-28' /> */}
                        <Link to='/'>
                            <h1 className='text-xl'>Urban Dwell</h1>
                        </Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            NavBarLink
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to='/login' className='btn'>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Nav;