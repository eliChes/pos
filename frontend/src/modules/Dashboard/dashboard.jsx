import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/sidebar';
import '../../assets/global/style.css';
import '../styles/react-style.css';
import axios from 'axios';
import BASE_URL from '../../assets/global/url';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import yourImage from "../../assets/icon/read.jpg";

import {
    Gear, 
    Bell,
    UserCircle,
    Coins,
    TrendUp,
    TrendDown,
    Package,
    Stack,
    MapPin,
    CaretUp,
    CaretDown,
    Circle
  } from "@phosphor-icons/react";
  
  import * as $ from 'jquery';

  const data = [
    { name: 'In Stock', value: 400 },
    { name: 'Low Stock', value: 300 },
    { name: 'Out of Stock', value: 300 },
    { name: 'On Order', value: 300 },
  ];

  const data1 = [
    {
      month: 'January',
      ThisYear: 4000,
      LastYear: 2400,
    },
    {
      month: 'Febuary',
      ThisYear: 4000,
      LastYear: 2400,
    },
    {
      month: 'March',
      ThisYear: 4000,
      LastYear: 2400,
    },
    {
      month: 'April',
      ThisYear: 4000,
      LastYear: 2400,
    },
    {
      month: 'May',
      ThisYear: 4000,
      LastYear: 2400,
    },
    {
      month: 'June',
      ThisYear: 4000,
      LastYear: 2400,
    },
    {
      month: 'July',
      ThisYear: 4000,
      LastYear: 2400,
    },
    {
      month: 'August',
      ThisYear: 4000,
      LastYear: 2400,
    },
    {
      month: 'September',
      ThisYear: 4000,
      LastYear: 2400,
    },
    {
      month: 'October',
      ThisYear: 4000,
      LastYear: 2400,
    },
    {
      month: 'November',
      ThisYear: 4000,
      LastYear: 2400,
    },
    {
      month: 'December',
      ThisYear: 4000,
      LastYear: 2400,
    },
  ];

  const data2 = [
    {
      month: 'January',
      Ordered: 4000,
      Received: 2400,
      Returned: 2400,
    },
    {
      month: 'Febuary',
      Ordered: 4000,
      Received: 2400,
      Returned: 2400,
    },
    {
      month: 'March',
      Ordered: 4000,
      Received: 2400,
      Returned: 2400,
    },
    {
      month: 'April',
      Ordered: 4000,
      Received: 2400,
      Returned: 2400,
    },
  ];
  
  const supplierData = [
    { name: 'Supplier A', time: 3 },
    { name: 'Supplier B', time: 6 },
    { name: 'Supplier C', time: 9 },
    // Add more data as needed
  ];
  const barColors = ['#8884d8', '#82ca9d', '#ffc658'];

  const sample = [
    { 
      transactionNo: 'KR102023113',
      status: 'Success',
      amount: '₱ 1,500.00',
      date: '3 DEC 2023',
    },
    { 
      transactionNo: 'KR102023333',
      status: 'Success',
      amount: '₱ 1,500.00',
      date: '3 DEC 2023',
    },
    { 
      transactionNo: 'KR102023456',
      status: 'Success',
      amount: '₱ 1,500.00',
      date: '3 DEC 2023',
    },
    { 
      transactionNo: 'KR102023777',
      status: 'Success',
      amount: '₱ 1,500.00',
      date: '3 DEC 2023',
    },
    { 
      transactionNo: 'KR102023512',
      status: 'Success',
      amount: '₱ 1,500.00',
      date: '3 DEC 2023',
    },
    { 
      transactionNo: 'KR102023864',
      status: 'Success',
      amount: '₱ 1,500.00',
      date: '3 DEC 2023',
    },
    { 
      transactionNo: 'KR102023097',
      status: 'Success',
      amount: '₱ 1,500.00',
      date: '3 DEC 2023',
    },
    { 
      transactionNo: 'KR102023879',
      status: 'Success',
      amount: '₱ 1,500.00',
      date: '3 DEC 2023',
    }
  ];
  

