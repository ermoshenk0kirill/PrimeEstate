let apartments = [
    {
        id: 1,
        title: "3-комн. квартира в центре",
        description: "Просторная квартира в историческом центре города с видом на парк. Евроремонт, современная техника.",
        price: 12500000,
        rooms: 3,
        area: 85.5,
        address: "ул. Центральная, д. 15",
        image: "https://dizayn-interera.moscow/images/blog/111/0_ta0g-5m.jpg",
        inCart: 0
    },
    {
        id: 2,
        title: "Студия в новостройке",
        description: "Современная студия в только что сданном доме. Панорамные окна, кухня-гостиная, санузел.",
        price: 6500000,
        rooms: 1,
        area: 38.2,
        address: "пр. Новый, д. 42",
        image: "https://www.ivd.ru/images/cache/2021/10/20/fit_960_530_false_crop_1800_1012_0_94_q90_1989702_b036c2c7fe3356834bc0c427f.jpeg",
        inCart: 0
    },
    {
        id: 3,
        title: "2-комн. квартира у метро",
        description: "Удобная двухкомнатная квартира в 5 минутах от метро. Балкон, лоджия, консьерж.",
        price: 9800000,
        rooms: 2,
        area: 62.7,
        address: "ул. Метростроителей, д. 8",
        image: "https://evdom.ru/wp-content/uploads/2018/08/1-8-1000x563.jpg",
        inCart: 0
    },
    {
        id: 4,
        title: "Пентхаус с террасой",
        description: "Роскошный пентхаус на последнем этаже с террасой 40 м². Вид на город, камин, высокие потолки.",
        price: 28500000,
        rooms: 4,
        area: 145.0,
        address: "ул. Престижная, д. 1",
        image: "https://www.topdom.ru/gallery/flats/94/1-l.jpg",
        inCart: 0
    }
];
let cart = [];
let currentPage = 'home';

