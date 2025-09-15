import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";
import { QUESTIONS } from "./questions";
import { SECTIONS } from "./sections";

export async function GET() {
  try {
    const cwd = process.cwd();
    const candidates = [
      path.join(cwd, "Copy of survey_quest(1).xlsx"),
      path.join(cwd, "..", "Copy of survey_quest(1).xlsx"),
    ];

    const filePath = candidates.find((p) => fs.existsSync(p));
    if (!filePath) {
      return NextResponse.json(
        { error: "Survey file not found", tried: candidates },
        { status: 404 }
      );
    }

    let questionsFromFile: { id: string; question: string; options: string[]; type: string }[] = [];
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });
      const firstSheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheetName];
      const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      questionsFromFile = rows
        .map((row, index) => {
          const r = row as Record<string, string>;
          const id = r.id || r.ID || r.Id || String(index + 1);
          const question = r.question || r.Question || r.QUESTIONS || r["Questions"] || "";
          const optionsRaw = r.options || r.Options || r.OPTION || r["Option"] || "";
          const options = typeof optionsRaw === "string" && optionsRaw.length > 0
            ? optionsRaw.split(/\s*\|\s*|\s*,\s*/).filter(Boolean)
            : [];
          const type = r.type || r.Type || (options.length > 0 ? "single" : "text");
          return { id, question, options, type };
        })
        .filter((q) => q.question && String(q.question).trim().length > 0);
    } catch {
      // ignore parsing error; we'll fall back to built-in
    }

    // Build fallback from sections first; also produce flat list for backward compat
    const fallbackSections = SECTIONS.map((section) => ({
      title: section.title,
      questions: section.questions.map((q) => ({
        question: q,
        options: ["True", "False"],
        type: "single",
      })),
    }));

    const flatFromSections: { id: string; question: string; options: string[]; type: string }[] = [];
    let runningId = 1;
    for (const section of fallbackSections) {
      for (const q of section.questions) {
        flatFromSections.push({
          id: String(runningId++),
          question: q.question,
          options: q.options,
          type: q.type,
        });
      }
    }

    const fallbackFlat = QUESTIONS.map((q, i) => ({
      id: String(i + 1),
      question: q,
      options: ["True", "False"],
      type: "single",
    }));

    const finalQuestions = questionsFromFile.length > 0 ? questionsFromFile : (flatFromSections.length > 0 ? flatFromSections : fallbackFlat);
    const finalSections = questionsFromFile.length > 0 ? undefined : fallbackSections;
    return NextResponse.json({ questions: finalQuestions, sections: finalSections });
  } catch (error) {
    console.error("Failed to read survey:", error);
    return NextResponse.json({ error: "Failed to parse survey" }, { status: 500 });
  }
}


