import express from 'express';
const router = express.Router();

// Handle GET request to get users
router.get('/users', (req, res) => {
    const users = [
        {id: 4, name: "Josefine Glauder"},
        {id: 3, name: "Boris Clark"},
        {id: 1, name: "Katherine Cortes"},
        {id: 2, name: "Luna Cortes-Clark"}   
    ];
    res.json(users);  // Use res.json to send data as JSON
});

export default router;
