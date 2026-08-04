# shared/

Cross-cutting **technical** concerns, available to every module: domain-event dispatch,
structured logging, observability (Sentry / PostHog), resilience helpers.

This is not a dumping ground. If something here knows what an Order is, it is in the
wrong folder — move it into that context or into `kernel/`.
