const express = require("express");
const rp = require("request-promise");
const bodyParser = require("body-parser");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: 'https://pixabay.com/get/5fe8d1434852b108f5d084609620367d1c3ed9e04e50744f7d2f7ad7974bc2_340.jpg'},
    {name: "Granite Hill", image: 'https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c73277bd5944dc35f_340.jpg'},
    {name: "Mountain Goat's Rest", image: 'https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c73277bd5944dc35f_340.jpg'}
]

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", (req, res) => {
    var newCampground = {
        name: req.body.name,
        image: req.body.image
    }
    campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

const port = process.env.PORT || 5000;
app.listen(port, () => `Yelp Camp server is running on port ${port} 🔥`);