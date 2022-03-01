import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/icon.png";
import mainLogo from "../assets/icon-left-font-monochrome-black.svg";
import "../styles/Banner.css";
import { Link } from "react-router-dom";

function Banner() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userAttachement = user.attachement;

  return (
    <div className="lmj-banner">
      <img src={logo} alt="Groupomania logo" className="lmj-logo"></img>
      <div className="connexion-search">
        <Link to="/home">
          <FontAwesomeIcon
            icon={faHome}
            className="connexion-feed"
          ></FontAwesomeIcon>
        </Link>
      </div>
      <img src={mainLogo} alt="" className="main-logo"/>
      <div className="connexion-banner">
        <div className="connexion-img">
          <Link to="/profile">
            <img src={userAttachement} alt="" className="user-attachement" />
          </Link>
        </div>
        <Link to="/profile">
          <p className="connexion-firstName">{user.firstName}</p>
        </Link>
        <p
          className="connexion-disconnect"
          onClick={(e) => {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("user");
          }}
        >
          <Link to="/login">
            <FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Banner;