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

import { CodeBlock } from '../components/code-block'
import { DocNote, DocSection, DocStep } from '../components/doc-section'
import type { SiteInfo } from '../hooks/use-site-info'

const PROVIDER_ID = 'gateway'
const DEFAULT_MODEL = 'claude-sonnet-4-5'

export function OpenCodeSection({ baseUrl, siteName }: SiteInfo) {
  const { t } = useTranslation()

  const configJson = JSON.stringify(
    {
      $schema: 'https://opencode.ai/config.json',
      provider: {
        [PROVIDER_ID]: {
          npm: '@ai-sdk/openai-compatible',
          name: siteName,
          options: {
            baseURL: `${baseUrl}/v1`,
            apiKey: 'sk-xxxxxxxx',
          },
          models: {
            [DEFAULT_MODEL]: { name: 'Claude Sonnet 4.5' },
            'gpt-5': { name: 'GPT-5' },
          },
        },
      },
      model: `${PROVIDER_ID}/${DEFAULT_MODEL}`,
    },
    null,
    2
  )

  return (
    <DocSection
      id='opencode'
      title='OpenCode'
      description={t(
        'Open-source terminal coding agent. Declare this site as an OpenAI-compatible provider and list the models you want to use.'
      )}
    >
      <div className='space-y-6'>
        <DocStep step={1} title={t('Install OpenCode')}>
          <CodeBlock
            title='terminal'
            code={[
              '# macOS / Linux',
              'curl -fsSL https://opencode.ai/install | bash',
              '',
              '# or via npm',
              'npm install -g opencode-ai',
            ].join('\n')}
          />
        </DocStep>

        <DocStep step={2} title={t('Write the provider config')}>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {t(
              'Every model you want to appear in the model picker must be listed under models. Model IDs must match the names in the Model Square.'
            )}
          </p>
          <CodeBlock title='~/.config/opencode/opencode.json' code={configJson} />
        </DocStep>

        <DocStep step={3} title={t('Run OpenCode and switch models')}>
          <CodeBlock
            title='terminal'
            code={['cd your-project', 'opencode', '', '# inside OpenCode, press /models to switch'].join('\n')}
          />
        </DocStep>
      </div>

      <DocNote>
        {t(
          'You can also keep the key out of the file: remove apiKey from options and export OPENAI_API_KEY in your shell; the openai-compatible provider reads it automatically.'
        )}
      </DocNote>
    </DocSection>
  )
}
