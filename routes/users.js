import express from 'express';
const router = express.Router();

// Handle GET request to get users
router.get('/users', async (req, res) => { // gotta add async because I'm asking for something. IK - isn't this the whole point?
    // const users = [
    //     {id: 4, name: "Josefine Glauder"},
    //     {id: 3, name: "Boris Clark"},
    //     {id: 1, name: "Katherine Cortes"},
    //     {id: 2, name: "Luna Cortes-Clark"}   
    // ];
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    res.send(`
    <h1 class="text-2xl font-bold my-4">
        <ul>
            ${users.map(user => `<li>${user.name}</li>`).join('')}
        </ul>
    </h1>
    `)
});

export default router;
