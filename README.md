# Canteen

A full-stack food ordering app built for PES University. Browse the menu, add items to cart, and pay securely with Stripe.

**Live site:** https://VivianSobers.github.io/Canteen/

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router DOM 7, Vite 7 |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| Payments | Stripe |
| Containerization | Docker, Docker Compose |
| Orchestration | Kubernetes |
| CI/CD | GitHub Actions |
| Web Server | nginx |

---

## Running Locally

**Prerequisites:** Node.js v18+, npm v9+

**With Docker Compose (recommended)**
```bash
docker-compose up --build
```
App runs at `http://localhost`.

**Without Docker**
```bash
# Frontend
npm install
npm run dev

# Backend (new terminal)
cd backend
npm install
node server.js
```

Frontend at `http://localhost:5173`, API at `http://localhost:5001`.

---

## Kubernetes

```bash
# Deploy
kubectl apply -f k8s/

# Check pods
kubectl get pods
```

Deploys 2 replicas each of the frontend and backend.

---

## Environment Variables

Create `backend/.env`:

```env
PORT=5001
MONGO_URL=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Create `.env` at root:

```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

Never commit `.env` files. Both are in `.gitignore`.

---

## Test Payment

Use Stripe test card details:
