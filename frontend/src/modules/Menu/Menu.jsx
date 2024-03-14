import React from "react";
import { Link } from "react-router-dom";
import "../styles/menu.css";
const Menu = () => {
  return (
    <>
      <div className="menu-container">
        <div className="time-container">
          <div className="time">
            Monday, February 22, 2023 <br /> 10:00AM
          </div>
        </div>

        <div className="title-menu">
          <span className="blue">POS</span> <span className="of">WITH</span>{" "}
          <span className="sale">RFID</span>
        </div>
        <div className="sentence">
          <p>
            Point of sale application intended to be used within the Coppel
            chain stores
          </p>
        </div>

        <div className="buttons-container mt-4">
          <div className="menus">
            <Link to={"/Dashboard"} style={{ textDecoration: "none" }}>
              <button>
                <i class="bx bx-home icon-btn"></i>
                <div className="btn-details">
                  <h2>DASHBOARD</h2>
                  <p className="desc">Analytic Dashboard</p>
                </div>
              </button>
            </Link>
            <Link to={"/Inventory"} style={{ textDecoration: "none" }}>
              <button>
                <i class="bx bx-package icon-btn"></i>
                <div className="btn-details">
                  <h2>INVENTORY</h2>
                  <p className="desc">Products</p>
                </div>
              </button>
            </Link>
            <Link to={"/E-Receipts"} style={{ textDecoration: "none" }}>
              <button>
                <i class="bx bx-coin-stack icon-btn"></i>
                <div className="btn-details">
                  <h2>E-RECEIPTS</h2>
                  <p className="desc">Products</p>
                </div>
              </button>
            </Link>
          </div>
          <div className="menus">
            <Link to={"/productCategory"} style={{ textDecoration: "none" }}>
              <button>
                <i class="bx bx-package icon-btn"></i>
                <div className="btn-details">
                  <h2>PRODUCTS</h2>
                  <p className="desc">Manage and track</p>
                </div>
              </button>
            </Link>
            <Link to={"/Product"} style={{ textDecoration: "none" }}>
              <button>
                <i class="bx bx-rfid  "></i>
                <div className="btn-details">
                  <h2>RFID</h2>
                  <p className="desc">Creaate, track</p>
                </div>
              </button>
            </Link>
            <Link to={"/Product"} style={{ textDecoration: "none" }}>
              <button>
                <i class="bx bxs-bar-chart-alt-2 icon-btn"></i>
                <div className="btn-details">
                  <h2>REPORTS</h2>
                  <p className="desc">Creaate, track</p>
                </div>
              </button>
            </Link>
          </div>
          <div className="menus">
            <Link to={"/Product"} style={{ textDecoration: "none" }}>
              <button>
                <i class="bx bx-user icon-btn"></i>
                <div className="btn-details">
                  <h2>USERS</h2>
                  <p className="desc">Creaate, track</p>
                </div>
              </button>
            </Link>
            <Link to={"/Product"} style={{ textDecoration: "none" }}>
              <button>
                <i class="bx bx-border-all icon-btn"></i>
                <div className="btn-details">
                  <h2>SPECIAL FEATURES</h2>
                  <p className="desc">Creaate, track</p>
                </div>
              </button>
            </Link>
            <Link to={"/Product"} style={{ textDecoration: "none" }}>
              <button>
                <i class="bx bx-cog icon-btn"></i>
                <div className="btn-details">
                  <h2>SETTINGS</h2>
                  <p className="desc">Creaate, track</p>
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="footer">
          <div className="version">
            <p>v.1.0</p>
          </div>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            <div
              className="logout"
              onClick={() => {
                localStorage.removeItem("accessToken");
              }}
            >
              <i class="bx bx-log-out-circle bx-rotate-90 logout-i"></i>
              <p>Logout</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;
