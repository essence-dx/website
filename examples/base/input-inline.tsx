import { Button } from "@/styles/v4/base-nova/ui/button"
import { Field } from "@/styles/v4/base-nova/ui/field"
import { Input } from "@/styles/v4/base-nova/ui/input"

export function InputInline() {
  return (
    <Field orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>
  )
}
