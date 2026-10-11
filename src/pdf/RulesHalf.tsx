import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { bingoRules, type RulesSection } from '../data/rules'
import { weddingTheme as t } from './weddingTheme'
import './fonts'

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: t.cream,
    fontFamily: 'NotoSans',
    color: t.text,
  },
  frame: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: t.gold,
    borderStyle: 'solid',
    padding: 10,
    backgroundColor: t.white,
  },
  frameInner: {
    flex: 1,
    borderWidth: 0.75,
    borderColor: t.goldLight,
    borderStyle: 'solid',
    padding: 8,
  },
  title: {
    fontFamily: 'NotoSerif',
    fontSize: 13,
    fontWeight: 700,
    textAlign: 'center',
    color: t.text,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  intro: {
    fontSize: 7,
    lineHeight: 1.3,
    textAlign: 'center',
    color: t.textMuted,
    marginBottom: 8,
  },
  columns: {
    flexDirection: 'row',
    flex: 1,
    gap: 10,
  },
  column: {
    flex: 1,
  },
  section: {
    marginBottom: 6,
  },
  sectionHeading: {
    fontFamily: 'NotoSerif',
    fontSize: 8.5,
    fontWeight: 700,
    color: t.textMuted,
    marginBottom: 3,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 8,
    fontSize: 7,
    color: t.gold,
    lineHeight: 1.3,
  },
  itemText: {
    flex: 1,
    fontSize: 7,
    lineHeight: 1.3,
    color: t.text,
  },
})

function RulesColumn({ sections }: { sections: RulesSection[] }) {
  return (
    <View style={styles.column}>
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionHeading}>{section.heading}</Text>
          {section.items.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.itemRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

export function RulesHalf() {
  const { title, intro, leftColumn, rightColumn } = bingoRules

  return (
    <View style={styles.wrap}>
      <View style={styles.frame}>
        <View style={styles.frameInner}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.intro}>{intro}</Text>

          <View style={styles.columns}>
            <RulesColumn sections={leftColumn} />
            <RulesColumn sections={rightColumn} />
          </View>
        </View>
      </View>
    </View>
  )
}
