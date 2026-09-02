import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;

describe("the twelve-week promise", () => {
  it("gives every week 1-12 at least one dated session or lecture", () => {
    const taught = api.nodes.filter((node) => node.type === "sessions" || node.type === "lectures");
    const weeksCovered = new Set(taught.map((node) => Number(node.meta?.week)));
    const missing = Array.from({ length: 12 }, (_, i) => i + 1).filter(
      (week) => !weeksCovered.has(week),
    );
    expect(missing, `weeks with no teaching content: ${missing.join(", ")}`).toEqual([]);
  });
});

describe("the assessment promise", () => {
  it("sums assessment weights to exactly 100", () => {
    const assessments = api.nodes.filter((node) => node.type === "assessments");
    const total = assessments.reduce((sum, node) => sum + Number(node.meta?.weight ?? 0), 0);
    expect(total, `assessment weights sum to ${total}, not 100`).toBe(100);
  });
});
