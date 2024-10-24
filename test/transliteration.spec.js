import { expect } from 'chai';
import { convertToLatin } from '../src/transliteration';

const mapping = [
  ['А', 'а'],['A','a'],     ['Анапа', 'Anapa'],
  ['Б', 'б'],['B','b'],     ['Бабаево', 'Babajevo'],
  ['В', 'в'],['V','v'],     ['Всеволожск', 'Vsevoložsk'],
  ['Г', 'г'],['G','g'],     ['Гагарин, Гоголь', 'Gagarin, Gogol'],
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
  ['Я', 'я'],['Ja','ja'],   ['Ярославль', 'Jaroslavl'],
  
];

const mappingUkr = [
  ['А', 'а'],['A','a'],	    ['Алушта', 'Alušta'],
  ['Б', 'б'],['B','b'],	    ['Бобринець', 'Bobrynets'],
  ['В', 'в'],['V','v'],     ['Вишневе', 'Vyšneve'],
  ['Г', 'г'],['H','h'],	    ['Генічеськ, Гоголь',	'Henitšesk, Hohol'],
  ['Ґ', 'ґ'],['G','g'],     ['Ґалаґан', 'Galagan'],
  ['Д', 'д'],['D','d'],	    ['Дніпродзержинськ', 'Dniprodzeržynsk'],
  ['Е', 'е'],['E','e'],     ['Енергодар', 'Enerhodar'],
  ['Є', 'є'],['Je','je'],	  ['Єнакієве', 'Jenakijeve'],
  ['Ж', 'ж'],['Ž','ž'],     ['Житомир', 'Žytomyr'],
  ['З', 'з'],['Z','z'],     ['Запоріжжя', 'Zaporižžja'],
  ['И', 'и'],['Y','y'],     ['Винники', 'Vynnyky'],
  ['І', 'і'],['I','i'],     ['Іллічівськ', 'Illitšivsk'],
  ['Ї', 'ї'],['Ji','ji'],	  ['Ізмаїл, Їжакевич', 'Izmajil, Jižakevytš'],
  ['Й', 'й'],['J','j'],	    ['Красноармійськ', 'Krasnoarmijsk'],
  ['Й', 'й'],['I','i'],     ['Гайсин, Хмельницький', 'Haisyn, H\'melnytskyi'],
  ['Й', 'й'],['-','-'],     ['Григорій', 'Hryhori'],
  ['К', 'к'],['K','k'],     ['Красноперекопськ', 'Krasnoperekopsk'],
  ['Л', 'л'],['L','l'],	    ['Лохвиця',	'Loh\'vytsja'],
  ['М', 'м'],['M','m'],     ['Миколаїв', 'Mykolajiv'],
  ['Н', 'н'],['N','n'],     ['Нетішин',	'Netišyn'],
  ['О', 'о'],['O','o'],	    ['Острог', 'Ostroh'],
  ['П', 'п'],['P','p'],	    ['Прип’ять', 'Prypjat'],
  ['Р', 'р'],['R','r'],     ['Рахів',	'Rah\'iv'],
  ['С', 'с'],['S','s'],	    ['Севастополь',	'Sevastopol'],
  ['Т', 'т'],['T','t'],	    ['Тальне', 'Talne'],
  ['У', 'у'],['U','u'],	    ['Умань',	'Uman'],
  ['Ф', 'ф'],['F','f'],	    ['Феодосія', 'Feodosija'],
  ['Х', 'х'],['H\'', 'h\''],['Христинівка', 'H\'rystynivka'],	// h ja puolilainausmerkki
  ['Ц', 'ц'],['Ts','ts'],	  ['Цюрупинськ', 'Tsjurupynsk'],
  ['Ч', 'ч'],['Tš','tš'],	  ['Чугуїв', 'Tšuhujiv'],
  ['Ш', 'ш'],['Š','š'],     ['Шепетівка',	'Šepetivka'],
  ['Щ', 'щ'],['Štš','štš'],	['Щастя',	'Štšastja'],
  ['Ю', 'ю'],['Ju','ju'],   ['Южне', 'Južne'],
  ['Я', 'я'],['Ja','ja'],	  ['Ялта', 'Jalta'],
  ['Ь', 'ь'],['-','-'],	    ['Комсомольськ', 'Komsomolsk'],
  ['’',	'’'],['', ''],  	['Куп’янськ',	'Kupjansk']	// puolilainausmerkki
  //['Ъ', 'ъ'],['', ''],			ei esiinny nykyortografiassa];
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

  const testDefinitionsUkr = mappingUkr.reduce((acc, item, i) => {
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

  testDefinitionsUkr.forEach(test => {
    it(`converts UKR ${test.from[0]} to ${test.to[0]} in ${test.word[0]} to ${test.word[1]}`, () => {
      expect(convertToLatin(test.word[0], 'ukr').result).to.equal(test.word[1]);
    });
    it(`converts UKR ${test.from[1]} to ${test.to[1]} in ${test.word[0]} to ${test.word[1]}`, () => {
      expect(convertToLatin(test.word[0], 'ukr').result).to.equal(test.word[1]);
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

