# presentation/

Driving adapters that belong to **no** bounded context — health checks, and later the
global exception filter and auth guards.

A controller for a business capability does not live here; it lives in that context's
own `presentation/` folder. If you are unsure which applies, ask whether the endpoint
would disappear when the context does. If yes, it belongs to the context.
