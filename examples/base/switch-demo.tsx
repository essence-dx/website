import { Label } from "@/styles/v4/base-nova/ui/label"
import { Switch } from "@/styles/v4/base-nova/ui/switch"

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
