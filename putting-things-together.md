### Templates + custom elements = <3

This is mostly examplified in the slide, but here's the custom element code:
```jsx
<template id="counter-template">
    <div class="custom-counter">
        <button id="counter-increment" class="custom-counter__button">Up it goes!</button>
        <div class="custom-counter__text">
            Count: <span id="counter-count" class="custom-counter__count">0</span>
        </div>
    </div>
</template>

<style>
    :root {
        --counter-main-color: tomato;
    }
    .custom-counter {
        border: 1px dashed var(--counter-main-color);
        padding: 10px;
        display: inline-flex;
        flex-direction: column;
    }
    .custom-counter:hover {
        box-shadow: 0px 3px 2px -2px lightgray;
    }
    .custom-counter__button {
        border: 2px solid var(--counter-main-color);
        color: var(--counter-main-color);
        background-color: transparent;
        padding: 5px;    
    }
</style>

<script>
    window.customElements.define('custom-counter', 
    class CustomCounter extends HTMLElement {
        static get observedAttributes() {
            return ['count']
        }
        constructor() {
            super()
            // We need to hack our way around the template not being in the DOM at first:
            const thisDocument = document.currentScript.ownerDocument
            
            const template = thisDocument.querySelector('#counter-template')
            const content = template.content
            this.appendChild(document.importNode(content, true))
            // Lets initialise state, check for pre-existng attribute:
            this.count = 0
            if (this.hasAttribute('count')) {
                this.count = this.getAttribute('count')
            } else {
                this.setAttribute('count', 0)
            }
            //  ...add an event listener, too:
            this.querySelector('#counter-increment').addEventListener('click', () => {
                this.setAttribute('count', (parseInt(this.getAttribute('count'))+ 1) || 0) 
                console.log(this.getAttribute('count'))
            })

            // While we're at it, lets also take care of the styling. Style blocks in HTML imports have been
            // deprecated but there's a very simple workaround - we have reference to both the import document and the host, so: 
            document.head.appendChild(thisDocument.querySelector('style'))
        }
        
        attributeChangedCallback (attr, oldVal, newVal) {
            if (attr === 'count') {
                this.querySelector('#counter-count').textContent = newVal
            }
        }
        connectedCallback() {
           console.log(`Custom counter, initialized with count ${this.count}, at your service!`)
        }
    }
)
</script>
```
We can stuff all this in `custom-counter.html`.

To make use of it in another HTML file, we can use another nifty new feature - HTML imports:
```html
<link rel="import" href="source/to-your-file.html">
```
...and "invoke" it:
```html
<custom-counter></custom-counter>
```