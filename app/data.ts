import type { TechId } from "./components/TechIcon";

/* =====================================================
   Single source of truth for all portfolio content.
   Numbers here mirror the resume — keep them in sync.
   ===================================================== */

export const site = {
  name: "Pronnoy Dutta",
  role: "Lead Data Engineer",
  url: "https://pronns.vercel.app",
  email: "pronnoy1998@gmail.com",
  location: "Gurugram, India",
  resume: "/Pronnoy_Dutta_Resume.pdf",
  availability: "Open to Lead & Senior Data Engineering roles",
  socials: {
    linkedin: "https://www.linkedin.com/in/pronnoy-dutta/",
    github: "https://github.com/pronns",
    medium: "https://medium.com/@pronnoy1998",
  },
};

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export type Metric = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

export const impact: Metric[] = [
  { value: 6, suffix: "+", label: "Years", detail: "Building production data platforms" },
  { value: 200, suffix: "M+", label: "Records / day", detail: "Processed on AWS & Spark" },
  { value: 99.9, decimals: 1, suffix: "%", label: "SLA", detail: "On a 50M-patient platform" },
  { value: 40, prefix: "$", suffix: "K", label: "Saved / year", detail: "In cloud compute" },
  { value: 30, suffix: "%", label: "Faster", detail: "Daily runtime, 9h → 6h" },
  { value: 60, suffix: "%", label: "Fewer repeats", detail: "Of P1/P2 incident failures" },
];

export const principles = [
  {
    icon: "blocks",
    title: "Platforms, not pipelines",
    body: "Build the framework once. A new source should be a config change, not a project.",
  },
  {
    icon: "activity",
    title: "Observable by default",
    body: "If a pipeline can fail silently, it will. Quality gates and monitoring ship with the code.",
  },
  {
    icon: "history",
    title: "Model for the audit",
    body: "History is a feature. Every number on a dashboard should be traceable to its source.",
  },
  {
    icon: "gauge",
    title: "Cost is a metric",
    body: "Every shuffle has a bill. Spark tuning is cloud spend, so I treat it like one.",
  },
  {
    icon: "users",
    title: "Teams scale, heroes don't",
    body: "Design reviews, code reviews and clear ownership over late-night heroics.",
  },
] as const;

/* ---------------- Experience ---------------- */

export type Role = {
  title: string;
  period: string;
  location?: string;
  current?: boolean;
  summary?: string;
  bullets: string[];
  metrics: { value: string; label: string }[];
  stack: TechId[];
};

export type Company = {
  name: string;
  monogram: string;
  period: string;
  location: string;
  domain: string;
  roles: Role[];
};

export const ladder = [
  { year: "2022", title: "Analyst" },
  { year: "2023", title: "Associate DE" },
  { year: "2024", title: "Senior DE" },
  { year: "2025", title: "Project Lead" },
];

