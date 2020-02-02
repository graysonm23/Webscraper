import React from "react";
import "../styles/bootstrap.css";
const name = "Grayson";
const age = 25;
function HelloBootstrap() {
  return (
    <div id="ContainerId" className="container">
      <div className="jumbotron">
        <h1>
          Hello, world! My name is {name} I am {age}
        </h1>
        <p>I'm a jumbotron!</p>
        <p>
          <button className="btn btn-primary btn-lg">Learn more</button>
        </p>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <h3>Card title</h3>
        </div>
        <div className="card-body">
          <p className="card-text">Card content</p>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <h3>Card title</h3>
        </div>
        <div className="card-body">
          <p className="card-text">Card content</p>
        </div>
      </div>
    </div>
  );
}

export default HelloBootstrap;
