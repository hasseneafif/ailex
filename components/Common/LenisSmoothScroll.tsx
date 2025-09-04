"use client";
import { useEffect } from "react";
import { initSmoothScrolling } from "@/components/Common/smoothscroll";

export default function LenisSmoothScroll() {
  useEffect(() => {
    initSmoothScrolling();
  }, []);
  return null;
}
