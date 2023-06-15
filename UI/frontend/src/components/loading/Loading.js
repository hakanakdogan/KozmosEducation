import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type = "balls", color = "#3ac162" }) => (
  <div className="loading">
    <ReactLoading type={type} color={color} height={"20%"} width={"20%"} />
  </div>
);

export default Loading;
