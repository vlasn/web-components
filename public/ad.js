const generateContent = ({ status, reward }) => `
    <div class="item ${status}">
        <h3>Reward: ${reward}</h3>
        <slot>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, consequatur.
        </slot>
        <div>
            <button>KILL KILL KILL</button>
        </div>
    </div>
`;

const style = `
    .item {
        border: 1px solid #000;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
    }

    h3 {
        margin: 0 0 20px;
    }

    button {
        padding: 20px 40px;
        margin-top: 20px;
        background-color: #000;
        color: #fff;
        text-transform: uppercase;
        font-weight: 700;
        border: 0;
        font-size: 32px;
        line-height: 1.3;
        border-radius: 8px;
    }
`;

class Ad extends HTMLElement {
    constructor () {
        super ()
        this.attachShadow({mode: 'open'})

        const styleElement = document.createElement('style');
        styleElement.innerHTML = style;
        this.shadowRoot.appendChild(styleElement)

        console.log(this.attributes.getNamedItem('reward').value);

        const attrs = ['reward', 'status'].reduce((total, curr) => {
            total[curr] = this.attributes.getNamedItem(curr).value;

            return total;
        }, {});

        const content = document.createElement('div');
        console.log('perse', attrs);
        content.innerHTML = generateContent(attrs);
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
