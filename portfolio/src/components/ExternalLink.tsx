import type { ReactNode } from 'react'

type ExternalLinkProps = {
  href: string
  children: ReactNode
  newTabLabel: string
  identity?: boolean
  className?: string
}

export function ExternalLink({
  href,
  children,
  newTabLabel,
  identity = false,
  className = '',
}: ExternalLinkProps) {
  const rel = identity ? 'me noopener noreferrer' : 'noopener noreferrer'

  return (
    <a
      href={href}
      target="_blank"
      rel={rel}
      className={`underline decoration-1 underline-offset-[0.2em] hover:decoration-2 ${className}`}
    >
      {children}
      <span className="sr-only"> ({newTabLabel})</span>
    </a>
  )
}
