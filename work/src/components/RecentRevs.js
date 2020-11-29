import React, { Component } from "react";
import Review from "./Review";
import { Link, useParams } from "react-router-dom";
import GetId from "./GetId";
import Other from "./OtherRevs";

class Reviews extends Component {
  constructor() {
    super();
    this.state = { data: [], images: [], other: [] };
  }

  async componentDidMount() {
    try {
      const p = await fetch("/recentReviews")
      const pJson = await p.json()
      console.log(pJson)
    } catch (error) {
      console.log(this.props);
      console.log(error);
    }
  }

  render() {
    return (
      <h1>yes</h1>
    );
  }
}

export default Reviews;
