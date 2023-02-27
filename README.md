# Magic Database

## О MagicDB

MagicDB это простейший варинт noSQL базы данных в виде **JSON** файла.

Имеются 3 базовые функции для работы с базой данных:

* startDataBase - Запуск базы данных
* SET - Добавить данные в базу данных
* GET - Запросить данные из базы данных
* DELETE - Удалить данные из базы данных

#### Структура базы данных

Предусмотрен функцианал базовой структуры который вы можете задать или в .../MagicBase/config.js или в своем конфиг файле проекта (подробнее дальше).

#### Где хранить данные

В том же файле необходимо указать путь к файлу самой базы данных с именем.

#### Хочу знать что происходит с базой

Предусмотрен функцианал логирования по умолчанию настроено использование console.log но вы можете это изменить в файле конфигурации .../MagicBase/config.js

---

## Добавление в свой проект

Для того чтоб добавить Magic DB в свой проект просто перенесите папку magicDataBase в папку с проктом и импортируйте файл **magicDataBaseFunctions.js** туда где вы хотите использовать базу данных.

#### Обязательно

* Загляните в файл конфигурации базы данных **.../MagicBase/config.js**
* Для запуска базы данных необходимо при запуске проекта вызвать функцию **startDataBase()**

---

## Функции

#### startDataBase()

Функция которую необходимо выполнить при запуске проекта иначе база данных не будет запущена и файл базы данных не будет создан/прочитан. Функция не принимает никаких аргументов.

#### SET

Функция записи данных в базу данных принимает аргументы `path`, `data` и `itemName`. Возвращает резальтат выполнения **true** если данные успешно записаны или **false** если возникла какая то ошибка во время записи.

| Аргумент | тип данных        | Описание                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path             | String                     | ***Обязательный*** <br />Путь к точке записи в базе данных                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| data             | any (кроме undefined) | ***Обязательный***<br />Данные которые хотим записать в базу данных                                                                                                                                                                                                                                                                                                                                                                                                                      |
| itemName         | String                     | Конечная точка записи, если точка уже<br />существует конечный элемент можно указать <br />как чать пути, тогда этот аргумент будет ***не обязателен***. <br />Если конечная точка записи элемента данных <br />не существует то её название ***обязательно*** <br />необходимо указать в этом аргументе |

Пример использования:

```javascript

/*
  Если вы хотите перезаписать данные 
  существующего элемента itemName можно
  указать как часть пути
*/
dataBase.SET('path/some/itemName', dataJon);

/*
  или если itemName хранится в отдельной
  переменной или вы хотите
  создать новый элемент базы данных
*/

dataBase.SET('path/some', dataJon, itemName);

/*
  Если вы хотите записать что либо в корень базы данных
  обязательно испоьзуйте аргумент itemName и укажите 
  в аргументе path '/'
*/

dataBase.SET('/', dataJon, itemName);


```

#### GET

Запрос данных из базы принимает аргумент `path`. Возвращает **данные** прочитанные из базы данных по указанному пути в арументе `path` или **false** если во время чтения данных произошла ошибка.

| Аргумент | тип данных | Описание                                                                                                                                                                                                  |
| ---------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path             | String              | ***Обязательный*** <br />Путь к точке чтения из базы данных. <br />Обязательно должен включать в себя конечную точку  |

Пример использования:

```javascript

let data = database.GET('path/some/itemName');

// или если itemName хранится в отдельной переменной

let data = database.GET('path/some/' + itemName);

```

#### DELETE

Удаление данных из базы принимает аргументы `path` и `itemName`. Возвращает **true** если данные были успешно удалены из базы данных или **false** при возникновении какой либо ошибки во время удаления.

| Аргумент | тип данных | Описание                                                                                                                                                                                  |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path             | String              | ***Обязательный*** <br />Путь к точке удаления из базы данных                                                                                  |
| itemName         | String              | ***Обязательный***<br />Конечная точка - имя элемента данных<br />который необходимо удалить из базы данных |

Пример использования:

```javascript

database.DELETE('path/some', 'itemName');

// или если itemName хранится в отдельной переменной

database.DELETE('path/some', itemName);

```

---

## Важные моменты

**Запрещено** использовать символ `/` в наименовании элементов данных.

#### Путь (path)

При вызове `GET`, `SET` или `DELETE` путь (строка аргумента `path`) обязательно ***не должна*** заканчиваться на `/` иначе есть шанс получить/записать/удалить не правильные данные или ошибку.

Если вы хотите получить/запиать/удалить данные в корне базы данных используйте в аргументе `path`  - `/`

---

## exampleConfig.js

В даном примере конфигураци базы данных указыны две переменные

