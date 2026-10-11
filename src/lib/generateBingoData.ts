import { mustQuestions } from '../data/must_questions'
import type { QuestionConfig } from '../data/questions'
import { CENTER_INDEX, FREE_SPACE, BOARD_SIZE } from './constants'

export type BingoBoard = string[]

export type GenerateBingoResult = {
  count: number
  boards: BingoBoard[]
}

export function fisherYatesShuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

type NormalizedQuestion = {
  text: string
  maxCards: number
}

type QuestionInput = string | QuestionConfig

function normalizeQuestions(questionsPool: QuestionInput[]): NormalizedQuestion[] {
  const byText = new Map<string, NormalizedQuestion>()

  questionsPool.forEach((entry) => {
    const text = (typeof entry === 'string' ? entry : entry.text).trim()
    if (!text) return

    const rawMax = typeof entry === 'string' ? undefined : entry.maxCards
    const maxCards =
      typeof rawMax === 'number' && Number.isFinite(rawMax) && rawMax > 0
        ? Math.floor(rawMax)
        : Number.POSITIVE_INFINITY

    byText.set(text, { text, maxCards })
  })

  return [...byText.values()]
}

function pickQuestionForSlot(
  questionPool: NormalizedQuestion[],
  usedInBoard: Set<string>,
  usedByQuestion: Map<string, number>,
): string {
  const candidates = questionPool.filter(({ text, maxCards }) => {
    if (usedInBoard.has(text)) return false
    return (usedByQuestion.get(text) ?? 0) < maxCards
  })

  if (candidates.length === 0) {
    throw new Error(
      'Brakuje dostępnych pytań spełniających limity maxCards. Zwiększ limity lub dodaj więcej pytań.',
    )
  }

  const chosen = candidates[Math.floor(Math.random() * candidates.length)]
  usedByQuestion.set(chosen.text, (usedByQuestion.get(chosen.text) ?? 0) + 1)
  return chosen.text
}

function generateSingleBoard(
  questionPool: NormalizedQuestion[],
  mustPool: string[],
  usedByQuestion: Map<string, number>,
): BingoBoard {
  const board: BingoBoard = Array(BOARD_SIZE).fill('')
  board[CENTER_INDEX] = FREE_SPACE

  const availableSlots = Array.from({ length: BOARD_SIZE }, (_, i) => i).filter(
    (i) => i !== CENTER_INDEX,
  )
  const shuffledSlots = fisherYatesShuffle(availableSlots)

  const must = [...mustPool]
  must.forEach((question, index) => {
    board[shuffledSlots[index]] = question
  })

  const used = new Set([...must, FREE_SPACE])
  const needed = availableSlots.length - must.length

  for (let slotIndex = must.length; slotIndex < must.length + needed; slotIndex++) {
    const question = pickQuestionForSlot(questionPool, used, usedByQuestion)
    board[shuffledSlots[slotIndex]] = question
    used.add(question)
  }

  return board
}

export function generateBingoData(
  questionsPool: QuestionInput[],
  count = 50,
  mustPool: string[] = mustQuestions,
): GenerateBingoResult {
  const normalizedPool = normalizeQuestions(questionsPool)
  const uniqueMust = [...new Set(mustPool.map((q) => q.trim()).filter(Boolean))]

  const minRequired = BOARD_SIZE - 1 - uniqueMust.length
  const nonMustPool = normalizedPool.filter((q) => !uniqueMust.includes(q.text))

  if (nonMustPool.length < minRequired) {
    console.warn(
      `Pula pytań (${nonMustPool.length}) jest za mała — potrzeba co najmniej ${minRequired} unikalnych pytań poza obowiązkowymi.`,
    )
  }

  const usedByQuestion = new Map<string, number>()
  const boards: BingoBoard[] = []
  for (let i = 0; i < count; i++) {
    boards.push(generateSingleBoard(nonMustPool, uniqueMust, usedByQuestion))
  }

  return { count, boards }
}
