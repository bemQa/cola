export const showPopup = function (e) {
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