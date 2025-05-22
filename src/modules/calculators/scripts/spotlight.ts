export const spotlight = (HTMLSpotlight: Element) => {
  const HTMLModules: Element[] = [...document.querySelectorAll('.g-calc')]

  for (let el of HTMLModules) {
    el.addEventListener('mouseenter', () => {
      const rest: Element[] = HTMLModules.filter((item: Element) => el !== item)

      HTMLSpotlight.classList.add('visible')
      rest.map((item: Element) => item.classList.add('inactive'))
    })

    el.addEventListener('mouseleave', () => {
      HTMLSpotlight.classList.remove('visible')
      HTMLModules.map((item: Element) => item.classList.remove('inactive'))
    })
  }
}
