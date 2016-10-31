import { expect } from 'chai';
import { convertToLatin } from '../src/transliteration';

const mapping = [
  ['А', 'а'],['A','a'],     ['Анапа', 'Anapa'],
  ['Б', 'б'],['B','b'],     ['Бабаево', 'Babajevo'],
  ['В', 'в'],['V','v'],     ['Всеволожск', 'Vsevoložsk'],
  ['Г', 'г'],['G','g'],     ['Гагарин', 'Gagarin'],
  ['Д', 'д'],['D','d'],     ['Дедовск', 'Dedovsk'],
  ['Е', 'е'],['E','e'],     ['Дальнереченск', 'Dalneretšensk'],
  ['E', 'e'],['Je','je'],   ['Егорьевск, Гаджиево', 'Jegorjevsk, Gadžijevo'],
  ['Ё', 'ё'],['O','o'],     ['Горбачёв, Тимашёвск, Хрущёв', 'Gorbatšov, Timašovsk, Hruštšov'],
  ['Ё', 'ё'],['Jo','jo'],   ['Королёв', 'Koroljov'],
  ['Ж', 'ж'],['Ž','ž'],     ['Железнодорожный', 'Železnodorožnyi'],
  ['З', 'з'],['Z','z'],     ['Заозёрск', 'Zaozjorsk'],
  ['И', 'и'],['I','i'],     ['Ишим', 'Išim'],
  ['И', 'и'],['Ji','ji'],   ['Краснотурьинск', 'Krasnoturjinsk'],
  ['Й', 'й'],['I','i'],     ['Ясный, Валдайский район', 'Jasnyi, Valdaiski raion'],
  ['Й', 'й'],['J','j'],     ['Каспийск, Йошкар-Ола', 'Kaspijsk, Joškar-Ola'],
  ['Й', 'й'],['', ''],      ['Чайковский', 'Tšaikovski'],
  ['К', 'к'],['K','k'],     ['Копейск', 'Kopeisk'],
  ['Л', 'л'],['L','l'],     ['Лихославль', 'Lihoslavl'],
  ['М', 'м'],['M','m'],     ['Мурманск', 'Murmansk'],
  ['Н', 'н'],['N','n'],     ['Ногинск', 'Noginsk'],
  ['О', 'о'],['O','o'],     ['Олонец', 'Olonets'],
  ['П', 'п'],['P','p'],     ['Почеп', 'Potšep'],
  ['Р', 'р'],['R','r'],     ['Рязань', 'Rjazan'],
  ['С', 'с'],['S','s'],     ['Сестрорецк', 'Sestroretsk'],
  ['Т', 'т'],['T','t'],     ['Тольятти', 'Toljatti'],
  ['У', 'у'],['U','u'],     ['Уссурийск', 'Ussurijsk'],
  ['Ф', 'ф'],['F','f'],     ['Фатеж', 'Fatež'],
  ['Х', 'х'],['H','h'],     ['Хабаровск', 'Habarovsk'],
  ['Ц', 'ц'],['Ts','ts'],   ['Цивильск', 'Tsivilsk' ],
  ['Ч', 'ч'],['Tš','tš'],   ['Чита', 'Tšita'],
  ['Ш', 'ш'],['Š','š'],     ['Шушары', 'Šušary'],
  ['Щ', 'щ'],['Štš','štš'], ['Щёлково', 'Štšolkovo'],
  ['Ъ', 'ъ'],['',''],       ['субъект', 'subjekt'],
  ['Ы', 'ы'],['Y','y'],     ['Кызыл', 'Kyzyl'],
  ['Ь', 'ь'],['',''],       ['Козьмодемьянск', 'Kozmodemjansk'],
  ['Э', 'э'],['E','e'],     ['Энгельс', 'Engels'],
  ['Ю', 'ю'],['Ju','ju'],   ['Юрюзань', 'Jurjuzan'],
  ['Я', 'я'],['Ja','ja'],   ['Ярославль', 'Jaroslavl']
];

describe('Transliteration', function() {

  const testDefinitions = mapping.reduce((acc, item, i) => {
    if (i%3 === 0) { 
      acc.push({}); 
    }
    
    const current = acc[acc.length-1];

    switch(i%3) {
    case 0: current.from = item; break;
    case 1: current.to = item; break;
    case 2: current.word = item; break;
    }
    return acc;

  }, []);

  testDefinitions.forEach(test => {
    it(`converts ${test.from[0]} to ${test.to[0]} in ${test.word[0]} to ${test.word[1]}`, () => {
      expect(convertToLatin(test.word[0]).result).to.equal(test.word[1]);
    });
    it(`converts ${test.from[1]} to ${test.to[1]} in ${test.word[0]} to ${test.word[1]}`, () => {
      expect(convertToLatin(test.word[0]).result).to.equal(test.word[1]);
    });

  });

  describe('when given non-cyrillic characters', function() {
    let conversion;
    beforeEach(() => {
      conversion = convertToLatin('Aнапа');
    });

    it('adds warning to result', function() {
      expect(conversion.warnings).to.include('Character A at position 0 was not cyrillic.');
    });
    it('converts the cyrillic characters', function() {
      expect(conversion.result).to.equal('Anapa');
    });
  });
});

