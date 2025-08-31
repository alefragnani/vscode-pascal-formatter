# Pascal Formatter VS Code Extension

Pascal Formatter is a Visual Studio Code extension that provides source code formatting for Pascal/Object Pascal files. The extension integrates with external formatting tools (engines) like FreePascal PToP, Jedi Code Format, Embarcadero Formatter, and pasfmt to format Pascal code.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

Bootstrap, build, and test the repository:
- `git submodule init && git submodule update` -- initializes the vscode-whats-new submodule (takes ~5 seconds)
- `npm install` -- installs dependencies (takes ~15 seconds)
- `npm run build` -- webpack build in development mode (takes ~3 seconds). NEVER CANCEL.
- `npm run compile` -- TypeScript compilation (takes ~3 seconds). NEVER CANCEL.
- `npm run lint` -- ESLint validation (takes ~5 seconds). NEVER CANCEL.
- `npm run test-compile` -- TypeScript compilation + webpack build (takes ~5 seconds). NEVER CANCEL.
- `npm run vscode:prepublish` -- production webpack build (takes ~3 seconds). NEVER CANCEL.
- `npm run test` -- full test suite including compile + lint + test execution (may fail due to network connectivity requiring VS Code download). NEVER CANCEL. Set timeout to 10+ minutes.

Run the extension in development:
- ALWAYS run the bootstrapping steps first.
- Use VS Code's "Launch Extension" debug configuration (F5) to test the extension
- Or build with `npm run watch` for automatic rebuilds during development
- The extension requires external Pascal formatting tools to be installed for full functionality

## Validation

- ALWAYS manually validate any changes by testing the extension functionality in VS Code
- The extension provides Format Document and Format Selection commands for Pascal files
- Create a sample Pascal file with intentionally poor formatting to test the formatting functionality
- Test sample (.pas file):
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
- ALWAYS run `npm run lint` before committing as the CI (.github/workflows/main.yml) will fail on linting errors
- CI runs on Windows, Linux, and macOS using Node.js 16.x - ensure cross-platform compatibility
- Tests may fail in headless environments due to VS Code download requirements (xvfb-run used on Linux)

## External Dependencies

The extension requires external Pascal formatting tools to function:
- **FreePascal PToP**: Cross-platform, supports range formatting
- **Jedi Code Format**: Windows only, full file formatting
- **Jedi Code Format (Quadroid)**: Cross-platform
- **Embarcadero Formatter**: Windows only, full file formatting  
- **pasfmt**: Cross-platform

Configure via VS Code settings:
```json
{
    "pascal.formatter.engine": "ptop",
    "pascal.formatter.enginePath": "/usr/bin/ptop",
    "pascal.formatter.engineParameters": ""
}
```

## Common Tasks

The following are outputs from frequently run commands. Reference them instead of viewing, searching, or running bash commands to save time.

### Repository structure
```
├── .github/              # GitHub workflows and issue templates
├── .vscode/              # VS Code configuration (launch, tasks, settings)
├── dist/                 # Webpack output directory
├── images/               # Extension icon and assets
├── l10n/                 # Localization files
├── out/                  # TypeScript compilation output
├── src/                  # TypeScript source code
│   ├── extension.ts      # Main extension entry point
│   ├── formatter.ts      # Core formatting logic
│   ├── container.ts      # Dependency injection container
│   ├── test/             # Test files
│   └── whats-new/        # What's New feature
├── vscode-whats-new/     # Git submodule for What's New functionality
├── package.json          # Extension manifest and dependencies
├── tsconfig.json         # TypeScript configuration
└── webpack.config.js     # Webpack build configuration
```

### Package.json scripts
```json
{
    "build": "webpack --mode development",          // ~3 seconds
    "watch": "webpack --watch --mode development",  // continuous background process
    "compile": "tsc -p ./",                         // ~3 seconds  
    "lint": "eslint -c package.json --ext .ts src vscode-whats-new", // ~5 seconds
    "test": "npm run test-compile && npm run just-test",              // up to 10 minutes
    "test-compile": "tsc -p ./ && npm run webpack",                  // ~5 seconds
    "pretest": "npm run compile && npm run lint",                    // ~8 seconds
    "vscode:prepublish": "webpack --mode production"                 // ~3 seconds
}
```

### Key source files
- `src/extension.ts` - Extension activation, command registration, and formatter integration
- `src/formatter.ts` - Core formatting logic that interfaces with external tools
- `src/container.ts` - Dependency injection and context management
- `src/whats-new/` - What's New feature implementation

### Supported engines (from package.json)
- `embarcadero` - Embarcadero Formatter (Windows only)
- `jcf` - Jedi Code Format (Windows only)
- `jcf-quadroid` - Quadroid JEDI Code Format (cross-platform)
- `ptop` - FreePascal PToP (cross-platform, supports range formatting)
- `pasfmt` - pasfmt formatter (cross-platform)

### Development workflow
1. Make changes to TypeScript source files in `src/`
2. Run `npm run build` or `npm run watch` for automatic rebuilds  
3. Press F5 in VS Code to launch extension host for testing (uses .vscode/launch.json "Launch Extension" configuration)
4. Create a Pascal file (.pas) with poor formatting and test Format Document/Format Selection commands
5. Run `npm run lint` to check for code quality issues before committing
6. For full validation run `npm run test-compile` to ensure both TypeScript and webpack build successfully
7. Run full test suite with `npm test` (may require network connectivity and can take up to 10 minutes)

### Building without VS Code
The extension can be built and validated without VS Code using:
- `npm run build` for development build
- `npm run vscode:prepublish` for production build (creates minified 47KB vs 136KB output)
- `npm run lint` for code quality validation
- All build steps are very fast (under 5 seconds each) and should NEVER be cancelled

### Testing the extension
Since this is a VS Code extension, testing requires:
1. Building the extension with `npm run build`
2. Using VS Code's Extension Host (F5) to test functionality
3. Creating a sample Pascal file and testing format commands
4. Verifying integration with external formatting tools (if available)

Note: Full test suite requires VS Code test framework and may fail in headless environments due to network connectivity requirements.