export function addHidden(selector) {
  const elements = document.querySelectorAll(selector)
  elements.forEach((el) => el.classList.add('hidden'))
}

export function removeHidden(selector) {
  const elements = document.querySelectorAll(selector)
  elements.forEach((el) => el.classList.remove('hidden'))
}
