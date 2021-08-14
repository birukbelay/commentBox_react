import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { format } from "timeago.js";
import { Link } from "react-router-dom";
import {PUBLIC_FOLDER} from "../../../../../Constants/constants";


export default function Post({ house }) {
  // const [like, setLike] = useState(post?.likes.length);
  // const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const { user: currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   setIsLiked(post.likes.includes(currentUser._id));
  // }, [currentUser._id, post.likes]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(`/users?userId=${post.userId}`);
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [post.userId]);

  return (
    <div className="post" style={{width:"22%", marginRight:"1em"}}>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${house.id}`}>
              View Details

            </Link>
            {/*<span className="postUsername">{user.username}</span>*/}
            { /*<span className="postDate">{format(house.)}</span>*/}
          </div>
          <div className="postTopRight">
            <MoreVert />{house.id}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Location:-     {house?.area_name}</span>
          <img className="postImg" src={PUBLIC_FOLDER +"photos/"+ house.picture} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
             <span>For:    { house.type}</span>
            {/*<span className="postLikeCounter">{like} people like it</span>*/}
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">Price: {house.price} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
