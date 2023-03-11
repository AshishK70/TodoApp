//jshint esverions 6
// installing basic modules such as express and body-parser
const express = require("express");
const bodyParser = require("body-parser");

// now we declare a variable and give all the access of express to this variable
const app = express();

// creating a basic array field to use in our form
var items = ["Buy Food", "Cook Food", "Eat Food"];

//setting view engine to ejs as we use ejs on the frontend
app.set("view engine", "ejs");
// now we add body-Parser to take input and deliever output as we require
app.use(bodyParser.urlencoded({
    extended:true
}));
// adding css/images/js files to render in frontend using express static
app.use(express.static("public"));

// creating a function to get data and deleiver data to frontend
app.get("/", function (req, res) {
    var today = new Date();
    // changing date format by declaring a ojbect
    var options ={
        weekday: "long",
        day:"numeric",
        month:"long"
    }

    var day = today.toLocaleDateString("en-US",options);
    // sending data back to frontend
    res.render("list",{
        kindOfDay:day,
        newListItems:items
    });

});
// creating a function to post data to frontend for item variable which user will input in the form
app.post("/",function(req,res){
    var item = req.body.newItem;
    // now adding the newly added value by user to the array
    items.push(item);
    res.redirect("/")
});

// setting up the local server
app.listen(3000, function () {
    console.log("port working at 3000");
});
