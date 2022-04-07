import "./style.css";
import Logo from "../logo";
import ProfileIcon from "../../assets/profileIcon.svg";
import LogoutIcon from "../../assets/logout.svg";

function Header() {
  return (
    <header>
      <div className="headerBackground">
        <Logo />
        <img className="profileIcon" src={ProfileIcon} alt="profile" />
        <div className="userContainer">
          <span>Bruno</span>
        </div>
        <img className="logoutIcon" src={LogoutIcon} alt="logout" />
      </div>
    </header>
  );
}

export default Header;
