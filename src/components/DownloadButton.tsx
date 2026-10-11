import { useState, type ReactElement } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { downloadPdfDocument } from '../lib/downloadPdf'

type DownloadButtonProps = {
  document: ReactElement
  fileName?: string
}

export function DownloadButton({
  document,
  fileName = 'weselne_bingo.pdf',
}: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    setDownloading(true)
    setError(null)
    try {
      await downloadPdfDocument(document, fileName)
    } catch (err) {
      console.error('PDF download failed:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Nie udało się wygenerować PDF. Sprawdź grafikę i spróbuj ponownie.',
      )
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="inline-flex items-center gap-2 rounded-xl bg-amber-800 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-amber-900 disabled:cursor-wait disabled:opacity-70"
      >
        {downloading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {downloading ? 'Generowanie PDF…' : 'Pobierz weselne_bingo.pdf'}
      </button>
      {error && (
        <p className="max-w-xs text-right text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
      {downloading && (
        <p className="text-xs text-stone-500">
          Przy 50 planszach może to potrwać ok. minutę — nie zamykaj karty.
        </p>
      )}
    </div>
  )
}
