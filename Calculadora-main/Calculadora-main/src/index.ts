import { Controle, Digito, Operação } from "./calculadora";
import CpuA1 from "./cpuA1";
import TecladoA1 from "./tecladoA1";
import TelaA1 from "./telaA1";
import { TestadorTela } from "./calculadoraTestes"; //TESTE
import { TestadorCpu } from "./calculadoraTestes"; //TESTE

const tela = new TelaA1();
const cpu = new CpuA1();
const teclado = new TecladoA1();
cpu.definaTela(tela) 
teclado.definaCpu(cpu)

// teclado.digiteDigito(Digito.OITO);
// teclado.digiteOperacao(Operação.SOMA);
// teclado.digiteDigito(Digito.NOVE);
// teclado.digiteControle(Controle.IGUAL);


// // Testando a TELA
// new TestadorTela(tela).testeTodosNúmeros(); //TESTE
// new TestadorTela(tela).testeTodosSímbolo(); //TESTE
// // Testando a CPU
// //cpu.definaTela(tela);
// new TestadorCpu(cpu).teste123Soma456(); //TESTE
// new TestadorCpu(cpu).teste12Soma34Soma56(); //TESTE
 new TestadorCpu(cpu).testeRaiz();
