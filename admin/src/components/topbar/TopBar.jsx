import React, { useEffect, useRef, useState } from 'react';
import './topbar.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/UserRedux';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const [showUserWindow, setShowUserWindow] = useState(false);

    const { isFetching, error, currentUser } = useSelector(state => state.user);
    const userWindowRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickOutside = (event) => {
        if (userWindowRef.current && !userWindowRef.current.contains(event.target)) {
            setShowUserWindow(false); // Hide the window when clicking outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleUserWindow = () => {
        setShowUserWindow(prev => !prev);
    }

    const onLogout = () => {
        dispatch(logout());
        localStorage.removeItem("persist:root");
        navigate('/login');
    }

    return (
        <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topleft">
                    <span className='logo'>Keema Admin</span>
                </div>
                <div className="topright">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className='topIconBag'>2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                    </div>
                    <div className="topAvatarContainer" ref={userWindowRef} onClick={toggleUserWindow}>
                        <img
                            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt="User Avatar"
                            className="topAvatar"
                        />
                        <div className={`userWindow ${showUserWindow ? 'active' : ''}`}>
                            <div className="userWindowItem">Profile</div>
                            <div className="userWindowItem">Settings</div>
                            <div className="userWindowItem" onClick={onLogout}>Logout</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
