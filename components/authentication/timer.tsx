"use client";
import { getFormattedCountDown } from "@/lib/miscellany/utils";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Hourglass, RefreshCcw } from "lucide-react";

export default function Timer({
  duration,
  onclick,
  disabled,
}: {
  duration: number;
  onclick: () => void;
  disabled: boolean;
}) {
  const [countDown, setCountDown] = useState<number>(duration);
  const [countDownComplete, setCountDownComplete] = useState<boolean>(false);
  useEffect(() => {
    if (countDown <= 0) {
      setCountDownComplete(true);
      return;
    }
    const timer = setTimeout(() => {
      setCountDown(countDown - 1000);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [countDown]);
  return (
    <>
      {!countDownComplete && (
        <div className="flex w-fit items-center overflow-hidden text-accent font-semibold">
          <Hourglass className="size-4 text-green-500 animate-spin mr-2" />
          {getFormattedCountDown(countDown)}
        </div>
      )}

      {countDownComplete && (
        <Button
          disabled={disabled}
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={onclick}
        >
          <RefreshCcw className={`${disabled ? "animate-spin" : null}`} />{" "}
          Resend OTP
        </Button>
      )}
    </>
  );
}
