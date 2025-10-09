#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cwd = process.cwd();

const cmd = process.argv[2];

if (!cmd || cmd === "help" || cmd === "--help") {
  console.log(`
${chalk.cyan("ledicon")} — Add the LEDIcon component to your project's src/components/ui directory.

Usage:
  npx @vznh/components add led-icon
`);
  process.exit(0);
}

if (cmd === "add") {
  const component = process.argv[3] || "led-icon";
  const templatePath = path.join(__dirname, "../templates", `${component}.tsx`);
  const destPath = path.join(cwd, "src/components/ui", `${component}.tsx`);

  if (!fs.existsSync(templatePath)) {
    console.error(chalk.red(`Template not found: ${component}`));
    process.exit(1);
  }

  await fs.ensureDir(path.dirname(destPath));
  await fs.copyFile(templatePath, destPath);

  console.log(chalk.green(`✅ Added ${component}.tsx → src/components/ui/`));
  process.exit(0);
}

console.log(chalk.red("Unknown command."));
process.exit(1);
