import "../styles/Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faWrench,
  faImage,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import React, { useState, useEffect } from "react";
import axios from "axios";

const PostList = ({ posts, test }) => {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user["id"];

  const deletePost = (e, id) => {
    e.preventDefault();
    fetch(`http://localhost:4010/Posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        window.location.href = "/PostList";
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  const [focusPost, setFocusPost] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [content, modifyContent] = useState("");
  const [attachement, modifyAttachement] = useState(null);

  const modifyPost = (e, id) => {
    let formData = new FormData();
    formData.append("content", content);
    formData.append("attachement", attachement);

    axios({
      method: "put",
      url: `http://localhost:4010/Posts/${id}`,
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

  //Get all comments
  const getAllComments = () => {
    fetch("http://localhost:4010/Comments/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  const [listComments, setComments] = useState([]);
  useEffect(getAllComments, []);

  //Create a comment
  const [comment, newComment] = useState("");
  const addComment = (e, id) => {
    e.preventDefault();

    const data = { comment: comment };
    fetch("http://localhost:4010/Comments/" + id, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        getAllComments();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  const deleteComment = (e, id) => {
    e.preventDefault();
    fetch("http://localhost:4010/Comments/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        window.location.href = "/home";
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  return (
    <div className="App-posts">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-infos">
            <div className="post-name">
              <div>
                <img
                  src={post.User.attachement}
                  className="post-picture"
                  alt=""
                />
              </div>
              <div>
                <p>
                  <strong>
                    {post.User.firstName} {post.User.lastName}
                  </strong>
                </p>
                <Moment format="D MMM YYYY">{post.createdAt}</Moment>
              </div>
            </div>
            {(userId === post.User.id  ) && (
              <div className="post-actions">
                <FontAwesomeIcon
                  icon={faWrench}
                  className="deletePost-icon"
                  onClick={() => {
                    setVisible(!visible);
                    setFocusPost(post.id);
                  }}
                >
                  {visible
                    ? "Annulez votre modification!"
                    : "Modifiez votre publication"}
                </FontAwesomeIcon>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="deletePost-icon"
                  onClick={(e) => deletePost(e, post.id)}
                ></FontAwesomeIcon>
              </div>
            )}
          </div>
          <p>{post.content}</p>
          {post.attachement !== null && (
            <img className="post-image" src={post.attachement} alt="" />
          )}
          <div className="post-border"></div>

          <form onSubmit={(e) => addComment(e, post.id)}>
            <label>
              <br />
              <input
                name="comment"
                placeholder="Votre commentaire..."
                maxLength="250"
                value={comment.id}
                onChange={(e) => newComment(e.target.value)}
                className="comment-input"
              ></input>
            </label>
          </form>
          <div>
            {listComments
              .filter((comment) => comment.PostId === post.id)
              .map((comment, id) => {
                return (
                  <div key={comment.id} className="comments-container">
                    <div className="comment-picture">
                      <img
                        src={comment.User.attachement}
                        alt=""
                        className="post-picture"
                      />
                    </div>
                    <div className="comments-infos">
                      <p className="comments-user">
                        {comment.User.firstName} {comment.User.lastName}
                      </p>
                      <p className="comments-date">
                        Le{" "}
                        <Moment format="D MMM YYYY">{comment.createdAt}</Moment>
                      </p>
                    </div>
                    <div className="comments-content">
                      {comment.comment}
                      {(userId === comment.User.id ) && (
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="deleteComment-icon"
                          onClick={(e) => deleteComment(e, comment.id)}
                        ></FontAwesomeIcon>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          {visible && focusPost === post.id && (
            <form
              className="modify-form"
              onSubmit={(e) => modifyPost(e, post.id)}
            >
              <h2 className="modify-title">Modifiez votre publication</h2>
              <div key={post.id} className="modify-inputs">
                <label htmlFor="content" className="modify-label">
                  <textarea
                    type="text"
                    name="message"
                    placeholder="Modifiez votre publication"
                    className="modify-textarea"
                    defaultValue={post.content}
                    onChange={(e) => modifyContent(e.target.value)}
                  ></textarea>
                </label>
                <input
                  type="file"
                  name="attachement"
                  className="input-file"
                  onChange={(e) => modifyAttachement(e.target.files[0])}
                ></input>
                <label htmlFor="attachement" className="file-cover">
                  <FontAwesomeIcon
                    icon={faImage}
                    className="file-icon"
                  ></FontAwesomeIcon>
                  {!attachement && (
                    <img
                      className="post-image-modify"
                      src={post.attachement}
                      alt=""
                    />
                  )}
                </label>
                {attachement && (
                  <div className="postimg-container-modify">
                    <img
                      className="post-img"
                      alt=""
                      src={URL.createObjectURL(attachement)}
                    />
                    <button
                      onClick={() => modifyAttachement(null)}
                      className="delete-img"
                    >
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="deleteimg-icon"
                      ></FontAwesomeIcon>
                    </button>
                  </div>
                )}
              </div>
              <button className="login-button" onClick={modifyPost}>
                Enregistrer
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
