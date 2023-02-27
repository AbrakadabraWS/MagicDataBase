import * as fs from 'fs';
import {
    DATA_BASE_PATH,
    DATA_BASE_INIT_STRUCTURE,
    LOG,
} from './config.js';

/** Data base object.
 * It contains everything you need to work with the database.
 */
let botDataBase = {

    /** The path string to the database file.
     * 
     */
    path: DATA_BASE_PATH,

    /** Base object.
     * Contains database data.
     */
    base: DATA_BASE_INIT_STRUCTURE,


    /** Flag for writing a database file.
     * True - there is a writed.
     * False - ready to write.
     */
    writedFlag: false,

    /** Bufer flag.
     * True - there is data in the buffer that needs to be written. 
     * False - the buffer is empty.
     */
    buferFlag: false,

    /** The function of writing the database to JSON files.
     * 
     */
    writeDatabaseFile: function () {
        if (this.writedFlag) {
            this.buferFlag = true;
        }
        else {
            this.writedFlag = true;

            let json = JSON.stringify(this.base, null, 4);
            this.buferFlag = false;

            fs.writeFile(this.path, json, function writeFileCallback(err) {
                if (err) {
                    LOG.ALARM(`!!! Error write database !!!`);
                    LOG.ERROR(err);
                    LOG.ALARM(`!!! End error masage !!!`);
                }
                else {
                    LOG.OK(`+++ Database is written. +++`);
                    this.writedFlag = false;

                    if (this.buferFlag) {
                        this.writeDatabaseFile();
                    }
                }
            }.bind(this));
        }
    },

    /** The function of creating a new file from an empty database.
     *  
     */
    newDatabaseFile: function () {
        LOG.INFO(`=== New Database file ===`);
        LOG.DETAILS(`init data:`);
        LOG.DETAILS(this.base);

        this.writeDatabaseFile();
    },

    databasesAreDifferentFlag: false,

    arrayDifference: function (arrayMain, arrayForСomparison) {
        return arrayForСomparison.filter(item => !arrayMain.includes(item))
    },

    updateArray: function (oldArray, updatingArray) {
        let newItems = oldArray.filter(item => !updatingArray.includes(item))
            .concat(updatingArray.filter(item => !oldArray.includes(item)))
        let newArray = oldArray.concat(newItems);
        return newArray;
    },

    checkingStructureLayerFiling: function (changedDataBase, mainDataBase) {
        let changedKeys = Object.keys(changedDataBase);
        let mainKeys = Object.keys(mainDataBase);

        mainKeys.forEach((key) => {
            if (changedKeys.includes(key)) {
                //если в базе есть такое поле
                // то открываем его и смотрим что внутри
                if (typeof changedDataBase[key] === 'object' &&
                    changedDataBase[key] !== null &&
                    !Array.isArray(changedDataBase[key])
                ) {
                    this.checkingStructureLayerFiling(changedDataBase[key], mainDataBase[key]);
                }
            }
            else {
                this.databasesAreDifferentFlag = true;
                LOG.DETAILS(` +--- The database structure has been updated, the ${key} field with all attachments has been added.`);
                changedDataBase[key] = mainDataBase[key];
            }
        });
        return changedDataBase;
    },

    comparisonBases: function (loadedBase) {
        LOG.INFO(`=== Checking the database structure ===`)
        const result = this.checkingStructureLayerFiling(loadedBase, DATA_BASE_INIT_STRUCTURE);
        return result;
    },

    /** The function reads the JSON file of the database. */
    readDatabaseFile: function () {
        LOG.INFO('...The database is being loaded... expect');

        try {
            const dataOfFile = fs.readFileSync(this.path, 'utf8')
            const loadedBase = JSON.parse(dataOfFile);              //конвертируем из json и забираем из него инфу
            const actualBase = this.comparisonBases(loadedBase);    //сравниваем базу данных с шаблоном
            this.base = actualBase;

            if (this.databasesAreDifferentFlag) {   //на случай если во время разработки мы поменяли состав/структуру БД
                LOG.WARNING(`!!! There is something missing in the database file !!!`)
                this.writeDatabaseFile();
            }
            LOG.OK(`+++ Database is download. +++`);
        }
        catch (err) {
            LOG.ALARM(`!!! Error download database !!!`);
            LOG.ERROR(err);
            LOG.ALARM(`!!! End error masage !!!`);

            this.newDatabaseFile();
        }
    },

    setItem: function (object, pathArray, data, itemName) {
        const pathSection = pathArray[0];
        pathArray.splice(0, 1);

        if (object[pathSection] !== undefined) {
            if (pathArray.length) {
                return this.setItem(object[pathSection], pathArray, data, itemName);
            }
            else {
                if (object[pathSection] !== undefined) {
                    object[pathSection][itemName] = data;
                    return true;
                }
                else {
                    LOG.ERROR(`${pathSection} << is not defined!`);
                    return false;
                }
            }
        }
        else {
            LOG.ERROR(`${pathSection} << is not defined!`);
            return false
        }
    },

    SET: function (path, data, itemName) {
        let result;

        if (!data) {
            LOG.ERROR(`data not specified!`);
            return false;
        }

        if (!path || path === '/') {
            if (itemName) {
                this.base[itemName] = data;
                result = true;
            }
            else {
                LOG.ERROR(`The path and itemName is not specified!`);
                return false;
            }
        }
        else {
            const pathArray = path.split('/');

            if (!itemName) {
                itemName = pathArray[pathArray.length - 1];
                pathArray.splice(pathArray.length - 1, 1);
            }

            result = this.setItem(this.base, pathArray, data, itemName);
        }

        if (result) {
            this.writeDatabaseFile();
        }

        return result;
    },


    getItem: function (object, pathArray) {
        const pathSection = pathArray[0];
        pathArray.splice(0, 1);

        if (object[pathSection] !== undefined) {
            if (pathArray.length) {
                return this.getItem(object[pathSection], pathArray);
            }
            else {
                return object[pathSection];
            }
        }
        else {
            LOG.ERROR(`${pathSection} << is not defined!`);
        }
    },

    GET: function (path) {
        if (!path || path === '/') {
            return this.base;
        }
        const pathArray = path.split('/');
        return this.getItem(this.base, pathArray);
    },


    deleteItem: function (object, pathArray, itemName) {
        const pathSection = pathArray[0];
        pathArray.splice(0, 1);

        if (object[pathSection] !== undefined) {
            if (pathArray.length) {
                return this.deleteItem(object[pathSection], pathArray, itemName);
            }
            else {
                if (!object[pathSection][itemName]) {
                    LOG.WARNING(`${itemName} << is not defined!`);
                }
                else {
                    delete object[pathSection][itemName];
                }
                return true;
            }
        }
        else {
            LOG.ERROR(`${pathSection} << path is not defined!`);
            return false;
        }
    },

    DELETE: function (path, itemName) {
        let result = false;
        if (!itemName) {
            LOG.ERROR(`itemName not specified!`);
            return false;
        }

        if (!path || path === '/') {
            if (this.base[itemName]) {
                delete this.base[itemName];
                result = true;
            }
            else {
                LOG.ERROR(`The path is not specified!`);
                return false;
            }
        }
        else {
            const pathArray = path.split('/');
            result = this.deleteItem(this.base, pathArray, itemName);
        }

        if (result) {
            this.writeDatabaseFile();
        }

        return result;
    },
}

