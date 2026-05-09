const params = new URLSearchParams(window.location.search);
let currentGrade = params.get('grade') || 'MYP 3';
const gradeTitle = document.getElementById('gradeTitle');
const gradeSubtitle = document.getElementById('gradeSubtitle');
const gradeNav = document.getElementById('gradeNav');
const unitTitle = document.getElementById('unitTitle');
const topicTitle = document.getElementById('topicTitle');
const unitList = document.getElementById('unitList');
const topicList = document.getElementById('topicList');
const practiceSection = document.getElementById('practiceSection');
const problemTopic = document.getElementById('problemTopic');
const problemType = document.getElementById('problemType');
const problemDifficulty = document.getElementById('problemDifficulty');
const practiceQuestion = document.getElementById('practiceQuestion');
const answerArea = document.getElementById('answerArea');
const submitAnswer = document.getElementById('submitAnswer');
const nextProblem = document.getElementById('nextProblem');
const practiceFeedback = document.getElementById('practiceFeedback');
const difficultySelect = document.getElementById('difficultySelect');

let currentDifficulty = 'Medium';

const gradeData = {
  'MYP 1': {
    units: {
      'Numbers and systems': ['Write in words', 'Write in figures', 'Test of divisibility', 'LCM', 'GCF', 'Braille and indices'],
      'Percentages': ['Making a percentage', 'Convert to value', 'Increase and decrease', 'Original value from increased value'],
      'Algebra': ['Patterns and linear formula', 'Algebraic expression', 'Solve simple algebraic equations']
    },
    difficulty: 'Easy'
  },
  'MYP 2': {
    units: {
      'Numbers': ['Percentages', 'Equivalent percentages, fractions and decimals', 'Percent change', 'Profit and loss', 'Simple interest'],
      'Ratios and Proportion': ['Simplifying ratios', 'Unit ratio', 'Compare ratios', 'Ratio of fractions', 'Rates'],
      'Algebra': ['Simplifying expressions', 'Solve equations', 'Arithmetic sequences', 'Change subject of formula']
    },
    difficulty: 'Medium'
  },
  'MYP 3': {
    units: {
      'Number sense': ['Fractions', 'Decimals', 'Percentages', 'Ratio', 'Negative numbers'],
      'Algebra': ['Expressions', 'Linear equations', 'Quadratic equations', 'Sequences', 'Simplifying expressions'],
      'Geometry': ['Angles', 'Triangles', 'Area and volume', 'Polygons', 'Coordinate geometry', 'Pythagorean theorem'],
      'Data & probability': ['Data presentation', 'Probability', 'Venn diagrams']
    },
    difficulty: 'Medium+'
  },
  'MYP 4': {
    units: {
      'Advanced algebra': ['Exponents & surds', 'Equations with factors', 'Quadratic modeling', 'Sequences & series'],
      'Functions': ['Relations & functions', 'Exponential functions', 'Logarithmic functions'],
      'Geometry': ['Right triangle trigonometry', 'Sine & cosine rules', 'Trigonometric functions'],
      'Statistics': ['Univariate data', 'Probability', 'Data analysis']
    },
    difficulty: 'Hard'
  },
  'MYP 5': {
    units: {
      'Number & algebra': ['Exponents & surds', 'Coordinate geometry', 'Linear equations', 'Systems of equations', 'Quadratics', 'Sequences & series'],
      'Functions': ['Relations & functions', 'Exponential & logarithmic functions'],
      'Geometry & trigonometry': ['Vectors', 'Congruence & similarity', 'Transformations', 'Deductive geometry'],
      'Statistics': ['Probability', 'Univariate analysis']
    },
    difficulty: 'Harder'
  }
};

