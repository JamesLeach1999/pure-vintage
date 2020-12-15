import React, { Component } from "react";
import defaultImage from "../assets/shoes1.jpg";

class RecRevs extends Component {
  constructor() {
    super();
    this.state = { data: [], review: [] };
  }

  async componentDidMount() {
    try {
      console.log(this.props.data);
    } catch (error) {
      console.log(this.props.id);
      console.log(error);
    }
  }

  render() {
    return (
      <div>

        <div key={this.props.data._id}>
          <h3 style={{ paddingBottom: "15px", marginTop: "-30px" }}>
            {this.props.data.name}
          </h3>
          <p>{this.props.data.comment}</p>
          <p style={{ paddingTop: "15px" }}>{this.props.data.rating}/5</p>
          {/* <img src="assets/shoes1.jpg" alt="" /> */}
        </div>
      </div>
    );
  }
}

export default RecRevs;
