const cube = document.getElementById('rubiksCube');
const faces = {
  front: document.getElementById('front'),
  back: document.getElementById('back'),
  left: document.getElementById('left'),
  right: document.getElementById('right'),
  top: document.getElementById('top'),
  bottom: document.getElementById('bottom')
};

let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;
let lastX = 0, lastY = 0;

cube.addEventListener('mousedown', startDrag);
cube.addEventListener('touchstart', startDrag);

function startDrag(e) {
  e.preventDefault();
  isDragging = true;
  startX = e.pageX || e.touches[0].pageX;
  startY = e.pageY || e.touches[0].pageY;
  cube.style.transition = 'none';
  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);
}

function drag(e) {
  if (!isDragging) return;
  const x = e.pageX || e.touches[0].pageX;
  const y = e.pageY || e.touches[0].pageY;
  const deltaX = x - startX;
  const deltaY = y - startY;
  currentX = lastX + deltaX;
  currentY = lastY - deltaY;
  cube.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
}

function endDrag() {
  isDragging = false;
  lastX = currentX;
  lastY = currentY;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('touchmove', drag);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchend', endDrag);
  cube.style.transition = 'transform 1s ease';
}

// Array to store the current rotation of each face
let rotations = {
  front: 0,
  back: 0,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

document.addEventListener('keydown', (e) => {
  switch(e.code) {
    case 'ArrowUp': rotateLayer('top', 90); break;
    case 'ArrowDown': rotateLayer('top', -90); break;
    case 'ArrowLeft': rotateLayer('left', 90); break;
    case 'ArrowRight': rotateLayer('left', -90); break;
    case 'KeyW': rotateLayer('front', 90); break;
    case 'KeyS': rotateLayer('front', -90); break;
    case 'KeyA': rotateLayer('side', 90); break;
    case 'KeyD': rotateLayer('side', -90); break;
    case 'KeyQ': rotateLayer('bottom', 90); break;
    case 'KeyE': rotateLayer('bottom', -90); break;
  }
});

function rotateLayer(face, angle) {
  rotations[face] = (rotations[face] + angle) % 360;
  switch(face) {
    case 'top':
      cube.style.transform += ` rotateX(${angle}deg)`;
      break;
    case 'bottom':
      cube.style.transform += ` rotateX(${angle}deg)`;
      break;
    case 'front':
      cube.style.transform += ` rotateY(${angle}deg)`;
      break;
    case 'back':
      cube.style.transform += ` rotateY(${angle}deg)`;
      break;
    case 'left':
      cube.style.transform += ` rotateY(${angle}deg)`;
      break;
    case 'right':
      cube.style.transform += ` rotateY(${angle}deg)`;
      break;
    case 'side':
      cube.style.transform += ` rotateY(${angle}deg)`;
      break;
  }
}
