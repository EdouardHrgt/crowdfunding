const buttons = document.querySelectorAll(".option-btn")
const stands = document.querySelectorAll('.option')
const modal = document.querySelector('.filter')
const thankYouModal = document.querySelector('.filter-thx')
const gotItButton = thankYouModal.querySelector('button')
const checkboxes = document.querySelectorAll('.checkboxes')
const forms = document.querySelectorAll('.modal-stands form')

function openModal(modalElement) {
  modalElement.classList.remove('none')
  document.body.classList.add("no-scroll")
}

function closeModal(modalElement) {
  modalElement.classList.add('none')
  document.body.classList.remove("no-scroll")
}

function setupStandClick() {
  stands.forEach(stand => {
    stand.addEventListener("click", () => {
      openModal(modal)
      const closeModalBtn = document.querySelector('#close-modal')
      closeModalBtn.addEventListener('click', () => {
        closeModal(modal)
      })
    })
  })
}

function disableOutOfStockCheckboxes() {
  checkboxes.forEach(checkbox => {
    const modalCheckbox = checkbox.closest('.modal-checkbox')
    const qtyStrong = modalCheckbox.querySelector('.modal-qty strong')
    const quantity = qtyStrong ? parseInt(qtyStrong.textContent.trim(), 10) : null
    if (quantity === 0) {
      modalCheckbox.classList.add('out-of-stock')
      checkbox.disabled = true
    }
  })
}

function setupCheckboxes() {
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      if (checkbox.disabled) return
      checkboxes.forEach(box => {
        if (box !== checkbox) box.checked = false
      })
      togglePledgeActive(checkbox)
    })
  })
}

function togglePledgeActive(selectedCheckbox) {
  checkboxes.forEach(box => {
    const parent = box.closest('.modal-checkbox')
    const pledgeDiv = parent.querySelector('.modal-pledge')
    if (box === selectedCheckbox && box.checked) {
      pledgeDiv.classList.add('modal-pledge-active')
    } else {
      pledgeDiv.classList.remove('modal-pledge-active')
    }
  })
}

function setupFormSubmissions() {
  forms.forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()
      const input = form.querySelector('input[type="number"]')
      const amount = input.value
      const modalCheckbox = form.closest('.modal-checkbox')
      const pledgeId = modalCheckbox.id
      console.log(`Pledge soumis : ${pledgeId}, montant : $${amount}`)
      closeModal(modal)
      openModal(thankYouModal)
    })
  })
}

function setupThankYouModal() {
  gotItButton.addEventListener('click', () => {
    closeModal(thankYouModal)
  })
}

function init() {
  setupStandClick()
  disableOutOfStockCheckboxes()
  setupCheckboxes()
  setupFormSubmissions()
  setupThankYouModal()
}

document.addEventListener('DOMContentLoaded', init)
