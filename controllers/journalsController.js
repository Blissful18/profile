const { NOW } = require("sequelize");
const connection = require("../configs/DBConnection");

let showJournalPage = (req,res) => {
    res.render('journals/add',{title:"",description:""});
}

let entry = (req,res) => {
    let id = req.params.journal_post_id;
    connection.query('SELECT * FROM journal_posts WHERE journal_post_id = ' + id, function(err, rows) {
        if(err) {
            req.flash('error', err);
            res.redirect('/journals');   
        } else {
            // render to views/journals/entry.ejs
            res.render('journals/entry',{id: rows[0].journal_post_id, title: rows[0].title, description: rows[0].description, create: rows[0].created_at, update: rows[0].updated_at});
        }
    });
}

let index = async (req,res) => {
    let userId = req.user.user_id;
    connection.query('SELECT * FROM journal_posts WHERE user_id =' + userId, function(err,rows)     {
        if(!err) {
            // render to views/journals/journals.ejs
            res.render('journals/journals',{data: rows});
        }
    });
}

let add = (req,res) => {
    let userId = req.user.user_id;
    let title = req.body.title;
    let description = req.body.description;
    let errors = false;
    if(!(req.body.title && req.body.description)) {
        errors = true;
        req.flash('error', "Please enter title and description");
        res.render('journals/add', {
            title: title,
            description: description
        })
    }

    if(!errors) {
        var form_data = {
            user_id: userId,
            title: title,
            description: description,
            image: null
        }
        connection.query('INSERT INTO journal_posts SET ?', form_data, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('journals/add', {
                    user_id: form_data.user_id,
                    title: form_data.title,
                    description: form_data.description,                  
                })
            } else if(result) {                
                req.flash('success', 'Journal successfully added');
                res.redirect('/journals');
            }
        })
    }
}

let deleteJournal = (req,res) => {
    let id = req.params.journal_post_id;
    connection.query('DELETE FROM journal_posts WHERE journal_post_id = ' + id, function(err, result) {
        if (err) {
            req.flash('error', err);
            res.redirect('/journals');
        } else {
            req.flash('success', 'Journal successfully deleted! Journal Post ID = ' + id);
            res.redirect('/journals');
        }
    })
}

let showUpdatePage = async (req,res) => {
    let id = req.params.id;
    connection.query('SELECT * FROM journal_posts WHERE journal_post_id = ' + id, function(err, rows) {
        if(err) throw err
        else {
            // render to views/journals/update.ejs
            res.render('journals/update', {
                title: rows[0].title, 
                id: rows[0].journal_post_id,
                description: rows[0].description,
                created_at: rows[0].created_at
            })
        }
    })
}

let edit = (req,res) => {
    let id = req.params.id;
    let title = req.body.title;
    let description = req.body.description;
    let updated_at = Date.now();
    let errors = false;
    if(!(req.body.title && req.body.description)) {
        errors = true;
        req.flash('error', "Please enter title and description");
        res.render('journalupdate', {
            id: req.params.id,
            title: title,
            description: description
        })
    }
    if( !errors ) {   
        var form_data = {
            title: title,
            description: description,
        }
        connection.query('UPDATE journal_posts SET ? WHERE journal_post_id = ' + id, form_data, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('journals/update', {
                    id: req.params.id,
                    title: form_data.title,
                    description: form_data.description
                })
            } else {
                req.flash('success', 'Journal successfully updated');
                res.redirect('/journals');
            }
        })
    }
}

module.exports = {
    showJournalPage,
    entry,
    index,
    add,
    deleteJournal,
    showUpdatePage,
    edit
}