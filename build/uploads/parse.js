/* 
    Chris Rudel
    I don't know if there's code out there that already does this but it didnt take too long to make

*/

const fs = require("fs");
const file = require("./output.json");
let jsonString = JSON.stringify(file);
let json = JSON.parse(jsonString);

let games = json.games;
let player1Name = games[0].players[0].nametag;
let player2Name = games[0].players[1].nametag;
if (player1Name === "") {
  player1Name = "Player1";
}
if (player2Name === "") {
  player2Name = "Player2";
}

for (let i = 0; i < json.summary.length; i++) {
  let name = json.summary[i].name;
  let results = json.summary[i].results;
  let p1results;
  let p2results;
  if (
    !(
      json.summary[i].id === "killMoves" ||
      json.summary[i].id === "neutralOpenerMoves"
    )
  ) {
    p1results = Math.round(results[0].simple.number * 10) / 10;
    p2results = Math.round(results[1].simple.number * 10) / 10;
  } else {
    p1results = results[0].simple.text;
    p2results = results[1].simple.text;
  }
  let text =
    name +
    ": " +
    player1Name +
    ": " +
    p1results +
    ", " +
    player2Name +
    ": " +
    p2results;
  //console.log(text);
  fs.appendFile("simpleOutput.txt", text + "\n", (err) => {
    if (err) throw err;
  });
}
