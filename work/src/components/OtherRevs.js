import React, { Component } from "react";
import defaultImage from "../assets/shoes1.jpg";

class OtherRevs extends Component {
  constructor() {
    super();
    this.state = { data: [], review: [] };
  }

  async componentDidMount() {
    try {
      console.log(this.props.datat)
      
    } catch (error) {
      console.log(this.props.id);
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <i class="fa fa-quote-left"></i>
        {this.state.review.map((t) => {
          return (
            <div key={this.props.datat._id}>
              <h3 style={{ paddingBottom: "15px", marginTop: "-30px" }}>
                {this.props.datat.name}
              </h3>
              <p>{this.props.datat.comment}</p>
              <p style={{ paddingTop: "15px" }}>{this.props.datat.rating}/5</p>
              {/* <img src="assets/shoes1.jpg" alt="" /> */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default OtherRevs;
