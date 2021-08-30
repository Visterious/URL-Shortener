/*global describe, test, expect*/

const supertest = require('supertest')
const server = require('../../server')

const requestWithSupertest = supertest(server)

describe('UrlController:', () => {
    test('GET /:short_url should not to be found', async () => {
        const res = await requestWithSupertest.get('/aaaaaaa')
        expect(res.status).toEqual(404)
        expect(JSON.parse(res.text).message).toEqual('not found')
    })

    test('GET /:short_url should not to be found if url not specified', async () => {
        const res = await requestWithSupertest.get('/')
        expect(res.status).toEqual(404)
    })

    test('POST / should return 400 status if url not specified', async () => {
        const data = {}

        const res = await requestWithSupertest.post('/').send(data)

        expect(res.status).toEqual(400)
        expect(JSON.parse(res.text).message).toEqual('bad request')
    })
})
