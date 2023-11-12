import state from './state.js'
import * as actions from './actions.js'
import * as el from './elements.js'
import * as sounds from './sounds.js'
import { updateDisplay } from './timer.js'

export function registerControls() {
    el.controls.addEventListener('click', (event) => {
        const action = event.target.dataset.action
        if(typeof actions[action] != "function") {
            return
        }
          
        actions[action]()
    })
}

export function setMinutes() {
    el.minutes.addEventListener('click', () => {
        el.minutes.textContent = ""
    })

    el.minutes.onkeypress = (event) => /\d/.test(event.key)

    el.minutes.addEventListener('blur', () => {
        let time = el.minutes.textContent
        if(time === ''){ time = 0 } 
        time = time > 60 ? 60 : time
        state.minutes = parseInt(time)
        state.seconds = 0

        updateDisplay()
    })
}

//Evento para ativar o som de fundo
export function backgroundSound() {
    //Adiciona o evento de 'click'
    el.sounds.addEventListener('click', (event) => {
        //Variável armazenando o valor do atributo 'data-action' do botão clicado
        const bgSound = event.target.dataset.action

        //Verifica se realmente o clique foi em um botão
        if(typeof sounds[bgSound] != "object") {
            return
        }
        
        //Verifica se já foi tocado um áudio alguma vez
        if(state.audio != null) {
            //Se sim pausa o último aúdio tocado
            sounds[state.audio].pause()
            //E remove estilização de selecionado dele
            document.getElementById(state.audio).classList.remove('selected')
        }


        //Verifica se o último aúdio tocado é o mesmo que foi clicado para tocar novamente
        if(state.audio === bgSound) { 
            //Caso sim limpa a variável e finaliza a função backgroundSoudn
            state.audio = null
            return
         }

        //Coloca o aúdio para tocar em loop
        sounds[bgSound].play()
        sounds[bgSound].loop = true

        //E por fim atualiza a variável como 'último aúdio tocado' e estiliza ele
        state.audio = bgSound
        event.target.classList.toggle('selected')
    })
}