import { Font } from '@react-pdf/renderer'
import { hyphenateSync } from 'hyphen/pl'

// Oregano — https://fonts.google.com/specimen/Oregano (OFL)
Font.register({
  family: 'Oregano',
  fonts: [{ src: '/fonts/Oregano-Regular.ttf', fontWeight: 400 }],
})

// Statyczne TTF — react-pdf/pdfkit nie obsługuje poprawnie WOFF2 (błąd TTFSubset / DataView)
Font.register({
  family: 'NotoSerif',
  fonts: [
    { src: '/fonts/NotoSerif-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/NotoSerif-Bold.ttf', fontWeight: 700 },
  ],
})

Font.register({
  family: 'NotoSans',
  fonts: [
    { src: '/fonts/NotoSans-Regular.ttf', fontWeight: 400, fontStyle: 'normal' },
    { src: '/fonts/NotoSans-Italic.ttf', fontWeight: 400, fontStyle: 'italic' },
  ],
})

Font.registerHyphenationCallback((word) => {
  if (word.length < 8) return [word]

  const parts = hyphenateSync(word).split('\u00AD')
  return parts.length > 1 ? parts : [word]
})
