const Sauce = require('../models/Sauce');
const fs = require('fs');
console.log(Sauce);


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.warn(sauceObject);
    delete sauceObject._id;
    console.log(req.protocol);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'suace enregistré' }))
        .catch(error => res.status(400).json({ error }));
};


exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    })
        .then(
            (sauce) => { res.status(200).json(sauce); }
        )
        .catch(error => res.status(404).json({ error: error }));
};


exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(
            (sauces) => { res.status(200).json(sauces); }
        )
        .catch(error => res.status(400).json({ error }));
}


exports.modifySauce = (req, res, next) => {
    const sauceObjet = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObjet, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié' }))
        .catch(error => res.status(400).json({ error }));
};


exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageURL.split('/images/')[1];
            console.warn(filename);
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'sauce viré' }))
                    .catch(error => res.status(404).json({ error }));
            })
        })
        .catch(error => res.status(404).json({ error: '404' }));
};

