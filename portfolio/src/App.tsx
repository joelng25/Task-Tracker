import { useEffect, useState } from 'react'
import { copy, languageOptions, links, skillsList, type Lang } from './content'
import { ExternalLink } from './components/ExternalLink'
import { ScreenshotSlot } from './components/ScreenshotSlot'

const sections = ['work', 'open-source', 'about', 'contact'] as const

function readLang(): Lang {
  const fromDom = document.documentElement.lang
  if (fromDom === 'ca' || fromDom === 'es' || fromDom === 'en') return fromDom
  return 'en'
}

function readTheme(): 'light' | 'dark' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function hasStoredTheme() {
  try {
    const stored = localStorage.getItem('theme')
    return stored === 'light' || stored === 'dark'
  } catch {
    return false
  }
}

function Icon({ theme }: { theme: 'light' | 'dark' }) {
  if (theme === 'dark') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4 19 19M19 5l-1.6 1.6M6.6 17.4 5 19" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M16.5 14.2A6.2 6.2 0 0 1 9.8 7.5 6.3 6.3 0 1 0 16.5 14.2Z" strokeLinejoin="round" />
    </svg>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>(readLang)
  const [theme, setTheme] = useState<'light' | 'dark'>(readTheme)
  const [themeChosen, setThemeChosen] = useState(hasStoredTheme)
  const [active, setActive] = useState<(typeof sections)[number] | null>(null)
  const text = copy[lang]
  const themeLabel = theme === 'dark' ? text.themeToLight : text.themeToDark

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = text.metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', text.metaDescription)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', text.metaTitle)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', text.metaDescription)
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // Preference stays for this visit when storage is blocked.
    }
  }, [lang, text])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#141210' : '#f3efe6')
    if (!themeChosen) return
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Preference stays for this visit when storage is blocked.
    }
  }, [theme, themeChosen])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      if (!themeChosen) setTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [themeChosen])

  useEffect(() => {
    const nodes = sections
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const id = visible?.target.id
        if (id === 'work' || id === 'open-source' || id === 'about' || id === 'contact') {
          setActive(id)
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.15, 0.4, 0.7] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const nav = [
    { id: 'work' as const, label: text.nav.work },
    { id: 'open-source' as const, label: text.nav.openSource },
    { id: 'about' as const, label: text.nav.about },
    { id: 'contact' as const, label: text.nav.contact },
  ]

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        {text.skip}
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-paper">
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-5 py-3 sm:flex sm:px-8">
          <a href="#top" className="col-start-1 row-start-1 font-serif text-lg leading-none text-ink no-underline sm:order-1">
            Joel Novio García
          </a>

          <nav aria-label="Primary" className="col-span-2 row-start-2 flex flex-wrap gap-x-4 gap-y-1 text-sm sm:order-2 sm:w-auto sm:flex-1">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`no-underline underline-offset-4 hover:underline ${active === item.id ? 'text-ink underline' : 'text-muted'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="col-start-2 row-start-1 flex items-center justify-self-end gap-2 sm:order-3 sm:ml-auto">
            <div role="group" aria-label={text.languageLabel} className="flex border border-line">
              {languageOptions.map((option) => {
                const selected = lang === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    aria-label={option.name}
                    onClick={() => setLang(option.id)}
                    className={`min-h-11 min-w-11 px-2 text-sm ${selected ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-line/40'}`}
                  >
                    {option.short}
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line text-ink hover:bg-line/40"
              aria-pressed={theme === 'dark'}
              aria-label={themeLabel}
              onClick={() => {
                setThemeChosen(true)
                setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
              }}
            >
              <Icon theme={theme} />
            </button>
          </div>
        </div>
      </header>

      <main id="content">
        <section id="top" className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-mark">{text.kicker}</p>
          <p className="mt-3 text-sm text-muted">{text.place}</p>
          <h1 className="mt-8 max-w-3xl font-serif text-5xl leading-[0.95] font-medium tracking-tight sm:text-7xl">
            Joel Novio García
          </h1>
          <p className="mt-6 inline-block border border-ink px-3 py-1 text-sm">{text.availability}</p>
          <p className="mt-8 max-w-2xl text-lg leading-8">{text.lede}</p>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-base">
            <a className="underline decoration-1 underline-offset-[0.2em]" href={`mailto:${links.email}`}>
              {text.emailCta}
            </a>
            <ExternalLink href={links.github} newTabLabel={text.newTab} identity>
              {text.githubCta}
            </ExternalLink>
          </p>
        </section>

        <section id="work" aria-labelledby="work-title" className="mx-auto max-w-5xl scroll-mt-36 px-5 py-8 sm:px-8">
          <h2 id="work-title" className="font-serif text-3xl font-medium sm:text-4xl">
            {text.workTitle}
          </h2>
          <ol className="mt-10 flex list-none flex-col gap-16 p-0">
            {text.projects.map((project, index) => (
              <li key={project.title}>
                <article className="grid items-start gap-6 md:grid-cols-12">
                  <div className="md:col-span-5">
                    <ScreenshotSlot label={project.screenshot} />
                  </div>
                  <div className="md:col-span-7">
                    <p className="font-serif text-sm text-mark">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 font-serif text-3xl font-medium">{project.title}</h3>
                    <p className="mt-4 max-w-xl leading-7">{project.summary}</p>
                    {project.note ? <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{project.note}</p> : null}
                    <ul aria-label={text.stackLabel} className="mt-4 flex list-none flex-wrap gap-x-2 gap-y-1 p-0 text-sm text-muted">
                      {project.stack.map((item) => (
                        <li key={item} className="after:ml-2 after:content-['·'] last:after:content-none">
                          {item}
                        </li>
                      ))}
                    </ul>
                    {project.repo || project.live ? (
                      <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                        {project.repo ? (
                          <ExternalLink href={project.repo} newTabLabel={text.newTab}>
                            {text.code}
                          </ExternalLink>
                        ) : null}
                        {project.live ? (
                          <ExternalLink href={project.live} newTabLabel={text.newTab}>
                            {text.live}
                          </ExternalLink>
                        ) : null}
                      </p>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section id="open-source" aria-labelledby="oss-title" className="mx-auto max-w-5xl scroll-mt-36 px-5 py-16 sm:px-8">
          <h2 id="oss-title" className="font-serif text-3xl font-medium sm:text-4xl">
            {text.openSourceTitle}
          </h2>
          <div className="mt-8 grid gap-px border border-line bg-line md:grid-cols-2">
            {text.openSource.map((item) => (
              <article key={item.title} className="bg-paper p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-medium">{item.title}</h3>
                <p className="mt-4 leading-7">{item.summary}</p>
                <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {item.links.map((link) => (
                    <ExternalLink key={link.href} href={link.href} newTabLabel={text.newTab}>
                      {link.label}
                    </ExternalLink>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" aria-labelledby="about-title" className="mx-auto max-w-5xl scroll-mt-36 px-5 py-8 sm:px-8">
          <h2 id="about-title" className="font-serif text-3xl font-medium sm:text-4xl">
            {text.aboutTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8">{text.aboutBody}</p>

          <h3 className="mt-12 font-serif text-2xl font-medium">{text.skillsTitle}</h3>
          <ul className="mt-4 flex max-w-3xl list-none flex-wrap gap-2 p-0">
            {skillsList.map((skill) => (
              <li key={skill} className="border border-line px-3 py-2 text-sm">
                {skill}
              </li>
            ))}
          </ul>

          <h3 className="mt-12 font-serif text-2xl font-medium">{text.languagesTitle}</h3>
          <dl className="mt-4 max-w-md">
            {text.languages.map((language) => (
              <div key={language.name} className="flex items-baseline justify-between gap-6 border-b border-line py-3">
                <dt>{language.name}</dt>
                <dd className="text-muted">{language.level}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="mx-auto min-h-[calc(100svh-9rem)] max-w-5xl scroll-mt-36 px-5 py-16 sm:px-8">
          <h2 id="contact-title" className="font-serif text-3xl font-medium sm:text-4xl">
            {text.contactTitle}
          </h2>
          <p className="mt-4 text-muted">{text.contactBody}</p>
          <address className="mt-8 flex flex-col gap-4 not-italic text-lg">
            <a className="w-fit underline decoration-1 underline-offset-[0.2em] break-all" href={`mailto:${links.email}`}>
              {links.email}
            </a>
            <ExternalLink href={links.github} newTabLabel={text.newTab} identity className="w-fit">
              {links.githubLabel}
            </ExternalLink>
            <ExternalLink href={links.linkedin} newTabLabel={text.newTab} identity className="w-fit">
              {links.linkedinLabel}
            </ExternalLink>
          </address>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl px-5 py-8 text-sm text-muted sm:px-8">
          <p>{text.footer}</p>
        </div>
      </footer>
    </>
  )
}
