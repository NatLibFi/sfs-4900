
const consonants = [
  'б', 'в', 'г', 'д', 'ж', 'з', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 
  'Б', 'В', 'Г', 'Д', 'Ж', 'З', 'К', 'Л', 'М', 'Н', 'П', 'Р', 'С', 'Т', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ'
];

const characters = [
  'А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'E', 'e', 'Ё', 'ё', 'Ё', 'ё', 'Ж', 
  'ж', 'З', 'з', 'И', 'и', 'И', 'и', 'Й', 'й', 'Й', 'й', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 
  'Н', 'н', 'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у', 'Ф', 'ф', 'Х', 'х', 'Ц', 
  'ц', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ъ', 'ъ', 'Ы', 'ы', 'Ь', 'ь', 'Э', 'э', 'Ю', 'ю', 'Я', 'я'
];

const map = {
  'А': 'A', // Both
  'а': 'a',
  'Б': 'B', // Both
  'б': 'b',
  'В': 'V', // Both
  'в': 'v',
  'Г': 'G', // rus, ukr h, Ґ ґ	g
  'г': 'g',
  'Д': 'D', // both
  'д': 'd',
/*'Е': 'E', // UKR is simpler
  'е': 'e',
  'E': 'Je',
  'e': 'je',*/
/*'Ё': 'O', // RUS only
  'ё': 'o',
  'Ё': 'Jo',
  'ё': 'jo',*/
  'Ж': 'Ž', // Both
  'ж': 'ž',
  'З': 'Z', // Both
  'з': 'z',
/*'И': 'I', // UKR: 'y'
  'и': 'i',
  'И': 'Ji',
  'и': 'ji',*/
/*'Й': 'I', // RUS and UKR differ
  'й': 'i',
  'Й': 'J',
  'й': 'j',
  'Й': '',
  'й': '',*/
  'К': 'K', // both
  'к': 'k',
  'Л': 'L', // both
  'л': 'l',
  'М': 'M', // both
  'м': 'm',
  'Н': 'N', // both
  'н': 'n',
  'О': 'O', // both
  'о': 'o',
  'П': 'P', // both
  'п': 'p',
  'Р': 'R', // both
  'р': 'r',
  'С': 'S', // both
  'с': 's',
  'Т': 'T', // both
  'т': 't',
  'У': 'U', // both
  'у': 'u',
  'Ф': 'F', // both
  'ф': 'f',
  'Х': 'H', // UKR: h’
  'х': 'h',
  'Ц': 'Ts', // both
  'ц': 'ts',
  'Ч': 'Tš', // both
  'ч': 'tš',
  'Ш': 'Š', // both
  'ш': 'š',
  'Щ': 'Štš', // both
  'щ': 'štš',
  'Ъ': '', // both (UKR: no longer used)
  'ъ': '',
  'Ы': 'Y', // RUS onlt
  'ы': 'y',
  'Ь': '', // both
  'ь': '',
  'Э': 'E', // RUS only
  'э': 'e',
  'Ю': 'Ju', // Both
  'ю': 'ju',
  'Я': 'Ja', // RUS only
  'я': 'ja'
};

function createConverter(word) {
  const warnings = [];

  function convertCharacter(char, i) {
    const previousCharacter = word[i-1];
    const nextCharacter = word[i+1];

    const isFirstCharacter = i === 0 || !characters.some(c => c === previousCharacter);
    const isLastCharacter = i === word.length-1 || !characters.some(c => c === nextCharacter);

    if (['Е', 'е'].includes(char)) {
      if (isConsonant(previousCharacter)) {
        if (['Ъ','Ь','ъ','ь'].includes(previousCharacter)) {
          return 'Е' === char ? 'Je' : 'je';
        }
        return 'Е' === char ? 'E' : 'e';
      }

      //if (isFirstCharacter || ['Ъ','Ь','ъ','ь'].includes(previousCharacter) || !isConsonant(previousCharacter)) {
      return 'Е' === char ? 'Je' : 'je';
    }

    if (['Ё', 'ё'].includes(char)) {
      if (['ж', 'ч', 'ш', 'щ', 'Ж', 'Ч', 'Ш', 'Щ'].includes(previousCharacter)) {
        return previousCharacter === 'Ё' ? 'O' : 'o';
      }
      return previousCharacter === 'Ё' ? 'Jo' : 'jo';
    }

    if (['И', 'и'].includes(char)) {
      if (['Ь','ь'].includes(previousCharacter)) {
        return char === 'И' ? 'Ji' : 'ji';
      }
      return char === 'И' ? 'I' : 'i';
    }

    if (['Й', 'й'].includes(char)) {
      if (isLastCharacter && ['и', 'И'].includes(previousCharacter)) {
        return '';
      }

      if (isFirstCharacter || ['и', 'И'].includes(previousCharacter)) {
        return char === 'Й' ? 'J' : 'j';
      }
 

      return char === 'Й' ? 'I' : 'i';
    }

    const converted = map[char];

    if(converted === undefined) {
      warnings.push(`Character ${char} at position ${i} was not cyrillic.`);
    }

    return converted !== undefined ? converted : char;
  }
  return {
    warnings: warnings,
    convertCharacter: convertCharacter
  };
}

export function convertToLatin(word) {
  const converter = createConverter(word);

  const convertedWord = word.split('').map(converter.convertCharacter).join('');

  return {
    from: word,
    result: convertedWord,
    warnings: converter.warnings
  };
}

function isConsonant(char) {
  return consonants.includes(char);
}
