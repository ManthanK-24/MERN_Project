import React from 'react'
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import About from "./Components/About"
import "./App.css"
import Contact from "./Components/Contact"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import {Route} from "react-router-dom";
const App = () =>{
  return(
      <>
      <Navbar/>
      <Route exact path= "/">
      <Home />
      </Route>
      <Route path= "/about">
      <About />
      </Route>
      <Route path= "/contact">
      <Contact />
      </Route>
      <Route path= "/login">
      <Login/>
      </Route>
      <Route path= "/signup">
      <Signup/>
      </Route>
      </>
  )
}

export default App