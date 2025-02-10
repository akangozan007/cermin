import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function WaterUp() {
  return (
    <div className="position-absolute top-0 start-0 bg-info" 
         style={{ height: "50%", width: "100%", zIndex: "-1" }}>
      Water Atas
    </div>
  );
}

export function WaterDown() {
  return (
    <div className="position-absolute bottom-0 start-0 bg-info" 
         style={{ height: "50%", width: "100%", zIndex: "-1" }}>
      Water Bawah
    </div>
  );
}


export function OilUp() {
  return (
    <div className="position-absolute top-0 start-0 bg-warning"
         style={{ height: "50%", width: "100%", zIndex: "-1" }}>
      Minyak Atas
    </div>
  );
}

export function OilDown() {
  return (
    <div className="position-absolute bottom-0 start-0 bg-warning"
         style={{ height: "50%", width: "100%", zIndex: "-1" }}>
      Minyak Bawah
    </div>
  );
}

