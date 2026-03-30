# Pascal Formatter VS Code Extension

Always reference these instructions first and fall back to additional search or terminal commands only when project files do not provide enough context.

## Project Overview

Pascal Formatter is a Visual Studio Code extension that provides source code formatting for Pascal/Object Pascal files. The extension integrates with external formatting tools (engines) like FreePascal PToP, Jedi Code Format, Embarcadero Formatter, and pasfmt.

## Technology Stack

- Language: TypeScript
- Runtime: VS Code Extension API (Node + Web)
- Bundler: Webpack 5
- Linting: ESLint (`eslint-config-vscode-ext`)
- Testing: Mocha + `@vscode/test-electron`

## Working Effectively

Bootstrap and local setup:

```bash
git submodule init
git submodule update
npm install
```

Build and development quickstart:

```bash
npm run build
npm run lint
```

- Use `npm run watch` during active development.
- Use VS Code "Launch Extension" (F5) to validate behavior in Extension Development Host.
- Expected command timings are usually under 10 seconds.
- Never cancel `npm install`, `npm run watch`, or `npm test` once started.
## Build and Development Commands

- `npm run compile` - TypeScript compilation
- `npm run build` - Webpack development build
- `npm run watch` - Continuous webpack build
- `npm run lint` - ESLint validation
- `npm run test` - Full test suite
- `npm run vscode:prepublish` - Production build

## Testing and Validation

Manual validation checklist:

1. Run `npm run build`.
2. Launch Extension Development Host (F5).
3. Open a `.pas` file and run Format Document / Format Selection.
4. Confirm output is produced by the selected formatter engine.
5. Run `npm run lint` before commit.

Sample misformatted file for testing:

```pascal
program TestProgram;
var
i: Integer;
  s: String;
begin
  WriteLn('Pascal Formatter Test');
s:='hello world';
  for i := 1 to 5 do
  begin
    WriteLn('Counter: ', i);
if i mod 2 = 0 then
      WriteLn('  Even number')
        else
   WriteLn('  Odd number');
  end;
end.
```

## Project Structure and Key Files

```
src/
├── extension.ts          # Extension activation and formatter registration
├── formatter.ts          # Core formatting logic
├── container.ts          # Dependency container/context
└── test/                 # Test suite

dist/                     # Webpack bundles (extension.js)
l10n/                     # Localization files
out/                      # Compiled TypeScript files
vscode-whats-new/         # Submodule dependency
```

## Coding Conventions and Patterns

### Indentation

- We spaces, not tabs.
- Use 4 spaces for indentation.

### Naming Conventions

- Use PascalCase for `type` names
- Use PascalCase for `enum` values
- Use camelCase for `function` and `method` names
- Use camelCase for `property` names and `local variables`
- Use whole words in names when possible

### Types

- Do not export `types` or `functions` unless you need to share it across multiple components
- Do not introduce new `types` or `values` to the global namespace
- Prefer `const` over `let` when possible.

### Strings

- Use "double quotes"
- All strings visible to the user need to be externalized using the `l10n` API
- Externalized strings must not use string concatenation. Use placeholders instead (`{0}`).

### Code Quality

- All files must include copyright header
- Prefer `async` and `await` over `Promise` and `then` calls
- All user facing messages must be localized using the applicable localization framework (for example `l10n.t` method)
- Keep imports organized: VS Code first, then internal modules.
- Use semicolons at the end of statements.
- Keep formatter-engine behavior platform-aware.
- Keep changes minimal and aligned with existing style.

### Import Organization

- Import VS Code API first: `import * as vscode from "vscode"`
- Group related imports together
- Use named imports for specific VS Code types
- Import from local modules using relative paths

## Extension Features and Configuration

### Key Features
1. **Formatter Integration**: Integrates with multiple external formatting engines to provide code formatting for Pascal files.
2. **Remote Development**: Support for remote development scenarios
3. **Internationalization support**: Localization of all user-facing strings

### Important Settings
- `pascal.formatter.engine`
- `pascal.formatter.enginePath`
- `pascal.formatter.engineParameters`

## Dependencies and External Tools

- Requires `vscode-whats-new` submodule initialization.
- External engines required for actual formatting execution:
  - FreePascal PToP
  - Jedi Code Format / Jedi Code Format (Quadroid)
  - Embarcadero Formatter
  - pasfmt

## Troubleshooting and Known Limitations

- Tests may fail in headless/network-restricted environments due to VS Code download requirements.
- Engine-specific failures usually indicate missing executables or incorrect `enginePath`.
- If build validation fails after dependency updates, clean `out/` and `dist/` and rebuild.

## CI and Pre-Commit Validation

Before committing:

1. `npm run lint`
2. `npm run build`
3. `npm run test-compile`
4. Manual formatter validation in Extension Host

## Common Tasks

1. Update formatter engine handling in `src/formatter.ts`.
2. Adjust command/activation integration in `src/extension.ts`.
3. Validate behavior with at least one configured engine and one `.pas` sample file.