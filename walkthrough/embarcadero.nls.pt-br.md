## Embarcadero Formatter

**Plataforma:** Somente Windows

**Suporta formatação de seleção:** Não (apenas documento completo)

### Passo 1 — Baixar e Instalar

O Embarcadero Formatter (`Formatter.exe`) é distribuído com o **RAD Studio** e o **Delphi**.

[Saiba mais sobre o Embarcadero Formatter](http://docwiki.embarcadero.com/RADStudio/Sydney/en/Formatter.EXE,_the_Command_Line_Formatter)

Localize o `Formatter.exe` no diretório de instalação do Delphi ou RAD Studio.

### Passo 2 — Configurar a Extensão

Adicione as seguintes configurações:

```json
{
    "pascal.formatter.engine": "embarcadero",
    "pascal.formatter.enginePath": "C:\\Program Files (x86)\\Embarcadero\\Studio\\22.0\\bin\\Formatter.exe",
    "pascal.formatter.engineParameters": "C:\\path\\to\\formatter.config" // obrigatório
}
```

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Abrir Configurações" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Abrir Configurações</a>
    </td>
  </tr>
</table>
