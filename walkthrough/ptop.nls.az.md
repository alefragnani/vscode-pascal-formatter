## FreePascal PToP

**Platforma:** Windows, Linux, macOS

**Seçilmiş hissənin formatlaşdırılmasını dəstəkləyir:** Bəli

### Addım 1 — Endir və quraşdır

[FreePascal PToP alətini endir](https://www.freepascal.org/tools/ptop.html)

PToP FreePascal paylama paketinə daxildir. `ptop` faylının (Windows sistemində `ptop.exe`) yerini qeyd et.

### Addım 2 — Genişlənməni konfiqurasiya et

Parametrlərə aşağıdakıları əlavə et:

```json
{
    "pascal.formatter.engine": "ptop",
    "pascal.formatter.enginePath": "C:\\FPC\\2.6.4\\bin\\i386-win32\\ptop.exe",
    "pascal.formatter.engineParameters": "C:\\FPC\\2.6.4\\bin\\i386-win32\\default.cfg" // istəyə bağlıdır — genişlənmə standart konfiqurasiya faylı yarada bilər
}
```

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Parametrləri aç" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Parametrləri aç</a>
    </td>
  </tr>
</table>
