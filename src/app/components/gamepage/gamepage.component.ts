import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})

export class GamePageComponent implements OnInit {

  secret_word: string[] = []; 
  asteriscs: string[] = []; 
  revelation: any[] = []
  wrong_words: string[] = []
  guesses: number = this.secret_word.length*2
  animals: string[] = ['cachorro', 'cavalo', 'coelho', 'gato', 'peixe', 'tigre', 'aranha', 'urso', 'sapo', 'rato', 'tartaruga', 'esquilo', 'passaro', 'mico', 'chinchila', ]
  teclado: string[] = 'qwertyuiopasdfghjklçzxcvbnm'.split('')
  inputData:string = ''
  msg: string = ''

  constructor() {

  } 

  ngOnInit(): void {

    this.setSecretWord(this.animals[Math.trunc(Math.random()*this.animals.length)]) // Setar a palavra secreta
    this.resetAsterisc() // Resetar os asteriscos - primeira instancia
    
  }

  // botão de troca
  restartGame(){
    this.setSecretWord(this.animals[Math.trunc(Math.random()*this.animals.length)])
    this.resetAsterisc()
    this.wrong_words = []
    this.inputData = ''
  }

  // encontra as posições das letras nos asteriscos ***a** [3]
  indexOfMultiple(word:string, letter:string){
    return word.split('').map((e, i) => e == letter && i).filter(e => typeof(e) == 'number' )
  }

  // troca a palavra secreta
  setSecretWord(newWord: string){
    this.secret_word = newWord.split("")
  }

  // reseta os asteriscos
  resetAsterisc(){
    this.asteriscs = new Array(this.secret_word.length).fill('*')
    this.guesses = this.secret_word.length*2
  }

  

  // faz o teste da letra
  testLetter(){

    if(this.guesses == 0) return
    if(!this.asteriscs.includes('*')) return


    this.revelation = this.indexOfMultiple(this.secret_word.join(""), this.inputData) 
    this.revelation.map(e =>{
        this.asteriscs[e] = this.inputData
    })

    if(!this.secret_word.includes(this.inputData) && !this.wrong_words.includes(this.inputData) ){
      this.decreaseGuesses()
      this.wrong_words.push(this.inputData)
    }

    this.inputData = ''
  }

  // mensagem de vitória
  victoryMessage(){
    if(!this.asteriscs.includes('*'))
      return 'Você ganhou! 🥳'
    else
      return
  }

  // chutes
  setGuesses(numero: number){
    this.guesses = numero 
  }

  decreaseGuesses(){ this.guesses > 0 ? this.guesses -- : this.guesses } // faz a subtração de um chute a cada tentativa

}