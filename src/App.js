import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";
import Confetti from "react-confetti";
import { jsx } from "react/jsx-runtime";
import ScoreBoard from "./ScoreBoard";

export default function App() {
  const [dice, setDice] = React.useState(createAllDice());
  const [tenzies, setTenzies] = React.useState(false);

  const [rolls, setRolls] = React.useState(0);
  const [bestRolls, setBestRolls] = React.useState(
    JSON.parse(localStorage.getItem("bestRolls")) || 0
  );
  const [bestTime, setBestTime] = React.useState(
    JSON.parse(localStorage.getItem("bestTime")) || 0
  );

  React.useEffect(() => {
    localStorage.setItem("bestRolls", JSON.stringify(bestRolls));
  }, [bestRolls]);

  React.useEffect(() => {
    localStorage.setItem("bestTime", JSON.stringify(bestTime));
  }, [bestTime]);

  React.useEffect(() => {
    const firstImg = dice.every((img) => img.isHeld);
    const standardImgValue = dice[0].value;
    const allSameImages = dice.every((img) => img.value === standardImgValue);
    if (firstImg && allSameImages) {
      setTenzies(true);
      setStart(false);
      setRecords();
    }
  }, dice);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 9),
      id: nanoid(),
      isHeld: false,
    };
  }

  function createAllDice() {
    const diceArr = [];
    for (let i = 0; i < 9; i++) {
      diceArr.push(generateNewDice());
    }
    return diceArr;
  }

  function holdImg(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die
      )
    );
  }

  function rollImg() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => (die.isHeld ? die : generateNewDice()))
      );
      updateRolls();
    } else {
      setDice(createAllDice);
      setTenzies(false);
      setTime(0);
      setStart(true);
      setRolls(0);
    }
  }

  function setRecords() {
    if (!bestRolls || rolls < bestRolls) {
      setBestRolls(rolls);
    }

    const timeFloored = Math.floor(time / 10);
    if (!bestTime || timeFloored < bestTime) {
      setBestTime(timeFloored);
    }
  }

  function updateRolls() {
    setRolls((oldRolls) => oldRolls + 1);
  }

  // Set time::::::::::::::::::::
  const [time, setTime] = React.useState(0);
  const [start, setStart] = React.useState(true);

  React.useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTime((oldTime) => oldTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start]);
  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      id={die.id}
      key={die.key}
      isHeld={die.isHeld}
      holdImg={() => holdImg(die.id)}
    />
  ));

  return (
    <div className="main-container">
      {tenzies && <Confetti />}
      <div className="heading">
        <h1>Welcome to Animals Dice Game 🐇</h1>
        <p className="text">
          Roll untill all animals are the same!! You can click each animal to
          freez it ❄<br></br> Good Luck!
        </p>
      </div>
      <center>
        <div
          // style={{ position: tenzies ? "relative" : "" }}
          className="time-div"
        >
          <p>
            Timer: {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
            {("0" + ((time / 10) % 1000)).slice(-2)}
          </p>
          <p>Rolls: {rolls}</p>
        </div>
        <ScoreBoard bestTime={bestTime} bestRolls={bestRolls} />
        <div
          style={{
            opacity: tenzies ? ".2" : 1,
            // border: tenzies ? "solid 20px white" : "",
            // borderRadius: tenzies ? "50px" : "",
            // padding: tenzies ? "2rem" : "",
          }}
          className="dice-container"
        >
          {diceElements}
        </div>
        <p className="win-text">
          {tenzies && "Congratulations🎉✨🎉 YOU WON!!!"}
        </p>
        <button onClick={rollImg} className="roll-btn">
          {tenzies ? "NEW GAME" : "Click To Roll"}
        </button>
      </center>
    </div>
  );
}
