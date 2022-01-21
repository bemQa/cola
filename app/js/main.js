'use strict';
import * as $ from 'jquery';
import './jquery.validate.min.js';
import './jquery.inputmask.min';
import './select2.min';
import {showPopup, hidePopup} from "./popup";
import {maskInit} from "./inputMask";
import {loader} from "./loader";
import {accordions} from "./accordion";
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

    /*(function checkValidate() {
        const form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    code: {
                        required: true
                    },
                    region: {
                        required: true
                    },
                    fio: {
                        required: true
                    },
                    phone_1: {
                        required: true
                    },
                    phone_2: {
                        required: true
                    },
                    email: {
                        required: true
                    },
                    prize: {
                        required: true
                    },
                    index: {
                        required: true
                    },
                    city: {
                        required: true
                    },
                    street: {
                        required: true
                    },
                    flat: {
                        required: true
                    },
                    house: {
                        required: true
                    },
                    all_right: {
                        required: true
                    },
                    policy: {
                        required: true
                    },
                    conditions: {
                        required: true
                    },
                    cookie: {
                        required: true
                    },
                    support_email: {
                        required: true
                    },
                    support_topic: {
                        required: true
                    },
                    support_name: {
                        required: true
                    },
                    support_message: {
                        required: true
                    },
                },
                errorElement: 'span',
                errorPlacement: function (error, element) {
                    const placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                }
            });
        });
        $.validator.addMethod('Email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
    })();*/

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
                let withInput = $(this).hasClass('with-input');
                let $this = $(this).not('.select-search');
                let parent = $(this).not('.select-search').parents('.select');
                $this.select2(/*{
                    tags: withInput,
                    minimumResultsForSearch: Infinity,
                    dropdownParent: parent
                }*/);
            });
            $('.select-search').each(function() {
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
});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}