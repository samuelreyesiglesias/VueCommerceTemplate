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
            {{product.name}} <br>
            {{product.name.toUpperCase()}} {{product.stock ===0 ? 'Agotado' : ''}}
        </h4>
        
        <badge :product="product"></badge>
        
        <p class="description__status" v-if="product.stock===3">Quedan pocas unidades</p>
            <p class="description__status" v-else-if="product.stock===2">El producto esta por terminarse</p>
                <p class="description__status" v-else-if="product.stock===1">Ultima unidad disponible</p>
                    <p class="description__price">{{product.name}}</p>
                    <p class="description__ceontnt">
                        Loren ipsum dolor sit amet.
                    </p>
                    <div class="discount">
                        <span>Codigo De Descuento:</span>
                        <input type="text" placeholder="Ingrese Codigo" @keyup.enter="ApplyDiscount($event);">
                    </div>
                    <button :disabled="product.stock===0" class="add-to-cart" @click="addToCart();">Agregar al carro</button>
    </section>
    `,
    data() {
        return {
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
                quantity: 1,
            },
            activeImage: 1,
            discountCodes: ["CODE1", "CODE2"]
        }
    },
    methods: {
        ApplyDiscount(event) {
            const discountcodeindex = this.discountCodes.indexOf(event.target.value);
            if (discountcodeindex >= 0) {
                this.product.price -= this.product.price * 0.05;
                this.discountCodes.splice(discountcodeindex, 1);
            }
        },
        addToCart() {
            const prodIndex = this.cart.findIndex(product => product.name == this.product.name);
            if (prodIndex >= 0) {
                this.cart[prodIndex].quantity += 1;
            } else {
                this.cart.push(this.product);
            }
            this.product.stock -= 1;
        }
    }
});