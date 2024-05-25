import express from "express";
const router = express.Router();

router.post('/convert',(req,res)=>{
    setTimeout(() => {
        const fahrenheit = parseFloat(req.body.fahrenheit);
        const celsius=(fahrenheit-32)*(5/9)
        res.send(`<p>${fahrenheit} degrees Fahrenheit is equal to ${celsius.toFixed(0)} degrees celsius</p>`)
    }, 2000);
})
export default router;
