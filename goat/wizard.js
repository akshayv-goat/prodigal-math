const userName = localStorage.getItem('prodigalmathUsername') || localStorage.getItem('prodgicalmathLoggedInUser') || '';
let profileData = JSON.parse(localStorage.getItem('prodigalmathProfile') || '{}');
let currentStep = 0;
const stepEls = Array.from(document.querySelectorAll('.step'));
const stepCounter = document.getElementById('stepCounter');
const nextButton = document.getElementById('nextButton');
const wizardNotice = document.getElementById('wizardNotice');
const welcomeScreen = document.getElementById('welcomeScreen');
const wizardScreen = document.getElementById('wizardScreen');

function analyzePreferences(profile) {
  const recommendations = [];
  let summary = 'Your AI analysis is ready.';

  if (profile.goal) {
    if (profile.goal.toLowerCase().includes('grades') || profile.goal.toLowerCase().includes('homework')) {
      recommendations.push('focused revision and exam-style practice');
    }
    if (profile.goal.toLowerCase().includes('confidence')) {
      recommendations.push('short, confidence-building problems');
    }
  }

  if (profile.topics) {
    recommendations.push(`more work on ${profile.topics}`);
  }

  if (profile.grade) {
    const gradeNumber = profile.grade.replace('MYP ', '');
    recommendations.push(`support for MYP ${gradeNumber}`);
  }

  if (profile.heardFrom && profile.heardFrom !== 'Other') {
    recommendations.push(`recommended based on ${profile.heardFrom.toLowerCase()}`);
  }

  if (profile.tuitionInterest === 'Yes') {
    recommendations.push('tuition guidance and extra support options');
  }

  if (recommendations.length) {
    summary = `AI recommends ${recommendations.join(', ')}.`;
  }

  return {
    summary,
    recommended: recommendations
  };
}

function updateGreeting() {
  const greeting = document.getElementById('greeting');
  if (userName) {
    greeting.textContent = `Hello ${userName} 👋`;
  }
}

function showStep(index) {
  stepEls.forEach((step, idx) => {
    step.classList.toggle('active', idx === index);
  });
  stepCounter.textContent = `${index + 1}`;
  nextButton.textContent = index === stepEls.length - 1 ? 'Finish' : 'Next';
  wizardNotice.textContent = 'Answer the question to continue.';
}

function startWizard() {
  welcomeScreen.classList.add('hidden');
  wizardScreen.classList.remove('hidden');
  showStep(0);
}

function validateStep(index) {
  const pronounChoice = document.querySelector('input[name="pronoun"]:checked');
  const grade = document.getElementById('gradeSelect').value;
  const topicText = document.getElementById('topicInput').value.trim();
  const topicFile = document.getElementById('topicPdf').files[0];
  const heardFrom = document.getElementById('heardFrom').value;
  const heardOther = document.getElementById('heardOther').value.trim();
  const goal = document.getElementById('goalInput').value.trim();
  const frequency = document.getElementById('practiceFrequency').value;

  if (index === 0) {
    if (!pronounChoice) {
      wizardNotice.textContent = 'Please choose your pronouns before continuing.';
      return false;
    }
    profileData.pronoun = pronounChoice.value;
    profileData.pronounOther = pronounChoice.value === 'other' ? document.getElementById('pronounOther').value.trim() : '';
    if (pronounChoice.value === 'other' && !profileData.pronounOther) {
      wizardNotice.textContent = 'Please enter your pronouns.';
      return false;
    }
    return true;
  }

  if (index === 1) {
    if (!grade) {
      wizardNotice.textContent = 'Please select your MYP grade level.';
      return false;
    }
    profileData.grade = grade;
    return true;
  }

  if (index === 2) {
    if (!topicText && !topicFile) {
      wizardNotice.textContent = 'Please share at least one topic or upload a PDF.';
      return false;
    }
    profileData.topics = topicText;
    profileData.topicFile = topicFile ? topicFile.name : profileData.topicFile || '';
    return true;
  }

  if (index === 3) {
    if (!heardFrom) {
      wizardNotice.textContent = 'Please tell us where you heard about ProdigalMath.';
      return false;
    }
    profileData.heardFrom = heardFrom;
    profileData.heardOther = heardFrom === 'Other' ? heardOther : '';
    if (heardFrom === 'Other' && !heardOther) {
      wizardNotice.textContent = 'Please tell us where you heard about ProdigalMath.';
      return false;
    }
    return true;
  }

  if (index === 4) {
    if (!goal) {
      wizardNotice.textContent = 'Please share your main goal for using the app.';
      return false;
    }
    profileData.goal = goal;
    return true;
  }

  if (index === 5) {
    const tuitionChoice = document.querySelector('input[name="tuitionInterest"]:checked');
    if (!tuitionChoice) {
      wizardNotice.textContent = 'Please tell us if you want tuition support.';
      return false;
    }
    profileData.tuitionInterest = tuitionChoice.value;
    return true;
  }

  if (index === 6) {
    if (!frequency) {
      wizardNotice.textContent = 'Please choose how often you want to practice.';
      return false;
    }
    profileData.frequency = frequency;
    return true;
  }

  return true;
}

function goToNextStep() {
  wizardNotice.textContent = '';
  if (!validateStep(currentStep)) {
    return;
  }
  if (currentStep === stepEls.length - 1) {
    completeWizard();
    return;
  }
  currentStep += 1;
  showStep(currentStep);
}

function completeWizard() {
  const aiResult = analyzePreferences(profileData);
  profileData.aiSummary = aiResult.summary;
  profileData.recommendedFocus = aiResult.recommended;
  profileData.completed = true;
  profileData.updatedAt = new Date().toISOString();
  localStorage.setItem('prodigalmathProfile', JSON.stringify(profileData));
  localStorage.setItem('prodigalmathUsername', userName);
  wizardNotice.textContent = `${aiResult.summary} Redirecting to your personalized practice...`;
  nextButton.disabled = true;
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}

function togglePronounOther() {
  const other = document.querySelector('input[name="pronoun"][value="other"]').checked;
  document.getElementById('pronounOther').classList.toggle('hidden', !other);
}

function toggleHeardOther() {
  document.getElementById('heardOther').classList.toggle('hidden', document.getElementById('heardFrom').value !== 'Other');
}

window.addEventListener('DOMContentLoaded', function() {
  if (!userName) {
    window.location.href = 'login.html';
    return;
  }

  updateGreeting();
  showStep(0);
  document.getElementById('startButton').addEventListener('click', startWizard);
  nextButton.addEventListener('click', goToNextStep);
  document.querySelectorAll('input[name="pronoun"]').forEach(el => el.addEventListener('change', togglePronounOther));
  document.getElementById('heardFrom').addEventListener('change', toggleHeardOther);
});
