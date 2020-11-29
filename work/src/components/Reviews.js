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
      console.log(id);
      const response = await fetch(`/product?id=${id}`);
      const json = await response.json();
      this.setState({ data: [json.name] });
      console.log("work");
      console.log(this.state.data);
      const revRes = await fetch(
        `/otherReviews?category=${json.name.category}&id=${id}`
      );
      const revJson = await revRes.json();
      console.log(revJson.name);
      var t = [];
      var img = []
      revJson.name.map((rev) => {
        console.log(rev);
        img.push(rev.image[0])
        t.push(rev.reviews[0]);
      });
      this.setState({images: img})
      this.setState({ other: t });
      console.log(t);
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
            {/* <h1>{this.state.data[0].reviews.name}</h1> */}
            {/* <Review />
            <Review /> */}
          </div>
        </div>
        <div class="small-container">
          Reviews from similar products:
          <div class="row">
            {this.state.other.map((e, i) => {
              return (
                <div class="col-3">
                  {this.state.images.length > 0 ? <img src={this.state.images[i]} alt=""/>: <img src={this.state.images} alt=""/>}
                  {" "}
                  <Other datat={e} category={this.state.data.category} revId={e._id} id={e._id} />{" "}
                </div>
              );
            })}
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
