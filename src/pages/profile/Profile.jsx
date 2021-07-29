import "./profile.css";
import Topbar from "../../components/topbar/Topbar";

import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {API_ROOT, PUBLIC_FOLDER} from "../../store/constants";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [house, setHouse] = useState({});
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(API_ROOT+`house/${username}`);
            console.log("house single ==>", res.data)
            setHouse(res.data);
        };
        fetchUser();
    }, [username]);

    return (
        <>
            <Topbar />
            <div className="profile">
                {/*<Sidebar />*/}
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={
                                    house.coverPicture
                                        ? PUBLIC_FOLDER +"photos/"+ house.picture
                                        : PUBLIC_FOLDER + "photos/11.jpg"
                                }
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={
                                    house.picture
                                        ? PUBLIC_FOLDER +"photos/"+ house.picture
                                        : PF + "person/noAvatar.png"
                                }
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{house.price}</h4>
                            <span className="profileInfoDesc">{house.description}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        {/*<Feed username={username} />*/}
                        <div style={{width:"30%"}}>

                        </div>
                        <div style={{alignContent:"center", display:"flex"}}>

                            <Rightbar house={house} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
