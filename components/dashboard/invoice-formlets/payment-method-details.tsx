import { Binary, Ellipsis, Link, ShieldUser, Split } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";

export default function PaymentMethodDetails({
  showAccountName = false,
  showAccountNumber = false,
  showBranch = false,
  showGateway = false,
  showOthers = false,
}: {
  showAccountName?: boolean;
  showAccountNumber?: boolean;
  showBranch?: boolean;
  showGateway?: boolean;
  showOthers?: boolean;
}) {
  return (
    <div className="flex gap-6">
      <Field className={showAccountName ? "max-w-sm" : "hidden"}>
        <Label>Account Name</Label>
        <InputGroup className="invoice-bg-light">
          <InputGroupInput type="text" placeholder="e.g. Sekvo Ventures" />
          <InputGroupAddon className="border-r pr-2">
            <ShieldUser />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field className={showAccountNumber ? "max-w-sm" : "hidden"}>
        <Label>Account Number</Label>
        <InputGroup className="invoice-bg-light">
          <InputGroupInput type="number" placeholder="e.g. 0547561490" />
          <InputGroupAddon className="border-r pr-2">
            <Binary />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field className={showBranch ? "max-w-sm" : "hidden"}>
        <Label>Branch</Label>
        <InputGroup className="invoice-bg-light">
          <InputGroupInput type="text" placeholder="enter your bank branch" />
          <InputGroupAddon className="border-r pr-2">
            <Split />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field className={showGateway ? "max-w-sm" : "hidden"}>
        <InputGroup className="invoice-bg-light">
          <InputGroupInput
            type="url"
            placeholder="enter link to payment gateway"
          />
          <InputGroupAddon className="border-r pr-2">
            <Link />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field className={showOthers ? "max-w-sm" : "hidden"}>
        <InputGroup className="invoice-bg-light">
          <InputGroupInput type="text" placeholder="specify others..." />
          <InputGroupAddon className="border-r pr-2">
            <Ellipsis />
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
}
