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
      const p = await fetch("/recentReviews");
      const pJson = await p.json();
      this.setState({ data: pJson.name });
      this.setState({ images: pJson.images });
      console.log(this.state.data);
    } catch (error) {
      console.log(this.props);
      console.log(error);
    }
  }

  render() {
    return (
      <div class="testimonial">
        <div class="small-container">
          Reviews:
          <div class="row">
            {this.state.data.map((review, i) => {
              <div key={review._id}>
                <img src={this.state.images[i]} alt="" />
                <h3 style={{ paddingBottom: "15px", marginTop: "-30px" }}>
                  {review.name}
                </h3>
                <p>{review.comment}</p>
                <p style={{ paddingTop: "15px" }}>{review.rating}/5</p>
                {/* <img src="assets/shoes1.jpg" alt="" /> */}
              </div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
