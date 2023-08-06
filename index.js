import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let items1 = []; // Array for root route ("/")
let items2 = []; // Array for "/work" route

app.get("/", (req, res) => {
  res.render("index.ejs", { items: items1 }); // Pass "items1" array to "index.ejs"
});

app.post("/submit", (req, res) => {
  const newItem = req.body.newItem;
  items1.push({ text: newItem, completed: false }); // Add the new item to the "items1" array
  res.redirect("/"); // Redirect to the root path to re-render the view with the updated items
});

app.post("/complete", (req, res) => {
  const index = req.body.itemIndex;
  if (index >= 0 && index < items1.length) {
    items1[index].completed = !items1[index].completed;
  }
  res.redirect("/");
});


app.get("/work", (req, res) => {
  res.render("work.ejs", { items: items2 }); // Pass "items2" array to "work.ejs"
});

app.post("/work/submit", (req, res) => {
  const newItem = req.body.newItem;
  items2.push({ text: newItem, completed: false }); // Add the new item to the "items1" array
  res.redirect("/work"); // Redirect to the root path to re-render the view with the updated items
});

app.post("/work/complete", (req, res) => {
  const index = req.body.itemIndex;
  if (index >= 0 && index < items2.length) {
    items2[index].completed = !items2[index].completed;
  }
  res.redirect("/work");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
