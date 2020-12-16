import React from "react";

const Caja = ({ subheader }) => {
  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">{subheader.title}</h1>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6 text-center mt-2">
            <h3>{subheader.box1.title}</h3>
            <span>{subheader.box1.text}</span>
          </div>
          <div className="col-md-6 text-center mt-2">
            <h3>{subheader.box2.title}</h3>
            <span>{subheader.box2.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Caja;
