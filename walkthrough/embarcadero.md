## Embarcadero Formatter

**Platform:** Windows only

**Supports selection formatting:** No (full document only)

### Step 1 — Download and Install

The Embarcadero Formatter (`Formatter.exe`) ships with **RAD Studio** and **Delphi**.

[Learn more about Embarcadero Formatter](http://docwiki.embarcadero.com/RADStudio/Sydney/en/Formatter.EXE,_the_Command_Line_Formatter)

Locate `Formatter.exe` in your Delphi or RAD Studio installation directory.

### Step 2 — Configure the Extension

Open Settings and configure the following:

* `pascal.formatter.engine` → `embarcadero`
* `pascal.formatter.enginePath` → full path to `Formatter.exe`
* `pascal.formatter.engineParameters` → path to your formatter configuration file _(required)_

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Open Settings" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Open Settings</a>
    </td>
  </tr>
</table>
