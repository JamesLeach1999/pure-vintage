import React, { Component } from "react";
import Review from "./Review";
import { Link, useParams } from "react-router-dom";
import GetId from "./GetId";

class Reviews extends Component {
  constructor() {
    super();
    this.state = { data: [], images: [], i: "" };
  }

  async componentDidMount() {
    try {
      const id = document.getElementById("id").innerHTML;
      this.setState({i: id})
      console.log(id);
      const response = await fetch(`/product?id=${id}`);
      const json = await response.json();
      const revResponse = await fetch(`/otherReviews?category=${json.name.category}&id=${id}`);
      const revJson = await revResponse.json();
      this.setState({ data: [revJson.revs] });
      console.log(revJson)
    } catch (error) {
      console.log(this.props);
      console.log(error);
    }
  }

  render() {
    return (
      <div class="testimonial">
        <div class="small-container">
          <div class="row">
            {this.state.data.length > 0 ?this.state.data.map((e) => {
              return (
                      <div class="col-3">
                        {" "}
                        <Review revId={e._id} id={this.state.i} />{" "}
                      </div>
              )
            }): ""}
            {/* <h1>{this.state.data[0].reviews.name}</h1> */}
            {/* <Review />
            <Review /> */}
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
