import React, { Component } from "react";
import Review from "./OtherRevs";
import { Link, useParams } from "react-router-dom";
import GetId from "./GetId";

class Reviews extends Component {
  constructor() {
    super();
    this.state = { data: [], images: [], i: "", d: [], work: [] };
  }

  async componentDidMount() {
    try {
      const id = document.getElementById("id").innerHTML;
      console.log(id);
      const response = await fetch(`/product?id=${id}`);
      const json = await response.json();
      this.setState({ data: [json.name] });
      console.log("work222");
      console.log(this.state.data);
      if(this.state.data !== undefined){
        this.setState({work: this.state.data})
      }
      console.log(this.state.data.work);
      
    } catch (error) {
      console.log(this.props);
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
            {this.state.work.map((e) => {
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
        <h1 id="id" hidden>
          <GetId />
        </h1>
      </div>
    );
  }
}

export default Reviews;
