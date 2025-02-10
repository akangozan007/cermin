import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import VideocamIcon from "@mui/icons-material/Videocam";
import { WaterUp, WaterDown, OilUp, OilDown } from "./substance";

function Home({ powerON, substanceTop, substanceBottom }) {
  const [kursor, setKursor] = useState({ x: 0, y: 0 });
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });
  const [batasAtas, setBatasAtas] = useState({ x: 0, y: 0 });
  const [batasBawah, setBatasBawah] = useState({ x: 0, y: 0 });
  const [laserAngle, setLaserAngle] = useState(0);
  const [laserColor, setLaserColor] = useState("red");

  const cameraRef = useRef(null);
  const laserRef = useRef(null);
  const atasRef = useRef(null);
  const bawahRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (cameraRef.current) {
        const rect = cameraRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = event.clientX - centerX;
        const y = event.clientY - centerY;
        setKursor({ x, y });
        setLaserAngle(Math.atan2(y, x) * (180 / Math.PI));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const updateLaserPosition = () => {
      if (laserRef.current) {
        const laserRect = laserRef.current.getBoundingClientRect();
        setLaserPos({ x: laserRect.left, y: laserRect.top });
      }
      requestAnimationFrame(updateLaserPosition);
    };

    updateLaserPosition();
    return () => cancelAnimationFrame(updateLaserPosition);
  }, []);

  useEffect(() => {
    const updateBatasan = () => {
      if (atasRef.current && bawahRef.current) {
        const atasRect = atasRef.current.getBoundingClientRect();
        const bawahRect = bawahRef.current.getBoundingClientRect();
        setBatasAtas({ x: atasRect.left, y: atasRect.bottom });
        setBatasBawah({ x: bawahRect.left, y: bawahRect.top });
      }
      requestAnimationFrame(updateBatasan);
    };

    updateBatasan();
    return () => cancelAnimationFrame(updateBatasan);
  }, []);

  useEffect(() => {
    if (laserPos.y <= batasAtas.y || laserPos.y >= batasBawah.y) {
      setLaserAngle((prevAngle) => 180 - prevAngle);
    }
  }, [laserPos, batasAtas, batasBawah]);

  return (
    <div className="cover-container d-flex py-3 mx-auto flex-column">
      <div className="p-5 text-center rounded-3 h-100 flex-column" style={{ height: "100vh", width: "100vw", overflow: "hidden", position: "relative" }}>

        {/* Substance Top */}
        <div ref={atasRef}>
          {substanceTop === "Oil" ? <OilUp /> : substanceTop === "Water" ? <WaterUp /> : null}
        </div>

        <div className="p-5 text-center rounded-3 w-100 d-flex" style={{ position: "relative" }}>
          {/* CCTV Camera */}
          <div ref={cameraRef} style={{ position: "relative", width: "100px", height: "100px" }}>
            <VideocamIcon
              style={{
                fontSize: 90,
                transform: `rotate(${laserAngle}deg)`,
                transition: "transform 0.1s ease-out",
                transformOrigin: "center",
              }}
            />
            {/* Laser */}
            <div
              id="posisiLaser"
              ref={laserRef}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "80vw",
                height: "4px",
                backgroundColor: laserColor,
                transform: `rotate(${laserAngle}deg) translateX(30px)`,
                transformOrigin: "left",
                transition: "transform 0.1s ease-out, background-color 0.2s ease-in-out",
                display: powerON === "on" ? "block" : "none",
                zIndex: 0,
              }}
            />
          </div>
          <div className="text-start m-5">ini laser</div>
        </div>

        <div className="position-relative" id="batasatasbawah" style={{ zIndex: 1 }}>
          <div className="position-absolute top-0 end-0">
            <p className="h3">Jarak X: {kursor.x}</p>
            <p className="h3">Jarak Y: {kursor.y}</p>
            <p id="StatusLaser" className="h3">Status Laser: {powerON}</p>
            <p className="h3">Status Substance Atas: {substanceTop}</p>
            <p className="h3">Status Substance Bawah: {substanceBottom}</p>
            <p className="h3">Posisi Laser X: {Math.round(laserPos.x)}</p>
            <p className="h3">Posisi Laser Y: {Math.round(laserPos.y)}</p>
            <p className="h3">Batas substansi Atas: di titik X: {Math.round(batasAtas.x)}, Y: {Math.round(batasAtas.y)}</p>
            <p className="h3">Batas substansi Bawah: di titik X: {Math.round(batasBawah.x)}, Y: {Math.round(batasBawah.y)}</p>
          </div>
        </div>

        {/* Substance Bottom */}
         {/* Laser */}
         <div
              id="posisiLaser"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "80vw",
                height: "4px",
                backgroundColor: laserColor,
                // transform: `rotate(${laserAngle}deg) translateX(30px)`,
                transformOrigin: "left",
                transition: "transform 0.1s ease-out, background-color 0.2s ease-in-out",
                display: powerON === "on" ? "block" : "none",
                zIndex: 0,
              }}
            />
        <div ref={bawahRef} className="top-50 start-50">
          {substanceBottom === "Oil" ? <OilDown /> : substanceBottom === "Water" ? <WaterDown /> : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
