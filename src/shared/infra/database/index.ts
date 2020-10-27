import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  try {
    const connection = await createConnection(defaultOptions);
    console.log('A conexão com o banco de dados foi estabilizada!');
    connection.runMigrations();
    return connection;
  } catch (error) {
    console.log(
      'Ocorreu um erro ao estabilizar a conexão com o banco de dados!',
    );
    console.log(error);
  }
};
