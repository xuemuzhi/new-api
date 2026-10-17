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
import { useTranslation } from 'react-i18next'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { DocSection } from '../components/doc-section'

export function FaqSection() {
  const { t } = useTranslation()

  const items = [
    {
      q: t('401 Unauthorized / invalid API key'),
      a: t(
        'The key is wrong, was deleted, or has expired. Copy it again from the API Keys page and make sure there is no extra whitespace. For Claude Code, use ANTHROPIC_AUTH_TOKEN, not ANTHROPIC_API_KEY.'
      ),
    },
    {
      q: t('Model not found / no available channel'),
      a: t(
        'The model name is not offered by this site or is not enabled for your group. Check the exact name in the Model Square and confirm your key is allowed to use it (key model restrictions are configured when creating the key).'
      ),
    },
    {
      q: t('429 Too Many Requests'),
      a: t(
        'You hit the rate limit for your key or group, or the upstream provider is busy. Wait a moment and retry; long-running agents usually recover on their own.'
      ),
    },
    {
      q: t('403 insufficient quota'),
      a: t(
        'Your balance is used up or the key has reached its spending limit. Top up in the Console → Wallet, or raise the limit on the key.'
      ),
    },
    {
      q: t('Requests hang or time out'),
      a: t(
        'Enable streaming (stream: true) for long generations, and check whether a system proxy or VPN is intercepting the request. The gateway itself does not require a proxy.'
      ),
    },
    {
      q: t('How is usage billed?'),
      a: t(
        'Per token, by model. Each request is logged with its prompt/completion tokens and cost under Console → Usage Logs. The Model Square shows the price per million tokens for every model.'
      ),
    },
  ]

  return (
    <DocSection id='faq' title={t('FAQ')}>
      <Accordion className='w-full'>
        {items.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className='text-left text-sm'>
              {item.q}
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground text-sm leading-relaxed'>
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </DocSection>
  )
}
