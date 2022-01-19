export const loader = function () {
    if (!document.querySelector('.loader')) {
        return;
    }

    const loader = document.querySelector('.loader');

    if (loader.classList.contains('active')) {
        loader.classList.remove('active');
    }

    /*setTimeout(() => {
        loader.parentElement.removeChild(loader);
    }, 1500);*/
}