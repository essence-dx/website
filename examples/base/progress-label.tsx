import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/styles/v4/base-nova/ui/progress"

export function ProgressWithLabel() {
  return (
    <Progress value={56} className="w-full max-w-sm">
      <ProgressLabel>Upload progress</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}