* DB_PATH - путь где будет храниться файл базы данных.
* DB_INIT_STRUCTURE - структура базы данных при инициализации.

Ниже подробнее разберем эти переменные. 

#### DB_PATH

Переменная в которой необходимо указать путь где будет храниться база данных. В нашем примере файл базы данных будет храниться в корне проекта.

#### DB_INIT_STRUCTURE

Переменная в которой хранится структура базы данных при инициализации. Это означает что при создании файла базы данных, всё что записанно в данной переменной будет записано в базу данных. Если база данных уже создана и вы решили дополнить структуру вашей MagicDB вам достаточно лишь дописать необходимые строки в переменную DB_INIT_STRUCTURE и MagicDB при следующем перезапуске проекта добавил недостающие строки в вашу базу данных.

Рассмотрим подробнее наш пример:

```javascript
export const DB_INIT_STRUCTURE = {
// Корень базы данных
    users: {
	// path = 'users/'
        1234567890: {
	    // path = 'users/1234567890/'
            id: 1234567890,               // path = 'users/1234567890/id'
            name: 'Jon',                  // path = 'users/1234567890/name'
            age: 25,                      // path = 'users/1234567890/age'
            provfession: 'programmer',    // path = 'users/1234567890/provfession'
            level: 'midle',               // path = 'users/1234567890/level'
        },
        ...
    },
    worck: {
	// path = 'worck/'
        programmer: {
	    // path = 'worck/programmer/'
            junior: [1234567892],         // path = 'worck/programmer/junior'
            midle: [1234567890],          // path = 'worck/programmer/midle'
            senior: [1234567891],         // path = 'worck/programmer/senior'
        },
        analitic: {
	    // path = 'worck/analitic/'
            junior: [],                   // path = 'worck/analitic/junior'
            midle: [1234567893],          // path = 'worck/analitic/midle'
            senior: [],                   // path = 'worck/analitic/senior'
        },
    }
}
```

В нашем примере при инициализации создается база данных с двумя элементами в корне базы данных это `users` - элемент данных в котором мы будем записывать пользователей и `worck` элемент данных в котором мы запишем профессии. Как вы могли уже заменить на этапе иницализации базы данных в элементе данных будут созданы несколько пользователей. Обычно структура инициализации **не должна** содержать конкретных данных, **только структуру базы данных**. В данном примере это сделано нарошно, в дальнейшем используя эту структура будут приведены примеры работы с такой базой данных.

> ***Почему не стоит в структуру инициализаци прописывать конкретные данные?***
>
> Структура базы данных это лишь основной скелет которы должен быть **неизменым** при каждом запуске проекта, допускается лишь добавление новых ветвей. Если в структуре инициализации базы данных прописать конекретные данные как в данном примере то даже после удаления данных с помощью `DELETE`, после перезапуска проекта база дынных снова восстановит удаленные элементы данных.

Идем дальше, в элементе данных `users` есть вложенные элементы данных имена которых соответствуют id пользователей. В примерах ярасскажу как работать с этими элементами данных.

В элементе данных `worck` есть два вложенных элемента данных `programmer` и `analitic` которые в себе содержат еще по три вложенных элемента дных `junior`, `midle` и `senior`. последние три элемента данных содержат в себе массивы с id пользователей,  таким образом пользователи привязаны к определенным профессиям и уровням квалификации, в свою очередь в элементах данных пользователей есть вложенные элементы данных `profession` и `level` определяющие профессию и уровень квалификации пользователя соответственно.

Как работать с подобной структурой MagicDB более подробно рассмотрим в следующем разделе с примерами.

---

## Прмеры

#### GET - запрос данных

Начнем с запроса данных так как у нас уже есть базовая структура данных и соответственно мы уже можем получть необходимую информацию из MagicDB

> Про структуру базы данных при инициализации прочитайте предидущий разде **exampleConfig.js**

Итак начнем для начала запросим все данные которые у нас есть

```javascript

import database from './magicDataBase.js';

...

let data = database.GET('/');
console.log(data);

...

/* вывод в консоль будет примерно следующий:
{
  users:{
    1234567890:[Object],
    1234567891:[Object],
    1234567892:[Object],
    1234567893:[Object]
  },
  worck: {
    programmer: [Object],
    analitic: [Object]
  }
}
*/

```

Попробуем запросить информацию из элемента данных `programmer` вложенного в элемент данных `worck`

```javascript

import database from './magicDataBase.js';

...

let data = database.GET('worck/programmer');  // Обратите внимание строка НЕ заканчивается на "/"
console.log(data);

...

/* вывод в консоль будет примерно следующий:
{
  junior: [1234567892],
  midle: [1234567890],
  senior: [1234567891]
}
*/

```

