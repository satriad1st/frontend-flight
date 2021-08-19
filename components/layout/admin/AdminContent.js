import PropTypes from "prop-types";

const AdminContent = (props) => {
  return (
    <div className="content-wrapper" style={{ minHeight: "93vh" }}>
      <div className="content-header">
        {props.title && (
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h4 className="m-0 text-dark mb-2">{props.title}</h4>
              </div>
              <div className="col-sm-6 text-muted">
                <span className="breadcrumb float-sm-right">
                  {props.titleButton && props.titleButton}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="content">
        <div className="container-fluid">{props.children}</div>
      </div>
    </div>
  );
};

AdminContent.propTypes = {
  title: PropTypes.string,
  titleButton: PropTypes.element,
};

export default AdminContent;
