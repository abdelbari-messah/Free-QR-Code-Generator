"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { ColorPicker } from "./color-picker";
import { Download, Copy, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QRCustomizationProps {
  value: string;
  onValueChange: (value: string) => void;
  size: number;
  onSizeChange: (size: number) => void;
  darkColor: string;
  onDarkColorChange: (color: string) => void;
  cornerColor: string;
  onCornerColorChange: (color: string) => void;
  lightColor: string;
  onLightColorChange: (color: string) => void;
  format: "png" | "svg";
  onFormatChange: (format: "png" | "svg") => void;
  onDownload: (format: "png" | "svg") => void;
  includeMargin: boolean;
  onMarginChange: (include: boolean) => void;
  logo?: string;
  onLogoChange: (logo: string | undefined) => void;
  logoSize?: number;
  onLogoSizeChange: (size: number) => void;
  dotStyle?:
    | "square"
    | "rounded"
    | "dot"
    | "classy"
    | "classy-rounded"
    | "extra-rounded";
  onDotStyleChange: (
    style:
      | "square"
      | "rounded"
      | "dot"
      | "classy"
      | "classy-rounded"
      | "extra-rounded",
  ) => void;
  markerBorder?:
    | "square"
    | "rounded"
    | "circle"
    | "classy"
    | "classy-rounded"
    | "extra-rounded";
  onMarkerBorderChange: (
    style:
      | "square"
      | "rounded"
      | "circle"
      | "classy"
      | "classy-rounded"
      | "extra-rounded",
  ) => void;
  markerCenter?:
    | "square"
    | "rounded"
    | "dot"
    | "classy"
    | "classy-rounded"
    | "extra-rounded";
  onMarkerCenterChange: (
    style:
      | "square"
      | "rounded"
      | "dot"
      | "classy"
      | "classy-rounded"
      | "extra-rounded",
  ) => void;
}

export function QRCustomization({
  value,
  onValueChange,
  size,
  onSizeChange,
  darkColor,
  onDarkColorChange,
  cornerColor,
  onCornerColorChange,
  lightColor,
  onLightColorChange,
  format,
  onFormatChange,
  onDownload,
  includeMargin,
  onMarginChange,
  logo,
  onLogoChange,
  logoSize = 25,
  onLogoSizeChange,
  dotStyle = "square",
  onDotStyleChange,
  markerBorder = "square",
  onMarkerBorderChange,
  markerCenter = "square",
  onMarkerCenterChange,
}: QRCustomizationProps) {
  const [copied, setCopied] = useState(false);
  const tabTriggerClass =
    "h-10 rounded-xl border border-transparent px-2 text-[11px] font-medium tracking-tight text-foreground/75 transition-all duration-200 hover:text-foreground data-[state=active]:border-border/60 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm sm:text-sm";

  const getTextChipClass = (isActive: boolean) =>
    `inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors ${
      isActive
        ? "border-foreground bg-foreground text-background"
        : "border-border bg-muted text-foreground hover:bg-muted/80"
    }`;

  const getIconChipClass = (isActive: boolean) =>
    `flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
      isActive
        ? "border-foreground bg-foreground text-background"
        : "border-border bg-muted text-foreground hover:bg-muted/80"
    }`;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        onLogoChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    onLogoChange(undefined);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="flex min-h-0 w-full flex-col bg-card">
      <Tabs
        defaultValue="link"
        className="flex w-full flex-col overflow-visible md:min-h-0 md:flex-1 md:overflow-hidden"
      >
        <div className="w-full items-center justify-center px-4 pt-1">
          <TabsList className="grid h-auto w-full grid-cols-5 rounded-2xl border border-border/70 bg-muted/70 p-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
            <TabsTrigger value="link" className={tabTriggerClass}>
              Link
            </TabsTrigger>
            <TabsTrigger value="style" className={tabTriggerClass}>
              Style
            </TabsTrigger>
            <TabsTrigger value="color" className={tabTriggerClass}>
              Color
            </TabsTrigger>
            <TabsTrigger value="logo" className={tabTriggerClass}>
              Logo
            </TabsTrigger>
            <TabsTrigger value="format" className={tabTriggerClass}>
              Format
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Link Tab */}
        <TabsContent
          value="link"
          className="space-y-3 overflow-y-auto p-4 md:min-h-0"
        >
          <div className="space-y-2">
            <Label htmlFor="qr-input">Enter URL or text</Label>
            <div className="flex gap-2">
              <Input
                id="qr-input"
                placeholder="https://example.com or any text..."
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                className="flex-1"
              />
              {value && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Style Tab */}
        <TabsContent
          value="style"
          className="space-y-3 overflow-y-auto p-4 md:min-h-0"
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="size-slider" className="text-sm font-medium">
                Download size
              </Label>
              <span className="text-xs text-muted-foreground">{size}px</span>
            </div>
            <Slider
              id="size-slider"
              min={100}
              max={500}
              step={10}
              value={[size]}
              onValueChange={(values) => onSizeChange(values[0])}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Changes exported file size only. Preview stays fixed.
            </p>
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onSizeChange(150)}
              >
                Small
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onSizeChange(250)}
              >
                Medium
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onSizeChange(400)}
              >
                Large
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Dots</Label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onDotStyleChange("square")}
                className={getTextChipClass(dotStyle === "square")}
                aria-label="Square dots"
              >
                Square
              </button>
              <button
                type="button"
                onClick={() => onDotStyleChange("rounded")}
                className={getTextChipClass(dotStyle === "rounded")}
                aria-label="Rounded dots"
              >
                Rounded
              </button>
              <button
                type="button"
                onClick={() => onDotStyleChange("dot")}
                className={getTextChipClass(dotStyle === "dot")}
                aria-label="Circle dots"
              >
                Dots
              </button>
              <button
                type="button"
                onClick={() => onDotStyleChange("classy")}
                className={getTextChipClass(dotStyle === "classy")}
                aria-label="Classy dots"
              >
                Classy
              </button>
              <button
                type="button"
                onClick={() => onDotStyleChange("classy-rounded")}
                className={getTextChipClass(dotStyle === "classy-rounded")}
                aria-label="Classy rounded dots"
              >
                Classy Rounded
              </button>
              <button
                type="button"
                onClick={() => onDotStyleChange("extra-rounded")}
                className={getTextChipClass(dotStyle === "extra-rounded")}
                aria-label="Extra rounded dots"
              >
                Extra Rounded
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Marker border</Label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onMarkerBorderChange("square")}
                className={getIconChipClass(markerBorder === "square")}
                aria-label="Square marker border"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <rect x="4" y="4" width="16" height="16" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onMarkerBorderChange("rounded")}
                className={getIconChipClass(markerBorder === "rounded")}
                aria-label="Rounded marker border"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <rect x="4" y="4" width="16" height="16" rx="3" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onMarkerBorderChange("circle")}
                className={getIconChipClass(markerBorder === "circle")}
                aria-label="Circle marker border"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <circle cx="12" cy="12" r="8" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onMarkerBorderChange("classy")}
                className={getTextChipClass(markerBorder === "classy")}
                aria-label="Classy marker border"
              >
                Classy
              </button>
              <button
                type="button"
                onClick={() => onMarkerBorderChange("classy-rounded")}
                className={getTextChipClass(markerBorder === "classy-rounded")}
                aria-label="Classy rounded marker border"
              >
                Classy Rounded
              </button>
              <button
                type="button"
                onClick={() => onMarkerBorderChange("extra-rounded")}
                className={getTextChipClass(markerBorder === "extra-rounded")}
                aria-label="Extra rounded marker border"
              >
                Extra Rounded
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Marker center</Label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onMarkerCenterChange("square")}
                className={getIconChipClass(markerCenter === "square")}
                aria-label="Square marker center"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect
                    x="5"
                    y="5"
                    width="14"
                    height="14"
                    rx="1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  />
                  <rect x="9" y="9" width="6" height="6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onMarkerCenterChange("rounded")}
                className={getIconChipClass(markerCenter === "rounded")}
                aria-label="Rounded marker center"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect
                    x="5"
                    y="5"
                    width="14"
                    height="14"
                    rx="1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  />
                  <rect x="9" y="9" width="6" height="6" rx="2" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onMarkerCenterChange("dot")}
                className={getIconChipClass(markerCenter === "dot")}
                aria-label="Dot marker center"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect
                    x="5"
                    y="5"
                    width="14"
                    height="14"
                    rx="1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onMarkerCenterChange("classy")}
                className={getTextChipClass(markerCenter === "classy")}
                aria-label="Classy marker center"
              >
                Classy
              </button>
              <button
                type="button"
                onClick={() => onMarkerCenterChange("classy-rounded")}
                className={getTextChipClass(markerCenter === "classy-rounded")}
                aria-label="Classy rounded marker center"
              >
                Classy Rounded
              </button>
              <button
                type="button"
                onClick={() => onMarkerCenterChange("extra-rounded")}
                className={getTextChipClass(markerCenter === "extra-rounded")}
                aria-label="Extra rounded marker center"
              >
                Extra Rounded
              </button>
            </div>
          </div>
        </TabsContent>

        {/* Color Tab */}
        <TabsContent
          value="color"
          className="space-y-3 overflow-y-auto p-4 md:min-h-0"
        >
          <ColorPicker
            value={darkColor}
            onChange={onDarkColorChange}
            label="Dots"
          />
          <ColorPicker
            value={cornerColor}
            onChange={onCornerColorChange}
            label="Corners"
          />
          <ColorPicker
            value={lightColor}
            onChange={onLightColorChange}
            label="Background"
          />
        </TabsContent>

        {/* Logo Tab */}
        <TabsContent
          value="logo"
          className="space-y-3 overflow-y-auto p-4 md:min-h-0"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo-size-slider">Logo size: {logoSize}%</Label>
              <Slider
                id="logo-size-slider"
                min={10}
                max={50}
                step={1}
                value={[logoSize]}
                onValueChange={(values) => onLogoSizeChange(values[0])}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="logo-input" className="mb-2 block">
                Upload Logo (PNG or JPG)
              </Label>
              <Input
                id="logo-input"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleLogoUpload}
                className="cursor-pointer"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Recommended: Square image, at least 200x200px
              </p>
            </div>

            {logo && (
              <div className="space-y-3">
                <div className="flex items-center justify-center rounded-lg border border-border bg-background p-4">
                  <img
                    src={logo}
                    alt="Logo preview"
                    className="max-h-24 max-w-24 rounded object-contain"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveLogo}
                  className="w-full"
                >
                  Remove Logo
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Format Tab */}
        <TabsContent
          value="format"
          className="space-y-3 overflow-y-auto p-4 md:min-h-0"
        >
          <div className="space-y-3">
            <Label>File Format</Label>
            <RadioGroup
              value={format}
              onValueChange={(val) => onFormatChange(val as "png" | "svg")}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="png" id="format-png" />
                <Label htmlFor="format-png" className="cursor-pointer">
                  PNG (Raster)
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="svg" id="format-svg" />
                <Label htmlFor="format-svg" className="cursor-pointer">
                  SVG (Vector)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </TabsContent>
      </Tabs>

      <div className="border-t border-border p-2 sm:p-2">
        <Button
          onClick={() => onDownload(format)}
          disabled={!value}
          className="w-full gap-2"
          size="lg"
        >
          <Download className="h-4 w-4" />
          Download {format.toUpperCase()}
        </Button>
      </div>
    </Card>
  );
}
