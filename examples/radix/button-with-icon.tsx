import { IconGitBranch } from "@tabler/icons-react"

import { Button } from "@/styles/v4/radix-nova/ui/button"

export default function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <IconGitBranch /> New Branch
    </Button>
  )
}
