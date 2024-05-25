import express from "express";
const router = express.Router();
router.get("/users", async (req, res) => {
  setTimeout(async () => {
    const limit = +req.query.limit || 10;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`); //working - needed backtick
    const users = await response.json(); 
    res.send(`
        <h1 class="text-2xl font-bold my-4">
            <ul>
                ${users.map((user) => `<li>${user.name}</li>`).join("")}
            </ul>
        </h1>
        `);
  },2000);
});

export default router;
