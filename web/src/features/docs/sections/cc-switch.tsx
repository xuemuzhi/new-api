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

export function CCSwitchSection({ baseUrl }: SiteInfo) {
  const { t } = useTranslation()

  return (
    <DocSection
      id='cc-switch'
      title='CC Switch'
      description={t(
        'A desktop app that manages multiple providers for Claude Code and Codex and switches between them with one click. This site supports importing a key into CC Switch directly.'
      )}
    >
      <div className='space-y-6'>
        <DocStep step={1} title={t('Install CC Switch')}>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {t('Download the installer for your system from')}{' '}
            <a
              href='https://github.com/farion1231/cc-switch/releases'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              GitHub Releases
            </a>
            {t(' and open it once so the ccswitch:// link handler is registered.')}
          </p>
        </DocStep>

        <DocStep step={2} title={t('Import from the API Keys page')}>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {t('Open')}{' '}
            <Link to='/keys' className='text-primary hover:underline'>
              {t('Console → API Keys')}
            </Link>
            {t(
              ', click the actions menu on a key and choose "CC Switch". Pick the app (Claude / Codex / Gemini) and the models, then confirm; CC Switch opens with the provider pre-filled.'
            )}
          </p>
        </DocStep>

        <DocStep step={3} title={t('Or add the provider manually')}>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {t(
              'In CC Switch choose "Add provider", select custom, and fill in the fields below.'
            )}
          </p>
          <CodeBlock
            title={t('Provider fields')}
            code={[
              `# Claude Code`,
              `Endpoint: ${baseUrl}`,
              `API Key:  sk-xxxxxxxx`,
              ``,
              `# Codex`,
              `Endpoint: ${baseUrl}/v1`,
              `API Key:  sk-xxxxxxxx`,
            ].join('\n')}
          />
        </DocStep>
      </div>

      <DocNote>
        {t(
          'CC Switch writes ~/.claude/settings.json and ~/.codex/config.toml for you. If you also set the environment variables by hand, the environment variables take precedence, so remove them to avoid confusion.'
        )}
      </DocNote>
    </DocSection>
  )
}