const topicGenerators = {
  'MYP 1': {
    'Write in words': simpleTextGenerator('Write the number 12 in words.', 'twelve'),
    'Write in figures': simpleTextGenerator('Write "sixteen" in figures.', '16'),
    'Test of divisibility': simpleChoiceGenerator('Is 24 divisible by 3?', ['Yes', 'No'], 'Yes'),
    LCM: simpleTextGenerator('What is the LCM of 4 and 6?', '12'),
    GCF: simpleTextGenerator('Find the GCF of 12 and 18.', '6'),
    'Braille and indices': simpleTextGenerator('What is 2^3?', '8'),
    'Making a percentage': simpleTextGenerator('What is 50% of 20?', '10'),
    'Convert to value': simpleTextGenerator('Write 25% as a decimal.', '0.25'),
    'Increase and decrease': simpleTextGenerator('If 100 increases by 20%, what is the new value?', '120'),
    'Original value from increased value': simpleTextGenerator('If a value becomes 120 after a 20% increase, what was the original?', '100'),
    'Patterns and linear formula': simpleTextGenerator('If y = 2x + 3, what is y when x = 4?', '11'),
    'Algebraic expression': simpleTextGenerator('Simplify 3x + 2x.', '5x'),
    'Solve simple algebraic equations': simpleTextGenerator('Solve 2x = 10.', '5')
  },
  'MYP 2': {
    Percentages: simpleTextGenerator('What is 15% of 200?', '30'),
    'Equivalent percentages, fractions and decimals': simpleChoiceGenerator('Which is equivalent to 1/2?', ['0.4', '0.5', '0.6'], '0.5'),
    'Percent change': simpleTextGenerator('A price increases from 50 to 60; percent change?', '20%'),
    'Profit and loss': simpleTextGenerator('Buy 40, sell 50. Profit percent?', '25%'),
    'Simple interest': simpleTextGenerator('Simple interest on 100 at 5% for 2 years?', '10'),
    'Simplifying expressions': simpleTextGenerator('Simplify 4x + 7x.', '11x'),
    'Solve equations': simpleTextGenerator('Solve x + 7 = 13.', '6'),
    'Arithmetic sequences': simpleTextGenerator('Next term after 2, 5, 8 is?', '11'),
    'Change subject of formula': simpleTextGenerator('If p = 2q + 5, what is q?', '(p-5)/2')
  },
  'MYP 3': {
    Fractions: function() {
      const a = rand(1, 8); const b = rand(1, 8); const c = rand(1, 8); const d = rand(1, 8);
      return { question: `Simplify ${a}/${b} + ${c}/${d}.`, answer: `${a * d + b * c}/${b * d}`, type: 'text', difficulty: 'Medium' };
    },
    Decimals: function() {
      const value = (rand(10, 90) / 10).toFixed(1);
      return { question: `Write ${value} as a percentage.`, answer: `${Math.round(value * 10)}%`, type: 'text', difficulty: 'Medium' };
    },
    Percentages: function() {
      const base = rand(20, 80); const percent = rand(10, 40);
      return { question: `What is ${percent}% of ${base}?`, answer: `${(base * percent / 100).toFixed(1)}`, type: 'text', difficulty: 'Medium' };
    },
    Ratio: function() {
      const a = rand(1, 8); const b = rand(1, 8); const scale = rand(2, 5);
      return { question: `In the ratio ${a}:${b}, if the first part is ${a * scale}, what is the second part?`, answer: `${b * scale}`, type: 'text', difficulty: 'Medium' };
    },
    'Negative numbers': function() {
      const x = rand(1, 15);
      return { question: `Compute ${x} - ${x + 7}.`, answer: '-7', type: 'text', difficulty: 'Medium' };
    },
    Expressions: function() {
      const a = rand(1, 9);
      return { question: `Simplify ${a}x + ${a}x.`, answer: `${2 * a}x`, type: 'text', difficulty: 'Medium' };
    },
    'Linear equations': function() {
      const a = rand(2, 8); const b = rand(1, 10); const sol = rand(2, 6);
      return { question: `Solve ${a}x + ${b} = ${a * sol + b}.`, answer: `${sol}`, type: 'text', difficulty: 'Medium' };
    },
    'Quadratic equations': function() {
      const a = rand(1, 5); const b = rand(1, 6);
      return { question: `Expand: (x + ${a})(x + ${b}).`, answer: `x^2 + ${a + b}x + ${a * b}`, type: 'text', difficulty: 'Medium+' };
    },
    Sequences: function() {
      const start = rand(1, 5); const step = rand(1, 5);
      return { question: `What is the next number in ${start}, ${start + step}, ${start + step*2}, ?`, answer: `${start + step*3}`, type: 'text', difficulty: 'Medium' };
    },
    'Simplifying expressions': function() {
      const a = rand(1, 6);
      return { question: `Simplify ${a}x + ${a}x - ${a}x.`, answer: `${a}x`, type: 'text', difficulty: 'Medium' };
    },
    Angles: function() {
      const a = rand(10, 70);
      return { question: `One angle is ${a}°. Its supplementary angle is?`, answer: `${180 - a}°`, type: 'text', difficulty: 'Medium' };
    },
    Triangles: function() {
      const b = rand(3, 9); const h = rand(2, 7);
      return { question: `Find the area of a triangle with base ${b} cm and height ${h} cm.`, answer: `${(b * h / 2).toFixed(1)} cm^2`, type: 'text', difficulty: 'Medium+' };
    },
    'Area and volume': function() {
      const l = rand(2, 9); const w = rand(2, 8);
      return { question: `What is the area of a ${l} by ${w} rectangle?`, answer: `${l * w}`, type: 'text', difficulty: 'Medium' };
    },
    Polygons: function() {
      const n = rand(4, 8);
      return { question: `How many diagonals does a ${n}-sided polygon have?`, answer: `${n * (n - 3) / 2}`, type: 'text', difficulty: 'Medium+' };
    },
    'Coordinate geometry': function() {
      const x1 = rand(0, 4); const y1 = rand(0, 4); const x2 = x1 + rand(1, 4); const y2 = y1 + rand(1, 4);
      return { question: `What is the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2})?`, answer: `${(y2 - y1)}/${(x2 - x1)}`, type: 'text', difficulty: 'Medium+' };
    },
    'Pythagorean theorem': function(difficulty = 'Medium') {
      const a = rand(3, difficulty === 'Hard' ? 9 : 6);
      const b = rand(2, difficulty === 'Hard' ? 9 : 6);
      return { question: `Find the hypotenuse of a right triangle with legs ${a} and ${b}.`, answer: `${Math.sqrt(a*a + b*b).toFixed(1)}`, type: 'text', difficulty };
    },
    'Data presentation': function(difficulty = 'Medium') {
      const values = difficulty === 'Hard' ? [3, 7, 11, 15, 19] : [2, 4, 6, 8, 10];
      return { question: `What is the mean of ${values.join(', ')}?`, answer: `${(values.reduce((sum, n) => sum + n, 0) / values.length)}`, type: 'text', difficulty };
    },
    Probability: function() {
      const total = 10; const success = rand(1, 5);
      return { question: `A bag has ${success} red balls out of ${total}. What is the probability of choosing a red ball?`, answer: `${success}/${total}`, type: 'text', difficulty: 'Medium' };
    },
    'Venn diagrams': function() {
      const both = rand(1, 5); const onlyA = rand(1, 5); const onlyB = rand(1, 5);
      return { question: `In a Venn diagram, ${onlyA} are only in A, ${onlyB} are only in B and ${both} are in both. How many students are in total?`, answer: `${onlyA + onlyB + both}`, type: 'text', difficulty: 'Medium' };
    }
  },
  'MYP 4': {
    'Exponents & surds': simpleTextGenerator('Simplify 2^3.', '8'),
    'Equations with factors': simpleTextGenerator('Solve x^2 - 5x + 6 = 0.', '2 or 3'),
    'Quadratic modeling': simpleTextGenerator('Find roots of x^2 - 4x + 3 = 0.', '1 or 3'),
    'Sequences & series': simpleTextGenerator('Next term after 5, 11, 17 is?', '23'),
    'Relations & functions': simpleTextGenerator('If f(x) = x + 2, what is f(3)?', '5'),
    'Exponential functions': simpleTextGenerator('What is 2^4?', '16'),
    'Logarithmic functions': simpleTextGenerator('What is log10(100)?', '2'),
    'Right triangle trigonometry': simpleTextGenerator('sin(30°) = ?', '1/2'),
    'Sine & cosine rules': simpleTextGenerator('sin rule: opposite 5, hypotenuse 10. sin = ?', '0.5'),
    'Trigonometric functions': simpleTextGenerator('cos(60°) = ?', '1/2'),
    Probability: simpleTextGenerator('Probability of heads on one toss?', '1/2'),
    'Univariate data': simpleTextGenerator('Mean of 1, 3, 5 is?', '3'),
    'Data analysis': function(difficulty = 'Medium') {
      return { question: `A set has values 2, 4, 6, 8. What is the range?`, answer: '6', type: 'text', difficulty };
    }
  },
  'MYP 5': {
    'Exponents & surds': simpleTextGenerator('Simplify √16.', '4'),
    'Coordinate geometry': simpleTextGenerator('Slope of line joining (0,0) and (2,2)?', '1'),
    'Linear equations': simpleTextGenerator('Solve 2x - 3 = 7.', '5'),
    'Systems of equations': simpleTextGenerator('Solve x + y = 5 and x - y = 1. x = ?', '3'),
    Quadratics: simpleTextGenerator('Find vertex of y = x^2 - 4x + 3.', '2, -1'),
    'Sequences & series': simpleTextGenerator('Sum of 1, 2, 3, 4 = ?', '10'),
    'Relations & functions': simpleTextGenerator('If f(x) = 2x, find f(4).', '8'),
    'Exponential & logarithmic functions': simpleTextGenerator('log2(8) = ?', '3'),
    Vectors: simpleTextGenerator('Vector (2,3) + (1,4) = ?', '(3,7)'),
    'Congruence & similarity': function(difficulty = 'Medium') {
      return { question: `If two triangles have equal corresponding sides, are they congruent?`, answer: 'Yes', type: 'choices', choices: ['Yes', 'No'], difficulty };
    },
    Transformations: function(difficulty = 'Medium') {
      return { question: `A shape is moved 3 units right and 2 units up. What is this called?`, answer: 'translation', type: 'text', difficulty };
    },
    'Deductive geometry': function(difficulty = 'Medium') {
      return { question: `In deductive geometry, a statement derived from definitions and postulates is called a?`, answer: 'theorem', type: 'text', difficulty };
    },
    Probability: simpleTextGenerator('Chance of a 6 on a fair dice?', '1/6'),
    'Univariate analysis': simpleTextGenerator('Median of 1, 2, 9?', '2')
  }
};

