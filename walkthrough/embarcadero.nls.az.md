## Embarcadero Formatter

**Platforma:** Yalnız Windows

**Seçilmiş hissənin formatlaşdırılmasını dəstəkləyir:** Xeyr (yalnız bütöv sənəd)

### Addım 1 — Endir və quraşdır

Embarcadero Formatter (`Formatter.exe`) **RAD Studio** və **Delphi** ilə birlikdə təqdim olunur.

[Embarcadero Formatter haqqında ətraflı öyrən](http://docwiki.embarcadero.com/RADStudio/Sydney/en/Formatter.EXE,_the_Command_Line_Formatter)

Delphi və ya RAD Studio quraşdırma qovluğunda `Formatter.exe` faylını tap.

### Addım 2 — Genişlənməni konfiqurasiya et

Parametrlərə aşağıdakıları əlavə et:

```json
{
    "pascal.formatter.engine": "embarcadero",
    "pascal.formatter.enginePath": "C:\\Program Files (x86)\\Embarcadero\\Studio\\22.0\\bin\\Formatter.exe",
    "pascal.formatter.engineParameters": "C:\\path\\to\\formatter.config" // tələb olunur
}
```

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Parametrləri aç" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Parametrləri aç</a>
    </td>
  </tr>
</table>
