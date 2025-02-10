import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function WaterUp() {
  console.log("waterUp");
  return (
    <>
      <div className="container-fluid bg-info" style={{ position: "absolute", height:"55%", zIndex:"-1", width:"100%" }}>water atas</div>
    </>
  );
}

export function WaterDown() {
  console.log("waterDown");
  return (
    <>
      <div className="container-fluid bg-info" style={{ position: "absolute", height:"55%", zIndex:"-1", width:"100%" }}>water bawah</div>
    </>
  );
 
}

export function OilUp() {
  console.log("oilUp");
  return (
    <>
      <div className="container-fluid bg-warning" style={{ position: "absolute", height:"55%", zIndex:"-1", width:"100%" }}>minyak atas</div>
    </>
  );
}

export function OilDown() {
  console.log("oilDown");
  return (
    <>
      <div className="container-fluid bg-warning" style={{ position: "absolute", height:"55%", zIndex:"-1", width:"100%" }}>minyak bawah</div>
    </>
  );
}
