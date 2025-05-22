export const average = (values: number[]): number => {
  const filtered = values.filter((v) => v !== 0 && !isNaN(v))
  if (filtered.length === 0) return 0

  const sum = filtered.reduce((acc, val) => acc + val, 0)
  return Math.round(sum / filtered.length)
}

export const calculateEstimatedValue = (values: number[], multiplier: number, mode: 'min' | 'max' | '' = ''): number => {
  const filteredValues = values.filter((v) => typeof v === 'number' && !isNaN(v) && v !== 0)

  if (filteredValues.length === 0) {
    return 0
  }

  if (mode === 'min') {
    return Math.min(...filteredValues) * multiplier
  }

  if (mode === 'max') {
    return Math.max(...filteredValues) * multiplier
  }

  if (filteredValues.length !== 1) {
    throw new Error('Neutral mode expects exactly one non-zero value.')
  }

  return filteredValues[0] * multiplier
}
