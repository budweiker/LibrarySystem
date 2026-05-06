/* ═══════════════════════════════════════════════════════════════
   CLASES POO — según diagrama UML
═══════════════════════════════════════════════════════════════ */

// Clase Book
class Book {
  constructor(bookId, bookName, price, autor, editorial, categoria, year, coverImage) {
    this.bookId = bookId;
    this.bookName = bookName;
    this.price = price;
    this.autor = autor;
    this.editorial = editorial;
    this.categoria = categoria;
    this.year = year;
    this.coverImage = coverImage;
  }
}

// Clase Basket
class Basket {
  constructor() {
    this.products = [];
    this.total = 0;
  }

  addProducts(prod, cant = 1) {
    const existing = this.products.find(item => item.book.bookId === prod.bookId);
    if (existing) {
      existing.cantidad += cant;
    } else {
      this.products.push({ book: prod, cantidad: cant });
    }
    this.updateBasket();
  }

  deleteProduct(id) {
    this.products = this.products.filter(item => item.book.bookId !== id);
    this.updateBasket();
  }

  calTtotal() {
    return this.products.reduce((sum, item) => sum + (item.book.price * item.cantidad), 0);
  }

  updateBasket() {
    this.total = this.calTtotal();
    renderCart();
  }

  emptyCar() {
    this.products = [];
    this.total = 0;
    this.updateBasket();
  }

  updateQuantity(id, delta) {
    this.products = this.products.map(item => {
      if (item.book.bookId === id) {
        item.cantidad += delta;
      }
      return item;
    }).filter(item => item.cantidad > 0);
    this.updateBasket();
  }
}

// Clase Shop
class Shop {
  constructor(storeName) {
    this.storeName = storeName;
    this.catalog = [];
    this.sortCatalog = [];
  }

  loadCatalog() {
    this.catalog = [
      new Book(1, "El Quijote", 72000, "Miguel de Cervantes", "Planeta", "Clásicos", 1605,
        "https://images.unsplash.com/photo-1467688695332-6b486449d78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"),
      new Book(2, "Cien Años de Soledad", 89000, "Gabriel García Márquez", "Sudamericana", "Novela", 1967,
        "https://images.unsplash.com/photo-1766946405830-72b3b2494cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"),
      new Book(3, "Harry Potter", 98000, "J.K. Rowling", "Bloomsbury", "Fantasía", 1997,
        "https://images.unsplash.com/photo-1656878564120-ab988c47f0b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"),
      new Book(4, "El Señor de los Anillos", 115000, "J.R.R. Tolkien", "Minotauro", "Fantasía", 1954,
        "https://images.unsplash.com/photo-1773518011746-4f1c46ddced1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"),
      new Book(5, "1984", 62000, "George Orwell", "Destino", "Distopía", 1949,
        "https://images.unsplash.com/photo-1622609184693-58079bb6742f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"),
      new Book(6, "El Principito", 48000, "Antoine de Saint-Exupéry", "Gallimard", "Clásicos", 1943,
        "https://images.unsplash.com/photo-1570654282300-9e8952986614?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"),
      new Book(7, "Dune", 105000, "Frank Herbert", "Chilton Books", "Ciencia Ficción", 1965,
        "https://images.unsplash.com/photo-1660251146550-40e7c9d841b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"),
      new Book(8, "La Odisea", 65000, "Homero", "Gredos", "Clásicos", -800,
        "https://images.unsplash.com/photo-1648020265476-31c80a939ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"),
      new Book(9, "Fahrenheit 451", 58000, "Ray Bradbury", "Ballantine", "Distopía", 1953,
        "https://images.unsplash.com/photo-1711653758220-cb95461f3097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"),
      new Book(10, "El Hobbit", 79000, "J.R.R. Tolkien", "George Allen", "Fantasía", 1937,
        "https://images.unsplash.com/photo-1719620188434-7c4457b044cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"),
      new Book(11, "Fundación", 75000, "Isaac Asimov", "Gnome Press", "Ciencia Ficción", 1951,
        "https://images.unsplash.com/photo-1767188789510-47ff93f25133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"),
      new Book(12, "Crimen y Castigo", 68000, "Fiódor Dostoyevski", "Cátedra", "Clásicos", 1866,
        "https://images.unsplash.com/photo-1709370707115-ab74e0c75199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"),
    ];
    return this.catalog;
  }

  sortByCategory(cat) {
    if (cat === "Todos") {
      this.sortCatalog = this.catalog;
    } else {
      this.sortCatalog = this.catalog.filter(book => book.categoria === cat);
    }
    return this.sortCatalog;
  }
}

/* ═══════════════════════════════════════════════════════════════
   ESTADO GLOBAL
═══════════════════════════════════════════════════════════════ */

const CATEGORIES = ["Todos", "Clásicos", "Novela", "Fantasía", "Distopía", "Ciencia Ficción"];

const shop = new Shop("BookHaven");
const basket = new Basket();

let activeCategory = "Todos";
let searchQuery = "";
let mobileCartOpen = false;

/* ═══════════════════════════════════════════════════════════════
   UTILIDADES
═══════════════════════════════════════════════════════════════ */

