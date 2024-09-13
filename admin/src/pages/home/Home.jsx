import React from 'react'
import './home.css';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
import { userData } from '../../dummyData';
import WidgetSm from '../../components/widget sm/WidgetSm';
import WidgetLg from '../../components/widget lg/WidgeLg';

const Home = () => {
  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart title="User Analytics" data={userData} dataKey="Active User" grid="true" />
      <div className="homeWidget">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}

export default Home