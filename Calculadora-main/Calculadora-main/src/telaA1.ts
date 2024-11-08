import { Digito, Sinal, Tela } from "./calculadora"
export default class DisplayA1 implements Tela {
    mostreSeparadorDecimal(): void {
        console.log(".");
    }
    mostreSinal(sinal: Sinal): void {
        console.log(sinal==Sinal.NEGATIVO?"-":"")
    }
    mostreMemoria(): void {
        throw new Error("Method not implemented.")
    }
    mostreErro(): void {
        throw new Error("Method not implemented.")
    }
    mostre(digito: Digito): void {
        console.log(digito)
    }
  //mostrar separador decimal

    limpe(): void {
        // console.clear()
        console.log("Limpando a tela")
    }
}
