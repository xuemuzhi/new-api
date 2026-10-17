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
import { Check, Copy } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  title?: string
  className?: string
}

export function CodeBlock({ code, title, className }: CodeBlockProps) {
  const { t } = useTranslation()
  const { copiedText, copyToClipboard } = useCopyToClipboard({
    notify: false,
  })
  const copied = copiedText === code

  return (
    <div
      className={cn(
        'border-border/60 bg-muted/40 overflow-hidden rounded-lg border',
        className
      )}
    >
      <div className='border-border/60 flex h-9 items-center justify-between border-b px-3'>
        <span className='text-muted-foreground font-mono text-xs'>
          {title ?? ''}
        </span>
        <Button
          variant='ghost'
          size='sm'
          className='text-muted-foreground hover:text-foreground h-7 gap-1.5 px-2 text-xs'
          onClick={() => copyToClipboard(code)}
          aria-label={t('Copy')}
        >
          {copied ? (
            <Check className='size-3.5 text-emerald-500' />
          ) : (
            <Copy className='size-3.5' />
          )}
          {copied ? t('Copied') : t('Copy')}
        </Button>
      </div>
      <pre className='overflow-x-auto p-4 font-mono text-[13px] leading-relaxed'>
        <code>{code}</code>
      </pre>
    </div>
  )
}
