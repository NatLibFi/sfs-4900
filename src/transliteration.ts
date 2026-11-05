// Based on https://fi.wikipedia.org/wiki/Ven%C3%A4j%C3%A4n_translitterointi and https://fi.wikipedia.org/wiki/Ukrainan_translitterointi

export type Lang = 'rus' | 'ukr';

export interface ConversionResult {
  from: string;
  result: string;
  warnings: string[];
}

const consonants: string[] = ['б', 'в', 'г', 'ґ', 'д', 'ж', 'з', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Ж', 'З', 'К', 'Л', 'М', 'Н', 'П', 'Р', 'С', 'Т', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ'];

const characters: string[] = ['А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Ґ', 'ґ', 'Д', 'д', 'Е', 'е', 'E', 'e', 'Ё', 'ё', 'Ё', 'ё', 'Є', 'є', 'Ж', 'ж', 'З', 'з', 'И', 'и', 'И', 'и', 'І', 'і', 'Ї', 'ї', 'Й', 'й', 'Й', 'й', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н', 'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у', 'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ъ', 'ъ', 'Ы', 'ы', 'Ь', 'ь', 'Э', 'э', 'Ю', 'ю', 'Я', 'я', '’'];

const map: Record<string, string> = {
  'А': 'A', // Both
  'а': 'a',
  'Б': 'B', // Both
  'б': 'b',
  'В': 'V', // Both
  'в': 'v',
  'Г': 'G', // rus, ukr h, Ґ ґ g, see code
  'г': 'g',
  'Ґ': 'G', // UKR-only
  'ґ': 'g',
  'Д': 'D', // both
  'д': 'd',
  // 'Е': 'E', // UKR is simpler
  // 'е': 'e',
  // 'E': 'Je',
  // 'e': 'je',
  // 'Ё': 'O', // RUS only
  // 'ё': 'o',
  // 'Ё': 'Jo',
  // 'ё': 'jo',
  'Є': 'Je', // UKR only
  'є': 'je',
  'Ж': 'Ž', // Both
  'ж': 'ž',
  'З': 'Z', // Both
  'з': 'z',
  'И': 'I', // RUS: 'i'/'ji'. UKR: 'y'. Default to 'i'
  'и': 'i',
  //'И': 'Ji',
  //'и': 'ji',*/
  'І': 'I', // UKR only
  'і': 'i',
  'Ї': 'Ji', // UKR only
  'ї': 'ji',
  'Й': 'I', // RUS and UKR both map to 'i'/'j'/'', but the rules differ slightly. Map to I/i by default
  'й': 'i',
  //'Й': 'J',
  //'й': 'j',
  //'Й': '',
  //'й': '',
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
  'Я': 'Ja', // Both
  'я': 'ja',
  '’': '' // UKR only
};

interface Converter {
  warnings: string[];
  convertCharacter: (char: string, i: number) => string;
}

function createConverter(word: string, lang: Lang = 'rus'): Converter {
  const warnings: string[] = [];
  //console.log(`LANG: ${lang}`); // eslint-disable-line no-console

  function eOrJe(char: string, previousCharacter?: string): string {
    if (lang === 'ukr') {
      return char === 'Е' ? 'E' : 'e';
    }
    if (isConsonant(previousCharacter)) {
      if (includesAny(['Ъ', 'Ь', 'ъ', 'ь'], previousCharacter)) {
        return char === 'Е' ? 'Je' : 'je';
      }
      return char === 'Е' ? 'E' : 'e';
    }

    //if (isFirstCharacter || ['Ъ','Ь','ъ','ь'].includes(previousCharacter) || !isConsonant(previousCharacter)) {
    return char === 'Е' ? 'Je' : 'je';
  }

  function gOrH(char: string): string {
    if (lang === 'ukr') {
      return char === 'Г' ? 'H' : 'h';
    }

    return char === 'Г' ? 'G' : 'g';
  }
  function iOrJ(char: string, previousCharacter: string | undefined, isFirstCharacter: boolean, isLastCharacter: boolean): string {
    if (isFirstCharacter) { // Both RUS and UKR
      return char === 'Й' ? 'J' : 'j';
    }

    if (lang === 'ukr' && includesAny(['І', 'і'], previousCharacter)) {
      if (isLastCharacter) {
        return '';
      }
      return char === 'Й' ? 'J' : 'j';
    }
    if (lang === 'rus' && includesAny(['и', 'И'], previousCharacter)) {
      if (isLastCharacter) {
        return '';
      }
      return char === 'Й' ? 'J' : 'j';
    }
    return char === 'Й' ? 'I' : 'i';
  }

  function convertCharacter(char: string, i: number): string {
    const previousCharacter = word[i - 1];
    const nextCharacter = word[i + 1];

    const isFirstCharacter = i === 0 || !characters.some(c => c === previousCharacter);

    if (['Г', 'г'].includes(char)) { // 'gogol' vs 'hohol'
      return gOrH(char);
    }

    if (['Е', 'е'].includes(char)) {
      return eOrJe(char, previousCharacter);
    }

    if (['Ё', 'ё'].includes(char)) { // RUS only
      if (includesAny(['ж', 'ч', 'ш', 'щ', 'Ж', 'Ч', 'Ш', 'Щ'], previousCharacter)) {
        return previousCharacter === 'Ё' ? 'O' : 'o';
      }
      return previousCharacter === 'Ё' ? 'Jo' : 'jo';
    }

    if (['И', 'и'].includes(char)) {
      if (lang === 'ukr') {
        return char === 'И' ? 'Y' : 'y';
      }
      if (includesAny(['Ь', 'ь'], previousCharacter)) {
        return char === 'И' ? 'Ji' : 'ji';
      }
      return char === 'И' ? 'I' : 'i';
    }

    if (['Й', 'й'].includes(char)) {
      const isLastCharacter = i === word.length - 1 || !characters.some(c => c === nextCharacter);
      return iOrJ(char, previousCharacter, isFirstCharacter, isLastCharacter);
    }

    if (lang === 'ukr') {
      if (char === 'Х') {
        return 'H\'';
      }
      if (char === 'х') {
        return 'h\'';
      }
    }

    return convertCharacter2();

    function convertCharacter2(): string {
      const converted = map[char];

      if (converted === undefined) {
        warnings.push(`Character ${char} at position ${i} was not cyrillic.`);
        return char;
      }

      return converted;
    }
  }

  return {
    warnings,
    convertCharacter
  };
}

export function convertToLatin(word: string, lang: Lang = 'rus'): ConversionResult {
  const converter = createConverter(word, lang);

  const convertedWord = word.split('').map((char, i) => converter.convertCharacter(char, i)).join('');

  return {
    from: word,
    result: convertedWord,
    warnings: converter.warnings
  };
}

function isConsonant(char?: string): boolean {
  return char !== undefined && consonants.includes(char);
}

function includesAny(list: string[], value?: string): boolean {
  return value !== undefined && list.includes(value);
}
