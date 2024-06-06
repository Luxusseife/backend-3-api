// Inkluderar Express, Cors och Mongoose.
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Initialiserar Express.
const app = express();

// Väljer port.
const port = 3000;

// Middleware. Aktiverar hantering av JSON-data och Cors.
app.use(express.json());
app.use(cors());

// Ansluter till MongoDB.
mongoose.connect("mongodb://localhost:27017/moment3").then(() => {
    console.log("Connected to the MongoDB-database");
// Felmeddelande.
}).catch((error) => {
    console.log("Error connection to the MongoDB-database: " + error);
});

// Skapar arbets-schema för struktur.
const jobSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Companyname is required"]
    },
    jobtitle: {
        type: String,
        required: [true, "Jobtitle is required"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    startdate: {
        type: String,
        required: [true, "Startdate is required"]
    },
    enddate: {
        type: String,
        // Inte required då jobbet kan vara pågående.
        required: false,
    },
});

// Inkluderar schemat i databasen.
const Job = mongoose.model("Job", jobSchema);


// ROUTING.

// Hämtar lagrade jobb.
app.get("/job", async (req, res) => {
    try {
        let result = await Job.find({}).sort({ startdate: -1 });

        // Kontroll av innehåll och meddelande om collection är tom.
        if (result.length === 0) {
            return res.status(404).json({ message: "No job posts found" });

        // Om jobb finns, skrivs dessa ut.
        } else {
            return res.json(result);
        }
    // Felmeddelande.
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong: " + error });
    }
});

// Skapar/lagrar jobb.
app.post("/job", async (req, res) => {
    try {
        let result = await Job.create(req.body);

        // Response vid lyckad input-inmatning.
        return res.json({
            message: "Job added successfully",
            newJob: result
        });
    // Felmeddelande.
    } catch (error) {
        return res.status(400).json({ error: "Something went wrong: " + error });
    }
});

// Uppdaterar specifikt jobb.
app.put("/job/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        const updatedJob = req.body;

        let result = await Job.findByIdAndUpdate(jobId, updatedJob, { new: true });

        // Kontroll av innehåll och meddelande om angivet id saknas.
        if (!result) {
            return res.status(404).json({ message: "No job with this id was found" });
        } else {
            // Response vid lyckad uppdatering.
            return res.json({
                message: "Job updated successfully",
                updatedJob: result
            });
        }
    // Felmeddelande.
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong: " + error });
    }
});

// Raderar specifikt jobb.
app.delete("/job/:id", async (req, res) => {

    // Raderar med findByIdAndDelete(), kontrollerar innehåll och skriver ut uppdaterad post. 
    try {
        const jobId = req.params.id;

        let result = await Job.findByIdAndDelete(jobId);

        // Kontroll av innehåll och meddelande om angivet id saknas.
        if (!result) {
            return res.status(404).json({ message: "No job with this id was found" });
        } else {
            // Response vid lyckad radering.
            return res.json({
                message: "Job deleted successfully",
                deletedJob: result
            });
        }
    // Felmeddelande.
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong: " + error });
    }
});

// Startar Express-servern.
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});