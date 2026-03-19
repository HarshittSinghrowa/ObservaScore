# ObservaScore — User Guide

**Author:** Harshitt Singhrowa | **Reg No:** 23FE10CSE00838

---

## Getting Started

### Step 1 — Launch the App
Start with Docker Compose:
```bash
docker-compose up --build
```
Open your browser at **http://localhost:3000**

---

## Running an Assessment

### Step 2 — Go to Calculator
Click **Calculator** in the top navigation bar.

### Step 3 — Enter Project Details
- **Project / Service Name** — e.g. `user-auth-service`
- **Environment** — Development, Staging, or Production

### Step 4 — Check Criteria
Five pillars are shown: Logging, Metrics, Tracing, Alerting, and Dashboards.
For each pillar, tick the criteria that your system currently satisfies.

> 💡 The **Live Score Preview** panel on the right updates in real time as you check items.

### Step 5 — Calculate Score
Click **🚀 Calculate Score**. Your results are saved and you are redirected to the Results page.

---

## Reading Your Results

### Overall Score & Grade
- A large gauge shows your score (0–100)
- A letter grade (A–F) and maturity level (Bronze to Platinum) are shown

### Pillar Breakdown
Each pillar shows its individual score and which criteria passed (✅) or failed (❌).

### Recommendations
Automatically generated suggestions for your lowest-scoring pillars.

---

## Dashboard

The Dashboard shows aggregate analytics across all assessments:
- Total assessments, average score, highest and lowest scores
- Score trend line chart
- Grade distribution bar chart
- Maturity level pie chart

---

## History

View all past assessments with filtering by environment, pagination, and the ability to delete records.
Click **View** on any row to see the full results for that assessment.

---

## API Access

The backend REST API is available at `http://localhost:5000/api`.
See `docs/api-documentation.md` for full endpoint reference.
