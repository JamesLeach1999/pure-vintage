import React, { Component } from "react";
import defaultImage from "../assets/shoes1.jpg";

class Review extends Component {
  constructor() {
    super();
    this.state = { data: [], review: [] };
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        `/products?id=${this.props.id}`
      );
      const json = await response.json();
      this.setState({ data: json.name.reviews });
      const review = this.state.data.filter(
        (rev) => rev._id === this.props.revId
      );
      // console.log(review);

      this.setState({ review: review });

      // console.log(this.state.review);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {this.state.review.map((t) => {
          return (
            <div key={t._id}>
              <h3 style={{ paddingBottom: '15px', marginTop: '-30px' }}>{t.name}</h3>
              <p>{t.comment}</p>
              <p style={{ paddingTop: '15px' }}>{t.rating}/5</p>
              {/* <img src="assets/shoes1.jpg" alt="" /> */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Review;
