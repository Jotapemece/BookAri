// Catálogo de libros actualizado
const books = [
    {
        id: 1,
        title: "Antes de Diciembre",
        author: "Joana Marcús",
        price: 150,
        cover: "images/libro1.jpg",
        description: "Una emotiva historia de amor, pérdidas y segundas oportunidades que te mantendrá enganchado hasta la última página.",
        pages: 1,
        pdfUrl: "books/libro1.pdf"
    },
    {
        id: 2,
        title: "Good Boy",
        author: "Elle Kennedy & Sarina Bowen",
        price: 180,
        cover: "images/libro2.jpg",
        description: "Una historia intensa y conmovedora sobre un jugador de hockey y su compañero de equipo que desafía todas las reglas del corazón.",
        pages: 1,
        pdfUrl: "books/libro2.pdf"
    },
    {
        id: 3,
        title: "Padre Rico Padre Pobre",
        author: "Robert Kiyosaki",
        price: 200,
        cover: "images/libro3.jpg",
        description: "El bestseller que cambió la forma de pensar sobre el dinero de millones de personas. Aprende las lecciones que la escuela no enseña.",
        pages: 1,
        pdfUrl: "books/libro3.pdf"
    },
    {
        id: 4,
        title: "Nosotros en la Luna",
        author: "Alice Kellen",
        price: 170,
        cover: "images/libro4.jpg",
        description: "Una historia que explora el amor, la amistad y los sueños compartidos bajo el brillo de la luna. Romántica y cautivadora.",
        pages: 1,
        pdfUrl: "books/libro4.pdf"
    },
    {
        id: 5,
        title: "El Perfume del Rey",
        author: "Varios Autores",
        price: 190,
        cover: "images/libro5.jpg",
        description: "Una fascinante mezcla de misterio, romance y secretos de la realeza que te transportará a otra época.",
        pages: 1,
        pdfUrl: "books/libro5.pdf"
    },
    {
        id: 6,
        title: "El Arte de Ser Nosotros",
        author: "Varios Autores",
        price: 160,
        cover: "images/libro6.jpg",
        description: "Una reflexión profunda sobre las relaciones, el amor propio y cómo construir conexiones auténticas que perduren.",
        pages: 1,
        pdfUrl: "books/libro6.pdf"
    }
];

// Contenido de ejemplo (ahora: una sinopsis por libro)
const bookContents = {
    1: [
        "Sinopsis: Jenna, una escritora que ha cerrado su corazón tras pérdidas pasadas, conoce a Liam en un café. A través de encuentros fortuitos y conversaciones sinceras, descubre que la vida puede ofrecer segundas oportunidades y el valor de abrirse al amor otra vez."
    ],
    2: [
        "Sinopsis: Connor, el 'chico bueno' del equipo de hockey, ve su mundo ordenado trastocado por Jess, una mujer directa y caótica. Juntos atraviesan pruebas, aprenden a ser vulnerables y descubren que la compañía adecuada puede transformar la vida."
    ],
    3: [
        "Sinopsis: Un manual accesible de educación financiera que contrasta dos mentalidades —la del trabajador tradicional y la del inversor— y ofrece ideas prácticas para empezar a construir activos y mejorar la relación con el dinero."
    ],
    4: [
        "Sinopsis: Una novela romántica sobre dos personas con sueños compatibles que se encuentran, enfrentan obstáculos personales y aprenden que los proyectos compartidos pueden acercar corazones y transformar destinos."
    ],
    5: [
        "Sinopsis: Intriga, romance y secretos de palacio se mezclan en esta historia sobre poder y perfume: un misterio que pone en jaque a la corte y revela lealtades inesperadas."
    ],
    6: [
        "Sinopsis: Reflexiones y ejercicios sobre cómo construir y mantener relaciones auténticas: comunicación, límites y prácticas para crecer en pareja sin perder la individualidad."
    ]
};

// Función para obtener contenido del libro
function getBookContent(bookId, page) {
    if (bookContents[bookId] && bookContents[bookId][page - 1]) {
        return bookContents[bookId][page - 1];
    }
    return "Contenido del libro... (Vista previa: sinopsis)";
}

// Estado de la aplicación
let state = {
    balance: 1000,
    cart: [],
    purchasedBooks: [],
    currentView: 'store',
    selectedBook: null,
    darkMode: false,
    fontSize: 16,
    searchQuery: '',
    currentPage: 1,
    musicPlaying: false
};

