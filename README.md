# Transliteration from russian text to finnish as defined in SFS-4900 standard

## Installation

```
npm install sfs4900
```

## Usage

```
var converter = require('sfs4900');

var conversion = converter.convertToLatin('Чайковский');

console.log(conversion);
/* prints:
{
 'from': 'Чайковский',
 'result': 'Tšaikovski',
 'warnings': []
}
*/
```

Warnings include notes on characters that were not converted. 

## See also

https://fi.wikipedia.org/wiki/Ven%C3%A4j%C3%A4n_translitterointi
