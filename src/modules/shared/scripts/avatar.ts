export const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export const generateRandomAvatar = (): string => {
  const randomString = generateRandomString(10)
  const avatarUrl = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${randomString}`

  return avatarUrl
}
