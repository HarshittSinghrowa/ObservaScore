# 👁️ ObservaScore — Observability Score Calculator

**Student Name:** Harshitt Singhrowa
**Registration No:** 23FE10CSE00838
**Course:** CSE3253 DevOps [PE6]
**Semester:** VI (2025-2026)
**Project Type:** Monitoring & Observability Tool
**Difficulty:** Intermediate

---

## 📌 Project Overview

### Problem Statement
Modern software systems are complex and distributed. Teams often lack a standardised way to measure **how well their systems can be monitored, debugged, and understood**. Without a quantified observability score, critical gaps in logging, metrics, tracing, alerting, and dashboards go undetected until incidents occur.

### Objectives
- [x] Build a full MERN stack web application for quantifying observability
- [x] Implement a weighted scoring engine across 5 observability pillars
- [x] Provide actionable recommendations based on assessment results
- [x] Store historical assessments in MongoDB for trend tracking
- [x] Containerise the application with Docker and Docker Compose
- [x] Set up CI/CD pipeline with Jenkins and GitHub Actions
- [x] Configure Kubernetes manifests for production deployment
- [x] Implement monitoring with Nagios

### Key Features
- 🧮 **Interactive Calculator** — Check criteria across 5 pillars with live score preview
- 📊 **Analytics Dashboard** — Charts for score trends, grade and maturity distribution
- 📜 **Assessment History** — Paginated history with filtering and delete support
- 🏆 **Maturity Levels** — Bronze → Silver → Gold → Platinum rating system
- 💡 **Recommendations** — Auto-generated actionable improvement tips
- 🐳 **Fully Dockerised** — One-command startup with `docker-compose up`
- 🔁 **CI/CD Pipelines** — Jenkins + GitHub Actions with multi-stage builds

---

## 🛠️ Technology Stack

### Core Technologies
| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Recharts, Axios |
| Backend | Node.js 18, Express.js 4 |
| Database | MongoDB 6 (Mongoose ODM) |
| Styling | Pure CSS with CSS Variables (dark theme) |

### DevOps Tools
| Tool | Purpose |
|---|---|
| Git | Version control (GitHub) |
| Docker / Docker Compose | Containerisation |
| Kubernetes | Container orchestration |
| Jenkins | CI/CD pipeline automation |
| GitHub Actions | Cloud-based CI/CD |
| Nagios | System & service monitoring |
| Puppet | Configuration management |
| Terraform | Infrastructure as Code (AWS) |

---

## 🚀 Getting Started

### Prerequisites
- [ ] Docker Desktop v20.10+
- [ ] Docker Compose v2.0+
- [ ] Git 2.30+
- [ ] Node.js 18+ (for local development only)

### Quickstart with Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/harshittsinghrowa/devops-project-observascore.git
cd devops-project-observascore

# 2. Copy environment file
cp .env.example .env

# 3. Start all services
docker-compose up --build

# 4. Access the app
# Frontend:  http://localhost:3000
# Backend:   http://localhost:5000
# API Health: http://localhost:5000/api/health
# Nagios:    http://localhost:8081
```

### Local Development (Without Docker)

```bash
# Terminal 1 — Start MongoDB
mongod --dbpath ./data/db

# Terminal 2 — Start Backend
cd src/main/backend
npm install
npm run dev

# Terminal 3 — Start Frontend
cd src/main/frontend
npm install
npm start
```

---

## 📁 Project Structure

```
devops-project-observascore/
├── README.md
├── .gitignore
├── .env.example
├── docker-compose.yml
│
├── src/
│   └── main/
│       ├── backend/                  Express API
│       │   ├── server.js
│       │   ├── models/Score.js
│       │   ├── routes/
│       │   │   ├── scoreRoutes.js
│       │   │   ├── historyRoutes.js
│       │   │   └── healthRoutes.js
│       │   └── middleware/validation.js
│       └── frontend/                 React App
│           └── src/
│               ├── App.js
│               ├── components/
│               │   ├── Navbar.js
│               │   ├── PillarCard.js
│               │   └── ScoreGauge.js
│               ├── pages/
│               │   ├── Home.js
│               │   ├── Calculator.js
│               │   ├── Results.js
│               │   ├── History.js
│               │   └── Dashboard.js
│               └── utils/
│                   ├── api.js
│                   └── pillarsConfig.js
│
├── infrastructure/
│   ├── docker/
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.frontend
│   │   ├── nginx.conf
│   │   └── mongo-init.js
│   ├── kubernetes/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── configmap.yaml
│   ├── puppet/observascore.pp
│   └── terraform/main.tf
│
├── pipelines/
│   ├── Jenkinsfile
│   └── .github/workflows/ci-cd.yml
│
├── tests/
│   ├── unit/
│   │   ├── api.test.js
│   │   └── scoreCalculation.test.js
│   └── integration/
│
└── monitoring/
    ├── nagios/observascore.cfg
    └── alerts/alert-rules.yml
