import React from "react";
import { connect } from "react-redux";
import HomePage from "../components/redux-page/Home/index";
const { withAuthSync, getUserData } = require("../util/authentication");
const { getTiket } = require("../service/comparison");
import {loadDataHome, setLoading } from "../redux/actions";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata : getUserData()
    };
    this.getPrice = this.getPrice.bind(this);
  }
  componentDidMount(){
    //this.getPrice();
  }

  async getPrice(){
    const { dispatch } = this.props;
    dispatch(setLoading(true))
    let payload = {
        page: 1,
        limit: 10,
        sort_by: "name",
        order_by: "asc",
        category : ""
    }
    let response = await getTiket(payload);
    if (response != null) {
      let code = response.code;
      if (code == 200) {
        dispatch(loadDataHome(response.data))
        dispatch(setLoading(false))
      } else if (code == 403) {
        dispatch(loadDataHome(null))
        dispatch(setLoading(false))
      } else if (code == 404) {
        dispatch(loadDataHome(null))
        dispatch(setLoading(false))
      }  else {
        dispatch(loadDataHome(null))
        dispatch(setLoading(false))
      } 
    } 
  }

  render() {
    return <HomePage />;
  }
}

export default connect((state) => state) (Home);
