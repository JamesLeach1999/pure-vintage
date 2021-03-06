import React, { Component } from "react";
import Review from "./Review";
import { Link, useParams } from "react-router-dom";
import GetId from "./GetId";
import Recent from "./RecRevs";

class Reviews extends Component {
  constructor() {
    super();
    this.state = { data: [], images: [], other: [], atLeastOne: false };
  }

  async componentDidMount() {
    try {
      const p = await fetch("/recentReviews");
      const pJson = await p.json();

      this.setState({ images: pJson.images });

      var filRevs = [];
      var filImgs = [];

      var filtered = pJson.name.filter(function (el) {
        return el !== null || el !== [] || el !== undefined;
      });
      filtered.map((rev, i) => {
        if (rev.length !== 0) {
          filRevs.push(rev);
          filImgs.push(this.state.images[i]);
        }
      });

      this.setState({ data: filRevs });
      this.setState({ atLeastOne: true });
      this.setState({ images: filImgs });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div class="testimonial">
        <div class="small-container" style={{ justifyContent: "center" }}>
          <h1>Recent reviews</h1>
          <br />
          <br />
          <br />
          <br />
          <div class="row" style={{ justifyContent: "center" }}>
            {this.state.atLeastOne ? (
              this.state.data.map((e, i) => {
                return (
                  <div class="col-3" s>
                    {this.state.images.length !== 0 ? (
                      <img src={this.state.images[0]} alt="" />
                    ) : (
                      <img src={this.state.images[0]} alt="" />
                    )}{" "}
                    <br />
                    <br />
                    <br />
                    <br />
                    <Recent
                      data={e[0]}
                      category={this.state.data.category}
                      revId={e[0]._id}
                      id={e[0]._id}
                    />{" "}
                  </div>
                );
              })
            ) : (
              <h2>No reviews yet!</h2>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
