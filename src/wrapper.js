import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import AutoTyping from './components/AutoTyping';

const CustomElement = wrap(Vue, AutoTyping);

window.customElements.define('auto-typing', CustomElement);