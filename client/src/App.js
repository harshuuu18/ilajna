import './App.css'
import React, { useState , useEffect, createContext, useReducer,useContext} from 'react'
import { BrowserRouter,Route, Switch , useHistory} from 'react-router-dom'
import TopNav from './components/AfterLogin/TopNav'
import AllPost from './components/AfterLogin/AllPost'
import BottomNav from './components/AfterLogin/BottomNav'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import CreatePost from './components/CreatePost/CreatePost'
import {reducer,initialState} from './components/Reducers/userReduser'
import {AnimatePresence, motion} from 'framer-motion'

export const UserContext = createContext()

const Routing = () =>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/')
    }else{
      history.push('/home')
    }
  },[])
  return(
    <AnimatePresence exitBeforeEnter>
    <Switch>
    <Route exact path='/'>
      <TopNav /><br/><br/><br/><br/><br/><br/>
      <AllPost />
      <BottomNav />
    </Route>

    <Route path='/home'>
      <Home />
    </Route>

    <Route path='/login'>
      <Login />
    </Route>

    <Route path='/signup'>
      <Signup />
    </Route>

    <Route path='/createpost'>
    <TopNav />

      <CreatePost />
      <BottomNav />

    </Route>

    </Switch>
    </AnimatePresence>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)

  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
