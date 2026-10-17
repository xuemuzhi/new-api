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
import { useStatus } from '@/hooks/use-status'

export interface SiteInfo {
  /** Public base URL of this gateway, without trailing slash */
  baseUrl: string
  /** Display name of this site */
  siteName: string
}

/**
 * Resolve the site address and name shown inside docs examples.
 * Falls back to the current origin when the admin has not configured server_address.
 */
export function useSiteInfo(): SiteInfo {
  const { status } = useStatus()
  const record = status as Record<string, unknown> | null
  const rawAddress = record?.server_address
  const baseUrl =
    typeof rawAddress === 'string' && rawAddress.trim()
      ? rawAddress.trim().replace(/\/+$/, '')
      : window.location.origin
  const rawName = record?.system_name
  const siteName =
    typeof rawName === 'string' && rawName.trim() ? rawName.trim() : 'New API'
  return { baseUrl, siteName }
}
