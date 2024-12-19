function fetchProdutos() {
  const ajax = new XMLHttpRequest();

  ajax.open("GET", "Produtos.json", true);

  ajax.responseType = "json";

  ajax.onload = function () {
    if (ajax.status === 200 && ajax.response) {
      const produtos = ajax.response;

      exibirProdutos(produtos);
    } else {
      console.error("Falha ao buscar os produtos.");
    }
  };

  ajax.send();
}

function exibirProdutos(produtos) {
  const containerCardsPedidos = document.querySelector("#card-pedidos");

  containerCardsPedidos.innerHTML = "";

  produtos.forEach((produto) => {
    containerCardsPedidos.innerHTML += `
      <div class="card">
          <div class="img">
            <img src="${produto.imagem}" alt="Lanche" />
          </div>
          <div class="content">
            <div class="product-name">${produto.titulo}</div>
            <div class="price">
              ${parseFloat(produto.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
            <div style="clear: both"></div>
            <div class="product-desc">
              ${produto.descricao}<br /><br />
            </div>
            <div class="btn">
              <a key="${
                produto.id
              }" href="#" class="link-details-product">Detalhes</a>
            </div>
          </div>
        </div>
    `;
  });

  function passaValor(valor) {
    window.location = "Detalhes.html?produto=" + valor;
  }

  const linksDetailsProducts = document.querySelectorAll(
    ".link-details-product"
  );

  linksDetailsProducts.forEach((link) => {
    link.addEventListener("click", (event) => {
      const key = link.getAttribute("key");

      passaValor(key);

      event.preventDefault();
    });
  });
}

document.addEventListener("DOMContentLoaded", fetchProdutos);
