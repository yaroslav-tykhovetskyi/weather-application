import WeatherDetailsPanel from "@/components/WeatherDetailsPanel/WeatherDetailsPanel";
import { Suspense } from "react";

export default function WeatherDetailsPage() {
  return (
    <Suspense fallback={<h1>Loading details...</h1>}>
      <WeatherDetailsPanel />
    </Suspense>
  );
}