А что если запросить `users`

```javascript

import database from './magicDataBase.js';

...

let data = database.GET('users');  // Обратите внимание строка НЕ заканчивается на "/"
console.log(data);

...

/* вывод в консоль будет примерно следующий:
}
  users: {
    1234567890: [Object],
    1234567891: [Object],
    1234567892: [Object],
    1234567893: [Object]
  }
}
*/

```

Допустим мы хотим полусить name (имя) и age (возраст) пользователя c id 1234567890

```javascript


import database from './magicDataBase.js';

...

let {name, age} = database.GET('users/1234567890');  // Обратите внимание строка НЕ заканчивается на "/"
console.log('Имя: ' + name + ' Возраст: ' + age);

...

/* вывод в консоль будет следующий:
Имя: Jon Возраст: 25
*/

```

---

#### SET - запись/перезапись новых данных

Добавим новый элемент данных в корень базы данных 

```javascript


import database from './magicDataBase.js';

...
let newItemData = {
	surfing: [],
	downhill: [],
	drawing: []
     	};

database.SET('/', newItemData, 'hobby');

...

/* Если открыть файл базы данных то мы увидем следующее (для примера содержимое базы данных отабражено не полностью)
{
    users: {
        ...
    },
    worck: {
        ...
    },
    hobby: {
	surfing: [],
	downhill: [],
	drawing: []
    }
}
*/



```

Попробуем добавить нового пользователя

```javascript


import database from './magicDataBase.js';

...
let newUser = {
            id: 1234567894,
            name: 'Jack',
            age: 28,
            provfession: 'programmer',
            level: 'midle',
        }

database.SET('users', newUser, newUser.id );  // Обратите внимание строка НЕ заканчивается на "/"

...

```

Так как мы только что добавили новго пользователя его было бы не плохо привязать к профессии

```javascript


import database from './magicDataBase.js';

...
/*
Так как id пользователей у нас храняться в массиве мы должны получить списко пользователей которые уже прописаны. Иначе если мы запишем id нового пользователя просто в элемент данных то мы потеряем существующий массив и в элементе данных будет число соответствующее одному пользователю
*/

// запрашиваем список пользователей профессии programmer уровня midle
let programmersLevelMidle = database.GET('worck/programmer/midle');

// в переменной programmersLevelMidle сейчас хранится массив: [1234567890] дополним его новым id
programmersLevelMidle.push(1234567894);

// в переменной programmersLevelMidle теперь хранится массив: [1234567890, 1234567894] запишем новые данные
database.SET('worck/programmer', programmersLevelMidle, 'midle' );  // Обратите внимание строка НЕ заканчивается на "/"

// готово теперь у нас добавлен id нового пользователя в массив программистов уровня мидл

...


```

После двух выше приведенных примеров наша база данных будет выглядеть так

```json
{
    users: {
        1234567890: {
            id: 1234567890,
            name: 'Jon',
            age: 25,
            provfession: 'programmer',
            level: 'midle'
        },
        1234567891: {
            id: 1234567891,
            name: 'Peter',
            age: 25,
            provfession: 'programmer',
            level: 'senior'
        },
        1234567892: {
            id: 1234567892,
            name: 'Ann',
            age: 25,
            provfession: 'programmer',
            level: 'junior'
        },
        1234567893: {
            id: 1234567893,
            name: 'Jil',
            age: 23,
            provfession: 'analitic',
            level: 'midle'
        },
	1234567893: {
            id: 1234567894,
            name: 'Jack',
            age: 28,
            provfession: 'programmer',
            level: 'midle'
        }
    },
    worck: {
        programmer: {
            junior: [1234567892],
            midle: [1234567890],
            senior: [1234567891]
        },
        analitic: {
            junior: [],
            midle: [1234567893],
            senior: []
        }
    },
    hobby: {
	surfing: [],
	downhill: [],
	drawing: []
    }
}
```

---

#### DELETE - удаление данных

Попробуем удалить элемент данных из корня нашей базы данных который мы создавали ранее `hobby`

```javascript


import database from './magicDataBase.js';

...

database.DELETE('/','hobby' );

...


```

А теперь и данные пользователя которого мы создавали

```javascript


import database from './magicDataBase.js';

...

database.DELETE('users', '1234567894' );

...


```

Чтоб удалить `id` пользователя из списка мидл программистов `/worck/programmer/midle` применять функцию `DELETE` **НЕ** стоит так как в таком случае мы удалим весь массив данных, в данном случае стоит поступить так же как и с добавлением с небольшим изменением

1. Прочесть элемент данных из базы
2. Изменить массив удалив лишь ненужный элемент массива
3. Перезаписать данные в элемент