// cotações de moedas do dia
const USD = 5.40
const EUR = 6.27
const GBP = 7.22

// obtendo os elementos
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const result = document.getElementById("result")
const description = document.getElementById("description")

// manipular o input para receber so numero
amount.addEventListener("input", () => {
// console.log(amount.value)
// esse regex ele pega tudo que nao for numero
 const hasCharactersRegex = /\D+/g

//  ele troca tudo que não for numero para espaço vazio
amount.value = amount.value.replace(hasCharactersRegex, "")
// console.log(amount.value)
})

// captura do evento submit (enviar) do form
form.onsubmit = (event) => {
  event.preventDefault() // desabilita a att dos dados

   switch (currency.value) {
    case "USD":
      convertCurrency(Number(amount.value), USD, "US$")
      break

    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break

    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
   }

}

// função para converter a moeda
function convertCurrency(amout, price, symbol) {
    // console.log(amount, price, symbol)
    try {
       // exibindo a cotação da moeda selecionada
      description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

      let total = Number(amount.value) * price

      if(Number.isNaN(total))
       {
        throw new Error("O valor inválido não é um número")
       }

      result.textContent = `${formatCurrencyBRL(total).replace("R$","")} Reais`

      // aplica  a classe que exibe o footer p/mostrar o resultado
      footer.classList.add("show-result")
    } catch (error) {
      console.log(error)
      footer.classList.remove("show-result")
      alert("Não foi possivel converter. tente novamente mais tarde")
    }
}

// formata a moeda em real brasileiro
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}