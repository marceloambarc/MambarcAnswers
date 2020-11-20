//Express Config
const express = require("express");
const app = express();

//Body Parser
const bodyParser = require("body-parser");

//Conection with Database
const connection = require("./database/database");

//modules
const Question = require("./database/Questions");
const Answer = require("./database/Answers");

//Database Configuration
connection
    .authenticate()
    .then(() => {
        console.log("Connection with Database ON!")
    })
    .catch((msnErro) => {
        console.log(msnErro);
    })

//Express use EJS for View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Body Parser Configuration
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//Routes
app.get("/",(req,res) => {
    //Take from Database
    Question.findAll({ raw : true, order : [
        ['id','DESC'] //ASC = ascender | DESC = descender
    ]}).then(questions => {
        res.render("index", {
            questions : questions
        });
    });
});

app.get("/ask",(req,res) => {
    res.render("ask");
});

app.post("/savequestion",(req,res) => {
    var title = req.body.title;
    var description = req.body.description;

    //Send to Database
    Question.create({
        title : title,
        description : description
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/question/:id",(req,res) => {
    var id = req.params.id;
    Question.findOne({
        where : { id : id }
    }).then(question => {
        if(question != undefined){ //Question Found
            Answer.findAll({
                where : { questionId : question.id },
                oder : [['id', 'DESC']]
            }).then(answers => {
                res.render("question",{
                    question : question,
                    answers : answers
                });
            });
        } else { //Not Found
            res.redirect("/");
        }
    });
});

app.post("reply",(req,res) => {
    var body = req.body.body;
    var questionId = req.body.question;
    Answer.create({
        body : body,
        questionId : questionId
    }).then(() => {
        res.redirect("/question/"+questionId);
    });
});

//Port Used
app.listen(8080,() => {
    console.log("App is running...")
})