/* eslint-disable max-len */

/*
  Você é responsável por escrever o código do sistema de pedidos de um restaurante. Deve ser possível, através desse sistema, 
  cadastrar um menu. Dado que um menu foi cadastrado, o sistema deve disponibilizar um objeto através do qual se consegue:
  - ler o menu cadastrado; 
  - fazer pedidos;
  - verificar o que foi pedido;
  - somar o valor da conta.

  A estrutura deste código e deste objeto já foi definida e você irá implementá-la.
  Abaixo você verá uma série de testes e passos que devem ser, NECESSARIAMENTE, feitos em ordem para o bom desenvolvimento do sistema. 
  Eles guiarão você pelo desenvolvimento.

  Parâmetros:
  - Um objeto. Exemplos: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }.
  Comportamento:

  const meuRestaurante = createMenu({ food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }).

  meuRestaurante.fetchMenu() // Retorno: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }

  meuRestaurante.order('coxinha') // Retorno: undefined

  meuRestaurante.consumption // Retorno: ['coxinha']

  meuRestaurante.pay() // Retorno: 3.9

  Uma função createMenu retorna um objeto com as seguintes características:
  - Uma chave `fetchMenu` retorna o objeto que a função `createMenu` recebe por parâmetro. O menu tem sempre duas chaves, `food` e `drink`, no seguinte formato:

  const meuRestaurante = createMenu({
    food: {'coxinha': 3.90, 'sanduiche', 9.90},
    drinks: {'agua': 3.90, 'cerveja': 6.90}
  });

  meuRestaurante.fetchMenu() // Retorno: Menu acima

  - Uma chave `consumption` que contém um array de strings, com cada string sendo a chave de um pedido. Por exemplo: ['coxinha', 'cerveja']

  - Uma chave `order` que tem uma função que, recebida uma string como parâmetro, adiciona essa string à lista salva em `consumption`.

  - Uma chave `pay` que, quando chamada, invoca uma função que soma o valor de todos os pedidos e dá o preço com acréscimo de 10%.

  IMPORTANTE: COMECE PELO TESTE 1 DO ARQUIVO `tests/restaurant.spec.js` E NÃO PELO PASSO 1 DESTE ARQUIVO!
*/

// PASSO 1: Crie uma função `createMenu()` que, dado um objeto passado por parâmetro, retorna um objeto com o seguinte formato: { fetchMenu: () => objetoPassadoPorParametro }.
//
// Agora faça o TESTE 4 no arquivo `tests/restaurant.spec.js`.

//------------------------------------------------------------------------------------------

// PASSO 2: Adicione ao objeto retornado por `createMenu` uma chave `consumption` que, como valor inicial, tem um array vazio.
//
// Agora faça o TESTE 5 no arquivo `tests/restaurant.spec.js`.

//------------------------------------------------------------------------------------------

// PASSO 3: Crie uma função, separada da função `createMenu()`, que, dada uma string recebida por parâmetro, 
// adiciona essa string ao array de `objetoRetornado.consumption`. Adicione essa função à chave `order`.
// DICA: para criar isso, você pode: 
// - Definir a função `createMenu()`
// - Definir o objeto que a `createMenu()` retorna, mas separadamente 
// - E, depois, definir a função que será atribuída a `order`.
// ```
// const restaurant = {}
//
// const createMenu = (myMenu) => // Lógica que edita o objeto `restaurant`
//
// const orderFromMenu = (request) => // Lógica que adiciona à chave `consumption` de `restaurant` a string recebida no parâmetro `request`. 
// // Essa função deve ser associada à chave `order` de `restaurant`
// ```
// Agora faça o TESTE 6 no arquivo `tests/restaurant.spec.js`.

//------------------------------------------------------------------------------------------

// PASSO 4: adicione ao objeto retornado por `createMenu()` uma chave `pay` com uma função
// que percorre por todos os itens de `objetoRetornado.consumption`, soma o preço deles e retorna o valor somado acrescido de 10%.
// DICA: para isso, você precisará percorrer tanto o objeto da chave `food` quanto o objeto da chave `drink`.
 
let meuRestaurante = {};
const order = (request) => { meuRestaurante.consumption.push(request); };

let gambiarra1 = (cont, cont2, somaBebidas, bebidas) => {
   if (meuRestaurante.consumption[cont2] === bebidas[cont]) {
        somaBebidas += Object.values(meuRestaurante.fetchMenu().drinks)[cont];     
      }
      return somaBebidas;
};

let gambiarra2 = (cont, cont2, somaComidas, comidas) => {
  if (meuRestaurante.consumption[cont2] === comidas[cont]) {
      somaComidas += Object.values(meuRestaurante.fetchMenu().food)[cont];
    }
    return somaComidas;
};
let payBebidas = (bebidas, somaBebidas) => {   
  for (let cont = 0; cont < bebidas.length; cont += 1) {
    for (let cont2 = 0; cont2 < meuRestaurante.consumption.length; cont2 += 1) {
      somaBebidas = gambiarra1(cont, cont2, somaBebidas, bebidas);
    }
  }
  return somaBebidas;
};

let payComidas = (comidas, somaComidas) => { 
  for (let cont = 0; cont < comidas.length; cont += 1) {
    for (let cont2 = 0; cont2 < meuRestaurante.consumption.length; cont2 += 1) {
      somaComidas = gambiarra2(cont, cont2, somaComidas, comidas);
   }
  }
  return somaComidas;
};

let pay = () => {
  let bebidas = Object.keys(meuRestaurante.fetchMenu().drinks);
  let comidas = Object.keys(meuRestaurante.fetchMenu().food); 
  let somaBebidas = 0;
  let somaComidas = 0;
  
  somaBebidas = payBebidas(bebidas, somaBebidas);
  somaComidas = payComidas(comidas, somaComidas);
   
  return (1.1 * (somaComidas + somaBebidas));
};

const createMenu = (obj) => {
  meuRestaurante = { 
    consumption: [],
    order,
    pay,
    fetchMenu: () => obj,
  };
  return meuRestaurante;
};

const menuRestaurante = createMenu({
  food: { coxinha: 3.9, sanduiche: 9.9 },
  drinks: { agua: 3.9, cerveja: 6.9 },
});

// menuRestaurante.consumption = [];
// menuRestaurante.order('coxinha');
// menuRestaurante.order('agua');
// menuRestaurante.order('coxinha');

// console.log(Object.keys(menuRestaurante.fetchMenu().food))
// console.log(menuRestaurante.fetchMenu().food['coxinha'])
// console.log(menuRestaurante.fetchMenu().drinks['agua'])
// console.log("menu", menuRestaurante)
// console.log("fetch menu:" ,menuRestaurante.fetchMenu())
// console.log(" consumo: ", meuRestaurante.consumption)
// console.log(menuRestaurante.pay());
// console.log(Object.keys(menuRestaurante.fetchMenu()))
// console.log(createMenu({ food: {}, drink: {} }).consumption)
// console.log(menuRestaurante.fetchMenu())

module.exports = createMenu;