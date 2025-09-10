const buttons = document.querySelectorAll(".option-btn");
const stands = document.querySelectorAll('.option');

stands.forEach((stand) => {
  stand.addEventListener("click", () => {
    const modal = document.querySelector('.filter');
    modal.classList.remove('none');
    document.body.classList.add("no-scroll");
    const closeModal = document.querySelector('#close-modal');
    closeModal.addEventListener('click', ()=>{
      modal.classList.add('none');
      document.body.classList.remove("no-scroll");
    })
  });
});

const checkboxes = document.querySelectorAll('.checkboxes');

checkboxes.forEach(checkbox => {
  // Remonter au parent .modal-checkbox
  const modalCheckbox = checkbox.closest('.modal-checkbox');
  
  // Vérifier la quantité dans modal-qty (le <strong> à l'intérieur)
  const qtyStrong = modalCheckbox.querySelector('.modal-qty strong');
  const quantity = qtyStrong ? parseInt(qtyStrong.textContent.trim(), 10) : null;
  
  if (quantity === 0) {
    // Ajouter la classe CSS "out-of-stock"
    modalCheckbox.classList.add('out-of-stock');
    
    // Option 1: Désactiver la checkbox pour qu'elle ne soit pas cliquable
    checkbox.disabled = true;
    
    // Option 2: Si tu préfères pas la désactiver, tu peux aussi bloquer le clic dans l'event listener
  }
});

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
    // Si la checkbox est désactivée (quantité 0), ne rien faire
    if (checkbox.disabled) return;

    // Désélectionner toutes les autres checkboxes sauf celle cliquée
    checkboxes.forEach(box => {
      if (box !== checkbox) {
        box.checked = false;
      }
    });

    const modalCheckbox = checkbox.closest('.modal-checkbox');
    const isChecked = checkbox.checked;
    if (modalCheckbox) {
      const strong = modalCheckbox.querySelector('.modal-stands-title strong');
      if (strong) {
        if (isChecked) {
          console.log(`Selectionné : ${strong.textContent.trim()}`);
        } else {
          console.log(`Déselectionné : ${strong.textContent.trim()}`);
        }
      }
    }
  });
});


function listenForSelectedStand() {

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const optionDiv = button.closest(".option");
      const standTitle = optionDiv.querySelector("h3").textContent;
      console.log(`Stand sélectionné : ${standTitle}`);

    });
  });
}

document.addEventListener("DOMContentLoaded", listenForSelectedStand);
