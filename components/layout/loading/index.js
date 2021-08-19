import PropTypes from "prop-types";
import ReactLoading from 'react-loading';


const Loading = (props) => {
  const titleStyle={
    fontSize : "16px",
    fontFamily :"Gotham-Book",
    color: "#414042",
    textAlign:"center",
    fontWeight :"bold"
  }
  const LoadingStyle={
    flexDirection: "column",
    fontFamily :"Gotham-Book",
    color: "#929293",
        textAlign:"center",
        width:"343px"
  }
  return (
      <div className="content">
        <div className="row mb-3">
            <div className="col-md-12 centerFlex mt-5 mb-5">
                <ReactLoading type={"spin"} color={props.color} height="10%" width="10%" />
            </div>
            <div className="col-md-12 centerFlex mt-5">
                <h3 style={{marginBottom:"0px",fontSize:"1.25rem"}}>Tunggu Sebentar...</h3>
            </div>
        </div>
      </div>
  );
};

Loading.propTypes = {
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  text : PropTypes.string,
};

export default Loading;
