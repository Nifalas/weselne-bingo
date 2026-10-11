import { useCallback, useMemo, useState } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { FileText } from 'lucide-react'
import { questions } from './data/questions'
import type { QuestionConfig } from './data/questions'
import { generateBingoData } from './lib/generateBingoData'
import type { BingoBoard } from './lib/generateBingoData'
import { DEFAULT_BOARD_COUNT, DEFAULT_TITLE } from './lib/constants'
import { BingoDocument } from './pdf/BingoDocument'
import { ControlPanel } from './components/ControlPanel'
import { BoardEditor } from './components/BoardEditor'
import { DownloadButton } from './components/DownloadButton'

function formatQuestionsText(list: QuestionConfig[]): string {
  return list
    .map(({ text, maxCards }) => (typeof maxCards === 'number' ? `${text} | ${maxCards}` : text))
    .join('\n')
}

function parseQuestionsText(text: string): QuestionConfig[] {
  return text.split('\n').reduce<QuestionConfig[]>((acc, rawLine) => {
    const line = rawLine.trim()
    if (!line) return acc

    const [questionPart, limitPart] = line.split('|')
    const question = questionPart?.trim() ?? ''
    const maxCards = Number(limitPart?.trim())

    if (!question) return acc
    if (!limitPart?.trim() || !Number.isFinite(maxCards) || maxCards <= 0) {
      acc.push({ text: question })
      return acc
    }

    acc.push({ text: question, maxCards: Math.floor(maxCards) })
    return acc
  }, [])
}

function App() {
  const [questionsText, setQuestionsText] = useState(formatQuestionsText(questions))
  const [title, setTitle] = useState(DEFAULT_TITLE)
  const [imageSrc, setImageSrc] = useState('/wedding-placeholder.svg')
  const [boardCount, setBoardCount] = useState(DEFAULT_BOARD_COUNT)
  const [boards, setBoards] = useState<BingoBoard[]>(() =>
    generateBingoData(questions, DEFAULT_BOARD_COUNT).boards,
  )
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0)

  const handleGenerate = useCallback(() => {
    const pool = parseQuestionsText(questionsText)
    try {
      const result = generateBingoData(pool, boardCount)
      setBoards(result.boards)
      setSelectedBoardIndex(0)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nie udało się wygenerować plansz.'
      window.alert(message)
    }
  }, [questionsText, boardCount])

  const handleUpdateCell = useCallback(
    (boardIndex: number, cellIndex: number, value: string) => {
      setBoards((prev) => {
        const next = [...prev]
        const board = [...next[boardIndex]]
        board[cellIndex] = value
        next[boardIndex] = board
        return next
      })
    },
    [],
  )

  const document = useMemo(
    () => <BingoDocument boards={boards} title={title} imageSrc={imageSrc} />,
    [boards, title, imageSrc],
  )

  return (
    <div className="flex h-screen bg-stone-100 font-sans text-stone-900">
      <aside className="flex w-[380px] shrink-0 flex-col border-r border-stone-200 bg-[#FAF7F2]">
        <ControlPanel
          questionsText={questionsText}
          onQuestionsChange={setQuestionsText}
          title={title}
          onTitleChange={setTitle}
          imageSrc={imageSrc}
          onImageChange={setImageSrc}
          boardCount={boardCount}
          onBoardCountChange={setBoardCount}
          onGenerate={handleGenerate}
        />
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-stone-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center gap-3 text-stone-600">
            <FileText className="h-5 w-5 text-amber-800" />
            <div>
              <p className="text-sm font-medium text-stone-800">Podgląd PDF</p>
              <p className="text-xs text-stone-500">
                {boards.length} plansz · {Math.ceil(boards.length / 2)} str. bingo + 1 str.
                zasad (2× na A4)
              </p>
            </div>
          </div>

          <DownloadButton document={document} />
        </header>

        <div className="relative min-h-0 flex-1">
          <PDFViewer
            width="100%"
            height="100%"
            showToolbar
            className="h-full w-full border-0"
          >
            {document}
          </PDFViewer>
        </div>

        <BoardEditor
          boards={boards}
          selectedIndex={selectedBoardIndex}
          onSelectIndex={setSelectedBoardIndex}
          onUpdateCell={handleUpdateCell}
        />
      </main>
    </div>
  )
}

export default App
