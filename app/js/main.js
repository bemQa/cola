'use strict';
import * as $ from 'jquery';
import './jquery.validate.min.js';
import './jquery.inputmask.min';
import './select2.min';
import {showPopup, hidePopup} from "./popup";
import {maskInit} from "./inputMask";
import {loader} from "./loader";
import {accordions} from "./accordion";


const mobileWidth = 767;
let isMobile = checkWidth();

window.addEventListener('resize', () => {
    isMobile = checkWidth();
});

setTimeout(() => {
    loader();
}, 2500);

window.addEventListener('load', function () {

    loader();

    (function accordion() {
        const accordionsList = [...document.querySelectorAll('.accordion')];

        if (!accordionsList[0]) return;

        accordions(accordionsList);
    })();

    (function phoneMasks() {
        const phoneMaskClass = '.phone-mask';
        const phones = $(phoneMaskClass);

        phones.each(function () {
            maskInit($(this));
        });
    })();

    (function popup() {
        if (!document.querySelector('.popup')) {
            return;
        }

        const popupBtns = [...document.querySelectorAll('[data-modal]')];
        const popups = [...document.querySelectorAll('.popup')];

        popups.forEach(p => {
            p.addEventListener('click', hidePopup);
        });

        popupBtns.forEach(p => {
            p.addEventListener('click', showPopup);
        });
    })();

    (function selects() {
        if($('.select').length > 1) {
            $('select').each(function() {
                let $this = $(this).not('.select-search');
                let parent = $(this).not('.select-search').parents('.select');
                $this.select2({
                    minimumResultsForSearch: Infinity,
                    dropdownParent: parent
                });
            });
            $('.select-search').each(function() {
                let $this = $(this);
                let parent = $(this).parents('.select');
                $this.select2({
                    dropdownParent: parent
                });
            });
        } else {
            $('select').select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: $('.select')
            });
        }
    })();
});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}