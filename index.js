const messageInput = document.getElementById('messageInput')
const keyInput = document.getElementById('keyInput')
const messageOutput = document.getElementById('messageOutput')
const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",  "S", "T", "U", "V",  "W", "X", "Y", "Z",  "0", "1",  "2", "3", "4", "5", "6", "7",  "8", "9", ".", ",", "?", "!", "'", "_", "-", "&", "@", "#", "$", "%", "*", "(", ")", " "];
const encryptButton = document.getElementById('encryptButton')
const decryptButton = document.getElementById('decryptButton')
const copyButton = document.getElementById('copyButton')

let message; 
let key; 
let validCheck = false
let multiply;

function assignmentAndCheck() {                                                         // initializare a variabilelor principale
    message = messageInput.value
    key = keyInput.value

    if(message && key) {                                                                // verificare validitatii datelor, era mai elegant cu try si catch
        validCheck = true
    }
    else {
        validCheck = false
    }
}

function extendKey() {
    let j;                                                                              // first I extend

    if(message.length % key.length === 0) {
        multiply = (message.length/key.length)
        j = 0
    }
    else {
        multiply = (message.length/key.length) + 1
        j = 1
    }
    
    let originalKey = key
    key = ''
    for (let i = j; i < multiply; i++) {
        key += originalKey 
        console.log('alo')
    }

    while(key.length > message.length) {
        key = key.slice(0, key.length-1)                                                // taie pana inainte de key.length-1 !!!!
        console.log('repet')
        console.log(key, 'cutting....')
    }
}

function reduceKey() {
    while(key.length > message.length) {
        key = key.slice(0, key.length-1)                                                // taie pana inainte de key.length-1 !!!!
        console.log('repeta')
        console.log(key, 'cutting')
    }
    console.log(key)
}

function makeKeyEqualToMessage() {                                                      // modificam cheia
    if (message.length > key.length) {
        console.log('The input is bigger')
        extendKey()
    }
    else if (message.length < key.length) {
        console.log('The key is bigger')
        reduceKey()
    }
    else {
        console.log('The input equals the key')
    }
}

function encryptMessage() {                                                             // let's encrypt
    assignmentAndCheck()
    if (validCheck === false) {
        alert('Invalid input, you need a message and a key ! Thank you !')
        console.log("Invalid input, sorry")
        return 
    }
    console.log('Valid input, code goes forward!')
    makeKeyEqualToMessage()
    console.log(`Now i am ready to encrypt : message = "${message}", key = "${key}"`)

    let indexMessageHolder = []                                                          // am pus intr-un array pozitiile indecsilor de pe mesaj
    for(let i = 0; i < message.length; i++) {
        indexMessageHolder.push(characters.indexOf(`${message[i].toUpperCase()}`))
    }
    console.log('Here is index array for message', indexMessageHolder)

    let indexKeyHolder = []                                                              // am pus intr-un array pozitiile indecsilor de pe cheie
    for(let i = 0; i < key.length; i++) {
        indexKeyHolder.push(characters.indexOf(`${key[i].toUpperCase()}`))
    }
    console.log('Here is index array for key', indexKeyHolder)

    console.log('Now I am ready to sum up the arays index by index')

    encryptedResultHolder = []                                                           // am adunat in encryptedResultHolder pozitiile indecsilor mesaj + cheie
    for(let i = 0; i < indexKeyHolder.length; i++) {
        encryptedResultHolder.push(indexMessageHolder[i] + indexKeyHolder[i])           // pentru criptare am adunat
    }
    console.log('Here is index array for the result', encryptedResultHolder)

    let messageCoded = ''                                                               // indecsii rezultatului trebuie transformati in text acuma
    for(let i = 0; i < encryptedResultHolder.length; i++) {                             // trebuie sa am grija sa nu ies din characters array
        if(encryptedResultHolder[i] > 51) {                                             // cand e peste range
            let backInRange = encryptedResultHolder[i] - 52                             // am coborat cu 52 de pozitii
            messageCoded += characters[backInRange]
        }
        else {
            messageCoded += characters[encryptedResultHolder[i]]                        // cand e in range
        }
    }
    console.log(messageCoded)
    messageOutput.textContent = messageCoded
}

function decryptMessage() {                                                             // let's decypt
    assignmentAndCheck()
    if (validCheck === false) {
        alert('Invalid input, you need a message and a key ! Thank you !')
        return console.log("Invalid input, sorry")
    }              
    console.log('Valid input, code goes forward!')
    makeKeyEqualToMessage()
    console.log(`Now i am ready to decrypt : message = "${message}", key = "${key}"`)

    let indexMessageHolder = []                                                          // am pus intr-un array pozitiile indecsilor de pe mesaj
    for(let i = 0; i < message.length; i++) {
        indexMessageHolder.push(characters.indexOf(`${message[i].toUpperCase()}`))
    }
    console.log('Here is index array for message', indexMessageHolder)

    let indexKeyHolder = []                                                              // am pus intr-un array pozitiile indecsilor de pe cheie
    for(let i = 0; i < key.length; i++) {
        indexKeyHolder.push(characters.indexOf(`${key[i].toUpperCase()}`))
    }
    console.log('Here is index array for key', indexKeyHolder)

    console.log('Now I am ready to sum up the arays index by index')

    encryptedResultHolder = []                                                           // am adunat in encryptedResultHolder pozitiile indecsilor mesaj + cheie
    for(let i = 0; i < indexKeyHolder.length; i++) {
        encryptedResultHolder.push(indexMessageHolder[i] - indexKeyHolder[i])           // pentru decriptare am scazut
    }
    console.log('Here is index array for the result', encryptedResultHolder)

    let messageCoded = ''                                                               // indecsii rezultatului trebuie transformati in text acuma
    for(let i = 0; i < encryptedResultHolder.length; i++) {                             // trebuie sa am grija sa nu ies din characters array
        if(encryptedResultHolder[i] > 51) {                                             // cand e peste range
            let backInRange = encryptedResultHolder[i] - 52
            messageCoded += characters[backInRange]
        }
        else if(encryptedResultHolder[i] < 0) {
            let forwardInRange = encryptedResultHolder[i] + 52                          // de sub 0, am urcat cu 52 de pozitii
            messageCoded += characters[forwardInRange]
        }
        else {
            messageCoded += characters[encryptedResultHolder[i]]                        // cand e in range
        }
    }
    console.log(messageCoded)
    messageOutput.textContent = messageCoded
}

function copyFunction() {
    // messageOutput.select()
    // document.execCommand('Copy')
    navigator.clipboard.writeText(messageOutput.value);
}

encryptButton.addEventListener('click', encryptMessage)
decryptButton.addEventListener('click', decryptMessage)
copyButton.addEventListener('click', copyFunction)