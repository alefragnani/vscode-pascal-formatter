## pasfmt

**Plataforma:** Windows, Linux, macOS

**Suporta formatação de seleção:** Não (apenas documento completo)

### Passo 1 — Baixar e Instalar

[Baixar pasfmt](https://github.com/integrated-application-development/pasfmt/releases/latest)

Baixe o binário para sua plataforma e anote sua localização.

### Passo 2 — Configurar a Extensão

Adicione as seguintes configurações:

```json
{
    "pascal.formatter.engine": "pasfmt",
    "pascal.formatter.enginePath": "C:\\tools\\pasfmt.exe"
}
```

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Abrir Configurações" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Abrir Configurações</a>
    </td>
  </tr>
</table>
