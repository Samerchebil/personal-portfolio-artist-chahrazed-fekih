const Art = require('../models/art.model.js');

// Create and Save a new art
exports.create = (req, res) => {
    // Validate request
    if(!req.body.titre) {
        return res.status(400).send({
            message: "article content can not be empty"
        });
    }

    // Create a article
    const art = new Art({
        titre: req.body.titre || "Untitled Article", 
        auteur : req.body.auteur,
        contenu: req.body.contenu,
        link: req.body.link,

    });

    // Save art in the database
    art.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the art."
        });
    });
};

// Retrieve and return all art from the database.
exports.findAll = (req, res) => {
    Art.find()
    .then(arts => {
        res.send(arts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving arts."
        });
    });
};

// Find a single art with a artId
exports.findOne = (req, res) => {
    Art.findById(req.params.artId)
    .then(art => {
        if(!art) {
            return res.status(404).send({
                message: "art not found with id " + req.params.artId
            });            
        }
        res.send(art);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "art not found with id " + req.params.artId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving article  with id " + req.params.artId
        });
    });
};

// Update a art identified by the artId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.titre) {
        return res.status(400).send({
            message: "art content can not be empty"
        });
    }

    // Find art and update it with the request body
    Art.findByIdAndUpdate(req.params.artId, {
        titre: req.body.titre || "Untitled Article", 
        auteur : req.body.auteur,
        contenu: req.body.contenu,
        link: req.body.link,

    }, {new: true})
    .then(art => {
        if(!art) {
            return res.status(404).send({
                message: "art not found with id " + req.params.artId
            });
        }
        res.send(art);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "art not found with id " + req.params.artId
            });                
        }
        return res.status(500).send({
            message: "Error updating art with id " + req.params.artId
        });
    });
};

// Delete a art with the specified artId in the request
exports.delete = (req, res) => {
    Art.findByIdAndRemove(req.params.artId)
    .then(art => {
        if(!art) {
            return res.status(404).send({
                message: "art not found with id " + req.params.artId
            });
        }
        res.send({message: "art deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "art not found with id " + req.params.artId
            });                
        }
        return res.status(500).send({
            message: "Could not delete art with id " + req.params.artId
        });
    });
};
