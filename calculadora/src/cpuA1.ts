import { Controle, Cpu, Digito, Operação, Sinal, Tela } from "./calculadora";

export default class CpuA1 implements Cpu {
    tela: Tela | undefined;
    digitosArmazenados1: Array <Digito> = [];
    digitosArmazenados2: Array <Digito> = [];
    operacao: Operação | undefined = undefined;
    separadorDecimalpos1 : number = 0;
    separadorDecimalpos2 : number = 0;
    sinal1: Sinal = Sinal.POSITIVO;
    sinal2: Sinal = Sinal.POSITIVO;
    memoria: number = 0;
    historicoControle: Controle | undefined = undefined;
    
    recebaDigito(digito: Digito): void {
        if (this.operacao === undefined) {
            this.digitosArmazenados1.push(digito);
            if (this.digitosArmazenados1.length === 0) {
                this.tela?.limpe();
            }
        } else {
            this.digitosArmazenados2.push(digito);
            if (this.digitosArmazenados2.length === 0) {
                this.tela?.limpe();
            }
        }
        this.tela?.mostre(digito);
        this.historicoControle = undefined;
    }

    recebaOperacao(operação: Operação): void {
        if (operação === Operação.RAIZ_QUADRADA) {
            this.tratarRAIZ();
            return;
        }

        if (operação === Operação.PERCENTUAL) {
            this.tratarPERCENTUAL();
            return;
        }

        if (this.operacao !== undefined && this.digitosArmazenados2.length > 0) {
            this.tratarIGUAL();
        }

        if (operação && this.digitosArmazenados1.length) {
            this.recebaControle(Controle.IGUAL);
        }
        this.operacao = operação;
        this.historicoControle = undefined;
    }


   
    recebaControle(controle: Controle): void {
        switch(controle){
            case Controle.ATIVAÇÃO_LIMPEZA_ERRO:
                this.tratarATIVAÇÃO_LIMPEZA_ERRO()
                break
            case Controle.IGUAL:
                this.tratarIGUAL()
                break
            case Controle.SEPARADOR_DECIMAL:
                this.tratarPONTO()
                break
            case Controle.MEMÓRIA_LEITURA_LIMPEZA:
                if (this.historicoControle === Controle.MEMÓRIA_LEITURA_LIMPEZA) {
                this.memoriaLimpeza(); 
            }   else {
                this.memoriaLeitura(); 
            }
            break;
        }
    }
    private convertaDigitosEmNumero(digitos: Digito[], sinal: Sinal, posicaoSeparadorDecimal: number): number {
        let r = 0;
        digitos.forEach(digito => {
            r = r * 10 + digito;
        });
        r = r * (sinal === Sinal.POSITIVO ? 1 : -1);
        if (posicaoSeparadorDecimal) {
            return r / (10 ** (digitos.length - posicaoSeparadorDecimal));
        } else {
            return r;
        }
    }


    private convertaNumeroEmDigitos(numero: number): Digito[] {
        let valor: string = String(numero);
        let digitos: Digito[] = [];
        while (numero > 0) {
            let digito = numero % 10;
            digitos.push(digito);
            numero -= digito;
            numero /= 10;
        }
        if (digitos.length === 0) {
            digitos.push(Digito.ZERO);
        }
        return digitos.reverse();
    }

    
    private mostrarDigitos(digitos: Digito[], sinal: Sinal): void {
        this.tela?.limpe();
        this.tela?.mostreSinal(sinal);
        digitos.forEach(digito => {
            this.tela?.mostre(digito);
        });
    }

    private tratarIGUAL() {
        const numero1 = this.convertaDigitosEmNumero(this.digitosArmazenados1, this.sinal1, this.separadorDecimalpos1);
        let numero2 = 0;
        if (this.digitosArmazenados2.length > 0) {
            numero2 = this.convertaDigitosEmNumero(this.digitosArmazenados2, this.sinal2, this.separadorDecimalpos2);
        }
        let resultado = 0;
    
        if (this.operacao === Operação.SOMA) {
            resultado = numero1 + numero2;
        } else if (this.operacao === Operação.SUBTRAÇÃO) {
            resultado = numero1 - numero2;
        } else if (this.operacao === Operação.MULTIPLICAÇÃO) {
            resultado = numero1 * numero2;
        } else if (this.operacao === Operação.DIVISÃO) {
            if (numero2 !== 0) {
                resultado = numero1 / numero2;
            } else {
                resultado = 0; 
            }
        } else if (this.operacao === Operação.PERCENTUAL) {
            resultado = (numero1 * numero2) / 100; 
        }
    
        this.digitosArmazenados1 = this.convertaNumeroEmDigitos(resultado);
        this.sinal1 = resultado < 0 ? Sinal.NEGATIVO : Sinal.POSITIVO;
    
        this.mostrarDigitos(this.digitosArmazenados1, this.sinal1);
    }
    


