import { Button } from "@/styles/v4/base-nova/ui/button"
import { ButtonGroup } from "@/styles/v4/base-nova/ui/button-group"
import { Field, FieldLabel } from "@/styles/v4/base-nova/ui/field"
import { Input } from "@/styles/v4/base-nova/ui/input"

export function InputButtonGroup() {
  return (
    <Field>
      <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
      <ButtonGroup>
        <Input id="input-button-group" placeholder="Type to search..." />
        <Button variant="outline">Search</Button>
      </ButtonGroup>
    </Field>
  )
}
