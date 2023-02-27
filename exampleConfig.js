
export const DB_PATH = 'database.json';

export const DB_INIT_STRUCTURE = {
    users: {
        1234567890: {
            id: 1234567890,
            name: 'Jon',
            age: 25,
            provfession: 'programmer',
            level: 'midle',
        },
        1234567891: {
            id: 1234567891,
            name: 'Peter',
            age: 25,
            provfession: 'programmer',
            level: 'senior',
        },
        1234567892: {
            id: 1234567892,
            name: 'Ann',
            age: 25,
            provfession: 'programmer',
            level: 'junior',
        },

        1234567893: {
            id: 1234567893,
            name: 'Jil',
            age: 23,
            provfession: 'analitic',
            level: 'midle',
        },
    },
    work: {
        programmer: {
            junior: [1234567892],
            midle: [1234567890],
            senior: [1234567891],
        },
        analitic: {
            junior: [],
            midle: [1234567893],
            senior: [],
        },

    }

}
