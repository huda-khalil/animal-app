import React from "react";

export default function ScoreBoard(props) {
  return (
    <div>
      <div className="board-div">
        <p>
          <span className="span-text">Best Roll:</span> {props.bestRolls}
        </p>
        <p>
          <span className="span-text">Best Time:</span> {props.bestTime / 100}s
        </p>
      </div>
    </div>
  );
}