export const experience: Company[] = [
  {
    name: "Axtria",
    monogram: "Ax",
    period: "Mar 2022 — Present",
    location: "Gurugram, India",
    domain: "Pharma commercial analytics",
    roles: [
      {
        title: "Project Lead",
        period: "Apr 2025 — Present",
        current: true,
        summary:
          "Own the architecture and delivery of a 50M-patient pharma data platform, and lead the team that builds it.",
        bullets: [
          "Own end-to-end architecture of cloud-native pipelines on AWS (S3, Glue, EMR, Redshift), sustaining a 99.9% SLA.",
          "Lead 4 engineers through sprint planning, design reviews and code reviews; own the technical roadmap for 8+ data products and act as the client's primary technical contact.",
          "Consolidated fragmented ETL workflows into a reusable ingestion framework, cutting new-source onboarding from weeks to days across 10+ downstream consumers.",
          "Drove RCA on 20+ P1/P2 incidents and cut repeat failures by 60% with Grafana and Prometheus monitoring.",
        ],
        metrics: [
          { value: "99.9%", label: "SLA" },
          { value: "4", label: "Engineers led" },
          { value: "8+", label: "Data products" },
          { value: "−60%", label: "Repeat failures" },
        ],
        stack: ["aws", "s3", "glue", "emr", "redshift", "pyspark", "grafana", "prometheus"],
      },
      {
        title: "Senior Data Engineer",
        period: "May 2024 — Apr 2025",
        bullets: [
          "Migrated 15+ legacy Hive/SQL pipelines to distributed PySpark on EMR. Daily runtime dropped from 9 to 6 hours and compute costs fell by $40K a year, from fixing data skew, partitioning and oversized shuffles at 200M records/day.",
          "Designed SCD Type-2 dimensional models that give 3+ years of patient-level historical auditability.",
          "Standardized multi-format ingestion (JSON, CSV, Parquet, ORC) through the Glue Data Catalog with schema-on-read, plus lineage and schema governance across 10+ upstream systems.",
        ],
        metrics: [
          { value: "9h → 6h", label: "Daily runtime" },
          { value: "$40K", label: "Saved / year" },
          { value: "15+", label: "Pipelines migrated" },
          { value: "200M", label: "Records / day" },
        ],
        stack: ["pyspark", "emr", "glue", "hive", "s3", "parquet", "python"],
      },
      {
        title: "Associate Data Engineer",
        period: "Mar 2023 — Apr 2024",
        bullets: [
          "Built production ETL/ELT pipelines with PySpark, AWS Glue and Control-M, with zero defects across 12 consecutive releases.",
          "Added data quality gates (null, referential integrity, row count) that cut downstream defects by 80%.",
          "Modeled star-schema tables in Redshift for 5 analytics use cases.",
        ],
        metrics: [
          { value: "12", label: "Zero-defect releases" },
          { value: "−80%", label: "Downstream defects" },
          { value: "5", label: "Analytics use cases" },
        ],
        stack: ["pyspark", "glue", "controlm", "redshift", "sql", "python"],
      },
      {
        title: "Analyst",
        period: "Mar 2022 — Mar 2023",
        bullets: [
          "Built a Python framework that automates Tableau refreshes across 30+ dashboards, removing 350 hours of manual work a year.",
          "Maintained PySpark and Control-M ingestion workflows with data quality validation for pharma commercial datasets.",
        ],
        metrics: [
          { value: "350h", label: "Saved / year" },
          { value: "30+", label: "Dashboards" },
        ],
        stack: ["python", "tableau", "pyspark", "controlm"],
      },
    ],
  },
  {
    name: "Infosys",
    monogram: "In",
    period: "Nov 2020 — Mar 2022",
    location: "Remote",
    domain: "Retail analytics",
    roles: [
      {
        title: "Systems Engineer",
        period: "Nov 2020 — Mar 2022",
        bullets: [
          "Built monthly sales analytics pipelines on S3, Python and PySpark for a retail client with 500+ stores across 3 regions, cutting reporting from 3 days to under 2 hours.",
          "Designed a star-schema warehouse (8 fact and dimension tables) and KPI logic for 12+ metrics, which became the single source of truth for executive dashboards.",
          "Optimized SQL on 100M+ row transaction tables, making report generation 40% faster.",
        ],
        metrics: [
          { value: "3d → 2h", label: "Reporting cycle" },
          { value: "500+", label: "Stores" },
          { value: "12+", label: "KPIs" },
          { value: "−40%", label: "Report time" },
        ],
        stack: ["s3", "python", "pyspark", "sql"],
      },
    ],
  },
];

/* ---------------- Selected work ---------------- */

export type CaseStudy = {
  id: string;
  kicker: string;
  title: string;
  problem: string;
  approach: string;
  outcome: { value: string; label: string }[];
  stack: TechId[];
  visual: "runtime" | "framework" | "scd2" | "uptime";
};

