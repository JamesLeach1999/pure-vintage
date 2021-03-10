import React from 'react'

const Error = (props) => {
    return (
      <div>
        <div class="alert">
          <span
            class="closebtn"
            style={{
              marginLeft: "15px",
              color: "white",
              fontWeight: "bold",
              float: "right",
              fontSize: "22px",
              lineHeight: "20px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            &times;
          </span>
          <strong>Danger!</strong> Indicates a dangerous or potentially negative
          action.
        </div>
      </div>
    );
}

export default Error
