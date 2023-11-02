import * as sqlite3 from 'sqlite3';

// Defina o caminho para o arquivo do banco de dados
const dbPath = 'storeDB.db';

// Crie e abra o banco de dados
// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) {
//     console.error('Erro ao abrir o banco de dados', err.message);
//   } else {
//     console.log('Banco de dados SQLite aberto com sucesso');

//     // Execute uma consulta SELECT na tabela 'usuarios'
//     db.all('SELECT * FROM usuarios', (selectErr, rows) => {
//       if (selectErr) {
//         console.error('Erro ao executar a consulta SELECT', selectErr.message);
//       } else {
//         // Os resultados da consulta estão em 'rows'
//         console.log('Registros da tabela "usuarios":', rows);
//       }

//       // Feche o banco de dados após a conclusão da consulta
//       db.close((closeErr) => {
//         if (closeErr) {
//           console.error('Erro ao fechar o banco de dados', closeErr.message);
//         } else {
//           console.log('Banco de dados SQLite fechado com sucesso');
//         }
//       });
//     });
//   }
// });

export const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erro ao abrir o banco de dados', err.message);
    } else {
      console.log('Banco de dados SQLite aberto com sucesso');
    }
  });
  
  // Exporte o objeto db
