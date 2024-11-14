/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Menu show */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Menu hidden */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
  const header = document.getElementById("header");
  // Add a class if the bottom offset is greater than 50 of the viewport
  this.scrollY >= 5
    ? header.classList.add("blur-header")
    : header.classList.remove("blur-header");
};
window.addEventListener("scroll", blurHeader);
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
    if(!sectionsClass){return;}
		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SEARCH PRODUCT ===============*/
document
  .querySelector(".search__form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const sku = document.querySelector(".search__input").value.trim();
    const resultsContainer = document.getElementById("search-results");

    resultsContainer.innerHTML = "";

    if (sku) {
      const apiUrl = `https://proxy.cors.sh/https://www.promart.pe/api/catalog_system/pub/products/search/?sc=2&ft=${sku}`;

      try {
        const response = await fetch(apiUrl, {
          method: 'GET', 
          headers: {
            'x-cors-api-key': 'temp_3fd27284b3977180e2b9d6d104a438e4',
          }
        });
        const data = await response.json();

        if (data.length === 0) {
          resultsContainer.innerHTML = "<p>No se encontraron productos.</p>";
          document.getElementById("search-results").style.borderRight = '7px solid var(--title-color';
          return;
        }

        data.forEach((product) => {
          const { productName, brand, items } = product;
          const category = product.categories[0] || "Sin categoría";
          const imageUrl =
            items[0]?.images[0]?.imageUrl || "../img/img_product.png";
          const price =
            items[0]?.sellers[0]?.commertialOffer?.Price || "No disponible";

          const card = document.createElement("div");
          card.classList.add("results__card");

          card.innerHTML = `
                  <img src="${imageUrl}" alt="${productName}" width="190"  class="card__img">
                  <h3 class="card__title">${productName}</h3>
                  <p class="card__category">Categoría: 
                  ${
                    category.replace(/^\/+/, '')
                    .replace(/\/+$/, '')
                    .replace(/\//g, ' - ')
                  }</p>
                  <div class="category__title"><p>Categorías: 
                  ${
                    category.replace(/^\/+/, '')
                    .replace(/\/+$/, '')
                    .replace(/\//g, ' - ')
                  }</p></div>
                  <p class="card__brand">Marca: <strong>${brand}</strong></p>
                  <p class="card__price">S/. ${price.toFixed(2)}</p>
                  <a class="button view__button" href="./product.html?sku=${items[0].itemId}">Ver detalles</a>
              `;

          resultsContainer.appendChild(card);
        });
        document.getElementById("search-results").style.borderRight = 'none';

      } catch (error) {
        resultsContainer.innerHTML =
          "<p>Error al cargar los productos. Inténtelo de nuevo más tarde.</p>";
        console.error("Error al obtener los productos:", error);
        document.getElementById("search-results").style.borderRight = '7px solid var(--title-color';
      }
    } else {
      resultsContainer.innerHTML = "<p>Por favor, ingrese un SKU válido.</p>";
      document.getElementById("search-results").style.borderRight = '7px solid var(--title-color';
    }
  });


/*=============== FUNCTIONS ===============*/