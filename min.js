const textarea = document.querySelector("textarea"),
    voicelist = document.querySelector("select"),
    speechBtn = document.querySelector("button")

let synth = speechSynthesis,
    isSpeaking = true
voices()
function voices() {
    for (let voice of synth.getVoices()) {
        let selected = voice.name == "Goole us English" ? "selected" : ""
        let optin = `  
         <option value="${voice.name}" ${selected} > ${voice.name} (${voice.lang})</option>
         `
        voicelist.insertAdjacentHTML("beforeend", optin)
    }
}
synth.addEventListener("voiceschanged", voices)

function textspeach(text) {
    let utternce = new SpeechSynthesisUtterance(text)
    for (let voice of synth.getVoices()) {
        if (voice.name === voicelist.value) {
            utternce.voice = voice
        }
    }
    speechSynthesis.speak(utternce)

}

speechBtn.addEventListener("click", e => {
    e.preventDefault()
    if (textarea.value !== "") {
        if (!synth.speaking) {
            textspeach(textarea.value)
        }
        if (textarea.value.length > 90) {
            if (isSpeaking) {
                synth.resume()
                isSpeaking = false
                speechBtn.innerText = " pause speech"
            } else {
                synth.pause()
                isSpeaking = true
                speechBtn.innerText = " Resume speech"
            }
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true
                    speechBtn.innerText = " convert to speach"
                }
            })
        } else {
            speechBtn.innerText = " convert to speach"
        }
    }
})
