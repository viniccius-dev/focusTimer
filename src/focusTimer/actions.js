import state from './state.js'
import * as sounds from './sounds.js'
import * as timer from './timer.js'
import { setMinutes } from './events.js' 

export function toggleRunning() {
    state.isRunning = document.documentElement.classList.
        toggle('running')

    timer.countdown()
    sounds.buttonPressAudio.play()
}

export function reset() {
    state.isRunning = false
    document.documentElement.classList.remove('running')
    timer.updateDisplay(0,0)

    sounds.buttonPressAudio.play()
}

setMinutes()

export function updateTimerMinus() {
    if(state.minutes - 5 > 0) {
        state.minutes = state.minutes - 5
    } else {
        state.minutes = 0
        state.seconds = 0
    }
    timer.updateDisplay()
}

export function updateTimerPlus() {
    if(state.minutes + 5 < 60) {
        state.minutes = state.minutes + 5
    } else {
        state.minutes = 60
        state.seconds = 0
    }
    timer.updateDisplay()
}