
/*=============== API PRODUCT ===============*/
async function fetchProductData() {
  const sku = new URLSearchParams(window.location.search).get('sku');
  const url = `https://www.promart.pe/api/catalog_system/pub/products/search/?isAvailablePerSalesChannel_2:1&sc=2&fq=skuId:${sku}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Producto no encontrado');
    
    const data = await response.json();
    displayProduct(data[0],sku);
  } catch (error) {
    console.error(error);
    document.querySelector('.product__container-info').innerHTML = 'Error al cargar el producto';
  }
}

/*=============== SHOW INFO ===============*/
function displayProduct(product,sku) {
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.getElementById('thumbnails');
  const info__productTech = document.getElementById('info__product-tech');
  
  // Info
  document.getElementById('info__product-name').textContent = product.productName;
  document.getElementById('info__product-brand').textContent = product.brand;
  document.getElementById('info__product-sku').textContent = sku;

  document.getElementById('info__product-description').innerHTML = product.description || "Descripción no disponible";
  viewButton()

  document.getElementById('productPrice').textContent = `${product.items[0].sellers[0].commertialOffer.Price.toFixed(2)}`;
  document.getElementById('productListPrice').textContent = ` ${product.items[0].sellers[0].commertialOffer.ListPrice.toFixed(2)}`;
  document.getElementById('productCategory').textContent = product.categories[0]
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
    .replace(/\//g, ' - ')
    || "Categoría no disponible";



  // IMG THUMBNAIL
  const images = product.items[0].images;
  if (images.length > 0) {
    mainImage.src = images[0].imageUrl;
    images.forEach((img) => {
      const thumbnail = document.createElement('img');
      thumbnail.src = img.imageUrl;
      thumbnail.alt = "Vista del producto";
    
      thumbnail.onclick = () => {
        mainImage.src = img.imageUrl;    
        const allThumbnails = thumbnails.querySelectorAll('img');
        allThumbnails.forEach((thumb) => {
          thumb.classList.remove('active');
        });
        thumbnail.classList.add('active');
      };    
      thumbnails.appendChild(thumbnail);
      thumbnails.firstChild.classList.add('active');

    });
  } else {
    mainImage.alt = "Imagen no disponible";
  }
  
  // Tech specs
  const specifications = product.allSpecifications;
  info__productTech.innerHTML = '';  

  specifications.forEach((spec) => {
    const row = document.createElement('tr');
    const specName = document.createElement('th');
    const specValue = document.createElement('td');
    
    specName.textContent = spec;
    //URL
    if(spec.toLowerCase().includes("url") || spec.toLowerCase().includes("youtube")){
      const url = document.createElement('a');
      url.href = product[spec];
      url.target = "_blank";
      url.textContent = spec;
      url.classList.add('button');
      url.classList.add('button__pdf');
      specValue.appendChild(url);
    }else{
      specValue.textContent = product[spec] || 'No disponible';
    }

    row.appendChild(specName);
    row.appendChild(specValue);
    info__productTech.appendChild(row);
  });
}

/*=============== FULL DESCRIPTION ===============*/
function viewButton() {
  const descriptionText = document.getElementById('info__product-description');
  const viewMoreButton = document.getElementById('view_more-btn');
  if (descriptionText.scrollHeight > 120) {
      viewMoreButton.style.display = 'flex';
  } else {
      viewMoreButton.style.display = 'none';
  }
};

function fullText() {
  const description = document.getElementById('info__product-description');
  const button = document.getElementById('view_more-btn');

  const isExpanded = description.style.maxHeight === 'none' || description.style.maxHeight === `${description.scrollHeight}px`;

  if (isExpanded) {
    animateMaxHeight(description, description.scrollHeight, 120, () => {
      description.style.maxHeight = '120px';
      description.style.overflow = 'hidden';
    });
    button.textContent = 'Ver más...';
  } else {
    description.style.maxHeight = '120px';
    description.style.overflow = 'hidden';
    button.textContent = 'Ver menos...';
    setTimeout(() => {
      animateMaxHeight(description, 120, description.scrollHeight, () => {
        description.style.maxHeight = 'none';  // Esto asegura que el contenido se expanda completamente
      });
    }, 10);
  }
}
// Animation
function animateMaxHeight(element, startHeight, endHeight, callback) {
  let startTime = null;
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / 400, 1);
    element.style.maxHeight = `${startHeight + (endHeight - startHeight) * progress}px`;

    if (progress < 1) {
      requestAnimationFrame(animation);
    } else if (callback) {
      callback();
    }
  }
  requestAnimationFrame(animation);
}



fetchProductData();
