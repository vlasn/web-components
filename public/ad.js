const template = `
<div>
    this is an ad
</div>
`;

const style = `
div {
    color: red;
}
`;

class Ad extends HTMLElement {
    constructor () {
        super ()
        this.attachShadow({mode: 'open'})

        const styleElement = document.createElement('style');
        styleElement.innerHTML = style;
        this.shadowRoot.appendChild(styleElement)

        const templateElement = document.createElement('template');
        templateElement.innerHTML = template;
        this.shadowRoot.appendChild(document.importNode(templateElement.content, true))
    }
    observedAttributes () {
        return ['adId', 'reward', 'status']
    }
}
window.customElements.define('dragon-ad', Ad)

// <dragon-ad adId="123" reward="1234" status="won">Plz save princess called "beautiful"</dragon-ad>