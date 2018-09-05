const game = new Game();

class ShopContainer extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})

    }

    async getItems() {
        this.server = await game.start();
        // const items = server.getShopInventory();
    }

    async connectedCallback() {
        this.shadow.innerHTML =  `<section id="shopping-cart">
                                    <shop-row></shop-row>
                                  </section>`;
    }
}


window.customElements.define('shopping-cart', ShopContainer)
