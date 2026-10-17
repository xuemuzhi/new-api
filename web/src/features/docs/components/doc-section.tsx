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
import type { ReactNode } from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'

interface DocSectionProps {
  id: string
  title: string
  description?: string
  children: ReactNode
}

export function DocSection({
  id,
  title,
  description,
  children,
}: DocSectionProps) {
  return (
    <section id={id} className='scroll-mt-24 space-y-5'>
      <div className='space-y-1.5'>
        <h2 className='text-xl font-semibold tracking-tight md:text-2xl'>
          {title}
        </h2>
        {description && (
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}

interface DocStepProps {
  step: number
  title: string
  children?: ReactNode
}

export function DocStep({ step, title, children }: DocStepProps) {
  return (
    <div className='flex gap-3'>
      <div className='bg-primary text-primary-foreground mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold'>
        {step}
      </div>
      <div className='min-w-0 flex-1 space-y-2.5'>
        <p className='text-sm leading-6 font-medium'>{title}</p>
        {children}
      </div>
    </div>
  )
}

export function DocNote({ children }: { children: ReactNode }) {
  return (
    <Alert className='border-blue-500/25 bg-blue-500/5 dark:border-blue-400/25 dark:bg-blue-400/5'>
      <AlertDescription className='text-foreground/80 text-sm leading-relaxed'>
        {children}
      </AlertDescription>
    </Alert>
  )
}
