import { View, Text, Image, StyleSheet, Svg, Path } from '@react-pdf/renderer'
import { CENTER_INDEX, FREE_SPACE } from '../lib/constants'
import centerCellArt from '../assets/pole_srodek.png'
import { getCellTextStyle } from './cellTextStyle'
import { weddingTheme as t } from './weddingTheme'
import './fonts'

const COLS = 5

const styles = StyleSheet.create({
  board: {
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: t.cream,
    borderWidth: 1,
    borderColor: t.gold,
    borderStyle: 'solid',
  },
  boardInner: {
    flex: 1,
    backgroundColor: t.white,
    borderWidth: 0.75,
    borderColor: t.goldLight,
    borderStyle: 'solid',
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  logo: {
    width: 48,
    height: 20,
    objectFit: 'contain',
  },
  titleWrap: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Oregano',
    fontSize: 26,
    color: t.text,
    letterSpacing: 0.6,
  },
  subtitle: {
    fontFamily: 'Oregano',
    fontSize: 10.5,
    color: t.textMuted,
    marginTop: 3,
    letterSpacing: 0.2,
  },
  titleDivider: {
    marginTop: 5,
    alignItems: 'center',
  },
  grid: {
    flex: 1,
    borderWidth: 0.75,
    borderColor: t.goldMid,
    borderStyle: 'solid',
    backgroundColor: t.white,
  },
  row: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  cell: {
    flex: 1,
    minWidth: 0,
    borderRightWidth: 0.75,
    borderBottomWidth: 0.75,
    borderColor: t.goldLight,
    borderStyle: 'solid',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 52,
    backgroundColor: t.white,
    overflow: 'hidden',
  },
  cellTextWrap: {
    width: '100%',
    overflow: 'hidden',
  },
  cellLastCol: {
    borderRightWidth: 0,
  },
  cellLastRow: {
    borderBottomWidth: 0,
  },
  cellText: {
    fontFamily: 'Oregano',
    fontSize: 10.5,
    fontWeight: 400,
    textAlign: 'center',
    color: t.text,
    lineHeight: 1.25,
  },
  freeCell: {
    padding: 5,
    flexDirection: 'column',
    alignItems: 'stretch',
    overflow: 'hidden',
    backgroundColor: t.white,
  },
  freeCellInner: {
    width: '100%',
    flex: 1,
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  freeCellImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  boardNumber: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    fontFamily: 'Oregano',
    fontSize: 8.5,
    color: t.textSubtle,
    letterSpacing: 0.3,
  },
})

function CellText({ text }: { text: string }) {
  const sizing = getCellTextStyle(text)

  return (
    <View style={styles.cellTextWrap}>
      <Text style={[styles.cellText, sizing]}>{text}</Text>
    </View>
  )
}

function TitleOrnament() {
  return (
    <View style={styles.titleDivider}>
      <Svg width={100} height={5} viewBox="0 0 100 5">
        <Path
          d="M0 2.5 Q12.5 0.5 25 2.5 T50 2.5 T75 2.5 T100 2.5"
          stroke={t.goldMid}
          strokeWidth={0.6}
          fill="none"
        />
      </Svg>
    </View>
  )
}

type BingoBoardProps = {
  cells: string[]
  title: string
  imageSrc: string
  boardIndex: number
}

export function BingoBoard({ cells, title, imageSrc, boardIndex }: BingoBoardProps) {
  const rows = Array.from({ length: COLS }, (_, row) =>
    Array.from({ length: COLS }, (_, col) => cells[row * COLS + col]),
  )

  const showImage =
    Boolean(imageSrc) &&
    !imageSrc.endsWith('.svg') &&
    (imageSrc.startsWith('data:image/') ||
      imageSrc.startsWith('http') ||
      imageSrc.startsWith('blob:') ||
      /\.(png|jpe?g|gif|webp)(\?|$)/i.test(imageSrc))

  return (
    <View style={styles.board}>
      <View style={styles.boardInner}>
        <View style={styles.header}>
          {showImage ? <Image src={imageSrc} style={styles.logo} /> : null}
          <View style={styles.titleWrap}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>Zaznacz gdy uda Ci się wykonać zadanie</Text>
            <TitleOrnament />
          </View>
        </View>

        <View style={styles.grid}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => {
                const cellIndex = rowIndex * COLS + colIndex
                const isFree = cellIndex === CENTER_INDEX || cell === FREE_SPACE
                const isLastCol = colIndex === COLS - 1
                const isLastRow = rowIndex === COLS - 1

                return (
                  <View
                    key={colIndex}
                    style={[
                      styles.cell,
                      ...(isFree ? [styles.freeCell] : []),
                      ...(isLastCol ? [styles.cellLastCol] : []),
                      ...(isLastRow ? [styles.cellLastRow] : []),
                    ]}
                  >
                    {isFree ? (
                      <View style={styles.freeCellInner}>
                        <Image src={centerCellArt} style={styles.freeCellImage} />
                      </View>
                    ) : (
                      <CellText text={cell} />
                    )}
                  </View>
                )
              })}
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.boardNumber}>#{boardIndex + 1}</Text>
    </View>
  )
}
