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
  },
  Geometry: {
    'Angle Pairs': {
      generator: function() {
        const a = Math.floor(Math.random() * 70) + 10;
        const question = `If one angle is ${a}° and the other is its complement, what is the other angle?`;
        const answer = `${90 - a}°`;
        return { question, answer };
      }
    }
  },
  Arithmetic: {
    Fractions: {
      generator: function() {
        const a = Math.floor(Math.random() * 8) + 1;
        const b = Math.floor(Math.random() * 8) + 1;
        const c = Math.floor(Math.random() * 8) + 1;
        const d = Math.floor(Math.random() * 8) + 1;
        const question = `Simplify ${a}/${b} + ${c}/${d}`;
        const numerator = a * d + b * c;
        const denominator = b * d;
        const answer = `${numerator}/${denominator}`;
        return { question, answer };
      }
    }
  },
  Statistics: {
    'Mean and Median': {
      generator: function() {
        const values = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 1);
        const mean = (values.reduce((sum, n) => sum + n, 0) / values.length).toFixed(1);
        const question = `Find the mean of ${values.join(', ')}.`;
        return { question, answer: `${mean}` };
      }
    }
  }
};

let selectedCategory = 'Algebra';
let selectedSubtopic = 'Quadratic Equations';
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

const categoryElement = document.getElementById('category');
const subtopicElement = document.getElementById('subtopic');

function populateSubtopics() {
  const subtopics = Object.keys(topics[selectedCategory]);
  subtopicElement.innerHTML = subtopics
    .map(topic => `<option value="${topic}">${topic}</option>`)
    .join('');
  selectedSubtopic = subtopics[0];
}

categoryElement.addEventListener('change', function() {
  selectedCategory = this.value;
  populateSubtopics();
  displayProblem();
});

document.getElementById('subtopic').addEventListener('change', function() {
  selectedSubtopic = this.value;
  displayProblem();
});

document.getElementById('heardFrom').addEventListener('change', toggleHeardOther);

document.querySelectorAll('input[name="pronoun"]').forEach(function(input) {
  input.addEventListener('change', toggleOtherPronoun);
});

document.getElementById('profileForm').addEventListener('submit', saveProfile);

window.onload = function() {
  populateSubtopics();
  loadProfileForm();
  updateGreeting();
  showPractice(personalizationComplete);
  if (personalizationComplete) {
    displayProblem();
  }
};
