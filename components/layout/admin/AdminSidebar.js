import Link from "next/link";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
const config = require("../../../config/config.json")
class AdminSidebar extends React.Component {
  render() {
    const { pathname } = this.props.router;
    return (
      <aside
        className="main-sidebar sidebar-light-purple"
        style={{ minHeight: "846px" }}
      >
     
          <a href="/" className="brand-link text-center border-bottom">
            <img src="images/plane.png" className="" style={{width:"67px"}} />
          </a>

        <div className="sidebar border-right">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column nav-child-indent"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >     
              <li className="nav-item">
                  <a
                    href="/"
                    className={[
                      "nav-link",
                      pathname === "/" ? "active-button" : "",
                    ].join(" ")}
                  >
                    <i className="nav-icon fa fa-home" />
                    <p>Home</p>
                  </a>
              </li>
              <li className="nav-item">
                  <a
                    href="/tiket"
                    className={[
                      "nav-link",
                      pathname === "/tiket" ? "active-button" : "",
                    ].join(" ")}
                  >
                    <i className="nav-icon fa fa-plane" />
                    <p>Bandingkan Tiket</p>
                  </a>
              </li>
              <li className="nav-item">
                  <a
                    href="/grafik"
                    className={[
                      "nav-link",
                      pathname === "/grafik" ? "active-button" : "",
                    ].join(" ")}
                  >
                    <i className="nav-icon fa fa-bar-chart" />
                    <p>Grafik Perbandingan</p>
                  </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}

AdminSidebar.propTypes = {
  projectName: PropTypes.string,
};

AdminSidebar.defaultProps = {
  projectName: "Web App",
};

export default withRouter(AdminSidebar);
