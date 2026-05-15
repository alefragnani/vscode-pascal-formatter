## FreePascal PToP

**Plataforma:** Windows, Linux, macOS

**Suporta formatação de seleção:** Sim

### Passo 1 — Baixar e Instalar

[Baixar FreePascal PToP](https://www.freepascal.org/tools/ptop.html)

O PToP está incluído na distribuição do FreePascal. Anote o caminho de `ptop` (ou `ptop.exe` no Windows).

### Passo 2 — Configurar a Extensão

Adicione as seguintes configurações:

```json
{
    "pascal.formatter.engine": "ptop",
    "pascal.formatter.enginePath": "C:\\FPC\\2.6.4\\bin\\i386-win32\\ptop.exe",
    "pascal.formatter.engineParameters": "C:\\FPC\\2.6.4\\bin\\i386-win32\\default.cfg" // opcional — a extensão pode gerar um padrão
}
```

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Abrir Configurações" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Abrir Configurações</a>
    </td>
  </tr>
</table>
