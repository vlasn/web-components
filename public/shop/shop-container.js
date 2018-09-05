
class ShopContainer extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    async connectedCallback() {
        console.log(await game.getShopInventory())
        console.log('shop items', items)
        this.shadow.innerHTML =  `<section id="shopping-cart">
                                    ${items.map(item => `<shop-row id=${item.id} name=${item.name} cost=${item.cost} ></shop-row>`).join("")}
                                  </section>`;
    }
}


window.customElements.define('shopping-cart', ShopContainer)
