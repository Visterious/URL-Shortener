const conn = require("../db");
const { generateUID } = require("../utils/utils");
const client = require("../redis/redis");

class UrlController {
  async create(req, res) {
    try {
      const { url } = req.body;

      // check exist element in database or not
      new Promise((resolve, reject) => {
        const query = `SELECT * FROM urls WHERE full_url = '${url}'`;
        conn.query(query, (err, result) => {
          if (err) {
            reject(err);
          }
          if (result.length !== 0) {
            resolve(result[0]["short_url"]);
          }
          resolve();
        });
      }).then((data) => {
        if (data) { // if exist return this element
          return res.status(200).json({ url: req.headers.host + "/" + data });
        }

        // else create element
        const short_url = generateUID();
        const query = `INSERT INTO urls (full_url, short_url) VALUES ('${url}', '${short_url}')`;
        conn.query(query, (err) => {
          if (err) {
            return res.json({ error: err });
          }
          return res
            .status(201)
            .json({ url: req.headers.host + "/" + short_url });
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async get(req, res) {
    try {
      const { short_url } = req.params;
      const query = `SELECT * FROM urls WHERE short_url = '${short_url}'`;

      await conn.query(query, async (err, result) => {
        if (err) {
          return res.json({ error: err });
        }
        if (result.length === 0) {
          return res.status(404).json({ message: "not found" });
        }

        await client.setex(short_url, 3600, result[0]["full_url"]);

        res.status(200).redirect(result[0]["full_url"]);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UrlController();
