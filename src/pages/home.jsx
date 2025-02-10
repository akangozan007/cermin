import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import VideocamIcon from '@mui/icons-material/Videocam';
import { WaterUp, WaterDown, OilUp, OilDown } from './substance';  // Pastikan huruf kapital

function Home({ powerON, substanceTop, substanceBottom }) {
  const [kursor, setKursor] = useState({ x: 0, y: 0 });
  const cameraRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (cameraRef.current) {
        const rect = cameraRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        setKursor({
          x: event.clientX - centerX,
          y: event.clientY - centerY,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Menghitung sudut rotasi kamera mengikuti kursor
  const angle = Math.atan2(kursor.y, kursor.x) * (180 / Math.PI);

  return (
    <>
      <div className="cover-container d-flex bg-body-tertiary py-3 mx-auto flex-column">
        <div className="p-5 text-center rounded-3 h-100 flex-column" style={{ height: "100vh", position: "relative" }}>
          {/* Substance Top */}
          {substanceTop === "Oil" ? <OilUp className="container-fluid"/> : substanceTop === "Water" ? <WaterUp /> : null}

          <div className="p-5 text-center rounded-3 w-100 d-flex" style={{ position: "relative" }}>
            {/* CCTV Camera */}
            <div ref={cameraRef} style={{ position: "relative", width: "100px", height: "100px" }}>
              <VideocamIcon
                style={{
                  fontSize: 90,
                  transform: `rotate(${angle}deg)`,
                  transition: "transform 0.1s ease-out",
                  transformOrigin: "center",
                }}
              />
              {/* Laser */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "80vw",
                  height: "4px",
                  backgroundColor: "red",
                  transform: `rotate(${angle}deg) translateX(30px)`,
                  transformOrigin: "left",
                  transition: "transform 0.1s ease-out",
                  display: powerON === "on" ? "block" : "none",
                }}
              />
            </div>
            <div className='text-start m-5'>ini laser</div>
          </div>

          <div className="container-fluid" id="batasatasbawah">
            <p className='h3'>Jarak X: {kursor.x}</p>
            <p className='h3'>Jarak Y: {kursor.y}</p>
            <p id="StatusLaser" className='h3'>Status Laser: {powerON}</p>
            <p className='h3'>Status Substance Atas: {substanceTop}</p>
            <p className='h3'>Status Substance Bawah: {substanceBottom}</p>
          </div>

          {/* Substance Bottom */}
          {substanceBottom === "Oil" ? <OilDown /> : substanceBottom === "Water" ? <WaterDown /> : null}
        </div>
      </div>
    </>
  );
}

export default Home;
