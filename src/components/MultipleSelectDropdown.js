import createElement from '../lib/createElement.js'
import MultipleSelectListItem from './MultipleSelectListItem.js'

export default function MultipleSelectDropdown(input, hiddenInput, chipElement, onSearch, onOpen, onClose, createPostElements) {
    const dropdown = createElement('div', { class: 'dropdown' })
    const menuDropdown = createElement('div', { class: 'dropdown__menu' })

    function updateDropdown(filteredElements) {
        menuDropdown.innerHTML = ''
        const newListItems = MultipleSelectListItem(filteredElements, chipElement)
        menuDropdown.appendChild(createElement('ul', { class: 'dropdown__list' }, ...newListItems))
    }

    function handleOutsideClick(event) {
        event.stopPropagation()

        if (dropdown.contains(menuDropdown) && !dropdown.contains(event.target)) {
            onClose(dropdown, menuDropdown)
            document.removeEventListener('click', handleOutsideClick)
        }
    }

    function handleKeyDown(event) {
        event.stopPropagation()
        if (event.key === 'Escape') {
            onClose(dropdown, menuDropdown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }

    function handleComma(event) {
        function removeChip(event) {
            event.stopPropagation()
            event.target.parentNode.remove()
        }

        if (event.key === ',') {
            event.preventDefault()
            const chip = createElement(
                'div',
                { class: 'dropdown__chip', onclick: removeChip },
                input.value,
                createElement(
                    'button',
                    { class: 'dropdown__chip-close' },
                    'x'
                )
            )
            chipElement.appendChild(chip)
            input.value = ''

            if (menuDropdown.parentNode === dropdown) {
                dropdown.removeChild(menuDropdown)
            }

            const filteredItems = onSearch(input.value)
            const filteredElements = createPostElements(filteredItems)
            const newListItems = MultipleSelectListItem(filteredElements, chipElement, hiddenInput)

            menuDropdown.innerHTML = ''
            menuDropdown.appendChild(createElement('ul', { class: 'dropdown__list' }, ...newListItems))

            if (filteredItems.length > 0) {
                dropdown.appendChild(menuDropdown)
            }
        }
    }

    function handleBackspace(event) {
        if (event.key === 'Backspace' && input.value === '') {
            chipElement.lastChild.remove()
        }
    }

    document.addEventListener('click', (event) => handleOutsideClick(event))
    dropdown.addEventListener('keydown', (event) => handleKeyDown(event))

    input.addEventListener('click', () => onOpen(hiddenInput, chipElement, dropdown, menuDropdown))
    input.addEventListener('input', (event) => {
        const searchTerm = event.target.value
        const filteredPosts = onSearch(searchTerm)
        const filteredElements = createPostElements(filteredPosts)
        updateDropdown(filteredElements)
    })
    input.addEventListener('keydown', (event) => handleComma(event))
    input.addEventListener('keydown', (event) => handleBackspace(event))


    dropdown.appendChild(chipElement)
    dropdown.appendChild(input)
    dropdown.appendChild(hiddenInput)

    return dropdown
}
