import React, {useState} from "react"
import SideMenu from "./SideMenu"
import Header from "./Header"
import Navbar from "./navbar/Navbar"
import Sidebar from "./sidebar/Sidebar"
import {makeStyles, withStyles} from "@material-ui/core"
import "./styles/index.css"
const useStyles = makeStyles({
  appName: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "320px",
    height: "100%",
    backgroundColor: "#253053",
  },
}); 
const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = () => {
    setSidebarOpen(true)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const classes = useStyles()
  return(
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
      <h1>React dashboard</h1>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
    </div>
  )
}

export default App;
