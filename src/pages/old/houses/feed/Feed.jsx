import React from "react"
import { useContext, useEffect, useState } from "react";
import Post from "./post/Post";

import "./feed.css";
import axios from "axios";


export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    const fetchPosts = async () => {
      const res =  await axios.get("http://localhost:5000/house");
      console.log("Houses Data1",res.data)

      setPosts(
        res.data
      );
      console.log("Houses Data",res.data)
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper" style={{display:"flex", flexWrap:"wrap"}}>
        {/* {(!username || username === user.username) && <Share />} */}
        {posts.map((p) => (
          <Post key={p.id} house={p} />
        ))}
      </div>
    </div>
  );
}
