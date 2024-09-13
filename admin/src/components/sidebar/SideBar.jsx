import React from 'react'
import './sidebar.css';
import {
    LineStyle,
    Timeline,
    TrendingDown,
    PermIdentity,
    Storefront,
    BarChart,
    AttachMoney,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,


} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className='sidebarTitle'>Dashboard</h3>
                    <ul className='sidebarList'>
                        <Link to='/' className='link'>
                            <li className='sidebarListItem'>
                                <LineStyle className='sidebarIcon' />
                                Home
                            </li>
                        </Link>
                        <Link to='/analytics' className='link'>
                            <li className='sidebarListItem'>
                                <Timeline className='sidebarIcon' />
                                Analytics
                            </li>
                        </Link>
                        <Link to='/sales' className='link'>
                            <li className='sidebarListItem'>
                                <TrendingDown className='sidebarIcon' />
                                Sales
                            </li>
                        </Link>

                    </ul>
                </div>
                <div className="sideBarMenu">
                    <h3 className='sidebarTitle'>Quick Menu</h3>
                    <ul className='sidebarList'>

                        <Link to='/users' className='link'>
                            <li className='sidebarListItem'>
                                <PermIdentity className='sidebarIcon' />
                                Users
                            </li>
                        </Link>
                        <Link to='/products' className='link'>
                            <li className='sidebarListItem'>
                                <Storefront className='sidebarIcon' />
                                Products
                            </li>
                        </Link>

                        <Link to='/transactions' className='link'>
                            <li className='sidebarListItem'>
                                <AttachMoney className='sidebarIcon' />
                                Transactions
                            </li>
                        </Link>
                        <Link to='/reports' className='link'>
                            <li className='sidebarListItem'>
                                <BarChart className='sidebarIcon' />
                                Reports
                            </li>
                        </Link>

                    </ul>
                </div>
                <div className="sideBarMenu">
                    <h3 className='sidebarTitle'>Notifications</h3>
                    <ul className='sidebarList'>
                        <Link to='/mail' className='link'>
                            <li className='sidebarListItem'>
                                <MailOutline className='sidebarIcon' />
                                Mail
                            </li>
                        </Link>

                        <Link to='/feedback' className='link'>
                            <li className='sidebarListItem'>
                                <DynamicFeed className='sidebarIcon' />
                                Feedback
                            </li>
                        </Link>

                        <Link to='/messages' className='link'>
                            <li className='sidebarListItem'>
                                <ChatBubbleOutline className='sidebarIcon' />
                                Messages
                            </li>
                        </Link>

                    </ul>
                </div>
                <div className="sideBarMenu">
                    <h3 className='sidebarTitle'>Staff</h3>
                    <ul className='sidebarList'>
                        <Link to='/manage' className='link'>
                            <li className='sidebarListItem'>
                                <WorkOutline className='sidebarIcon' />
                                Manage
                            </li>
                        </Link>

                        <Link to='/analytics' className='link'>
                            <li className='sidebarListItem'>
                                <Timeline className='sidebarIcon' />
                                Analytics
                            </li>
                        </Link>
                        <Link to='/reports' className='link'>
                            <li className='sidebarListItem'>
                                <Report className='sidebarIcon' />
                                Reports
                            </li>
                        </Link>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar