
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
  'А': 'A', 
  'а': 'a',
  'Б': 'B', 
  'б': 'b',
  'В': 'V', 
  'в': 'v',
  'Г': 'G', 
  'г': 'g',
  'Д': 'D', 
  'д': 'd',
/*'Е': 'E', 
  'е': 'e',
  'E': 'Je', 
  'e': 'je',*/
/*'Ё': 'O', 
  'ё': 'o',
  'Ё': 'Jo', 
  'ё': 'jo',*/
  'Ж': 'Ž', 
  'ж': 'ž',
  'З': 'Z', 
  'з': 'z',
/*'И': 'I', 
  'и': 'i',
  'И': 'Ji', 
  'и': 'ji',*/
/*'Й': 'I', 
  'й': 'i',
  'Й': 'J', 
  'й': 'j',
  'Й': '', 
  'й': '',*/
  'К': 'K', 
  'к': 'k',
  'Л': 'L', 
  'л': 'l',
  'М': 'M', 
  'м': 'm',
  'Н': 'N', 
  'н': 'n',
  'О': 'O', 
  'о': 'o',
  'П': 'P', 
  'п': 'p',
  'Р': 'R', 
  'р': 'r',
  'С': 'S', 
  'с': 's',
  'Т': 'T', 
  'т': 't',
  'У': 'U', 
  'у': 'u',
  'Ф': 'F', 
  'ф': 'f',
  'Х': 'H', 
  'х': 'h',
  'Ц': 'Ts', 
  'ц': 'ts',
  'Ч': 'Tš', 
  'ч': 'tš',
  'Ш': 'Š', 
  'ш': 'š',
  'Щ': 'Štš', 
  'щ': 'štš',
  'Ъ': '', 
  'ъ': '',
  'Ы': 'Y', 
  'ы': 'y',
  'Ь': '', 
  'ь': '',
  'Э': 'E', 
  'э': 'e',
  'Ю': 'Ju', 
  'ю': 'ju',
  'Я': 'Ja', 
  'я': 'ja'
};

function createConverter(word) {
  const warnings = [];

  function convertCharacter(char, i) {
    const previousCharacter = word[i-1];
    const nextCharacter = word[i+1];

    const isFirstCharacter = i === 0 || !characters.some(c => c === previousCharacter);
    const isLastCharacter = i === word.length-1 || !characters.some(c => c === nextCharacter);

    if (char === 'Е' && isConsonant(previousCharacter)) return 'E';
    if (char === 'е' && isConsonant(previousCharacter)) return 'e';
    
    if (char === 'Е' && isFirstCharacter) return 'Je';
    if (char === 'е' && isFirstCharacter) return 'je';
    
    if (char === 'Е' && ['Ъ','Ь','ъ','ь'].some(c => c === previousCharacter)) return 'Je';
    if (char === 'Е' && ['Ъ','Ь','ъ','ь'].some(c => c === previousCharacter)) return 'je';

    if (char === 'Е' && !isConsonant(previousCharacter)) return 'Je';
    if (char === 'е' && !isConsonant(previousCharacter)) return 'je';
    
    if (char === 'Ё' && ['ж', 'ч', 'ш', 'щ', 'Ж', 'Ч', 'Ш', 'Щ'].some(c => c === previousCharacter)) return 'O';
    if (char === 'ё' && ['ж', 'ч', 'ш', 'щ', 'Ж', 'Ч', 'Ш', 'Щ'].some(c => c === previousCharacter)) return 'o';
    if (char === 'Ё') return 'Jo';
    if (char === 'ё') return 'jo';

    if (char === 'И' && ['Ь','ь'].some(c => c === previousCharacter)) return 'Ji';
    if (char === 'и' && ['Ь','ь'].some(c => c === previousCharacter)) return 'ji';
    if (char === 'И') return 'I';
    if (char === 'и') return 'i';

    if (char === 'Й' && ['и', 'И'].some(c => c === previousCharacter) && isLastCharacter) return '';
    if (char === 'й' && ['и', 'И'].some(c => c === previousCharacter) && isLastCharacter) return '';

    if (char === 'Й' && isFirstCharacter) return 'J';
    if (char === 'й' && isFirstCharacter) return 'j';
    if (char === 'Й' && ['и', 'И'].some(c => c === previousCharacter)) return 'J';
    if (char === 'й' && ['и', 'И'].some(c => c === previousCharacter)) return 'j';

    if (char === 'Й') return 'I';
    if (char === 'й') return 'i';

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
  return consonants.some(c => c === char);
}
