import React from "react";
import cookie from "js-cookie";
import { connect } from "react-redux";
import LoginLayout from "../../components/layout/login/LoginLayout";
import { setDataUser } from "../../redux/actions";
import { CRYPTO_KEY } from "../../util/key";
const GenerateCaptcha = require("../../util/captcha-generator");
const { login, withAuthSync} = require("../../util/authentication");
const CryptoJS = require("crypto-js");

class Login extends React.Component {
  static async getInitialProps(props) {
    const { pathname } = props.ctx;
    return { pathname };
  }

  constructor(props) {
    super(props);
    this.state = {
      login: false,
      disabled: false,
      captcha: "",
      email: "",
      password: "",
      alertError: "",
      captchaText: "",
      captchaImage: "",
      captchaError: "",
      emailError: "",
      passwordError: "",
      passwordType: "password",
      passwordIcon: "fa fa-eye-slash",
    };

    this.getCaptcha = this.getCaptcha.bind(this);
    this.setCaptcha = this.setCaptcha.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearAlertError = this.clearAlertError.bind(this);
    this.showAlertError = this.showAlertError.bind(this);
    this.showHidePassword = this.showHidePassword.bind(this);
    this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
    this.handleemailChange = this.handleemailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    this.getCaptcha();
  }

  getCaptcha() {
    const { image, text } = GenerateCaptcha(145, 60);
    this.setState({
      captchaText: text,
      captchaImage: image,
    });
  }

  setCaptcha(data) {
    this.setState({
      captchaText: data.text,
      captchaImage: data.image,
    });
  }

  clearAlertError() {
    this.setState({ alertError: "" });
    this.getCaptcha();
  }

  showAlertError(alertMessage) {
    this.setState({
      alertError: alertMessage,
    });

    setTimeout(
      function () {
        this.clearAlertError();
      }.bind(this),
      3000
    );
  }

  showHidePassword(e) {
    e.preventDefault();
    this.setState({
      passwordType:
        this.state.passwordType === "password" ? "text" : "password",
      passwordIcon:
        this.state.passwordIcon === "fa fa-eye-slash"
          ? "fa fa-eye"
          : "fa fa-eye-slash",
    });
  }

  handleemailChange(e) {
    let emailError;
    let email = e.target.value;
    if (email == "") {
      emailError = "nama pengguna atau nomer telepon kosong";
    } else {
      emailError = "";
    }
    this.setState({
      email: email,
      emailError: emailError,
    });
  }

  handlePasswordChange(e) {
    let passwordError;
    let password = e.target.value;
    if (password == "") {
      passwordError = "kata sandi kosong";
    } else {
      passwordError = "";
    }
    this.setState({
      password: password,
      passwordError: passwordError,
    });
  }

