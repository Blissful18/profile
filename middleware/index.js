var Journal = require("../models/journal");

module.exports = {
    checkUserJournal: function(req, res, next){
        if(req.isAuthenticated()){
            Journal.findById(req.params.id, function(err,journal){
                if(AudioDestinationNode.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that!");
                    console.log("BADD!!!");
                    res.redirect("/journals" + req.params.id);
                }
            });
        } else {
            req.flash("error", "You need to be signed in to do that!");
            res.redirect("/Journalentry");
        }
    }
}