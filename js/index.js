const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (e.code === 'Space') {
    addColorForCol();
  }
});

document.addEventListener('click', (e) => {
  e.preventDefault();
  const type = e.target.dataset.type;
  if (type === 'lock') {
    const node =
      e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0];
    node.classList.toggle('fa-unlock');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    return navigator.clipboard.writeText(e.target.textContent);
  }
});

const addColorForCol = () => {
  cols.forEach((col) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    if (isLocked) {
      return;
    }
    const color = chroma.random();
    const text = col.querySelector('.text');
    col.style.backgroundColor = color;
    text.innerHTML = color;
    openModal(text);
    addTextColorForCol(text, color);
  });
};

const addTextColorForCol = (text, color) => {
  const luminace = chroma(color);
  let luminace2 = luminace.luminance();
  text.style.color = luminace2 > 0.5 ? 'black' : 'white';
};

const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('button--active');
  });
});

//Мобильная кнопка
const buttonMobile = document.querySelector('.button-inner__button');

buttonMobile.addEventListener('click', () => {
  addColorForCol();
});

// Модальное окно
function openModal(text) {
  const containerModal = document.querySelector('.container');
  text.addEventListener('click', () => {
    containerModal.classList.remove('hidden');
    const buttonInner = document.querySelector('.button-inner');
    buttonInner.classList.add('hidden');
  });
}

function closeModal() {
  const closeButtons = document.querySelectorAll('.close-modal');
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () =>{
      const containerModal = document.querySelector('.container');
      containerModal.classList.add('hidden');
      const buttonInner = document.querySelector('.button-inner');
      buttonInner.classList.remove('hidden');
    })
  });
}
closeModal();

addColorForCol();
