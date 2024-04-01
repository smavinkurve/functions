const words = document.querySelectorAll('.word');
const sentence = document.getElementById('sentence');

let draggedWord = null;

words.forEach(word => {
  word.addEventListener('dragstart', dragStart);
  word.addEventListener('dragend', dragEnd);
});

sentence.addEventListener('dragover', dragOver);
sentence.addEventListener('dragenter', dragEnter);
sentence.addEventListener('dragleave', dragLeave);
sentence.addEventListener('drop', drop);

function dragStart() {
  draggedWord = this;
  this.classList.add('dragging');
}

function dragEnd() {
  draggedWord.classList.remove('dragging');
  draggedWord = null;
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
  if (draggedWord) {
    sentence.appendChild(draggedWord);
    draggedWord.classList.remove('dragging');
    draggedWord = null;
  }
  sentence.classList.remove('over');
}
