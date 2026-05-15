## Jedi Code Format

**Plataforma:** Somente Windows

**Suporta formatação de seleção:** Não (apenas documento completo)

### Passo 1 — Baixar e Instalar

[Baixar Jedi Code Format](http://jedicodeformat.sourceforge.net/)

Extraia o arquivo e anote o caminho de `JCF.exe`.

### Passo 2 — Configurar a Extensão

Adicione as seguintes configurações:

```json
{
    "pascal.formatter.engine": "jcf",
    "pascal.formatter.enginePath": "C:\\JCF\\JCF.exe",
    "pascal.formatter.engineParameters": "C:\\JCF\\JCFSettings.cfg" // opcional — a extensão pode gerar um padrão
}
```

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Abrir Configurações" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Abrir Configurações</a>
    </td>
  </tr>
</table>
