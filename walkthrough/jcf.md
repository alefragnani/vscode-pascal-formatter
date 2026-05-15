## Jedi Code Format

**Platform:** Windows only

**Supports selection formatting:** No (full document only)

### Step 1 — Download and Install

[Download Jedi Code Format](http://jedicodeformat.sourceforge.net/)

Extract the archive and note the location of `JCF.exe`.

### Step 2 — Configure the Extension

Add the following to your settings:

```json
{
    "pascal.formatter.engine": "jcf",
    "pascal.formatter.enginePath": "C:\\JCF\\JCF.exe",
    "pascal.formatter.engineParameters": "C:\\JCF\\JCFSettings.cfg" // optional — the extension can generate a default one
}
```

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Open Settings" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Open Settings</a>
    </td>
  </tr>
</table>