// В самом начале скрипта, после объявления переменных
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let currentUserRole = localStorage.getItem('estateUserRole') || 'guest';
// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем данные из localStorage
    loadFromLocalStorage();
   
    // Определяем текущую страницу по URL
    determineCurrentPage();
   
    // Устанавливаем текущую роль
    const roleSelector = document.getElementById('role-selector');
    if (roleSelector) {
        roleSelector.value = currentUserRole;
        updateUserInterface();
       
        roleSelector.addEventListener('change', function() {
            currentUserRole = this.value;
            updateUserInterface();
            saveToLocalStorage();
        });
    }
   
    // Загружаем контент для текущей страницы
    loadPageContent();
   
    // Добавляем обработчики событий
    setupEventListeners();
   
    // Обновляем счетчик корзины
    updateCartCount();
   
    // Настраиваем навигацию
    setupNavigation();
   
    // Обновляем активные ссылки в навигации
    updateActiveNavLinks();
});
// Определение текущей страницы
function determineCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
   
    if (page === 'catalog.html' || page === 'catalog') {
        currentPage = 'catalog';
    } else if (page === 'cart.html' || page === 'cart') {
        currentPage = 'cart';
    } else if (page === 'contacts.html' || page === 'contacts') {
        currentPage = 'contacts';
    } else {
        currentPage = 'home';
    }
}
// Загрузка контента страницы
function loadPageContent() {
    const mainContent = document.getElementById('main-content') || document.querySelector('main');
   
    switch(currentPage) {
        case 'home':
            loadHomePage();
            break;
        case 'catalog':
            loadCatalogPage();
            break;
        case 'cart':
            loadCartPage();
            break;
        case 'contacts':
            loadContactsPage();
            break;
    }
}
// Загрузка главной страницы
function loadHomePage() {
    const mainContent = document.getElementById('main-content') || document.querySelector('main');
   
    if (!mainContent) return;
   
    mainContent.innerHTML = `
        <section class="hero">
            <div class="hero-content">
                <h1>Prime Estate</h1>
                <p class="hero-subtitle">Надёжное агентство недвижимости с 2010 года</p>
                <p>Мы помогаем найти дом вашей мечты. Более 5000 успешных сделок по всей стране.</p>
                <a href="#" class="btn-primary go-to-catalog">Смотреть каталог</a>
            </div>
        </section>
        <section class="features">
            <div class="container">
                <h2>Почему выбирают нас</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <i class="fas fa-shield-alt"></i>
                        <h3>Безопасность сделок</h3>
                        <p>Все документы проверяются юристами, 100% гарантия чистоты сделки</p>
                    </div>
                    <div class="feature-card">
                        <i class="fas fa-search-dollar"></i>
                        <h3>Лучшие цены на рынке</h3>
                        <p>Собственная аналитика рынка позволяет предлагать оптимальные цены</p>
                    </div>
                    <div class="feature-card">
                        <i class="fas fa-headset"></i>
                        <h3>Поддержка 24/7</h3>
                        <p>Наши менеджеры всегда на связи и готовы ответить на ваши вопросы</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="popular-apartments">
            <div class="container">
                <h2>Популярные предложения</h2>
                <div id="popular-apartments-list" class="apartments-grid">
                    <!-- Квартиры будут загружены через JS -->
                </div>
            </div>
        </section>
    `;
   
    // Загружаем популярные квартиры
    loadPopularApartments();
   
    // Добавляем обработчик для кнопки "Смотреть каталог"
    const catalogBtn = document.querySelector('.go-to-catalog');
    if (catalogBtn) {
        catalogBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('catalog');
        });
    }
}
// Загрузка популярных квартир на главной
function loadPopularApartments() {
    const apartmentsContainer = document.getElementById('popular-apartments-list');
    if (!apartmentsContainer) return;
   
    apartmentsContainer.innerHTML = '';
   
    // Показываем только первые 4 квартиры на главной
    apartments.slice(0, 4).forEach(apartment => {
        const apartmentCard = createApartmentCard(apartment);
        apartmentsContainer.appendChild(apartmentCard);
    });
}
// Загрузка страницы каталога
function loadCatalogPage() {
    const mainContent = document.getElementById('main-content') || document.querySelector('main');
   
    if (!mainContent) return;
   
    mainContent.innerHTML = `
        <section class="page-header">
            <div class="container">
                <h1 class="page-title">Каталог квартир</h1>
                <p class="page-description">Выберите квартиру своей мечты из нашего обширного каталога. Более 100 вариантов в разных районах города.</p>
            </div>
        </section>
       
        <section class="catalog">
            <div class="container">
                <div class="catalog-filters">
                    <div class="filter-group">
                        <label for="min-price">Цена от:</label>
                        <input type="number" id="min-price" placeholder="0" min="0">
                    </div>
                    <div class="filter-group">
                        <label for="max-price">Цена до:</label>
                        <input type="number" id="max-price" placeholder="50000000" min="0">
                    </div>
                    <div class="filter-group">
                        <label for="min-rooms">Комнат от:</label>
                        <select id="min-rooms">
                            <option value="0">Любое</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4+</option>
                        </select>
                    </div>
                </div>
               
                <div id="catalog-apartments-list" class="apartments-grid">
                    <!-- Квартиры будут загружены через JS -->
                </div>
            </div>
        </section>
    `;
   
    // Загружаем все квартиры в каталог
    loadAllApartments();
    setupCatalogFilters();
}
// Загрузка всех квартир в каталог
function loadAllApartments() {
    const apartmentsContainer = document.getElementById('catalog-apartments-list');
    if (!apartmentsContainer) return;
   
    apartmentsContainer.innerHTML = '';
   
    // Фильтры
    const minPrice = document.getElementById('min-price') ? parseInt(document.getElementById('min-price').value) || 0 : 0;
    const maxPrice = document.getElementById('max-price') ? parseInt(document.getElementById('max-price').value) || Infinity : Infinity;
    const minRooms = document.getElementById('min-rooms') ? parseInt(document.getElementById('min-rooms').value) || 0 : 0;
   
    // Фильтруем квартиры
    const filteredApartments = apartments.filter(apartment => {
        return apartment.price >= minPrice &&
               apartment.price <= maxPrice &&
               apartment.rooms >= minRooms;
    });
   
    // Отображаем квартиры
    filteredApartments.forEach(apartment => {
        const apartmentCard = createApartmentCard(apartment);
        apartmentsContainer.appendChild(apartmentCard);
    });
   
    // Если нет квартир, показываем сообщение
    if (filteredApartments.length === 0) {
        apartmentsContainer.innerHTML = `
            <div class="empty-catalog" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #bdc3c7; margin-bottom: 20px;"></i>
                <h3>Квартиры не найдены</h3>
                <p>Попробуйте изменить параметры фильтрации</p>
            </div>
        `;
    }
}
// Загрузка страницы корзины
function loadCartPage() {
    const mainContent = document.getElementById('main-content') || document.querySelector('main');
   
    if (!mainContent) return;
   
    mainContent.innerHTML = `
        <section class="page-header">
            <div class="container">
                <h1 class="page-title">Корзина</h1>
                <p class="page-description">Оформление покупки недвижимости. Проверьте выбранные варианты и перейдите к оформлению.</p>
            </div>
        </section>
        <section class="cart">
            <div class="container">
                <div id="cart-container" class="cart-container">
                    <!-- Содержимое корзины будет загружено через JS -->
                </div>
            </div>
        </section>
    `;
   
    // Загружаем содержимое корзины
    renderCartContent();
}
// Рендер содержимого корзины
function renderCartContent() {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;
   
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Ваша корзина пуста</h3>
                <p>Добавьте квартиры из каталога, чтобы оформить покупку</p>
                <a href="#" class="btn-primary" data-page="catalog">Перейти в каталог</a>
            </div>
        `;
        return;
    }
   
    let cartHTML = '<div class="cart-items">';
    let totalPrice = 0;
   
    cart.forEach(item => {
        const apartment = apartments.find(a => a.id === item.id);
        if (apartment) {
            const itemTotal = apartment.price * item.quantity;
            totalPrice += itemTotal;
            const formattedPrice = new Intl.NumberFormat('ru-RU').format(apartment.price);
            const formattedTotal = new Intl.NumberFormat('ru-RU').format(itemTotal);
           
            cartHTML += `
                <div class="cart-item" data-id="${apartment.id}">
                    <img src="${apartment.image}" alt="${apartment.title}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4>${apartment.title}</h4>
                        <p>${apartment.address}</p>
                        <p>${apartment.rooms} комн., ${apartment.area} м²</p>
                    </div>
                    <div class="cart-item-quantity">
                        <span class="quantity">Количество: ${item.quantity}</span>
                    </div>
                    <div class="cart-item-price">
                        <div class="item-total">${formattedTotal} ₽</div>
                        <div class="item-price">${formattedPrice} ₽</div>
                    </div>
                    <button class="btn-danger remove-from-cart" data-id="${apartment.id}">Удалить</button>
                </div>
            `;
        }
    });
   
    cartHTML += `</div>`;
   
    const formattedTotalPrice = new Intl.NumberFormat('ru-RU').format(totalPrice);
   
    cartHTML += `
        <div class="cart-summary">
            <div class="cart-total">Итого: ${formattedTotalPrice} ₽</div>
            <button id="checkout-btn" class="btn-primary">Оформить покупку</button>
        </div>
    `;
   
    cartContainer.innerHTML = cartHTML;
   
    // Добавляем обработчики для кнопок в корзине
    document.querySelectorAll('.remove-from-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            removeFromCart(id);
        });
    });
   
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
}
// Загрузка страницы контактов
function loadContactsPage() {
    const mainContent = document.getElementById('main-content') || document.querySelector('main');
   
    if (!mainContent) return;
   
    mainContent.innerHTML = `
        <section class="page-header">
            <div class="container">
                <h1 class="page-title">Контакты</h1>
                <p class="page-description">Свяжитесь с нами удобным для вас способом. Мы всегда готовы ответить на ваши вопросы.</p>
            </div>
        </section>
       
        <section class="contacts">
            <div class="container">
                <div class="contacts-container">
                    <div class="contact-info">
                        <h3>Наши контакты</h3>
                        <p><i class="fas fa-phone"></i> +7 (999) 123-45-67</p>
                        <p><i class="fas fa-envelope"></i> info@prime-estate.ru</p>
                        <p><i class="fas fa-map-marker-alt"></i> г. Москва, ул. Центральная, д. 1</p>
                       
                        <h3 style="margin-top: 30px;">Часы работы</h3>
                        <p>Пн-Пт: 9:00 - 20:00</p>
                        <p>Сб: 10:00 - 18:00</p>
                        <p>Вс: 10:00 - 16:00</p>
                       
                        <h3 style="margin-top: 30px;">Социальные сети</h3>
                        <div class="social-icons">
                            <a href="#"><i class="fab fa-vk"></i></a>
                            <a href="#"><i class="fab fa-telegram"></i></a>
                            <a href="#"><i class="fab fa-whatsapp"></i></a>
                        </div>
                    </div>
                   
                    <div class="contact-form">
                        <h3>Обратная связь</h3>
                        <form id="contact-form">
                            <input type="text" placeholder="Ваше имя" required>
                            <input type="email" placeholder="Ваш email" required>
                            <input type="tel" placeholder="Ваш телефон">
                            <textarea placeholder="Ваше сообщение" required></textarea>
                            <button type="submit" class="btn-primary">Отправить сообщение</button>
                        </form>
                    </div>
                </div>
               
                <div class="map" style="margin-top: 40px; text-align: center;">
                    <h3>Мы на карте</h3>
                    <div style="height: 300px; background-color: #ddd; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-top: 20px;">
                        <p>Здесь будет карта</p>
                    </div>
                </div>
            </div>
        </section>
    `;
   
    // Настраиваем форму обратной связи
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
}
// Создание карточки квартиры
function createApartmentCard(apartment) {
    const card = document.createElement('div');
    card.className = 'apartment-card';
    card.dataset.id = apartment.id;
   
    // Форматирование цены
    const formattedPrice = new Intl.NumberFormat('ru-RU').format(apartment.price);
   
    // Проверяем, есть ли квартира в корзине
    const cartItem = cart.find(item => item.id === apartment.id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;
   
    let editButtons = '';
   
    if (currentUserRole === 'admin') {
        editButtons = `
            <button class="btn-danger remove-apartment" data-id="${apartment.id}">Удалить</button>
            <button class="btn-secondary edit-apartment" data-id="${apartment.id}">Редактировать</button>
        `;
    } else if (currentUserRole === 'manager') {
        editButtons = `
            <button class="btn-secondary edit-apartment" data-id="${apartment.id}">Редактировать</button>
        `;
    }
   
    card.innerHTML = `
        <img src="${apartment.image}" alt="${apartment.title}" class="apartment-img">
        <div class="apartment-info">
            <h3 class="apartment-title">${apartment.title}</h3>
            <p class="apartment-description">${apartment.description}</p>
            <div class="apartment-details">
                <span><i class="fas fa-bed"></i> ${apartment.rooms} комн.</span>
                <span><i class="fas fa-ruler-combined"></i> ${apartment.area} м²</span>
                <span><i class="fas fa-map-marker-alt"></i> ${apartment.address.split(',')[0]}</span>
            </div>
            <div class="apartment-price">${formattedPrice} ₽</div>
            <div class="apartment-actions">
                <button class="btn-primary add-to-cart" data-id="${apartment.id}">
                    <i class="fas fa-cart-plus"></i>
                    ${quantityInCart > 0 ? `В корзине: ${quantityInCart}` : 'Добавить в корзину'}
                </button>
                ${editButtons}
            </div>
        </div>
    `;
   
    return card;
}
// Настройка обработчиков событий
function setupEventListeners() {
    // Обработчики для модальных окон
    const paymentModal = document.getElementById('payment-modal');
    const editModal = document.getElementById('edit-apartment-modal');
   
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            if (editModal) editModal.style.display = 'none';
            if (paymentModal) paymentModal.style.display = 'none';
        });
    });
   
    // Кнопка "Продолжить покупки" в модальном окне оплаты
    const continueBtn = document.getElementById('continue-shopping');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            if (paymentModal) paymentModal.style.display = 'none';
            navigateTo('catalog');
        });
    }
   
    // Форма редактирования/добавления квартиры
    const apartmentForm = document.getElementById('apartment-form');
    if (apartmentForm) {
        apartmentForm.addEventListener('submit', handleApartmentFormSubmit);
    }
   
    // Обработчик кликов вне модального окна
    window.addEventListener('click', function(e) {
        if (editModal && e.target === editModal) {
            editModal.style.display = 'none';
        }
        if (paymentModal && e.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });
   
    // Делегирование событий для динамически созданных элементов
    document.addEventListener('click', function(e) {
        // Добавление в корзину
        if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
            const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
            const apartmentId = parseInt(button.dataset.id);
            addToCart(apartmentId);
        }
       
        // Удаление квартиры (для администратора)
        if (e.target.classList.contains('remove-apartment') || e.target.closest('.remove-apartment')) {
            const button = e.target.classList.contains('remove-apartment') ? e.target : e.target.closest('.remove-apartment');
            const apartmentId = parseInt(button.dataset.id);
            removeApartment(apartmentId);
        }
       
        // Редактирование квартиры
        if (e.target.classList.contains('edit-apartment') || e.target.closest('.edit-apartment')) {
            const button = e.target.classList.contains('edit-apartment') ? e.target : e.target.closest('.edit-apartment');
            const apartmentId = parseInt(button.dataset.id);
            openApartmentModal(apartmentId, false);
        }
    });
}
// Настройка навигации
function setupNavigation() {
    document.addEventListener('click', function(e) {
        // Обработка кликов по ссылкам навигации
        if (e.target.matches('.nav-link') || e.target.closest('.nav-link')) {
            e.preventDefault();
            const link = e.target.matches('.nav-link') ? e.target : e.target.closest('.nav-link');
            const href = link.getAttribute('href');
            let page = 'home';
           
            if (href === 'index.html' || href === '/' || href === '#') {
                page = 'home';
            } else if (href === 'catalog.html') {
                page = 'catalog';
            } else if (href === 'cart.html') {
                page = 'cart';
            } else if (href === 'contacts.html') {
                page = 'contacts';
            }
           
            navigateTo(page);
        }
       
        // Обработка кликов по кнопкам с data-page
        if (e.target.matches('[data-page]') || e.target.closest('[data-page]')) {
            e.preventDefault();
            const element = e.target.matches('[data-page]') ? e.target : e.target.closest('[data-page]');
            const page = element.getAttribute('data-page');
            navigateTo(page);
        }
    });
}
// Навигация между страницами
function navigateTo(page) {
    currentPage = page;
   
    // Обновляем URL без перезагрузки страницы
    const newUrl = page === 'home' ? 'index.html' : `${page}.html`;
    window.history.pushState({page: page}, '', newUrl);
   
    // Обновляем активные ссылки в навигации
    updateActiveNavLinks();
   
    // Загружаем контент страницы
    loadPageContent();
   
    // Обновляем заголовок страницы
    updatePageTitle();
   
    // Прокручиваем наверх
    window.scrollTo(0, 0);
}
// Обновление активных ссылок в навигации
function updateActiveNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
       
        if (currentPage === 'home' && (href === 'index.html' || href === '/' || href === '#')) {
            link.classList.add('active');
        } else if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}
// Обновление заголовка страницы
function updatePageTitle() {
    let title = 'Prime Estate';
   
    switch(currentPage) {
        case 'catalog':
            title = 'Каталог | ' + title;
            break;
        case 'cart':
            title = 'Корзина | ' + title;
            break;
        case 'contacts':
            title = 'Контакты | ' + title;
            break;
    }
   
    document.title = title;
}
// Настройка фильтров в каталоге
function setupCatalogFilters() {
    const filterInputs = document.querySelectorAll('.catalog-filters select, .catalog-filters input');
    filterInputs.forEach(input => {
        input.addEventListener('change', loadAllApartments);
        input.addEventListener('input', loadAllApartments);
    });
}
// Обновление интерфейса в зависимости от роли
function updateUserInterface() {
    const userSection = document.querySelector('.user-section');
    if (!userSection) return;

    userSection.innerHTML = ''; // очищаем

    const userSpan = document.createElement('span');
    userSpan.id = 'current-user';
    
    if (currentUserRole === 'guest') {
        userSpan.textContent = 'Гость';
        
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html';
        loginLink.className = 'btn-secondary';
        loginLink.style.marginLeft = '12px';
        loginLink.textContent = 'Войти';
        userSection.appendChild(loginLink);
    } else {
        userSpan.textContent = 
            currentUserRole === 'admin' ? 'Администратор' :
            currentUserRole === 'manager' ? 'Менеджер' : 'Пользователь';

        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'btn-danger';
        logoutBtn.style.marginLeft = '12px';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Выйти';
        
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('estateUserRole');
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        });

        userSection.appendChild(userSpan);
        userSection.appendChild(logoutBtn);
    }





    
   
    // Удаляем старую кнопку администратора
    const oldAdminBtn = document.getElementById('admin-panel-btn');
    if (oldAdminBtn) oldAdminBtn.remove();
   
    // Удаляем старую кнопку менеджера
    const oldManagerBtn = document.getElementById('manager-panel-btn');
    if (oldManagerBtn) oldManagerBtn.remove();
   
    // Добавляем новую кнопку администратора, если нужно
    if (currentUserRole === 'admin') {
        const adminBtn = document.createElement('button');
        adminBtn.className = 'btn-primary';
        adminBtn.id = 'admin-panel-btn';
        adminBtn.innerHTML = '<i class="fas fa-cog"></i> Панель администратора';
        adminBtn.style.marginLeft = '10px';
       
        const userSection = document.querySelector('.user-section');
        if (userSection) {
            userSection.appendChild(adminBtn);
           
            adminBtn.addEventListener('click', function() {
                openApartmentModal(null, true);
            });
        }
    }
   
    // Добавляем кнопку для менеджера
    if (currentUserRole === 'manager') {
        const managerBtn = document.createElement('button');
        managerBtn.className = 'btn-secondary';
        managerBtn.id = 'manager-panel-btn';
        managerBtn.innerHTML = '<i class="fas fa-edit"></i> Режим редактирования';
        managerBtn.style.marginLeft = '10px';
       
        const userSection = document.querySelector('.user-section');
        if (userSection) {
            userSection.appendChild(managerBtn);
           
            managerBtn.addEventListener('click', function() {
                alert('Вы в режиме редактирования. Нажмите кнопку "Редактировать" на карточке квартиры для внесения изменений.');
            });
        }
    }
   
    // Перезагружаем контент
    loadPageContent();
}
// Работа с корзиной
function addToCart(apartmentId) {
    const apartment = apartments.find(a => a.id === apartmentId);
    if (!apartment) return;
   
    // Проверяем, есть ли уже такая квартира в корзине
    const cartItem = cart.find(item => item.id === apartmentId);
   
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            id: apartmentId,
            quantity: 1
        });
    }
   
    // Обновляем счетчик в интерфейсе
    updateCartCount();
   
    // Сохраняем в localStorage
    saveToLocalStorage();
   
    // Обновляем карточку квартиры
    refreshApartmentCard(apartmentId);
   
    // Показываем уведомление
    showNotification(`"${apartment.title}" добавлена в корзину`);
}
function removeFromCart(apartmentId) {
    cart = cart.filter(item => item.id !== apartmentId);
   
    // Обновляем счетчик
    updateCartCount();
   
    // Сохраняем в localStorage
    saveToLocalStorage();
   
    // Обновляем карточку квартиры
    refreshApartmentCard(apartmentId);
   
    // Перезагружаем страницу корзины или обновляем каталог
    if (currentPage === 'cart') {
        renderCartContent();
    }
}
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}
// Обновление карточки квартиры
function refreshApartmentCard(apartmentId) {
    const apartment = apartments.find(a => a.id === apartmentId);
    if (!apartment) return;
   
    const apartmentCard = document.querySelector(`.apartment-card[data-id="${apartmentId}"]`);
    if (apartmentCard) {
        const newCard = createApartmentCard(apartment);
        apartmentCard.parentNode.replaceChild(newCard, apartmentCard);
    }
}
// Оформление покупки
function checkout() {
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }
   
    // Генерируем номер заказа
    const orderNumber = 'ORD-' + Date.now();
   
    // Показываем модальное окно успешной оплаты
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        document.getElementById('order-number').textContent = orderNumber;
        paymentModal.style.display = 'flex';
    }
   
    // Очищаем корзину
    cart = [];
    updateCartCount();
    saveToLocalStorage();
   
    // Обновляем все карточки квартир
    apartments.forEach(apartment => {
        refreshApartmentCard(apartment.id);
    });
   
    // Обновляем страницу корзины
    if (currentPage === 'cart') {
        renderCartContent();
    }
   
    // Показываем дополнительное уведомление
    showNotification('Покупка оформлена успешно!');
}
// Функции для администратора и менеджера
function openApartmentModal(apartmentId = null, isNew = false) {
    const modal = document.getElementById('edit-apartment-modal');
    if (!modal) {
        console.error("Модальное окно редактирования не найдено!");
        return;
    }

    const titleEl = document.getElementById('modal-title');
    const addBlock = document.getElementById('add-new-apartment-block');
    const submitBtn = document.getElementById('submit-apartment-btn');

    // Очищаем форму
    document.getElementById('apartment-form').reset();
    document.getElementById('apartment-id').value = '';

    if (isNew) {
        // Режим добавления
        titleEl.textContent = "Добавить новую квартиру";
        addBlock.style.display = 'block';
        submitBtn.textContent = "Добавить квартиру";
    } else {
        // Режим редактирования
        titleEl.textContent = "Редактирование квартиры";
        addBlock.style.display = 'none';
        submitBtn.textContent = "Сохранить изменения";

        const apartment = apartments.find(a => a.id === apartmentId);
        if (!apartment) return;

        document.getElementById('apartment-id').value = apartment.id;
        document.getElementById('apartment-title').value = apartment.title;
        document.getElementById('apartment-description').value = apartment.description;
        document.getElementById('apartment-price').value = apartment.price;
        document.getElementById('apartment-rooms').value = apartment.rooms;
        document.getElementById('apartment-area').value = apartment.area;
        document.getElementById('apartment-address').value = apartment.address;
        document.getElementById('apartment-image').value = apartment.image;
    }

    modal.style.display = 'flex';
}

function handleApartmentFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('apartment-id').value;
    const isNew = !id;

    const title = document.getElementById('apartment-title').value.trim();
    const description = document.getElementById('apartment-description').value.trim();
    const price = parseInt(document.getElementById('apartment-price').value);
    const rooms = parseInt(document.getElementById('apartment-rooms').value);
    const area = parseFloat(document.getElementById('apartment-area').value);
    const address = document.getElementById('apartment-address').value.trim();
    const image = document.getElementById('apartment-image').value.trim();

    if (!title || !description || !price || !rooms || !area || !address || !image) {
        alert('Заполните все поля!');
        return;
    }

    if (isNew) {
        // Добавление новой
        const newId = apartments.length > 0 ? Math.max(...apartments.map(a => a.id)) + 1 : 1;
        apartments.push({
            id: newId,
            title, description, price, rooms, area, address, image,
            inCart: 0
        });
        showNotification('Квартира успешно добавлена');
    } else {
        // Редактирование существующей
        const index = apartments.findIndex(a => a.id === Number(id));
        if (index !== -1) {
            apartments[index] = {
                ...apartments[index],
                title, description, price, rooms, area, address, image
            };
            showNotification('Изменения сохранены');
        }
    }

    // Закрываем модалку
    document.getElementById('edit-apartment-modal').style.display = 'none';

    // Обновляем отображение
    if (currentPage === 'catalog') loadAllApartments();
    if (currentPage === 'home') loadPopularApartments();

    saveToLocalStorage();
}

function removeApartment(apartmentId) {
    if (!confirm('Вы уверены, что хотите удалить эту квартиру из каталога?')) {
        return;
    }
   
    apartments = apartments.filter(a => a.id !== apartmentId);
   
    // Также удаляем из корзины, если есть
    cart = cart.filter(item => item.id !== apartmentId);
   
    // Обновляем интерфейс
    if (currentPage === 'catalog') {
        loadAllApartments();
    } else if (currentPage === 'home') {
        loadPopularApartments();
    }
   
    updateCartCount();
   
    // Сохраняем в localStorage
    saveToLocalStorage();
   
    showNotification('Квартира удалена из каталога');
}
// Вспомогательные функции
function showNotification(message) {
    // Удаляем предыдущие уведомления
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(notification => notification.remove());
   
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
   
    document.body.appendChild(notification);
   
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
// Работа с localStorage
function saveToLocalStorage() {
    localStorage.setItem('estateApartments', JSON.stringify(apartments));
    localStorage.setItem('estateCart', JSON.stringify(cart));
    localStorage.setItem('estateUserRole', currentUserRole);
}
function loadFromLocalStorage() {
    const savedApartments = localStorage.getItem('estateApartments');
    const savedCart = localStorage.getItem('estateCart');
    const savedRole = localStorage.getItem('estateUserRole');
   
    if (savedApartments) {
        apartments = JSON.parse(savedApartments);
    }
   
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
   
    if (savedRole) {
        currentUserRole = savedRole;
    }
}
// Обработка навигации через браузерные кнопки
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.page) {
        currentPage = e.state.page;
        loadPageContent();
        updatePageTitle();
        updateActiveNavLinks();
    } else {
        determineCurrentPage();
        loadPageContent();
        updatePageTitle();
        updateActiveNavLinks();
    }
});