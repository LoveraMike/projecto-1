const number = 123456.789;

new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number);


const btnCart = document.querySelector('.container-cart-icon')
const containerCartProducts = document.querySelector ('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

/*_______________________---*/

const cartInfo = document.querySelector ('.cart-product')
const rowProduct = document.querySelector ('.row-product')

//lista

const productList = document.querySelector ('.container-items')

let allProducts = [];

const valorTotal = document.querySelector('.total-pagar')

const countProducts = document.querySelector('#contador-productos')




productList.addEventListener('click', e => {
    if(e.target.classList.contains('btn-add-cart')) {
       const product = e.target.parentElement

       const infoProduct = {
        quantity: 1,
        title: product.querySelector('h2').textContent,
        price: product.querySelector('p').textContent,
       }

       const exists = allProducts.some(product => product.title === infoProduct.title)

       if (exists) {
        const products = allProducts.map(product => {
            if(product.title === infoProduct.title) {
                product.quantity++;
                return product
            } else {
                return product
            }
        })
        allProducts = [...products]
       } else {
        allProducts = [...allProducts, infoProduct]
       }

       showHTML();
    }

   
});


rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement.parentElement;
        const title = product.querySelector('p').textContent;

        const existingProduct = allProducts.find((product) => product.title === title);
        if (existingProduct) {
            if (existingProduct.quantity > 1) {
                existingProduct.quantity--;
            } else {
                allProducts = allProducts.filter((product) => product.title !== title);
            }

            showHTML();
        }
    }
});



const showHTML = () => { 
    

    rowProduct.innerHTML = '';

    let total = 0
    let totalOfProducts = 0;


    allProducts.forEach(product => {
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')

        containerProduct.innerHTML = `
     <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.quantity}</span>
        <p class="titulo-producto-carrito">${product.title}</p>
        <span class="precio-producto-carrito">${product.price}</span>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
        
      `;

    rowProduct.append(containerProduct);

    product.price = product.price.replace(/\./g, '');
    
    total = total + parseInt(product.quantity * product.price.slice(2));
    totalOfProducts = totalOfProducts + product.quantity;
    

});

    valorTotal.innerText = `₲${total}`
    countProducts.innerText = totalOfProducts;


};