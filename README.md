# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```

## Demo user's credentials

| firstName | lastName        | email        | Rol      |
| --------- | --------------- | ------------ | -------- |
| Franco    | Armani          | fa@afa.com   | Admin    |
| Lucas     | Martínez Quarta | lmq@afa.com  | Admin    |
| Nicolás   | Tagliafico      | nt@afa.com   | Admin    |
| Gonzalo   | Montiel         | gm@afa.com   | Admin    |
| Leandro   | Paredes         | lp@afa.com   | Admin    |
| Germán    | Pezzella        | gp@afa.com   | Admin    |
| Rodrigo   | De Paul         | rdp@afa.com  | Admin    |
| Marcos    | Acuña           | ma@afa.com   | Admin    |
| Sergio    | Agüero          | sa@afa.com   | Admin    |
| Lionel    | Messi           | lm10@afa.com | Admin    |
| Ángel     | Di María        | adm@afa.com  | Admin    |
| Agustín   | Marchesín       | am@afa.com   | Standard |
| Cristian  | Romero          | cr@afa.com   | Standard |
| Exequiel  | Palacios        | ep@afa.com   | Standard |
| Nicolás   | González        | ng@afa.com   | Standard |
| Joaquín   | Correa          | jc@afa.com   | Standard |
| Nicolás   | Domínguez       | nd@afa.com   | Standard |
| Guido     | Rodríguez       | gr@afa.com   | Standard |
| Nicolás   | Otamendi        | no@afa.com   | Standard |
| Giovani   | Lo Celso        | glc@afa.com  | Standard |
| Ángel     | Correa          | ac@afa.com   | Standard |
| Lautaro   | Martínez        | lm@afa.com   | Standard |

(\*) All users have "**12345678**" as password
