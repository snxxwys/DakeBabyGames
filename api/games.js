const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "games.json");

module.exports = (req, res) => {
  if (req.method === "GET") {
    const data = fs.readFileSync(filePath, "utf8");
    res.status(200).json(JSON.parse(data));
  } else if (req.method === "POST") {
    const game = req.body;

    let games = [];
    if (fs.existsSync(filePath)) {
      games = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
    games.push(game);

    fs.writeFileSync(filePath, JSON.stringify(games, null, 2));
    res.status(201).json({ success: true, game });
  } else {
    res.status(405).end();
  }
};
