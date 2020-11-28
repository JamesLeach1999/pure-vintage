import React, { Component } from "react";
import defaultImage from "../assets/shoes1.jpg";

class Review extends Component {
  constructor() {
    super();
    this.state = { data: [], review: [] };
  }

  async componentDidMount() {
    try {
        console.log(this.props.d)
    } catch (error) {
      console.log(this.props.id);
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <i class="fa fa-quote-left"></i>
        {this.props.d.map((t) => {
          return (
            <div key={t._id}>
              <h3 style={{ paddingBottom: "15px", marginTop: "-30px" }}>
                {t.name}
              </h3>
              <p>{t.comment}</p>
              <p style={{ paddingTop: "15px" }}>{t.rating}/5</p>
              {/* <img src="assets/shoes1.jpg" alt="" /> */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Review;
