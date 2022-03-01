import "../styles/Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import axios from "axios";

// Component
function Post() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [content, setContent] = useState("");
  const [attachement, setAttachement] = useState(null);

  // Initialisation de bouton
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("content", content);
    formData.append("attachement", attachement);

    axios({
      method: "post",
      url: "http://localhost:4010/Posts/",
      data: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        window.alert("Publication impossible");
      });
  };

  return (
    <>
      <div className="App-body">
        <form className="App-post">
          <h1 className="post-title">Exprimez-vous :</h1>
          <div>
            {attachement && (
              <div className="postimg-container">
                <img
                  className="post-img"
                  alt=""
                  src={URL.createObjectURL(attachement)}
                />
                <button
                  onClick={() => setAttachement(null)}
                  className="delete-img-post"
                >
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="deleteimg-icon"
                  ></FontAwesomeIcon>
                </button>
              </div>
            )}
          </div>
          <div className="post-container">
            <textarea
              type="text"
              className="textarea"
              maxLength="250"
              placeholder={"Quoi de neuf, " + user["firstName"] + " ?"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <input
              type="file"
              name="attachement"
              className="input-file"
              onChange={(e) => {
                setAttachement(e.target.files[0]);
              }}
            />
            <label className="file-cover">
              <FontAwesomeIcon
                icon={faImage}
                className="file-icon"
              ></FontAwesomeIcon>
            </label>
            <button
              type="button"
              onClick={handleSubmit}
              className="login-button"
            >
              {" "}
              Publier{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Post;
