const supertest = require('supertest')
const server = require('../../server')
const UrlController = require('../../controllers/urlController')

const requestWithSupertest = supertest(server)

describe('UrlController:', () => {

    test('GET /:short_url', async () => {
        const res = await requestWithSupertest.get('/h20uf2')
        expect(res.status).toEqual(302)
    })

})
