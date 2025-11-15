"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FieldNames } from "@/lib/miscellany/types";
import usePaymentMethod from "@/hooks/use-payment-method";

export default function PaymentMethods() {
  const { PAYMENT_METHODS, control, setValue } = usePaymentMethod();
  return (
    <FieldSet className="gap-0 space-y-5">
      <Popover>
        <Label className="max-w-sm mb-2">
          Payment Method<span className="text-imperial-red font-black">*</span>
        </Label>
        <PopoverTrigger
          asChild
          className="max-w-sm flex bg-transparent items-center gap-x-1 text-foreground invoice-bg-light hover:bg-transparent justify-between"
        >
          <Button>
            <span className="block">Select</span> <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="space-y-2">
          {PAYMENT_METHODS.map((item, index) => {
            return (
              <Field orientation="horizontal" key={index}>
                <Checkbox
                  checked={item.state}
                  onCheckedChange={() => {
                    setValue(item.checked as FieldNames, !item.state);
                    item.setState(!item.state);
                  }}
                />
                <FieldLabel
                  htmlFor={item.inputFieldLabel}
                  className="font-normal flex items-center"
                >
                  {item.inputFieldLabel}
                </FieldLabel>
              </Field>
            );
          })}
        </PopoverContent>
      </Popover>
      <FieldGroup className="space-y-5">
        {PAYMENT_METHODS.map((method, index) => {
          return (
            method.showInput &&
            method.state && (
              <section key={index} className="space-y-2">
                <FieldLabel>
                  {method.inputFieldLabel}
                  <Image src={method.icon} alt="" width={24} height={24} />
                </FieldLabel>
                <div className="flex gap-x-5">
                  {method.inputFields &&
                    method.inputFields.map((input, index) => {
                      return (
                        <Controller
                          key={index}
                          name={input.name as FieldNames}
                          control={control}
                          render={({ field, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="max-w-sm"
                            >
                              {input.label && (
                                <FieldLabel htmlFor={input.name}>
                                  {input.label}
                                  <span className="text-imperial-red font-black">
                                    *
                                  </span>
                                </FieldLabel>
                              )}

                              <InputGroup className="invoice-bg-light">
                                <InputGroupInput
                                  {...field}
                                  value={(field.value as string) ?? ""}
                                  id={input.name}
                                  aria-invalid={fieldState.invalid}
                                  autoComplete="on"
                                  type={input.type}
                                  placeholder={input.placeholder}
                                />
                                <InputGroupAddon className="border-r pr-2">
                                  {input.icon}
                                </InputGroupAddon>
                              </InputGroup>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      );
                    })}
                </div>
              </section>
            )
          );
        })}
      </FieldGroup>
    </FieldSet>
  );
}
