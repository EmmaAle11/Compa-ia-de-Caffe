# shared/ — FSD layer 6

Reusable primitives with no business meaning: the API client, UI kit, hooks, config,
types, assets.

The bottom layer. It may import nothing from the layers above it. If a helper here
mentions coffee, roast level or checkout, it belongs in `entities/` or `features/`.
