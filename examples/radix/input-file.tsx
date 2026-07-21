import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/v4/radix-nova/ui/field"
import { Input } from "@/styles/v4/radix-nova/ui/input"

export function InputFile() {
  return (
    <Field>
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  )
}
