# entities/ — FSD layer 5

Business nouns as the UI knows them: product, order, customer, cart, promotion.
Each slice holds its types, its API calls and its presentational card/badge components.

Mock data lives in `model/` until the real endpoints exist. An entity must not import a
feature, a widget or a page.
