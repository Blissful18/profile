module.exports = (app) => {
    const isLoggedinMW = require('../../controllers/loginController').checkLoggedIn;
    const journal = require('../../controllers/journalsController.js');

    app.get('/journals',isLoggedinMW, journal.index)
    app.get('/journals/:journal_post_id/entry',isLoggedinMW, journal.entry)
    app.get('/journals/add',isLoggedinMW, journal.showJournalPage)
    app.post('/journals/add',isLoggedinMW, journal.add)
    app.get('/journals/:id/update',isLoggedinMW, journal.showUpdatePage)
    app.post('/journals/:id/update',isLoggedinMW, journal.edit)
    app.get('/journals/:journal_post_id/delete',isLoggedinMW, journal.deleteJournal)
    
}