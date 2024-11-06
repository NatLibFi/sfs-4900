# SFS 4900 based transliteration from Russian and Ukranian to Finnish

## Installation

```
npm install sfs-4900
```

## Usage

```
var converter = require('sfs-4900');

var conversion = converter.convertToLatin('Чайковский, Гоголь'); // defaults to russian

// Second argument can be used to specify language code: 'rus' or 'ukr':
var ukrainianConversion = converter.convertToLatin('Гоголь', 'ukr');



console.log(conversion);
/* prints:
{
 'from': 'Чайковский, Гоголь',
 'result': 'Tšaikovski, Gogol',
 'warnings': []
}
*/


console.log(ukrainianConversion);
/* prints:
{
 'from': 'Гоголь',
 'result': 'Hohol',
 'warnings': []
}
*/
```

Warnings include notes on characters that were not converted.

## See also

- https://fi.wikipedia.org/wiki/Ven%C3%A4j%C3%A4n_translitterointi

- https://fi.wikipedia.org/wiki/Ukrainan_translitterointi
