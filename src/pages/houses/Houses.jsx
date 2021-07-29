import React from "react"
import Topbar from "../../components/topbar/Topbar";

import Feed from "./feed/Feed";

import "./home.css"

export default function Houses() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        
        <Feed/>
      
      </div>
    </>
  );
}
