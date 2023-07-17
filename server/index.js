const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// handler functions from the controller file
const { getCompliment, getFortune, setGoal, getGoals, updateGoals, deleteGoal } = require('./controller')

// endpoints
app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);

app.post("/api/goal", setGoal);
app.get("/api/goal", getGoals);
app.put("/api/goal/:id", updateGoals);
app.delete("/api/goal/:id", deleteGoal);

app.listen(4000, () => console.log("Server running on 4000"));
