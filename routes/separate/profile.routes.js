module.exports = (app) => {
    const isLoggedinMW = require('../../controllers/loginController').checkLoggedIn;
    const profile = require('../../controllers/profileController.js');

    app.get('/profile',isLoggedinMW, profile.index)
    app.get('/profile/:user_id/update',isLoggedinMW, profile.showUpdatePage)
    app.post('/profile/:id/update',isLoggedinMW, profile.edit)
    app.get('/profile/:user_id/changepassword',isLoggedinMW, profile.showChangePage)
    app.post('/profile/:id/changepassword',isLoggedinMW, profile.change)
    
}