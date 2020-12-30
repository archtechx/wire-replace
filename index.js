/**
 * Add wire:replace functionality to Livewire.
 *
 * When wire:replace is applied to an element, the element's children will *always* be fully replaced rather than intelligently DOM-diffed.
 * When wire:replace.self is applied to an element, the element itself (plus all of its children) will be
 */

export default ['element.updating', (from,  to) => {
    let attributes = Object.values(from.attributes);

    if (attributes.filter(attribute => attribute.name === 'wire:replace').length) {
        from.innerHTML = to.innerHTML;
    }

    if (attributes.filter(attribute => attribute.name === 'wire:replace.self').length) {
        from.outerHTML = to.outerHTML;
    }
}];
