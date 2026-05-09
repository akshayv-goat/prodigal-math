const gradeUnits = {
  'MYP 3': {
    'Number sense': ['Fractions', 'Decimals', 'Percentages', 'Ratio', 'Negative numbers'],
    'Algebra': ['Expressions', 'Linear equations', 'Quadratic equations', 'Sequences', 'Simplifying expressions'],
    'Geometry': ['Angles', 'Triangles', 'Area and volume', 'Polygons', 'Coordinate geometry', 'Pythagorean theorem'],
    'Data & probability': ['Data presentation', 'Probability', 'Venn diagrams']
  }
};

const topics = {
  'MYP 3': {
    Fractions: {
      generator: function() {
        const a = Math.floor(Math.random() * 8) + 1;
        const b = Math.floor(Math.random() * 8) + 1;
        const c = Math.floor(Math.random() * 8) + 1;
        const d = Math.floor(Math.random() * 8) + 1;
        const question = `Simplify ${a}/${b} + ${c}/${d}`;
        const answer = `${a * d + b * c}/${b * d}`;
        return { question, answer };
      }
    },
    Decimals: {
      generator: function() {
        const value = (Math.random() * 9 + 1).toFixed(1);
        const question = `Write ${value} as a percentage.`;
        const answer = `${Math.round(value * 10)}%`;
        return { question, answer };
      }
    },
    Percentages: {
      generator: function() {
        const base = Math.floor(Math.random() * 50) + 20;
        const percent = Math.floor(Math.random() * 35) + 10;
        const question = `What is ${percent}% of ${base}?`;
        const answer = `${(base * percent / 100).toFixed(1)}`;
        return { question, answer };
      }
    },
    Ratio: {
      generator: function() {
        const a = Math.floor(Math.random() * 8) + 1;
        const b = Math.floor(Math.random() * 8) + 1;
        const scale = Math.floor(Math.random() * 5) + 2;
        const question = `In the ratio ${a}:${b}, if the first part is ${a * scale}, what is the second part?`;
        const answer = `${b * scale}`;
        return { question, answer };
      }
    },
    'Negative numbers': {
      generator: function() {
        const x = Math.floor(Math.random() * 15) + 1;
        const question = `Compute ${x} - ${x + 7}.`;
        const answer = `-7`;
        return { question, answer };
      }
    },
    Expressions: {
      generator: function() {
        const a = Math.floor(Math.random() * 9) + 1;
        const question = `Simplify ${a}x + ${a}x.`;
        const answer = `${2 * a}x`;
        return { question, answer };
      }
    },
    'Linear equations': {
      generator: function() {
        const a = Math.floor(Math.random() * 8) + 2;
        const b = Math.floor(Math.random() * 10) + 1;
        const question = `Solve ${a}x + ${b} = ${b + a * 3}.`;
        const answer = `3`;
        return { question, answer };
      }
    },
    'Quadratic equations': {
      generator: function() {
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 6) + 1;
        const question = `Expand: (x + ${a})(x + ${b}).`;
        const answer = `x^2 + ${a + b}x + ${a * b}`;
        return { question, answer };
      }
    },
    Sequences: {
      generator: function() {
        const start = Math.floor(Math.random() * 5) + 1;
        const step = Math.floor(Math.random() * 5) + 1;
        const question = `What is the next number in ${start}, ${start + step}, ${start + step*2}, ?`;
        const answer = `${start + step*3}`;
        return { question, answer };
      }
    },
    'Simplifying expressions': {
      generator: function() {
        const a = Math.floor(Math.random() * 6) + 1;
        const question = `Simplify ${a}x + ${a}x - ${a}x.`;
        const answer = `${a}x`;
        return { question, answer };
      }
    },
    Angles: {
      generator: function() {
        const a = Math.floor(Math.random() * 50) + 10;
        const question = `One angle is ${a}°. Its supplementary angle is?`;
        const answer = `${180 - a}°`;
        return { question, answer };
      }
    },
    Triangles: {
      generator: function() {
        const b = Math.floor(Math.random() * 7) + 3;
        const h = Math.floor(Math.random() * 6) + 2;
        const question = `Find the area of a triangle with base ${b} cm and height ${h} cm.`;
        const answer = `${(b * h / 2).toFixed(1)} cm^2`;
        return { question, answer };
      }
    },
    'Area and volume': {
      generator: function() {
        const l = Math.floor(Math.random() * 8) + 2;
        const w = Math.floor(Math.random() * 7) + 2;
        const question = `What is the area of a ${l} by ${w} rectangle?`;
        const answer = `${l * w}`;
        return { question, answer };
      }
    },
    Polygons: {
      generator: function() {
        const n = Math.floor(Math.random() * 5) + 3;
        const question = `How many diagonals does a ${n}-sided polygon have?`;
        const answer = `${n * (n - 3) / 2}`;
        return { question, answer };
      }
    },
    'Coordinate geometry': {
      generator: function() {
        const x1 = Math.floor(Math.random() * 5);
        const y1 = Math.floor(Math.random() * 5);
        const x2 = x1 + Math.floor(Math.random() * 4) + 1;
        const y2 = y1 + Math.floor(Math.random() * 4) + 1;
        const question = `What is the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2})?`;
        const answer = `${(y2 - y1)}/${(x2 - x1)}`;
        return { question, answer };
      }
    },
    'Pythagorean theorem': {
      generator: function() {
        const a = Math.floor(Math.random() * 6) + 3;
        const b = Math.floor(Math.random() * 6) + 2;
        const question = `Find the hypotenuse of a right triangle with legs ${a} and ${b}.`;
        const answer = `${Math.sqrt(a*a + b*b).toFixed(1)}`;
        return { question, answer };
      }
    },
    'Data presentation': {
      generator: function() {
        const values = [2, 4, 6, 8, 10];
        const question = `What is the mean of ${values.join(', ')}?`;
        const answer = `6`;
        return { question, answer };
      }
    },
    Probability: {
      generator: function() {
        const total = 10;
        const success = Math.floor(Math.random() * 5) + 1;
        const question = `A bag has ${success} red balls out of ${total}. What is the probability of choosing a red ball?`;
        const answer = `${success}/${total}`;
        return { question, answer };
      }
    },
    'Venn diagrams': {
      generator: function() {
        const both = Math.floor(Math.random() * 5) + 1;
        const onlyA = Math.floor(Math.random() * 5) + 1;
        const onlyB = Math.floor(Math.random() * 5) + 1;
        const question = `In a Venn diagram, ${onlyA} are only in A, ${onlyB} are only in B and ${both} are in both. How many students are in total?`;
        const answer = `${onlyA + onlyB + both}`;
        return { question, answer };
      }
    }
  }
};

