const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const path = require("path");

mongoose.connect("mongodb://localhost:27017/timely")
    .then(() => {
        console.log("Connected to Mongo database");
    })
    .catch((err) => {
        console.log("Connection Error: ", err);
    });

app.use("/assets", express.static(path.join("client", "dist", "assets")));
app.use(express.json());
app.use(
    session({
        secret: "some_secret",
        resave: false,
        saveUninitialized: true, // track sessions even when not used
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 / 2}, // users expected to be logged in for long periods of time since it is a task dashboard
    })
);

// allows for cross-origin resources with specified headers
app.use(
  cors({
      credentials: true,
      origin: true,
      allowedHeaders: [
          "Content-Type",
          "Cookie",
          "Set-Cookie",
          "Access-Control-Allow-Credentials",
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const Account = require('./models/Account');

// middleware to check if user session is exists(logged-in)
app.get("/session", (req, res) => {
    if (req.session.user_id) {
        res.send(true);
    } else {
        res.send(false);
    }
});

app.get("/tasks", async (req, res) => {
    console.log(req.session);
    if (!req.session.user_id) {
        return res.status(401).send([]);
    } else {
        // find the user in the database
        const user = await Account.findById(req.session.user_id);

        // If user not found, send an error
        if (!user) {
            return res.status(404).send("User not found");
        }

        const tasks = user.tasks;

	    res.json(tasks);
    }
});

app.post('/task/new', async (req, res) => {
    if (!req.session.user_id) {
        return res.status(401).send([]);
    }

    const user = await Account.findById(req.session.user_id);

    if (!user) {
        return res.status(404).send("User not found");
    }

    const { text, year, month, day } = req.body;

    if (!text) {
        return res.status(400).send("Task text is required");
    }

    let newDate;

    if (!year || !month || !day) {
        const timestamp = Date.now();
        newDate = new Date(timestamp).toString();
    } else {
        // Construct the date from the provided inputs
        newDate = new Date(year, month - 1, day).toString(); // month is 0-indexed
    }

    // Create a new task object
    const newTask = {
        text: text,
        isDone: false,
        timestamp: Date.now(),
        date: newDate,  // store as ISO string
    };

    // Add the new task to the user's tasks array
    user.tasks.push(newTask);

    // Save the updated user document
    await user.save();

    // Return the newly added task with its `_id`
    const addedTask = user.tasks[user.tasks.length - 1];
    res.json(addedTask);
});


app.delete('/task/delete/:id', async (req, res) => {
    // Check if user_id exists in session
    if (!req.session.user_id) {
        return res.status(401).send([]);
    } else {
        const task_id = (req.params.id.toString())
        const user = await Account.findById(req.session.user_id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Find the index of the task with the matching _id
        const taskId = req.params.id;
        const taskIndex = user.tasks.findIndex(task => task._id.toString() === taskId);

        if (taskIndex === -1) {
            return res.status(404).send("Task not found");
        }

        // Remove the task from the tasks array
        const deletedTask = user.tasks.splice(taskIndex, 1)[0];

        // Save the updated user document
        await user.save();

        // Respond with the updated list of tasks
        res.json({ result: deletedTask._id });
    }
});

app.get('/task/done/:id', async (req, res) => {
	// Check if user_id exists in session
    if (!req.session.user_id) {
        return res.status(401).send([]);
    } else {
        const task_id = (req.params.id.toString())
        const user = await Account.findById(req.session.user_id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Find the index of the task with the matching _id
        const taskId = req.params.id;
        const taskIndex = user.tasks.findIndex(task => task._id.toString() === taskId);

        if (taskIndex === -1) {
            return res.status(404).send("Task not found");
        }

        // update the text value of the selected task
        user.tasks[taskIndex].isDone = !(user.tasks[taskIndex].isDone);
        const updatedTask = user.tasks[taskIndex]

        // Save the updated user document
        await user.save();

        // Respond with the updated list of tasks
        res.json(updatedTask);
    }
})

app.put('/task/update/:id', async (req, res) => {
	// Check if user_id exists in session
    if (!req.session.user_id) {
        return res.status(401).send([]);
    } else {
        const task_id = (req.params.id.toString())
        const user = await Account.findById(req.session.user_id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Find the index of the task with the matching _id
        const taskId = req.params.id;
        const taskIndex = user.tasks.findIndex(task => task._id.toString() === taskId);
        const { text, year, month, day } = req.body;

        if (taskIndex === -1) {
            return res.status(404).send("Task not found");
        }

        if (!text) {
            return res.status(400).send("Task text is required");
        }

        let newDate;

        if (!year || !month || !day) {
            const timestamp = Date.now();
            newDate = new Date(timestamp).toString();
        } else {
            // Construct the date from the provided inputs
            newDate = new Date(year, month - 1, day).toString(); // month is 0-indexed
        }

        // update the text value of the selected task
        user.tasks[taskIndex].text = text;
        user.tasks[taskIndex].date = newDate;
        const updatedTask = user.tasks[taskIndex]

        // Save the updated user document
        await user.save();

        // Respond with the updated list of tasks
        res.json(updatedTask);
    }
});

// login route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await Account.findAndAuthenticate(username, password);
    if (foundUser) {
        // Use the _id field provided by Mongoose
        req.session.user_id = foundUser._id.toString();
        console.log(req.session);
        return res.status(200).send("OK");
    } else {
        return res.status(401).send("BAD");
    }
});

// register route
app.post("/register", async (req, res) => {
    // Destructure username and password from req.body
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await Account.findOne({ username });
    if (existingUser) return res.send(false);

    // Create the new user and save to the database
    const user = new Account({ username, password });
    await user.save();
    req.session.user_id = user._id.toString();
    return res.send(true); // OK
});

// logout route
app.post("/logout", (req, res) => {
    req.session.destroy();
    return res.send(true);
});

app.get("/username", async (req, res) => {
    if (!req.session.user_id) {
        return res.status(401).send("Unauthorized");
    }

    const user = await Account.findById(req.session.user_id);
    if (!user) {
        return res.status(404).send("User not found");
    }

    res.json({ username: user.username });
});

app.listen(3001, () => {
    console.log("Listening on port 3001.")
});


