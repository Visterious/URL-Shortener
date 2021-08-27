const client = require('../redis/redis')

module.exports = function (req, res, next) {
    const { short_url } = req.params

    client.get(short_url, (err, data) => {
        if (err) throw err

        if (data !== null) {
            res.redirect(data);
        } else {
            next()
        }
    })
}