let selectedCategory = 'MYP 3';
let selectedSubtopic = 'Fractions';
let currentProblem;
let score = 0;
let userName = localStorage.getItem('prodigalmathUsername') || localStorage.getItem('prodgicalmathLoggedInUser') || '';
let profileData = JSON.parse(localStorage.getItem('prodigalmathProfile') || '{}');
let personalizationComplete = !!profileData.completed;

function getRandomProblem() {
  return topics[selectedCategory][selectedSubtopic].generator();
}

function displayProblem() {
  if (!personalizationComplete) {
    return;
  }

  currentProblem = getRandomProblem();
  const aiHint = profileData.aiSummary ? `${profileData.aiSummary} ` : '';
  const hintText = userName ? `Hey ${userName}, ${aiHint}try this one:` : `${aiHint}Try this one:`;
  document.getElementById('problemHint').textContent = hintText;
  document.querySelector('.question').textContent = currentProblem.question;
  document.getElementById('answer').value = '';
  document.getElementById('result').textContent = '';
}

function checkAnswer() {
  const userAnswer = document.getElementById('answer').value.trim().replace(/\s/g, '');
  const correctAnswer = currentProblem.answer.replace(/\s/g, '');
  if (userAnswer === correctAnswer) {
    const successText = userName ? `Nice work, ${userName}!` : 'Correct!';
    document.getElementById('result').textContent = successText;
    score++;
    document.getElementById('score').textContent = score;
  } else {
    const failText = userName ? `Not quite, ${userName}. Try again!` : 'Incorrect. Try again!';
    document.getElementById('result').textContent = failText;
  }
  setTimeout(displayProblem, 2000);
}

function updateGreeting() {
  const greetingText = document.getElementById('greetingText');
  const profileNotice = document.getElementById('profileNotice');

  if (userName) {
    if (personalizationComplete) {
      greetingText.textContent = `Hi ${userName}, ready to practice?`;
      profileNotice.textContent = 'Great! Your preferences are saved and your practice is ready.';
    } else {
      greetingText.textContent = `Hi ${userName}, let’s personalize your practice.`;
      profileNotice.textContent = 'Answer these questions so the app can tailor problems to you.';
    }
  } else {
    greetingText.textContent = 'Tell us a little about yourself';
    profileNotice.textContent = 'Those details help us make your next session more personal.';
  }
}

function loadProfileForm() {
  const pronoun = profileData.pronoun || '';
  if (pronoun) {
    const option = document.querySelector(`input[name="pronoun"][value="${pronoun}"]`);
    if (option) option.checked = true;
    if (pronoun === 'other') {
      document.getElementById('pronounOther').classList.remove('hidden');
      document.getElementById('pronounOther').value = profileData.pronounOther || '';
    }
  }
  document.getElementById('gradeSelect').value = profileData.grade || '';
  document.getElementById('topicInput').value = profileData.topics || '';
  document.getElementById('heardFrom').value = profileData.heardFrom || '';
  if (profileData.heardFrom === 'Other') {
    document.getElementById('heardOther').classList.remove('hidden');
    document.getElementById('heardOther').value = profileData.heardOther || '';
  }
  document.getElementById('goalInput').value = profileData.goal || '';
  document.getElementById('practiceFrequency').value = profileData.frequency || '';
}

