import React, { Component } from "react";
import spinner from "../../../assets/loading.gif";
class Spinner extends Component {
  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img height="100" src={spinner} alt="" />
        </div>
      </>
    );
  }
}
export default Spinner;
