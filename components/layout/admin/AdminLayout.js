import "../../../styles/styles.scss";

import PropTypes from "prop-types";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import AdminContent from "./AdminContent";
import AdminSidebar from "./AdminSidebar";
import AdminControlSidebar from "./AdminControlSidebar";

/**
 * Main admin layout - A Higher Order Component
 */
class AdminLayout extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <AdminHeader />
        <AdminSidebar />
        <AdminContent
          title={this.props.contentTitle}
          titleButton={this.props.contentTitleButton}
        >
          {this.props.children}
        </AdminContent>
        <AdminControlSidebar />
        <AdminFooter
          rightContent={""}
          leftContent={<div>Perbandingan Harga Tiket @2021 All Right Reserved</div>}
        />
      </div>
    );
  }
}

AdminLayout.propTypes = {
  contentTitle: PropTypes.string,
  contentTitleButton: PropTypes.element,
};
export default AdminLayout;
