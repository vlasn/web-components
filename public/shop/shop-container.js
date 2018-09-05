
class ShopContainer extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    async connectedCallback() {
        await game.start();
        
        const items = await game.getShopInventory()

        const style = `#shopping-cart {
              position:fixed;
              top:20px;
              right:20px;
              box-shadow: 0 0 3px #ccc;
              width:330px;
              border-radius:7px;
              border: 1px solid #ddd;
              padding:20px;
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
