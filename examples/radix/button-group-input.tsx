import { SearchIcon } from "lucide-react"

import { Button } from "@/styles/v4/radix-nova/ui/button"
import { ButtonGroup } from "@/styles/v4/radix-nova/ui/button-group"
import { Input } from "@/styles/v4/radix-nova/ui/input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