    private tratarRAIZ() {
        console.log("Passei por aqui");

        let numero;
        if(this.operacao === undefined){
            numero = this.convertaDigitosEmNumero(this.digitosArmazenados1, this.sinal1, this.separadorDecimalpos1) 
        }else{
            numero = this.convertaDigitosEmNumero(this.digitosArmazenados2, this.sinal2, this.separadorDecimalpos2)
        }

        if (numero >= 0) {
            const resultado = Math.sqrt(numero)
            const resultadoDigitos = this.convertaNumeroEmDigitos(resultado)
            if (this.operacao === undefined){
                console.log("Passei por aqui1", resultadoDigitos, resultado);
                this.digitosArmazenados1 = resultadoDigitos
                this.sinal1 = resultado <0?Sinal.NEGATIVO:Sinal.POSITIVO
                this.mostrarDigitos(this.digitosArmazenados1, this.sinal1)
            }
            else{
                console.log("Passei por aqui2");
                this.digitosArmazenados2 = resultadoDigitos
                this.sinal2 = resultado <0?Sinal.NEGATIVO:Sinal.POSITIVO
                this.mostrarDigitos(this.digitosArmazenados2, this.sinal2)
            }
        }
    }
    private tratarPONTO(){
        if (this.operacao === undefined){
            if(!this.separadorDecimalpos1){ 
                this.separadorDecimalpos1 = this.digitosArmazenados1.length;
                this.tela?.mostreSeparadorDecimal()
            }
        }
        else{
            if (this.separadorDecimalpos2){
                this.separadorDecimalpos2 = this.digitosArmazenados2.length;
                this.tela?.mostreSeparadorDecimal()
            }
        }
    }


    private tratarPERCENTUAL(): void {
        const numero1 = this.convertaDigitosEmNumero(this.digitosArmazenados1, this.sinal1, this.separadorDecimalpos1);
        let numero2 = this.operacao === undefined 
            ? 0 
            : this.convertaDigitosEmNumero(this.digitosArmazenados2, this.sinal2, this.separadorDecimalpos2);
    
        let resultado: number;
    
        if (this.operacao === Operação.PERCENTUAL) {
            resultado = numero1 * (numero2 / 100);
        } else {
            resultado = numero1;
        }
    
        console.log("Resultado Calculado:", resultado);
    
        this.digitosArmazenados2 = this.convertaNumeroEmDigitos(resultado);
    
        this.mostrarDigitos(this.digitosArmazenados2, this.sinal2);
    }
    
    private memoriaMAIS(): void {
        const valorAtual = this.convertaDigitosEmNumero(this.digitosArmazenados1, this.sinal1, this.separadorDecimalpos1);
        this.memoria += valorAtual;
        this.tela?.mostreMemoria(); 
        this.historicoControle = Controle.IGUAL;
    }

    private memoriaMENOS(): void {
        const valorAtual = this.convertaDigitosEmNumero(this.digitosArmazenados1, this.sinal1, this.separadorDecimalpos1);
        this.memoria -= valorAtual;
        this.tela?.mostreMemoria();
        this.recebaControle(Controle.IGUAL )
    }

    private memoriaLeitura(): void {
        if (this.operacao === undefined) {
            this.digitosArmazenados1 = this.convertaNumeroEmDigitos(this.memoria);
            this.sinal1 = this.memoria >= 0 ? Sinal.POSITIVO : Sinal.NEGATIVO;
            this.mostrarDigitos(this.digitosArmazenados1, this.sinal1);
        } else {
            this.digitosArmazenados2 = this.convertaNumeroEmDigitos(this.memoria);
            this.sinal2 = this.memoria >= 0 ? Sinal.POSITIVO : Sinal.NEGATIVO;
            this.mostrarDigitos(this.digitosArmazenados2, this.sinal2);
        }
        this.historicoControle = Controle.MEMÓRIA_LEITURA_LIMPEZA;
    }

    private memoriaLimpeza(): void {
        this.memoria = 0;
        this.historicoControle = Controle.MEMÓRIA_LEITURA_LIMPEZA;
    }
    tratarATIVAÇÃO_LIMPEZA_ERRO() {
        this.tela?.limpe()

        this.tela?.mostre(Digito.ZERO)
    }
    reinicie(): void {
        throw new Error("Method not implemented.");
    }
    definaTela(tela: Tela): void {
        this.tela = tela
    }
    obtenhaTela(): Tela {
        if (this.tela) {
          return this.tela;
        } else {
          throw new Error("Tela não definida.");
        }
      }
      
    
}