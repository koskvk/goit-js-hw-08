import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = "feedback-form-state";
const formData = {
    email: '',
    message: '',
    clear() {
        this.email = '';
        this.message = '';
    },
};

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
        formData.email = email;
        formData.message = message;
    }
};

function onFormInput(event) {
    formData[event.target.name] = event.target.value;

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));

};

function onFormSubmit(event) {
    event.preventDefault();

    const dataToConsole = new FormData(event.currentTarget);

    dataToConsole.forEach((value, name) => {
        formData[name] = value;
    });
    
    console.log('formData', formData);

    formData.clear();
    event.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
};
