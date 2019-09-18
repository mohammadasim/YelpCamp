const mongoose = require("./connection");
const Comment = require("./models/comment");
const Campground = require("./models/campground");

var seeds = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
var comment = {
    text: "Very nice place. Enjoyed my time there. Close to nature and nice facilities. No wifi and phone singnal is weak as well. Hope they will setup a wifi.",
    author: "theCampingBoy"

}
async function seedDB(){
    
    try {
        //Remove all campgrounds
        await Campground.deleteMany({});
        // Remove all comments
        await Comment.deleteMany({});
        console.log("************************ CAMPGROUNDS & COMMENTS REMOVED *********************************");
        //Create campgrounds
        for (const seed of seeds) {
            Campground.create(seed).then((createdCampground)=>{
                // Create comment
                Comment.create(comment).then((newComment)=>{
                    createdCampground.comments.push(newComment);
                    createdCampground.save();
                }).catch((err) =>{console.log("An Error occured while creating new comment ", err)}); 
                
            })
            .catch((err) =>{
                console.log("An Error occured while creating a new campground", err);
            })
        }
    } catch (error) {
        
    }
}
module.exports = seedDB;

