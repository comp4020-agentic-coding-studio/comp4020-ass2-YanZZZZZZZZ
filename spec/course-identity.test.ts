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
  edges: { from: string; to: string }[];
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

describe("topics carry real depth, not just the schedule", () => {
  it("has a non-empty topics collection", () => {
    const topics = api.nodes.filter((node) => node.type === "topics");
    expect(topics.length, "the topics collection is empty").toBeGreaterThan(0);
  });

  it("gives every lecture week at least one linked topic", () => {
    const lectures = api.nodes.filter((node) => node.type === "lectures");
    const topicIds = new Set(api.nodes.filter((node) => node.type === "topics").map((n) => n.id));
    const neighboursOf = (id: string) =>
      api.edges
        .filter((edge) => edge.from === id || edge.to === id)
        .map((edge) => (edge.from === id ? edge.to : edge.from));

    const unlinked = lectures.filter((lecture) => !neighboursOf(lecture.id).some((n) => topicIds.has(n)));
    expect(
      unlinked.map((n) => n.id),
      "these lectures have no related: link to a topic",
    ).toEqual([]);
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
