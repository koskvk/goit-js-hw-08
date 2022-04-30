import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = "feedback-form-state";
const formData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

formAutofill();

function formAutofill() {
    const feedbackFromLocalStorage = localStorage.getItem(LOCALSTORAGE_KEY);

    if (feedbackFromLocalStorage) {
        const { email, message } = JSON.parse(feedbackFromLocalStorage);

        form.email.value = email;
        form.message.value = message;
    }
};

function onFormInput(event) {
    formData.email = event.currentTarget.email.value;
    formData.message = event.currentTarget.message.value;

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));

};

function onFormSubmit(event) {
    event.preventDefault();

    console.log('formData', formData);

    event.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
};
