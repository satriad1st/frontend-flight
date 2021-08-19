import { connect } from "react-redux";

class LoginLayout extends React.Component {
    render() {
      return (
        <section className="container-fluid login-page">
          <div className="login-box">{this.props.children}</div>
        </section>
      );
    }
  }
  
  export default connect((state) => state)(LoginLayout);
  