const BASE_FONT_SIZE = 10.5
const BASE_LINE_HEIGHT = 1.25

/** Mniejsza czcionka dla dłuższych zadań — mieści się w kratce 5×5. */
export function getCellTextStyle(text: string): { fontSize: number; lineHeight: number } {
  const len = text.trim().length

  if (len > 100) return { fontSize: 7.5, lineHeight: 1.14 }
  if (len > 85) return { fontSize: 8, lineHeight: 1.16 }
  if (len > 65) return { fontSize: 8.5, lineHeight: 1.18 }
  if (len > 48) return { fontSize: 9.5, lineHeight: 1.2 }
  if (len > 32) return { fontSize: 10, lineHeight: 1.22 }

  return { fontSize: BASE_FONT_SIZE, lineHeight: BASE_LINE_HEIGHT }
}
