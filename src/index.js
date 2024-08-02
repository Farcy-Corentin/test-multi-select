import MultipleSelectDropdown from './components/MultipleSelectDropdown.js'
import MultipleSelectListItem from './components/MultipleSelectListItem.js'
import createElement from './lib/createElement.js'
import posts from './data/posts.js'

const app = document.querySelector('#app')
const h1 = document.createElement('h1')
h1.textContent = 'Multiple Select Vanilla JS'

function onSearch(searchTerm) {
    if (!searchTerm) {
        return posts
    }

    return posts.filter((post) => {
        return post.title.toLocaleLowerCase().includes(searchTerm)
    })
}

function createPostElements(posts) {
    return posts.map((post) => {
        const textContent = post.title
        const span = createElement('span', { class: `dropdown__list-item--${post.status}` }, post.title)

        return { textContent, span }
    })
}

const chipElement = createElement('div', { class: 'dropdown__chips' })
const input = createElement('input', { class: 'dropdown__input', placeholder: 'Search...' })
const hiddenInput = createElement('input', { type: 'hidden', name: 'post' })

function onOpen(hiddenInput, chipElement, dropdown, menuDropdown) {
    menuDropdown.innerHTML = ''

    const postListelement = createPostElements(posts)
    const listElement = createElement(
        'ul',
        { class: 'dropdown__list' },
        ...MultipleSelectListItem(postListelement, chipElement,undefined, hiddenInput),
    )

    if (input.value) {
        const searchTerm = input.value
        const filteredItems = onSearch(searchTerm)
        const filteredElements = createPostElements(filteredItems)
        console.log(hiddenInput)
        const newListItems = MultipleSelectListItem(filteredElements, chipElement,undefined, hiddenInput)

        menuDropdown.appendChild(createElement('ul', { class: 'dropdown__list' }, ...newListItems))
    } else {
        menuDropdown.appendChild(listElement)
    }

    if (!dropdown.contains(menuDropdown)) {
        dropdown.appendChild(menuDropdown)
    }
}

function onClose(dropdown, menuDropdown) {
    return dropdown.removeChild(menuDropdown)
}

app.appendChild(MultipleSelectDropdown(input, hiddenInput, chipElement, onSearch, onOpen, onClose, createPostElements))
