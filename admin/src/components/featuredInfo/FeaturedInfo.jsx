import React, { useEffect, useState } from 'react';
import './featuredInfo.css'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { userRequest } from '../../requestMethod';


const FeaturedInfo = () => {

  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState("");

  useEffect(() => {

    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        setIncome(res.data);
        // console.log(res.data)
        setPercentage((res.data[1].total * 100) / res.data[0].total - 100);
      } catch (error) {
        console.log(error)
      }
    }
    getIncome();
  }, [])


  return (
    <div className='featured'>
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ {income[1]?.total}</span>
          <span className="featuredMoneyRate">
            {Math.floor(percentage)}
            {percentage > 0 ?
              <ArrowUpward className='featuredIcon' />
              :
              <ArrowDownward className='featuredIcon negative' />}
          </span>
        </div>
        <span className="featuredSub">Compare to last month.</span>

      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ 3,490</span>
          <span className="featuredMoneyRate">
            -12.4
            <ArrowDownward className='featuredIcon negative' />
          </span>
        </div>
        <span className="featuredSub">Compare to last month.</span>

      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ 1,290</span>
          <span className="featuredMoneyRate">
            2.4
            <ArrowUpward className='featuredIcon' />
          </span>
        </div>
        <span className="featuredSub">Compare to last month.</span>

      </div>
    </div>
  )
}

export default FeaturedInfo