// #region Variables
const inc = document.getElementById('all_income');
const exp = document.getElementById('all_expenses');
const budg = document.getElementById('budget__value');

const tincome = document.querySelector('.total_income');
const texpenses = document.querySelector('.total_expenses');
// #endregion

inc.innerHTML = localStorage.getItem('income');
exp.innerHTML = localStorage.getItem('expenses');

const BudgSaveData = {};
let id = 0;

//4.Izveidot funkciju_1, kas izmaina pieejamā budžeta vertību
function TotalBudget(tbudg) {
  budg.innerHTML = parseInt(budg.innerHTML, 0) + parseInt(tbudg, 0);
  localstorage();
}

//5.Izveidot funkciju_2, kuru izsaucot, tiek pievienoti ienākumi vai izdevumi html elementu sarakstiem
function additem(isincome, description, value) {
  var item = document.createElement('DIV');
  item.className += 'list_item';
  var valdiv = document.createElement('DIV');
  valdiv.className += 'list_valdivue';
  var descrdiv = document.createElement('DIV');
  descrdiv.className += 'list_description';
  descrdiv.innerHTML = description;

  if (isincome == 'true') {
    valdiv.innerHTML = '+' + value + '€';
    BudgSaveData['income' + id.toString()] = 'id:' + id + 'description:' + description + 'value:' + value;
    console.log('BudgSavedData', BudgSaveData);
    inc.appendChild(item);
  } else {
    valdiv.innerHTML = '-' + value + '€';
    exp.appendChild(item);
    value = -Math.abs(value);
  }
  id++;
  item.appendChild(descrdiv);
  item.appendChild(valdiv);
  updatetotals(value, isincome);
  TotalBudget(value);
}

//6.Izveidot funkciju_3, kas izsaucas pēc pogas "pievienot" nospiešanas
//7.Funkcijai_3 jāpārbauda vai apraksta un summas lauks ir aizpildīts, ja nav, tad izvada paziņojumu par to, ka kāds no laukiem nav aizpildīts
//8.Funkcijai_3 ir jāizsauc funkcija_2, kas pievieno ienākumu vai izdevumu sarakstam jaunu ierakstu.
function addtolist() {
  var val = document.getElementById('add_value');
  var descr = document.getElementById('add_description');
  var isitincome = document.getElementById('add_type');
  if (val.value == '' || descr.value == '') {
    alert('Visi lauki nav aizpildīti!');
  } else {
    additem(isitincome.value, descr.value, val.value);
  }
}

function updatetotals(value, income) {
  if (income == 'true') {
    tincome.innerHTML = parseInt(tincome.innerHTML, 0) + parseInt(value, 0);
  } else {
    texpenses.innerHTML = parseInt(texpenses.innerHTML, 0) - parseInt(value, 0);
  }
}

function localstorage() {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('income', inc.innerHTML);
    localStorage.setItem('expenses', exp.innerHTML);
    localStorage.setItem('budleft', budg.innerHTML);
  }
}

function clearlocal() {
  localStorage.clear();
  location.reload();
}

//Salabot localStorage tā lai pec lapas refresha nepazūd pieejamais budžets un kopējie izdebvumu un inākumu vērtība
//Izveidot vienu mainīgo kura veido sarakstu ar inākumie un izdevumiem un to visu glabāt objektā kuru pēc tam saglaba localStorage
//Optimizēt kodu atbrīvoties no liekā
//Pievienot iepsēju izveidot jaunu mēnesi. Opcija Jauns menesis saglabās iepriekšeja meneša datus un nodzēsīs laukus priekš jauna meneša.
//Pēc vajadzibas var atvert iepriekšejos menešos un apskatīt no ienākumus un izdevumus
