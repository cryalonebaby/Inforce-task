const {Router} = require('express')
const heroControllers = require('../controllers/heroes')

const router = Router()

// /api/heroes
router.get('/heroes', heroControllers.getAllHeroes)

// /api/heroes
router.post('/heroes', heroControllers.createNewHero)

// /api/heroes:id
router.get('/heroes/:id', heroControllers.findOneHero)

// /api/heroes:id
router.patch('/heroes/:id', heroControllers.updateOneHero)

// /api/heroes/id
router.delete('/heroes/:id', heroControllers.deleteOneHero)

module.exports = router