### Define custom elements

As we know, ES6 introduced the `class` keyword to JavaScript.
Extending from the HTMLElement class, we can define elements with our own custom behaviour. Lets look at one such example:

```javascript
class MyComponent extends HTMLElement {
    //We have the following lifecycle events/hooks to work with:
    constructor () {
        super()
        //Here, we can set up event listeners:
        this.addEventListener('click', e => {
            console.log(e)
        })
    }
    connectedCallback () {
        console.log('I was inserted to the DOM!')
        //This one is equivalent to React's componentDidMount or Vue's mounted hook
    }
    disconnectedCallback () {
        console.log('I was removed from the DOM!')
    }
    adoptedCallback () {
        console.log('I was moved to another place in the DOM. It is cold and lonely here. Send help.')
        //This gets invoked when someone calls element.adoptNode, for example.
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        //this is called when an observed attribute is changed - see below
    }
    observedAttributes () {
        return ['disabled', 'is-banana']
    }
}
```

We can define our contract or DOM interface - including custom attributes - with getters and setters:
```javascript
class MyComponent extends HTMLElement {
    ...
    set disabled (value) {
        if (value) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled')
        }
    }
    get disabled () {
        return this.hasAttribute('disabled')
    }
}
```

We can register this element to the DOM as follows:
```javascript
window.customElements.define('my-component', MyElement)
```

Notes: 
* A custom element's name *must* contain a dash - `<round-banana>` is valid, `<square_apple>` or `<smalldogs>` is not
* Registering a tag with the same name more than once throws a DOMException. No take-backsies
* Custom elements can not be self-closing as that privilege is reserved to very few HTML elements
