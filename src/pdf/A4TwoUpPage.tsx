import type { ReactNode } from 'react'
import { View } from '@react-pdf/renderer'
import { a4TwoUpStyles } from './pageLayout'

type A4TwoUpContentProps = {
  top: ReactNode
  bottom: ReactNode
}

/** Zawartość strony A4: 2 elementy jeden pod drugim */
export function A4TwoUpContent({ top, bottom }: A4TwoUpContentProps) {
  return (
    <>
      <View style={a4TwoUpStyles.halfTop}>{top}</View>
      <View style={a4TwoUpStyles.halfBottom}>{bottom}</View>
    </>
  )
}