  handleCaptchaChange(e) {
    let captchaError;
    let captcha = e.target.value;
    if (captcha == "") {
      captchaError = "captcha kosong";
    } else {
      captchaError = "";
    }
    this.setState({
      captcha: captcha,
      captchaError: captchaError,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    let { email, password, captcha, captchaText } = this.state;
    this.setState({ login: true, disabled: true });
    if (captcha != captchaText) {
      this.setState({
        login: false,
        disabled: false,
        captchaError: "captcha tidak sesuai",
      });
    } else {
      let response = await login(email, password);
      if (response != null) {
        let code = response.code;
        if (code == 200) {
          let userDataEncoded = CryptoJS.AES.encrypt(
            JSON.stringify(response.data),
            CRYPTO_KEY
          ).toString();
          let apiKeyEncoded = CryptoJS.AES.encrypt(
            JSON.stringify(response.data.token),
            CRYPTO_KEY
          ).toString();
          dispatch(setDataUser(userDataEncoded));
          cookie.set("templatehereaccess", apiKeyEncoded, { expires:  1});
          window.location.href="/"
        } else if (code == 400) {
          let emailMessage = response.message;
          let passwordMessage = response.message;
          this.setState({
            emailError: emailMessage == null ? "" : emailMessage,
            passwordError: passwordMessage == null ? "" : passwordMessage,
          });
        } else if (code == 404) {
          let emailMessage = response.message;
          let passwordMessage = response.message;
          this.setState({
            emailError: emailMessage || "",
            passwordError: passwordMessage || "",
          });
        } else if (code == 500) {
          this.showAlertError(
            "Ooops.. Sistem sedang sibuk, coba lagi beberapa saat"
          );
        }
      } else {
        this.showAlertError(
          "Ooops.. Sistem sedang sibuk, coba lagi beberapa saat"
        );
      }

      this.setState({
        login: false,
        disabled: false,
      });
      this.getCaptcha();
    }
  }

  render() {
    let {
      login,
      captcha,
      email,
      password,
      disabled,
      alertError,
      captchaImage,
      captchaError,
      emailError,
      passwordError,
      passwordType,
      passwordIcon,
    } = this.state;

    return (
      <LoginLayout>
        <div
          className={[
            "alert",
            "alert-danger",
            "fade",
            alertError === "" ? "" : "show",
          ].join(" ")}
          role="alert"
        >
          {alertError}
          <span className="cursor-pointer close" onClick={this.clearAlertError}>
            <span aria-hidden="true">×</span>
          </span>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <div className="login-logo text-left">
              <img src="images/Logo.png" />
            </div>
            <p className="sub-heading">Admin Panel</p>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoFocus={true}
                  value={email}
                  disabled={disabled}
                  onChange={this.handleemailChange}
                  className={[
                    "form-control",
                    "form-control-lg",
                    emailError === "" ? "" : "is-invalid",
                  ].join(" ")}
                  placeholder="Enter Email"
                />
                <div className="invalid-feedback">{emailError}</div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-group mb-2">
                  <input
                    id="password"
                    name="password"
                    type={passwordType}
                    value={password}
                    disabled={disabled}
                    onChange={this.handlePasswordChange}
                    className={[
                      "form-control",
                      "form-control-lg",
                      passwordError === "" ? "" : "is-invalid",
                    ].join(" ")}
                    placeholder="Password"
                  />
                  <div
                    className="input-group-append rounded-right"
                    data-valid={passwordError === ""}
                    data-disabled={disabled}
                  >
                    <div className="input-group-text rounded-right">
                      <span
                        className={[disabled ? "" : "cursor-pointer"].join(" ")}
                        onClick={disabled ? null : this.showHidePassword}
                      >
                        <i className={passwordIcon} aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>
                  <div className="invalid-feedback">{passwordError}</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <img src={captchaImage} />
                  </div>
                  <div className="col-md-6">
                    <input
                      id="captcha"
                      name="captcha"
                      type="text"
                      value={captcha}
                      disabled={disabled}
                      onChange={this.handleCaptchaChange}
                      className={[
                        "form-control",
                        "form-control-lg",
                        captchaError === "" ? "" : "is-invalid",
                      ].join(" ")}
                      placeholder="kode captcha"
                    />
                    <div className="invalid-feedback captcha-feedback mb-2">
                      {captchaError}
                    </div>
                    <div className="text-right ">
                      <span
                        className={[
                          "captcha-refresh",
                          disabled ? "" : "cursor-pointer",
                        ].join(" ")}
                        onClick={this.getCaptcha}
                      >
                        coba gambar lain
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 mb-3">
                  <button
                    type="submit"
                    className="btn btn-lg btn-block text-bold"
                    disabled={
                      email == "" ||
                      password == "" ||
                      captcha == "" ||
                      disabled
                    }
                  >
                    {login ? (
                      <i className="fa fa-refresh fa-spin"></i>
                    ) : (
                      "MASUK"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
      </LoginLayout>
    );
  }
}

export default connect((state) => state) (withAuthSync(Login));
