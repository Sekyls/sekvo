"use client";
import { ButtonGroup } from "@/components/ui/button-group";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useCalcSummary from "@/hooks/use-calculation-summary";
import { Repeat } from "lucide-react";

export default function CalculationSummary() {
  const { CALCULATION_EXTRAS, SWITCH_ITEMS } = useCalcSummary();

  return (
    <FieldGroup>
      <ButtonGroup className="flex flex-row gap-5 justify-between w-full max-w-sm">
        {SWITCH_ITEMS.map((item) => {
          return (
            <div className="flex items-center space-x-2" key={item.id}>
              <Switch
                id={item.id}
                onClick={() => {
                  item.setState(!item.state);
                }}
                className="shadow-md shadow-foreground/40"
              />
              <Label htmlFor={item.id} className="mt-0.5">
                {item.label}
              </Label>
            </div>
          );
        })}
      </ButtonGroup>
      <FieldGroup className="max-w-sm">
        {CALCULATION_EXTRAS.map((item) => {
          return (
            <>
              {item.isChecked && (
                <div
                  className="grid grid-cols-[0.5fr_2fr] justify-between gap-5"
                  key={item.id}
                >
                  <Label>{item.label}</Label>
                  <InputGroup className="gap-2 invoice-bg-light">
                    <Input
                      placeholder={item.placeholder}
                      className="border-0 border-l"
                    />
                    {item.hasToggle && (
                      <InputGroupAddon align="inline-start">
                        <Repeat className="text-amber-600 hover:cursor-default hover:scale-110 hover:text-green-800 hover:rotate-180 transition-all duration-300 ease-in-out" />
                      </InputGroupAddon>
                    )}
                  </InputGroup>
                </div>
              )}
            </>
          );
        })}
      </FieldGroup>
      <div className="flex justify-between gap-5 font-bold border-t border-b py-2">
        <p>Total Amount</p>
        <p className="text-imperial-red">EUR 10</p>
      </div>
    </FieldGroup>
  );
}
