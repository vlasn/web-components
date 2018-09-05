
class ShopContainer extends HTMLElement {
    constructor() {
        super()
        this.game = new Game();
        this.shadow = this.attachShadow({mode: 'open'})

    }

    async getItems() {
        await this.game.start();
        return await this.game.getShopInventory();
    }

    async connectedCallback() {

        const items = await this.getItems()
        console.log('shop items', items)
        this.shadow.innerHTML =  `<section id="shopping-cart">
                                    <shop-row></shop-row>
                                  </section>`;
    }
}


window.customElements.define('shopping-cart', ShopContainer)