function saveProfile(event) {
  event.preventDefault();

  const pronounChoice = document.querySelector('input[name="pronoun"]:checked');
  const grade = document.getElementById('gradeSelect').value;
  const topics = document.getElementById('topicInput').value.trim();
  const topicFile = document.getElementById('topicPdf').files[0];
  const heardFrom = document.getElementById('heardFrom').value;
  const heardOther = document.getElementById('heardOther').value.trim();
  const goal = document.getElementById('goalInput').value.trim();
  const frequency = document.getElementById('practiceFrequency').value;

  if (!pronounChoice) {
    document.getElementById('profileNotice').textContent = 'Please choose your pronouns.';
    return;
  }
  if (!grade) {
    document.getElementById('profileNotice').textContent = 'Please select your MYP grade level.';
    return;
  }
  if (!topics && !topicFile) {
    document.getElementById('profileNotice').textContent = 'Tell us at least one topic you want to learn, or upload a PDF.';
    return;
  }
  if (!heardFrom) {
    document.getElementById('profileNotice').textContent = 'Please tell us where you heard about ProdigalMath.';
    return;
  }
  if (heardFrom === 'Other' && !heardOther) {
    document.getElementById('profileNotice').textContent = 'Please tell us where you heard about ProdigalMath.';
    return;
  }
  if (!goal) {
    document.getElementById('profileNotice').textContent = 'Please share your main goal for using the app.';
    return;
  }
  if (!frequency) {
    document.getElementById('profileNotice').textContent = 'Please choose how often you would like to practice.';
    return;
  }

  profileData = {
    completed: true,
    pronoun: pronounChoice.value,
    pronounOther: pronounChoice.value === 'other' ? document.getElementById('pronounOther').value.trim() : '',
    grade,
    topics,
    topicFile: topicFile ? topicFile.name : profileData.topicFile || '',
    heardFrom,
    heardOther: heardFrom === 'Other' ? heardOther : '',
    goal,
    frequency,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem('prodigalmathProfile', JSON.stringify(profileData));
  personalizationComplete = true;
  if (userName) {
    localStorage.setItem('prodigalmathUsername', userName);
  }
  updateGreeting();
  showPractice(true);
  displayProblem();
  document.getElementById('profileNotice').textContent = 'Thanks! Your preferences are saved.';
}

function toggleOtherPronoun() {
  const other = document.querySelector('input[name="pronoun"][value="other"]').checked;
  document.getElementById('pronounOther').classList.toggle('hidden', !other);
}

function toggleHeardOther() {
  const other = document.getElementById('heardFrom').value === 'Other';
  document.getElementById('heardOther').classList.toggle('hidden', !other);
}

function showPractice(show) {
  document.querySelector('.problem-card').classList.toggle('hidden', !show);
  document.querySelector('.score-panel').classList.toggle('hidden', !show);
  document.querySelector('.profile-card').classList.toggle('hidden', show);
}

const gradeButtons = document.querySelectorAll('.grade-button');
const unitPanel = document.getElementById('unitPanel');
const topicInfo = document.getElementById('topicInfo');

function populateUnits(grade) {
  const units = gradeUnits[grade] || {};
  unitPanel.innerHTML = Object.entries(units)
    .map(([unit, topics]) => `
      <section class="unit-group">
        <h3>${unit}</h3>
        <div class="topic-buttons">
          ${topics.map(topic => `<button class="topic-button" data-topic="${topic}">${topic}</button>`).join('')}
        </div>
      </section>
    `)
    .join('');

  document.querySelectorAll('.topic-button').forEach(button => {
    button.addEventListener('click', function() {
      setTopic(this.dataset.topic);
    });
  });

  const firstTopic = units[Object.keys(units)[0]][0];
  if (firstTopic) {
    setTopic(firstTopic);
  }
}

function setTopic(topic) {
  selectedSubtopic = topic;
  selectedCategory = 'MYP 3';
  document.querySelectorAll('.topic-button').forEach(button => {
    button.classList.toggle('active', button.dataset.topic === topic);
  });
  displayProblem();
}

function setActiveGrade(grade) {
  gradeButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.grade === grade);
  });
}

function selectGrade(grade) {
  setActiveGrade(grade);
  if (grade === 'MYP 3') {
    selectedCategory = grade;
    populateUnits(grade);
    topicInfo.classList.remove('hidden');
  } else {
    selectedCategory = 'MYP 3';
    unitPanel.innerHTML = '<p class="subtext">MYP 3 topic practice is ready — more grades coming soon.</p>';
    topicInfo.classList.remove('hidden');
  }
}

document.getElementById('heardFrom').addEventListener('change', toggleHeardOther);

document.querySelectorAll('input[name="pronoun"]').forEach(function(input) {
  input.addEventListener('change', toggleOtherPronoun);
});

document.getElementById('profileForm').addEventListener('submit', saveProfile);

gradeButtons.forEach(button => {
  button.addEventListener('click', function() {
    selectGrade(this.dataset.grade);
  });
});

window.onload = function() {
  selectGrade('MYP 3');
  loadProfileForm();
  updateGreeting();
  showPractice(personalizationComplete);
  if (personalizationComplete) {
    displayProblem();
  }
};
