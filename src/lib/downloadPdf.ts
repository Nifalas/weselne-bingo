import { pdf } from '@react-pdf/renderer'
import type { ReactElement } from 'react'

export async function downloadPdfDocument(
  document: ReactElement,
  fileName: string,
): Promise<void> {
  const blob = await pdf(document).toBlob()
  const url = URL.createObjectURL(blob)
  const link = window.document.createElement('a')
  link.href = url
  link.download = fileName
  link.rel = 'noopener'
  window.document.body.appendChild(link)
  link.click()
  window.document.body.removeChild(link)
  window.setTimeout(() => URL.revokeObjectURL(url), 2000)
}
