import { useState, useEffect } from "react";

//  [X] 5 tärningar
//  [X] Slumpat nummer 1-6
//  [X] Ska kunna slå om tärningarna
// spara tärningar
// max 3 slag sen nollställa.

// Return array of dice
function createInitialDice() {
  let dice = [];
  for (let i = 0; i < 5; i++) {
    dice.push({
      id: i,
      value: Math.floor(Math.random() * 6 + 1),
      locked: false,
    });
  }

  return dice;
}
const Yatzy = () => {
  const [dice, setDice] = useState(createInitialDice());
  const [rolls, setRolls] = useState(1);
  const [outOfRolls, setOutOfRolls] = useState(false);

  useEffect(() => {
    console.log(dice);
  }, [dice]);

  function lockDie(die) {
    setDice((prevDice) => {
      return prevDice.map((item) => {
        if (item.id === die.id) {
          item = { ...die, locked: !die.locked };
        }
        return item;
      });
    });
  }

  function rollDice() {
    if (rolls < 3) {
      setDice((prevDice) => {
        return prevDice.map((item) => {
          if (!item.locked) {
            item.value = Math.floor(Math.random() * 6 + 1);
          }
          return item;
        });
      });
      setRolls((prev) => prev + 1);
    } else {
      setOutOfRolls(true);
    }
  }

  function resetRolls() {
    setOutOfRolls(false);
    setDice(createInitialDice());
    setRolls(1);
  }

  return (
    <div>
      <h1>Hello from yatzy</h1>
      {dice &&
        dice.map((die) => (
          <button key={die.id} onClick={() => lockDie(die)}>
            {die.value} {JSON.stringify(die.locked)} ID:{die.id}
          </button>
        ))}

      <div>
        <button
          onClick={() => {
            rollDice();
          }}
        >
          Roll dice
        </button>
        {outOfRolls && (
          <div>
            {" "}
            You are out of rolls{" "}
            <button onClick={() => resetRolls()}>Reset</button>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Yatzy;
