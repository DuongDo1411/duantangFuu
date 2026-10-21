import { readFileSync } from "node:fs";
import { join } from "node:path";

import LetterExperience from "./letter-experience";

export default function Home() {
  const paragraphs = readFileSync(join(process.cwd(), "assets", "letter.md"), "utf8")
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  return <LetterExperience paragraphs={paragraphs} />;
}
