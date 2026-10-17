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
import { DocNote, DocSection } from '../components/doc-section'
import type { SiteInfo } from '../hooks/use-site-info'

export function ApiSection({ baseUrl }: SiteInfo) {
  const { t } = useTranslation()

  const pythonOpenAI = [
    `from openai import OpenAI`,
    ``,
    `client = OpenAI(`,
    `    base_url="${baseUrl}/v1",`,
    `    api_key="sk-xxxxxxxx",`,
    `)`,
    ``,
    `resp = client.chat.completions.create(`,
    `    model="gpt-4o",`,
    `    messages=[{"role": "user", "content": "Hello"}],`,
    `)`,
    `print(resp.choices[0].message.content)`,
  ].join('\n')

  const nodeOpenAI = [
    `import OpenAI from 'openai'`,
    ``,
    `const client = new OpenAI({`,
    `  baseURL: '${baseUrl}/v1',`,
    `  apiKey: 'sk-xxxxxxxx',`,
    `})`,
    ``,
    `const resp = await client.chat.completions.create({`,
    `  model: 'gpt-4o',`,
    `  messages: [{ role: 'user', content: 'Hello' }],`,
    `})`,
    `console.log(resp.choices[0].message.content)`,
  ].join('\n')

  const pythonAnthropic = [
    `import anthropic`,
    ``,
    `client = anthropic.Anthropic(`,
    `    base_url="${baseUrl}",`,
    `    api_key="sk-xxxxxxxx",`,
    `)`,
    ``,
    `msg = client.messages.create(`,
    `    model="claude-sonnet-4-5",`,
    `    max_tokens=1024,`,
    `    messages=[{"role": "user", "content": "Hello"}],`,
    `)`,
    `print(msg.content[0].text)`,
  ].join('\n')

  const curlAnthropic = [
    `curl ${baseUrl}/v1/messages \\`,
    `  -H "Content-Type: application/json" \\`,
    `  -H "x-api-key: sk-xxxxxxxx" \\`,
    `  -H "anthropic-version: 2023-06-01" \\`,
    `  -d '{`,
    `    "model": "claude-sonnet-4-5",`,
    `    "max_tokens": 1024,`,
    `    "messages": [{"role": "user", "content": "Hello"}]`,
    `  }'`,
  ].join('\n')

  const curlStream = [
    `curl ${baseUrl}/v1/chat/completions \\`,
    `  -H "Content-Type: application/json" \\`,
    `  -H "Authorization: Bearer sk-xxxxxxxx" \\`,
    `  -d '{`,
    `    "model": "gpt-4o",`,
    `    "stream": true,`,
    `    "messages": [{"role": "user", "content": "Hello"}]`,
    `  }'`,
  ].join('\n')

  return (
    <DocSection
      id='api'
      title={t('API & SDKs')}
      description={t(
        'Call the gateway directly from your own code. The official OpenAI and Anthropic SDKs work unchanged; only the base URL and key differ.'
      )}
    >
      <Tabs defaultValue='python'>
        <TabsList>
          <TabsTrigger value='python'>Python (OpenAI)</TabsTrigger>
          <TabsTrigger value='node'>Node.js (OpenAI)</TabsTrigger>
          <TabsTrigger value='anthropic'>Python (Anthropic)</TabsTrigger>
          <TabsTrigger value='curl'>cURL</TabsTrigger>
        </TabsList>
        <TabsContent value='python'>
          <CodeBlock title='pip install openai' code={pythonOpenAI} />
        </TabsContent>
        <TabsContent value='node'>
          <CodeBlock title='npm install openai' code={nodeOpenAI} />
        </TabsContent>
        <TabsContent value='anthropic'>
          <CodeBlock title='pip install anthropic' code={pythonAnthropic} />
        </TabsContent>
        <TabsContent value='curl' className='space-y-3'>
          <CodeBlock title={t('Streaming chat completion')} code={curlStream} />
          <CodeBlock title={t('Anthropic Messages')} code={curlAnthropic} />
        </TabsContent>
      </Tabs>

      <div className='space-y-2'>
        <h3 className='text-base font-semibold'>{t('Endpoints')}</h3>
        <CodeBlock
          code={[
            `POST ${baseUrl}/v1/chat/completions   # OpenAI Chat Completions`,
            `POST ${baseUrl}/v1/responses          # OpenAI Responses`,
            `POST ${baseUrl}/v1/messages           # Anthropic Messages`,
            `POST ${baseUrl}/v1/embeddings         # Embeddings`,
            `POST ${baseUrl}/v1/images/generations # Image generation`,
            `GET  ${baseUrl}/v1/models             # Models available to your key`,
          ].join('\n')}
        />
      </div>

      <div className='space-y-2'>
        <h3 className='text-base font-semibold'>{t('IDE plugins (Cursor, Cline, Continue, ...)')}</h3>
        <p className='text-muted-foreground text-sm leading-relaxed'>
          {t(
            'Choose the "OpenAI compatible" (or "OpenAI API") provider type, set the base URL and key below, and type the model name manually.'
          )}
        </p>
        <CodeBlock
          code={[`Base URL: ${baseUrl}/v1`, `API Key:  sk-xxxxxxxx`].join('\n')}
        />
      </div>

      <DocNote>
        {t(
          'Some tools append /v1 automatically. If you get a 404, try removing or adding the /v1 suffix on the base URL.'
        )}
      </DocNote>
    </DocSection>
  )
}
