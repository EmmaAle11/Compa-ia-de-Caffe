# features/ — FSD layer 4

One slice per **user interaction that carries business value**: add-to-cart,
filter-catalog, process-checkout, contact-form, admin-auth.

Each slice owns its `ui/`, `model/` (state) and `api/` segments — created when there is
code to put in them, not before. A feature may use entities and shared; never another
feature, and never a widget or page.
