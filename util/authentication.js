import React from "react";
import Router from "next/router";
import cookie from "js-cookie";
import { setDataUser } from "../redux/actions";
import { CRYPTO_KEY } from "./key";
const CryptoJS = require("crypto-js");
const ISSERVER = typeof window === "undefined";
export const login = async function (email, password) {
  let payload = {
    email: email,
    password: password,
  };
  let response = fetch("/api/templatehere/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return null;
    });

  return response;
};

export const logout = async function (dispatch) {
  dispatch(setDataUser(null));
  cookie.remove("templatehereaccess");
  Router.push("/login");
  localStorage.clear();
};
  
export const getUserData =  function (){
  if(!ISSERVER) {
    let dataUser = JSON.parse(localStorage.getItem("persist:templatehereapp"))
 
    if(dataUser !=null){
      dataUser = JSON.parse(dataUser.dataUser);
    }
    if(dataUser!=null){
    let dataUserDecoded = JSON.parse(
      CryptoJS.AES.decrypt(dataUser, CRYPTO_KEY).toString(CryptoJS.enc.Utf8)
    );
    return dataUserDecoded;
    }else{
    return "";
    }
  }
}
const checkAuthentication = async function (dataUser, pathname) {
  if (dataUser == null && pathname != "/login") {
    Router.push("/login");
  } else if (dataUser != null && pathname == "/login") {
    Router.push("/");
  }
};

export const withAuthSync = (WrappedComponent) => {
  class Wrapper extends React.Component {
    static async getInitialProps(ctx) {
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    }

    componentDidMount() {
      const { dataUser, pathname, dispatch } = this.props;
      let dataUserDecoded = dataUser;
      let templatehereaccess = cookie.get("templatehereaccess");
      if (!templatehereaccess) {
        dispatch(setDataUser(null));
        dataUserDecoded = null;
      }   

      checkAuthentication(templatehereaccess, pathname);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return Wrapper;
};
