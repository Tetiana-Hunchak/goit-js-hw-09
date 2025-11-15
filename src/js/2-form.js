
const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;

loadFormData();

form.addEventListener('input', onFormInput);

form.addEventListener('submit', onFormSubmit);


function onFormInput(event) {
  const { name, value } = event.target;

  if (!(name in formData)) return;

  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsedData = JSON.parse(saved);

    formData.email = parsedData.email ?? '';
    formData.message = parsedData.message ?? '';

    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  } catch (error) {
    console.error('Error parsing storage data:', error);
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';
}
