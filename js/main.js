
const d = document;


/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
})


sr.reveal(`#brand, #menu`,{
    origin: 'top',
    interval: 100,
})


sr.reveal(`.personal, .media, .address`,{
    origin: 'top',
    interval: 100,
    reset: true,
})

sr.reveal(`.right`,{
    origin: 'right',
    interval: 100,
    reset: true,
})

sr.reveal(`.left`,{
    origin: 'left',
    interval: 100,
    reset: true,
})


/*==================== VALIDACION FORMULARIO ====================*/

function contactFormValidations() {
    const $form = d.querySelector('.contact-form'),
        $inputs = d.querySelectorAll('.contact-form [required]');

    // console.log($inputs);

    $inputs.forEach((input) => {
        const $span = d.createElement('span');
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add('contact-form-error', 'none');
        input.insertAdjacentElement('afterend', $span);

    });

    d.addEventListener('keyup', (e) => {
        if (e.target.matches('.contact-form [required]')) {
            const $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern;

            // console.log($input, pattern);
            if (pattern && $input.value !== '') {
                // console.log('El input tiene patrón');
                const regex = new RegExp(pattern);
                return !regex.exec($input.value)
                    ? d.getElementById($input.name).classList.add('is-active')
                    : d.getElementById($input.name).classList.remove('is-active')
            }

            if (!pattern) {
                // console.log('El input NO tiene patrón');
                return $input.value === ''
                    ? d.getElementById($input.name).classList.add('is-active')
                    : d.getElementById($input.name).classList.remove('is-active')
            }
        }
    });

    d.addEventListener('submit', (e) => {
        e.preventDefault();
        // alert('Enviando Formulario…');

        const $loader = d.querySelector('.contact-form-loader'),
            $reponse = d.querySelector('.contact-form-response');

        $loader.classList.remove('none');

        setTimeout(() => {
            $loader.classList.add('none');
            $reponse.classList.remove('none');
            $form.reset();

            setTimeout(() => $reponse.classList.add('none'), 2000);
        }, 3000);
    });
}


/*==================== MENU ====================*/
function hamburgerMenu(panelBtn, panel, menuLink) {

    d.addEventListener('click', (e) => {
        if (e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)) { // Cualquier elemento hijo que esté en el área del botón, incluidas las 3 rayitas de la hamburguesa
            d.querySelector(panel).classList.toggle('is-active');
            d.querySelector(panelBtn).classList.toggle('is-active');
        }

        if (e.target.matches(menuLink) || e.target.matches(`${menuLink} *`)) {
            d.querySelector(panel).classList.remove('is-active'); // Se repliega el panel
            d.querySelector(panelBtn).classList.remove('is-active'); // Se resetea el botón
        }
    });
}


/*====================  ====================*/
contactFormValidations();
hamburgerMenu('.panel-btn', '.panel', '.menu li');