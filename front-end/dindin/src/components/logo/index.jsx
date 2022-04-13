import "./style.css";
import InnerLogo from "../../assets/inner-logo.svg";
import OutterLogo from "../../assets/outter-logo.svg";

function Logo() {
  return (
    <>
      <img className="innerLogo" src={InnerLogo} alt="Logo" />
      <img className="outterLogo" src={OutterLogo} alt="Logo" />
      <div className="logoText">
        <h3>Dindin</h3>
      </div>
    </>
  );
}

export default Logo;
