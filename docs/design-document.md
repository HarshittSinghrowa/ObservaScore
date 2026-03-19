# ObservaScore — Technical Design Document

**Author:** Harshitt Singhrowa | **Reg No:** 23FE10CSE00838
**Course:** CSE3253 DevOps [PE6] | **Date:** 2025-2026

---

## 1. System Architecture

ObservaScore follows a 3-tier MERN architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Tier                          │
│   React 18 SPA  (Nginx container, port 3000)               │
│   Pages: Home | Calculator | Results | Dashboard | History  │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/JSON (REST API)
┌─────────────────────▼───────────────────────────────────────┐
│                       Application Tier                       │
│   Express.js API  (Node 18 container, port 5000)            │
│   Routes: /score | /history | /health                       │
│   Middleware: Helmet | CORS | Rate Limit | Validation       │
└─────────────────────┬───────────────────────────────────────┘
                      │ Mongoose ODM
┌─────────────────────▼───────────────────────────────────────┐
│                        Data Tier                            │
│   MongoDB 6  (container, port 27017)                        │
│   Collection: observascores                                 │
└─────────────────────────────────────────────────────────────┘
```

## 2. Scoring Engine Design

The scoring engine uses a **weighted pillar model**:

```
Overall Score = Σ (pillar_score × pillar_weight) / Σ weights

Pillar Score  = (earned_points / total_points) × 100
```

### Pillars and Weights
| Pillar | Weight | Rationale |
|--------|--------|-----------|
| Logging | 25% | Foundation of all observability |
| Metrics | 25% | Core for capacity and SLO tracking |
| Tracing | 20% | Critical for distributed systems |
| Alerting | 15% | Incident response readiness |
| Dashboards | 15% | Team visibility and access |

## 3. Data Model

```javascript
ObservaScore {
  projectName: String (required)
  environment: Enum[development, staging, production]
  pillars: [{
    name: String,
    weight: Number,
    score: Number (0-100),
    criteria: [{ label, value, points }]
  }]
  overallScore: Number (0-100)
  grade: Enum[A, B, C, D, F]
  maturityLevel: Enum[Bronze, Silver, Gold, Platinum]
  recommendations: [String]
  createdAt: Date
  updatedAt: Date
}
```

## 4. Frontend Architecture

- **React Router v6** for client-side navigation
- **Component hierarchy:** App → Navbar + Pages → Shared Components
- **State management:** Local React state (no Redux needed for this scope)
- **API layer:** Axios instance in `utils/api.js` with interceptors
- **Charts:** Recharts (Radar, Bar, Line, Pie)

## 5. Security Design

- HTTP security headers via Helmet.js
- Rate limiting: 100 requests per 15 minutes per IP
- Input sanitisation and validation middleware before DB write
- Non-root user inside Docker containers
- Secrets via environment variables, never hardcoded

## 6. CI/CD Flow

```
Push to GitHub
     │
     ▼
GitHub Actions: Lint → Test → Build Docker → Scan (Trivy)
     │
     ├── develop branch → Deploy to Staging (docker-compose)
     │
     └── main branch → Manual Approval → Deploy to K8s
```

## 7. Deployment Topology (Kubernetes)

- **Namespace:** observascore
- **Backend:** 2 replicas, ClusterIP service, liveness + readiness probes
- **Frontend:** 2 replicas, LoadBalancer service
- **MongoDB:** 1 replica, PersistentVolumeClaim (5Gi)
- **ConfigMap:** Non-sensitive env vars
- **Secret:** MONGO_URI (base64 encoded)
