### Slots and composing components

The templates you write can not just encapsulate implementation details, they can also define how to render the markup written by your consumer.

Lets consider the template for a simple business card type component:

```jsx
<template id="profile-card">
    <div class="card">
        <!-- Here we have a named slot with content to fall back to in case the consumer does not pass it anything -->
        <div class="image">
                <slot name="image">
                    <img src="profile-picture.png" class="card-image">
                </slot>
        </div>
        <div class="name">
            <!-- Here's a named slot without fallback content -->
            <slot name="name"> </slot>
        </div>
        <div class="description">
            <!-- Here's the "default" slot - this falls back to elements children. Only the first default slot will be used. -->
            <slot>
                This user has not written anything about themselves. For now.
            </slot>
        </div>
    </div>
</template>
```

Of course, you can slot webcomponents into other webcomponents as well.

#### Styling shadowdom and slot

```css
:root {
    Here, you can style the component the webcomponent will be mounted in.
}    
:host {
    ..and :host(:hover), :host([disabled]) or other selectors target shadow-host and allow encapsulation of style corresponding to state (expressed by props).
    For example, if we want the component to be transparent when the disabled attribute is set, we can
    :host([disabled]) {
        opacity: 0.7;
    }
}
:host-context(selector) will match if *ANY* of its ancestors matches selector. If you were to assign a "theme" class to document body and use a webcomponent somewhere in the body, you can match with
:host-context(.my-awesome-theme) {
    background-color: purple;
}

::slotted(selector) can be used to match nodes that have been populated into a slot, eg. you can override slot fonts with

.description::slotted(*) {
    font-family: Roboto arial;
}
```

Note that you can also style the shadowdom from the outside by targeting your custom tag name:

profile-card {
    background-color: tomato;
}