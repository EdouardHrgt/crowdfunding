function listenForSelectedStand() {
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const optionDiv = button.closest(".option");

      const standTitle = optionDiv.querySelector("h3").textContent;

      console.log(`Stand sélectionné : ${standTitle}`);
    });
  });
}

document.addEventListener("DOMContentLoaded", listenForSelectedStand);