function formatCOP(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function getFilteredBooks() {
  let filtered = shop.sortByCategory(activeCategory);
  
  if (searchQuery) {
    filtered = filtered.filter(book =>
      book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.autor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return filtered;
}

/* ═══════════════════════════════════════════════════════════════
   RENDER FUNCIONES
═══════════════════════════════════════════════════════════════ */

function renderFilters() {
  const filterBar = document.getElementById('filter-bar');
  filterBar.innerHTML = '';
  
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === activeCategory ? ' active' : '');
    btn.setAttribute('data-categoria', cat);
    
    if (cat !== "Todos") {
      btn.innerHTML = `
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
          <line x1="7" y1="7" x2="7.01" y2="7"></line>
        </svg>
        ${cat}
      `;
    } else {
      btn.textContent = cat;
    }
    
    btn.addEventListener('click', () => {
      activeCategory = cat;
      renderFilters();
      renderCatalog();
    });
    
    filterBar.appendChild(btn);
  });
}

function renderCatalogInfo() {
  const catalogInfo = document.getElementById('catalog-info');
  const filtered = getFilteredBooks();
  
  const count = filtered.length;
  const plural = count !== 1 ? 's' : '';
  let html = `<strong>${count}</strong> libro${plural}`;
  
  if (activeCategory !== "Todos") {
    html += ` en <strong style="color: #8b4513">${activeCategory}</strong>`;
  }
  
  catalogInfo.innerHTML = html;
}

function renderCatalog() {
  const catalogGrid = document.getElementById('catalog');
  const emptyState = document.getElementById('empty-state');
  const filtered = getFilteredBooks();
  
  renderCatalogInfo();
  
  if (filtered.length === 0) {
    catalogGrid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }
  
  catalogGrid.style.display = 'grid';
  emptyState.style.display = 'none';
  catalogGrid.innerHTML = '';
  
  filtered.forEach(book => {
    const card = createBookCard(book);
    catalogGrid.appendChild(card);
  });
}

