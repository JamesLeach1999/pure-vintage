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

      // var filtered = pJson.name.filter(function (el) {
      //   return el !== null || el !== [];
      // });
      // this.setState({ data: filtered });
      this.setState({ images: pJson.images });
      
      var filtered2 = pJson.name.filter(function (el) {
        return  el.length !== 0;
      });
      this.setState({ data: filtered2 });
      this.setState({atLeastOne: true})
      console.log(filtered2)
      console.log(this.state.images)
    } catch (error) {
      console.log(this.props);
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
                      <img src={this.state.images[i]} alt="" />
                    ) : (
                      <img src={this.state.images} alt="" />
                    )}{" "}
                    <br />
                    <br />
                    <br />
                    <br />
                    <Recent
                      data={e}
                      category={this.state.data.category}
                      revId={e._id}
                      id={e._id}
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
