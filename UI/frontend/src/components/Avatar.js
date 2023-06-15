import React from "react";
import LetteredAvatar from "react-lettered-avatar";

const Avatar = ({size=50, name="Display Name"}) => {
  return <LetteredAvatar 
    name={name.replace("Ö","O").replace("ö","o")}
    size={size}
    backgroundColor="#3ac162"
    />;
};

export default Avatar;
