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

      const id = document.getElementById("id").innerHTML;
      const response = await fetch(`/products?id=${id}`);
      const json = await response.json();
      this.setState({ data: [json.name] });
      
      const revRes = await fetch(
        `/otherReviews?category=${json.name.category}&id=${id}`
      );
      const revJson = await revRes.json();
      var t = [];
      var img = [];

      revJson.name.map((rev) => {
        img.push(rev.image[0]);

        t.push(rev.reviews[0]);
      });

      var filtered = t.filter(function (el) {
        return el != null;
      });
      this.setState({ images: img });
      this.setState({ other: filtered });
      
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div class="testimonial">
        <div class="small-container">
          <h1>Reviews</h1>
          <br />
          <br />
          <br />

          <div class="row">
            {this.state.data.map((e) => {
              return e.reviews.length > 0
                ? e.reviews.map((r) => {
                    return (
                      <div class="col-3">
                        {" "}
                        <Review revId={r._id} id={e._id} />{" "}
                      </div>
                    );
                  })
                : "";
            })}
          </div>
        </div>
        <div class="small-container">
          <h1>Reviews from similar products:</h1>
          <br />
          <br />
          <br />
          <div class="row1">
            {this.state.other[0] !== undefined
              ? this.state.other.map((e, i) => {
                  return (
                    <div class="col-3">
                      {this.state.images.length > 0 ? (
                        <img src={this.state.images[i]} alt="" />
                      ) : (
                        <img src={this.state.images} alt="" />
                      )}{" "}
                      <br />
                      <br />
                      <br />
                      <Other
                        datat={e}
                        category={this.state.data.category}
                        revId={e._id}
                        id={e._id}
                      />{" "}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <h1 id="id" hidden>
          <GetId />
        </h1>
      </div>
    );
  }
}

export default Reviews;
