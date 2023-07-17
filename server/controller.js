const goalsList = [
    {
        goalId:1,
        goal: 'wake up feeling refreshed'
    },
    {
        goalId:2,
        goal: 'touch grass'
    },
    {
        goalId:3,
        goal: 'hydrate'
    }
];
let goalId = 4;


module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["Your heart will always make itself known through your words.", "Your dreams are worth your best efforts to achieve them.", "There's no such thing as an ordinary cat.", "The sure way to predict the future is to invent it.", "The austerity you see around you covers the richness of life like a veil.", "Success is failure turned inside out.", "Success is going from failure to failure without loss of enthusiasm.","Small confidences mark the onset of a friendship.", "The sure way to predict the future is to invent it."];

        // choose a random fortune
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];

        res.status(200).send(randomFortune);
    },

    getGoals: (req, res) => {
        res.status(200).send(goalsList)
    },

    setGoal: (req, res) => {
        const { goal } = req.body;
        const newObj = {
            goalId,
            goal
        };
        goalsList.push(newObj)
        res.status(200).send(goalsList);
        goalId++
    },

    updateGoals:(req, res) => {
        const { id } = req.params;
        const { newGoal } = req.query;
        // use the id to locate the resource/object
        const indexofGoal = goalsList.findIndex(goal => goal.goalId === +id);
        if (indexofGoal === -1) {
            res.status(400).send('goal not found')
            return
        }
        // reassign the object key-value pairs
        goalsList[indexofGoal].goal = newGoal;
        res.status(200).send(goalsList)
    },
    deleteGoal:(req, res) => {
        const { id } = req.params;

        // use the id to locate the resource/object
        const indexofGoal = goalsList.findIndex((goal) => goal.goalId ===+id);
        if (indexofGoal === -1) {
            res.status(400).send('goal not found')
            return
        }
        // delete the object
        goalsList.splice(indexofGoal, 1);
        res.status(200).send(goalsList)
    },

};
