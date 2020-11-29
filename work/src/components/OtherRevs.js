import React, { Component } from "react";
import defaultImage from "../assets/shoes1.jpg";

class OtherRevs extends Component {
  constructor() {
    super();
    this.state = { data: [], review: [] };
  }

  async componentDidMount() {
    try {
        const revRes = await fetch(`/otherProducts?category=${this.props.category}&id=${this.props.id}`)
        const revJson = await revRes.json()

        this.setState({data: revJson})

        const review = this.state.data.filter(
          (rev) => rev._id === this.props.revId
        );
console.log(review)
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
        {this.props.review.map((t) => {
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