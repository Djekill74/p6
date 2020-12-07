const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
   delete req.body._id;
   console.warn('body' + req.body.name);
   const sauce = new Sauce({
        name: req.body.name
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'suace enregistré'}))
    .catch(error => res.status(400).json({ error }));
};