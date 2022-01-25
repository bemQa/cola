'use strict';
import * as $ from 'jquery';
import './jquery.validate.min.js';
import './jquery.inputmask.min';
import './select2.min';
import {showPopup, hidePopup} from "./popup";
import {maskInit} from "./inputMask";
import {loader} from "./loader";
import {accordions} from "./accordion";
import {getCookie, setCookie} from "./cookies";
// import {validate} from "./validation";


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
        if ($('.select').length > 1) {
            $('select').each(function () {
                let withInput = $(this).hasClass('with-input');
                let $this = $(this).not('.select-search');
                let parent = $(this).not('.select-search').parents('.select');
                $this.select2(/*{
                    tags: withInput,
                    minimumResultsForSearch: Infinity,
                    dropdownParent: parent
                }*/);
            });
            $('.select-search').each(function () {
                let withInput = $(this).hasClass('with-input');
                let $this = $(this);
                let parent = $(this).parents('.select');
                $this.select2(/*{
                    dropdownParent: parent
                }*/);
            });
        } else {
            $('select').select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: $('.select')
            });
        }
    })();

    (function cookie() {

        const isCookie = getCookie('access-cookie') || null;

        if (isCookie) {
            const cookieModal = document.querySelector('[data-popup="cookie"]');
            cookieModal.parentElement.removeChild(cookieModal);
            return;
        }

        const setCookieBtns = [...document.querySelectorAll('.set-cookie')];

        setCookieBtns.forEach(b => b.addEventListener('click', () => {
            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 365);

            setCookie('access-cookie', true, {
                expires: tomorrow,
            });

            document.querySelector('.popup.active')
                .classList.remove('active');
        }))
    })();
});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}