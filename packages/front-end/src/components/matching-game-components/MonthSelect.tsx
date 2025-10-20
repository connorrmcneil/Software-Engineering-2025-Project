/**
 * Allows user to select month to show more or less words.
 *
 * Author(s):
 * Wenda Tan
 * (Assisted with ChatGPT)
 */
import {Select} from '@mantine/core'

interface MonthSelectProps {
  selectedMonth: string
  onChange: (value: string) => void
  monthConfig: Record<string, number>
  months: string[]
}

export function MonthSelect({selectedMonth, onChange, monthConfig, months}: MonthSelectProps) {
  return (
    <Select
      label="Select Month"
      value={selectedMonth}
      onChange={value => onChange(value || 'September')}
      data={months.map(month => ({
        value: month,
        label: `${month} (${monthConfig[month]} words)`
      }))}
      size="lg"
      style={{width: '300px'}}
    />
  )
}
