import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class LocaleService {
  static currentLocale: Subject<any> = new Subject<any>();
  private locales = {
    'am-et': {
      resetZoom: '',
      noDataAvailable: '',
      months: ['ጃንዩ', 'ፌብሩ', 'ማርች', 'ኤፕረ', 'ሜይ', 'ጁን', 'ጁላይ', 'ኦገስ', 'ሴፕቴ', 'ኦክተ', 'ኖቬም', 'ዲሴም'],
      shortMonths: ['ጃንዩ', 'ፌብሩ', 'ማርች', 'ኤፕረ', 'ሜይ', 'ጁን', 'ጁላይ', 'ኦገስ', 'ሴፕቴ', 'ኦክተ', 'ኖቬም', 'ዲሴም'],
      weekdays: ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ']
    },
    ar: {
      resetZoom: 'إعادة ضبط التكبير',
      noDataAvailable: 'لا تتوافر بيانات',
      months: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      shortMonths: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      weekdays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة', 'السبت']
    },
    bg: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['яну.', 'фев.', 'март', 'апр.', 'май', 'юни', 'юли', 'авг.', 'сеп.', 'окт.', 'ное.', 'дек.'],
      shortMonths: ['яну.', 'фев.', 'март', 'апр.', 'май', 'юни', 'юли', 'авг.', 'сеп.', 'окт.', 'ное.', 'дек.'],
      weekdays: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
    },
    bn: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'],
      shortMonths: ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'],
      weekdays: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি']
    },
    ca: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Gen', 'Febr', 'Març', 'Abr', 'Maig', 'Juny', 'Jul', 'Ag', 'Set', 'Oct', 'Nov', 'Des'],
      shortMonths: ['Gen', 'Febr', 'Març', 'Abr', 'Maig', 'Juny', 'Jul', 'Ag', 'Set', 'Oct', 'Nov', 'Des'],
      weekdays: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds']
    },
    cs: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čvn', 'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'],
      shortMonths: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čvn', 'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'],
      weekdays: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']
    },
    da: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
      weekdays: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør']
    },
    de: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
    },
    'de-ch': {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
    },
    el: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαι', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'],
      shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαι', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'],
      weekdays: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ']
    },
    en: {
      resetZoom: 'Reset zoom',
      noDataAvailable: 'No Data Available',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    'en-au': {
      resetZoom: 'Reset zoom',
      noDataAvailable: 'No Data Available',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    es: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      weekdays: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
    },
    et: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jaan', 'Veebr', 'Märts', 'Apr', 'Mai', 'Juuni', 'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets'],
      shortMonths: ['Jaan', 'Veebr', 'Märts', 'Apr', 'Mai', 'Juuni', 'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets'],
      weekdays: ['P', 'E', 'T', 'K', 'N', 'R', 'L']
    },
    fi: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Tam', 'Hel', 'Maa', 'Huh', 'Tou', 'Kes', 'Hei', 'Elo', 'Syy', 'Lok', 'Mar', 'Jou'],
      shortMonths: ['Tam', 'Hel', 'Maa', 'Huh', 'Tou', 'Kes', 'Hei', 'Elo', 'Syy', 'Lok', 'Mar', 'Jou'],
      weekdays: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La']
    },
    fr: {
      resetZoom: 'Réinitialiser le zoom',
      noDataAvailable: 'Pas de données disponibles',
      months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      shortMonths: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    },
    'fr-ch': {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      shortMonths: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    },
    he: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
      shortMonths: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
      weekdays: ['רא', 'שנ', 'של', 'רב', 'חמ', 'שי', 'שב']
    },
    hr: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Sij', 'Vel', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro'],
      shortMonths: ['Sij', 'Vel', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro'],
      weekdays: ['Ne', 'Po', 'Ul', 'Sr', 'Če', 'Pe', 'Su']
    },
    hu: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
      shortMonths: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
      weekdays: ['Vas', 'Hét', 'Kedd', 'Sze', 'Csü', 'Pén', 'Szo']
    },
    id: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
      weekdays: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
    },
    is: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['jan', 'feb', 'mar', 'apr', 'maí', 'jún', 'júl', 'ágú', 'sep', 'okt', 'nóv', 'des'],
      shortMonths: ['jan', 'feb', 'mar', 'apr', 'maí', 'jún', 'júl', 'ágú', 'sep', 'okt', 'nóv', 'des'],
      weekdays: ['sun', 'mán', 'þri', 'mið', 'fim', 'fös', 'lau']
    },
    it: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
      shortMonths: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
      weekdays: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
    },
    'it-ch': {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
      shortMonths: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
      weekdays: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
    },
    ja: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['１月', '２月', '３月', '４月', '５月', '６月', '７月', '８月', '９月', '１０月', '１１月', '１２月'],
      shortMonths: ['１月', '２月', '３月', '４月', '５月', '６月', '７月', '８月', '９月', '１０月', '１１月', '１２月'],
      weekdays: ['日', '月', '火', '水', '木', '金', '土']
    },
    kk: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау', 'Шіл', 'Там', 'Қырк', 'Қаз', 'Қар', 'Желт'],
      shortMonths: ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау', 'Шіл', 'Там', 'Қырк', 'Қаз', 'Қар', 'Желт'],
      weekdays: ['Жк', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб']
    },
    'ko-kr': {
      resetZoom: '재설정 줌',
      noDataAvailable: '자료 없음',
      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      weekdays: ['일', '월', '화', '수', '목', '금', '토']
    },
    lt: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Saus.', 'Vas.', 'Kov.', 'Bal.', 'Geg.', 'Birž.', 'Liep.', 'Rugp.', 'Rugs.', 'Sapl.', 'Lapkr.', 'Gruod.'],
      shortMonths: ['Saus.', 'Vas.', 'Kov.', 'Bal.', 'Geg.', 'Birž.', 'Liep.', 'Rugp.', 'Rugs.', 'Sapl.', 'Lapkr.', 'Gruod.'],
      weekdays: ['Sk', 'Pr', 'An', 'Tr', 'Kt', 'Pn', 'Št']
    },
    lv: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Janv', 'Febr', 'Marts', 'Apr', 'Maijs', 'Jūn', 'Jūl', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec'],
      shortMonths: ['Janv', 'Febr', 'Marts', 'Apr', 'Maijs', 'Jūn', 'Jūl', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec'],
      weekdays: ['S', 'P', 'O', 'T', 'C', 'P', 'S']
    },
    my: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်', 'ဇူလိုင်', 'ဩဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ'],
      shortMonths: [
        'ဇန်နဝါရီ',
        'ဖေဖော်ဝါရီ',
        'မတ်',
        'ဧပြီ',
        'မေ',
        'ဇွန်',
        'ဇူလိုင်',
        'ဩဂုတ်',
        'စက်တင်ဘာ',
        'အောက်တိုဘာ',
        'နိုဝင်ဘာ',
        'ဒီဇင်ဘာ'
      ],
      weekdays: ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြသပတေး', 'သောကြာ', 'စနေ']
    },
    nl: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
      weekdays: ['Zon', 'Maa', 'Din', 'Woe', 'Don', 'Vri', 'Zat']
    },
    no: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
      weekdays: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør']
    },
    pl: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
      shortMonths: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
      weekdays: ['Nie', 'Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob']
    },
    'pt-br': {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
    },
    ro: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['ian', 'feb', 'mart', 'apr', 'mai', 'iun', 'iul', 'aug', 'sept', 'oct', 'nov', 'dec'],
      shortMonths: ['ian', 'feb', 'mart', 'apr', 'mai', 'iun', 'iul', 'aug', 'sept', 'oct', 'nov', 'dec'],
      weekdays: ['du', 'lu', 'ma', 'mi', 'jo', 'vi', 'sa']
    },
    ru: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек'],
      shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек'],
      weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    },
    sk: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún', 'Júl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún', 'Júl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
      weekdays: ['Ne', 'Po', 'Ut', 'St', 'Št', 'Pi', 'So']
    },
    sl: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
      weekdays: ['Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob']
    },
    sv: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
      weekdays: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör']
    },
    th: {
      resetZoom: 'รีเซ็ตการซูม',
      noDataAvailable: 'ไม่มีข้อมูล',
      months: ['ม.ค', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
      shortMonths: ['ม.ค', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
      weekdays: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
    },
    tr: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
      shortMonths: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
      weekdays: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
    },
    uk: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
      shortMonths: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
      weekdays: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    },
    vi: {
      resetZoom: '',
      noDataAvailable: '',
      months: ['THG 1', 'THG 2', 'THG 3', 'THG 4', 'THG 5', 'THG 6', 'THG 7', 'THG 8', 'THG 9', 'THG 10', 'THG 11', 'THG 12'],
      shortMonths: ['THG 1', 'THG 2', 'THG 3', 'THG 4', 'THG 5', 'THG 6', 'THG 7', 'THG 8', 'THG 9', 'THG 10', 'THG 11', 'THG 12'],
      weekdays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
    },
    zh: {
      resetZoom: '重置缩放',
      noDataAvailable: '无可用数据',
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    },
    'zh-tw': {
      resetZoom: '重置縮放',
      noDataAvailable: '無可用數據',
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      weekdays: ['週日', '週一', '週二', '週三', '週四', '週五', '週六']
    }
  };

  constructor() {}

  getLocale(): Observable<any> {
    return LocaleService.currentLocale.asObservable();
  }

  setLocale(locale?: string) {
    let selectedLocale: any;
    if (locale && this.locales.hasOwnProperty(locale)) {
      selectedLocale = this.locales[locale];
    } else {
      selectedLocale = this.locales['en'];
    }
    LocaleService.currentLocale.next(selectedLocale);
  }
}
