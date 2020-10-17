import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import User from './modules/User';
const user = new User('.userForm');
user.init();

import Contact from './modules/Contact';
const contact = new Contact('.contactForm');
contact.init();
