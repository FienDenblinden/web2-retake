let db, collection;
const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const port = process.env.PORT || 3000;

// // Middleware
const bodyparser = require('body-parser');
const cors = require('cors');


// // MongoDB Atlas
const {
    MongoClient
} = require('mongodb');
const uri = "mongodb+srv://FienDenblinden:admin@cluster0.wzzg6.mongodb.net/Web-course-project?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
client.connect(err => {
    const collection = client.db("Web-course-project").collection("userWeather");
    client.close();
});


// // Middleware

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(cors());
app.use("/", express.static("public"));
app.use("/api", weatherRouter);


// // Best practices --> routes
//     GET /weather = Get all weather
//     GET /weather?type=strategy = Get specific weather list
//     GET /weather/:uniqueidentifier123 = Get a single weather based on a unique ID/Identifier

//     The next routes have object data in their request bodies
//   * CREATE: --> POST /weather = save weather in the database
//   * READ:   --> PUT /weather = save weather, replacing everything
//   * UPDATE: --> PATCH /weather = save weather, replacing only the fields neccesary
//   * DELETE: --> DELETE /weather = delete weather, based on id

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// READ - GET - we are getting/reading the data
app.get('/userWeather', (req, res) => {
            db.getDB().collection(collection).find({}).toArray((err, documents) => {
                if (err)
                else {
                    res.json(documents);
                }
                collection.findOne().then((res) => {
                    console.log(res);
                });
            });


            // CREATE - POST - the user is going to create his own data
            app.post('/diary', (req, res) => {
                const insertData = {};
                if (req.query.name && req.query.data && req.query.time && req.query.temperature && req.query.rain && req.query.humidity && req.query.wind) {
                    insertData.name = req.query.name;
                    insertData.data = req.query.data;
                    insertData.time = req.query.time;
                    insertData.temperature = req.query.temperature;
                    insertData.rain = req.query.rain;
                    insertData.humidity = req.query.humidity;
                    insertData.wind = req.query.wind;
                    collection.insertOne(insertData);
                    res.json(insertData);
                } else {
                    res.send('Please fill in all the input fields');
                }
                console.log(insertData);

            });


            // UPDATE - PUT - we are going to update the data

            app.put('/userWeatherUpdate', (req, res) => {
                const userWeatherUpdate = req.params.update;
                const userInput = req.body;

                db.getDB().collection(collection).findOneAndUpdate({
                    update: userWeatherUpdate
                }, {
                    $set: {
                        update: userInput.findOneAndUpdate
                    }
                }, {
                    returnOriginal: false
                }, (err, result) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json(result);
                    }
                })

            });



            // DELETE - delete/remove the data from the database

            app.delete(async (req, res) => {
                const todoID = req.params.id;
                db.getDB().collection(collection).findOneAndDelete(("weather"), (err, result) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json();
                    }
                })


            })


            app.listen(port, () => {
                console.log(`Example app listening at http://localhost:${port}`);
                client.connect(err => {
                    if (err) {
                        throw err;
                    }
                    db = client.db("Web-course-project");
                    collection = db.collection("userWeather");
                });
            });




            ////////////////////////////////////////////////////////////////////////// THIS CODE DOESN'T WORK

            // Route: for form.html
            // weatherRouter.route("/userMessage")

            //     // get --> Read 
            //     .get((req, res) => {
            //         collection.find({}).toArray((error, result) => {
            //             if (error) {
            //                 return res.status(500).send(error);
            //             }

            //             res.json(result);
            //         });

            //         collection.findOne().then((res) => {
            //             console.log(res);
            //         });
            //     })

            //     // post --> Create
            //     .post((req, res) => {

            //         const insertData = {};
            //         if (req.query.name && req.query.age && req.query.message) {
            //             insertData.name = req.query.name;
            //             insertData.data = req.query.age;
            //             insertData.time = req.query.message;
            //             collection.insertOne(insertData);
            //             res.json(insertData);
            //         } else {
            //             res.send('Please fill in all the input fields');
            //         }
            //         console.log(insertData);
            //     });


            // app.use('/api', weatherRouter);


            // app.get("/", (req, res) => {
            //     res.sendFile(path.join(__dirname + "/public/index.html"));
            // });

            // app.listen(port, () => {
            //     console.log(`Example app listening at http://localhost:${port}`);
            //     client.connect(err => {
            //         if (err) {
            //             throw err;
            //         }
            //         db = client.db("Web-course-project");
            //         collection = db.collection("userWeather");
            //     });
            // });


            //************************************************************************************************************ */


            // TEST

            /* async function run() {
                try {
                    await client.connect();
                    console.log("Connected correctly to server");
                    const database = client.db(databaseName);
                    const collection = database.collection("weather");

                    let test = {
                        myName: "fien",
                        myAge: "19",
                        study: "Multec"
                    };
                    const promise = await collection.insertOne(test);
                    const doc = await collection.findOne();

                    console.log(doc);

                } catch (err) {
                    console.log(err.stack);
                } finally {
                    await client.close();
                }
            } */

            //run().catch(console.dir);