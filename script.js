// QUESTIONS -********************************************************************
let questions = [];

async function fetchQuestions() {
  try {
    const response = await fetch('questions.json'); 
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
    questions = data;
    displayRandomQuestion();
  } catch (error) {
    console.error(error);
  }
}

function displayRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex].question;
  document.getElementById('question').textContent = randomQuestion;
}

function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
  displayRandomQuestion();
}

fetchQuestions();


// WORD FETCHING -********************************************************************
async function fetchWords() {
  try {
    const response = await fetch('words.json'); // Replace 'words.json' with your JSON file path or URL
    if (!response.ok) {
      throw new Error('Failed to fetch words');
    }
    const data = await response.json();
    displayWords(data);
  } catch (error) {
    console.error(error);
  }
}

function displayWords(data) {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';

  data.fixedWords.forEach(word => {
    const wordElement = createWordElement(word);
    wordContainer.appendChild(wordElement);
  });
}

function createWordElement(word) {
  const wordElement = document.createElement('div');
  wordElement.textContent = word;
  wordElement.classList.add('word');
  wordElement.draggable = true;


  wordElement.addEventListener('dragstart', dragStart);
  return wordElement;
}


// WORD DRAGGING -********************************************************************
function dragStart(e) {

// May need revisions later --- check later after finalizing desktop functionality.
  if (e.type === 'touchstart') {
    e.preventDefault();
    const touch = e.touches[0];
    const offsetX = touch.clientX - e.target.getBoundingClientRect().left;
    const offsetY = touch.clientY - e.target.getBoundingClientRect().top;
    e.dataTransfer.setData('text/plain', offsetX + ',' + offsetY);
  } else {
    e.dataTransfer.setData('text/plain', this.textContent);
    e.dataTransfer.setData('text/html', this.outerHTML); 
  }
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
  const draggedWordText = e.dataTransfer.getData('text/plain');
  const draggedWordHTML = e.dataTransfer.getData('text/html');

 
  if (e.type === 'touchend') {
    const touch = e.changedTouches[0];
    const offsetX = parseFloat(draggedWordText.split(',')[0]);
    const offsetY = parseFloat(draggedWordText.split(',')[1]);
    const x = touch.clientX - offsetX;
    const y = touch.clientY - offsetY;

    const target = document.elementFromPoint(x, y);

 
    if (target.classList.contains('dropzone')) {
      const wordElement = document.createElement('div');
      wordElement.innerHTML = draggedWordHTML;
      wordElement.classList.add('word', 'word-dropped');
      target.appendChild(wordElement);
    }
  } else {
    const wordElement = document.createElement('div');
    wordElement.innerHTML = draggedWordHTML;
    wordElement.classList.add('word', 'word-dropped'); 


    if (e.target.tagName === 'DIV' || e.target.tagName === 'P') {
      e.target.parentNode.insertBefore(wordElement, e.target.nextSibling);
    } else {
      const newLine = document.createElement('p');
      newLine.appendChild(wordElement);
      this.appendChild(newLine);
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const words = document.querySelectorAll('.word');
  words.forEach(word => {
    word.addEventListener('dragstart', dragStart);
  });
});

// Edit because you may not need default text anymore - test later OR add default text in the containers

// const sentenceDiv = document.getElementById('sentence');

// sentenceDiv.addEventListener('focus', function() {
//   if (this.textContent.trim() === this.getAttribute('placeholder')) {
//     this.textContent = '';
//   }
// });

// sentenceDiv.addEventListener('blur', function() {
//   if (this.textContent.trim() === '') {
//     this.textContent = this.getAttribute('placeholder');
//   }
// });


// RESET BUTTON -********************************************************************
function clearSentence(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; 
}

// PRINT PDF -********************************************************************
function printScreen() {
  window.print(); 
}

fetchWords();


