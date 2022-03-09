import React, { useState } from "react";
import "../styles/Signup.css";
import { Link } from "react-router-dom";
import logo2 from "../assets/icon-above-font.png";
import axios from "axios";
import { regExpNames, regExpEmail, regExpPassword } from "../utils/Regex.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function Signup() {
  const [firstName, newFirstName] = useState("");
  const [lastName, newLastName] = useState("");
  const [email, newEmail] = useState("");
  const [password, newPassword] = useState("");
  const [attachement, newAttachement] = useState(null);

  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidAttachement, setInvalidAttachement] = useState(false);

  function formValidation() {
    let validation = true;

    //Validation firstName
    if (!regExpNames.test(firstName)) {
      setInvalidFirstName(true);
      validation = false;
    } else {
      setInvalidFirstName(false);
    }

    //Validation lastName
    if (!regExpNames.test(lastName)) {
      setInvalidLastName(true);
      validation = false;
    } else {
      setInvalidLastName(false);
    }

    //Validation email
    if (!regExpEmail.test(email)) {
      setInvalidEmail(true);
      validation = false;
    } else {
      setInvalidEmail(false);
    }
    //Validation password
    if (!regExpPassword.test(password)) {
      setInvalidPassword(true);
      validation = false;
    } else {
      setInvalidPassword(false);
    }

    // Validation attachement
    if (!attachement) {
      setInvalidAttachement(true);
      validation = false;
    }
    return validation;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = formValidation();

    if (validation) {
      let formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("attachement", attachement);

      axios({
        method: "post",
        url: "http://localhost:4010/Users/signup",
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          window.alert(
            "Votre compte a été crée, bienvenue chez Groupomania ! Veuillez vous connecter pour continuer"
          );
        })
        .then(() => {
          window.location.href = "/login";
        })
        .catch((error) => {
          alert("Veuillez remplir correctement le formulaire");
        });
    }
  };

  return (
    <div>
      <div className="App-connect">
        <img src={logo2} className="logo2" alt="Logo Groupomania" />
        <h1>Bienvenue</h1>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <h2>Inscrivez-vous</h2>
          Votre prénom :
          <input
            type="text"
            placeholder="John"
            className="input"
            value={firstName}
            onChange={(e) => newFirstName(e.target.value)}
          ></input>
          {invalidFirstName && (
            <p className="signup-invalid">
              Utiliser au moin 3 lettres et pas de chiffres merci
            </p>
          )}
          Votre nom :
          <input
            type="text"
            placeholder="Doe"
            className="input"
            value={lastName}
            onChange={(e) => newLastName(e.target.value)}
          ></input>
          {invalidLastName && (
            <p className="signup-invalid">
              Utiliser au moin 3 lettres et pas de chiffres merci
            </p>
          )}
          Votre email :
          <input
            type="email"
            placeholder="toto123@gmail.com"
            className="input"
            value={email}
            onChange={(e) => newEmail(e.target.value)}
          ></input>
          {invalidEmail && (
            <p className="signup-invalid">Veuillez entrer un email valide</p>
          )}
          Votre mot de passe :
          <input
            type="password"
            placeholder="Strongestpasswordever8"
            className="input"
            value={password}
            onChange={(e) => newPassword(e.target.value)}
          ></input>
          {invalidPassword && (
            <p className="signup-invalid">
              Le mot de passe doit contenir 8 caractères, au moins une
              majuscule, une minuscule et un chiffre
            </p>
          )}
          Votre image :
          <input
            type="file"
            name="attachement"
            className="input-file"
            onChange={(e) => {
              newAttachement(e.target.files[0]);
            }}
          />
          <label className="file-cover">
            <FontAwesomeIcon
              icon={faImage}
              className="file-icon"
            ></FontAwesomeIcon>
          </label>
          {attachement && (
            <div className="postimg-container">
              <img
                className="post-img"
                alt=""
                src={URL.createObjectURL(attachement)}
              />
              <button
                onClick={() => newAttachement(null)}
                className="delete-img-post"
              >
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="deleteimg-icon"
                ></FontAwesomeIcon>
              </button>
            </div>
          )}
          {invalidAttachement && (
            <p className="signup-invalid">
              Veuillez ajouter votre photo de profil
            </p>
          )}
          <button className="login-button">Créer mon compte</button>
        </form>
        <p>
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
