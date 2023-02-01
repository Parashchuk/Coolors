const randomColor = () => {
  const HEX = '1234567890ABCDEF';
  let color = '';

  for (let i = 0; i < 6; i++) {
    color += HEX[Math.floor(Math.random() * HEX.length)];
  }

  return color;
};

const columns = document.querySelectorAll('.color-column');

const renderColor = () => {
  columns.forEach((el) => {
    const titleNode = el.children[0];
    const imageNode = el.children[1];
    const isLocked = imageNode.classList.contains('fa-lock');
    const color = chroma.random().hex();

    if (isLocked) {
      return;
    }

    if (chroma(color).luminance() < 0.5) {
      titleNode.style.color = 'white';
      imageNode.style.color = 'white';
    } else {
      titleNode.style.color = 'black';
      imageNode.style.color = 'black';
    }

    el.style.background = color;
    titleNode.textContent = color;
  });
};

document.addEventListener('keydown', (event) => {
  if (event.code.toLocaleLowerCase() === 'space') {
    renderColor();
  }
});

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;
  let node;
  if (type === 'lock') {
    if (event.target.tagName.toLocaleLowerCase() === 'i') {
      node = event.target;
    } else {
      node = event.target.children[0];
    }

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  }
});

renderColor();
