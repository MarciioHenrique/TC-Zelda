//Variáveis auxiliares
const sprites = new Image();
sprites.src = "./images/sprites3.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");
contexto.font = "50px serif";
contexto.textAlign = "center";

var resposta = "...";
var countW = 0;
var countA = 0;
var countS = 0;
var countD = 0;
var ultimaPos = "";
var atqX = 0;
var atqY = 0;

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

//Cria o cenario
const cenario = {
    spriteX: 0,
    spriteY: 0,
    largura: 720,
    altura: 620,
    x: 0,
    y: 100,
    
    desenha(){
        contexto.fillStyle = "black"
        contexto.fillRect(0,0, 720, 100);
        contexto.fillStyle = "white"
        contexto.fillText(resposta, 350, 60);
        contexto.drawImage(
        sprites,
            cenario.spriteX, cenario.spriteY, //Sprite x e y
            cenario.largura, cenario.altura, //Tamanho da sprite
            cenario.x, cenario.y, //Posição 
            cenario.largura, cenario.altura, //Tamanho
        );
    }
}

//Desenha o personagem
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

//Volta pra posição de antes do ataque
function retornaPosicao(posicao) {
    switch (posicao) {
        case "w":
            setTimeout(() => {
                personagem.spriteY = 14;
                personagem.spriteX = 847;
                personagem.largura = 45;
                personagem.altura = 48;
                atqY = 0;
            }, 1500);
            break;
        
        case "s":
            setTimeout(() => {
                personagem.spriteY = 14;
                personagem.spriteX = 745;
                personagem.largura = 45;
                personagem.altura = 48;
            }, 1500);
            break;

        case "a":
            setTimeout(() => {
                personagem.spriteY = 14;
                personagem.spriteX = 796;
                personagem.largura = 45;
                personagem.altura = 48;
                atqX = 0;
            }, 1500);
            break;
        
        case "d":
            setTimeout(() => {
                personagem.spriteY = 14;
                personagem.spriteX = 909;
                personagem.largura = 45;
                personagem.altura = 48;
            }, 1500);
            break;
        
        default:
            break
    }
}

//Pega a tecla apertada, verifica se ela pertence ao alfabeto e faz o movimento
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

                if(countW % 2 != 0){
                    personagem.spriteY = 14; 
                }
                else {
                    personagem.spriteY = 62;
                }
                
                personagem.posY -= 15;
            }
            
            //Move para baixo
            if (keyPressed === "s" && personagem.posY + 1 <= 580) {
                resposta = "BAIXO";
                countS += 1;
                ultimaPos = "s"; 
                personagem.spriteX = 745;
                personagem.largura = 45;
                personagem.altura = 48;
                
                if(countS % 2 != 0){
                    personagem.spriteY = 14; 
                }
                else {
                    personagem.spriteY = 62;
                } 
        
                personagem.posY += 15;
            }
        
            //Move para esquerda
            if (keyPressed === "a" && personagem.posX - 1 >= 58) {
                resposta = "ESQUERDA";
                countA += 1;
                ultimaPos = "a";  
                personagem.spriteX = 796;
                personagem.largura = 45;
                personagem.altura = 48;
        
                if(countA % 2 != 0) {
                    personagem.spriteY = 14; 
                }
                else {
                    personagem.spriteY = 62;
                }
        
                personagem.posX -= 15;
            }
        
            //Move para direita
            if (keyPressed === "d" && personagem.posX + 1 <= 590) {
                resposta = "DIREITA";
                countD += 1;
                ultimaPos = "d";  
                personagem.spriteX = 909;
                personagem.largura = 45;
                personagem.altura = 48;
                
                if (countD % 2 != 0) {
                    personagem.spriteY = 14; 
                }
                else {
                    personagem.spriteY = 62
                }
        
                personagem.posX += 15
            }

            //Ataca
            if (keyPressed === "k") {
                resposta = "ATAQUE";
              
                switch (ultimaPos) {
                    //Ataca para cima
                    case "w":
                        personagem.spriteX = 851;
                        personagem.spriteY = 113; 
                        personagem.largura = 49;
                        personagem.altura = 96;
                        atqY = -48;
                        retornaPosicao("w");      
                        break;
                
                    //Ataca para baixo
                    case "s":
                        personagem.spriteX = 745;
                        personagem.spriteY = 110;
                        personagem.altura = 93;
                        personagem.largura = 48;
                        retornaPosicao("s"); 
                        break;
                
                    //Ataca para esquerda
                    case "a":
                        personagem.spriteX = 755;
                        personagem.spriteY = 219; 
                        personagem.largura = 90;
                        personagem.altura = 45;
                        atqX = -48;
                        retornaPosicao("a"); 
                        break;
                
                    //Ataca para direita
                    case "d":                        
                        personagem.spriteX = 861;
                        personagem.spriteY = 218; 
                        personagem.largura = 90;
                        personagem.altura = 45;
                        retornaPosicao("d"); 
                        break;

                    default:
                        break;
                }  
            }
        }, 200)
    }
    else {
        resposta = "REJEITA";
        setTimeout(() => {
            entrada.value = "";
        }, 1000)
    }
}

//Cria a timeline do jogo
function loop() {
    contexto.clearRect(0,0, 720, 620)
    cenario.desenha();
    personagem.desenha();
    
    requestAnimationFrame(loop);
}
loop();