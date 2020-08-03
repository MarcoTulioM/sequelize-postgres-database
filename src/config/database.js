module.exports = {
    dialect: 'postgres',
    host: 'localhost',

    username: '',
    password: '',
    database: '',

    define: {
        underscored: true, //snake_case instead PascalCase.
        timestamps: true
        /* created_at, updated_at
        serão gerados automaticamente.*/
    }
};
