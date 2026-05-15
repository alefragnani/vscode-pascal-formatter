## FreePascal PToP

**Platform:** Windows, Linux, macOS

**Supports selection formatting:** Yes

### Step 1 — Download and Install

[Download FreePascal PToP](https://www.freepascal.org/tools/ptop.html)

PToP is included with the FreePascal distribution. Note the location of `ptop` (or `ptop.exe` on Windows).

### Step 2 — Configure the Extension

Open Settings and configure the following:

* `pascal.formatter.engine` → `ptop`
* `pascal.formatter.enginePath` → full path to `ptop` / `ptop.exe`
* `pascal.formatter.engineParameters` → path to a `.cfg` configuration file _(optional — the extension can generate a default one)_

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Open Settings" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Open Settings</a>
    </td>
  </tr>
</table>
