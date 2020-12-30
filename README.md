# wire-replace

This package adds a new directive to Livewire: `wire:replace`. The directive is useful for solving DOM diffing issues.

For example, if you have the following template:

```html
<div>
    Showing
    <span class="font-medium">{{ $paginator->firstItem() }}</span>
    to
    <span class="font-medium">{{ $paginator->lastItem() }}</span>
    of
    <span class="font-medium">{{ $paginator->total() }}</span>
    results
</div>
```

The numbers will eventually merge into a single value if you update the component's data a few times.

To solve this, you'd wrap all of those free-floating strings in `<span>`s. And sure, it would work here.

But:
- it's ugly
- it won't work in situations where you display template that you don't have control over (translated templates, rich text added by users, ...)

## Usage

This package adds two extremely simple directives: `wire:replace` and `wire:replace.self`. Simply use them on elements that you want fully replaced.

You can think if this directive as the opposite of `wire:ignore`. `wire:ignore` tells Livewire to **never** replace the element, and `wire:replace` tells Livewire to **always** replace the elemenet.

To tell Livewire that the element's children should always be replaced:
```html
<div wire:replace>
    Showing
    ...
</div>
```

To tell Livewire that **the element itself plus its children** should always be replaced:
```html
<div wire:replace.self>
    Showing
    ...
</div>
```

## Installation

### npm dependency
Install the package:
```
npm install --dev leanadmin@wire-replace
```

Register the directive in your `app.js` file:

```js
import wire_replace from '@leanadmin/wire-replace';

window.Livewire.hook(...wire_replace);
```

### CDN

Simply include the JS file in your layout (**after Livewire's scripts**) and the directive will automatically register itself.
```html
@livewireScripts

<script src="https://unpkg.com/@leanadmin/wire-replace@0.1.0/"></script>
```

## Performance

Livewire doesn't expose its internal morphdom class which would allow us to just tell morphdom to stop diffing the current tree if when it encounters an element with a `wire:replace` attribute.

So instead, we hook into Livewire's `element.updating` event and we replace the target element fully with the new element, before Livewire/morphdom can attempt more intelligent diffs.

This is likely less performant than hooking into morphdom's events, but in most cases it won't matter. The main use case of this package is small bits of templates where Livewire can't figure things out itself and `wire:key` doesn't help. And for that, it works completely smoothly.
