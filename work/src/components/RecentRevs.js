import React, { Component } from "react";
import Review from "./Review";
import { Link, useParams } from "react-router-dom";
import GetId from "./GetId";
import Recent from "./RecRevs";

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
      console.log(this.state.images)
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
            {this.state.data.map((e, i) => {
              return (
                <div class="col-3">
                  {this.state.images.length > 0 ? (
                    <img src={this.state.images[i]} alt="" />
                  ) : (
                    <img src={this.state.images} alt="" />
                  )}{" "}
                  <br />
                  <Recent
                    data={e}
                    category={this.state.data.category}
                    revId={e._id}
                    id={e._id}
                  />{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
