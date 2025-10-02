"use client";
import { CountryCode } from "libphonenumber-js";
import { useEffect, useState } from "react";

export default function CountryDetector() {
  const [country, setCountry] = useState<CountryCode | undefined>();

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setCountry(data.country))
      .catch((err) => console.error("Error fetching country:", err));
  }, []);

  return country;
}
