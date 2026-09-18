import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
  body?: string;
}

interface CourseApi {
  course: {
    startDate: string;
    endDate: string;
  };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const dateOnly = (value: unknown): string => String(value).slice(0, 10);

interface WeeklyDueEntry {
  week: number;
  due: string;
}

describe("course data integrity", () => {
  it("keeps every scheduled date inside the teaching period", () => {
    const dated = api.nodes.filter((node) =>
      ["sessions", "lectures", "assessments"].includes(node.type),
    );
    for (const node of dated) {
      const raw = node.type === "assessments" ? node.meta?.due : node.meta?.date;
      const date = dateOnly(raw);
      expect(date, `${node.id} has no date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(date >= api.course.startDate, `${node.id} falls before teaching starts`).toBe(true);
      expect(date <= api.course.endDate, `${node.id} falls after teaching ends`).toBe(true);
    }
  });

  it("keeps every weekly due date inside the teaching period and in week order", () => {
    const withWeeklyDue = api.nodes.filter(
      (node) => node.type === "assessments" && Array.isArray(node.meta?.weeklyDue),
    );
    for (const node of withWeeklyDue) {
      const entries = node.meta?.weeklyDue as WeeklyDueEntry[];
      let previousWeek = 0;
      for (const entry of entries) {
        const date = dateOnly(entry.due);
        expect(date, `${node.id} week ${entry.week} has no date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(
          date >= api.course.startDate,
          `${node.id} week ${entry.week} falls before teaching starts`,
        ).toBe(true);
        expect(
          date <= api.course.endDate,
          `${node.id} week ${entry.week} falls after teaching ends`,
        ).toBe(true);
        expect(entry.week > previousWeek, `${node.id} weeklyDue is not strictly increasing`).toBe(
          true,
        );
        previousWeek = entry.week;
      }
    }
  });
});
