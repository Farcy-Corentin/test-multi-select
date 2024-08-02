export function MultipleSelectChip(elements) {
    return elements.map((element) => {
        const chipElement = createElement('div', { class: 'dropdown__chip' })

        chipElement.appendChild(element.element)

        return li
    })
}
