import smoothscroll from 'smoothscroll-polyfill';
import Viewer from 'viewerjs';
import EmailJS from 'emailjs-com';
import FormValidator from './validator';
import Inputmask from 'inputmask';

import { LANG_LIST } from './lang';

import '../assets/styles/reset.scss';
import '../assets/styles/styles.scss';
import '../assets/styles/media-queries.scss';
import '../assets/styles/viewer.css';
import '../assets/styles/switch.css';

const galleryIds = {
    // img id : id gallery
    'makukha-podsolnukh': 'makukha-podsolnukh-gallery',
    'makukha-soya': 'makukha-soya-gallery',
    'shrot-podsolnukh': 'shrot-podsolnukh-gallery',
    'shrot-soya': 'shrot-soya-gallery',
    'obolonka-soya': 'obolonka-soya-gallery'
}

const imgIds = Object.keys(galleryIds);
const galleries = Object.values(galleryIds);

imgIds.forEach((key, index) => {
    const currentGallery = new Viewer(document.getElementById(galleries[index]), {
        zoomable: false,
        title: false,
        movable: false,
        toolbar : {
            flipHorizontal: false,
            flipVertical: false,
            play: false,
            reset: false,
            prev: true,
            next: true,
        }
    });
    document.getElementById(key).addEventListener('click', () => {
        currentGallery.show(false);
      })
});

const credentials = {
	userId: 'user_CNgzNIO8rgOJoQoWYPJTJ',
	emailTemplateId: 'template_x6nit8u',
	serviceId: 'service_dill3si'
};

const menuBtn = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-list');
const navLinkItems = document.querySelectorAll('.nav-list__link');
const logo = document.querySelector('.logo');
const scrollBtn = document.querySelector('.btn-header');
const form = document.querySelector('form');
const nameField = document.querySelector('#name');
const telField = document.querySelector('#tel');
const commentsField = document.querySelector('#comments');
const inputs = [nameField, telField];
const loaderModal  = document.querySelector('.loader-modal');
const successModal = document.querySelector('.success-modal');
const navBar = document.querySelector('.navbar');
const actionButtons = document.querySelector('.action-buttons');
const toggleLangBtn = document.getElementById('toggle-lang');
const textsToTranslate = document.querySelectorAll('.lang');

let isMenuOpen = false;
let isStickyNavbar = false;
let currentLanguage = 'ua';

EmailJS.init(credentials.userId);
Inputmask({"mask": "+38(999) 999-99-99"}).mask(telField)

var validator = new FormValidator({
	alerts : true,
	events : 'input',
	regex : {
		phone        : /^[+]?[0-9]{2}?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.][0-9]{2}$/g
	},
	classes : {
		item  : 'field',
		alert : 'alert',
		bad   : 'bad'
	}
});

function toggleModal(e) {
	navLinks.classList.toggle('open');
	menuBtn.classList.toggle('focus');
	isMenuOpen = !isMenuOpen;

	if (e) {
		const value = e.target.getAttribute('data-link');
		const posY = document.querySelector(`#${value}`)
			.getBoundingClientRect().top + window.pageYOffset - 100;
		window.scrollTo({
			behavior: 'smooth',
			top: posY
		})
		
	}
}

function sendEmail(name, phone, comments) {
	const {serviceId, emailTemplateId} = credentials;
	const templateParams = {name, phone, comments}
	
	loaderModal.classList.toggle('show');

    EmailJS.send(serviceId, emailTemplateId, templateParams)
        .then(function(response) {
		    console.log('SUCCESS!', response.status, response.text);
		    loaderModal.classList.remove('show');
		    successModal.classList.toggle('show');
		    inputs.forEach(input => {
                input.value = '';
                input.blur();
		    });
            commentsField.value = '';
            setTimeout(() => {
                successModal.classList.remove('show');
            }, 3000);
        }, function(error) {
			successModal.classList.remove('show');
			loaderModal.classList.toggle('show');
		   	console.log('FAILED...', error);
        });
}

form.onsubmit = function(e){
	e.preventDefault();
		const validatorResult = validator.checkAll(this);

		validatorResult.fields.forEach((field, index) => {
			if (!field.error) {
				[inputs[1], inputs[0]][index].classList.remove('bad');
			}
		});

	if (validatorResult.valid) {
		sendEmail(nameField.value, telField.value, commentsField.value);
	}
};

menuBtn.addEventListener('click', () => toggleModal());

navLinkItems.forEach(link => {
	link.addEventListener('click', (e) => toggleModal(e));
});

logo.addEventListener('click', () => {
    window.scrollTo({
        behavior: 'smooth',
        top: 0
    });
});

scrollBtn.addEventListener('click', () => {
    const el = document.querySelector('.section-form');
    const posY = el.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({
        top: posY,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
	isStickyNavbar = window.scrollY > 0;
	navBar.classList.toggle('sticky', isStickyNavbar);

	let showActionButtons = window.scrollY > document.querySelector('.section-header').clientHeight / 2;
	actionButtons.classList.toggle('show', showActionButtons);
});

// Toggle language
toggleLangBtn.addEventListener('change', (e) => {
    currentLanguage = e.currentTarget.checked ? 'ua' : 'ru';

    textsToTranslate.forEach(el => {
        if (el.placeholder){
            el.placeholder = LANG_LIST[currentLanguage][el.getAttribute('key')]
        } else {
            el.innerHTML = LANG_LIST[currentLanguage][el.getAttribute('key')];
        }
    });
});
