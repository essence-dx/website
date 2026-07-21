import { Calendar } from "@/styles/v4/radix-nova/ui/calendar"
import { Card, CardContent } from "@/styles/v4/radix-nova/ui/card"

export function CalendarMultiple() {
  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar mode="multiple" />
      </CardContent>
    </Card>
  )
}
