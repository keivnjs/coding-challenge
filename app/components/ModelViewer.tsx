"use client";

import "@google/model-viewer";

interface ModelViewerProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  arEnabled?: boolean;
  autoRotate?: boolean;
  cameraControls?: boolean;
}

export default function ModelViewer({
  src,
  alt = "3D model",
  className,
  width = 96,
  height = 96,
  arEnabled = true,
  autoRotate = false,
  cameraControls = true,
}: ModelViewerProps) {
  return (
    <div className={className} style={{ width, height, overflow: "hidden" }}>
      {/* @ts-expect-error: <model-viewer> is a Web Component and not part of JSX.IntrinsicElements */}
      <model-viewer
        src={src}
        alt={alt}
        ar={arEnabled}
        ar-modes="webxr scene-viewer quick-look"
        camera-controls={cameraControls}
        auto-rotate={autoRotate}
        shadow-intensity="1"
        shadow-softness="0.8"
        exposure="1"
        loading="eager"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
