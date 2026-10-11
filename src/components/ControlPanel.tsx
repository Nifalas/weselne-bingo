import { Shuffle, ImageIcon, Type, Hash } from 'lucide-react'
import { mustQuestions } from '../data/must_questions'

type ControlPanelProps = {
  questionsText: string
  onQuestionsChange: (text: string) => void
  title: string
  onTitleChange: (title: string) => void
  imageSrc: string
  onImageChange: (src: string) => void
  boardCount: number
  onBoardCountChange: (count: number) => void
  onGenerate: () => void
}

export function ControlPanel({
  questionsText,
  onQuestionsChange,
  title,
  onTitleChange,
  imageSrc,
  onImageChange,
  boardCount,
  onBoardCountChange,
  onGenerate,
}: ControlPanelProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') onImageChange(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto p-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold tracking-wide text-stone-800">
          Generator Weselnego Bingo
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          50 unikalnych plansz · 2 na stronie A4 · gotowe do cięcia na A5
        </p>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-800 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-amber-900 active:scale-[0.99]"
      >
        <Shuffle className="h-4 w-4" />
        Przetasuj / Wygeneruj nowe
      </button>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-500">
          <Hash className="h-3.5 w-3.5" />
          Liczba plansz
        </label>
        <input
          type="number"
          min={1}
          max={200}
          value={boardCount}
          onChange={(e) => onBoardCountChange(Math.max(1, Number(e.target.value) || 1))}
          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-500">
          <Type className="h-3.5 w-3.5" />
          Tytuł na planszy
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-500">
          <ImageIcon className="h-3.5 w-3.5" />
          Grafika nagłówka
        </label>
        <input
          type="url"
          placeholder="URL grafiki lub wgraj plik poniżej"
          value={imageSrc.startsWith('data:') ? '' : imageSrc}
          onChange={(e) => onImageChange(e.target.value || '/wedding-placeholder.svg')}
          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full text-xs text-stone-500 file:mr-3 file:rounded-md file:border-0 file:bg-stone-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-stone-700"
        />
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Podgląd grafiki"
            className="h-12 w-auto rounded border border-stone-200 object-contain"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col space-y-2 min-h-0">
        <label className="text-xs font-medium uppercase tracking-wider text-stone-500">
          Pula pytań (jedno na linię)
        </label>
        <textarea
          value={questionsText}
          onChange={(e) => onQuestionsChange(e.target.value)}
          className="min-h-[180px] flex-1 resize-none rounded-lg border border-stone-200 bg-white px-3 py-2 font-mono text-xs leading-relaxed text-stone-800 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
          spellCheck={false}
        />
        <p className="text-xs text-stone-400">
          Obowiązkowe na każdej planszy ({mustQuestions.length}):{' '}
          {mustQuestions.join(' · ')}
        </p>
        <p className="text-xs text-stone-400">
          Opcjonalny limit dla pytania: `Treść pytania | 12` (max liczba plansz).
        </p>
      </div>
    </div>
  )
}
