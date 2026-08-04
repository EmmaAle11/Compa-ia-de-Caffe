# pages/ — FSD layer 2

One slice per route. A page **composes** widgets, features and entities; it should read
like a layout, not like logic.

When a page grows a chunk of interactive behaviour with business meaning
(add to cart, filter the catalog), extract it into `features/` rather than letting the
page thicken.
