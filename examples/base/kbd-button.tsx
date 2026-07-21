import { Button } from "@/styles/v4/base-nova/ui/button"
import { Kbd } from "@/styles/v4/base-nova/ui/kbd"

export default function KbdButton() {
  return (
    <Button variant="outline">
      Accept{" "}
      <Kbd data-icon="inline-end" className="translate-x-0.5">
        ⏎
      </Kbd>
    </Button>
  )
}
