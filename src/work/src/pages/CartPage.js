import React from "react";
const Cart = () => {
  return (
    <div>
      <div class="small-container cart-page">
        <table>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Sub total</th>
          </tr>
          {/* <CartProduct />
          <CartProduct /> */}
        </table>
        <div class="total-price">
          <table>
            <tr>
              <td>Total</td>
              <td>£3.50</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
