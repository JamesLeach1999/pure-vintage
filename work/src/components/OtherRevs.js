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
      const response = await fetch(`/otherReviews?category=${this.props.category}&id=${this.props.id}`);
      const json = await response.json();
      this.setState({ data: json.name[0].reviews });
      console.log(json.name)
      console.log(this.state.data);
      var review
      var t = []
      json.name.map((rev) => {
        t.push(rev.review)
      })

      console.log(review);

      this.setState({ review: review });

      console.log(this.state.review);
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

export default OtherRevs;
