import React, { useEffect, useMemo, useState } from 'react'
import './home.css';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
import { userData } from '../../dummyData';
import WidgetSm from '../../components/widget sm/WidgetSm';
import WidgetLg from '../../components/widget lg/WidgeLg';
import { userRequest } from '../../requestMethod';

const Home = () => {

  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec",
    ],
    []
  );

  useEffect(() => {

    const getUserStats = async () => {
      try {
        const res = await userRequest.get("user/stats");
        // console.log(res.data)

        res.data.map(item=>(
          setUserStats(prev=>[
            ...prev,
            {name:MONTHS[item._id-1], "Active User":item.total}
          ])
        ))
      } catch (error) {
        console.log(error)
      }
    }

    getUserStats();

  }, [MONTHS])

  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart title="User Analytics" data={userStats} dataKey="Active User" grid="true" />
      <div className="homeWidget">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}

export default Home