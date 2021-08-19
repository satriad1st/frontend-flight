const { logout, getUserData } = require("../../../util/authentication");
import { connect } from "react-redux";
import React, { useState, useRef, useEffect } from "react";

const AdminHeader = (props) => {

  const [userdata, setUserdata] = useState(
    getUserData()|| ''
  );

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout(props.dispatch);
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-light navbar-white fixed-top border-bottom">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#">
            <i className="fa fa-bars" />
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown ">
          <a className="nav-link d-none" data-toggle="dropdown" href="#">
            <i className="fa fa-user-o" /> {userdata && props.dataUser ? userdata.fullName : ""}
          </a>
          <div className="dropdown-menu dropdown-menu-md dropdown-menu-right hidden">
            <a href="#" onClick={handleLogout}  className="dropdown-item">
              <i className="fa fa-mail-forward mr-3" /> Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default connect((state) => state)(AdminHeader);

