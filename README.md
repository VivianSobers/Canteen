# 🍽️ Canteen — Smart Campus Food System

> A full-stack canteen management app for PES University, containerized with Docker and orchestrated with Kubernetes.

## 🚀 Tech Stack
- React + Vite (Frontend)
- Node.js + Express (Backend)
- MongoDB Atlas (Database)
- Stripe (Payments)
- Docker + Kubernetes (Deployment)
- GitHub Actions (CI/CD)

## 🐳 Run Locally
```bash
docker-compose up --build
```

## ☸️ Deploy to Kubernetes
```bash
kubectl apply -f k8s/
```

## 💳 Test Payment
Use Stripe test card: `4242 4242 4242 4242` | Expiry: `12/28` | CVC: `123`
