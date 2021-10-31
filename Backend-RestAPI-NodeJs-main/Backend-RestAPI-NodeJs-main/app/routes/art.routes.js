module.exports = (app) => {
    const arts = require('../controllers/art.controller.js');


    app.post('/arts', arts.create);

    
    app.get('/arts', arts.findAll);

   
    app.get('/arts/:artId', arts.findOne);

    
    app.put('/arts/:artId', arts.update);

    
    app.delete('/arts/:artId', arts.delete);
}
