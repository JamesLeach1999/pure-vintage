import React from 'react'

const Footer = () => {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div
          class="container footer"
          style={{ backgroundColor: "white", color: "black" }}
        >
          <div class="row" style={{maxWidth: "90%", width: "85vw"}}>
            <div class="footer-col-1">
              <div class="app-logo">
                <img
                  src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1609183491/logo_blue_ajnowp.png"
                  alt="logo"
                  width="125px"
                />
              </div>
            </div>
            <div class="footer-col-2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam esse temporibus totam.
              </p>
            </div>
            <div class="footer-col-3">
              <h3>Useful links</h3>
              <ul>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
              </ul>
            </div>
            <div class="footer-col-4">
              <h3>Follow us</h3>
              <ul>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
              </ul>
            </div>
          </div>
          <hr />
          <p class="copyright">Copyright 2020</p>
        </div>
      </div>
    );
}

export default Footer
