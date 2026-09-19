import {
  siApacheairflow,
  siApachehadoop,
  siApachehive,
  siApacheparquet,
  siApachespark,
  siCisco,
  siDatabricks,
  siDocker,
  siFastapi,
  siGit,
  siGithubactions,
  siGnubash,
  siGrafana,
  siKubernetes,
  siLinux,
  siOpenjdk,
  siPrometheus,
  siPython,
  siTerraform,
} from "simple-icons";
import {
  Activity,
  CalendarClock,
  Cpu,
  Database,
  GitMerge,
  HardDrive,
  History,
  KeyRound,
  Layers,
  Network,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Table2,
  Waypoints,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* =====================================================
   Tech registry. Three render styles:
   - brand:   official Simple Icons path in brand color
   - service: AWS-architecture-style tile (colored square + glyph)
   - glyph:   concept icon (modeling, governance…) in a tinted tile
   ===================================================== */

type Brand = { kind: "brand"; label: string; path: string; hex: string };
type Service = { kind: "service"; label: string; glyph: LucideIcon | string; hex: string };
type Glyph = { kind: "glyph"; label: string; glyph: LucideIcon; hex: string };
type Tech = Brand | Service | Glyph;

const brand = (label: string, icon: { path: string; hex: string }, hex?: string): Brand => ({
  kind: "brand",
  label,
  path: icon.path,
  hex: hex ?? icon.hex,
});

// AWS architecture icon category colors
const AWS_STORAGE = "7AA116";
const AWS_ANALYTICS = "8C4FFF";
const AWS_COMPUTE = "ED7100";
const AWS_DATABASE = "C925D1";
const AWS_SECURITY = "DD344C";

const registry = {
  // Lakehouse & big data
  databricks: brand("Databricks", siDatabricks),
  spark: brand("Apache Spark", siApachespark),
  pyspark: brand("PySpark", siApachespark),
  deltalake: { kind: "glyph", label: "Delta Lake", glyph: Layers, hex: "00ADD4" },
  medallion: { kind: "glyph", label: "Medallion", glyph: Sparkles, hex: "D9A441" },
  hadoop: brand("Hadoop", siApachehadoop),
  hive: brand("Hive", siApachehive),
  yarn: { kind: "glyph", label: "YARN", glyph: Network, hex: "66CCFF" },
  parquet: brand("Parquet", siApacheparquet),

  // AWS
  aws: { kind: "service", label: "AWS", glyph: "aws", hex: "FF9900" },
  s3: { kind: "service", label: "S3", glyph: HardDrive, hex: AWS_STORAGE },
  glue: { kind: "service", label: "Glue", glyph: Workflow, hex: AWS_ANALYTICS },
  emr: { kind: "service", label: "EMR", glyph: Cpu, hex: AWS_ANALYTICS },
  redshift: { kind: "service", label: "Redshift", glyph: Database, hex: AWS_ANALYTICS },
  lambda: { kind: "service", label: "Lambda", glyph: "λ", hex: AWS_COMPUTE },
  iam: { kind: "service", label: "IAM", glyph: KeyRound, hex: AWS_SECURITY },
  dynamodb: { kind: "service", label: "DynamoDB", glyph: Table2, hex: AWS_DATABASE },
  terraform: brand("Terraform", siTerraform),

  // Languages
  python: brand("Python", siPython),
  sql: { kind: "glyph", label: "SQL", glyph: Database, hex: "4479A1" },
  fastapi: brand("FastAPI", siFastapi),
  java: brand("Java", siOpenjdk, "E76F00"),
  csharp: { kind: "service", label: "C#", glyph: "C#", hex: "512BD4" },
  bash: brand("Bash", siGnubash),
  linux: brand("Linux", siLinux, "E8B22E"),

  // Orchestration & DevOps
  airflow: brand("Airflow", siApacheairflow),
  controlm: { kind: "glyph", label: "Control-M", glyph: CalendarClock, hex: "0EA5A4" },
  githubactions: brand("GitHub Actions", siGithubactions),
  git: brand("Git", siGit),
  docker: brand("Docker", siDocker),
  kubernetes: brand("Kubernetes", siKubernetes),
  grafana: brand("Grafana", siGrafana),
  prometheus: brand("Prometheus", siPrometheus),
  tableau: { kind: "service", label: "Tableau", glyph: "+", hex: "E97627" },

  // Modeling & governance
  dimensional: { kind: "glyph", label: "Dimensional modeling", glyph: Table2, hex: "38BDF8" },
  scd2: { kind: "glyph", label: "SCD Type-2", glyph: History, hex: "A78BFA" },
  starschema: { kind: "glyph", label: "Star schema", glyph: Star, hex: "FBBF24" },
  dataquality: { kind: "glyph", label: "Data quality", glyph: ShieldCheck, hex: "34D399" },
  lineage: { kind: "glyph", label: "Data lineage", glyph: Waypoints, hex: "F472B6" },
  governance: { kind: "glyph", label: "Schema governance", glyph: Scale, hex: "94A3B8" },
  cdc: { kind: "glyph", label: "CDC", glyph: GitMerge, hex: "FB923C" },
  streaming: { kind: "glyph", label: "Batch & stream", glyph: Activity, hex: "22D3EE" },

  cisco: brand("Cisco", siCisco),
} satisfies Record<string, Tech>;

export type TechId = keyof typeof registry;

export function techLabel(id: TechId) {
  return registry[id].label;
}

type Props = {
  id: TechId;
  size?: number;
  className?: string;
};

/**
 * Square icon tile for a technology. Decorative by default — pair it with
 * a visible label or pass it inside an element that has an accessible name.
 */
export function TechIcon({ id, size = 40, className }: Props) {
  const tech: Tech = registry[id];
  const style = { "--tile": `#${tech.hex}`, width: size, height: size } as React.CSSProperties;
  const inner = Math.round(size * 0.55);

  if (tech.kind === "service") {
    const Glyph = tech.glyph;
    return (
      <span className={`tile tile--service ${className ?? ""}`} style={style} aria-hidden="true">
        {typeof Glyph === "string" ? (
          <span className={`tile-text ${Glyph === "aws" ? "tile-text--aws" : ""}`} style={{ fontSize: size * (Glyph.length > 2 ? 0.34 : 0.42) }}>
            {Glyph}
          </span>
        ) : (
          <Glyph size={inner} strokeWidth={1.9} />
        )}
      </span>
    );
  }

  if (tech.kind === "glyph") {
    const Glyph = tech.glyph;
    return (
      <span className={`tile tile--glyph ${className ?? ""}`} style={style} aria-hidden="true">
        <Glyph size={inner} strokeWidth={1.8} />
      </span>
    );
  }

  return (
    <span className={`tile tile--brand ${className ?? ""}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 24 24" width={inner} height={inner} fill="currentColor">
        <path d={tech.path} />
      </svg>
    </span>
  );
}

/** Row of labeled icon chips, used on roles and case studies. */
export function StackRow({ ids }: { ids: TechId[] }) {
  return (
    <ul className="stack-row" aria-label="Tech stack">
      {ids.map((id) => (
        <li key={id} className="stack-chip">
          <TechIcon id={id} size={22} />
          {techLabel(id)}
        </li>
      ))}
    </ul>
  );
}
