document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    listProfiles: document.getElementById("list-profiles"),
    numberProfiles: document.getElementById("number-profiles"),
    form: document.querySelector("form"),
  };

  const displayMessage = (message) => {
    elements.listProfiles.innerHTML = `<p>${message}</p>`;
  };

  const createProfileElement = (user) => {
    const profile = document.createElement("div");
    profile.className = "profile";

    const img = document.createElement("img");
    img.src = user.picture.medium;
    img.alt = `${user.name.first} ${user.name.last}`;
    img.loading = "lazy";

    const name = document.createElement("p");
    name.textContent = `${user.name.first} ${user.name.last}`;

    profile.append(img, name);
    return profile;
  };

  const fetchAndDisplayProfiles = async (numberProfiles) => {
    displayMessage("Carregando perfis...");

    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${numberProfiles}`
      );
      const data = await response.json();

      const fragment = document.createDocumentFragment();
      data.results.forEach((user) => {
        fragment.appendChild(createProfileElement(user));
      });

      elements.listProfiles.innerHTML = "";
      elements.listProfiles.appendChild(fragment);
    } catch (error) {
      console.error("Erro ao carregar perfis:", error);
      displayMessage("Erro ao carregar perfis. Tente novamente.");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const numberProfiles = parseInt(elements.numberProfiles.value, 10);
    if (!numberProfiles || numberProfiles < 1 || numberProfiles > 20) {
      alert("Por favor, insira um número entre 1 e 20.");
      return;
    }

    fetchAndDisplayProfiles(numberProfiles);
  };

  elements.form.addEventListener("submit", handleFormSubmit);
});