export const work: CaseStudy[] = [
  {
    id: "spark-migration",
    kicker: "Performance · Cost",
    title: "Cutting a 9-hour batch window to 6",
    problem:
      "15+ legacy Hive/SQL pipelines processing 200M records a day were eating the batch window and the cloud budget.",
    approach:
      "Rebuilt them as distributed PySpark on EMR. Profiled every stage, fixed skewed keys and bad partitioning, and removed oversized shuffles.",
    outcome: [
      { value: "30%", label: "Faster" },
      { value: "$40K/yr", label: "Compute saved" },
    ],
    stack: ["pyspark", "emr", "hive", "s3"],
    visual: "runtime",
  },
  {
    id: "ingestion-framework",
    kicker: "Platform · Architecture",
    title: "A reusable ingestion framework",
    problem:
      "Every new data source meant a new hand-built ETL workflow. Onboarding took weeks and maintenance kept growing.",
    approach:
      "Consolidated the fragmented workflows into one standardized framework with shared patterns for landing, validation and schema handling.",
    outcome: [
      { value: "Weeks → days", label: "Source onboarding" },
      { value: "10+", label: "Consumers served" },
    ],
    stack: ["glue", "pyspark", "s3", "redshift"],
    visual: "framework",
  },
  {
    id: "scd2",
    kicker: "Data modeling · Governance",
    title: "3+ years of patient history, fully auditable",
    problem:
      "Analysts needed to answer “what did we know, and when?”, but overwrites destroyed history.",
    approach:
      "Designed SCD Type-2 dimensional models with lineage tracking and schema governance across 10+ upstream source systems.",
    outcome: [
      { value: "3+ yrs", label: "Point-in-time history" },
      { value: "10+", label: "Governed sources" },
    ],
    stack: ["pyspark", "redshift", "glue", "sql"],
    visual: "scd2",
  },
  {
    id: "reliability",
    kicker: "Reliability · Leadership",
    title: "Fewer 3 AM pages",
    problem:
      "The same production failures kept coming back on a platform with a 99.9% SLA commitment.",
    approach:
      "Led root-cause analysis on 20+ P1/P2 incidents, then turned each finding into Grafana/Prometheus monitoring and alerts.",
    outcome: [
      { value: "−60%", label: "Repeat failures" },
      { value: "99.9%", label: "SLA sustained" },
    ],
    stack: ["grafana", "prometheus", "aws"],
    visual: "uptime",
  },
];

/* ---------------- Stack ---------------- */

export type StackGroup = {
  id: string;
  label: string;
  items: { id: TechId; core?: boolean }[];
};

export const stack: StackGroup[] = [
  {
    id: "lakehouse",
    label: "Lakehouse & Big Data",
    items: [
      { id: "databricks", core: true },
      { id: "spark", core: true },
      { id: "deltalake", core: true },
      { id: "medallion", core: true },
      { id: "hadoop" },
      { id: "hive" },
      { id: "yarn" },
      { id: "parquet" },
    ],
  },
  {
    id: "aws",
    label: "AWS Cloud",
    items: [
      { id: "s3", core: true },
      { id: "glue", core: true },
      { id: "emr", core: true },
      { id: "redshift", core: true },
      { id: "lambda" },
      { id: "iam" },
      { id: "dynamodb" },
      { id: "terraform" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    items: [
      { id: "python", core: true },
      { id: "sql", core: true },
      { id: "pyspark", core: true },
      { id: "fastapi" },
      { id: "java" },
      { id: "csharp" },
      { id: "bash" },
      { id: "linux" },
    ],
  },
  {
    id: "ops",
    label: "Orchestration & DevOps",
    items: [
      { id: "airflow", core: true },
      { id: "controlm" },
      { id: "githubactions" },
      { id: "git" },
      { id: "docker" },
      { id: "kubernetes" },
      { id: "grafana" },
      { id: "prometheus" },
    ],
  },
  {
    id: "modeling",
    label: "Modeling & Governance",
    items: [
      { id: "dimensional", core: true },
      { id: "scd2", core: true },
      { id: "starschema", core: true },
      { id: "dataquality", core: true },
      { id: "lineage" },
      { id: "governance" },
      { id: "cdc" },
      { id: "streaming" },
    ],
  },
];

/* ---------------- Credentials ---------------- */

export const certifications = [
  {
    name: "Data Engineer Professional",
    issuer: "Databricks",
    icon: "databricks" as TechId,
    featured: true,
  },
  {
    name: "Security — Specialty",
    issuer: "Amazon Web Services",
    icon: "aws" as TechId,
  },
  {
    name: "Solutions Architect — Associate",
    issuer: "Amazon Web Services",
    icon: "aws" as TechId,
  },
  {
    name: "CCNA",
    issuer: "Cisco",
    icon: "cisco" as TechId,
  },
];

export const education = {
  degree: "B.Tech, Computer Science",
  school: "Bharati Vidyapeeth College of Engineering, Pune",
  period: "2016 — 2020",
};

export const community = {
  name: "AWS Community Builders",
  detail: "Official member, Security team",
};
