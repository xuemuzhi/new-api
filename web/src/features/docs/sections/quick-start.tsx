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
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { CodeBlock } from '../components/code-block'
import { DocNote, DocSection, DocStep } from '../components/doc-section'
import type { SiteInfo } from '../hooks/use-site-info'

export function QuickStartSection({ baseUrl }: SiteInfo) {
  const { t } = useTranslation()

  return (
    <DocSection
      id='quick-start'
      title={t('Quick Start')}
      description={t(
        'Three steps to connect any OpenAI or Anthropic compatible tool to this site.'
      )}
    >
      <div className='space-y-6'>
        <DocStep step={1} title={t('Sign up and create an API key')}>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {t('Go to')}{' '}
            <Link to='/keys' className='text-primary hover:underline'>
              {t('Console → API Keys')}
            </Link>
            {t(
              ', click "Create", and copy the key that starts with sk-. Keep it private; anyone holding it can spend your balance.'
            )}
          </p>
        </DocStep>

        <DocStep step={2} title={t('Point your tool to this site')}>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {t(
              'Replace the default OpenAI / Anthropic address with the address below. Both API styles are served from the same host.'
            )}
          </p>
          <CodeBlock
            title={t('API Base URL')}
            code={[
              `# OpenAI compatible (Chat Completions / Responses)`,
              `${baseUrl}/v1`,
              ``,
              `# Anthropic compatible (Messages)`,
              `${baseUrl}`,
            ].join('\n')}
          />
        </DocStep>

        <DocStep step={3} title={t('Pick a model and send a request')}>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {t('Browse available models and prices on the')}{' '}
            <Link to='/pricing' className='text-primary hover:underline'>
              {t('Model Square')}
            </Link>
            {t('. Use the model name exactly as listed there.')}
          </p>
          <CodeBlock
            title='curl'
            code={[
              `curl ${baseUrl}/v1/chat/completions \\`,
              `  -H "Content-Type: application/json" \\`,
              `  -H "Authorization: Bearer sk-xxxxxxxx" \\`,
              `  -d '{`,
              `    "model": "gpt-4o",`,
              `    "messages": [{"role": "user", "content": "Hello"}]`,
              `  }'`,
            ].join('\n')}
          />
        </DocStep>
      </div>

      <DocNote>
        {t(
          'Replace sk-xxxxxxxx in every example on this page with your own key. Model names in examples are placeholders; use the ones shown in the Model Square.'
        )}
      </DocNote>
    </DocSection>
  )
}
