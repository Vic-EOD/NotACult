const express = require("express");
const app = express();
const mysql = require("mysql2");

app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "join_us",
});

app.get("/", (req, res) => {
  //Find count of users in database
  const q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q, (error, result) => {
    if (error) throw error;
    const count = result[0].count;
    //Respond with count
    // res.send(`We have ${count} users in our db.`);
    res.render("home", { count: count });
  });
});

app.post("/register", (req, res) => {
  const person = {
    email: req.body.email,
  };

  connection.query("INSERT INTO users SET ?", person, (error, result) => {
    if (error) throw error;
    res.redirect("/");
  });
});

app.get("/joke", (req, res) => {
  const joke = "What do you call a dog who does magic? A labracadabrador!";
  res.send(joke);
});

app.get("/number", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.send(`Your lucku number is ${num}`);
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
