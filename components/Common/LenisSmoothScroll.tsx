"use client";
import { useEffect } from "react";
import { initSmoothScrolling } from "@/app/smoothscroll";

export default function LenisSmoothScroll() {
  useEffect(() => {
    initSmoothScrolling();
  }, []);
  return null;
}
