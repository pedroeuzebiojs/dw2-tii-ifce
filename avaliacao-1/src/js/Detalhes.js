function fetchData() {
  return new Promise((resolve, reject) => {
    const ajax = new XMLHttpRequest();

    ajax.open("GET", "Produtos.json", true);
    ajax.responseType = "json";

    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          resolve(ajax.response);
        } else {
          reject(new Error("Falha ao obter os dados do arquivo JSON."));
        }
      }
    };

    ajax.send();
  });
}

function showProductDetails(produtoID, resposta) {
  const exibirDados = document.getElementById("resultado");

  exibirDados.innerHTML = `
    <div class="title-details">Detalhes do produto</div>
    <div class="container">
      <div class="img">
        <img src="${resposta[produtoID].imagem}" alt="">
      </div>
      <div class="content">
        <div class="product-name">${resposta[produtoID].titulo}</div>
        <div class="product-description">${resposta[produtoID].descricao}</div>
        <div class="price">${parseFloat(
          resposta[produtoID].preco
        ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
        <div class="qty">
          <label>Quantidade</label>
          <input type="number" id="qtd" value="1" min="1" max="15" maxlength="2" step="1" class="itemQuantity">
        </div>
        <div class="btn">
          <button id="adicionar">Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
    <div id="error"></div>
  `;
}

function addItemToCart(resposta, produtoID) {
  const qtdInput = document.getElementById("qtd");
  const qtd = parseInt(qtdInput.value);

  if (!isNaN(qtd) && qtd >= 1 && qtd <= 15) {
    const id = resposta[produtoID].id;
    const name = resposta[produtoID].titulo;
    const preco = resposta[produtoID].preco;

    const dataObj = { id, name, qtd, preco };

    let items = JSON.parse(sessionStorage.getItem("items")) || [];

    items.push(dataObj);
    sessionStorage.setItem("items", JSON.stringify(items));

    const splash = document.querySelector(".splash");
    splash.classList.add("effect");
    setTimeout(() => {
      splash.classList.add("display-none");
    }, 2000);

    atualizaQtdeCart();
  } else {
    const erro = document.getElementById("error");
    erro.innerHTML = `* A quantidade deve ser um número entre 1 e 15`;
  }
}

function initializePage() {
  fetchData()
    .then((resposta) => {
      const urlParams = new URLSearchParams(location.search);
      const produtoID = urlParams.get("produto");

      if (produtoID !== null && resposta[produtoID]) {
        showProductDetails(produtoID, resposta);

        document
          .getElementById("adicionar")
          .addEventListener("click", function () {
            addItemToCart(resposta, produtoID);
          });
      } else {
        const exibirDados = document.getElementById("resultado");
        exibirDados.innerHTML = `<div class="title-details">Produto não encontrado.</div>`;
      }
    })
    .catch((error) => {
      console.error(error);
      const exibirDados = document.getElementById("resultado");
      exibirDados.innerHTML = `<div class="title-details">Erro ao obter os dados.</div>`;
    });
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

initializePage();
