import React from "react";
import { useLocation } from "react-router-dom";

const BrandDetails = () => {
  const location = useLocation();
  console.log("data ", location.state);
  const { Style, Brand, img, Country, Stars } = location.state;
  return (
    <div style={{ padding: 50 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ width: "50%" }}>
          <img
            alt={Brand}
            src={img.Image}
            style={{
              height: 400,
              width: "auto",
              marginLeft: 5,
              marginBottom: 5,
            }}
          />
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            display: "grid",
          }}
        >
          <h2>Brand:&nbsp;{Brand}</h2>
          <h3>Country:&nbsp;{Country}</h3>

          <h3>Rating:&nbsp;{Stars}</h3>
          <h3>Style:&nbsp;{Style}</h3>
        </div>
      </div>
    </div>
  );
};

export default BrandDetails;
