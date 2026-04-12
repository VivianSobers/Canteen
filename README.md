# Canteen

A full-stack food ordering app built for PES University. Students can browse the canteen menu, add items to cart, and complete payments through a secure checkout flow.

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
| Web Server | nginx |
| CI/CD | GitHub Actions |

---

## Architecture

The app is split into two services — a React frontend served via nginx, and a Node/Express REST API connected to MongoDB Atlas. Both services are containerized with Docker and can be orchestrated locally using Kubernetes. GitHub Actions handles automated builds on every push to main.

---

## Getting Started

**Prerequisites:** Node.js v18+, Docker Desktop

**Run with Docker Compose**
```bash
docker-compose up --build
```
App runs at `http://localhost`.

**Run without Docker**
```bash
# Frontend
npm install
npm run dev

# Backend — open a new terminal
cd backend
npm install
node server.js
```

Frontend at `http://localhost:5173`, API at `http://localhost:5001`.

---

## Kubernetes

```bash
# Deploy locally
kubectl apply -f k8s/

# Check running pods
kubectl get pods
```

Runs 2 replicas each of the frontend and backend for high availability.

---

## Environment Variables

Create `backend/.env`:
```env
PORT=5001
MONGO_URL=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Create `.env` at project root:
```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

Never commit `.env` files — both are covered in `.gitignore`.

---

## Test Payment
