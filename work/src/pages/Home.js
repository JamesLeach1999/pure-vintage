import React, {Component} from "react"
import Product from "../components/Product"
import {useAxios} from "../hooks/useAxios"
import Rows from "../components/Rows";
import Welcome from "../components/Welcome"
import Login from "../components/Login"
import CatRows from "../components/CatRows"
import FeaturedRow from "../components/FeaturedRow"
import Recent from "../components/RecentRevs"

export default class Home extends Component {
  constructor(props){
    super(props);

    this.handleSuccess = this.handleSuccess.bind(this)
  }

  handleSuccess(data){

    // update parent component
    // re direct user
    // pass data back up to app
    this.props.handleLogin(data)
    this.props.history.push("/store")
  }

  render(){
    return (
      <div>
        <Rows/>
        <CatRows/>
        <FeaturedRow/>
        <Recent/>
      </div>
    )
  }
}