const Router = require('express')
const router = new Router()
const UrlController = require('../controllers/urlController')

router.post('/', UrlController.create)
router.get('/:short_url', UrlController.get)


module.exports = router
