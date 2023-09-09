# Next App with Supabase and Drizzle

This is a personal project where I explore how I can use supabase with drizzle to create an app super quickly.

The aim is also to create a type-safe api (as much as that can be done with a REST api).

**Why not use tRPC?**
I don't like how the support for it is in the app router. Still needs a bit more time to cook.

**Why not use graphql?**
Good question. Maybe in the next PoC.

---

## Supabase

Supabase acts as the database (postgres), auth, storage, and even subscription management.

---

## Drizzle

Drizzle connects to the database and provides schemas along with typesafety.
