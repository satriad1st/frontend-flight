import React from "react";
import { connect } from "react-redux";
import TiketPage from "../../components/redux-page/Tiket/index";
import {loadData1, setLoading , setLoading2, setLoading3} from "../../redux/actions";
const { withAuthSync, getUserData } = require("../../util/authentication");
const { getTiket } = require("../../service/comparison");
class Tiket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata : getUserData()
    };
    this.getPrice = this.getPrice.bind(this);
  }
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(setLoading(false))
    dispatch(setLoading2(false))
    dispatch(setLoading3(false))
    //this.getPrice();
  }

  async getPrice(){
    const { dispatch } = this.props;
    dispatch(setLoading(true))
    let payload = {
        page: 1
    }
    let response = await getTiket(payload);
    if (response != null) {
      let code = response.code;
      if (code == 200) {
        dispatch(loadData1(response.data))
        dispatch(setLoading(false))
      } else if (code == 403) {
        dispatch(loadData1(null))
        dispatch(setLoading(false))
      } else if (code == 404) {
        dispatch(loadData1(null))
        dispatch(setLoading(false))
      }  else {
        dispatch(loadData1(null))
        dispatch(setLoading(false))
      } 
    } 
  }

  render() {
    return <TiketPage />;
  }
}

export default connect((state) => state) (Tiket);
