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

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { CodeBlock } from '../components/code-block'
import { DocNote, DocSection, DocStep } from '../components/doc-section'
import type { SiteInfo } from '../hooks/use-site-info'

const CODEX_MODEL = 'gpt-5-codex'
const PROVIDER_ID = 'gateway'

export function CodexSection({ baseUrl, siteName }: SiteInfo) {
  const { t } = useTranslation()

  const configToml = [
    `model_provider = "${PROVIDER_ID}"`,
    `model = "${CODEX_MODEL}"`,
    `model_reasoning_effort = "high"`,
    ``,
    `[model_providers.${PROVIDER_ID}]`,
    `name = "${siteName}"`,
    `base_url = "${baseUrl}/v1"`,
    `wire_api = "responses"`,
    `env_key = "GATEWAY_API_KEY"`,
  ].join('\n')

  return (
    <DocSection
      id='codex'
      title='Codex CLI'
      description={t(
        "OpenAI's terminal coding agent. Register this site as a custom model provider in its config file."
      )}
    >
      <div className='space-y-6'>
        <DocStep step={1} title={t('Install Codex')}>
          <CodeBlock title='npm' code='npm install -g @openai/codex' />
        </DocStep>

        <DocStep step={2} title={t('Add this site as a provider')}>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {t(
              'Create or edit the file below. The wire_api = "responses" line makes Codex talk to the /v1/responses endpoint, which this gateway supports.'
            )}
          </p>
          <CodeBlock title='~/.codex/config.toml' code={configToml} />
        </DocStep>

        <DocStep step={3} title={t('Provide the API key')}>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {t(
              'Codex reads the key from the environment variable named by env_key. Set it in your shell profile.'
            )}
          </p>
          <Tabs defaultValue='unix'>
            <TabsList>
              <TabsTrigger value='unix'>macOS / Linux</TabsTrigger>
              <TabsTrigger value='windows'>Windows</TabsTrigger>
            </TabsList>
            <TabsContent value='unix'>
              <CodeBlock
                title='~/.zshrc / ~/.bashrc'
                code='export GATEWAY_API_KEY="sk-xxxxxxxx"'
              />
            </TabsContent>
            <TabsContent value='windows'>
              <CodeBlock
                title='PowerShell'
                code={[
                  `$env:GATEWAY_API_KEY = "sk-xxxxxxxx"`,
                  `setx GATEWAY_API_KEY "sk-xxxxxxxx"`,
                ].join('\n')}
              />
            </TabsContent>
          </Tabs>
        </DocStep>

        <DocStep step={4} title={t('Run Codex')}>
          <CodeBlock title='terminal' code={['cd your-project', 'codex'].join('\n')} />
        </DocStep>
      </div>

      <DocNote>
        {t(
          'If you see "unauthorized" or Codex prompts for ChatGPT login, run codex logout and make sure model_provider in config.toml matches the provider section name.'
        )}
      </DocNote>
    </DocSection>
  )
}