let currentUnit = null;
let currentTopic = null;
let currentProblem = null;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function simpleTextGenerator(question, answer) {
  return function(difficulty = 'Medium') {
    return { question, answer, type: 'text', difficulty };
  };
}

function simpleChoiceGenerator(question, choices, answer) {
  return function(difficulty = 'Medium') {
    return { question, answer, choices, type: 'choices', difficulty };
  };
}

function createGradeButton(grade) {
  const button = document.createElement('button');
  button.className = 'grade-button';
  button.textContent = grade;
  button.dataset.grade = grade;
  button.addEventListener('click', () => selectGrade(grade));
  if (grade === currentGrade) {
    button.classList.add('active');
  }
  gradeNav.appendChild(button);
}

function selectGrade(grade) {
  currentGrade = grade;
  currentDifficulty = normalizeDifficulty(gradeData[grade]?.difficulty || 'Medium');
  if (difficultySelect) difficultySelect.value = currentDifficulty;
  document.querySelectorAll('.grade-button').forEach(btn => btn.classList.toggle('active', btn.dataset.grade === grade));
  const gradeInfo = gradeData[grade] || gradeData['MYP 3'];
  gradeTitle.textContent = `${grade} Topics`;
  gradeSubtitle.textContent = `Practice the units and topics for ${grade} with tailored problem styles.`;
  gradeSubtitle.dataset.difficulty = gradeInfo.difficulty;
  populateUnits(gradeInfo.units);
  currentUnit = Object.keys(gradeInfo.units)[0];
  setActiveUnit(currentUnit);
  selectTopic(gradeInfo.units[currentUnit][0]);
}

