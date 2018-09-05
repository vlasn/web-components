
const template = `<template>
                    <section id="shopping-cart">
                      <slot name="shopping-items"></slot>
                    </section>
                  </template>`;


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
        this.shadow.innerHTML = '<b>Cart</b>'
    }
}


window.customElements.define('shopping-cart', ShopContainer)
