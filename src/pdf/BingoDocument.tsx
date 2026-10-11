import { Document, Page, View } from '@react-pdf/renderer'
import type { BingoBoard as BingoBoardData } from '../lib/generateBingoData'
import { A4TwoUpContent } from './A4TwoUpPage'
import { a4PageStyle } from './pageLayout'
import { BingoBoard } from './BingoBoard'
import { RulesHalf } from './RulesHalf'
import './fonts'

type BingoDocumentProps = {
  boards: BingoBoardData[]
  title: string
  imageSrc: string
}

export function BingoDocument({ boards, title, imageSrc }: BingoDocumentProps) {
  const pagePairs: [BingoBoardData, BingoBoardData | undefined][] = []
  for (let i = 0; i < boards.length; i += 2) {
    pagePairs.push([boards[i], boards[i + 1]])
  }

  return (
    <Document title={title} author="Weselne Bingo Generator">
      {pagePairs.map(([topBoard, bottomBoard], pageIndex) => (
        <Page key={`bingo-${pageIndex}`} size="A4" style={a4PageStyle} wrap={false}>
          <A4TwoUpContent
            top={
              <BingoBoard
                cells={topBoard}
                title={title}
                imageSrc={imageSrc}
                boardIndex={pageIndex * 2}
              />
            }
            bottom={
              bottomBoard ? (
                <BingoBoard
                  cells={bottomBoard}
                  title={title}
                  imageSrc={imageSrc}
                  boardIndex={pageIndex * 2 + 1}
                />
              ) : (
                <View />
              )
            }
          />
        </Page>
      ))}
      <Page key="rules" size="A4" style={a4PageStyle} wrap={false}>
        <A4TwoUpContent top={<RulesHalf />} bottom={<RulesHalf />} />
      </Page>
    </Document>
  )
}
