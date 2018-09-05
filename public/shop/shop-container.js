class ShopContainer extends HTMLElement {
    constructor() {
        super()
        this.addEventListener('click', e => {
        })
    }
    get observedAttributes () {
        return ['disabled', 'expanded']
    }
    connectedCallback() {
        console.log('I was inserted into the DOM!')
        this.innerHTML = '<b>test</b>'
    }
}


window.customElements.define('shopping-cart', ShopContainer)
