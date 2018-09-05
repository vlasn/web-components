const generateContent = () => `
    <div class="item">
        <slot>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, consequatur.
        </slot>
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

        const content = document.createElement('div');
        content.innerHTML = generateContent();
        this.shadowRoot.appendChild(content);
    }
    observedAttributes () {
        return ['adId', 'reward', 'status']
    }
    attributeChangedCallback (attr, oldVal, newVal) {
        if (attr === 'status') {
            if (newVal === 'success') {
                this.shadowRoot.querySelector('.item').classList.add('success');
            } else {
                this.shadowRoot.querySelector('.item').classList.add('fail');
            }
        }
    }
}
window.customElements.define('dragon-ad', Ad)

// <dragon-ad adId="123" reward="1234" status="won">Plz save princess called "beautiful"</dragon-ad>
