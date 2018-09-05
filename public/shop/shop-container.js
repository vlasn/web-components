
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
        const style = `#shopping-cart {
              position:fixed; 
              top:20px; 
              right:20px; 
              box-shadow: 0 0 3px #ccc;
          }
            .shopping-table {
                display:flex;
            }
            .shopping-table shop-row {
                flex:1 0 33.3%;
            }
          `
        console.log('shop items', items)
        this.shadow.innerHTML =  `<section id="shopping-cart">
                                    <div class="shopping-table">
                                        ${items.map(item => `<shop-row id=${item.id} name=${item.name} cost=${item.cost} ></shop-row>`).join("")}
                                    </div>
                                  </section>
                                  <style>${style}</style>`;
                                  
    }
}


window.customElements.define('shopping-cart', ShopContainer)
