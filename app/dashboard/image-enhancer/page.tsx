"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import ImageEnhancerMain from "./ImageEnhancerMain";
import ImageEnhancerRightPanel from "./ImageEnhancerRightPanel";

export default function ImageEnhancerPage() {
  const [activeFeature, setActiveFeature] = useState("upscale");

  return (
    <DashboardLayout
      navTitle="Image Enhancer"
      showModelSelector={false}
      rightPanel={<ImageEnhancerRightPanel />}
    >
      <ImageEnhancerMain activeFeature={activeFeature} onFeatureChange={setActiveFeature} />
    </DashboardLayout>
  );
}
