const {Router} = require('express')
const Hero = require('../models/Hero')

const router = Router()

// /api/heroes
router.get(
  '/heroes',
  async (req, res) => {
    try {

      // number of records to show on one page
      const perPage = 1

      // total number of records
      const total = await Hero.countDocuments()

      // amount of pages
      const pages = Math.ceil(total/perPage)

      // get current page
      const current = !req.query.page ? 1 : req.query.page

      // records start from
      const startFrom = (current - 1) * perPage

      const result = await Hero.find().skip(startFrom).limit(perPage).sort({_id: -1})

      res.json({pages: pages, current: current, heroes: result})
  
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