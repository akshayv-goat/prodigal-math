const topics = {
  Algebra: {
    'Quadratic Equations': {
      generator: function() {
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        const question = `(x + ${a})(x + ${b})`;
        const answer = `x^2 + ${a + b}x + ${a * b}`;
        return { question, answer };
      }
    }
  }
};

let selectedCategory = 'Algebra';
let selectedSubtopic = 'Quadratic Equations';
let currentProblem;
let score = 0;

function getRandomProblem() {
  return topics[selectedCategory][selectedSubtopic].generator();
}

function displayProblem() {
  currentProblem = getRandomProblem();
  document.querySelector('.question').textContent = currentProblem.question;
  document.getElementById('answer').value = '';
  document.getElementById('result').textContent = '';
}

function checkAnswer() {
  const userAnswer = document.getElementById('answer').value.trim().replace(/\s/g, '');
  const correctAnswer = currentProblem.answer.replace(/\s/g, '');
  if (userAnswer === correctAnswer) {
    document.getElementById('result').textContent = 'Correct!';
    score++;
    document.getElementById('score').textContent = score;
  } else {
    document.getElementById('result').textContent = 'Incorrect. Try again!';
  }
  setTimeout(displayProblem, 2000);
}

// Handle topic selection changes
document.getElementById('category').addEventListener('change', function() {
  selectedCategory = this.value;
  // For now, assume subtopic stays the same; in future, update subtopic options
  displayProblem();
});

document.getElementById('subtopic').addEventListener('change', function() {
  selectedSubtopic = this.value;
  displayProblem();
});

window.onload = function() {
  displayProblem();
};