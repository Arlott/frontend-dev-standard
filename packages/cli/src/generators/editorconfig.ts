import path from 'path';
import fs from 'fs-extra';
import pc from 'picocolors';
import type { ProjectConfig } from '../commands/init';

const EDITORCONFIG_CONTENT = `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
`;

export async function generateEditorConfig(config: ProjectConfig): Promise<void> {
  const { cwd } = config;
  const filePath = path.join(cwd, '.editorconfig');

  if (await fs.pathExists(filePath)) {
    console.log(pc.yellow(`  ⚠ Skipping .editorconfig (already exists)`));
    return;
  }

  await fs.writeFile(filePath, EDITORCONFIG_CONTENT, 'utf-8');
  console.log(pc.green(`  ✔ Created .editorconfig`));
}
