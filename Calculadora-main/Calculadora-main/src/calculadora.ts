export enum Digito {
  ZERO = 0,
  UM,
  DOIS,
  TRÊS,
  QUATRO,
  CINCO,
  SEIS,
  SETE,
  OITO,
  NOVE,
}

export enum Operação {
  SOMA,
  SUBTRAÇÃO,
  MULTIPLICAÇÃO,
  DIVISÃO,
  RAIZ_QUADRADA,
  PERCENTUAL,
}

export enum Controle {
  DESATIVAÇÃO,
  ATIVAÇÃO_LIMPEZA_ERRO,
  MEMÓRIA_LEITURA_LIMPEZA,
  MEMÓRIA_SOMA,
  MEMÓRIA_SUBTRAÇÃO,
  SEPARADOR_DECIMAL,
  IGUAL,
}

export enum Sinal {
  POSITIVO,
  NEGATIVO,
}

export interface Tela {
  mostre(digito: Digito): void;
  mostreSeparadorDecimal(): void;
  mostreSinal(sinal: Sinal): void;
  mostreMemoria(): void;
  mostreErro(): void;
  limpe(): void;
}

export interface Teclado {
  digiteDigito(digito: Digito): void;
  digiteOperacao(operação: Operação): void;
  digiteControle(controle: Controle): void;

  definaCpu(cpu: Cpu | undefined): void;
  obtenhaCpu(): Cpu | undefined;
}

export interface Cpu {
  recebaDigito(digito: Digito): void;
  recebaOperacao(operação: Operação): void;
  recebaControle(controle: Controle): void;
  reinicie(): void;

  definaTela(tela: Tela | undefined): void;
  obtenhaTela(): Tela | undefined;
}

export interface Calculadora {
  definaTela(tela: Tela | undefined): void;
  obtenhaTela(): Tela | undefined;

  definaCpu(cpu: Cpu | undefined): void;
  obtenhaCpu(): Cpu | undefined;

  definaTeclado(teclado: Teclado | undefined): void;
  obtenhaTeclado(): Teclado | undefined;
}
