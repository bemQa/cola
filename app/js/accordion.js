export const accordions = function (accordions) {
    accordions.forEach(a => a.addEventListener('click', accordion));
}

function accordion(e) {
    if (e.target.classList.contains('accordion__header_text')) {
        this.classList.toggle('active');

        let content = this.querySelector('.accordion__body');

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }
}