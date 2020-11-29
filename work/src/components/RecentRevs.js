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
      this.setState({data: pJson.name})

      console.log(this.state.data)
    } catch (error) {
      console.log(this.props);
      console.log(error);
    }
  }

  render() {
    return (
        <div>
            
      {/* {this.state.data.map((review) => {
          <div key={review._id}>
            <h3 style={{ paddingBottom: "15px", marginTop: "-30px" }}>
              {review.name}
            </h3>
            <p>{review.comment}</p>
            <p style={{ paddingTop: "15px" }}>{review.rating}/5</p>
            {/* <img src="assets/shoes1.jpg" alt="" /> */}
          {/* </div>; */}
    {/* // })} */}
    </div>
    );
  }
}

export default Reviews;
