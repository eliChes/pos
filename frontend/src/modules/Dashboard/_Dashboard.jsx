import React, { useState } from "react";
import _Sidebar from "../Sidebar/_Sidebar";
import "../styles/dashboard.css";
import netSale from "../../assets/icon/net-sales.png";
import cart from "../../assets/icon/cart.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
const _Dashboard = () => {
  //For Sidebar
  const menuLinks = [{ to: "/Menu", icon: "bx-arrow-back", label: "Menu" }];
  return (
    <>
      <_Sidebar links={menuLinks} />
      <div className="dashboard-container">
        <div className="custom-card">
          <div className="store-details">
            <div className="store-container">
              <p>Store Name:</p>
              <p>018-Regin Market Market</p>
            </div>
            <div className="store-container">
              <p>Store Status:</p>
              <div className="stats">OPEN</div>
            </div>
            <div className="store-container">
              <p>Date Time:</p>
              <p>7/10/2023 5:10:23 PM</p>
            </div>
          </div>
          <hr />
          <div className="sales-details">
            <div className="sales-container">
              <img src={netSale} />
              <div className="sale">
                <p>Net Sales</p>
                <h3>10,500.15</h3>
              </div>
            </div>
            <div className="sales-container">
              <img src={cart} />
              <div className="sale">
                <p>Number of Purchased</p>
                <h3>450</h3>
              </div>
            </div>
            <div className="sales-container itm-sold">
              <i class="bx bx-check-circle"></i>
              <div className="sale">
                <p>Item Sold</p>
                <h3>3500</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="logs-container mt-4">
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="System Logs" title="System Logs"></Tab>
            <Tab eventKey="Promotion Logs" title="Promotion Logs"></Tab>
          </Tabs>
        </div>

        <div className="terminal-container mt-3">
          <h6>Terminal List</h6>
          <div className="custom-card">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Terminal number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nikka Batista</td>
                  <td>POS 1</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Regin Collins</td>
                  <td>POS 1</td>
                  <td>Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default _Dashboard;
