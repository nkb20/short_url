const express = require('express')
const { connectToMongoDb } = require("./connection")
const urlRoute = require("./routes/url")
const bodyParser = require("body-parser")
const URL = require("./models/url")


const app = express();
app.use(bodyParser.json());
// app.use(express.bodyParser)
const PORT = 8082;


connectToMongoDb("mongodb://localhost:27017/url_short").then(() => console.log("database connected"));

app.use(express.json())
app.use("/url", urlRoute)

app.get("/:shortId", async (req, res) => {
    const shortURL = req.params.shortId;
    const result = await URL.findOneAndUpdate({ shortURL }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    });
    if (result && result.redirectURL) {
        res.redirect(result.redirectURL);
    } else {
        // Handle the case where result or result.redirectURL is null or undefined
        // For example, you might want to send an error response or redirect to a default URL.
        res.status(500).send('Internal Server Error');
    }
    
    // res.redirect(result.redirectURL)
})

app.listen(PORT, () => console.log(`Server started at port ${PORT}`)    )