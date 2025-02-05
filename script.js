// Cotação de moedas do dia.
const USD = 5.8;
const EUR = 6.04;
const GBP = 7.26;

// Obtendo os elementos do formulário.
const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const currency = document.querySelector("#currency");
const footer = document.querySelector("main footer");
const description = document.querySelector("#description");
const result = document.querySelector("#result");

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Captando o evento de submit (enviar) do formulário.
form.onsubmit = (event) => {
  event.preventDefault();

  switch (currency.value){
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }

  amount.focus();
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol){
  try{
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formartCurrencyBRL(price)}`;
    
    // Calcula o total.
    let total = amount * price;

    // Verifica se o resultado não é um número.
    if(isNaN(total)){
      return alert("O valor digitado deve ser um número!");
    }

    // Formata o valor total.
    total = formartCurrencyBRL(total).replace("R$", "");
    
    // Exibe o resultado total.
    result.textContent = `${total} Reais`;

    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result");


  } catch (error){
    // Remove a classe do footer removendo ele da tela.
    footer.classList.remove("show-result");
    
    console.log(error);
    alert("Não foi possível converter. Tente novamente!");
  }
}

// Formata a moeda em Real Brasileiro
function formartCurrencyBRL(value){
  // Converte para número para utilizar  o toLocaleString para formatar no padrão BRL (R$ 0,00).
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}