// Elementos del DOM
const elements = {
    storeView: document.getElementById('store-view'),
    libraryView: document.getElementById('library-view'),
    readerView: document.getElementById('reader-view'),
    booksGrid: document.getElementById('books-grid'),
    libraryContent: document.getElementById('library-content'),
    cartModal: document.getElementById('cart-modal'),
    cartItems: document.getElementById('cart-items'),
    cartFooter: document.getElementById('cart-footer'),
    balanceAmount: document.getElementById('balance-amount'),
    cartCount: document.getElementById('cart-count'),
    musicBtn: document.getElementById('music-btn'),
    musicBtnMobile: document.getElementById('music-btn-mobile'),
    storeBtn: document.getElementById('store-btn'),
    storeBtnMobile: document.getElementById('store-btn-mobile'),
    libraryBtn: document.getElementById('library-btn'),
    libraryBtnMobile: document.getElementById('library-btn-mobile'),
    cartBtn: document.getElementById('cart-btn'),
    closeCartBtn: document.getElementById('close-cart-btn'),
    backgroundMusic: document.getElementById('background-music'),
    readerContainer: document.getElementById('reader-container'),
    readerTitle: document.getElementById('reader-title'),
    bookText: document.getElementById('book-text'),
    pageInfo: document.getElementById('page-info'),
    prevPageBtn: document.getElementById('prev-page-btn'),
    nextPageBtn: document.getElementById('next-page-btn'),
    darkModeBtn: document.getElementById('dark-mode-btn'),
    decreaseFontBtn: document.getElementById('decrease-font-btn'),
    increaseFontBtn: document.getElementById('increase-font-btn'),
    backBtn: document.getElementById('back-btn'),
    downloadBtn: document.getElementById('download-btn'),
    previewEndMessage: document.getElementById('preview-end-message'),
    downloadSection: document.getElementById('download-section'),
    buyFromPreviewBtn: document.getElementById('buy-from-preview-btn'),
    moonIcon: document.getElementById('moon-icon'),
    sunIcon: document.getElementById('sun-icon'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    closeMobileMenuBtn: document.getElementById('close-mobile-menu')
    ,
    searchInput: document.getElementById('search-input')
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderStore();
    setupMobileMenu();
});

// Cargar datos del localStorage
function loadFromLocalStorage() {
    const savedBalance = localStorage.getItem('bookari_balance');
    const savedCart = localStorage.getItem('bookari_cart');
    const savedPurchased = localStorage.getItem('bookari_purchased');
    
    if (savedBalance) state.balance = parseInt(savedBalance);
    if (savedCart) state.cart = JSON.parse(savedCart);
    if (savedPurchased) state.purchasedBooks = JSON.parse(savedPurchased);
    
    updateBalance();
    updateCartCount();
}

