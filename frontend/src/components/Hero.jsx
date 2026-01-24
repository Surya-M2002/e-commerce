import React from "react";

const Hero = () => {
  return (
    <section className="bg-light border-bottom">
      <div className="container py-5 text-center">
        <h1
          className="fw-bold mb-3"
          style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
        >
          Groceries Delivered in 90 Minutes
        </h1>

        <p className="text-muted fs-5 mb-4">
          Get your healthy foods & snacks delivered at your doorstep all day,
          every day
        </p>

        {/* Optional Search Bar */}
        <div className="d-flex justify-content-center">
          <div className="input-group" style={{ maxWidth: "520px" }}>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search your products..."
            />
            <button className="btn btn-success btn-lg px-4">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
