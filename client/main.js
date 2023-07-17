console.log(`Is this thing on?`);
const baseUrl = `http://localhost:4000`;

const displaySection = document.querySelector("#display-section");

const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")

const goalBtn = document.getElementById("goalButton")
const newGoal = document.querySelector('#newGoal')
const addForm = document.querySelector('#make-goals-list')
const updateForm = document.querySelector("#update-form")
const goalId = document.querySelector("#goal-id")
const updateGoal = document.querySelector('#update-goal')

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

fortuneBtn.addEventListener('click', getFortune)

const deleteGoal= (id) => {
    axios.delete(`${baseUrl}/api/goal/${id}`)
    .then(res => createGoalCard(res.data))
    .catch(err => console.error(err))
}
// create card for goals/responses
createGoalCard = (goalArr) => {
    displaySection.innerHTML = ``;
    goalArr.map(goal => {
        const holdingDiv = document.createElement('div')
        holdingDiv.innerHTML = `
            <ul>
                <li># ${goal.goalId}</li>
                <li>${goal.goal}</li>
                <button onclick="deleteGoal(${goal.goalId})">Delete</button>
            <ul>
        `;
        displaySection.appendChild(holdingDiv)
    })
}

// gets all goals
const getGoals = () => {
    axios.get(`${baseUrl}/api/goal`)
    .then(res => {
        console.log(res.data)
        createGoalCard(res.data)
    })
    .catch(err => console.error(err))
}

// adds new goal to goalsList
const addFormHandler = (e) => {
    e.preventDefault()
    const body = {
        goal:newGoal.value
    }
    axios.post(`${baseUrl}/api/goal`, body)
    .then(res => createGoalCard(res.data))
    .catch(err => console.error(err))
    newGoal.value = ``;
}

const updateHandler = (e) => {
    e.preventDefault()
    axios.put(`${baseUrl}/api/goal/${goalId.value}?newGoal=${updateGoal.value}`)
    .then (res => createGoalCard(res.data))
    .catch(err => console.error(err))
}

// event-listeners
document.addEventListener('DOMContentLoaded', getGoals)
addForm.addEventListener('submit', addFormHandler)
updateForm.addEventListener('submit', updateHandler)