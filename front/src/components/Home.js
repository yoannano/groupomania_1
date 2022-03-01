import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import PostList from "./PostList";

function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4010/Posts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return <div>{posts && <PostList posts={posts} title="All Posts!" />}</div>;
}

export default Home;
