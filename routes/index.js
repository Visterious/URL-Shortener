const Router = require('express')
const router = new Router()
const UrlController = require('../controllers/urlController')
const cache = require('../middleware/cacheMiddleware')

router.post('/', UrlController.create)
router.get('/:short_url', cache, UrlController.get)

module.exports = router