function populateUnits(units) {
  unitList.innerHTML = Object.keys(units).map(unit => `<button class="unit-button" data-unit="${unit}">${unit}</button>`).join('');
  unitList.querySelectorAll('.unit-button').forEach(button => {
    button.addEventListener('click', () => setActiveUnit(button.dataset.unit));
  });
}

function setActiveUnit(unit) {
  currentUnit = unit;
  unitTitle.textContent = unit;
  unitList.querySelectorAll('.unit-button').forEach(button => button.classList.toggle('active', button.dataset.unit === unit));
  const gradeInfo = gradeData[currentGrade] || gradeData['MYP 3'];
  showTopics(gradeInfo.units[unit]);
}

function showTopics(topicNames) {
  topicTitle.textContent = currentUnit;
  topicList.innerHTML = topicNames.map(topic => `<button class="topic-button" data-topic="${topic}">${topic}</button>`).join('');
  topicList.querySelectorAll('.topic-button').forEach(button => {
    button.addEventListener('click', () => selectTopic(button.dataset.topic));
  });
}

function selectTopic(topic) {
  currentTopic = topic;
  problemTopic.textContent = topic;
  topicTitle.textContent = topic;
  topicList.querySelectorAll('.topic-button').forEach(button => button.classList.toggle('active', button.dataset.topic === topic));
  practiceFeedback.textContent = '';
  nextProblem.classList.add('hidden');
  submitAnswer.classList.remove('hidden');
  practiceSection.classList.remove('hidden');
  loadProblem();
}

