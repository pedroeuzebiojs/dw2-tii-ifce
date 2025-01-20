document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3333/tema")
    .then((response) => response.json())
    .then((data) => {
      console.log("Tema carregado:", data);

      document.getElementById("tema-descricao").textContent = data.descricao;
    })
    .catch((error) => {
      console.error("Erro ao buscar dados do tema:", error);
    });

  fetch("http://localhost:3333/categorias")
    .then((response) => response.json())
    .then((data) => {
      console.log("Categorias carregadas:", data);

      const listaCategorias = document.getElementById("categorias-lista");

      data.forEach((categoria) => {
        const li = document.createElement("li");
        li.textContent = categoria.nome;
        listaCategorias.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar categorias:", error);
    });
});
