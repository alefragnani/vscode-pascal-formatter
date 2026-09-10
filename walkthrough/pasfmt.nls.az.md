## pasfmt

**Platforma:** Windows, Linux, macOS

**Seçilmiş hissənin formatlaşdırılmasını dəstəkləyir:** Xeyr (yalnız bütöv sənəd)

### Addım 1 — Endir və quraşdır

[pasfmt alətini endir](https://github.com/integrated-application-development/pasfmt/releases/latest)

Platforman üçün icra faylını endir və onun yerini qeyd et.

### Addım 2 — Genişlənməni konfiqurasiya et

Parametrlərə aşağıdakıları əlavə et:

```json
{
    "pascal.formatter.engine": "pasfmt",
    "pascal.formatter.enginePath": "C:\\tools\\pasfmt.exe"
}
```

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Parametrləri aç" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Parametrləri aç</a>
    </td>
  </tr>
</table>
