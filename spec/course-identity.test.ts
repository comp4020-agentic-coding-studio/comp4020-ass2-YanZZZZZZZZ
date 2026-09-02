import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { courseMeta } from "../src/course-config";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;

describe("course code", () => {
  it("keeps the three digits this repo was provisioned with", () => {
    expect(
      courseMeta.code.endsWith("762"),
      `${courseMeta.code} doesn't end in 762 — only the level digit is mine to change`,
    ).toBe(true);
  });
});

describe("real content, not the starter", () => {
  it("no longer carries the starter title or description", () => {
    expect(courseMeta.title).not.toBe("Course Title Goes Here");
    expect(courseMeta.description).not.toMatch(/^One concise paragraph explaining/);
  });
});

describe("at least one lecture carries a real deck", () => {
  it("links to a deck that actually built", () => {
    const withSlides = api.nodes.filter(
      (node) => node.type === "lectures" && typeof node.meta?.slides === "string",
    );
    expect(withSlides.length, "no lecture has a slides: link").toBeGreaterThan(0);

    const built = withSlides.filter((node) =>
      existsSync(resolve(`dist${node.meta!.slides as string}index.html`)),
    );
    expect(built.length, "a lecture links to a deck that didn't actually build").toBeGreaterThan(0);
  });
});