// Simple debounce helper
function debounce(fn, wait = 250) {
    let t = null;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

// Guardar en localStorage
function saveToLocalStorage() {
    localStorage.setItem('bookari_balance', state.balance.toString());
    localStorage.setItem('bookari_cart', JSON.stringify(state.cart));
    localStorage.setItem('bookari_purchased', JSON.stringify(state.purchasedBooks));
}

// Actualizar balance
function updateBalance() {
    if (elements.balanceAmount) elements.balanceAmount.textContent = state.balance;
}

// Actualizar contador del carrito
function updateCartCount() {
    if (!elements.cartCount) return;
    if (state.cart.length > 0) {
        elements.cartCount.textContent = state.cart.length;
        elements.cartCount.classList.remove('d-none');
    } else {
        elements.cartCount.classList.add('d-none');
    }
}

// Verificar si un libro está comprado
function isPurchased(bookId) {
    return state.purchasedBooks.includes(bookId);
}

// Verificar si un libro está en el carrito
function isInCart(bookId) {
    return state.cart.find(item => item.id === bookId) !== undefined;
}

// Renderizar libros en la tienda
function renderStore() {
    if (!elements.booksGrid) return;
    elements.booksGrid.innerHTML = '';

    const query = (state.searchQuery || '').trim().toLowerCase();
    const visibleBooks = query.length > 0
        ? books.filter(b => `${b.title} ${b.author} ${b.description}`.toLowerCase().includes(query))
        : books;

    if (visibleBooks.length === 0) {
        elements.booksGrid.innerHTML = `<div class="col-12"><p class="empty-library-text">No se encontraron libros que coincidan con "${state.searchQuery}".</p></div>`;
        return;
    }

    visibleBooks.forEach((book, index) => {
        const purchased = isPurchased(book.id);
        const inCart = isInCart(book.id);
        
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="book-card">
                <img src="${book.cover}" alt="${book.title}" class="book-cover" loading="lazy" data-book-id="${book.id}">
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <p class="book-description">${book.description}</p>
                    <div class="book-footer">
                        <span class="book-price">${book.price} AriDollars</span>
                        ${purchased 
                            ? `<button class="btn-read" onclick="openReader(${book.id})" aria-label="Leer ${book.title}">` +
                                `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>` +
                                `Leer</button>`
                            : `<button class="btn-add-cart" onclick="addToCart(${book.id})" ${inCart ? 'disabled' : ''} aria-label="Agregar ${book.title}">` +
                                `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>` +
                                `${inCart ? 'En Carrito' : 'Agregar'}</button>`
                        }
                    </div>
                </div>
            </div>
        `;
        
        elements.booksGrid.appendChild(col);
        // staggered entrance animation
        const card = col.querySelector('.book-card');
        if (card) {
            card.style.setProperty('--delay', `${index * 80}ms`);
            // ensure repaint and then add class
            requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('animate')));
        }
    });
}

// Renderizar Mi Biblioteca
function renderLibrary() {
    const myBooks = books.filter(book => isPurchased(book.id));
    
    if (myBooks.length === 0) {
        elements.libraryContent.innerHTML = `
            <div class="col-12">
                <div class="empty-library">
                    <i class="bi bi-bookshelf"></i>
                    <h4>Aún no has comprado ningún libro</h4>
                    <button class="btn-go-store mt-3" onclick="switchView('store')" aria-label="Ir a la tienda">Ir a la tienda</button>
                </div>
            </div>
        `;
        // add the library note even when empty
        const note = document.createElement('div');
        note.className = 'library-note';
        note.textContent = 'Nota: Íbamos a añadir una función para leer los libros pero no funcionó, por eso solo está la sinopsis. Sorry.';
        elements.libraryContent.appendChild(note);
    } else {
        elements.libraryContent.innerHTML = '';
        
        myBooks.forEach(book => {
            const col = document.createElement('div');
            col.className = 'col';
            col.innerHTML = `
                    <div class="book-card">
                        <img src="${book.cover}" alt="${book.title}" class="book-cover" loading="lazy" data-book-id="${book.id}">
                        <div class="book-info">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-author">${book.author}</p>
                            <div style="margin-top:auto; display:flex; gap:0.5rem;">
                                <button class="btn-read" style="flex:1" onclick="openReader(${book.id})" aria-label="Leer ${book.title}">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                    Leer
                                </button>
                                <button class="btn-download" onclick="downloadBook(${book.id})" aria-label="Descargar ${book.title}">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    Descargar
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            
            elements.libraryContent.appendChild(col);
        });
        // footer note explaining limited preview
        const note = document.createElement('div');
        note.className = 'library-note';
        note.textContent = 'Nota: Íbamos a añadir una función para leer los libros pero no funcionó, por eso solo está la sinopsis. Sorry.';
        elements.libraryContent.appendChild(note);
    }
}

// Agregar al carrito
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book && !isInCart(bookId) && !isPurchased(bookId)) {
        // trigger fly-to-cart animation (non-blocking)
        flyToCart(bookId);
        state.cart.push(book);
        saveToLocalStorage();
        updateCartCount();
        renderStore();
        // small feedback toast and cart pulse
        showToast(`${book.title} añadido al carrito.`);
        if (elements.cartCount) {
            elements.cartCount.classList.add('pulse');
            setTimeout(() => elements.cartCount.classList.remove('pulse'), 700);
        }
    }
}

