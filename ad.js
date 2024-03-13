const express = require('express');
const arangojs = require("arangojs");

const app = express();
const PORT = 8080;

"use strict";
const encodedCA = "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURHRENDQWdDZ0F3SUJBZ0lRRERwN0FTN3F4ekxia0RraGxwbWNxREFOQmdrcWhraUc5dzBCQVFzRkFEQW0KTVJFd0R3WURWUVFLRXdoQmNtRnVaMjlFUWpFUk1BOEdBMVVFQXhNSVFYSmhibWR2UkVJd0hoY05NalF3TXpFeQpNVEV3TURRNVdoY05Namt3TXpFeE1URXdNRFE1V2pBbU1SRXdEd1lEVlFRS0V3aEJjbUZ1WjI5RVFqRVJNQThHCkExVUVBeE1JUVhKaGJtZHZSRUl3Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLQW9JQkFRRGEKZm50ZVdXSU13amVvanVtbE9tM2RMT1pwcTVaUXA4MGxIdThsdVF5TkVlSTJUMlF6RHlVSGs2SXE2SVBPb3pWNwpEZC9Bclg3ZFhhcGlQMU0wQ3grRVo4cVVXQmdTelhmdEtZUHBBZFNWRWMzcHhzQXVqNlN4cnNwOUxYc1krVlhMCjQzeEVHMFJiSlR6Q2VtUWhCa05UNjZqUGNHY3JBd3F4YjVtbGZtNGN3Wk9mMEhhaVVwVEZ0c3JmbnNwRjRhYWwKN0pJTFZaZGFJdWQwcitUVXZZeHFoZlJDbmxpeWtqbWVjVE1SazZRL3lCMFM0VjhFWVJiTTltWDhxaGdEVnVHZQpLdTFRbFcxZmpCU3lSbTVrM3VpVENDOFloN0t5QWR6K2hVaER2NVlkRVB6eXN3QncwMDBHdnZERE9KcnJieGVOCmRJWlFiSlRROXdjWkVNVVBJbnBYQWdNQkFBR2pRakJBTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQQmdOVkhSTUIKQWY4RUJUQURBUUgvTUIwR0ExVWREZ1FXQkJTa29acU9yL21YeHhpMm1BcjArcC9HMEZYRkpEQU5CZ2txaGtpRwo5dzBCQVFzRkFBT0NBUUVBbWQ0WGtrVVh3S0xqbnJEWE50ajVBTld2aHNkcXN4UHQvYWdsUXc4VzB4eUVWSjJ5Ck9jaWM3RTl1bTBpdkRCem1pMlpJVVNTUSswMzNGeHhacXVFZ0hKWmhWVUtzdVB0cWhiTC8vclU1clpxa1ZTcUgKNFczYUJjL1FXYWN1a3hOTnV5TTFvTnJZU2tFTFQwdFVuYStZWXVkSFR1UGRGS1VWYjRuKzJVTXlaM1hSOVI1cApnWGVxSXNvQ3Q0K0FkSGtCOVlVR3NjbThGM1BUbDJQMWFaZEhGcTlST3ZMOFZjOFdNeCtVaDJOU3dmS2MzZ2JnClQwR21od3VJaHJPMmdCK1Q3dUFHWFc0RnBRa3dmRGw2WEsxOWhKbEY3K2l3Q04yem44b3R2UWVqRVlhZDl6SnEKQmFBalg3bXZWVy9vbWJXRGduU2RLTzFZWHMzS3RHd1JZOGQ0NWc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==";
// const arangojs = require("arangojs");
const db = arangojs({url: "https://e297ec1819e1.arangodb.cloud:18529", agentOptions: {ca: Buffer.from(encodedCA, "base64")}});
db.useBasicAuth("root", "ZHt3KCGA4LfgpvZvllTF");
db.version().then(
	version => console.log(version),
	error => console.error(error)
);

app.get('/', async (req, res) => {
    try {
        // const database = db.database(dbName);
        const collection = db.collection('users'); // Specify the collection name

        // Fetch data from the 'users' collection
        const cursor = await collection.all();
        const documents = await cursor.all();

        // Log the fetched data
        console.log(documents);

        // Respond with the fetched data
        res.json(documents);
    } catch (error) {
        console.error("Error fetching data from ArangoDB:", error);
        res.status(500).json({ error: "Error fetching data from ArangoDB" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
