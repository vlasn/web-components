class ShopContainer extends HTMLElement {
    constructor() {
        super()
        this.addEventListener('click', e => {
        })
      
      // test
    }
    get observedAttributes () {
        return ['disabled', 'expanded']
    }
    connectedCallback() {
        console.log('I was inserted into the DOM!')
        this.innerHTML = '<b>test</b><shop-row></shop-row>'
    }
}


window.customElements.define('shopping-container', ShopContainer)
