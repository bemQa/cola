export const maskInit = function(elem) {
    elem.inputmask({
        mask:"+7(999)999-99-99",
        "clearIncomplete": true
    });
}