function createBookCard(book) {
  const article = document.createElement('article');
  article.className = 'book-card';
  article.setAttribute('data-book-id', book.bookId);
  article.setAttribute('data-categoria', book.categoria);
  
  const yearDisplay = book.year < 0 ? `${Math.abs(book.year)} a.C.` : book.year;
  
  article.innerHTML = `
    <div class="book-cover">
      <img src="${book.coverImage}" alt="Portada de ${book.bookName}" 
           onerror="this.parentElement.innerHTML='<div class=\\'cover-fallback\\'><svg width=\\'48\\' height=\\'48\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'#c4a882\\' stroke-width=\\'2\\'><path d=\\'M4 19.5A2.5 2.5 0 0 1 6.5 17H20\\'></path><path d=\\'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\\'></path></svg></div>'">
      <div class="cover-overlay"></div>
      <span class="category-badge">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
          <line x1="7" y1="7" x2="7.01" y2="7"></line>
        </svg>
        ${book.categoria}
      </span>
    </div>
    <div class="book-info">
      <h3 class="book-title">${book.bookName}</h3>
      <p class="book-author">${book.autor}</p>
      <p class="book-meta">${book.editorial} · ${yearDisplay}</p>
      <div class="book-footer">
        <div>
          <span class="book-price-label">Precio</span>
          <p class="book-price">${formatCOP(book.price)}</p>
        </div>
        <button class="add-to-cart-btn" data-book-id="${book.bookId}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Agregar
        </button>
      </div>
    </div>
  `;
  
  const addBtn = article.querySelector('.add-to-cart-btn');
  addBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    basket.addProducts(book);
    
    addBtn.classList.add('added');
    addBtn.innerHTML = '✓ Listo';
    
    if (window.innerWidth < 1024) {
      openMobileCart();
    }
    
    setTimeout(() => {
      addBtn.classList.remove('added');
      addBtn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Agregar
      `;
    }, 1400);
  });
  
  return article;
}
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  const cartFooter = document.getElementById('cart-footer');
  const cartCount = document.getElementById('cart-count');
  const cartCountMobile = document.getElementById('cart-count-mobile');
  const cartTotal = document.getElementById('cart-total');
  const subtotalLabel = document.getElementById('subtotal-label');
  const subtotalValue = document.getElementById('subtotal-value');
  
  const totalItems = basket.products.reduce((sum, item) => sum + item.cantidad, 0);
  const total = basket.calTtotal();
  
  // Actualizar badges de contador
  if (totalItems > 0) {
    cartCount.style.display = 'block';
    cartCount.textContent = `${totalItems} ítem${totalItems !== 1 ? 's' : ''}`;
    cartCountMobile.style.display = 'flex';
    cartCountMobile.textContent = totalItems;
  } else {
    cartCount.style.display = 'none';
    cartCountMobile.style.display = 'none';
  }
  
  // Mostrar/ocultar secciones
  if (basket.products.length === 0) {
    cartItemsContainer.innerHTML = '';
    cartEmpty.style.display = 'flex';
    cartFooter.style.display = 'none';
  } else {
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'flex';
    
    // Renderizar items
    cartItemsContainer.innerHTML = '';
    basket.products.forEach(item => {
      const cartItem = createCartItem(item);
      cartItemsContainer.appendChild(cartItem);
    });
    
    // Actualizar totales
    subtotalLabel.textContent = `Subtotal (${totalItems} ítem${totalItems !== 1 ? 's' : ''})`;
    subtotalValue.textContent = formatCOP(total);
    cartTotal.textContent = formatCOP(total);
  }
}

function createCartItem(item) {
  const div = document.createElement('div');
  div.className = 'cart-item';
  div.setAttribute('data-book-id', item.book.bookId);
  
  const subtotal = item.book.price * item.cantidad;
  
  div.innerHTML = `
    <div class="cart-item-cover">
      <img src="${item.book.coverImage}" alt="${item.book.bookName}"
           onerror="this.parentElement.innerHTML='📖'">
    </div>
    <div class="cart-item-info">
      <p class="cart-item-title">${item.book.bookName}</p>
      <p class="cart-item-price">${formatCOP(item.book.price)}</p>
      <p class="cart-item-subtotal">Subtotal: ${formatCOP(subtotal)}</p>
    </div>
    <div class="cart-item-controls">
      <button class="qty-btn plus" data-book-id="${item.book.bookId}" data-action="increase">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6b3a1f" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      <span class="qty-display">${item.cantidad}</span>
      <button class="qty-btn minus" data-book-id="${item.book.bookId}" data-action="decrease">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6b3a1f" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
    <button class="delete-btn" data-book-id="${item.book.bookId}" title="Eliminar del carrito">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </button>
  `;
  
  // Event listeners para controles
  const increaseBtn = div.querySelector('[data-action="increase"]');
  const decreaseBtn = div.querySelector('[data-action="decrease"]');
  const deleteBtn = div.querySelector('.delete-btn');
  
  increaseBtn.addEventListener('click', () => {
    basket.updateQuantity(item.book.bookId, 1);
  });
  
  decreaseBtn.addEventListener('click', () => {
    basket.updateQuantity(item.book.bookId, -1);
  });
  
  deleteBtn.addEventListener('click', () => {
    basket.deleteProduct(item.book.bookId);
  });
  
  return div;
}

/* ═══════════════════════════════════════════════════════════════
   CARRITO MÓVIL
═══════════════════════════════════════════════════════════════ */

function openMobileCart() {
  if (window.innerWidth < 1024) {
    mobileCartOpen = true;
    document.getElementById('cart-panel').classList.add('open');
    document.getElementById('cart-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileCart() {
  mobileCartOpen = false;
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════════════════════════
   EVENT LISTENERS GLOBALES
═══════════════════════════════════════════════════════════════ */

function initEventListeners() {
  // Búsqueda
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderCatalog();
  });
  
  // Toggle carrito móvil
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  cartToggleBtn.addEventListener('click', () => {
    if (mobileCartOpen) {
      closeMobileCart();
    } else {
      openMobileCart();
    }
  });
  
  // Cerrar carrito móvil
  const cartCloseBtn = document.getElementById('cart-close-btn');
  cartCloseBtn.addEventListener('click', closeMobileCart);
  
  // Overlay del carrito
  const cartOverlay = document.getElementById('cart-overlay');
  cartOverlay.addEventListener('click', closeMobileCart);
  
  // Vaciar carrito
  const emptyCartBtn = document.getElementById('empty-cart-btn');
  emptyCartBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      basket.emptyCar();
    }
  });
  
  // Checkout
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.addEventListener('click', () => {
    if (basket.products.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    
    const total = basket.calTtotal();
    const itemCount = basket.products.reduce((sum, item) => sum + item.cantidad, 0);
    
    alert(`¡Procediendo al pago!\n\nTotal de ítems: ${itemCount}\nTotal a pagar: ${formatCOP(total)}\n\n(Esta es una demostración)`);
  });
  
  // Responsive: cerrar carrito móvil al redimensionar a desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && mobileCartOpen) {
      closeMobileCart();
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   INICIALIZACIÓN
═══════════════════════════════════════════════════════════════ */

function init() {
  // Cargar catálogo
  shop.loadCatalog();
  shop.sortByCategory(activeCategory);
  
  // Renderizar UI inicial
  renderFilters();
  renderCatalog();
  renderCart();
  
  // Inicializar event listeners
  initEventListeners();
  
  console.log('✅ BookHaven inicializado correctamente');
  console.log('📚 Catálogo cargado:', shop.catalog.length, 'libros');
  console.log('🛒 Carrito inicializado');
}

// Iniciar aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* ═══════════════════════════════════════════════════════════════
   EXPORTAR PARA TESTING (opcional)
═══════════════════════════════════════════════════════════════ */

// Exponer clases y estado global para pruebas en consola
window.BookHaven = {
  Book,
  Basket,
  Shop,
  shop,
  basket,
  formatCOP,
  // Funciones útiles para debugging
  getState: () => ({
    activeCategory,
    searchQuery,
    cartItems: basket.products.length,
    cartTotal: basket.calTtotal(),
    catalogSize: shop.catalog.length
  })
};
