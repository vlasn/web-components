### Custom events and interchanging data

You can use attributes to pass data in string form or properties (by creating a reference to the element first) via javascript - this also supports more complex datatypes such as objects and arrays.

Pass data back to parent via events:
```
class extends HTMLElement {
    ...
    emitMyCustomEvent () {
        this.dispatchEvent(new CustomEvent('eventName', {
            bubbles: true,
            detail: {
                yourCustomdata: 'is here!'
            }
        }));
    }
}
```