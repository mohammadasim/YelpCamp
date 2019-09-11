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
    {name: "Salmon Creek", image: 'https://image.shutterstock.com/image-photo/vacation-caravan-natural-landscape-260nw-1380610373.jpg'},
    {name: "Granite Hill", image: 'https://image.shutterstock.com/image-photo/camper-camping-glacier-lake-van-260nw-471344468.jpg'},
    {name: "Mountain Goat's Rest", image: 'https://image.shutterstock.com/image-photo/family-vacation-travel-holiday-trip-260nw-706056724.jpg'}
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