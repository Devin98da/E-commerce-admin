import React, { useEffect, useState } from 'react'
import './widgetSm.css';
import { Visibility } from '@material-ui/icons';
import { userRequest } from '../../requestMethod';

const WidgetSm = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await userRequest.get("user/findall/?new=true");
                setUsers(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getUsers();

    }, [])


    return (
        <div className='widgetSm'>
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {
                    users.map(user => (
                        <li className="widgetSmListItem" key={user._id}>
                            <img
                                src={
                                    user.img ||
                                    "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                                }
                                alt=""
                                className="widgetSmImg"
                            />
                            <div className="widgetSmUser">
                                <span className="widgetSmUserName">{user.username}</span>
                                {/* <span className="widgetSmUserTitle">{user.title}</span> */}
                            </div>
                            <button className="widgetSmBtn">
                                <Visibility className="widgetSmIcon" />
                                Display
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default WidgetSm