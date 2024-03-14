import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
const _Sidebar = ({ links }) => {
  return (
    <>
      <nav>
        <div className="nav-container">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <div className="link-container">
                <i className={`bx ${link.icon}`}></i>
                <h6>{link.label}</h6>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default _Sidebar;
