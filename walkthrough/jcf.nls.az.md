## Jedi Code Format

**Platforma:** Yalnız Windows

**Seçilmiş hissənin formatlaşdırılmasını dəstəkləyir:** Xeyr (yalnız bütöv sənəd)

### Addım 1 — Endir və quraşdır

[Jedi Code Format alətini endir](http://jedicodeformat.sourceforge.net/)

Arxivi aç və `JCF.exe` faylının yerini qeyd et.

### Addım 2 — Genişlənməni konfiqurasiya et

Parametrlərə aşağıdakıları əlavə et:

```json
{
    "pascal.formatter.engine": "jcf",
    "pascal.formatter.enginePath": "C:\\JCF\\JCF.exe",
    "pascal.formatter.engineParameters": "C:\\JCF\\JCFSettings.cfg" // istəyə bağlıdır — genişlənmə standart konfiqurasiya faylı yarada bilər
}
```

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Parametrləri aç" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Parametrləri aç</a>
    </td>
  </tr>
</table>
