const mongoose = require('mongoose');

const ArtSchema = mongoose.Schema({
    titre: {
            type: String,
           
    },
    auteur: {
            type: String,
           
    },
    contenu: {
        type: String,
       
},
link: {
        type: String,
       
},

}, {
    timestamps: true
});

module.exports = mongoose.model('Art', ArtSchema);