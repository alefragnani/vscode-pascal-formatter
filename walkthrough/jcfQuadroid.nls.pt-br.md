## Jedi Code Format (Quadroid)

**Plataforma:** Windows, Linux, macOS

**Suporta formatação de seleção:** Não (apenas documento completo)

### Passo 1 — Baixar e Instalar

[Baixar JCF (Quadroid)](https://github.com/quadroid/jcf-pascal-format)

Extraia o arquivo e anote o caminho do executável `jcf`.

### Passo 2 — Configurar a Extensão

Adicione as seguintes configurações:

```json
{
    "pascal.formatter.engine": "jcf-quadroid",
    "pascal.formatter.enginePath": "C:\\tools\\jcf\\jcf.exe"
}
```

<table align="center" width="85%" border="0">
  <tr>
    <td align="center">
      <a title="Abrir Configurações" href="command:workbench.action.openSettings?%5B%22pascal.formatter%22%5D">Abrir Configurações</a>
    </td>
  </tr>
</table>