```

---

## 🔧 API Documentation

### Base URL
`http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Service health check |
| POST | `/score/calculate` | Calculate & save score |
| GET | `/score/:id` | Get score by ID |
| DELETE | `/score/:id` | Delete a score |
| GET | `/history` | Paginated history |
| GET | `/history/stats/summary` | Aggregate statistics |

### POST `/score/calculate` — Request Body
```json
{
  "projectName": "user-auth-service",
  "environment": "production",
  "pillars": [
    {
      "name": "Logging",
      "weight": 25,
      "criteria": [
        { "label": "Structured JSON logging", "points": 20, "value": true }
      ]
    }
  ]
}
```

---

## 📊 Scoring Model

| Pillar | Weight |
|--------|--------|
| Logging | 25% |
| Metrics | 25% |
| Tracing | 20% |
| Alerting | 15% |
| Dashboards | 15% |

| Score | Grade | Maturity |
|-------|-------|----------|
| 90–100 | A | 🏆 Platinum |
| 75–89 | B | 🥇 Gold |
| 60–74 | C | 🥈 Silver |
| 40–59 | D | 🥉 Bronze |
| 0–39 | F | 🥉 Bronze |

---

## 🔁 CI/CD Pipeline

### Pipeline Stages
1. **Checkout** — Pull latest code from GitHub
2. **Lint** — ESLint checks for backend and frontend (parallel)
3. **Test** — Unit + integration tests with coverage report
4. **Build** — Docker image build for backend and frontend
5. **Security Scan** — Trivy vulnerability scan on Docker images
6. **Push** — Push images to Docker Hub registry
7. **Deploy Staging** — `docker-compose up` on staging server
8. **Deploy Production** — `kubectl apply` with manual approval

![Pipeline Status](https://img.shields.io/badge/pipeline-passing-brightgreen)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![Kubernetes](https://img.shields.io/badge/kubernetes-configured-326CE5)

---

## 🐳 Docker & Kubernetes

```bash
# Build images individually
docker build -f infrastructure/docker/Dockerfile.backend -t observascore-backend ./src/main/backend
docker build -f infrastructure/docker/Dockerfile.frontend -t observascore-frontend ./src/main/frontend

# Kubernetes deployment
kubectl apply -f infrastructure/kubernetes/
kubectl get pods,svc,deploy -n observascore
kubectl rollout status deployment/observascore-backend -n observascore
```

---

## 🧪 Testing

```bash
# Backend unit tests
cd src/main/backend && npm test

# Backend with coverage
cd src/main/backend && npm test -- --coverage

# Frontend tests
cd src/main/frontend && CI=true npm test
```

### Test Coverage Target: > 80%

---

## 📈 Performance Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| Build Time | < 5 min | Docker multi-stage build |
| API Response Time | < 200ms | Express + MongoDB |
| Test Coverage | > 80% | Jest + Supertest |
| Deployment Frequency | Daily | GitHub Actions trigger |
| MTTR | < 30 min | Nagios + alert runbooks |

---

## 🔒 Security

- [x] Helmet.js security headers
- [x] CORS configuration
- [x] Rate limiting (100 req/15 min)
- [x] Input validation middleware
- [x] Non-root Docker user
- [x] Trivy vulnerability scanning in CI
- [x] Environment-based secrets (`.env`)

---

## 🏆 Self-Assessment

| Criteria | Max Marks | Self Score | Remarks |
|----------|-----------|------------|---------|
| Implementation | 4 | 4 | Full MERN stack, all features working |
| Documentation | 3 | 3 | Comprehensive README, API docs, design doc |
| Innovation | 2 | 2 | Live score preview, radar chart, maturity levels |
| Presentation | 1 | 1 | Clear demo video and walkthrough |
| **Total** | **10** | **10** | |

### Project Challenges
1. **MongoDB connection in Docker** — Fixed using Docker Compose service names and health checks
2. **React Router + Nginx** — Resolved with `try_files` directive for SPA routing
3. **Weighted score calculation** — Implemented normalized weighted average across pillar weights

### Learnings
- Full MERN stack development and REST API design
- Docker multi-stage builds for optimised production images
- Kubernetes deployments with health probes and rolling updates
- CI/CD pipeline construction with Jenkins and GitHub Actions
- Monitoring setup with Nagios and alert rule configuration

---

## 📄 License
MIT License — Harshitt Singhrowa (23FE10CSE00838)

## 👤 Author
**Harshitt Singhrowa**
Registration No: 23FE10CSE00838
Course: CSE3253 DevOps [PE6], Semester VI (2025-2026)
