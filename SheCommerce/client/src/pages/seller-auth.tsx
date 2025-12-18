import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import heic2any from "heic2any";

export default function SellerAuthPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.defer = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Failed to load script: " + src));
        document.body.appendChild(s);
      });

    async function loadAll() {
      try {
        await loadScript(
          "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"
        );
        console.log("✅ face-api.js loaded successfully");
        initFaceVerification();
      } catch (err) {
        console.error("Error loading scripts:", err);
        alert("Failed to load face-api.js. Please check your internet connection.");
      }
    }

    loadAll();
  }, []);

  function initFaceVerification() {
    const fileA = document.getElementById("fileAadhaar") as HTMLInputElement;
    const fileS = document.getElementById("fileSelfie") as HTMLInputElement;
    const aadhaarName = document.getElementById("aadhaarName")!;
    const selfieName = document.getElementById("selfieName")!;
    const canvasA = document.getElementById("canvasAadhaar") as HTMLCanvasElement;
    const canvasS = document.getElementById("canvasSelfie") as HTMLCanvasElement;
    const verifyBtn = document.getElementById("verifyBtn") as HTMLButtonElement;
    const resultEl = document.getElementById("result")!;
    const thresholdRange = document.getElementById("thresholdRange") as HTMLInputElement;
    const thresholdVal = document.getElementById("thresholdVal")!;

    let imgA: HTMLImageElement | null = null;
    let imgS: HTMLImageElement | null = null;

    const MODEL_URLS = [
      "/models",
      "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights",
      "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights",
    ];

    async function tryLoadFrom(url: string) {
      try {
        // @ts-ignore
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(url),
          faceapi.nets.faceLandmark68Net.loadFromUri(url),
          faceapi.nets.faceRecognitionNet.loadFromUri(url),
          faceapi.nets.ssdMobilenetv1.loadFromUri(url),
        ]);
        return true;
      } catch {
        return false;
      }
    }

    async function loadModels() {
      resultEl.textContent = "Loading face-api models...";
      for (const url of MODEL_URLS) {
        const ok = await tryLoadFrom(url);
        if (ok) {
          resultEl.textContent = "Models loaded. Choose two images.";
          verifyBtn.disabled = false;
          return;
        }
      }
      resultEl.innerHTML =
        "❌ Error loading models. Check your network or host models locally in /models.";
      verifyBtn.disabled = true;
    }

    loadModels();

    // 🧠 Robust image reader with HEIC and fallback
    async function readImageFromFile(file: File): Promise<HTMLImageElement> {
      try {
        if (file.size > 10 * 1024 * 1024)
          throw new Error("File too large — please upload under 10 MB.");

        const lower = (file.type || "").toLowerCase();
        if (
          lower.includes("heic") ||
          lower.includes("heif") ||
          file.name.toLowerCase().endsWith(".heic") ||
          file.name.toLowerCase().endsWith(".heif")
        ) {
          console.log("Converting HEIC to JPEG...");
          try {
            const converted = await heic2any({
              blob: file,
              toType: "image/jpeg",
              quality: 0.92,
            });
            const jpg = Array.isArray(converted) ? converted[0] : converted;
            file = new File([jpg], "converted.jpg", { type: "image/jpeg" });
          } catch (err) {
            console.warn("HEIC conversion failed:", err);
          }
        }

        // Try createImageBitmap first
        try {
          const bitmap = await createImageBitmap(file);
          const canvas = document.createElement("canvas");
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(bitmap, 0, 0);
          const img = new Image();
          img.src = canvas.toDataURL();
          await new Promise((res) => (img.onload = res));
          return img;
        } catch (e) {
          console.warn("createImageBitmap failed, using FileReader:", e);
          return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = reader.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        }
      } catch (err) {
        console.error("Image decode error:", err);
        throw new Error("The source image could not be decoded.");
      }
    }

    function drawImageToCanvas(image: HTMLImageElement, canvas: HTMLCanvasElement) {
      const max = 420;
      const ratio = Math.min(1, max / Math.max(image.width, image.height));
      const w = Math.round(image.width * ratio);
      const h = Math.round(image.height * ratio);
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(image, 0, 0, w, h);
    }

    async function handleFileInput(ev: Event, target: "aadhaar" | "selfie") {
      const input = ev.target as HTMLInputElement;
      const file = input.files && input.files[0];
      if (!file) return;
      try {
        const img = await readImageFromFile(file);
        if (target === "aadhaar") {
          imgA = img;
          drawImageToCanvas(imgA, canvasA);
          aadhaarName.textContent = file.name;
        } else {
          imgS = img;
          drawImageToCanvas(imgS, canvasS);
          selfieName.textContent = file.name;
        }
        resultEl.textContent = "Ready to verify.";
      } catch (e) {
        resultEl.textContent = "⚠️ Failed to load image: " + (e as Error).message;
      }
    }

    fileA?.addEventListener("change", (e) => handleFileInput(e, "aadhaar"));
    fileS?.addEventListener("change", (e) => handleFileInput(e, "selfie"));

    async function verify() {
      if (!imgA || !imgS) {
        resultEl.textContent = "Please select both images.";
        return;
      }
      verifyBtn.disabled = true;
      resultEl.textContent = "Verifying...";

      try {
        // @ts-ignore
        const options = new faceapi.TinyFaceDetectorOptions({
          inputSize: 416,
          scoreThreshold: 0.5,
        });

        // @ts-ignore
        const dA = await faceapi
          .detectSingleFace(imgA, options)
          .withFaceLandmarks()
          .withFaceDescriptor();

        // @ts-ignore
        const dS = await faceapi
          .detectSingleFace(imgS, options)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!dA || !dS) {
          resultEl.textContent = "❌ Face not detected properly.";
          verifyBtn.disabled = false;
          return;
        }

        const dist = Math.sqrt(
          dA.descriptor.reduce((sum: number, val: number, i: number) => {
            const diff = val - dS.descriptor[i];
            return sum + diff * diff;
          }, 0)
        );

        const threshold = thresholdRange ? Number(thresholdRange.value) : 0.6;
        const similarity = Math.max(0, (1.6 - dist) / 1.6);

        if (similarity > threshold) {
          resultEl.innerHTML = `✅ Face Matched<br/>Distance: ${dist.toFixed(
            4
          )}, Similarity: ${similarity.toFixed(3)}`;
          resultEl.className = "text-green-600 font-semibold mt-3";
          setTimeout(() => setLocation("/seller-dashboard"), 1500);
        } else {
          resultEl.innerHTML = `❌ Face Not Matched<br/>Distance: ${dist.toFixed(
            4
          )}, Similarity: ${similarity.toFixed(3)}`;
          resultEl.className = "text-red-600 font-semibold mt-3";
        }
      } catch (err) {
        console.error(err);
        resultEl.textContent = "Error during verification.";
      } finally {
        verifyBtn.disabled = false;
      }
    }

    verifyBtn?.addEventListener("click", verify);

    if (thresholdRange && thresholdVal) {
      thresholdVal.textContent = Number(thresholdRange.value).toFixed(3);
      thresholdRange.addEventListener("input", () => {
        thresholdVal.textContent = Number(thresholdRange.value).toFixed(3);
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-3xl p-8 shadow-lg bg-white/90 backdrop-blur-md text-center">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-6">
            Aadhaar Face Verification
          </h1>

          <div className="inputs flex flex-wrap justify-center gap-4 mb-4">
            <label className="file-label flex flex-col items-center bg-muted/10 rounded-lg p-4">
              Aadhaar Photo
              <input id="fileAadhaar" type="file" accept="image/*" className="mt-2" />
              <span id="aadhaarName" className="text-sm text-muted-foreground mt-1">
                No file chosen
              </span>
            </label>

            <label className="file-label flex flex-col items-center bg-muted/10 rounded-lg p-4">
              Selfie
              <input id="fileSelfie" type="file" accept="image/*" className="mt-2" />
              <span id="selfieName" className="text-sm text-muted-foreground mt-1">
                No file chosen
              </span>
            </label>
          </div>

          {/* ✅ Fixed canvas layout */}
          <div className="flex justify-center flex-wrap gap-8 mb-6">
            <div className="preview text-center flex flex-col items-center">
              <canvas
                id="canvasAadhaar"
                className="rounded-lg border shadow-sm max-w-[280px] max-h-[220px] object-contain"
                style={{ width: "100%", height: "auto" }}
              ></canvas>
              <div className="caption text-sm text-muted-foreground mt-2">Aadhaar</div>
            </div>

            <div className="preview text-center flex flex-col items-center">
              <canvas
                id="canvasSelfie"
                className="rounded-lg border shadow-sm max-w-[280px] max-h-[220px] object-contain"
                style={{ width: "100%", height: "auto" }}
              ></canvas>
              <div className="caption text-sm text-muted-foreground mt-2">Selfie</div>
            </div>
          </div>

          <div className="options text-sm text-muted-foreground mb-3">
            <label>
              <input id="permissive" type="checkbox" className="mr-2" /> Use permissive detector
            </label>
            <br />
            <label>
              Match threshold: <span id="thresholdVal">0.600</span>
            </label>
            <input
              id="thresholdRange"
              type="range"
              min="0.30"
              max="0.80"
              step="0.01"
              defaultValue="0.60"
              className="w-56"
            />
          </div>

          <button
            id="verifyBtn"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
            disabled
          >
            Verify
          </button>

          <div id="result" className="mt-4 text-base font-medium">
            Loading models...
          </div>

          <p className="note text-sm text-muted-foreground mt-4">
            All processing is local — your data never leaves this device.
          </p>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
