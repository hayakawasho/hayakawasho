const splitTextNode = (element: Element) => {
  const nodes = Array.from(element.childNodes)
  const decorated = nodes.map(node => {
    const ret = []

    switch (node.nodeType) {
      case 1: {
        ret.push(node)
        break
      }

      case 3: {
        const chars = node.nodeValue?.split('').map((char, index) => {
          const span = document.createElement('span')
          span.classList.add('_c')
          span.innerText = char
          return span
        })

        chars && ret.push(...chars)
        break
      }
    }

    return ret
  })

  const fragment = document.createDocumentFragment()

  for (const node of decorated.flat()) {
    fragment.appendChild(node)
  }

  element.innerHTML = ''
  element.appendChild(fragment)
}

export { splitTextNode }
