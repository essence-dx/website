import { Field, FieldLabel } from "@/styles/v4/radix-nova/ui/field"
import { Switch } from "@/styles/v4/radix-nova/ui/switch"

export default function FieldSwitch() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
      <Switch id="2fa" />
    </Field>
  )
}
