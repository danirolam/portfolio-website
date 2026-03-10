"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
    </div>
  ),
});

// Major airports/cities for flight routes
const airports = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  { name: "Amsterdam", lat: 52.3676, lng: 4.9041 },
  { name: "Seoul", lat: 37.5665, lng: 126.978 },
  { name: "São Paulo", lat: -23.5505, lng: -46.6333 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
];

// Generate flight routes between airports
const generateArcs = () => {
  const arcs: Array<{
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color: string[];
  }> = [];

  // Create connections between major hubs
  const connections = [
    [0, 1],
    [0, 2],
    [0, 8],
    [0, 12], // New York connections
    [1, 3],
    [1, 6],
    [1, 9],
    [1, 10], // London connections
    [2, 4],
    [2, 7],
    [2, 11],
    [2, 14], // Tokyo connections
    [3, 13],
    [3, 4],
    [3, 7], // Dubai connections
    [4, 5],
    [4, 7],
    [4, 14], // Singapore connections
    [5, 7],
    [5, 2], // Sydney connections
    [6, 9],
    [6, 10], // Paris connections
    [7, 14],
    [7, 11], // Hong Kong connections
    [8, 2],
    [8, 11], // LA connections
    [13, 4],
    [13, 3], // Mumbai connections
  ];

  connections.forEach(([from, to]) => {
    arcs.push({
      startLat: airports[from].lat,
      startLng: airports[from].lng,
      endLat: airports[to].lat,
      endLng: airports[to].lng,
      color: [
        "rgba(255, 255, 255, 0.1)",
        "rgba(255, 255, 255, 0.6)",
        "rgba(255, 255, 255, 0.1)",
      ],
    });
  });

  return arcs;
};

const arcsData = generateArcs();

export default function GlobeVisualization() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleGlobeReady = useCallback(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0);
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableZoom = false;
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          atmosphereColor="rgba(100, 150, 255, 0.3)"
          atmosphereAltitude={0.15}
          // Arcs - flight routes
          arcsData={arcsData}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={3000}
          arcStroke={0.3}
          arcAltitudeAutoScale={0.4}
          // Interaction
          enablePointerInteraction={false}
          // Callbacks
          onGlobeReady={handleGlobeReady}
        />
      )}
    </div>
  );
}
