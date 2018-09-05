
class ShopContainer extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    async connectedCallback() {
<<<<<<< HEAD
        console.log(await game.getShopInventory())
=======

        const items = await this.getItems()
        const style = `#shopping-cart {
              position:fixed; 
              top:20px; 
              right:20px; 
              box-shadow: 0 0 3px #ccc;
          }`
>>>>>>> d3d652b70a67f9952147435966da7ce53b228b00
        console.log('shop items', items)
        this.shadow.innerHTML =  `<section id="shopping-cart">
                                    ${items.map(item => `<shop-row id=${item.id} name=${item.name} cost=${item.cost} ></shop-row>`).join("")}
                                  </section>
                                  <style>${style}</style>`;
                                  
    }
}


window.customElements.define('shopping-cart', ShopContainer)
