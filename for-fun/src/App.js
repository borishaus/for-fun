import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './views/home';
// import about from './About';
// import contact from './Contact';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element ={<Home />}/>
        <Route path="/home" element ={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
