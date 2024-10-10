import React from "react";

export default function Die(props) {
  let dieFace = "";

  switch (props.value) {
    case 1:
      dieFace = require("./img/image1.png");
      break;
    case 2:
      dieFace = require("./img/image2.png");
      break;
    case 3:
      dieFace = require("./img/image3.png");
      break;
    case 4:
      dieFace = require("./img/image4.png");
      break;
    case 5:
      dieFace = require("./img/image5.png");
      break;
    case 6:
      dieFace = require("./img/image6.png");
      break;
    case 7:
      dieFace = require("./img/image7.png");
      break;
    case 8:
      dieFace = require("./img/image8.png");
      break;
    case 9:
      dieFace = require("./img/image9.jpg");
      break;
    default:
      break;
  }

  const styles = {
    borderColor: props.isHeld ? "purple" : "",
  };
  return (
    <div className="img-div">
      <img
        className="die-img"
        onClick={props.holdImg}
        style={styles}
        src={dieFace}
      />
    </div>
  );
}
