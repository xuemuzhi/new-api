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

const CLAUDE_MODEL = 'claude-sonnet-4-5'
const CLAUDE_HAIKU_MODEL = 'claude-haiku-4-5'

export function ClaudeCodeSection({ baseUrl }: SiteInfo) {
  const { t } = useTranslation()

  const settingsJson = JSON.stringify(
    {
      env: {
        ANTHROPIC_BASE_URL: baseUrl,
        ANTHROPIC_AUTH_TOKEN: 'sk-xxxxxxxx',
        ANTHROPIC_MODEL: CLAUDE_MODEL,
        ANTHROPIC_DEFAULT_HAIKU_MODEL: CLAUDE_HAIKU_MODEL,
      },
    },
    null,
    2
  )

  return (
    <DocSection
      id='claude-code'
      title='Claude Code'
      description={t(
        "Anthropic's official terminal agent. Point it at this site with two environment variables; no code changes needed."
      )}
    >
      <div className='space-y-6'>
        <DocStep step={1} title={t('Install Claude Code')}>
          <CodeBlock
            title='npm'
            code='npm install -g @anthropic-ai/claude-code'
          />
        </DocStep>

        <DocStep step={2} title={t('Configure the endpoint and key')}>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {t(
              'Recommended: write the settings file once so every project picks it up. Alternatively export environment variables in your shell.'
            )}
          </p>
          <Tabs defaultValue='settings'>
            <TabsList>
              <TabsTrigger value='settings'>
                {t('Settings file (recommended)')}
              </TabsTrigger>
              <TabsTrigger value='unix'>macOS / Linux</TabsTrigger>
              <TabsTrigger value='windows'>Windows</TabsTrigger>
            </TabsList>
            <TabsContent value='settings'>
              <CodeBlock title='~/.claude/settings.json' code={settingsJson} />
            </TabsContent>
            <TabsContent value='unix'>
              <CodeBlock
                title='~/.zshrc / ~/.bashrc'
                code={[
                  `export ANTHROPIC_BASE_URL="${baseUrl}"`,
                  `export ANTHROPIC_AUTH_TOKEN="sk-xxxxxxxx"`,
                  `export ANTHROPIC_MODEL="${CLAUDE_MODEL}"`,
                ].join('\n')}
              />
            </TabsContent>
            <TabsContent value='windows'>
              <CodeBlock
                title='PowerShell'
                code={[
                  `# Current session only`,
                  `$env:ANTHROPIC_BASE_URL = "${baseUrl}"`,
                  `$env:ANTHROPIC_AUTH_TOKEN = "sk-xxxxxxxx"`,
                  `$env:ANTHROPIC_MODEL = "${CLAUDE_MODEL}"`,
                  ``,
                  `# Persist for the current user (reopen the terminal afterwards)`,
                  `setx ANTHROPIC_BASE_URL "${baseUrl}"`,
                  `setx ANTHROPIC_AUTH_TOKEN "sk-xxxxxxxx"`,
                  `setx ANTHROPIC_MODEL "${CLAUDE_MODEL}"`,
                ].join('\n')}
              />
            </TabsContent>
          </Tabs>
        </DocStep>

        <DocStep step={3} title={t('Start Claude Code')}>
          <CodeBlock
            title='terminal'
            code={['cd your-project', 'claude'].join('\n')}
          />
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {t(
              'If Claude Code asks you to log in, choose the API key option or press Esc; with ANTHROPIC_AUTH_TOKEN set it does not need an Anthropic account.'
            )}
          </p>
        </DocStep>
      </div>

      <DocNote>
        {t(
          'Use ANTHROPIC_AUTH_TOKEN rather than ANTHROPIC_API_KEY: the former is sent as a Bearer token, which is what this gateway expects. If you previously logged in with an Anthropic account, run /logout inside Claude Code first.'
        )}
      </DocNote>
    </DocSection>
  )
}
