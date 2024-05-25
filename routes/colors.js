import express from "express";
const router = express.Router();

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

router.get('/colors',(req,res)=>{
          
        const color = getRandomColor();
        res.send(`<div id="color-demo" class="smooth" style="color:${color}" hx-get="/colors" hx-swap="outerHTML" hx-trigger="every 1s">Color Swap Demo</div>`)
})
export default router;
