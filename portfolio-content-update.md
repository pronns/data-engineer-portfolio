# Portfolio Content Update — Pronnoy Dutta

## Instructions for Claude Code

You are updating the **content only** of an existing portfolio website. 

**STRICT RULES — do not violate these:**
- Do NOT modify any CSS, class names, IDs, or inline styles
- Do NOT change any layout, grid, flexbox, or positioning logic
- Do NOT rename, add, or remove HTML elements or components
- Do NOT touch any JavaScript, animations, or interactive logic
- Do NOT change fonts, colors, spacing, or any visual properties
- Do NOT modify file/folder structure, imports, or dependencies
- ONLY replace text strings, href values, and array/object data that holds content

If a section does not exist in the portfolio, skip it and leave a note saying it was not found.

---

## Section 1 — Hero / Above the Fold

**Name:** Pronnoy Dutta

**Title / Role line:** Lead Data Engineer

**Tagline / subtitle (pick whichever fits the component):**
Building cloud-native data platforms that process 200M+ records daily

**Short bio (1–2 sentences, used in hero or intro sections):**
Lead Data Engineer with 5.5 years of experience architecting large-scale AWS data pipelines, Spark optimization, and distributed systems. Currently at Axtria leading a team of 4 engineers delivering production-grade analytics for pharma and retail clients.

**Location:** Gurugram, India

**Available for:** Full-time roles · Remote · Relocation open

---

## Section 2 — About Me

**Full about text:**
I'm a Lead Data Engineer with 5.5 years of experience building cloud-native data platforms on AWS that process 200M+ records daily. I specialize in PySpark-based distributed processing, Spark optimization, and dimensional data modeling — with a strong focus on end-to-end ownership of production data workflows.

At Axtria, I've driven a 30% improvement in pipeline performance by migrating legacy Hive/SQL workloads to PySpark, eliminated 350+ hours of annual manual effort through automated orchestration, and led a team of 4 engineers delivering SLA-compliant analytics for top-10 pharma clients.

I care about building systems that are reliable, observable, and maintainable — not just fast. I've resolved 20+ P1/P2 production incidents and implemented monitoring guardrails that reduced repeat incidents by 60%.

Outside work I write about data engineering on Medium and contribute to the AWS Community Builders program as a Security Team member.

**Key stats (use for any stat/counter components):**
- 5.5 — Years of experience
- 200M+ — Records processed daily
- 30% — Pipeline performance improvement
- 350+ — Manual hours saved per year
- 4 — Engineers led
- 60% — Reduction in repeat incidents

---

## Section 3 — Skills

Organise into these exact groups if the portfolio supports skill categories. If it's a flat list, use all skills combined.

**Core engineering:**
Python, SQL, Apache Spark, PySpark, Spark Optimization, Distributed Processing, Java

**Cloud & AWS:**
AWS S3, AWS Glue, AWS EMR, Amazon Redshift, AWS RDS, Cloud Data Pipelines

**Data architecture:**
Data Engineering, Data Modeling, Dimensional Modeling, SCD Type-2, Star Schema, Data Warehousing, Data Lakes, ETL/ELT Pipelines

**Orchestration & infra:**
Apache Airflow, Hadoop, Hive, YARN, Kubernetes, Docker, Control-M, Linux, Git, CI/CD

**Analytics & visualisation:**
Tableau, Grafana

**Certifications (use as badges or a separate list):**
- AWS Certified Solutions Architect — Associate
- AWS Certified Security — Specialty
- CCNA — Cisco Certified Network Associate
- AWS Community Builders — Security Team

---

## Section 4 — Experience / Work History

List in reverse chronological order.

---

### Job 1

**Company:** Axtria
**Role:** Project Lead — Data Engineering
**Duration:** Apr 2025 – Present
**Location:** Gurugram, India
**Type:** Full-time

**Bullets:**
- Own end-to-end architecture and delivery of batch data pipelines on AWS (S3, Glue, EMR, Redshift) supporting analytics for a 50M-patient commercial pharma platform, maintaining 99.9% SLA compliance across all production runs.
- Lead a team of 4 data engineers — managing sprint planning, technical design reviews, code quality standards, and career development for junior members.
- Serve as primary escalation owner for production data incidents; resolved 20+ P1/P2 events and implemented proactive monitoring guardrails that cut repeat incidents by 60%.
- Translated evolving business requirements from pharma analytics stakeholders into scalable data solutions, consistently delivering within committed timelines.
- Drove adoption of CI/CD practices and Git-based branching strategy across the team, reducing deployment errors and improving release confidence.

---

### Job 2

**Company:** Axtria
**Role:** Senior Data Engineer
**Duration:** May 2024 – Apr 2025
**Location:** Gurugram, India
**Type:** Full-time

**Bullets:**
- Migrated 15+ legacy Hive and SQL pipelines to PySpark-based distributed processing on AWS EMR, achieving a 30% reduction in end-to-end pipeline runtime — cutting daily processing wall-time from ~9 hrs to ~6 hrs.
- Diagnosed and resolved Spark performance bottlenecks (data skew, suboptimal partitioning, oversized shuffles) on pipelines ingesting 200M records/day, reducing estimated compute costs by ~₹33L/yr in EMR cluster spend.
- Designed SCD Type-2 dimensional data models supporting 3+ years of full historical auditability for patient-level pharma data, enabling downstream teams to retire ad-hoc reconciliation scripts entirely.
- Managed ingestion of JSON, CSV, Parquet, and ORC formats across multiple upstream source systems, implementing schema-on-read patterns with AWS Glue Data Catalog.
- Mentored 2 junior engineers on PySpark optimization patterns and AWS data services — both promoted within the project cycle.

