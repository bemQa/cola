'use strict';
import * as $ from 'jquery';
import './jquery.validate.min.js';
import './jquery.inputmask.min';
import './select2.min';

const mobileWidth = 767;
let isMobile = checkWidth();

window.addEventListener('resize', () => {
    isMobile = checkWidth();
});

setTimeout(() => {
    if (!document.querySelector('.loader')) {
        return;
    }

    const loader = document.querySelector('.loader');
    if (loader.classList.contains('active')) {
        loader.classList.remove('active');

        setTimeout(() => {
            loader.parentElement.removeChild(loader);
        }, 300)
    }
}, 2500);

window.addEventListener('load', function () {

    (function loader() {
        if (!document.querySelector('.loader')) {
            return;
        }

        const loader = document.querySelector('.loader');

        if (loader.classList.contains('active')) {
            loader.classList.remove('active');
        }

        setTimeout(() => {
            loader.parentElement.removeChild(loader);
        }, 1500);

    })();

    (function phoneMasks() {
        const phoneMaskClass = '.phone-mask';
        const phones = $(phoneMaskClass);

        phones.each(function () {
            maskInit($(this));
        })

        function maskInit(elem) {
            elem.inputmask({
                mask:"+7(999)999-99-99",
                "clearIncomplete": true
            });
        }
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

    (function popup() {
        if (!document.querySelector('.popup')) {
            return;
        }

        const popupBtns = [...document.querySelectorAll('.recipes__item')];
        const popups = [...document.querySelectorAll('.popup')];

        popups.forEach(p => {
            p.addEventListener('click', hidePopup);
        });

        popupBtns.forEach(p => {
            p.addEventListener('click', showPopup);
        });

        function showPopup() {
            const id = this.dataset.modal;
            const popup = document.querySelector(`.popup[data-popup="${id}"]`);

            popup.classList.add('active');
            document.body.classList.add('no-scrolling');
        }

        function hidePopup(e) {
            const target = e.target;

            if (target.dataset.close) {
                e.preventDefault();
                const popup = document.querySelector('.popup.active');
                popup.classList.remove('active');
                document.body.classList.remove('no-scrolling');
            }
        }
    })();
});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}