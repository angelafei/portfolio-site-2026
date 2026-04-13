"use client"
import { useState } from "react";
import LoadingScreen from "./component/loadingScreen";
import Home from "./component/home";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {/* <LoadingScreen /> */}
      {!ready && <LoadingScreen onComplete={() => setReady(true)} />}
      <div style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
        <Home />
      </div>
    </>
  );
}