---

### Job 3

**Company:** Axtria
**Role:** Associate Data Engineer
**Duration:** Mar 2022 – Apr 2024
**Location:** Gurugram, India
**Type:** Full-time

**Bullets:**
- Built Python-based Tableau refresh orchestration framework automating end-of-cycle dashboard updates across 30+ dashboards, eliminating 7 hours of manual effort per cycle (~350 hrs/yr saved).
- Developed and maintained production ETL pipelines using PySpark, AWS Glue, and Control-M with zero-defect delivery across 12 consecutive releases.
- Implemented data quality validation checks (null checks, referential integrity, row count reconciliation) at each pipeline stage, reducing data defects reaching downstream consumers by 80%.
- Built star-schema fact and dimension tables in Amazon Redshift supporting 5 analytics use cases including territory performance, brand uptake, and rep activity tracking.
- Collaborated with business analysts and data scientists to define data contracts, schema agreements, and SLA expectations for 8+ data products.

---

### Job 4

**Company:** Infosys
**Role:** Systems Engineer
**Duration:** Nov 2020 – Mar 2022
**Location:** Remote
**Type:** Full-time

**Bullets:**
- Designed and implemented cloud-based monthly sales analytics pipelines using AWS S3, Python, and PySpark for a retail client operating 500+ stores across 3 regions — automating report generation that previously required 3 days of manual effort per cycle.
- Architected a star-schema data warehouse with 8 fact and dimension tables tracking revenue, billing frequency, basket size, and customer engagement KPIs — became the single source of truth for executive dashboards.
- Developed KPI computation logic for 12+ business metrics (revenue growth, churn rate, store-level performance), reducing analyst ad-hoc query turnaround from days to under 2 hours.
- Optimised complex SQL queries on 100M+ row transaction tables, reducing report generation time by 40% through indexing and query restructuring.

---

## Section 5 — Projects

---

### Project 1

**Title:** Pharma Commercial Data Platform
**Company / context:** Axtria (Professional)
**Duration:** Mar 2022 – Present
**Role:** Lead Data Engineer

**Description:**
Cloud-native batch data platform on AWS processing 200M records/day of pharma commercial data — prescriptions, sales force activity, and HCP engagement. Migrated 15+ legacy Hive pipelines to PySpark, achieving 30% performance improvement and reducing daily processing window from 9 hrs to 6 hrs. Built SCD Type-2 dimensional models for 3+ years of historical patient data supporting territory management and brand analytics for a top-10 pharma client.

**Key achievements:**
- 30% reduction in pipeline runtime
- 99.9% SLA compliance
- 350 hrs/yr of manual work automated
- 60% reduction in repeat production incidents

**Tech stack tags:**
Python, PySpark, Apache Spark, AWS S3, AWS Glue, AWS EMR, Amazon Redshift, AWS RDS, Apache Airflow, Control-M, Tableau, Git, Linux, Kubernetes, Docker

---

### Project 2

**Title:** Retail Sales Analytics Data Warehouse
**Company / context:** Infosys (Professional)
**Duration:** Nov 2020 – Mar 2022
**Role:** Systems Engineer

**Description:**
End-to-end sales analytics pipeline and data warehouse for a retail client with 500+ stores across 3 regions. Automated monthly reporting that previously took 3 days of manual effort. Built an 8-table star-schema warehouse powering executive-level revenue and engagement dashboards, with KPI logic covering 12+ business metrics.

**Key achievements:**
- 40% reduction in report generation time
- 3 days of manual work eliminated per cycle
- 12+ KPIs powering executive dashboards
- 100M+ row tables optimised

**Tech stack tags:**
Python, PySpark, AWS S3, SQL, Star Schema, Data Warehousing, Amazon Redshift

---

## Section 6 — Education

**Degree:** B.Tech — Computer Science and Engineering
**Institution:** Bharati Vidyapeeth College of Engineering, Pune
**Year:** 2016 – 2020
**Type:** Full-time

---

## Section 7 — Contact / Social Links

**Email:** pronnoy1998@gmail.com
**Phone:** +91 7042768041
**Location:** Gurugram, Haryana, India

**Social links (update href values only):**
- LinkedIn: https://www.linkedin.com/in/pronnoy-dutta/
- GitHub: https://github.com/pronns
- Medium: https://medium.com/@pronnoy1998

**CTA button text (if present):** Download Resume  
**CTA button link:** (point to the PDF resume file in the project)

---

## Section 8 — Open to Work / Availability Banner

**Status:** Open to opportunities
**What I'm looking for:** Senior Data Engineer · Lead Data Engineer · Data Platform Engineer
**Preferred:** Full-time · Remote or Gurugram/Bangalore/Hyderabad/Pune
**Notice period:** 2 months

---

## Notes for Claude Code

1. If any section above does not exist in the portfolio, skip it silently and add a `// TODO: section not found — [section name]` comment in the relevant file.
2. If the portfolio uses a data file (e.g. `data.js`, `content.ts`, `resume.json`, `config.ts`) to populate content, prefer editing that file over touching component files directly.
3. If content is hardcoded inside JSX/HTML components, replace only the string literals — do not restructure the component.
4. Tech stack tags should be inserted as whatever data type the existing tags use (string array, object array, etc.) — match the existing format exactly.
5. Bullet points should be inserted as an array of strings if the existing data structure uses arrays, or as `<li>` elements if hardcoded HTML.
6. Do not invent new sections, components, or routes. Only populate what already exists.