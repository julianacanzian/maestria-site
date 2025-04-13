// JavaScript para o site do Clube Maestria Consciente

document.addEventListener('DOMContentLoaded', function() {
    // Contador regressivo
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 7); // 7 dias a partir de hoje
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.querySelectorAll('.timer-item .numero')[0].textContent = days.toString().padStart(2, '0');
        document.querySelectorAll('.timer-item .numero')[1].textContent = hours.toString().padStart(2, '0');
        document.querySelectorAll('.timer-item .numero')[2].textContent = minutes.toString().padStart(2, '0');
        document.querySelectorAll('.timer-item .numero')[3].textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(x);
            document.querySelectorAll('.timer-item .numero').forEach(item => {
                item.textContent = '00';
            });
        }
    }
    
    updateCountdown();
    const x = setInterval(updateCountdown, 1000);
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.toggle').textContent = '+';
                }
            });
            
            // Alterna o estado do item atual
            item.classList.toggle('active');
            const toggle = item.querySelector('.toggle');
            toggle.textContent = item.classList.contains('active') ? '−' : '+';
        });
    });
    
    // Smooth Scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu Mobile Toggle (para implementação futura)
    const mobileMenuButton = document.createElement('div');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('nav');
    nav.parentNode.insertBefore(mobileMenuButton, nav);
    
    mobileMenuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });
    
    // Animação de elementos ao scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.pilar, .diferencial-item, .beneficio, .modulo, .plano');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez no carregamento
    
    // Validação do formulário de contato
    const contactForm = document.querySelector('.contato-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('mensagem');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                markInvalid(nameInput, 'Por favor, informe seu nome');
                isValid = false;
            } else {
                markValid(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                markInvalid(emailInput, 'Por favor, informe seu email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                markInvalid(emailInput, 'Por favor, informe um email válido');
                isValid = false;
            } else {
                markValid(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                markInvalid(messageInput, 'Por favor, escreva sua mensagem');
                isValid = false;
            } else {
                markValid(messageInput);
            }
            
            if (isValid) {
                // Simulação de envio bem-sucedido
                contactForm.innerHTML = '<div class="success-message"><p>Mensagem enviada com sucesso! Em breve entraremos em contato.</p></div>';
            }
        });
    }
    
    function markInvalid(element, message) {
        element.classList.add('invalid');
        
        let errorMessage = element.parentNode.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            element.parentNode.appendChild(errorMessage);
        }
        
        errorMessage.textContent = message;
    }
    
    function markValid(element) {
        element.classList.remove('invalid');
        
        const errorMessage = element.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
