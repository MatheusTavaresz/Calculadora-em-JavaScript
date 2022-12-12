const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

const allowedKeys = ["(", ")","/", "*", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%" , ""] //Seta quais teclas serão aceitas pelo navegador

document.querySelectorAll('.charKey').forEach(function (charKeyBtn) { 
    charKeyBtn.addEventListener('click', function (){
        const value = charKeyBtn.dataset.value 
        input.value += value 
    })
})

document.getElementById('clear').addEventListener('click', function (){ //Adiciona funcionalidades ao 'c'
    input.value = '' //Limpa todo conteúdo e substitui por uma string vazia
    input.focus() //Define que após limpar o conteúdo o foco vá cursor text select 
})

input.addEventListener('keydown', function (ev){
    ev.preventDefault() //Altera o comportamento padrão do navegador

    if (allowedKeys.includes(ev.key)){ //Verifica se os caracteres são permitidos com base no array 'allowedKeys', caso SIM, adiciona valor ao input
        input.value += ev.key 
        return
    }

    if (ev.key === 'Backspace') { //Permite o uso da tecla basckspace
        input.value = input.value.slice(0, -1) //Recorta do primeiro valor ao ultimo
    }

    if (ev.key === 'Enter') {
        calculate()
    }
})

document.getElementById('equal').addEventListener('click', calculate)


function calculate (){
    resultInput.value = 'ERROR' //Define ao input o valor "ERROR" por padrão
    resultInput.classList.add('error') //Adiciona a classe 'error' para a entrada, e aplica as estilizações do CSS

    const result = eval (input.value) //O eval além de avaliar o que contém na entrada de dados, realiza o calculo automaticamente. 

    resultInput.value = result
    resultInput.classList.remove('error') //Remove a classe Error quando os parâmetros da são digitados corretamente
}

document.getElementById('copyToClipboard').addEventListener('click', function (ev){
    const button = ev.currentTarget
    if(button.innerText === 'Copy'){
        button.innerText = 'Copied!'
        button.classList.add('success')
        navigator.clipboard.writeText(resultInput.value) //O objeto 'navigator' é uma propriedade do objeto 'window', o '.cplipboard' captura e copia valor do resultInput. 
    } else {
        button.innerText = 'Copy'
        button.classList.remove('success') 
    }
})


document.getElementById('themeSwitcher').addEventListener('click', function (){ //Altera o esquema de cores da calculadora
    if(main.dataset.theme === 'dark'){
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26834a')
        main.dataset.theme = 'light'
    } else {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'
    }
})

