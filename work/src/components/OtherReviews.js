import React, { Component } from "react";
import Review from "./OtherRevs";
import { Link, useParams } from "react-router-dom";
import GetId from "./GetId";

class Reviews extends Component {
  constructor() {
    super();
    this.state = { data: [], images: [], i: "", d: [] };
  }

  async componentDidMount() {
    try {
      const id = document.getElementById("id").innerHTML;
      this.setState({ i: id });
      console.log(id);
      const response = await fetch(`/product?id=${id}`);
      const json = await response.json();
      this.setState({d: json.name.category})
      console.log(this.state.d)
      const revResponse = await fetch(
        `/otherReviews?category=${json.name.category}&id=${id}`
      );
      const revJson = await revResponse.json();
      console.log(revJson)
      this.setState({ data: revJson });
            console.log("work1");
      console.log(this.state.data);
      console.log(this.state.data.revs);
      
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
            {/* {this.state.data ? this.state.data.revs.map((e) => {
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
            }) : ""} */}
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
