## pasfmt

**Platform:** Windows, Linux, macOS

**Supports selection formatting:** No (full document only)

### Step 1 — Download and Install

[Download pasfmt](https://github.com/integrated-application-development/pasfmt/releases/latest)

Download the binary for your platform and note its location.

### Step 2 — Configure the Extension

Add the following to your settings:

```json
{
    "pascal.formatter.engine": "pasfmt",
    "pascal.formatter.enginePath": "C:\\tools\\pasfmt.exe"
}
```

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Open Settings" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Open Settings</a>
    </td>
  </tr>
</table>
