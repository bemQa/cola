export const validate = function (form) {
    const formFields = form.find('[name]');
    
    const rules = Object.create({});
    formFields.each(function () {
        createRule($(this));
    })
    
    form.validate({
        ignore: [],
        errorClass: 'error',
        validClass: 'success',
        rules: rules,
        errorElement : 'span',
        errorPlacement: function(error, element) {
            const placement = $(element).data('error');
            if (placement) {
                $(placement).append(error);
            } else {
                error.insertBefore(element);
            }
        },
        submitHandler: function (e) {
            e.preventDefault();
            // const loader = ctxForm.find('.loader');
            // loader.addClass('active');
        }
    });


    function createRule(field) {
        const fieldName = field.attr('name');
        Object.defineProperty(rules, fieldName, {
            value: {
                required: true,
            },
            enumerable: true,
        })
    }
}

$.validator.addMethod('email', function (value, element) {
    return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
}, 'Некорректный e-mail');
$.validator.addMethod('_name', function (value, element) {
    return this.optional(element) || /^[а-яА-ЯёЁ\s]+$/.test(value);
}, 'Введите корректное имя');