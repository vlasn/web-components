class DragonTask extends HTMLElement {
    constructor() {
        super()
        console.log('DragonTask is being initialized')
        this.addEventListener('click', e => {
            if (this.disabled) {
                return
            }
            this.expanded = !this.expanded
        })
    }
    get observedAttributes () {
        return ['disabled', 'expanded']
    }
    get expanded() {
        return this.hasAttribute('expanded')
    }
    set expanded(v) {
        console.log('Expanded:', v)
        if (v) {
            this.setAttribute('expanded', '')
        } else {
            this.removeAttribute('expanded')
        }
    }
    get disabled() {
        return this.hasAttribute('disabled')
    }
    set disabled(v) {
        if (v) {
            this.setAttribute('disabled', '')
        } else {
            this.removeAttribute('disabled')
        }
    }
    connectedCallback() {
        console.log('I was inserted into the DOM!')
        this.innerHTML = '<b>test</b>'
    }
    disconnectedCallback() {
        console.log('Oh no, I am being removed from the DOM!')
    }
}

(function () {
    console.log('hi')
    window.customElements.define('dragon-task', DragonTask)
})()