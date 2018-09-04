### Templates + custom elements = <3

This is mostly examplified in the slide, but here's the custom element code:
```jsx
<template id="counter-template">
    <div>
        <button id="counter-increment">Up it goes!</button>
        Count: <span id="counter-count">0</span>
    </div>
</template>
<script>
    window.customElements.define('custom-counter', 
    class CustomCounter extends HTMLElement {
        static get observedAttributes() {
            return ['count']
        }
        constructor() {
            super()
            //We need to hack our way around this not being in the DOM at first:
            const thisDocument = document.currentScript.ownerDocument
            
            const template = thisDocument.querySelector('#counter-template')
            const content = template.content
            this.appendChild(document.importNode(content, true))
            //Lets initialise state add an event listener, too:
            this.count = this.getAttribute('count') : 0

            this.querySelector('#counter-increment').addEventListener('click', () => {
                this.setAttribute('count', (parseInt(this.getAttribute('count'))+ 1) || 0) 
                console.log(this.getAttribute('count'))
            })
        }
        
        attributeChangedCallback (attr, oldVal, newVal) {
            if (attr === 'count') {
                this.querySelector('#counter-count').textContent = newVal
            }
        }
    }
)
</script>
```
We can stuff all this in `custom-counter.html`.

To actually use it in another HTML file, we can use another nifty new feature - HTML imports:
```html
<link rel="import" href="source/to-your-file.html">
```
...and "invoke" it:
```html
<custom-counter></custom-counter>
```