// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const maxWeightInput = document.querySelector('.maxweight__input'); // поле с max весом
const minWeightInput = document.querySelector('.minweight__input'); // поле с min весом

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);


/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
      // TODO: очищаем fruitsList от вложенных элементов, чтобы заполнить актуальными данными из fruits
      // TODO: формируем новый элемент <li> при помощи document.createElement, и добавляем в конец списка fruitsList при помощи document.appendChild
const display = () => {
  fruitsList.innerHTML = ``;
    for (let i = 0; i < fruits.length; i++) {
      let fruitCard = document.createElement(`li`);
      fruitCard.innerHTML = `№${i+1} <br> Name: ${fruits[i].kind} <br> Color: ${fruits[i].color} <br> Weight: ${fruits[i].weight} кг`;
        
      function fruitCardColoring(color, text) {
          if (fruits[i].color === color) {
            fruitCard.className = text;
          }          
      };

      fruitCardColoring("фиолетовый", "fruit__item fruit_violet");
      fruitCardColoring("зеленый", "fruit__item fruit_green");
      fruitCardColoring("розово-красный", "fruit__item fruit_carmazin");
      fruitCardColoring("желтый", "fruit__item fruit_yellow");
      fruitCardColoring("светло-коричневый", "fruit__item fruit_lightbrown");

      fruitsList.appendChild(fruitCard);
    }
};

// первая отрисовка карточек
display();


/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
      // TODO: допишите функцию перемешивания массива
      //
      // Подсказка: находим случайный элемент из fruits, используя getRandomInt
      // вырезаем его из fruits и вставляем в result.
      // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
      // (массив fruits будет уменьшатся, а result заполняться)

const shuffleFruits = () => {
  let result = [];

  while (fruits.length > 0) {
    let index = getRandomInt(0, fruits.length - 1);
      result.push(fruits[index]);
      fruits.splice(index, 1);
  };

    fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});


/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
      // TODO: допишите функцию
const filterFruits = () => {
  fruits.filter((item) => {
    let max = maxWeightInput.value
    let min = minWeightInput.value
    let result = [];
    i = 0;

    while (i < fruits.length) {

      if (fruits[i].weight <= max && fruits[i].weight >= min) {
        result.splice(0, 0, fruits[i]);        
      };
      
      i++
    };

    fruits = result;
    item = fruits;

  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});


/*** СОРТИРОВКА ***/
      // TODO: допишите функцию сравнения двух элементов по цвету
      // TODO: допишите функцию сортировки пузырьком
      // TODO: допишите функцию быстрой сортировки

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки
let priority = {
  // 1: "светло-коричневый",
  // 2: "желтый",
  // 3: "розово-красный",
  // 4: "зеленый",
  // 5: "фиолетовый"
  "светло-коричневый": 1,
  "желтый": 2,
  "розово-красный": 3,
  "зеленый": 4,
  "фиолетовый": 5
};
      
      // TODO: допишите функцию сравнения двух элементов по цвету
const comparationColor = (a, b) => {
  return priority[a.color] > priority[b.color];  
};

function quickSortFunction(items, comparation, left, right) {
  // функция обмена элементов
    function swap(items, firstIndex, secondIndex){
      const temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;
    };

  // функция разделитель
    function partition(items, left, right) {
      let pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;
       
        while (i <= j) {
          while (comparation(pivot, items[i])) {
            i++;
          }
          while (comparation(items[j], pivot)) {
            j--;
          }
            if (i <= j) {
              swap(items, i, j);
              i++;
              j--;
            }
        }
      
      return i;
    };

  // алгоритм быстрой сортировки
    let index;
    if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;
      index = partition(items, left, right);
        
        if (left < index - 1) {
          quickSortFunction(items, comparation, left, index - 1);
        }

        if (index < right) {
          quickSortFunction(items, comparation, index, right);
        }
    
    }
       
    return items;
};

      // TODO: допишите функцию сортировки пузырьком
      // TODO: допишите функцию быстрой сортировки      
const sortAPI = {
  bubbleSort(items, comparation) {
    const n = items.length;
    
    for (let i = 0; i < n - 1; i++) { 
      for (let j = 0; j < n - 1 - i; j++) { 
        if (comparation(items[j], items[j + 1])) { 
          let temp = items[j + 1]; 
          items[j + 1] = items[j]; 
          items[j] = temp; 
        }
      }                    
    }
  },

  quickSort(items, comparation, right, left) {
    quickSortFunction(items, comparation, left, right);  
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, items, comparation) {
    const start = new Date().getTime();
    sort(items, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

      // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
sortChangeButton.addEventListener('click', () => {
  if(sortKind == 'bubbleSort') {
    sortKind = 'quickSort';
  } else {
    sortKind = 'bubbleSort';
  };
  sortKindLabel.textContent = sortKind;
  sortTime = '-';
  sortTimeLabel.textContent = sortTime;
});

      // TODO: вывести в sortTimeLabel значение 'sorting...'
      // TODO: вывести в sortTimeLabel значение sortTime
sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  let sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});


/*** ДОБАВИТЬ ФРУКТ ***/
      // TODO: создание и добавление нового фрукта в массив fruits. Необходимые значения берем из kindInput, colorInput, weightInput
addActionButton.addEventListener('click', () => {
  let weightInputNumber = Number(weightInput.value);
  let fruitCard = {"kind": kindInput.value, "color": colorInput.value, "weight": weightInputNumber};

  if(kindInput.value == "") { alert("Вы не ввели название фруктов"); }
  if(colorInput.value == "") { alert("Вы не ввели цвет фруктов"); }
  if(weightInput.value == "") { alert("Вы не ввели вес фруктов"); }
    else {
      fruits.push(fruitCard);  
    };

  display();
});