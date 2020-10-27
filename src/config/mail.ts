interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}
const mailConfig: IMailConfig = {
  driver: (process.env.MAIL_DRIVER as 'ethereal' | 'ses') || 'ethereal',
  defaults: {
    from: {
      email: 'nao-responda@dominio.com.br',
      name: 'EQUIPE | SIGLA',
    },
  },
};

export default mailConfig;
