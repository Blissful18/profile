const homePageService = require("../services/homePageService");
const { NOW } = require("sequelize");
const connection = require("../configs/DBConnection");


let handleHelloWorld = (req, res) => {
	let userId = req.user.user_id;
    connection.query('SELECT * FROM journal_posts WHERE user_id =' + userId, function(err,rows)     {
        if(!err) {
            // render to views/journals/journals.ejs
            res.render('home/home',{data: rows});
        }
    });
	// res.render("home/home",{user_id:req.user.user_id});
}

let getFeed = (req, res) => {
	homePageService
		.getUserFeed(req.user.user_id, req.query.offset)
		.then((results) => {
			res.send({  results });
		})
		.catch((e) => {
			res.status(500).send();
		});
};

// let index = async (req,res) => {
//     let userId = req.user.user_id;
//     connection.query('SELECT * FROM journal_posts WHERE user_id =' + userId, function(err,rows)     {
//         if(!err) {
//             // render to views/journals/journals.ejs
//             res.render('home/home',{data: rows});
//         }
//     });
// }

module.exports = {
	handleHelloWorld,
	getFeed,
};
