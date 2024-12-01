import WeatherDetailsPanel from "@/components/WeatherDetailsPanel/WeatherDetailsPanel";
import { Suspense } from "react";

export default function WeatherDetailsPage() {
  return (
    <Suspense>
      <WeatherDetailsPanel />
    </Suspense>
  );
}
