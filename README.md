# E-Commerce Store — Frontend + Backend

A full-stack e-commerce app built with **React + Redux Toolkit** (Vite) and **Node.js + Express + Sequelize (PostgreSQL)**.  
Deployed to **Render** as a Static Site (frontend) and a Web Service (backend).

---

## Live URLs

- **Frontend (Static Site):**  
  https://e-commerce-websitestore-management-back-cp8j.onrender.com

- **Backend (API):**  
  https://e-commerce-websitestore-management-back.onrender.com

> SPA rewrite is enabled on the frontend (`/* → /index.html`), so routes like `/admin`, `/admin/orders`, etc. work directly.

---

## Tech Stack

- **Client:** React, Redux Toolkit, React Router, Vite, plain CSS (responsive, CSS variables, hover states)
- **Server:** Node.js, Express 5, Sequelize, PostgreSQL, CORS
- **DB:** PostgreSQL (Render)
- **Deploy:** Render (Static Site + Web Service)

---

## Repository Structure

📂 Project Structure

├─ client/                     # React app (Vite)
│  ├─ public/                   # Static assets (put _redirects here)
│  └─ src/
│     ├─ admin/                 # Admin pages (Orders, Messages, ManageProducts, AddProduct, Dashboard)
│     ├─ components/            # Navbar, Footer, ProductCard, etc.
│     ├─ features/              # Redux slices (cartSlice, messagesSlice, ordersSlice, productSlice)
│     └─ pages/                 # Landing, Shop, About, Cart, NotFound
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ store.js
│  ├─ style.css
│  ├─ variables.css
│  ├─ .env                      # Environment variables (local)
│  ├─ package.json
│  ├─ package-lock.json
│  └─ vite.config.js
│
└─ server/                      # Express API
   ├─ models/                   # Sequelize models
   │  ├─ Message.js
   │  ├─ Order.js
   │  └─ Product.js
   ├─ routes/                   # API routes
   │  ├─ messagesRoutes.js
   │  ├─ ordersRoutes.js
   │  └─ productsRoutes.js
   ├─ app.js                    # Express app config (CORS, routes, error handlers)
   ├─ db.js                     # Sequelize connection
   ├─ seedProducts.js           # Seeder script
   ├─ server.js                 # Server start script
   ├─ .env                      # Environment variables (local)
   ├─ package.json
   └─ package-lock.json



---

## Local Development

> Local dev uses **5173** (Vite) and **10000** (Express).  
> Run **both** client and server.

### 1) Clone & Install

```bash
git clone <YOUR_REPO_URL>
cd <repo-root>

cd server
npm install
# create server/.env (see below)
npm run dev         # nodemon on http://localhost:10000

cd ../client
npm install
# create client/.env (see below)
npm run dev         # Vite on http://localhost:5173



2) Environment Variables (local)

server/.env
    FRONTEND_URL=https://e-commerce-websitestore-management-back-cp8j.onrender.com
    PORT=10000
    DATABASE_URL=postgresql://<user>:<password>@<host>/<db>

client/.env
    VITE_API_URL=http://localhost:10000


3) Quick Checks (local)

Frontend: http://localhost:5173
Health: http://localhost:10000/api/health → {"ok":true}
In DevTools → Network, product requests should go to:
    http://localhost:10000/api/products   (Status 200)



Production (Render):
  Frontend (Static Site):
   Env: VITE_API_URL=https://e-commerce-websitestore-management-back.onrender.com
   
   Redirects/Rewrites:
    /* → /index.html (Rewrite, Status 200) — required for React Router.
    After env changes: Manual Deploy → Clear build cache & Redeploy.

  Backend (Web Service):
    Env: DATABASE_URL=<your Render Postgres URL>
    NODE_ENV=production
    Do not set PORT; Render injects it.

  CORS (in server/app.js) allows:
    https://e-commerce-websitestore-management-back-cp8j.onrender.com
    http://localhost:5173
    
API Overview
    GET /api/health → status
    GET /api/products → list (search/filter/sort if implemented)
    POST /api/products → create (admin)
    PUT /api/products/:id → update (admin)
    DELETE /api/products/:id → delete (admin)
    GET /api/orders / DELETE /api/orders/:id → admin
    GET /api/messages / DELETE /api/messages/:id → admin
  Client requests always use import.meta.env.VITE_API_URL as the base URL.

Admin (Client Routes)
   /admin (dashboard)
   /admin/orders (list + delete)
   /admin/messages (list + delete)
   /admin/products (list, edit, delete)
   /admin/add-product (create)

Styling Requirements (Frontend)
   Plain CSS only (no Bootstrap/SASS)
   Cohesive color palette & typography (CSS variables)
   Responsive layout (Grid/Flex)
   Hover states for interactive elements

Scripts
  server
     npm run dev      # nodemon server.js (development)
     node server.js   # run once
  client
    npm run dev      # start Vite dev server
    npm run build    # production build
    npm run preview  # preview built site locally

Troubleshooting:
404 at /admin
Missing SPA rewrite. Add /* → /index.html (200) in frontend settings or place _redirects in client/public/:
    /*    /index.html    200

CORS: “No 'Access-Control-Allow-Origin' header…”
Ensure the frontend domain is in the CORS allow-list in server/app.js, and the client calls VITE_API_URL.

Vite still uses old API URL
On Render Static Site, you must Clear build cache when changing VITE_API_URL.

TypeError: The "url" argument must be of type string
DATABASE_URL is missing/undefined. Set it in server/.env (local) or Render env (production).

License
MIT







