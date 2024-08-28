function characterCounter() {
    const textArea = document.querySelector('.encrypt__textarea-input');
    const charCountHighlight = document.querySelector('.encrypt__char-count--highlight');

    textArea.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCountHighlight.textContent = currentLength;
    });
}

characterCounter();

function validateText() {
    const textArea = document.querySelector('.encrypt__textarea-input');
    const validationNotice = document.querySelector('.encrypt__textarea-notice');
    const regex = /^[a-z\s]*$/;
    const contentTextarea = textArea.value;

    if (contentTextarea === "") {
        validationNotice.innerHTML = "<i class='bx bxs-info-circle'></i> Solo letras minúsculas y sin acentos";
        validationNotice.style.color = "#94a4b7";
        return false;
    } else if (!regex.test(contentTextarea)) {
        validationNotice.innerHTML = "<i class='bx bxs-error-circle'></i> El texto contiene mayúsculas o caracteres especiales";
        validationNotice.style.color = "red";
        return false;
    } else {
        validationNotice.innerHTML = "<i class='bx bxs-check-circle'></i> Texto válido";
        validationNotice.style.color = "#db8420";
        return true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.querySelector('.encrypt__textarea-input');
    textArea.addEventListener('input', validateText);
});

function pasteText() {
    const textArea = document.querySelector('.encrypt__textarea-input');
    const btnPaste = document.querySelector('.encrypt__button--paste');

    btnPaste.addEventListener('click', () => {
        navigator.clipboard.readText().then((text) => {
            textArea.value = text;

            const event = new Event('input', { bubbles: true });
            textArea.dispatchEvent(event);
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    });
}

pasteText();

function encryptionMethod(stringEncrypt) {
    const encryptionMethod = {
        "a": "ai",
        "e": "enter",
        "i": "imes",
        "o": "ober",
        "u": "ufat"
    };

    stringEncrypt = stringEncrypt.toLowerCase();

    let encryptedText = '';
    for (let char of stringEncrypt) {
        encryptedText += encryptionMethod[char] || char;
    }

    return encryptedText;
}

function encryptBtn() {
    const textArea = document.querySelector('.encrypt__textarea-input');
    const message = document.querySelector('.decrypt__textarea');
    const charCountHighlight = document.querySelector('.encrypt__char-count--highlight');
    const validationNotice = document.querySelector('.encrypt__textarea-notice');

    if (validateText()) {
        let encryptedText;
        encryptedText = encryptionMethod(textArea.value);
        message.value = encryptedText;
        message.style.backgroundImage = "none";
        textArea.value = '';
        charCountHighlight.textContent = 0;
        validationNotice.innerHTML = "<i class='bx bxs-info-circle'></i> Solo letras minúsculas y sin acentos";
        validationNotice.style.color = "#94a4b7";
    }
}

const btnEncrypt = document.querySelector('.encrypt__button--encrypt');
btnEncrypt.addEventListener('click', encryptBtn);
function copyText() {
    const message = document.querySelector('.decrypt__textarea');
    message.select();
    message.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(message.value)
        .then(() => {
        console.log('Texto copiado al portapapeles');
        })
        .catch(err => {
        console.error('Error al copiar el texto: ', err);
        });
}

const btnCopy = document.querySelector('.decrypt__button--copy');
btnCopy.addEventListener('click', copyText);
function decryptionMethod(stringDecrypt) {
    const decryptionMethod = {
        "ai": "a",
        "enter": "e",
        "imes": "i",
        "ober": "o",
        "ufat": "u"
    };

    for (let pattern in decryptionMethod) {
        if (stringDecrypt.includes(pattern)) {
            stringDecrypt = stringDecrypt.replaceAll(pattern, decryptionMethod[pattern]);
        }
    }
    return stringDecrypt;
}

function decryptBtn() {
    const message = document.querySelector('.decrypt__textarea');
    let decryptedText;
    decryptedText = decryptionMethod(message.value);
    message.value = decryptedText;
}

const btnDecrypt = document.querySelector('.decrypt__button--decrypt');
btnDecrypt.addEventListener('click', decryptBtn);


function changeFooterText() {
    const footerText = document.querySelector('.footer__text');
    footerText.innerText = "Alura Latam";
}
changeFooterText();
