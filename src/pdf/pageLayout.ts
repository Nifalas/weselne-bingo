import { StyleSheet } from '@react-pdf/renderer'
import { weddingTheme as t } from './weddingTheme'

/** Wymiary A4 w punktach PDF (react-pdf domyślnie) */
export const A4_WIDTH_PT = 595.28
export const A4_HEIGHT_PT = 841.89
export const A4_HALF_HEIGHT_PT = A4_HEIGHT_PT / 2

export const a4PageStyle = {
  flexDirection: 'column' as const,
  backgroundColor: t.cream,
  padding: 0,
  position: 'relative' as const,
}

export const a4TwoUpStyles = StyleSheet.create({
  halfTop: {
    width: '100%',
    height: A4_HALF_HEIGHT_PT,
    maxHeight: A4_HALF_HEIGHT_PT,
    overflow: 'hidden',
    borderBottomWidth: 0.5,
    borderBottomColor: t.goldLight,
    borderBottomStyle: 'solid',
  },
  halfBottom: {
    width: '100%',
    height: A4_HALF_HEIGHT_PT,
    maxHeight: A4_HALF_HEIGHT_PT,
    overflow: 'hidden',
  },
})
