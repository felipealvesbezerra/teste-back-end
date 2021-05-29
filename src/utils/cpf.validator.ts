//Classe de validação de CPF
interface ICpfValidator {
  error: boolean;
  cleanCpf: string;
}

export default function cpfValidator(cpf: string): ICpfValidator {
  let error = true;
  let cleanCpf = cpf.replace(/[^\d]+/g, '');
  if (
    cleanCpf.length != 11 ||
    cleanCpf == '00000000000' ||
    cleanCpf == '11111111111' ||
    cleanCpf == '22222222222' ||
    cleanCpf == '33333333333' ||
    cleanCpf == '44444444444' ||
    cleanCpf == '55555555555' ||
    cleanCpf == '66666666666' ||
    cleanCpf == '77777777777' ||
    cleanCpf == '88888888888' ||
    cleanCpf == '99999999999'
  ) {
    error = Boolean(true);
  }
  // Valida 1º digito
  let add = 0;
  let rev = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }
  if (rev != parseInt(cleanCpf.charAt(9))) {
    error = Boolean(true);
  } else {
    // Valida 2º digito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cleanCpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
      rev = 0;
    }
    if (rev != parseInt(cleanCpf.charAt(10))) {
      error = Boolean(true);
    } else {
      error = Boolean(false);
    }
  }
  return { error, cleanCpf };
}
