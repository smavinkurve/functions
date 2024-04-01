// const words = document.querySelectorAll('.word');
// const sentence = document.getElementById('sentence');

// let draggedWord = null;

// words.forEach(word => {
//   word.addEventListener('dragstart', dragStart);
//   word.addEventListener('dragend', dragEnd);
// });

// sentence.addEventListener('dragover', dragOver);
// sentence.addEventListener('dragenter', dragEnter);
// sentence.addEventListener('dragleave', dragLeave);
// sentence.addEventListener('drop', drop);

// function dragStart() {
//   draggedWord = this;
//   this.classList.add('dragging');
// }

// function dragEnd() {
//   draggedWord.classList.remove('dragging');
//   draggedWord = null;
// }

// function dragOver(e) {
//   e.preventDefault();
// }

// function dragEnter(e) {
//   e.preventDefault();
//   this.classList.add('over');
// }

// function dragLeave() {
//   this.classList.remove('over');
// }

// function drop(e) {
//   e.preventDefault();
//   if (draggedWord) {
//     sentence.appendChild(draggedWord);
//     draggedWord.classList.remove('dragging');
//     draggedWord = null;
//   }
//   sentence.classList.remove('over');
// }

const words = document.querySelectorAll('.word');
const sentence = document.getElementById('sentence');

words.forEach(word => {
  word.addEventListener('dragstart', dragStart);
  word.addEventListener('dragend', dragEnd);
});

sentence.addEventListener('dragover', dragOver);
sentence.addEventListener('dragenter', dragEnter);
sentence.addEventListener('dragleave', dragLeave);
sentence.addEventListener('drop', drop);

function dragStart(e) {
  e.dataTransfer.setData('text/plain', this.textContent);
}

function dragEnd() {
  // No need to do anything in this case
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function drop(e) {
  e.preventDefault();
  const draggedWord = e.dataTransfer.getData('text/plain');
  const start = sentence.selectionStart;
  const end = sentence.selectionEnd;
  const text = sentence.value;
  const before = text.substring(0, start);
  const after = text.substring(end, text.length);
  const wordWithSpace = draggedWord === 'Enter' ? '\n' : draggedWord + ' ';
  sentence.value = before + wordWithSpace + after;
  sentence.focus();
  sentence.setSelectionRange(start + wordWithSpace.length, start + wordWithSpace.length);
  sentence.classList.remove('over');
}
