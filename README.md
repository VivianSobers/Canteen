# Canteen

A full-stack food ordering app built for PES University. Students can browse
the canteen menu, add items to cart, and complete payments through a secure
checkout flow.

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

The app runs as two independent services. The React frontend is built with
Vite and served via nginx. The Node/Express backend exposes a REST API
connected to MongoDB Atlas for storing orders and user data. Both services
are containerized with Docker and can be orchestrated locally using
Kubernetes. GitHub Actions automates builds and deployment on every push
to main.

---

## Getting Started

Prerequisites: Node.js v18+, Docker Desktop

**Run with Docker Compose**

```bash
docker-compose up --build
```

App runs at http://localhost.

**Run without Docker**

```bash
# Terminal 1 — Frontend
npm install
npm run dev

# Terminal 2 — Backend
cd backend
npm install
node server.js
```

Frontend runs at http://localhost:5173 and the API at http://localhost:5001.

---

## Kubernetes

```bash
# Deploy
kubectl apply -f k8s/

# Verify pods are running
kubectl get pods
```

Deploys 2 replicas each of the frontend and backend.

---

## Environment Variables

Create `backend/.env`:

```
PORT=5001
MONGO_URL=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Create `.env` at the project root:

```
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

Neither file should be committed. Both are covered in `.gitignore`.

---

## Test Payment

Use the following Stripe test card at checkout:

```
Card number  4242 4242 4242 4242
Expiry       12/28
CVC          123
```

---

## Project Structure

```
Canteen/
├── .github/workflows/      CI/CD pipeline
├── backend/                Node.js + Express REST API
│   └── server.js
├── k8s/                    Kubernetes manifests
│   ├── backend-deployment.yaml
│   └── frontend-deployment.yaml
├── src/                    React frontend
│   ├── App.jsx
│   └── main.jsx
├── Dockerfile              Frontend container
├── docker-compose.yml      Local multi-service orchestration
└── nginx.conf              Reverse proxy configuration
```

---

## CI/CD

GitHub Actions triggers on every push to main. It builds and validates both
services, then deploys the frontend to GitHub Pages automatically.

---

## License

MIT
