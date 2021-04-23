const homePageService = require("../services/homePageService");

let handleHelloWorld = (req, res) => res.render("home/home",{user_id:req.user.user_id});

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

module.exports = {
	handleHelloWorld,
	getFeed,
};
