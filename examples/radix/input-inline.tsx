import { Button } from "@/styles/v4/radix-nova/ui/button"
import { Field } from "@/styles/v4/radix-nova/ui/field"
import { Input } from "@/styles/v4/radix-nova/ui/input"

export function InputInline() {
  return (
    <Field orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>
  )
}
