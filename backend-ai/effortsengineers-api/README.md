# effortsengineers-api

Node.js + Express + PostgreSQL backend for the effortsengineers.in revamp.

## Setup

```bash
npm install
cp .env.example .env   # then fill in DATABASE_URL and JWT_SECRET
npm run db:init         # applies src/config/schema.sql to your database
npm run dev              # starts on http://localhost:5000 (nodemon)
```

Auth: send `Authorization: Bearer <token>` on any protected route. Tokens are
returned from `/api/auth/register` and `/api/auth/login`.

Roles: every user is `client` or `admin`. New accounts registered through the
API are always `client` — promote someone to `admin` directly in the
database (`UPDATE users SET role = 'admin' WHERE email = ...`).

## Endpoints

### Auth
| Method | Path | Auth | Body |
|---|---|---|---|
| POST | `/api/auth/register` | none | `{ name, email, password }` |
| POST | `/api/auth/login` | none | `{ email, password }` |

### Catalog (`/api/catalog`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/` | none | Query: `category`, `search`, `page`, `limit` |
| GET | `/:id` | none | |
| POST | `/` | admin | `{ sku, name, description, category, price, stock_quantity, image_url }` |
| PUT | `/:id` | admin | Any subset of the same fields |
| DELETE | `/:id` | admin | Soft delete (`is_active = false`) |

### Quotation (`/api/quotation`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/` | logged in | `{ items: [{ catalog_item_id, quantity }], notes }` — prices are looked up server-side |
| GET | `/` | logged in | Admin sees all, client sees their own |
| GET | `/:id` | logged in | Includes line items |
| PATCH | `/:id/status` | admin | `{ status: 'approved' \| 'rejected' \| 'converted' }` |

### Orders (`/api/orders`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/` | logged in | Admin sees all, client sees their own. Query: `status` |
| GET | `/:id` | logged in | Includes line items |
| PATCH | `/:id/status` | admin | `{ status: 'processing' \| 'shipped' \| 'delivered' \| 'cancelled' }` |

### Admin inventory (`/api/admin/inventory`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/` | admin | Current stock levels for every item |
| PATCH | `/:catalogItemId` | admin | `{ mode: 'set' \| 'adjust', quantity, reason? }` — every change is written to `inventory_logs` |

## Notes / next steps
- `orders` currently has no creation route — the natural flow is
  `quotation.status = 'converted'` triggering an order (add a small
  controller method for that when you build the conversion step).
- Add `express-validator` schemas per route if you want stricter input
  validation than the manual checks currently in each controller.
- All SQL uses parameterized queries (`$1`, `$2`, ...) to avoid injection.
