"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { Card } from "@/components/ui/card";

type DotType =
  | "square"
  | "dots"
  | "rounded"
  | "extra-rounded"
  | "classy"
  | "classy-rounded";
type CornerSquareType = "square" | "dot" | DotType;
type CornerDotType = "square" | "dot" | DotType;

function mapDotStyle(
  style:
    | "square"
    | "rounded"
    | "dot"
    | "classy"
    | "classy-rounded"
    | "extra-rounded",
): DotType {
  switch (style) {
    case "square":
      return "square";
    case "rounded":
      return "rounded";
    case "dot":
      return "dots";
    case "classy":
      return "classy";
    case "classy-rounded":
      return "classy-rounded";
    case "extra-rounded":
      return "extra-rounded";
    default:
      return "square";
  }
}

function mapMarkerBorderStyle(
  style:
    | "square"
    | "rounded"
    | "circle"
    | "classy"
    | "classy-rounded"
    | "extra-rounded",
): CornerSquareType {
  switch (style) {
    case "square":
      return "square";
    case "rounded":
      return "extra-rounded";
    case "circle":
      return "dot";
    case "classy":
      return "classy";
    case "classy-rounded":
      return "classy-rounded";
    case "extra-rounded":
      return "extra-rounded";
    default:
      return "square";
  }
}

function mapMarkerCenterStyle(
  style:
    | "square"
    | "rounded"
    | "dot"
    | "classy"
    | "classy-rounded"
    | "extra-rounded",
): CornerDotType {
  switch (style) {
    case "square":
      return "square";
    case "rounded":
      return "rounded";
    case "dot":
      return "dot";
    case "classy":
      return "classy";
    case "classy-rounded":
      return "classy-rounded";
    case "extra-rounded":
      return "extra-rounded";
    default:
      return "square";
  }
}

interface QRPreviewProps {
  value: string;
  size: number;
  darkColor: string;
  cornerColor: string;
  lightColor: string;
  includeMargin: boolean;
  level: "L" | "M" | "Q" | "H";
  logo?: string;
  logoSize?: number;
  dotStyle?:
    | "square"
    | "rounded"
    | "dot"
    | "classy"
    | "classy-rounded"
    | "extra-rounded";
  markerBorder?:
    | "square"
    | "rounded"
    | "circle"
    | "classy"
    | "classy-rounded"
    | "extra-rounded";
  markerCenter?:
    | "square"
    | "rounded"
    | "dot"
    | "classy"
    | "classy-rounded"
    | "extra-rounded";
  onInstanceReady?: (instance: QRCodeStyling | null) => void;
}

export function QRPreview({
  value,
  size,
  darkColor,
  cornerColor,
  lightColor,
  includeMargin,
  level,
  logo,
  logoSize = 25,
  dotStyle = "square",
  markerBorder = "square",
  markerCenter = "square",
  onInstanceReady,
}: QRPreviewProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);
  const renderScale = 4;

  useEffect(() => {
    if (!qrRef.current || !value) {
      onInstanceReady?.(null);
      return;
    }

    const qr = new QRCodeStyling({
      width: size * renderScale,
      height: size * renderScale,
      data: value,
      image: logo,
      dotsOptions: {
        color: darkColor,
        type: mapDotStyle(dotStyle),
      },
      cornersSquareOptions: {
        color: cornerColor,
        type: mapMarkerBorderStyle(markerBorder),
      },
      cornersDotOptions: {
        color: cornerColor,
        type: mapMarkerCenterStyle(markerCenter),
      },
      backgroundOptions: {
        color: lightColor,
      },
      qrOptions: {
        errorCorrectionLevel: level,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: Math.max(0.1, Math.min(0.5, logoSize / 100)),
        saveAsBlob: true,
        margin: 4,
      },
      margin: includeMargin ? 8 : 0,
    });

    qrInstanceRef.current = qr;
    onInstanceReady?.(qr);

    // Clear previous content
    if (qrRef.current.firstChild) {
      qrRef.current.removeChild(qrRef.current.firstChild);
    }

    qr.append(qrRef.current);

    const renderedElement = qrRef.current
      .firstElementChild as HTMLElement | null;
    if (renderedElement) {
      renderedElement.style.width = `${size}px`;
      renderedElement.style.height = `${size}px`;
      renderedElement.style.maxWidth = "100%";
      renderedElement.style.maxHeight = "100%";
    }

    return () => {
      onInstanceReady?.(null);
      if (qrRef.current?.firstChild) {
        qrRef.current.removeChild(qrRef.current.firstChild);
      }
    };
  }, [
    value,
    size,
    darkColor,
    cornerColor,
    lightColor,
    level,
    logo,
    logoSize,
    dotStyle,
    markerBorder,
    markerCenter,
    includeMargin,
    onInstanceReady,
  ]);

  return (
    <Card className="flex h-full w-full flex-col items-center justify-center bg-card p-4 lg:p-5">
      <div className="rounded-lg border border-border bg-background p-4 lg:p-5">
        <div
          ref={qrRef}
          className="flex items-center justify-center"
          style={{ minHeight: size + 16, minWidth: size + 16 }}
        >
          {!value && (
            <p className="text-center text-sm text-muted-foreground">
              Enter text or URL to generate QR code
            </p>
          )}
        </div>
      </div>
      {value && (
        <p className="mt-4 text-xs text-muted-foreground">
          {value.length} characters
        </p>
      )}
    </Card>
  );
}
