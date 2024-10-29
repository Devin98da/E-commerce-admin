import React, { useEffect, useState } from 'react'
import './widgetLg.css';
import { userRequest } from '../../requestMethod';
import {format} from 'timeago.js';

const Button = ({ type }) => {
  return <button className={'widgetLgButton ' + type} >{type}</button>
}

const WidgetLg = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders/find");
        setOrders(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    getOrders();

  }, [])

  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map(order => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">{order.userId}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">${order.amount}</td>
            <td className="widgetLgStatus">
              <Button type="Approved" />
            </td>
          </tr>
        ))}

      </table>

    </div>
  )
}

export default WidgetLg