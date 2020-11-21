const ruble = document.querySelector('.ruble'),
      btnConvert = document.querySelector('.convert'),
      convertValue = document.getElementById('convert-value'),
      refreshBtn = document.querySelector('.refresh'),
      usdBox = document.getElementById('usd'),
      eurBox = document.getElementById('euro'),
      result = document.querySelector('.result'),
      wrapper = document.querySelector('.wrapper'),
      todayRate = document.querySelector('.today-rate');

let euro = 'евро',
    usd = 'доллар';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

document.querySelectorAll('input').forEach((item)=>{ //сброс инпута, если там не число
  item.addEventListener('change', ()=>{
    if(!isNumber(item.value)){
      item.value = null;
    }
  });
});

const toConvert = (a, b, c)=>{ // функция конвертации
    if(ruble.value){
      convertValue.value = (a).toFixed(3);
      result.textContent = `сумма в ${c}`;
      btnConvert.disabled = true;
      ruble.disabled = true;
      convertValue.disabled = true;
    } else if (convertValue.value){
      ruble.value = (b).toFixed(3);
      btnConvert.disabled = true;
      convertValue.disabled = true;
      ruble.disabled = true;
    }
};

const apiUrl = 'https://api.exchangeratesapi.io/latest';

async function getRates(){
  const response = await fetch(apiUrl);
  const data = await response.json();
  const rates = data.rates;
  let rateUsd;

  const {RUB, USD} = rates;

  console.log(rates);

  rateUsd = USD/RUB;

  todayRate.textContent = `Курс доллара: ${(1/USD * RUB).toFixed(2)} руб.; Курс евро: ${RUB.toFixed(2)} руб.`;

  wrapper.addEventListener('click', (event)=>{
    let target = event.target;
    if(target.closest('.refresh')){
      ruble.value = '';
      convertValue.value = '';
      result.textContent = '';
      btnConvert.disabled = false;
      ruble.disabled = false;
      convertValue.disabled = false;
    }

    if(usdBox.checked)
      {
        convertValue.placeholder = 'Перевести в доллары';
        if(target === btnConvert){
        toConvert((ruble.value*rateUsd), (convertValue.value/rateUsd), usd);
      }} else if (eurBox.checked){
        convertValue.placeholder = 'Перевести в евро';
        if(target === btnConvert){
          toConvert((ruble.value/RUB), (convertValue.value*RUB), euro);
        }
      }
});
}

getRates();