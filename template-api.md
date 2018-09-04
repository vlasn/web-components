### HTML Templates

You can consider templates an inert set of HTML. A template tag can have more than one immediate child:

```jsx
<template id="my-template">
    <div> I am a counter: <span>0</span></div>
</template>
```

We can import templates with `document.importNode`.

Consider the following example (where we're using the dom itself as state):
```jsx
<button onclick="increment()">Click me!</button>
<div id="root"></div>

<script>
    const increment = () => {
        console.log('incrementing!')
        //Grabbing a reference to the template:
        var content = document.querySelector('template').content;
        // Updating count in template. Templates are mutable by default. Feel free to make a copy with element.cloneNode(true).
        var span = content.querySelector('span');
        span.textContent = parseInt(span.textContent) + 1;
        //importing newly updated template and appending it to #root
        document.querySelector('#root').appendChild(document.importNode(content, true));
    }
</script>

<template id="my-template">
    <div> I am a counter: <span>0</span></div>
</template>
```

As you may have guessed, this implies we can create our own template functions. This one doesn't mutate the base template:

```javascript
const createCounterLine = (count) => {
    const baseTemplate = document.querySelector('#my-template')
    const newTemplate = baseTemplate.cloneNode(true)
    newTemplate.content.querySelector('span').textContent = count
    return newTemplate.content
}
```