import "./css/index.css";
import IMask from "imask";

const ccBgColor01 = document.querySelector(
  "#app > section > div.cc-bg > svg > g > g:nth-child(1) > path"
);
const ccBgColor02 = document.querySelector(
  "#app > section > div.cc-bg > svg > g > g:nth-child(2) > path"
);
const cardLogo = document.querySelector(
  "#app > section > div.cc-logo > span:nth-child(2) > img"
);

function setCardType(type) {
  const colors = {
    visa: ["#2d57f2", "#2d57f2"],
    mastercard: ["#EB001B", "#F79E1B"],
    default: ["black", "gray"],
    american: ["white", "#0077A6"],
    discover: ["#db8135", "#db8135"],
  };
  ccBgColor01.setAttribute("fill", colors[type][1]);
  ccBgColor02.setAttribute("fill", colors[type][0]);
  cardLogo.setAttribute("src", `cc-${type}.svg`);
}

function mudaCardView(selectorIn, selectorOut, casoVazio) {
  const selecIn = document.querySelector(selectorIn)
  selecIn.addEventListener("input", () => {
    const valor = selecIn.value;
    document.querySelector(selectorOut).innerText = valor.length === 0 ? casoVazio : valor;
  });

};

//Security Code
const securityCode = document.querySelector("#security-code");
const securityCodePattern = {
  mask: "0000",
};
const securityCodeMasked = IMask(securityCode, securityCodePattern);
mudaCardView("#security-code","#cvc-view","123")

//Expiration Code
const expirationDate = document.querySelector("#expiration-date");
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },

    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
};
const expirationCodeMasked = IMask(expirationDate, expirationDatePattern);
mudaCardView("#expiration-date","#app > section > div.cc-info > div.cc-extra > div.cc-expiration > div.value","12/32")

//card Number
const cardNumber = document.querySelector("#card-number");
const cardNumberPattern = {
  mask: "0000 0000 0000 0000",
};
const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

const mudatype = cardNumber.addEventListener("input", function () {
  const num = cardNumber.value;

  const digito1 = num.toString().charAt(0);

console.log(digito1)
  if (digito1 == 4) {
    return setCardType("visa");
  } else if (digito1 == 5) {
    return setCardType("mastercard");
  } else if (digito1 == 3) {
    return setCardType("american");
  } else if (digito1 == 6) {
    return setCardType("discover");
  } else setCardType("default");
});
mudaCardView("#card-number", "#app > section > div.cc-info > div.cc-number","1234 5678 9123 4567");

//Nome do Tutular
const nomeTitular = document.querySelector("#card-holder");

const nomeTitularpattern = {
  mask: "***********************************************",
};
const nomeTitularpatternMasked = IMask(nomeTitular, nomeTitularpattern);
mudaCardView("#card-holder","#app > section > div.cc-info > div.cc-holder > div.value","DEYVID HOLNIK")

const btnAddCard = document.querySelector("#btn-add-card");

btnAddCard.addEventListener("click", function () { alert("Cartão Adicionado")});
