import * as $ from "jquery";

export const showPopup = function (e) {
    const isSubmit = this.getAttribute('type') === 'submit';
    if (isSubmit) {

        const dataValidate = this.parentElement.dataset.validate;

        $(`[data-validate=${dataValidate}]`).validate({
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
                privacy_data: {
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
            },
            submitHandler: function (form) {
                form.reset();
                const btn = $(`[data-validate=${dataValidate}] button`);
                const id = btn.data('modal');

                const popup = document.querySelector(`.popup[data-popup="${id}"]`);
                const activePopup = document.querySelector('.popup.active') || null;

                if (activePopup) {
                    activePopup.classList.remove('active');
                }

                popup.classList.add('active');
                document.body.classList.add('no-scrolling');
            }
        });

        return;
    }

    e.preventDefault();
    const id = this.dataset.modal;
    const popup = document.querySelector(`.popup[data-popup="${id}"]`);
    const activePopup = document.querySelector('.popup.active') || null;

    if (activePopup) {
        activePopup.classList.remove('active');
    }

    popup.classList.add('active');
    document.body.classList.add('no-scrolling');
}

export const hidePopup = function (e) {
    const target = e.target;

    if (target.dataset.close) {
        e.preventDefault();
        const popup = document.querySelector('.popup.active');
        popup.classList.remove('active');
        document.body.classList.remove('no-scrolling');
    }
}