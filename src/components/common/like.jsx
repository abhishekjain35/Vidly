import React from "react";

const Like = props => {
  let classes = "fa-heart fa";
  !props.liked ? (classes += "r") : (classes += "s");
  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
    ></i>
  );
};

export default Like;

// class Like extends Component {
//   render() {
//   }
// }
