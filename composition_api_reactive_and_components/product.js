app.component("product", {
    template: `
        <section class="product">
                        <div class="product__thumbnails">
                            <div v-for="(image,index) in product.images" :key="image.thumbnail" class="thumb" :class="{active : activeImage==index}" :style="{backgroundImage: 'url('+image.thumbnail+')'}" @click="activeImage=index">
                            </div>
                            <div class="product__image">
                                <img :src="product.images[activeImage].image" :alt="product.name" width="500">
                            </div>
                        </div>
                    </section>
                    <section class="description">
                        <h4>
                            {{product.name.toUpperCase()}} {{product.stock ===0 ? 'Agotado' : ''}}
                        </h4>
                        <span class="bagge new" v-if="product.new">Nuevo</span>
                        <span class="badge offer" v-if="product.offer">Oferta</span>
                        <p class="description__status" v-if="product.stock===3">Quedan pocas unidades</span>
                            <p class="description__status" v-else-if="product.stock===2">El producto esta por terminarse</span>
                                <p class="description__status" v-else-if="product.stock===1">Ultima unidad disponible</span>
                                    <p class="description__price">${new Intl.NumberFormat("en-EN").format(product.price)}</p>
                                    <p class="description__ceontnt">
                                        Loren ipsum dolor sit amet,
                                    </p>
                                    <div class="discount">
                                        <span>Codigo De Descuento:</span>
                                        <input type="text" placeholder="Ingrese Codigo" @keyup.enter="applyDiscount($event)">
                                    </div>
                                    <button :disabled="product.stock===0" class="add-to-cart" @click="addToCart();">Agregar al carro</button>
                    </section>
        `,
    props: ["product"],
    setup(props) {
        const productState = reactive({
            product: {
                name: "Laptop Hp",
                price: 540,
                stock: 5,
                content: "lorem ipsum dolor",
                images: [{
                    image: "./images/laptop.jpg",
                    thumbnail: "./images/laptop-thumb.jpg"
                }, {
                    image: "./images/laptop2.jpg",
                    thumbnail: "./images/laptop2-thumb.jpg"
                }, {
                    image: "./images/laptop3.jpg",
                    thumbnail: "./images/laptop3-thumb.jpg"
                }, {
                    image: "./images/laptop4.jpg",
                    thumbnail: "./images/laptop4-thumb.jpg"
                }],
                new: true,
                offer: true,
                quantity: 0
            },
            activeImage: 0,
        });

        function addToCart() {
            cartState.cartOpen = true;
            const prodIndex = cartState.cart.findIndex(prod => prod.name == props.product.name);
            if (prodIndex >= 0) {
                cartState.cart[prodIndex].quantity += 1;
            } else {
                cartState.cart.push(props.product);
            }
            props.product.stock -= 1;
        }

        const discountCodes = ref(["CODE1", "CODE2"]);

        function applyDiscount(event) {
            const discountCodeIndex = cartState.discountCodes.indexOf(event.target.value);
            if (discountCodeIndex >= 0) {
                props.product.price *= 50 / 100;
                cartState.discountCodes.splice(discountCodeIndex, 1);
            }
        }




        return {
            ...toRefs(productState),
            addToCart,
            applyDiscount
        }


    }
})