// Fly-to-cart animation: clone book cover and animate to cart button
function flyToCart(bookId) {
    try {
        const img = document.querySelector(`img[data-book-id="${bookId}"]`);
        const cartBtn = elements.cartBtn;
        if (!img || !cartBtn) return;

        const imgRect = img.getBoundingClientRect();
        const cartRect = cartBtn.getBoundingClientRect();

        const clone = img.cloneNode(true);
        clone.className = 'fly-img';
        clone.style.left = `${imgRect.left}px`;
        clone.style.top = `${imgRect.top}px`;
        clone.style.width = `${imgRect.width}px`;
        clone.style.height = `${imgRect.height}px`;
        clone.style.opacity = '1';
        document.body.appendChild(clone);

        // Force reflow then animate to cart
        requestAnimationFrame(() => {
            const dx = cartRect.left + (cartRect.width / 2) - (imgRect.left + (imgRect.width / 2));
            const dy = cartRect.top + (cartRect.height / 2) - (imgRect.top + (imgRect.height / 2));
            const scale = Math.max(0.25, (cartRect.width / imgRect.width));
            clone.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
            clone.style.opacity = '0.9';
        });

        // Remove clone after animation
        setTimeout(() => {
            clone.style.opacity = '0';
            setTimeout(() => clone.remove(), 220);
            // small pop on cart
            if (elements.cartCount) {
                elements.cartCount.classList.add('pulse');
                setTimeout(() => elements.cartCount.classList.remove('pulse'), 700);
            }
        }, 700);
    } catch (e) {
        // silently ignore animation errors
        console.warn('flyToCart failed', e);
    }
}

// Remover del carrito
function removeFromCart(bookId) {
    state.cart = state.cart.filter(book => book.id !== bookId);
    saveToLocalStorage();
    updateCartCount();
    renderCart();
    renderStore();
}

