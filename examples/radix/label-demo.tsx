import { Checkbox } from "@/styles/v4/radix-nova/ui/checkbox"
import { Label } from "@/styles/v4/radix-nova/ui/label"

export default function LabelDemo() {
  return (
    <div className="flex gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}
