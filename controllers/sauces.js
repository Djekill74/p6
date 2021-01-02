const Sauce = require('../models/Sauce')
const fs = require('fs')
console.log(Sauce)

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  sauce.save()
    .then(() => res.status(201).json({ message: 'suace enregistré' }))
    .catch(error => res.status(400).json({ error }))
}

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  })
    .then(
      (sauce) => { res.status(200).json(sauce) }
    )
    .catch(error => res.status(404).json({ error: error }))
}

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then(
      (sauces) => { res.status(200).json(sauces) }
    )
    .catch(error => res.status(400).json({ error }))
}

exports.modifySauce = (req, res, next) => {
  let sauceObjet = req.file
  if (sauceObjet == null) {
    sauceObjet = { ...req.body }
  } else {
    sauceObjet = {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          console.log('file delete')
        })
      })
      .catch(error => res.status(404).json({ error: '404' }))
  }
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObjet, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié' }))
    .catch(error => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'sauce viré' }))
          .catch(error => res.status(404).json({ error }))
      })
    })
    .catch(error => res.status(404).json({ error: '404' }))
}

exports.likeSauce = (req, res, next) => {
  const like = req.body.like
  const userId = req.body.userId
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      let likes = sauce.likes
      let dislikes = sauce.dislikes
      const usersLiked = sauce.usersLiked
      const usersDisliked = sauce.usersDisliked
      if (like === 1) {
        usersLiked.push(userId)
        likes = usersLiked.length
      } else if (like === -1) {
        usersDisliked.push(userId)
        dislikes = usersDisliked.length
      } else {
        const userNumberLiked = usersLiked.indexOf(userId)
        const userNumberDisliked = usersDisliked.indexOf(userId)
        if (userNumberLiked !== -1) {
          usersLiked.splice(userNumberLiked, 1)
          likes = usersLiked.length
        };
        if (userNumberDisliked !== -1) {
          usersDisliked.splice(userNumberDisliked, 1)
          dislikes = usersDisliked.length
        }
      };
      Sauce.updateOne({ _id: req.params.id }, {
        likes: likes,
        dislikes: dislikes,
        usersLiked: usersLiked,
        usersDisliked: usersDisliked,
        _id: req.params.id
      })
        .then(() => res.status(200).json({ message: 'like enregistré' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}