// Renderizar carrito
function renderCart() {
    if (state.cart.length === 0) {
        elements.cartItems.innerHTML = '<p class="text-center text-muted py-4">Tu carrito está vacío</p>';
        elements.cartFooter.innerHTML = '';
    } else {
        elements.cartItems.innerHTML = '';
        
        state.cart.forEach(book => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${book.cover}" alt="${book.title}" class="cart-item-cover" loading="lazy">
                <div class="cart-item-info">
                    <h6 class="cart-item-title">${book.title}</h6>
                    <p class="cart-item-author mb-0">${book.author}</p>
                    <p class="cart-item-price mb-0">${book.price} AriDollars</p>
                </div>
                <button class="btn-remove-cart" onclick="removeFromCart(${book.id})">
                    <i class="bi bi-x-lg"></i>
                </button>
            `;
            elements.cartItems.appendChild(cartItem);
            // small entrance animation for cart items
            requestAnimationFrame(() => cartItem.classList.add('animate'));
        });
        
        const total = state.cart.reduce((sum, book) => sum + book.price, 0);
        
        elements.cartFooter.innerHTML = `
            <div class="cart-total">
                <span class="total-label">Total:</span>
                <span class="total-amount">${total} AriDollars</span>
            </div>
            <button class="btn-checkout" onclick="checkout()">Finalizar Compra</button>
        `;
    }
}

// Finalizar compra
function checkout() {
    const total = state.cart.reduce((sum, book) => sum + book.price, 0);
    
    if (state.balance >= total) {
        state.balance -= total;
        state.purchasedBooks.push(...state.cart.map(b => b.id));
        state.cart = [];
        saveToLocalStorage();
        updateBalance();
        updateCartCount();
        renderCart();
        renderStore();
        hideCart();
        showToast('¡Compra realizada con éxito! Los libros están ahora en tu biblioteca.');
    } else {
        showToast('No tienes suficientes AriDollars.', 'error');
    }
}

// Modal helpers with focus trapping and ARIA
let _previouslyFocused = null;
function _getFocusable(el) {
    return el.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
}

function showCart() {
    const modal = elements.cartModal;
    if (!modal) return;
    _previouslyFocused = document.activeElement;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    // focus first focusable
    const focusables = _getFocusable(modal);
    if (focusables.length) focusables[0].focus();
    // trap focus
    modal._keydownHandler = function(e) {
        if (e.key === 'Escape') {
            hideCart();
            return;
        }
        if (e.key === 'Tab') {
            const nodes = Array.from(_getFocusable(modal));
            if (nodes.length === 0) return;
            const first = nodes[0];
            const last = nodes[nodes.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    };
    document.addEventListener('keydown', modal._keydownHandler);
}

function hideCart() {
    const modal = elements.cartModal;
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    if (modal._keydownHandler) document.removeEventListener('keydown', modal._keydownHandler);
    if (_previouslyFocused) _previouslyFocused.focus();
}

// Simple toast notifications
function showToast(message, type = 'default') {
    const toast = document.createElement('div');
    toast.className = 'app-toast';
    if (type === 'error') toast.style.background = 'linear-gradient(180deg, rgba(220,38,38,0.95), rgba(185,28,28,0.9))';
    toast.textContent = message;
    document.body.appendChild(toast);
    // force reflow then show
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// Abrir lector
function openReader(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        state.selectedBook = book;
        state.currentPage = 1;
        state.currentView = 'reader';
        switchView('reader');
        updateReader();
    }
}

// Actualizar lector
function updateReader() {
    if (!state.selectedBook) return;

    const bookId = state.selectedBook.id;
    if (elements.readerTitle) elements.readerTitle.textContent = state.selectedBook.title;
    const content = getBookContent(bookId, state.currentPage);
    if (elements.bookText) {
        elements.bookText.textContent = content;
        elements.bookText.style.fontSize = `${state.fontSize}px`;
    }
    if (elements.pageInfo) elements.pageInfo.textContent = `Página ${state.currentPage} de ${state.selectedBook.pages}`;

    if (elements.prevPageBtn) elements.prevPageBtn.disabled = state.currentPage === 1;
    if (elements.nextPageBtn) elements.nextPageBtn.disabled = state.currentPage === state.selectedBook.pages;

    // Manejo de la sinopsis / nota irónica si está comprado
    if (state.currentPage === state.selectedBook.pages) {
        if (!isPurchased(bookId)) {
            if (elements.previewEndMessage) {
                elements.previewEndMessage.classList.remove('d-none');
                elements.previewEndMessage.textContent = 'Has alcanzado el final de la sinopsis. Compra para obtener más contenido.';
            }
            if (elements.downloadSection) elements.downloadSection.classList.add('d-none');
        } else {
            if (elements.previewEndMessage) {
                elements.previewEndMessage.classList.remove('d-none');
                elements.previewEndMessage.textContent = 'Nota irónica: Gracias por comprar — ahora oficialmente eres el dueño de esta sinopsis. ¡Que la disfrutes!';
            }
            if (elements.downloadSection) elements.downloadSection.classList.remove('d-none');
        }
    } else {
        if (elements.previewEndMessage) elements.previewEndMessage.classList.add('d-none');
        if (elements.downloadSection) {
            if (isPurchased(bookId)) elements.downloadSection.classList.remove('d-none');
            else elements.downloadSection.classList.add('d-none');
        }
    }
}

// Descargar libro
function downloadBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        const link = document.createElement('a');
        link.href = book.pdfUrl;
        link.download = `${book.title}.pdf`;
        link.click();
    }
}

// Cambiar vista
function switchView(view) {
    state.currentView = view;
    
    // Ocultar todas las vistas
    elements.storeView.classList.remove('active');
    elements.libraryView.classList.remove('active');
    elements.readerView.classList.remove('active');
    
    // Actualizar botones de navegación
    elements.storeBtn.classList.remove('active');
    elements.libraryBtn.classList.remove('active');
    
    // Mostrar vista activa
    if (view === 'store') {
        elements.storeView.classList.add('active');
        elements.storeBtn.classList.add('active');
        renderStore();
    } else if (view === 'library') {
        elements.libraryView.classList.add('active');
        elements.libraryBtn.classList.add('active');
        renderLibrary();
    } else if (view === 'reader') {
        elements.readerView.classList.add('active');
    }
}

// Toggle música
function toggleMusic() {
    if (state.musicPlaying) {
        elements.backgroundMusic.pause();
        state.musicPlaying = false;
        elements.musicBtn.classList.remove('active');
        elements.musicBtnMobile.classList.remove('active');
    } else {
        elements.backgroundMusic.play();
        state.musicPlaying = true;
        elements.musicBtn.classList.add('active');
        elements.musicBtnMobile.classList.add('active');
    }
}

// Toggle modo oscuro
function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    elements.readerContainer.classList.toggle('dark-mode', state.darkMode);
    
    if (state.darkMode) {
        elements.moonIcon.classList.add('d-none');
        elements.sunIcon.classList.remove('d-none');
    } else {
        elements.moonIcon.classList.remove('d-none');
        elements.sunIcon.classList.add('d-none');
    }
}

// Ajustar tamaño de fuente
function adjustFontSize(increase) {
    if (increase) {
        state.fontSize = Math.min(24, state.fontSize + 2);
    } else {
        state.fontSize = Math.max(12, state.fontSize - 2);
    }
    updateReader();
}

// Navegar páginas
function changePage(direction) {
    if (!state.selectedBook) return;
    if (direction === 'prev' && state.currentPage > 1) {
        state.currentPage--;
        updateReader();
    } else if (direction === 'next' && state.currentPage < state.selectedBook.pages) {
        state.currentPage++;
        updateReader();
    }
}

// Setup menú móvil
function setupMobileMenu() {
    if (!elements.mobileMenuBtn || !elements.mobileMenu) return;
    elements.mobileMenuBtn.addEventListener('click', () => {
        elements.mobileMenu.classList.remove('hidden');
        elements.mobileMenu.classList.add('active');
        elements.mobileMenu.setAttribute('aria-hidden', 'false');
        elements.mobileMenuBtn.setAttribute('aria-expanded', 'true');
        // focus first item
        const first = elements.mobileMenu.querySelector('button, a');
        if (first) first.focus();
    });

    if (elements.closeMobileMenuBtn) elements.closeMobileMenuBtn.addEventListener('click', () => {
        elements.mobileMenu.classList.remove('active');
        elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        elements.mobileMenu.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            elements.mobileMenu.classList.add('hidden');
        }, 300);
    });

    // Cerrar al hacer click fuera
    elements.mobileMenu.addEventListener('click', (e) => {
        if (e.target === elements.mobileMenu) {
            elements.mobileMenu.classList.remove('active');
            elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            elements.mobileMenu.setAttribute('aria-hidden', 'true');
            setTimeout(() => {
                elements.mobileMenu.classList.add('hidden');
            }, 300);
        }
    });
}

// Event Listeners (guarded)
if (elements.musicBtn) elements.musicBtn.addEventListener('click', toggleMusic);
if (elements.musicBtnMobile) elements.musicBtnMobile.addEventListener('click', toggleMusic);
if (elements.storeBtn) elements.storeBtn.addEventListener('click', () => switchView('store'));
if (elements.storeBtnMobile) elements.storeBtnMobile.addEventListener('click', () => switchView('store'));
if (elements.libraryBtn) elements.libraryBtn.addEventListener('click', () => switchView('library'));
if (elements.libraryBtnMobile) elements.libraryBtnMobile.addEventListener('click', () => switchView('library'));
if (elements.cartBtn) elements.cartBtn.addEventListener('click', () => {
    showCart();
    renderCart();
});
if (elements.closeCartBtn) elements.closeCartBtn.addEventListener('click', () => {
    hideCart();
});

// Cerrar modal al hacer click en el overlay
if (elements.cartModal) elements.cartModal.addEventListener('click', (e) => {
    if (e.target === elements.cartModal || e.target.classList.contains('modal-overlay')) {
        hideCart();
    }
});

if (elements.darkModeBtn) elements.darkModeBtn.addEventListener('click', toggleDarkMode);
if (elements.decreaseFontBtn) elements.decreaseFontBtn.addEventListener('click', () => adjustFontSize(false));
if (elements.increaseFontBtn) elements.increaseFontBtn.addEventListener('click', () => adjustFontSize(true));
if (elements.prevPageBtn) elements.prevPageBtn.addEventListener('click', () => changePage('prev'));
if (elements.nextPageBtn) elements.nextPageBtn.addEventListener('click', () => changePage('next'));

if (elements.backBtn) elements.backBtn.addEventListener('click', () => {
    if (state.selectedBook && isPurchased(state.selectedBook.id)) {
        switchView('library');
    } else {
        switchView('store');
    }
});

if (elements.buyFromPreviewBtn) elements.buyFromPreviewBtn.addEventListener('click', () => {
    if (!state.selectedBook) return;
    addToCart(state.selectedBook.id);
    switchView('store');
    showCart();
    renderCart();
});

// Search input handler (debounced)
if (elements.searchInput) {
    const onSearch = debounce((e) => {
        state.searchQuery = e.target.value || '';
        renderStore();
    }, 220);
    elements.searchInput.addEventListener('input', onSearch);
}

// Global keyboard: ESC closes modal or mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // close cart if open
        if (elements.cartModal && !elements.cartModal.classList.contains('hidden')) {
            hideCart();
            return;
        }
        // close mobile menu if open
        if (elements.mobileMenu && elements.mobileMenu.classList.contains('active')) {
            elements.mobileMenu.classList.remove('active');
            if (elements.mobileMenuBtn) elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            elements.mobileMenu.setAttribute('aria-hidden', 'true');
            setTimeout(() => elements.mobileMenu.classList.add('hidden'), 300);
        }
    }
});