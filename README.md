# TC-Zelda

</br>
<img width="788" alt="Screen Shot 2020-03-30 at 10 17 57 PM" src="https://raw.githubusercontent.com/Luizzgs/TC-Zelda/main/images/Preview.png">

## Tópicos
1. [Introdução](#Introdução)
2. [Linguagens](#Linguagens)
3. [Características](#Características)
4. [Instruções](#Instruções)

## Introdução
Trabalho feito para a matéria de Teoria da Computação, inspirado no jogo Zelda clássico utilizando autômatos.

## Linguagens

**Javascript** <br/> 
Feito em Javascript puro sem qualquer dependência, utilizando a API Canvas para desenhar o mundo e o jogador com sprites.

## Características

* Primeiramente definimos o alfabeto aceito pelo autômato, e criamos uma função para definir quais palavras são aceitas (true) e rejeitadas (false). 

```javascript
const entrada = document.getElementById("entrada");
const alfabeto = ["a", "w", "s", "d", "k"];

//Quando uma tecla for apertada, executa o codigo
document.addEventListener("keydown", executaAutomato);

//Verifica se a palavra pertence ao alfabeto
function verificaAlfabeto(w) {
    if (alfabeto.includes(w)) {
        return true;
    }
    return false;
}
```

* Caso a palavra for aceita ela vai ser repassada para o jogo, que dependendo do input, realizará várias alterações em seu código, alterando o sprite do personagem e sua posição no cenário.  

```javascript
function executaAutomato(event){
    entrada.focus();
    const keyPressed = event.key;

    if (verificaAlfabeto(keyPressed)) {
        setTimeout(() => {
            atqX = 0;
            atqY = 0;

            //Move para cima
            if (keyPressed === "w" && personagem.posY - 1 >= 185) {
                resposta = "CIMA";
                countW += 1;
                ultimaPos = "w";
                personagem.spriteX = 847;
                personagem.largura = 45;
                personagem.altura = 48;
                ...
```

* Se a palavra for rejeitada, o jogador não irá fazer nenhum movimento, e o input de palavras será redefinido.
```javascript
else {
        resposta = "REJEITA";
        setTimeout(() => {
            entrada.value = "";
        }, 1000)
    }
```


* O jogo foi criado utilizando a API Canvas com gráficos em 2d. Exemplo de criação do modelo do personagem, definindo as posições da imagem, seu tamanho e em que local vai ser desenhado.

```javascript
const personagem = {
    spriteX: 745,
    spriteY: 14,
    largura: 45,
    altura: 48,
    posX: 200,
    posY: 360,
    
    desenha() {
        contexto.drawImage(
            sprites,
            personagem.spriteX, personagem.spriteY, //Sprite x e y
            personagem.largura, personagem.altura, //Tamanho da sprite
            personagem.posX + atqX, personagem.posY + atqY, //Posição 
            personagem.largura, personagem.altura, //Tamanho
        );
    }
}
```
* Por fim criamos a timeline do jogo que "desenha" o cenário e o personagem constantemente, dependo das alterações realizadas nos estados do autômato.
```javascript
//Cria a timeline do jogo
function loop() {
    contexto.clearRect(0,0, 720, 620)
    cenario.desenha();
    personagem.desenha();
    
    requestAnimationFrame(loop);
}
loop();
```
<br/> 



    
## Instruções
Para iniciar o jogo basta digitar qualquer tecla na caixa de texto, o alfabeto definido para a execução de ações é:
{"W", "A", "S", "D"}, para movimentar o personagem e a tecla "K", para realizar um ataque.

