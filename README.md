
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=venom&height=320&text=CANTEEN&fontSize=100&color=0:0d0d1a,30:1a1040,60:0f0730,100:160d3d&fontColor=c4b5fd&animation=fadeIn&stroke=7c3aed&strokeWidth=2&fontAlignY=50" />
</p>

<p align="center">
  <img src="svg/badge-version.svg" />
  &nbsp;
  <img src="svg/badge-license.svg" />
  &nbsp;
  <img src="svg/badge-build.svg" />
  &nbsp;
  <img src="svg/badge-docker.svg" />
</p>

<br/>

> **Canteen** is a full-stack food ordering web application.  
> Students browse the menu, add to cart, and check out via a secure Stripe-powered flow.  
> Two containerised services — a React frontend served via nginx, and a Node/Express REST API backed by MongoDB Atlas — orchestrated with Kubernetes and deployed automatically via GitHub Actions.

<br/>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=soft&height=2&color=0:7c3aed,50:818cf8,100:6d28d9" />
</p>

---

## ◈ Stack

<p align="center">
  <img src="svg/react.svg" width="48" title="React 19" />
  &nbsp;&nbsp;
  <img src="svg/nodejs.svg" width="48" title="Node.js" />
  &nbsp;&nbsp;
  <img src="svg/javascript.svg" width="48" title="JavaScript" />
  &nbsp;&nbsp;
  <img src="svg/mongodb.svg" width="48" title="MongoDB Atlas" />
  &nbsp;&nbsp;
  <img src="svg/stripe.svg" width="48" title="Stripe" />
  &nbsp;&nbsp;
  <img src="svg/docker.svg" width="48" title="Docker" />
  &nbsp;&nbsp;
  <img src="svg/kubernetes.svg" width="48" title="Kubernetes" />
  &nbsp;&nbsp;
  <img src="svg/vite.svg" width="48" title="Vite 7" />
  &nbsp;&nbsp;
  <img src="svg/express.svg" width="48" title="Express" />
  &nbsp;&nbsp;
  <img src="svg/nginx.svg" width="48" title="nginx" />
  &nbsp;&nbsp;
  <img src="svg/github-actions.svg" width="48" title="GitHub Actions" />
</p>

<br/>

| Layer | Technology |
|:--|:--|
| 🎨 &nbsp;Frontend | React 19 · React Router DOM 7 · Vite 7 |
| ⚙️ &nbsp;Backend | Node.js · Express REST API |
| 🗄️ &nbsp;Database | MongoDB Atlas |
| 💳 &nbsp;Payments | Stripe |
| 🐳 &nbsp;Containers | Docker · Docker Compose |
| ☸️ &nbsp;Orchestration | Kubernetes (×2 replicas each service) |
| 🌐 &nbsp;Web Server | nginx (reverse proxy + static serve) |
| 🔄 &nbsp;CI/CD | GitHub Actions → GitHub Pages |

---

## ◈ Tech Breakdown

<p align="center">
  <img src="svg/chart-stack.svg" />
</p>

---

## ◈ Architecture

<p align="center">
  <img src="svg/diagram-architecture.svg" />
</p>

---

## ◈ CI/CD Pipeline

<p align="center">
  <img src="svg/diagram-cicd.svg" />
</p>

---

## ◈ Run It

### ⚡ Docker Compose *(one command)*

```bash
docker-compose up --build
```

Serves the full stack at **http://localhost**

### 🔧 Without Docker

```bash
# Terminal 1 — Frontend
npm install && npm run dev            # → http://localhost:5173

# Terminal 2 — Backend
cd backend && npm install && node server.js    # → http://localhost:5001
```

---

## ◈ Kubernetes

```bash
kubectl apply -f k8s/      # deploy 2 replicas of each service
kubectl get pods            # verify they're running
```

---

## ◈ Environment Variables

**`backend/.env`**
```env
PORT=5001
MONGO_URL=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
```

**`.env`** *(project root)*
```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

> Neither file is committed — both listed in `.gitignore`

---

## ◈ Test Payment

```
Card    4242 4242 4242 4242
Expiry  12/28
CVC     123
```

---

## ◈ Project Structure

```
Canteen/
├── .github/workflows/           ← CI/CD pipeline
├── backend/
│   └── server.js                ← Express REST API
├── k8s/
│   ├── backend-deployment.yaml
│   └── frontend-deployment.yaml
├── svg/                         ← icons, badges, charts
├── src/
│   ├── App.jsx
│   └── main.jsx
├── Dockerfile                   ← Frontend container
├── docker-compose.yml
└── nginx.conf
```

---

## ◈ License

Apache 2.0 — see [`LICENSE`](./LICENSE)

<br/>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=140&color=0:0d0d1a,40:1a1040,100:0f0730&section=footer&fontSize=20&fontColor=7c3aed&animation=fadeIn" />
</p>
