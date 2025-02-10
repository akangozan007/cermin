import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function WaterUp() {
  console.log("waterUp");
  return (
    <>
      <div className="w-100 d-flex" style={{ position: "relative", height:"50%" }}>water atas</div>
    </>
  );
}

export function WaterDown() {
  console.log("waterDown");
  return (
    <>
      <div>water bawah</div>
    </>
  );
 
}

export function OilUp() {
  console.log("oilUp");
  return (
    <>
      <div className="container-fluid bg-warning" style={{ position: "absolute", height:"50%", zIndex:"1" }}>minyak atas</div>
    </>
  );
}

export function OilDown() {
  console.log("oilDown");
  return (
    <>
      <div>minyak bawah</div>
    </>
  );
}
