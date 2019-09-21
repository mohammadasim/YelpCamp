const Comment = require("./models/comment");
const Campground = require("./models/campground");

var seeds = [{
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Faucibus scelerisque eleifend donec pretium vulputate sapien.Elementum facilisis leo vel fringilla est ullamcorper.</p> <p>Ullamcorper eget nulla facilisi etiam dignissim diam.Nisi vitae suscipit tellus mauris a diam.Nibh praesent tristique magna sit amet purus gravida quis blandit.Sit amet consectetur adipiscing elit ut aliquam.Mauris rhoncus aenean vel elit.Vitae tempus quam pellentesque nec nam aliquam sem et.A cras semper auctor neque vitae tempus quam pellentesque nec.Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus.Nunc non blandit massa enim nec.Vulputate sapien nec sagittis aliquam.Mauris ultrices eros in cursus turpis massa tincidunt dui ut.Hendrerit gravida rutrum quisque non tellus orci.Ac ut consequat semper viverra nam libero justo.Pretium aenean pharetra magna ac placerat vestibulum lectus mauris</p>"
    },
    {
        name: "Desert Mesa",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Faucibus scelerisque eleifend donec pretium vulputate sapien.Elementum facilisis leo vel fringilla est ullamcorper.</p> <p>Ullamcorper eget nulla facilisi etiam dignissim diam.Nisi vitae suscipit tellus mauris a diam.Nibh praesent tristique magna sit amet purus gravida quis blandit.Sit amet consectetur adipiscing elit ut aliquam.Mauris rhoncus aenean vel elit.Vitae tempus quam pellentesque nec nam aliquam sem et.A cras semper auctor neque vitae tempus quam pellentesque nec.Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus.Nunc non blandit massa enim nec.Vulputate sapien nec sagittis aliquam.Mauris ultrices eros in cursus turpis massa tincidunt dui ut.Hendrerit gravida rutrum quisque non tellus orci.Ac ut consequat semper viverra nam libero justo.Pretium aenean pharetra magna ac placerat vestibulum lectus mauris</p>"
    },
    {
        name: "Canyon Floor",
        image: "https://images.pexels.com/photos/1309587/pexels-photo-1309587.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        description: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Faucibus scelerisque eleifend donec pretium vulputate sapien.Elementum facilisis leo vel fringilla est ullamcorper.</p> <p>Ullamcorper eget nulla facilisi etiam dignissim diam.Nisi vitae suscipit tellus mauris a diam.Nibh praesent tristique magna sit amet purus gravida quis blandit.Sit amet consectetur adipiscing elit ut aliquam.Mauris rhoncus aenean vel elit.Vitae tempus quam pellentesque nec nam aliquam sem et.A cras semper auctor neque vitae tempus quam pellentesque nec.Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus.Nunc non blandit massa enim nec.Vulputate sapien nec sagittis aliquam.Mauris ultrices eros in cursus turpis massa tincidunt dui ut.Hendrerit gravida rutrum quisque non tellus orci.Ac ut consequat semper viverra nam libero justo.Pretium aenean pharetra magna ac placerat vestibulum lectus mauris</p>"
    }
]
var comment = {
    text: "Very nice place. Enjoyed my time there. Close to nature and nice facilities. No wifi and phone singnal is weak as well. Hope they will setup a wifi.",
    author: "The camping family"

}
async function seedDB() {

    try {
        //Remove all campgrounds
        await Campground.deleteMany({});
        // Remove all comments
        await Comment.deleteMany({});
        console.log("************************ CAMPGROUNDS & COMMENTS REMOVED *********************************");
        //Create campgrounds
        for (const seed of seeds) {
            Campground.create(seed).then((createdCampground) => {
                    // Create comment
                    Comment.create(comment).then((newComment) => {
                        createdCampground.comments.push(newComment);
                        createdCampground.save();
                    }).catch((err) => {
                        console.log("An Error occured while creating new comment ", err)
                    });

                })
                .catch((err) => {
                    console.log("An Error occured while creating a new campground", err);
                })
        }
    } catch (error) {

    }
}
module.exports = seedDB;