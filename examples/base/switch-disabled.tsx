import { Field, FieldLabel } from "@/styles/v4/base-nova/ui/field"
import { Switch } from "@/styles/v4/base-nova/ui/switch"

export function SwitchDisabled() {
  return (
    <Field orientation="horizontal" data-disabled className="w-fit">
      <Switch id="switch-disabled-unchecked" disabled />
      <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
    </Field>
  )
}
