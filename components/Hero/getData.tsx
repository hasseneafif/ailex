"use client";

import { useEffect, useState } from "react";
import { sendPing } from "@/services/dataService";

function getDeviceType() {
  const width = window.innerWidth;
  if (width <= 768) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
}

const Data: React.FC = () => {
  const [sessionId, setSessionId] = useState<string>("");

  // useEffect(() => {
  //   // Session ID
  //   let storedId = localStorage.getItem("sessionIdPHA");
  //   if (!storedId) {
  //     storedId = crypto.randomUUID();
  //     localStorage.setItem("sessionIdPHA", storedId);
  //   }
  //   setSessionId(storedId);

  //   const deviceType = getDeviceType();
  //   const userAgent = navigator.userAgent;
  //   const language = navigator.language || "unknown";
  //   const referrer = document.referrer || null;
  //   const pageLoadTime = performance.now() / 1000; 

  //   sendPing({
  //     sessionId: storedId,
  //     deviceType,
  //     userAgent,
  //     language,
  //     referrer,
  //     pageLoadTime,
  //   });
  // }, []);

  return null;
};

export default Data;
