"use client";

import { InterviewBooking } from "@/components/interview-booking";

export default function EntretienPage() {
  const isDev = process.env.NODE_ENV === "development";

  return <InterviewBooking previewMode={isDev} showSuccessBanner />;
}
