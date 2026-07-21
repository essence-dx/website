export const dynamic = "force-static"
export const revalidate = false

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">shadcn/ui</h1>
      <p className="mt-4 text-muted-foreground">Components. Copy. Paste.</p>
    </div>
  )
}