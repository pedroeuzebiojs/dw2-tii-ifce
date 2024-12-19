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