function loadProblem() {
  const grade = currentGrade;
  const generator = topicGenerators[grade] && topicGenerators[grade][currentTopic];
  if (!generator) {
    practiceQuestion.textContent = 'This topic is ready soon. Pick a different topic or check back later.';
    answerArea.innerHTML = '';
    return;
  }
  currentProblem = generator(currentDifficulty);
  practiceQuestion.textContent = currentProblem.question;
  problemType.textContent = currentProblem.type === 'choices' ? 'Multiple choice' : 'Short answer';
  problemDifficulty.textContent = currentProblem.difficulty || currentDifficulty;
  renderAnswerArea(currentProblem);
}

function renderAnswerArea(problem) {
  if (problem.type === 'choices') {
    answerArea.innerHTML = problem.choices.map(choice => `
      <label class="choice-item">
        <input type="radio" name="answerChoice" value="${choice}">
        <span>${choice}</span>
      </label>
    `).join('');
  } else {
    answerArea.innerHTML = `<input id="topicAnswer" type="text" placeholder="Type your answer" autocomplete="off">`;
  }
}

function checkAnswer() {
  let userAnswer = '';
  if (currentProblem.type === 'choices') {
    const selected = document.querySelector('input[name="answerChoice"]:checked');
    if (!selected) {
      practiceFeedback.textContent = 'Please choose an answer.';
      return;
    }
    userAnswer = selected.value.trim();
  } else {
    const input = document.getElementById('topicAnswer');
    if (!input || !input.value.trim()) {
      practiceFeedback.textContent = 'Please enter your answer.';
      return;
    }
    userAnswer = input.value.trim().replace(/\s+/g, '');
  }

  const correct = currentProblem.answer.toString().trim().replace(/\s+/g, '');
  if (userAnswer === correct) {
    practiceFeedback.textContent = 'Great job! ✅';
    submitAnswer.classList.add('hidden');
    nextProblem.classList.remove('hidden');
  } else {
    practiceFeedback.textContent = `Not quite. Try again or press Next to see another problem.`;
  }
}

function setDifficulty(level) {
  currentDifficulty = level;
  if (difficultySelect) difficultySelect.value = level;
  if (currentTopic) loadProblem();
}

function normalizeDifficulty(value) {
  if (typeof value !== 'string') return 'Medium';
  if (value.toLowerCase().includes('easy')) return 'Easy';
  if (value.toLowerCase().includes('hard')) return 'Hard';
  return 'Medium';
}

function nextProblemAction() {
  practiceFeedback.textContent = '';
  submitAnswer.classList.remove('hidden');
  nextProblem.classList.add('hidden');
  loadProblem();
}

function initGradePage() {
  Object.keys(gradeData).forEach(createGradeButton);
  selectGrade(currentGrade);
  if (difficultySelect) {
    difficultySelect.addEventListener('change', () => setDifficulty(difficultySelect.value));
  }
  submitAnswer.addEventListener('click', checkAnswer);
  nextProblem.addEventListener('click', nextProblemAction);
}

initGradePage();
