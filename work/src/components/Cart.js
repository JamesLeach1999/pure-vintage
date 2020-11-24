import React, { Component } from 'react';
import CartProduct from './CartProduct';
import { Link } from 'react-router-dom';
import { intersection } from 'lodash';
import Order from "../pageStripe/index"
class Cart extends Component {
  constructor() {
    super();
    this.state = { data: [], images: require('../assets/cap1.jpg'), total: 0, user: {} };
  }

  async componentDidMount() {

    const profile = await fetch(`/me`);
console.log(profile)
    if (!profile) {
      window.location.replace('/store');
    } else {

      try {
        // const test = await fetch("http://localhost:9000/store");
        // console.log(test);
        const user = await fetch("/me")
        const meResp = user.json()
        this.setState({user: meResp})
        const response = await fetch(`/cart`);
        const json = await response.json();
        console.log(json);
  
        var notNull = []
        json.cart.map((pro) => {
          if(pro !== null){
            notNull.push(pro)
          }
        })
        console.log(notNull)
        
        this.setState({ data: [notNull] });
        // var total = document.getElementById("total")
        // console.log(this.state.data.name.price);
        console.log(this.state.data[0]);
        var total = [];
        var p = this.state.data[0].map((pr) => {
          console.log(pr.price);
          return total.push(pr.price);
        });
        var sum = total.reduce((a, b) => a + b, 0);
  
        this.setState({ total: sum });
        console.log(this.state.data)
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  render() {
    return (
      <div className="small-container cart-page">
      <h1>Cart</h1>
        <table>
          <tr>
            <th style={{ textAlign: 'left', paddingLeft: '20px' }}>Product</th>
            <th>Size</th>
            <th>Sub total</th>
            <th>Remove?</th>
          </tr>
          {/* <div className="row"> */}
          {/* <tr> */}
          {this.state.data.map((products) => {
            return products.map((product) => {
              // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
              return (
                <tr>
                  <Link to={`/product/${product._id}`}>
                    <CartProduct id={product._id} />
                  </Link>
                  <br />

                  <td>{product.size}</td>
                  <td id="total">{product.price}</td>
                  <td>
                    <form action="/cartProduct" method="POST"                         
>
                      <input type="text" value={product._id} name="id" hidden />
                      <input type="checkbox" />
                      <button
                        type="submit"
                      >Remove?</button>
                    </form>
                  </td>
                </tr>
              );
            });
          })}
          {/* </tr> */}
          {/* </div> */}
          <tr>
            <td></td>
            <td></td>
            <td>Total</td>
            <td>{this.state.total}</td>
          </tr>
        </table>

        <div>
          <Link to="/order" style={{textAlign: "right"}}>
            checkout
          </Link>
        </div>

        <table></table>
      </div>
    );
  }
}
// const Cart = () => {
//   return (
//     <div>
//       <div class="small-container cart-page">
//         <table>
//           <tr>
//             <th>Product</th>
//             <th>Size</th>
//             <th>Sub total</th>
//           </tr>
//           <CartProduct />
//           <CartProduct />
//         </table>
//         <div class="total-price">
//           <table>
//             <tr>
//               <td>Total</td>
//               <td>£3.50</td>
//             </tr>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Cart;
