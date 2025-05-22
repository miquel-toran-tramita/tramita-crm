const dicPreferences = {
  Time: {
    M: 'Mañana',
    T: 'Tarde',
    A: 'Anochecer',
  },
  Contact: {
    E: 'Email',
    T: 'Teléfono',
    W: 'Whatsapp',
  },
}

const compress = (preference: string, type: 'Time' | 'Contact'): string => {
  const dic = dicPreferences[type]
  return Object.entries(dic)
    .filter(([_, value]) => preference.includes(value))
    .map(([key]) => key)
    .join('')
}

const uncompress = (preference: string, type: 'Time' | 'Contact'): string => {
  const dic = dicPreferences[type]
  return [...preference]
    .map((key) => dic[key] || '')
    .filter((value) => value) // Filtra claves no válidas
    .join(' - ')
}

export const compressTimePreference = (timePreference: string) => compress(timePreference, 'Time')
export const uncompressTimePreference = (timePreference: string) => uncompress(timePreference, 'Time')
export const compressContactPreference = (contactPreference: string) => compress(contactPreference, 'Contact')
export const uncompressContactPreference = (contactPreference: string) => uncompress(contactPreference, 'Contact')
