function renderItem(item, idPosicao) {
  const carrinhoExibir = document.getElementById("carrinho-produtos");

  carrinhoExibir.innerHTML += `
    <div class="products">
        <div class="name">${item.name}</div>
        <div class="price">${parseFloat(item.preco).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}</div>
        <div style="clear:both"></div>
        <div class="qty">
            Quantidade: 
                <div class="qtde">
                    <a onclick='removeQtde(${idPosicao},${
    item.qtd
  })' id="remove">-</a>
                    <div value="" class="itemQuantity" id="qtd">${
                      item.qtd
                    }</div>
                    <a onclick='addQtde(${idPosicao},${
    item.qtd
  })' id="add">+</a>
                </div>
        </div>
        <div class="subtotal">Subtotal: ${parseFloat(
          item.qtd * item.preco
        ).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })} </div>
        <div class="remove"><a onclick='removeProd(${idPosicao})'>Remover</a></div>
    </div>`;
}

function addQtde(idPosicao, quantidade) {
  if (quantidade >= 15) {
    console.log("tentou colocar um valor inválido");
  } else {
    let item = JSON.parse(sessionStorage.getItem("items"));

    item[idPosicao].qtd = `${quantidade + 1}`;
    sessionStorage.setItem("items", JSON.stringify(item));

    getItems();
  }
}

function removeQtde(idPosicao, quantidade) {
  if (quantidade == 1) {
    console.log("tentou colocar um valor inválido");
  } else {
    let item = JSON.parse(sessionStorage.getItem("items"));

    item[idPosicao].qtd = `${quantidade - 1}`;
    sessionStorage.setItem("items", JSON.stringify(item));

    getItems();
  }
}

function carrinhoVazio() {
  let items = JSON.parse(sessionStorage.getItem("items"));

  if (items === null) {
    var carrinhoExibir = document.getElementById("cart-content");
    carrinhoExibir.innerHTML = "";
    var carrinhoExibir = document.getElementById("cart-null");
    carrinhoExibir.innerHTML = `
        <div class="no-product">
            <div class="small-title">Seu carrinho está vazio</div>
            <div class="small-subtitle">Dê uma olhada no nosso cardápio<div>
            <a href="../../Cardapio.html">Ver Cardápio</a>
        </div>
        `;
  }
}

function getItems() {
  let items = JSON.parse(sessionStorage.getItem("items"));
  carrinhoVazio();

  if (sessionStorage.getItem("items")) {
    if (items.length == 0) {
      sessionStorage.removeItem("items");

      carrinhoVazio();
      atualizaQtdeCart();
    } else {
      var carrinhoExibir = document.getElementById("carrinho-produtos");
      carrinhoExibir.innerHTML = "";

      items.forEach((item, indexid) => {
        renderItem(item, indexid);
      });

      mensagem();
      totalFunc();
      atualizaQtdeCart();
    }
  }
}

function removeProd(id) {
  let item = JSON.parse(sessionStorage.getItem("items"));
  item.splice(id, 1);
  sessionStorage.setItem("items", JSON.stringify(item));

  getItems();
}

function totalFunc() {
  var totalFinal = [];
  var totalExibir = document.getElementById("total");
  let item = JSON.parse(sessionStorage.getItem("items"));

  item.forEach((item, indexid) => {
    totalFinal.push(parseFloat(item.qtd * item.preco));
  });

  totalFinal = totalFinal.reduce(
    (totalFinal, currentElement) => totalFinal + currentElement
  );
  console.log("o totalFinal é de: " + totalFinal);

  totalExibir.innerHTML = `Total: ${totalFinal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;
}

function mensagem() {
  var buttonWhatsApp = document.getElementById("buttonWhatsapp");
  var mensagemWhats =
    "https://api.whatsapp.com/send?l=pt_BR&phone=5585996523080&text=Boa%20noite%20gostaria%20de%20pedir:";

  let item = JSON.parse(sessionStorage.getItem("items"));

  item.forEach((item, indexid) => {
    mensagemWhats += `%0A${item.qtd.toString()} - ${item.name.toString()};`;
  });

  buttonWhatsApp.innerHTML = `<a href="${mensagemWhats} " target="_blank"><i class="fab fa-whatsapp"></i> Fazer pedido</a>`;
}

function atualizaQtdeCart() {
  let exibeQtdeCart = document.getElementById("cont-cart");
  let item = JSON.parse(sessionStorage.getItem("items"));
  let qtde = [];
  if (item != null) {
    item.forEach((item) => {
      qtde.push(parseInt(item.qtd));
    });
    let total = qtde.reduce((total, qtde) => total + qtde, 0);
    exibeQtdeCart.innerHTML = `${total}`;
  } else {
    exibeQtdeCart.innerHTML = `0`;
  }
}

atualizaQtdeCart();
getItems();
totalFunc();
