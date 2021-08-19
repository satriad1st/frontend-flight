import PropTypes from "prop-types";

const NoData = (props) => {
  const titleStyle={
    fontSize : "16px",
    fontFamily :"Gotham-Book",
    color: "#414042",
    textAlign:"center",
    fontWeight :"bold"
  }
  const descriptionStyle={
    fontSize : "16px",
    fontFamily :"Gotham-Book",
    color: "#929293",
    textAlign:"center",
    width:"343px"
  }
  return (
      <div className="content">
        <div className="row">
            <div className="col-md-12 centerFlex mt-5">
                <img src={props.image}></img>
            </div>
            <div className="col-md-12 centerFlex mt-5">
                <p style={titleStyle}>{props.title}</p>
            </div>
            <div className="col-md-12 centerFlex mt-3">
                <p  style={descriptionStyle}>{props.description}</p>
            </div>
        </div>
      </div>
  );
};

NoData.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default NoData;
