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
      const revResponse = await fetch(
        `/otherReviews?category=${json.name.category}&id=${id}`
      );
      const revJson = await revResponse.json();
      this.setState({ data: [revJson.revs] });
      console.log(this.state.data[0][0]);
      console.log(this.state.data);
      this.state.data.map((e) => {
        e.map((t) => {
          console.log(t);
        });
      });
    } catch (error) {
      console.log(this.props);
      console.log(error);
    }
  }

  render() {
    return (
      <div class="testimonial">
        <div class="small-container">
          Reviews from similar Products:
          <div class="row">
            {this.state.data.map((e) => {
              <div>
                {e.map((t) => {
                  return (
                  <div class="col-3">
                    {' '}
                    <Review d={this.state.data} category={this.state.d} revId={t._id} id={this.state.i} />{' '}
                  </div>
                  );
                })}
              </div>;
            })}
            {/* {this.state.data ? ( */}
            {/* <div>
                <i class="fa fa-quote-left"></i>

                <div key={this.state.data[0]._id}>
                  <h3 style={{ paddingBottom: "15px", marginTop: "-30px" }}>
                    {this.state.data[0].name}
                  </h3>
                  <p>{this.state.data[0].comment}</p>
                  <p style={{ paddingTop: "15px" }}>
                    {this.state.data[0].rating}/5
                  </p>
                  {/* <img src="assets/shoes1.jpg" alt="" /> */}
            {/* </div> */}
            {/* </div> */}
            {/* // ): ""} */}
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
