import createElement from '../lib/createElement.js'

export default function MultipleSelectListItem(elements, chipElement, className = 'dropdown__list-item', hiddenInput) {
    function onClick(event, li) {
        function removeChip(event) {
            li.classList.remove('dropdown__list-item--selected')
            event.stopPropagation()
            event.target.parentNode.remove()
        }

        const chip = createElement(
            'div',
            {
                class: 'dropdown__chip',
                'data-value': event.currentTarget.dataset.value
            },
            event.currentTarget.dataset.value,
            createElement(
                'button',
                { class: 'dropdown__chip-close', onClick: removeChip },
                'x'
            )
        )

        if (hiddenInput.value) {
            hiddenInput.value += ',' + event.currentTarget.dataset.value
        } else {
            hiddenInput.value = event.currentTarget.dataset.value
        }

        li.classList.add('dropdown__list-item--selected')
        chipElement.appendChild(chip)
    }

    return elements.map((element) => {
        function hasSelected() {
            if (chipElement.hasChildNodes() > 0) {
                for (let chip of chipElement.children) {
                    if (chip.dataset.value === element.textContent) {
                        return true
                    }
                }
            }
        }


        const li = createElement('li', {
            class: `${className} ${hasSelected() ? 'dropdown__list-item--selected' : ''}`,
            onclick: (event) => onClick(event, li)
         })

        for (let [key, value] of Object.entries(element)) {
            if (value instanceof Node) {
                li.dataset.value = value.textContent
                li.appendChild(value)
            }

            if (value instanceof String || typeof value === 'string') {
                li.textContent = value
                li.dataset.value = value
            }
        }

        return li
    })
}
