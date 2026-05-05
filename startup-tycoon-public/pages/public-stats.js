import fs from "fs";
import path from "path";

export default function PublicStats({ stats }) {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>{stats.title}</h1>

      <ul style={{ fontSize: 18, lineHeight: 1.6 }}>
        <li>
          <strong>Total earned:</strong> {stats.totalEarned.toLocaleString()}
        </li>
        <li>
          <strong>Total clicks:</strong> {stats.totalClicks.toLocaleString()}
        </li>
        <li>
          <strong>Best income/sec:</strong>{" "}
          {stats.bestIncomePerSecond.toLocaleString()}
        </li>
      </ul>

      <p style={{ marginTop: 24, color: "#666" }}>
        This page is statically generated at build time. Check "View Page
        Source" to see the metrics in the initial HTML.
      </p>
    </main>
  );
}

export async function getStaticProps() {
  const dataPath = path.join(process.cwd(), "data", "public-stats.json");
  const raw = fs.readFileSync(dataPath, "utf-8");
  const stats = JSON.parse(raw);

  return {
    props: { stats },
  };
}
