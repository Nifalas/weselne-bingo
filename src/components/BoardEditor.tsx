import { ChevronLeft, ChevronRight, Lock } from 'lucide-react'
import { CENTER_INDEX, FREE_SPACE } from '../lib/constants'
import type { BingoBoard } from '../lib/generateBingoData'

type BoardEditorProps = {
  boards: BingoBoard[]
  selectedIndex: number
  onSelectIndex: (index: number) => void
  onUpdateCell: (boardIndex: number, cellIndex: number, value: string) => void
}

export function BoardEditor({
  boards,
  selectedIndex,
  onSelectIndex,
  onUpdateCell,
}: BoardEditorProps) {
  const board = boards[selectedIndex]
  if (!board) return null

  const total = boards.length

  return (
    <div className="border-t border-stone-200 bg-stone-50/80 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-600">
          Edycja układów
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={selectedIndex <= 0}
            onClick={() => onSelectIndex(selectedIndex - 1)}
            className="rounded-lg border border-stone-200 bg-white p-1.5 text-stone-600 transition hover:bg-stone-100 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="min-w-[4.5rem] text-center text-sm font-medium text-stone-700">
            Plansza {selectedIndex + 1} / {total}
          </span>
          <button
            type="button"
            disabled={selectedIndex >= total - 1}
            onClick={() => onSelectIndex(selectedIndex + 1)}
            className="rounded-lg border border-stone-200 bg-white p-1.5 text-stone-600 transition hover:bg-stone-100 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid max-h-48 grid-cols-5 gap-1 overflow-y-auto">
        {board.map((cell, cellIndex) => {
          const isCenter = cellIndex === CENTER_INDEX
          return (
            <div key={cellIndex} className="relative">
              {isCenter && (
                <Lock className="absolute right-0.5 top-0.5 h-2.5 w-2.5 text-amber-700/60" />
              )}
              <input
                type="text"
                value={isCenter ? FREE_SPACE : cell}
                disabled={isCenter}
                onChange={(e) => onUpdateCell(selectedIndex, cellIndex, e.target.value)}
                className={`w-full rounded border px-1 py-1.5 text-[9px] leading-tight outline-none ${
                  isCenter
                    ? 'border-amber-200 bg-amber-50 font-semibold text-amber-900'
                    : 'border-stone-200 bg-white text-stone-800 focus:border-amber-500'
                }`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
