type ScreenshotSlotProps = {
  label: string
}

export function ScreenshotSlot({ label }: ScreenshotSlotProps) {
  return (
    <figure className="border border-dashed border-line bg-paper">
      {/* TODO: replace this placeholder with a real screenshot. */}
      <div className="flex aspect-[16/10] items-center justify-center p-6 text-center">
        <figcaption className="max-w-[16rem] text-sm leading-6 text-muted">{label}</figcaption>
      </div>
    </figure>
  )
}
