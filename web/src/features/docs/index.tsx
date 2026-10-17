/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import {
  ArrowRightLeft,
  BookOpen,
  Code2,
  HelpCircle,
  Rocket,
  SquareTerminal,
  Terminal,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PublicLayout } from '@/components/layout'
import { cn } from '@/lib/utils'

import { useSiteInfo } from './hooks/use-site-info'
import { ApiSection } from './sections/api'
import { CCSwitchSection } from './sections/cc-switch'
import { ClaudeCodeSection } from './sections/claude-code'
import { CodexSection } from './sections/codex'
import { FaqSection } from './sections/faq'
import { OpenCodeSection } from './sections/opencode'
import { QuickStartSection } from './sections/quick-start'

export function Docs() {
  const { t } = useTranslation()
  const site = useSiteInfo()
  const [activeId, setActiveId] = useState('quick-start')

  const toc = [
    { id: 'quick-start', title: t('Quick Start'), icon: Rocket },
    { id: 'claude-code', title: 'Claude Code', icon: Terminal },
    { id: 'codex', title: 'Codex CLI', icon: SquareTerminal },
    { id: 'opencode', title: 'OpenCode', icon: BookOpen },
    { id: 'cc-switch', title: 'CC Switch', icon: ArrowRightLeft },
    { id: 'api', title: t('API & SDKs'), icon: Code2 },
    { id: 'faq', title: t('FAQ'), icon: HelpCircle },
  ]

  useEffect(() => {
    const sections = toc
      .map((item) => document.querySelector<HTMLElement>(`#${item.id}`))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0 }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // toc only changes with language; ids are stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PublicLayout>
      <div className='mx-auto max-w-6xl'>
        {/* Page header */}
        <div className='border-border/40 mb-10 border-b pb-8'>
          <p className='text-muted-foreground mb-2 text-xs font-medium tracking-widest uppercase'>
            {t('Documentation')}
          </p>
          <h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
            {t('Connect your tools to {{siteName}}', {
              siteName: site.siteName,
            })}
          </h1>
          <p className='text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed md:text-base'>
            {t(
              'Step-by-step setup for Claude Code, Codex, OpenCode, CC Switch and any OpenAI / Anthropic compatible SDK. Every example below already uses this site\'s address.'
            )}
          </p>
        </div>

        <div className='grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14'>
          {/* Table of contents */}
          <aside className='lg:sticky lg:top-24 lg:self-start'>
            <nav
              aria-label={t('On this page')}
              className='-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0'
            >
              {toc.map((item) => {
                const Icon = item.icon
                const active = activeId === item.id
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      'flex shrink-0 items-center gap-2 rounded-md px-2.5 py-1.5 text-sm whitespace-nowrap transition-colors',
                      active
                        ? 'bg-muted text-foreground font-medium'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                    )}
                  >
                    <Icon className='size-4 shrink-0' strokeWidth={1.75} />
                    {item.title}
                  </a>
                )
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className='min-w-0 space-y-16 pb-24'>
            <QuickStartSection {...site} />
            <ClaudeCodeSection {...site} />
            <CodexSection {...site} />
            <OpenCodeSection {...site} />
            <CCSwitchSection {...site} />
            <ApiSection {...site} />
            <FaqSection />
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
