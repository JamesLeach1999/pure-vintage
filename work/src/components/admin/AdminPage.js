import React from "react"
import SideMenu from "./SideMenu"
import Header from "./Header"
import {makeStyles, withStyles} from "@material-ui/core"

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

  const classes = useStyles()
  return(
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <SideMenu />
    <div className={useStyles.appName}>
      <Header/>
    </div>
    </>
  )
}

export default App;
