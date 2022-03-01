import React, { useState } from "react";
import "../styles/UserAccount.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { regExpNames, regExpEmail, regExpPassword } from "../utils/Regex.js";
import axios from "axios";

function UserAccount() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [firstName, modifyFirstName] = useState("");
  const [lastName, modifyLastName] = useState("");
  const [email, modifyEmail] = useState("");
  const [password, modifyPassword] = useState("");
 

  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [ setInvalidPassword] = useState(false);

  function formValidation() {
    let validation = true;
    //Validation firstName
    if (firstName) {
      if (!regExpNames.test(firstName)) {
        setInvalidFirstName(true);
        validation = false;
      } else {
        setInvalidFirstName(false);
      }
    }

    //Validation lastName
    if (lastName) {
      if (!regExpNames.test(lastName)) {
        setInvalidLastName(true);
        validation = false;
      } else {
        setInvalidLastName(false);
      }
    }

    //Validation email
    if (email) {
      if (!regExpEmail.test(email)) {
        setInvalidEmail(true);
        validation = false;
      } else {
        setInvalidEmail(false);
      }
    }
     //Validation password
     if (!regExpPassword.test(password)) {
      modifyPassword(true);
      validation = false;
    } else {
      setInvalidPassword(false);
    }
    return validation;
  }

  const modifyAccount = (e, id) => {
    const validation = formValidation();
    e.preventDefault();
    if (validation) {
      const data = {
        id: id ? id : user.id,
        attachement: user.attachement,
        firstName: firstName ? firstName : user.firstName,
        lastName: lastName ? lastName : user.lastName,
        email: email ? email : user.email,
        password: password ? password : user.password,
      };
      axios({
        method: "put",
        url: `http://localhost:4010/Users/${id}`,
        data: data,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }
  };

  const deleteAccount = (e, id) => {
    e.preventDefault();

    fetch(`http://localhost:4010/Users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        window.location.href = "/signup";
      })
      .catch((err) => {
        console.log(err);
        window.alert("Suppression du compte impossible !");
      });
  };

  return (
    <div className="App-connect">
      <form className="form" onSubmit={(e) => modifyAccount(e, user.id)}>
        <img
          src={user.attachement}
          value={user.attachement}
          className="profile-img"
          alt="Votre avatar"
        />
        <h1 className="user-title">Vos informations</h1>
        Votre prénom :
        <input
          type="text"
          className="input"
          placeholder={user["firstName"]}
          id="firstName"
          value={firstName}
          onChange={(e) => modifyFirstName(e.target.value)}
        ></input>
        {invalidFirstName && (
          <p className="signup-invalid">
            Veuillez uniquement utiliser des lettres et non des chiffres
          </p>
        )}
        Votre nom :
        <input
          type="text"
          className="input"
          placeholder={user["lastName"]}
          id="lastName"
          value={lastName}
          onChange={(e) => modifyLastName(e.target.value)}
        ></input>
        {invalidLastName && (
          <p className="signup-invalid">
            Veuillez uniquement utiliser des lettres et non des chiffres
          </p>
        )}
        Votre email :
        <input
          type="email"
          placeholder="toto123@gmail.com"
          className="input"
          placeholder={user["email"]}
          id="email"
          value={email}
          onChange={(e) => modifyEmail(e.target.value)}
        ></input>
        {invalidEmail && (
          <p className="signup-invalid">Veuillez entrer un email valide</p>
        )}
          {/* Votre mot de passe :
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => modifyPassword(e.target.value)}
          ></input>
          {invalidPassword && (
            <p className="signup-invalid">
              Le mot de passe doit contenir 8 caractères, au moins une
              majuscule, une minuscule et un chiffre
            </p>
          )} */}
        <button
          className="login-button"
          onClick={(e) => modifyAccount(e, user.id)}
        >
          Enregistrer
        </button>
        <Link to="/signup">
          <button
            onClick={(e) => deleteAccount(e, user.id)}
            className="delete-user"
          >
            Supprimer le compte{" "}
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button>
        </Link>
      </form>
    </div>
  );
}

export default UserAccount;
