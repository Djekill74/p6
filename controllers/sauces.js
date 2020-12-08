const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
   delete req.body._id;
   console.warn('body' + req.body);
   const sauce = new Sauce({
        name: req.body.name
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'suace enregistré'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    })
    .then(
        (thing) => {res.status(200).json(thing);}
    )
    .catch(error => res.status(404).json({ error: error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(
        (sauces) => {res.status(200).json(sauces);}
    )
    .catch(error => res.status(400).json({ error }));
}