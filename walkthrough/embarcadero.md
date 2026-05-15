## Embarcadero Formatter

**Platform:** Windows only

**Supports selection formatting:** No (full document only)

### Step 1 — Download and Install

The Embarcadero Formatter (`Formatter.exe`) ships with **RAD Studio** and **Delphi**.

[Learn more about Embarcadero Formatter](http://docwiki.embarcadero.com/RADStudio/Sydney/en/Formatter.EXE,_the_Command_Line_Formatter)

Locate `Formatter.exe` in your Delphi or RAD Studio installation directory.

### Step 2 — Configure the Extension

Add the following to your settings:

```json
{
    "pascal.formatter.engine": "embarcadero",
    "pascal.formatter.enginePath": "C:\\Program Files (x86)\\Embarcadero\\Studio\\22.0\\bin\\Formatter.exe",
    "pascal.formatter.engineParameters": "C:\\path\\to\\formatter.config" // required
}
```

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Open Settings" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Open Settings</a>
    </td>
  </tr>
</table>
