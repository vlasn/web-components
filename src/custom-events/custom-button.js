const template = document.createElement('template')
template.innerHTML = `
    <button iamspecial>
        <slot></slot>
    </button>
`
const style = document.createElement('style')
style.innerHTML = `
    button {
        background-color: white;
        border: 1px solid tomato;
        padding: 10px 20px;
        border-radius: 5px;
    }
`
window.customElements.define('custom-button',
    class extends HTMLElement {
        constructor () {
            console.log('hi lol')
            super()
            this.doc = document.currentScript.ownerDocument
            console.log(this.doc)
            this.attachShadow({mode: 'open'})
            this.shadowRoot.appendChild(document.importNode(style, true))
            this.shadowRoot.appendChild(document.importNode(template.content, true))
            this.emitCustomEvent = this.emitCustomEvent.bind(this)

            this.shadowRoot.querySelector('[iamspecial]').addEventListener('click', this.emitCustomEvent)
        }
        emitCustomEvent (e) {
            this.dispatchEvent(new CustomEvent('hit', {
                detail: {
                    hi: 'mom'
                }
            }))
        }
    }
)
