const {Router} = require('express')
const Hero = require('../models/Hero')
const {check, validationResult} = require('express-validator')

const router = Router()

// /api/heroes
router.get(
  '/heroes',
  async (req, res) => {
    try {
      const result = await Hero.find()
      res.send(result)
  
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong'})
    }
  }
)

// /api/heroes
router.post(
  '/heroes',
  async (req, res) => {
    try {
      // get req values
      const {nickname, real_name, origin_description, superpowers, catch_phrase, images} = req.body
  
      const hero = new Hero({
        nickname: nickname,
        real_name: real_name,
        origin_description: origin_description,
        superpowers: superpowers,
        catch_phrase: catch_phrase,
        images: images,
      })
  
      // create hero
      const HERO = await hero.save()
  
      res.send(HERO)
  
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong'})
    }
  }
)

// /api/heroes:id
router.get(
  '/heroes/:id',
  async (req, res) => {
    try {
      const result = await Hero.findById(req.params.id)
      res.send(result)
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong'})
    }
  }
)

// /api/heroes:id
router.patch(
  '/heroes/:id',
  async (req, res) => {
    try {
      const result = await Hero.findById(req.params.id)
      Object.assign(result, req.body)
      const newHero = await result.save()
      res.status(201).json({ message: 'Successfully updated!'})
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong'})
    }
  }
)

// /api/heroes:id
router.delete(
  '/heroes/:id',
  async (req, res) => {
    try {
      const result = await Hero.findByIdAndDelete(req.params.id)
      res.send(result)
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong'})
    }
  }
)

module.exports = router