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
  const [laserColor, setLaserColor] = useState("red"); // Warna laser dinamis

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

        setKursor({
          x: event.clientX - centerX,
          y: event.clientY - centerY,
        });
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
  }, [kursor.x, kursor.y]);

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
    if (laserPos.y > batasBawah.y) {
      setLaserColor("blue"); // Laser berubah biru jika melewati batas bawah
    } else {
      setLaserColor("red"); // Kembali ke merah jika masih di atas batas bawah
    }
  }, [laserPos, batasBawah]);

  const angle = Math.atan2(kursor.y, kursor.x) * (180 / Math.PI);

  return (
    <div className="cover-container d-flex py-3 mx-auto flex-column">
      <div
        className="p-5 text-center rounded-3 h-100 flex-column"
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          position: "relative",
        }}
      >
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
                transform: `rotate(${angle}deg)`,
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
                backgroundColor: laserColor, // Warna laser berubah dinamis
                transform: `rotate(${angle}deg) translateX(30px)`,
                transformOrigin: "left",
                transition: "transform 0.1s ease-out, background-color 0.2s ease-in-out",
                display: powerON === "on" ? "block" : "none",
                zIndex: 0,
              }}
            />
          </div>
          <div className="text-start m-5">ini laser</div>
        </div>

        {/* Titik Koordinat Laser */}
        <div
          id="laserDot"
          style={{
            position: "absolute",
            top: `${laserPos.y}px`,
            left: `${laserPos.x}px`,
            width: "10px",
            height: "10px",
            backgroundColor: "yellow",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        ></div>

        <div className="position-relative" id="batasatasbawah" style={{ zIndex: 1 }}>
          <div className="position-absolute top-0 end-0">
            <p className="h3">Jarak X: {kursor.x}</p>
            <p className="h3">Jarak Y: {kursor.y}</p>
            <p id="StatusLaser" className="h3">Status Laser: {powerON}</p>
            <p className="h3">Status Substance Atas: {substanceTop}</p>
            <p className="h3">Status Substance Bawah: {substanceBottom}</p>
            <p className="h3">Posisi Laser X: {Math.round(laserPos.x)}</p>
            <p className="h3">Posisi Laser Y: {Math.round(laserPos.y)}</p>
            <p className="h3">
              Batas substansi Atas: di titik X: {Math.round(batasAtas.x)}, Y: {Math.round(batasAtas.y)}
            </p>
            <p className="h3">
              Batas substansi Bawah: di titik X: {Math.round(batasBawah.x)}, Y: {Math.round(batasBawah.y)}
            </p>
          </div>
        </div>

        {/* Substance Bottom */}
        <div ref={bawahRef} className="top-50 start-50">
          {substanceBottom === "Oil" ? <OilDown /> : substanceBottom === "Water" ? <WaterDown /> : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
