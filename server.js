//Cyclic url: //Cyclic url: https://gray-abalone-hat.cyclic.app/


var express = require("express");
var app = express();
var data_prep = require("./data_prep.js");
var path = require("path");
const exphbs = require("express-handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on " + HTTP_PORT);
}

//Tell server to use handlebars
app.engine(".hbs", exphbs.engine({
    extname:".hbs" ,
    defaultLayout: "main"
}));
app.set("view engine", ".hbs");



//Route
app.get("/", (req, res) => {
    res.render("home");
});



//CPA Students
app.get("/CPA", (req, res) => {
    data_prep.cpa().then((data) => {
        res.render("students", { students: data })
    }).catch((reason) => {
        res.json({ message: reason });
    });

});


//All Students
app.get("/allStudents", (req, res) => {
    data_prep.allStudents().then((data) => {
        res.render("students", { students: data })
    }).catch((reason) => res.json({ message: reason }));
});


//Add a new student
app.get("/addStudent", (req, res) => {
    res.render("addStudent");
});
app.post("/addStudent", (req, res) => {
    data_prep.addStudent(req.body).then(() => {
        var data = req.body;
        res.render("addStudent", { data })
    }).catch((reason) => res.json({ message: reason }));

});


//Highest GPA
app.get("/highGPA", (req, res) => {
    data_prep.highGPA().then((data) => {
        res.render("student", { data })
    });
});


//Error
app.get("*", (req, res)=>{
    res.status(404).send("Error 404: page not found.")
});


//intitization
data_prep.prep().then((data)=>{
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err)=>{
    console.log(err);
});
