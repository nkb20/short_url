const shortid = require('shortid');
const URL = require("../models/url")

async function handleGenerateNewShortUrl(req, res) {
    const shortId = shortid();
    const body = req.body;
    await URL.create({
        shortURL: shortId,
        redirectURL: body.url,
        visitHistory: [],

    })
    return res.json({ id: shortId})
}

module.exports = {
    handleGenerateNewShortUrl,
}