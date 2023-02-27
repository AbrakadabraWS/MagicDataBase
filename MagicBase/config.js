// import { log } from '../../log/logFunctions.js';             //функцианал логирования
import { DB_PATH, DB_INIT_STRUCTURE } from '../config.js';      //внешницй конфиг файл может быть общим конфигом проекта

// Путь где будет фаил храниться базы данных
export let DATA_BASE_PATH = DB_PATH;                            // Укажите путь где будет храниться файл базы данных с именем файла.

// Структура базы данных при создании базы, так же при изменении структуры и перезапуске кода базы 
// дополняет недостающими элементами базу данных (может удалять лишние элементы об этом дальше)
export let DATA_BASE_INIT_STRUCTURE = DB_INIT_STRUCTURE;                       // если вы хотите использовать внешний файл конфигуации в эту переменную необходимо передать объект базовой структуры вашей MagicDB

// Функции логирования по умолчанию используются console.log()
export let LOG = {
    INFO: (message) => console.log('info:' + message),          // если используете мой функцианал логирования log.info(message),
    DETAILS: (message) => console.log('details:' + message),    // если используете мой функцианал логирования log.details(message),
    ERROR: (message) => console.log('error:' + message),        // если используете мой функцианал логирования log.error(message),
    ALARM: (message) => console.log('alarm:' + message),        // если используете мой функцианал логирования log.alarm(message),
    WARNING: (message) => console.log('warning:' + message),    // если используете мой функцианал логирования log.warning(message),
    OK: (message) => console.log('ok:' + message),              // если используете мой функцианал логирования log.ok(message),
}
