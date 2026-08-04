# config/

Environment parsing and validation. `env.schema.ts` is the **only** place the process
reads `process.env`; everything else injects `ConfigService<Env, true>`.

A variable that is not in the schema does not exist. Adding one to `.env.example`
without adding it here means it will be silently ignored.
