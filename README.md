# cilindrosPercorridos

Projeto da disciplina Sistemas Operacionais com o objetivo de solucionar a seguinte questão:

> ## Questão 1. (1,5)
>
> Faça um programa que calcule a quantidade de cilindros percorridos considerando 4 algoritmos de escalonamento de discos recebendo informações na forma de um arquivo de configuração:

### 1) A posição inicial do cabeçote de leitura e

### 2) a fila de espera contendo o número dos cilindros a serem lidos.

## Os quatro algoritmos são os seguintes:

#### 1) FCFS

#### 2) SSTF

#### 3) SCAN considerando o bit de sentido como SOBE (indo do menor para o maior cilindro)

#### 4) SCAN considerando o bit de sentido como DESCE (indo do maior para o menor cilindro)

O programa deve receber como parâmetro (utilizando argc argv, por exemplo) o nome de um arquivo de configuração. Este arquivo contém as seguintes informações: • Um inteiro com a posição inicial do cabeçote • Um inteiro n que determina o tamanho da fila de espera • n inteiros que são a fila de espera O programa deve ler o arquivo de configuração e, para cada algoritmo de escalonamento, imprimir na tela: 1) A ordem da fila de espera acessada 2) O total de cilindros percorridos

Exemplo de arquivo de configuração:

> ### 53
>
> ### 8
>
> ### 98 183 37 122 14 124 65 67

Exemplo de saída considerando o arquivo de configuração acima

### FCFS

> ### Ordem: 53, 98, 183, 37, 122, 14, 124, 65, 67
>
> ### Cilindros: 640

### SSTF

> ### Ordem: 53, 65, 67, 37, 14, 98, 122, 124, 183
>
> ### Cilindros: 236

### SCAN SOBE

> ### Ordem: 53, 37, 14, 65, 67, 98, 122, 124, 183
>
> ### Cilindros: 208

### SCAN DESCE

> ### Ordem: 53, 65, 67, 98, 122, 124, 183, 37, 14
>
> ### Cilindros: 299

## IMPORTANTE:

• Considere que o número dos setores requisitados varia apenas entre 0 e 199!

• No caso do SCAN (em qualquer sentido) considere que o cabeçote vai, no máximo até o primeiro e último setores da fila de espera. i.e.: ele não vai até 0 ou 199 sem necessidade.
