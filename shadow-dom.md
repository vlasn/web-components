### Shadow DOM

Shadow DOM is a (mostly) miniature, scoped DOM tree that is attached to an element but resides separately from that element's children. The tree in question is called the shadow tree and the element it is attached to is called shadow host.
Code added to the shadows (html, scripts, style) becomes local to its host.

You can create a shadow root (the fragment of a document you attach to the shadow host) by calling `element.attachShadow`:
```javascript
// example courtesy of Google dev docs
const header = document.createElement('header');
const shadowRoot = header.attachShadow({mode: 'open'});
shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>'; // Could also use appendChild(), adoptElement or other DOM API-s.

// header.shadowRoot === shadowRoot
// shadowRoot.host === header
```

Not all elements can be shadow hosts - `input` and `textarea` already host shadow trees, for example. The full list of eligible elements can be found in the [web components v1 spec](http://w3c.github.io/webcomponents/spec/shadow/#h-methods)

Since everything in the shadow dom is scoped, it is useful for creating webcomponents.
Webcomponents are able to attach a shadow root to themselves:

```javascript
// Example courtesy of Google dev docs, yet again
class ShadyAF extends HTMLElement {
    constructor () {
        super()
        const shadowRoot = this.attachShadow({mode: 'open'})
        // Style block below is strictly scoped to the shadowdom:
        shadowRoot.innerHTML = `
        <style>...</style>
        <div class="shady-af">...</div>
        `
    }
    ...
}
```
This is objectively awesome when paired with HTML templates and imports. See sample SFC:

```html
<template id="shady">
    <div>
        <h1>Be mindful of what lurks in the shadows.</h1>
    </div>
</template>

<style>
    h1 {
        color: purple;
    }
</style>

<script>
    class Shady extends HTMLElement {
        constructor () {
            super ()
            const importDoc = document.currentScript.ownerDocument
            this.attachShadow({mode: 'open'})
            // As we attached a shadowroot to `this` directly, we don't need to keep a reference to shadowRoot
            // in a separate variable and have access to it via `this`
            this.shadowRoot.appendChild(importDoc.querySelector('style'))
            const content = importDoc.querySelector('template#shady').content
            this.shadowRoot.appendChild(content)
        }
    }
    window.customElements.define('shady-element', Shady)
</script>
```
