// JavaScript para o site de casamento - Versão Moderna
document.addEventListener('DOMContentLoaded', function() {
    
    // Adicionar efeitos de partículas no hero
    createParticleEffect();
    
    // Efeito de typing no hero
    createTypingEffect();
    
    // Navegação mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu mobile ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll com efeito glassmorphism
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.scrollY > 100;
        
        if (scrolled) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(30px)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        }
    });

    // Animações de fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Adicionar classe fade-in aos elementos
    document.querySelectorAll('.section-header, .story-content, .detail-card, .gallery-item, .memories-content').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Galeria Modal
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentImageIndex = 0;
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const imagesList = Array.from(galleryImages);

    // Abrir modal ao clicar na imagem
    galleryImages.forEach((img, index) => {
        img.parentElement.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = img.src;
            currentImageIndex = index;
            document.body.style.overflow = 'hidden';
        });
    });

    // Fechar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Fechar modal ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Navegação anterior
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + imagesList.length) % imagesList.length;
        modalImg.src = imagesList[currentImageIndex].src;
    });

    // Navegação próxima
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % imagesList.length;
        modalImg.src = imagesList[currentImageIndex].src;
    });

    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });

    // Carregar mais fotos na galeria
    const loadMoreBtn = document.querySelector('.gallery-load-more');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Lista de todas as imagens disponíveis
    const allImages = [
        'T&Dwedding-325.jpg',
        'T&Dwedding-526.jpg',
        'T&Dwedding-537.jpg',
        'T&Dwedding-541.jpg',
        'T&Dwedding-626.jpg',
        'T&Dwedding-642.jpg',
        'T&Dwedding-650.jpg',
        'T&Dwedding-678.jpg',
        'T&Dwedding-687.jpg',
        'T&Dwedding-695.jpg',
        'T&Dwedding-700.jpg',
        'T&Dwedding-711.jpg',
        'T&Dwedding-739.jpg'
    ];

    let imagesLoaded = 12; // Número inicial de imagens carregadas (3 linhas × 4 fotos)

    loadMoreBtn.addEventListener('click', function() {
        const imagesToLoad = Math.min(8, allImages.length - (imagesLoaded - 12)); // Carregar 8 fotos por vez (2 linhas × 4)
        
        for (let i = 0; i < imagesToLoad; i++) {
            if (imagesLoaded - 12 + i < allImages.length) {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item fade-in';
                
                galleryItem.innerHTML = `
                    <img src="img/${allImages[imagesLoaded - 12 + i]}" alt="Momento especial" loading="lazy">
                    <div class="gallery-overlay">
                        <i class="fas fa-search-plus"></i>
                    </div>
                `;
                
                galleryGrid.appendChild(galleryItem);
                observer.observe(galleryItem);
                
                // Adicionar evento de clique para o modal
                const newImg = galleryItem.querySelector('img');
                galleryItem.addEventListener('click', function() {
                    modal.style.display = 'block';
                    modalImg.src = newImg.src;
                    currentImageIndex = Array.from(document.querySelectorAll('.gallery-item img')).indexOf(newImg);
                    document.body.style.overflow = 'hidden';
                });
            }
        }
        
        imagesLoaded += imagesToLoad;
        
        // Esconder botão se todas as imagens foram carregadas
        if (imagesLoaded - 12 >= allImages.length) {
            loadMoreBtn.style.display = 'none';
        }
        
        // Atualizar lista de imagens para navegação do modal
        setTimeout(() => {
            const updatedImages = document.querySelectorAll('.gallery-item img');
            imagesList.length = 0;
            imagesList.push(...Array.from(updatedImages));
        }, 100);
    });

    // Parallax effect suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Contador de dias desde o casamento (opcional)
    function updateTimeSince() {
        // Data do casamento
        const weddingDate = new Date('2023-08-26');
        const now = new Date();
        const timeSince = now - weddingDate;
        
        if (timeSince > 0) {
            const days = Math.floor(timeSince / (1000 * 60 * 60 * 24));
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);
            
            // Você pode adicionar um elemento para mostrar o tempo desde o casamento
            // document.getElementById('time-since').innerHTML = `${days} dias de casados`;
        }
    }
    
    // Atualizar contador diariamente
    // setInterval(updateTimeSince, 86400000); // 24 horas
    // updateTimeSince();

    // Efeitos de partículas flutuantes (opcional)
    function createFloatingParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${5 + Math.random() * 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: 100%;
                z-index: 1;
            `;
            hero.appendChild(particle);
        }
        
        // Adicionar CSS para animação das partículas
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Criar partículas flutuantes
    createFloatingParticles();

    // Lazy loading para imagens
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Adicionar classe active ao link de navegação atual
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
});

// Função para criar efeito de partículas moderno
function createParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    
    const particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    });
}

// Função para efeito de typing no subtítulo
function createTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid rgba(255, 255, 255, 0.8)';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                subtitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    setTimeout(typeWriter, 2000);
}

// Função para otimizar performance em dispositivos móveis
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reduzir qualidade de animações em dispositivos móveis
        document.body.classList.add('mobile-optimized');
        
        // Remover parallax em dispositivos móveis
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = 'none';
        }
    }
}

window.addEventListener('resize', optimizeForMobile);
optimizeForMobile();
