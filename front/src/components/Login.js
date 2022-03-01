import React, { useState } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import logo2 from "../assets/icon-above-font.png";
import { regExpEmail, regExpPassword } from "../utils/Regex.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  function formValidation() {
    let validation = true;

    //Validation lastName
    if (!regExpEmail.test(email)) {
      setInvalidEmail(true);
      validation = false;
    } else {
      setInvalidEmail(false);
    }
    // Validation lastName
    if (!regExpPassword.test(password)) {
      setInvalidPassword(true);
      validation = false;
    } else {
      setInvalidPassword(false);
    }
    return validation;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = formValidation();

    if (validation) {
      const data = {
        email: email,
        password: password,
      };

      fetch("http://localhost:4010/Users/login", {
        method: "POST",
        
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            res.json().then((response) => {
              localStorage.setItem("token", response.token);
              localStorage.setItem("user", JSON.stringify(response.user));
              window.location.href = "/home";
            });
          } else {
            window.alert("Connexion impossible, veuillez vous reconnecter");
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          window.alert("Connexion impossible");
        });
    }
  };

  return (
    <div className="App-connect">
      <img src={logo2} className="logo2" alt="Groupomania logo" />
      <h1>Bienvenue</h1>
      <form className="form" name="form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Se connecter</h2>
        <label htmlFor="email">Votre email :</label>
        <input
          type="email"
          className="input"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {invalidEmail && (
          <p className="signup-invalid">Veuillez entrer un email valide</p>
        )}
        <label htmlFor="password">Votre mot de passe :</label>
        <input
          type="password"
          className="input"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {invalidPassword && (
          <p className="signup-invalid">
            Veuillez entrer un mot de passe valide
          </p>
        )}
        <button className="login-button" value="Connexion">
          Connexion
        </button>
      </form>
      <p>
        Vous n'avez pas de compte ? <Link to="/signup">S'inscrire</Link>
      </p>
    </div>
  );
}

export default Login;
