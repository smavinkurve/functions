// QUESTIONS -********************************************************************
// Array to store questions
let questions = [];

// Function to fetch JSON data from URL
async function fetchQuestions() {
  try {
    const response = await fetch('questions.json'); // Replace 'questions.json' with your JSON file path or URL
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

// Function to display a random question
function displayRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex].question;
  document.getElementById('question').textContent = randomQuestion;
}

// Function to shuffle questions array
function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
  displayRandomQuestion();
}

// Fetch questions when the page loads
fetchQuestions();

// WORDS FETCHING -********************************************************************
// Fetch JSON data
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

// Function to display words in the HTML
function displayWords(data) {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';

  // Add fixed words
  data.fixedWords.forEach(word => {
    const wordElement = createWordElement(word);
    wordContainer.appendChild(wordElement);
  });
}

// Function to create a word element
function createWordElement(word) {
  const wordElement = document.createElement('div');
  wordElement.textContent = word;
  wordElement.classList.add('word');
  wordElement.draggable = true;
  // Add event listener for drag start to dynamically added word elements
  wordElement.addEventListener('dragstart', dragStart);
  return wordElement;
}

// Drag and drop functionality
// JavaScript with modifications for mobile devices
function dragStart(e) {
  // For touch devices, use touch events
  if (e.type === 'touchstart') {
    e.preventDefault();
    const touch = e.touches[0];
    const offsetX = touch.clientX - e.target.getBoundingClientRect().left;
    const offsetY = touch.clientY - e.target.getBoundingClientRect().top;
    e.dataTransfer.setData('text/plain', offsetX + ',' + offsetY);
  } else {
    // For non-touch devices, use mouse events
    e.dataTransfer.setData('text/plain', this.textContent);
    e.dataTransfer.setData('text/html', this.outerHTML); // Store the outerHTML for styling
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

  // For touch devices, calculate the drop position based on touch coordinates
  if (e.type === 'touchend') {
    const touch = e.changedTouches[0];
    const offsetX = parseFloat(draggedWordText.split(',')[0]);
    const offsetY = parseFloat(draggedWordText.split(',')[1]);
    const x = touch.clientX - offsetX;
    const y = touch.clientY - offsetY;

    // Find the drop target using the touch coordinates
    const target = document.elementFromPoint(x, y);

    // If the target is a valid drop zone, append the dragged word
    if (target.classList.contains('dropzone')) {
      const wordElement = document.createElement('div');
      wordElement.innerHTML = draggedWordHTML;
      wordElement.classList.add('word', 'word-dropped');
      target.appendChild(wordElement);
    }
  } else {
    // For non-touch devices, maintain existing drop functionality
    // Create a new word element with the stored HTML content
    const wordElement = document.createElement('div');
    wordElement.innerHTML = draggedWordHTML;
    wordElement.classList.add('word', 'word-dropped'); // Add necessary classes for styling

    // Check if the dropped word is placed at the beginning of the line (after pressing Enter)
    if (e.target.tagName === 'DIV' || e.target.tagName === 'P') {
      // Append the new word element to the sentence element
      e.target.parentNode.insertBefore(wordElement, e.target.nextSibling);
    } else {
      // Create a new line and append the word to it
      const newLine = document.createElement('p');
      newLine.appendChild(wordElement);
      this.appendChild(newLine);
    }

    // Clear placeholder text if present
    if (this.textContent.trim() === this.getAttribute('placeholder')) {
      this.textContent = '';
    }
  }
}

// Add event listeners for drag and drop functionality after words are loaded
document.addEventListener('DOMContentLoaded', () => {
  const words = document.querySelectorAll('.word');
  words.forEach(word => {
    word.addEventListener('dragstart', dragStart);
  });
});

// Add placeholder text behavior for the contenteditable div
const sentenceDiv = document.getElementById('sentence');

sentenceDiv.addEventListener('focus', function() {
  // Remove placeholder text when the div is focused
  if (this.textContent.trim() === this.getAttribute('placeholder')) {
    this.textContent = '';
  }
});

sentenceDiv.addEventListener('blur', function() {
  // Add placeholder text back if the div loses focus and it's empty
  if (this.textContent.trim() === '') {
    this.textContent = this.getAttribute('placeholder');
  }
});

// Function to clear a sentence container
function clearSentence(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // Clear the container's content
  container.textContent = container.getAttribute('placeholder'); // Restore placeholder text
}

// Function to print the screen as PDF
function printScreen() {
  window.print(); // Open print dialog
}

// Fetch words when the page loads
fetchWords();

