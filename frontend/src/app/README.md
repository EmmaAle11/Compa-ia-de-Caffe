# app/ — FSD layer 1

Application shell: the root component, providers (router, stores, error boundary) and
global styles. This is the only layer allowed to import from every other layer.

Nothing that renders a business screen lives here — that is `pages/`.
