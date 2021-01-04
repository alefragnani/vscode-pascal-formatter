[![](https://vsmarketplacebadge.apphb.com/version-short/alefragnani.pascal-formatter.svg)](https://marketplace.visualstudio.com/items?itemName=alefragnani.pascal-formatter)
[![](https://vsmarketplacebadge.apphb.com/downloads-short/alefragnani.pascal-formatter.svg)](https://marketplace.visualstudio.com/items?itemName=alefragnani.pascal-formatter)
[![](https://vsmarketplacebadge.apphb.com/rating-short/alefragnani.pascal-formatter.svg)](https://marketplace.visualstudio.com/items?itemName=alefragnani.pascal-formatter)
[![](https://img.shields.io/github/workflow/status/alefragnani/vscode-pascal-formatter/CI)](https://github.com/alefragnani/vscode-pascal-formatter/actions?query=workflow%3ACI)

<p align="center">
  <br />
  <a title="Learn more about Pascal Formatter" href="http://github.com/alefragnani/vscode-pascal-formatter"><img src="https://raw.githubusercontent.com/alefragnani/vscode-pascal-formatter/master/images/vscode-pascal-formatter-logo-readme.png" alt="Pascal Formatter Logo" width="70%" /></a>
</p>

# What's new in Pascal Formatter 2.4

* **Embarcadero Formatter** support
* **OmniPascal** extension support

# Support

**Pascal Formatter** is an open source extension created for **Visual Studio Code**. While being free and open source, if you find it useful, please consider supporting it

<table align="center" width="60%" border="0">
  <tr>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=US&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=BR&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=BRL&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/pt_BR/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="Patreon" href="https://www.patreon.com/alefragnani"><img src="https://raw.githubusercontent.com/alefragnani/oss-resources/master/images/button-become-a-patron-rounded-small.png"/></a>
    </td>
  </tr>
</table>

# Pascal Formatter

It adds **Code Formatters** for **Pascal** language and its dialects like **Delphi** and **FreePascal**. 

> This extension was originally extracted from my [Pascal](https://github.com/alefragnani/vscode-language-pascal) extension

# Features

Standardise your **Pascal** code! 

It uses external tools _(engines)_ to format the code, so you must install them prior to use the `Format Document` and `Format Selection` commands.

* **Jedi Code Format:** http://jedicodeformat.sourceforge.net/ (Windows only)
* **FreePascal PToP:** http://wiki.freepascal.org/PTop (Windows, Linux and Mac OS X)
* **Embarcadero Formatter:** http://docwiki.embarcadero.com/RADStudio/Sydney/en/Formatter.EXE,_the_Command_Line_Formatter (Windows only)

> If you intend to format _pieces of selected texts_ instead of _the entire file_, you should use **FreePascal PToP**, because the **Jedi Code Format** and **Embarcadero Formatter** only works for entire files. 

## Available settings

You can choose which formatter engine to use _(required)_:

* `ptop`: FreePascal PToP
* `jcf`: Jedi Code Formatter
* `embarcadero`: Embarcadero Formatter

```json
    "pascal.formatter.engine": "ptop"
```

* Indicates the engine app path _(required)_
```json
    "pascal.formatter.enginePath": "C:\\FPC\\2.6.4\\bin\\i386-win32\\ptop.exe" 
```

* Indicates the configuration file for the selected engine _(optional)_
```json
    "pascal.formatter.engineParameters": "C:\\FPC\\2.6.4\\bin\\i386-win32\\default.cfg"
```

If you decide to use **FreePascal PToP**, you have two additional settings:

* The number of spaces used for indentation
```json
    "pascal.format.indent": 2 
```

* Maximum amount of characters per line
```json
    "pascal.format.wrapLineLength": 80
```

## Available Commands

The extension seamlessly integrates with the `Format Document` and `Format Selection` commands **Visual Studio Code**.

![format-code](images/vscode-pascal-format-code.gif)

There is also:

* **Pascal Formatter: Edit Formatter Parameters** Opens/Generate the _parameters file_ for the selected engine

## Contributors

Special thanks to the people that have contributed to the project:

* @AThePeanut4 - Embarcadero Formatter support ([see PR](https://github.com/alefragnani/vscode-pascal-formatter/pull/23))

# License

[MIT](LICENSE.md) &copy; Alessandro Fragnani