/***************************************************************************************************************************************************************************/
/****** Other Functions *******/

/** Функция загрузки базы данных.
 * Загружает базу данных из json файла. Обязательно выполнить до того как вызывать другиефункции базы данных, иначе работа базы данных будет некорректна. 
 */
export const downloadDatabase = () => {
    botDataBase.readDatabaseFile();
}

export const SET = (path, data, itemName) => {
    LOG.INFO(`=== DataBase command: SET => Path: ${path}, data: ${data}, item name: ${itemName} ===`);
    return botDataBase.SET(path, data, itemName);
}

/** Функция запроса данных из базы данны.
 * Если не указать путь к элементу то вернет всю базу данных целиком.  
 * @param {string} path аруемент пути в виде строки формата 'firstItem/secondItem/thirdItem/...' (все элементы должны разделяться "/" слэшэм, в начале и в конце пути этот символ НЕ нужен).
 * @returns вложенность запрошенного элемента или undefined и запись в консоль, в случае если есть ошибка в пути или такого элемента не существует.
 */
export const GET = (path) => {
    LOG.INFO(`=== DataBase command: GET => Path: ${path} ===`);
    return botDataBase.GET(path);
}

export const DELETE = (path, itemName) => {
    LOG.INFO(`=== DataBase command: DELETE => Path: ${path}, item name: ${itemName} ===`);
    return botDataBase.DELETE(path, itemName);
}
