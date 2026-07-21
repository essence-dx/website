import { Badge } from "@/styles/v4/radix-nova/ui/badge"
import { Field, FieldLabel } from "@/styles/v4/radix-nova/ui/field"
import { Input } from "@/styles/v4/radix-nova/ui/input"

export function InputBadge() {
  return (
    <Field>
      <FieldLabel htmlFor="input-badge">
        Webhook URL{" "}
        <Badge variant="secondary" className="ml-auto">
          Beta
        </Badge>
      </FieldLabel>
      <Input
        id="input-badge"
        type="url"
        placeholder="https://api.example.com/webhook"
      />
    </Field>
  )
}