function Dashboard() {
  // const navigate = useNavigate()
  // useEffect(() => {
  //   console.log(localStorage.getItem('accessToken'));
  //   if(localStorage.getItem('accessToken') === null){
  //     navigate('/');
  //   }
  // }, [])
  

  return (
    <div className="main-of-containers">
        {/* <div className="left-of-main-containers">
            <Sidebar/>
        </div> */}
        {/* <div className="right-of-main-container"> */}
            <div className="right-body-content">
              <div className="dashboard-container">
                <div className="settings-search-master">
                  <div className="dropdown-and-iconic">
                      <div className="dropdown-side">
                          <div className="emp-text-side">
                          </div>
                      </div>
                      <div className="iconic-side">
                          <div className="gearsides">
                              <Gear size={35}/>
                          </div>
                          <div className="bellsides">
                              <Bell size={35}/>
                          </div>
                          <div className="usersides">
                              <UserCircle size={35}/>
                          </div>
                          <div className="username">
                            <h3>User Name</h3>
                          </div>
                      </div>
                  </div>
                </div>
                <div className="dashboard-content">
                  <div className="preview-tabs">
                    <div className="tabs">
                      <div className="tab-title">
                        <div className="asset-icon">
                          <Package weight={'fill'} size={20} style={{color: '#4268fb'}}/>
                        </div>
                        <div className="title-tab">
                            Transactions
                        </div>
                      </div>
                      <div className="tab-value">
                        <div className="tab-count">
                          1,441
                        </div>
                        <div className="tab-percent">
                        <TrendUp size={25} weight='bold' style={{color: '#42eb42'}}/><p1>25% </p1> from yesterday
                        </div>
                      </div>
                    </div>

                    <div className="tabs">
                      <div className="tab-title">
                        <div className="product-icon">
                        <Coins size={20} style={{color: '#ff8b00'}}/>
                        </div>
                        <div className="title-tab">
                            Today's Top Up
                        </div>
                      </div>
                      <div className="tab-value">
                        <div className="tab-count">
                          ₱ 15,043
                        </div>
                        <div className="tab-percent">
                        <TrendDown size={25} weight='bold' style={{color: 'red'}}/><p1>25%</p1> from yesterday
                        </div>
                      </div>
                    </div>

                    <div className="tabs">
                      <div className="tab-title">
                        <div className="stock-icon">
                          <Stack size={20} weight='fill' style={{color: 'green'}}/>
                        </div>
                        <div className="title-tab">
                            Total Active Users
                        </div>
                      </div>
                      <div className="tab-value">
                        <div className="tab-count">
                          849
                        </div>
                        {/* <div className="tab-percent">
                        <TrendDown size={25} weight='bold' style={{color: 'red'}}/><p1>25%</p1> vs last month
                        </div> */}
                      </div>
                    </div>

                    <div className="tabs">
                      <div className="tab-title">
                        <div className="supplier-icon">
                          <MapPin weight='fill' size={20} style={{color: '#b512b5'}}/>
                        </div>
                        <div className="title-tab">
                            Inactive Users
                        </div>
                      </div>
                      <div className="tab-value">
                        <div className="tab-count">
                          732
                        </div>
                        {/* <div className="tab-percent">
                        <TrendUp size={25} weight='bold' style={{color: '#42eb42'}}/><p1>25%</p1> vs last month
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="inventory-stock">
                    <div className="inventory-box">
                      <div className="dash-label">
                        Transaction History
                      </div>
                      <br></br>
                      <div className="table-containss">
                      <div className="main-of-all-tables">
                        <table className='dash-table'>
                          <thead>
                          <tr>
                              <th>Tracsation #</th>
                              <th>Staus</th>
                              <th>Amount</th>
                              <th>Date</th>
                          </tr>
                          </thead>
                          <tbody>
                            {sample.map((data,i) =>(
                              <tr key={i}>
                                <td className='dashtd'>{data.transactionNo}</td>
                                <td className='dashtd'>{data.status}</td>
                                <td className='dashtd'>{data.amount}</td>
                                <td className='highlight'>{data.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    </div>
                    <div className="stock-level-box">
                      <div className="dash-label">
                        Quick Reload Card
                      </div>
                      <img src={yourImage} alt="RFID Scanner" />  
                      <input
                      className=""
                      type='text'
                      placeholder="Enter Amount here ...."
                      style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '14px', width: '100%' }}
                      required
                    />    
                    <div className="button-create-side">
                    <div className="Buttonmodal-new">
                      <button
                        to="/createRole"
                        className="button">
                        Send the transfer
                      </button>
                    </div>
                  </div>
                    </div>
                    
                  </div>
                  
                </div>
              </div>
            </div>

        {/* </div> */}
    </div>
  ) ;
}

export default Dashboard