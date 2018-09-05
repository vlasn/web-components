
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
                                  </section>
                                  <style>
                                      #shopping-cart {
                                          position:fixed; 
                                          top:20px; 
                                          right:20px; 
                                          box-shadow: 0 0 3px #ccc;
                                      }

                                  </style>
                                  `;
    }
}


window.customElements.define('shopping-cart', ShopContainer)
