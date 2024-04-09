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
  return wordElement;
}

// Drag and drop functionality

const words = document.querySelectorAll('.word');
const sentence = document.getElementById('sentence');

words.forEach(word => {
  word.addEventListener('dragstart', dragStart);
});

sentence.addEventListener('dragover', dragOver);
sentence.addEventListener('dragenter', dragEnter);
sentence.addEventListener('dragleave', dragLeave);
sentence.addEventListener('drop', drop);

function dragStart(e) {
  e.dataTransfer.setData('text/plain', this.textContent);
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
  const wordElement = createWordElement(draggedWord);
  wordElement.classList.add('word-dropped'); // Apply styling for words dropped in the sentence area
  sentence.classList.remove('over'); // Remove the 'over' class to reset background color
  sentence.appendChild(wordElement);
}

// Fetch words when the page loads
fetchWords();

// Create a new word element with the dragged word's text
const wordElement = document.createElement('div');
wordElement.textContent = draggableElement.textContent;
wordElement.classList.add('word-dropped');

// Append the new word element to the sentence element
sentence.appendChild(wordElement);
