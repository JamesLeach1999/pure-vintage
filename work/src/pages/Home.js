import React, {Component} from "react"
import Product from "../components/Product"
import {useAxios} from "../hooks/useAxios"
import Rows from "../components/Rows";
import Welcome from "../components/Welcome"
import Login from "../components/Login"
import CatRows from "../components/CatRows"
import FeaturedRow from "../components/FeaturedRow"
import Recent from "../components/RecentRevs"
import T from "../components/T"
import "../css/fade.css"
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      animate: true,
    }

    this.handleSuccess = this.handleSuccess.bind(this)
  }

  handleSuccess(data){

    // update parent component
    // re direct user
    // pass data back up to app
    this.props.handleLogin(data)
    this.props.history.push("/store")
  }

  componentDidMount(){
    if(sessionStorage.getItem("firstLoadDone") === null){
      this.setState({animate: true})

      sessionStorage.setItem("firstLoadDone", 0)
    } else {
      this.setState({animate: false})
    }
  }

  render(){
    return (
      <div style={{width: "100%"}} className={this.state.animate ? "fade-in-hello hello span": "hello-span"}>
        <T/>
        <Rows/>
        <CatRows/>
        <FeaturedRow/>
        <Recent/>
      </div>
    )
  }
}