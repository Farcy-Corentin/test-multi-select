export default function createElement(type, props = {}, ...children) {
        const element = document.createElement(type)

        for (let [key, value] of Object.entries(props)) {
            if (key.startsWith("on") && typeof value === "function") {
                element.addEventListener(key.substring(2).toLowerCase(), value);
            } else {
                element.setAttribute(key, value);
            }
        }

        children.forEach(child => {
            if (typeof child === "string") {
                element.appendChild(document.createTextNode(child))
            } else {
                element.appendChild(child)
            }
        })

        return element
    }
