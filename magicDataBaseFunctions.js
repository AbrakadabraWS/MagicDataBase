import * as MagicBase from './MagicBase/MagicBase.js';

export const startDataBase = () => {
    MagicBase.downloadDatabase();
}

export const SET = (path, data, itemName) => {
    return MagicBase.SET(path, data, itemName);
}

export const GET = (path) => {
    return MagicBase.GET(path);
}

export const DELETE = (path, itemName) => {
    return MagicBase.DELETE(path, itemName);
}
