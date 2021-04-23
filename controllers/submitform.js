const emailService = require('./../services/emailService');
const registerService = require('./../services/registerService');

// let handleSubmitForm = async (req, res) => {
// 	let email = req.body.email_address;
// 	let token = await emailService.findUserToken(email);// you need find the user's token by their email
// 	let htmlContent = 
// 	`<div> 
// 		Hello world with nodemailer.
// 		 <a href="http://localhost:8080/verify/${token}>Click this link to verify your account. </a>
// 	<div>`;
	
// 	await emailService.sendEmailNormal(email, "You just created an account!",htmlContent);
	
// }

let verifyAccount = async (req, res)=> {
	let token = req.params.token;
	let email = await registerService.findUserEmail(token)
	let status = await emailService.verifyAccount(token,email.email_address)
	
	if(status === true) {
		if(email){
		
			return res.redirect("/login");
		}
		
    }
	else return res.redirect("/register");
};

module.exports = {
 //   handleSubmitForm: handleSubmitForm,
    verifyAccount: verifyAccount
};
