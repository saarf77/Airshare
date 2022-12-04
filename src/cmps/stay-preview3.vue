<template>
    <section class="stay-preview">
        <div @click="setLiked" class="like">
            <span ><svg :class="{ liked: isLiked }" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                    focusable="false"
                    style="display: block; fill:rgba(0, 0, 0, 0.5) ; height: 24px; width: 24px; stroke: white; stroke-width: 2; overflow: visible;">
                    <path
                        d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z">
                    </path>
                </svg>
            </span>
        </div>

        <el-carousel @click="showStayDetails" trigger="click" :autoplay="false">
            <el-carousel-item v-for="img in imgs" :key="img">
                <div class="img-wrapper">
                    <img :src="img" />
                </div>
            </el-carousel-item>
        </el-carousel>
        <!-- <img src='https://res.cloudinary.com/ddt1fjmim/image/upload/v1669798080/001_pxpfis.jpg' -->
        <div class="content">
            <div class="location-info flex justify-space-between">
                <span>{{ stay.loc.city }},{{ stay.loc.country }}</span>
                <span class="stared">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                        focusable="false" style="display: block; height: 14px; width: 14px; fill: currentcolor;">
                        <path
                            d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                            fill-rule="evenodd"></path>
                    </svg>
                    {{ stay.rate }}
                </span>
            </div>
            <div class="name-rooms">
                <div>{{ stay.name }}</div>
                <div>{{ stay.rooms }} rooms, {{ stay.beds }} beds</div>
            </div>
            <div class="price">
                <span class="currency">${{ stay.price }}</span>
                <span>night</span>
            </div>
        </div>
        <!-- <div class="content" style="padding: 14px">
            <span>Stay Name: {{ stay.name }}</span>
            <span> Price: {{ stay.price }}$</span>
            <div class="bottom">
                <time class="time">{{ currentDate }}</time>
                <el-button @click="goToEdit" text class="button edit">edit</el-button>
                <el-button @click="goToDetail" text class="button details">details</el-button>
                <el-button @click="removeStay(stay._id)" text class="button delete">delete</el-button>
            </div>
        </div> -->
    </section>
</template>
    
<script>
// import { ref } from 'vue'
export default {
    name: 'stay-preview3',
    props: {
        stay: Object,

    },
    data() {
        return {
            isLiked: false,
            imgs: [],
            url: '',
            item: 'https://res.cloudinary.com/ddt1fjmim/image/upload/v1669798080/001_pxpfis.jpg'
        }
    },
    components: {
        // customCard,
    },
    created() {
        console.log(this.stay)
        this.stay.imgUrls
            .map(img => {
                // this.imgs.push(new URL(`${img}`, import.meta.url))
                this.imgs.push(img)
                console.log(this.imgs)
            })

        // new URL(`${stay.imageUrl}`, import.meta.url)
    },
    methods: {
        setLiked(){
            this.isLiked = !this.isLiked
        },
        showStayDetails() {
            this.$router.push('/stay/' + this.stay._id);
        },
        imageUrl(name) {
            return new URL(`/src/img/${name}.jpg`, import.meta.url)
        },
        goToDetail() {
            this.$router.push(`/stay/${this.stay._id}`)
        },
        goToEdit() {
            this.$router.push(`/stay/edit/${this.stay._id}`)
        },
        removeStay(stayId) {
            this.$emit('removeStay', stayId)
        },
    },
    // created(){
    //   if(this.stay.name === 'Tanks') this.url = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgWFRcZGBgaGhwfGhwaGB4cHRwjIRwaHBkfHhwhIy4lHCErJB4YJjgmKzAxNTU1HCQ7QD41Py40NTEBDAwMEA8QHxISHzQrISw0NDQ0MTQ0NDQ0NDY0NjY0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xABGEAACAQIEAwUEBggDBgcAAAABAgADEQQSITEFBkETIlFhcTKBkaEHFEJSsdEVI0NTksHh8GKC8RczcpOy0hY0RGOj0+L/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgEDBP/EACARAQEBAAIDAQEBAQEAAAAAAAABAhEhAxIxQRNRkTL/2gAMAwEAAhEDEQA/AOzREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERED5Oec0/SKmHfJTsbbt/Pa1pfq6kqwBsSCAfA20n5/5k4O1ZENJQKyF1rIzBWvfQjMQNBp7pFvcHS+VOdhiDZyLHrsRsNbaEajoLC56GXqcA4Jwt6CpQJtUqElyNVRSpFr9SQTt4y/cl8yOjfU8WbMNKbnZhsBf4AeenhE13wOhRESwiJocZxhoYetWAuadN3A8cqlrbjwgb8Smclc5jHE0ytnVMxNso3AsVubHXoT7pc4CIiAiIgIiICIiAiIgIiICIiAiIgIiICIiB8kBxvlahiWLlctS1g6kjba9jLBPkywcJ49wvE0KuRb2Q6BbgdbEgnW4vY+syPiKlWmC4syHW2rW6H8dOvradg4twta6EGwa1gbXHoR1H4bixnKOMcPOFqkDTqUO9j1GwYHy0PkRpzs9W8crfyhzXmy0K7a2GRz9roAx8el/cdZepwGvUzvZAbCzOBrlO2nmfncX13u/AeeSgSniBmFtKgOpG2xHet7j46jWs38ZXSJW+ZuJUGV8I9QI9Wi5VjfIBYjvNsL2OnUAyQ4vhPrWGqU0cp2qEK69Mw0PS4/lOOcf5PxOBoIXqK9LNZmRmApszAKApIJXrcDc7aa2N3kfiWH4a9RsQWZ3yqGXZRuwIJBOuU3AO2kvdP6RuHNp2/xR/8AtnB3zJUyBhe4syd6+YAjQ9dR6G4lmpcsY9iv6rEnUaNTCDfW5LiaO/g3nqVfmDmBsI+GphA3a6MddLFAdv8AiOss8nkfYiJoT5IHEc24JHam2ITOpYMoPeBW9x66GaVPnnDsQqq5JtsUJ3A2Dk+fuk3Un6LXPsjqfGaDOqLVQs2wB1OhP4AyRmhERNCIiAiIgIiICIiAiIgIiICRnGOEpiEyuBcaqSL2Pp1B6j8DYiTiBxbieB+r1WCaZSQ6DUbA3XoQQRppcHodq9xCuqgv0N9D8rX/AL9869zbyguL/WU3NGuBbOACrDoHU6G3Q7+uk5PxHlLEo+Woe0ddct0QDwJGbbz2nOSZ+1muavP0a8eqlexqglSgenbUjLlDKPW4a3r4y78SbD1KP6/I9Fsp7wurdV067X90qHI/BzRQvVdWdhYZGDKgB1GYaE3Avba0g+YMe1am2GpXZlxDVKZDWLK+dio8wXBtpoZM8ndX62Scud8fwr0q9ipBzEqwGjKGsrDW/Tradw4DwPiKVUfEY5aiA3ZFRjm0ItdjoNQbgdJyHi3DKlh261k0sCV0NyerHUb6i4nZqXN+FpUKRd7Eogy3AIOQNu2UN4XHWXNSztKrfSJiqtHFBr1CjoLCmEaw1Ug59rm+gvOg8vNfDUbuHPZqCwbMGIABObqbjXzvOec68wiqc2HsyNTyu7C1grB7pf2rhul73uL2uLzy89GjhqSCouiBjmdbjN3jf3sZmf8A1RORIbjnMNHDUWqsQ4GUWRgScxsNunnKz/tTw/7up/ful8s5ig86CscRXKhCtOrVZb6tqzFra90a6gWuQCddZXWr1VZQSli32QegJ8dtJ2bAc5YfGu2HakQjpUDsWtZQhLXsARdc2oM4/QwQp4hXID0lqXYB6YzIHOisGzar1Kg69JFkPq5fR9Xz4mmx++Ba1rHI1wB4XJnaJDcEwOF7NKtCjSQOoIKKl9vvLvba4MmZWZxGkREoIiICIiAiIgIiICIiAiIgIiIHyVDmnimCzilXKNUW36t6Ye+axAsdjsbg9eskuJcbo5a9MP8ArERhl1DEnujL1PeKi46mV/hvDaOGRWxBRq2jM7KpYG1gqWF7KNBb16znvUk4+qkv4i+ZeN1lpZEoimhXTzTYlRYCw0uBtcdN6H27BswYsDqxvZgR9oHoR4+4zp3FOMUayZBTZw2oY93KdRmHW/8AI+6cz45gXoPlIup1BAsD+R8j/Wcc2fG6vP6uHDOJ0sTQajUANUKTTqg2zW11B0zeI/1m7hqKU8MKrVAALk5wrWt3dO7mHTY+6cww9Uo1wbLcG19QehW/UeJ9DL1g+KLWQIqorWAW4uM2tiR1Um1/f6RerylPU6CVaVN1sLqGvaxNxfXXf8pssgC2AUaeLAepAOspeG4pjlCKaVEIXy91ttTmNra2sT7pNPXLWDXtfUDr/SZrXrRGca4S9QMudcrMCcgDXI2voD8TIGpytWHsm/qhH/SWMuuIYPbvsPIJoLbWGfaYVpKdM596afJjM/tU3KlYTDV6LA2BXMpYqRe19R3gGsRfS1j1kkcNh2qvo6ofZLAlh6hWAMstWjp7YJ8AXBPwt8zK3zHichyIzOpvfMxYAjQjzP4X6zpNzXSLnWe1u4Vx/D4dEVcWXCAfq7qgte9jmNxv1Mmxz9Ry5st/JGzn4gZR8Zy3A4rOKC1MKHoN3UINmDZirgkNmt11tfz3khwjDsi4mnksbOoB1Nu0p5bH0tr5ypqy8Oi51ed8RUOXD4cLqBmc3sWzAaaDdW69JYuTeJ1MThxUqkFizDQWFgdNJTMO1nbMQAtQAk2A/wDMYg6n4yz/AEdX+prcEd5rXFvAzpPotcREoIiICIiAiIgIiICIiAiJH4rjGHptletTVgL5SwzW9N4HJOZKi/pZ3qkIaQ9sGwYn/dabjKt7nxXwmZeKYZtO1BNgCx303tffraSn0mYxcTQpjDjPardmsFFsjAXLW0udzOY0SinVlYj7rBx8VuD8Zw3nmtk5dHp8Vww+2B4D8Jocxccw6YZ75KjH7O4zfZsfLxHnKitcn2UdvRHP8pF8axYZMuxBuQRY/A6yM477bZP9ecY2uhzKdVPkdpucKqGxGl9SCTbKALk36f0ErdHFMum46A9PSenxJ22ne456SuvDubAHYVsz22YAX7x79xcamy6+vjLNheL4eoe7VS/QOwT/AK7fKclw1Xva+EkqBU63Gk5a8Oa2V1I4lB+0pf8AOpk+4ZtZiTG0hqa1HXp2yX+Ga4nNS6feX4iEs5Cp3mOyrqT6AamR/CHLo2J4qiozI6M+yqrqSPOwN7CQuLwobDIxdFcM7aliWXui2ikBrgmxIuCPKV0cOxKEOKFXTxpuAfEbf3eWfBcPxD0HRcLVbNquYZALrY6vYXBCH/L6GZfHc2XKs+t59v8AL/1VsNjKKshZ6uhYVlBAUgggZBbQ7fje8t/DMWeyOSpnTXIT7aKGRirna4OXXwHhaVfE8qYtCzNhmGY2B7jWOhuLMfA+Ws2OD8GcgU3DgFjnVVCt5ZjvbQ66C/W072fqItGUPmdnubk5gy90lmYnW41udx1OnWT/AAzmyrSRaKdlU7On1fM2VQLliG1MrGE5bw1O+Za9w1wMysPI3DaHxm1gsXhqBLAOHtY9mVZj43IIA/0kc9/W8LtyhzU2KrVKT5dFzplFtA2Ui9zm3BBlxZwNzOWcwPUw2RqVRyKgbd3W1rH7Jvsw0uNpXV4/igxBxDgagAE6ddLk67/GXNddMvV4rufaDa41285knOeU+J1ewuWNestVmRHqgOy5FVrFtbDM52lz4LxPt0LMmRldlZc2bKVPjYXFrG8rGufv1tnCTn2IlsJ8ia9XFqt7nUdBrMtk+tkt+NieWYDUmRlTiDHYWHxM0HzMT3z79bfPacr5sz4ueO/qVbilMA2zNbwRvkbWPukfieMOwtSRlPiyH8DYfOYEpNmJLsQfs6WHpoT85r4rEhNAxLeF9Pfac756ueKNz67VIsyk7XJIAP8AlB+WsxPhQ9iFpoTuQgufiNJ8ok2zvqeg8PQeMomO5/ZMb2BTuZlUsCNC2W2lthmF9b7yZrWr0XOZ9XN+Ao5vUY1Puq6rlTxKgC/xJm5h+CU7WAUeHdXT3ADSecDUJBJ8rX3/ANJp8W44aQy0lzu2lxqAfMjYDU/1MTWr+mszKL5owr02ulcKoAGRV1vY3zZXUG9juLeXWU/H8MeuzHsqLKToWJDHwuM+nhbwA3kq2HckswZnY3LMtrnqW8APDoBb12aWAyDTVjuTpc+J8AP71jXkscbVXHKzj/0+G/jP/fN/A8HVF/WJkzZj+py5TbxuDr75L18MAN/WaRpa3P8AflJ/poV/iHK9KpbJ3CDuEVQR5gG0wJyFf7bH3j8p941zK1F8tNRudSBfTQ7g+gFpbOCVjXQOyBAR3j4tboBuLW0voQbaWt0t3M88it0fo9Q2zVGAPXMu3w1lj4N9F1HMKlPFuCpIDKLG+xKk2uNxcSewvLj1FupNjscwF/MgqfCw/KZcTyc5ZWGJdCLX7ocnbr3SNraGbN647rZGCpyFV+zjKh33dlPymhX5GrIdHepqNc5Yjx9obesuPCeG9gCA7OSSbsT16WuRb5+Zm6apGl7fP5Sfar9OXNMVw4UdKtVgw1yj2h6ggeUia7lFvTFrfafu3F/Aan1nQOZ+FI5GIZ+8AqAW0PeJ3Csb2LdPhKwOHUzUCMC91LG/dGhFgLljufL3Spb9c9ZitUMUHJzuzXF8ubujy8OvXwkgmGZhnCMqAEZsvd1I+17PTa/WesUgTJkRFu67Lc+PtOWYdNiJOcaS9JidSALEkk7jqZes8dpynf0amMw+eojKKatkyupvZBqSNNwNAT6ygYvBoi51QF8ubMzHffRVy/Mn3zr3CqFsIB95GJ/zXP4WnMsdhrgqfuAH4G8zE7Vq8rDyPRBdjYaUwfZA1JXXQanfU6za4DiTQx9SkwIWu75egLC76eOhbQfymTk2gRnNtMqKPn+QlsTBpdGZVLJcqSAStxY2PS40NozL7KvHq3YiJ3QwYqrkQt4CQQcHrJ7EUFdSrAMrCxB2InPuf+Dvh6BxGGrvTykDsyUKm5A0Li4tr1nLyYul41MrJmE+3E4UeZOIDau38CH49yH5n4gupruR5Ilvjk9JH8L/AK6f1jurtYE+AlfxlUU+++gvcn5zl2E5i4kWV+1qOFOosMpHgQFtOlYPjWHxVJDXC0nV1LI4JU6b7arqdPSc9eKwz5JU5TxaF1QkszDugDQi2p+EwNyzhmftGw9Mt0JRb9NSep0GvS0xcS5jpUWUoqVi98zK+ULYag2ViLzAOdAd6A91U/8A1zJmwu8rFToC9yg2sNF2mLE8NFmqXKAAHSwUAAkk+tzf0EhxzovWj/8AJ/8Ama3E+azVGUJlXNcjNq1tg2mgvY21va02ZkTrcr4+JcXLG4J08lF8twep3PXUA7TBcG7Mim/+BTp0369ZrVuKh7XXQbjNv5bePxnyrxAN9nTqM2/ltIudOfL5URdT2aAn/wBtNunT3++ar0kJ1RP+Wn5W/vymd8Zm3S3jdhr8pger/hJ8e8D69Jnro5RVfA4VqoV1Uu5AUFb6a+4Em/yEutHl9URVFQLlFiqjRdbEDXZdvdOeIlRXNQqjOzH2kY5RYgZTb2badfQyO4pjMTTfKmVlIuLJe3kdtb+QnaZ56H6IoFQihbAAW08tBNd31n5/w3PGLw65Llbm5y5R6aMrT3/tDxRb/eVMttgKea/XXJa23SXfHarOpHfRMDU7knz/AKTjeC5yxTpn+sOq5wnfCH7pJ0QaWPy89LpyLz5TxIFOuQlUaZjYBje2vQXOx26aaXm+OxfvFl43TvRPk6n8R/OVxMK3bI9u6Kbgn3rb+c6B2IIsQCD0OsqL1EVsmdA5RiqFgGI2BC7kXlZnTnq83lV6+EDBL9GUyw4nD9w+kqvMHMIw3Zq9Iszu3dvkKqrWB66kFSB4G/hMXN/GWfC1ewNRDdCxuFbTICBlNwtgTc6m/hv0s5Rl02rxWnhcMKlc5URBc2uddFAHUm4AHnOe8V4lTWzhlqI7IilWF8zNlYsN1CixsdybecjuKYyvUoNTru7ogXIWtYHUi5tdjoCCST3TtI/mXDtQouATmDqwFgAtmQZgfEnx85Oeqq9ujcl8RqV3CqqUlps5qoWu7G2RCotolwxudbrbprfpzj6LkeuamMq6MVWmB5CzsSRoWJOul50edJOGERE0JDc0YGlWw1Ra4uiqW0vcFdVItqTfp1kzMOJoK6Mji6sCrDxBFjA/P+KwiqjWSzKLgHe410B1McUo2pHIATcXtZtOuvToem0mOY+HjC4hqKdo4VVNytr3F/IH1H4gyMwuKfvqyE2NhYjVSBa4J33B9JX0QGG5hqUWsmXKLZtLnXw90sVPiHad4kHNbbY6AA/CU3GYBkZlYWLZmA8tbdfASwcGw47NFzDVlGh6ZWP5TlrLEr209CrMn6OHi39+6aj00BsXA06nfUg/CcrmjaFafe1mplT76/xT5dfvr/FM9aM9fiKIQGaxOwsT+EzU8WGFwbiR1SgjEEstxt3h1nujRUAEMoJ3GYe6b69CQ+sQcTNMoPvj4j847P8AxD4j85nrRufWvOfPrdtdD6zTNL/EPiJl+pg/b29D/ObM0R+MopUcu6KxNvs32FpiGDoggZFGhsLek28TgSveUk6G5Fu6BqdDce+3SarAWBLsLfa7txfS3s2tt0nox8azNwim6EEZMz01D9FALPVI6XCKT7hN3k+nQszlMjPTsiZicwA/WE7ZiVUG5G7tbaY8K5QO3aNcU37Pug9/L3DlAsxuANus3uGYUpSoPcKoogm4NyMijLtoSSwABBJbraTq8USPKnOuJpp2dXJUVKjUw7HIwCnKNQCGPW1htvKs1N63Ea5fvHJ42sMtPQfdAubeEmuGJTFJnIFxiKuhFwdfZPlZtfIGaWBptT4mFJGapRsD0DFLgEeOZBp5jxkc/eBG8zIQKBexYEXsT9qxN7k6kIDqT0kvzRh0SnXVBfukuRckWyoF+JB9w85B86V7dmraMS7NfQ/ZQaeqt8DN/mDilOvh1NF71ayqKy5TamEW7knoWYKR5An0SW8UbXMGIBoGoQADh0dSB9p1VAT42L+6euNIMQtLs2D/AFtqRCi7FdQHuB4OAPdr5x2GwmJq4enhazBaauDlAsx76ZlLE2sofOFtc5TroAOk8icnU8Nlq2GfLYEAgaqA+psWva40Fr9Zczx9Fu4Hw5cNQSiCDkUAkC1z1NvOSUxqLT0JQ9RPlogfYngsBPBriBB83cFOIot2ap2wAyMygta9yoY+z5dL77zjOPpmm5Rqh7Wm1mUZbnxU2JB/MT9AfWJU+ZuT1xBz0XSjUZruzIXVxa3s5gFN7G431mwcT4gy1FzKzMQDlJB94taR2DWpUbs0a3dZrFyo7ilz77KZduNcjVKRLDG4Ym5JU1GQ+oGVtfKVmtwR0bMtejm11VnJsQQf2dtQfnF4Gti8I5I+ru9RexWoxN1PtCm4tfYMbekjsd3XZAxdQTY301sSQLkCS36IUgdpWZwBYKo9nUmwLE2G+lusxY7hyEDsxltvma+bz8j6COjhEK+u0x1KdjpYg7e/b3zabAP0Hwm2lB2YMyWI3IFsx8SNgfG28Dx9VRRopY+J/LaELjQEqPAG3ym24Y/Zb4GYjTb7p+EweA7nQu38RnnswFsABMnZt90/CfGQ29k/CBqhbTO+LqKrMrupJu2ViL6nU2Ou88mmfu/KekS+hXQwMKcZrA3Luw6gsbEWsbyc+sBWOUqy30O1x6WlcqYFwbAX8LTep5wiqyCyXsdLm5vrY3M0T+Hr2YXQMQbix87qdvQy7VlqVqdF8tldnzBRYL33Njb2QASPCwU+E5YKrixybbWY7e4y08t441EfDoagetkR2FmKJdu0K3ubkEjx8LSdZ9pwPfLXGsO/1hK9QU1aq1VHI8ScygeJXLYbnWQtVa9XEtiKKlR2jOjHcZVzquvUKjG3k0u/Ln0dPdHamFACN+s8cz51K9RlyWO4udJeOGclUKaorlquRVUAnKtlUoLge1oWGp+0dImZBzF+CVMZiM9YmtU0UrTXuqFemLDot0ZyNtVPjLdwv6P6mVVdkpJlsUQZma4s2ZjoLi2g+M6LQoKihUVUUbBQAPgJlAMoRHDOXMPQ7yIGfq795j7zJexnoLPUweAs9xEBERA82E+ZB4Ce4gY+yHhMdXCowsVuJsRAijy/hibmjTv/AMIj/wAP4b9yn8IkrECMHAsP+6X4Cff0Hh/3a/CSUQI39B4f92vwnw8Cw/7pPhJOIES3L2GP7NZ4PLWF/dL8JMxAg25Vwp/ZL8Jibk/Cn9mJYYgVk8k4X7k+ryVhPuXlliBXP/BmE/dj5zInKGDH7FT6yfiBD0+WcGu2GpfwKfxEkaOGRRZFVR4KAB8pniB5yiMonqICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiB//Z'
    //   if(this.stay.name === 'Car') this.url = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISEhIREhIYEhESEhgSEhIYGBgUGBIRGBgaGhkUGBgcIS4mHB4rHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMDw8PERERGDQhGB0xND80MTE0NDQxNDQ0ND8/PzQ/NDE0MTE0ND80PzQ0PzExMT80NDE0NDE0MTQ0MTE0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIEBQYHAwj/xABAEAACAQIEAwYDBAgGAQUAAAABAgADEQQSITEFQVEGEyJhcYEyUpEUQqGxByNicoKSwfAzQ1Oi0eEWVHOywvH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AOwReDEBeItFoC8XiLQF4vPA1X7wL3fgJN6mYaDKCPDvqbj2vPeAvF4iAvF4iAiIgRF5MQIiIgJF5JkQEREBeIiAi8RAREQJiIgTLfGpTyFqi5lQF7WudBsBzPICXBmC7W4bF1sO9PCZBUKnKXbKA+gU7H4blwfmReV4HMsHia/FOMrhqNZ6eDwxLVxTd1RlV7uAVIuC5CKflUHrL39JeGxmAq08dhcRVCU2Vmpmo5QorKEZkvYgEqjdQUJuWYzYv0c9lqvC6FRalLvMTWe7ujIVFNdEQFiDzYnTdvKbDiuEfaKT9+FerUUgKdUpoQQKIO5UgkM27ZiRayhQtey/FU4nRTGjw0yrUloZr93UtaoXt97kvRDfTOQNG/SnxtqT08HgiyV6zCn+rYq5UOAQCp3aoqoOY7pxs0yPYzslxPheIrrTanUwVa4Ad/Eja93VKhbFhezAEZh6CUcG7E4xeKniOMRKiJc0KaVA7IygLTzZgAcq3JN7lgDzMDeuzPDHwuEo0HqNVqooNWo7M5eq2rnM2trmw8gJlZRSdiLshQ/KSCbdbg2lcBERAREQEREBERAiJMQIiTECLREQEiTEKiJMQEiTEBaJMQBiDEIREQEREBERAREQIiTEBERAREQEREBIiTASJMiAiIgIiIC8QYgTEqiBTaIMQEREBIkxAiTEQEREBERAiTEQEREBERAREQEREBERASJMQERECqIiBSYgzFca7Q4bB2797MRdUAuzDXW2w2O5GxgZWJoq/pFpvUVEoMtNiQajsBY208Cg6Xtc30BvY7Ta6eNDgMraHlpf8P8A8gXruqi7EKBuSQB9TMU/abBBxTGJRnY2Coc9z0utxf3lvxbhNPFLlqrmG4J5EbH1Fz9TyJEw47JUaYv3lgPmAA9IG3fa1IuuoOxmL41icV3Z+zOiPyzLm9tfz5W58sU7tR3qKijmzFf9rC59QJ5/+RBQQHVz1tYD/mBiKHEeNI4cl311RkXIw6HKNPUETe8NxYFFaohpuRdluGCt0B3P0mm4jjdR/vaSzbHMecK32pxuku1zLVu0ack/GaUcUesp+0ecDdx2iX5PxnvS47TO4I/GaEMQeskYo9YHSqONpv8AC4v0Oh/GXE5iuOIl/heP1KfwubfKfEPodoG/xNdwPaqm1hUGQ/MPEv03H4zP0KyVFDIwdTzU3EIriIgIiIESYiAiIgIiRAriIgUk2uSbAak9B1nA+1fapMXi3rZL01HdUrEjNSRmKuddyWY+jTq/b3iPdYHEopIqVKLqps1glvGcwFgQmY2JF7aTgOKwj0zZ1K+dtNdR6G3Ixg2fhfH8GulRHpn5gFcf8/hNswXFadTWlWRx5DxD1AOn0E5GySEqMpBUkEbEGxHvKOx4vtK2GQtmeoegtp/16zTeI9usVUv3Z7u+ma5Z7dMx29BpMXgO0lQeCr+sXa50YD15+8u8Rw6jiQalE5Xte3n5jlCsDieI1ahzPUZj1LGZfg+ExTIKpdaGH/16zZUI/Y+8/wDDp5y1ZaWDCM1P7RiHXMgdWWjRP7StY1HHQ2AuN9L4/GYuriHz1ajVah0UE6DoqqNF5aAQjpWCwlCoqilxCk9Qj4KiNhw/7hYm8rxnDsTRF6lJsn+otnS3XMtwPe05v2k0rGkNUpAU1G9wiinf3yE+89+B9qMdgyDQxDhBvTc50Pllbb2tBW6Ct5ye+nngO2PD8YQmNo/Y6zafaaWtMnq6fd9be8r43gzhmVc4qioqvTZPF3iObKVHU22hTv5BrzxHCMYQHqKmDQi4fEOtM/yHx/7TPelwek3xV62JPy0KZRL+VSqVBH8JgW9THKu7Ae886ePao2Smj1H+VVJP03m08O7KplDjDpTvcE1WfENYfMngpg/wtMt9jSnZc5qJa2QHIinySmFT6gyUahT4fjDbMqUAdu9fKx8sgu9/4Zn+DcIxlNw6VahYHZaRpI3kTUIzr7CZzBY5aVsiIgG4CKt/VlA/KZmjxSk41bKfPYfxDSBXw/Giqt7ZXXSonNW22PK4P0I3Eu5ieIUGRhiqOrqPGo17ynpqANzYDbcAblVmI7P9rTisZWwtSmtEIoaiLljUvc3D3ysCozCw262hG2xEQEREBERAREQJtJiIFpxLCirSq0j/AJiMnlcg2v5XnH+JFzZKhzCmDTCsAbLf4T1Gmx2naCZpnarsyzl8RQGZiSz0huTzZevp9Oko5TiuDI1zTPdt8p1Q/wBV/H0mDxGHZDZ1y62DDVT6EaTYO0NVqdI5TlLMEJ2IFiT/APG0suD8HxVVWZEqVAB4lSm1UKOQa2x8oGFNPprPfB4t6bAgkS5xGGs22RgSGUggXBsdDqCDoQRcSjEYBhuLGwNvIi4P0gZ2rXp4pLVAM1txv6joZi8LgVSvSZmAWnUFRgxADIhzeEnrYCx1F9zMdSxDU/aZgYR0Q1i1OqrKpqFHVzTDWyo45WvbpeBguJYgVK1SoDoW087WF/e1/eUu4Kj5tj09RM6+Bo1lvTUFuinI/wBDofeYbE4NqbFbE+osfp/XaBaATqfDcUO64JiL/CiUmP8A7FYoR/K05k+GdRc2A/eU/kdZuPCMRm4VTt8WFxroPJaqCoD6ZkMDdl4bSSo+Zc7h2BdvExIJGp5zNYYqBYAAHkNJjcRWDVA42q00rDzzqCf92aXibQq+ptpYzwqCe1JCRm5cydAPU7SkANqpDAmwKkMDbTQjeZVZPbnLWoxBupIv585lK5p01zVVFM9arqi+oG5+kx69o8OCVp/rSFLHukCKFA1Y1ahAAHUy4jE8T4tjMIy1qLEUyQKynYdHsdPIm19pVwtx39DGVVPdU6hqCoCFszhqZFvvreoXAG1mG2UTIO+Lr/4dAID99lNVrdb1Mie65pacQ7P4n46jtWbewYG3kNgPoB5mUdJo1VdQyMHU7MpBBlc5HRrV6J8JemR0OVh6gf0vM7gO2lZLCsgqp8y+F/XTQ/QesiN/iYzhfHcNidKbjPzpt4XHsd/a8ycBERAREQKoiIHkTIzSDKGMqtX7X9mMJiKdWvUUh6aVKpCtlDuqMVLW39rX53nnw7B1KWDwlKmrqpRalWothZmUOzXve5Y5dAdB0Guex6d5TqUztURqZ9GBX+s1rgmNzUqD1FLvTVEUAAmm4TuKoIv8IdDc+czoxf6TeDpUp/a6QHeU2Va9t2pnwq56lWsL/KxvsLa7wrEticEUZFqtRptTXMPFTCgMGVhqAF0C7E7zoWNwoxaVMrM1KpRrAFkdCCQ62KlRsWYa7hVOu85f2M4mtKpVFRstOoEdjYsBbWzW2UhyLy4jEY7BK2W2hLW8tif6THYmi6kZlAsAoIAAIAty3PXmd5sPEaIpuUBDBai5WUhgyN8JBHkwlBF9Dt0lGtq5GoMyFPir2y1AKijbMPEPMN1lxiOHK2q+E/h9Jja+FZNxp13ED2KIUy07NclsjLZr23zDp5GZXsyx7nG4fY1adOtSViBmejUGYLfclHfT9ma9cietHElbdVYOjbFXB3B9NCIHSuFcSp/Z8OK1VaVXDq1Io6u2amGzJovKzEbjaXrdpcOu1ao/lSoIl/43JImhYfiqOfFoeu4/5H5ecv1sdQd9iNQfPoYG5Ybjr1VIpYfMmdVLYio+IbPY5SEUWXnqSBra+sydPB4+tbvKrUU5hSlEDyK08xI/jE5/Qc0zmViGGmYG2h3Hp5TbOEdrWWy1hcfONvcDVf4dP2ZBXj+yKjx94C50z2c+LmCXZs38y+8xWL4HicOA5uQAG7ynfKoNx8Q1B9D0nR8BxKnVUZGDq2mU2IbqByPpuOYErfCKb5DluLGm3iQ632/v2lHP8L2kxC5QXzou6HQt/ENR7dJseB4vSrkd2xp1bW7tzdWP/wBvYg+Uo4n2XSqWZENCpe5vbI2myhfP8+c1bH8Jr0P8RMyjUsNcvmeg89vOBuuJw9OppUTKb2D8ifJtLHbQ2PrMFxDgDrdk8Y58m9+RmP4f2hq07AnvE6Nq1ulzuPL8ptXDOL0q6+BgrC3hOlvLy/LpeQaNWwxU/KwPmCD+YmX4X2wxOHslX9eg5OfGB+y/P3v7TZ8dw6nVFmWzcmGhmrcT4A9O5Azp1G49uf5yjfOD8fw2LH6p7Pa5pt4XHtzHmLzKzhz4cocykqym4INiD5HkZtXAe3FSmRTxd6ibCqB40/eH3h+PrIOjxPLDYlKqLUpuHRhdXU3B/vpPWBVERA8WEpInoRKTA8KlO81HE1EwGJqNVGXCYwm1b/0uJYWa5OgR7Br7Bs195uZltjsHTrU2p1ED02FmUi4IgadxziQw+Haq+MerVNN6dBFdQtYuLLVdF3ygglhZTlva5tOPYbH1KNbPRYq3wixI8O249J07jX6Nl8RwlU0wd6bjMPQONfreatU7F4ujcGmrftDW/wCEYPE4vD1xkqDun0Iq01AUsDcF6WinX5Cp8jKcRQdFLsA9If51M50H7+gambcnA8iZZ4ng1dfiS1uU88NiK1BsyMVI03I06eY8jpKLu95SwlSYihVOo+zVD9+moyMer0dB7oV9DJr0nprncBqd7d8hz078gxsCh8nC+8CwrYFTqPCfLb6SwrYZl3Fx8w1EzN551d1/e/oYGDyc1MusJxBqe97He35kbH85sOI4IlSmlSkGqOR+sKlcwaymwQam1yDvsDpe0wVXAsNvEPoYGbwWPSoN/W39RuPxHnL8U7i6m4301BmlGmyHS4I16GZLA8ZdDZ/5h/Uc/wA4G0YXGVKLZkYqdL81a3UHQ+83Dg3a1WslbwnkxOh9GO3o383KaTQxtOoLkj94be/T3lb4cjUaiB2OhiVYaHMvMcx6jlFagrDbMOnMHqOnrOVcL43Vw5GVsyD7hPwj9k/d9NR1Bm88H7R0sQPiyuBdgdCvmR0/aGnW20DF8d7KhrvQ8Lb5dlPqBt6j3G7TTmNSnUs2anUXntvz03B6jQ+c6+ZiuMcCp4lbFfHqQRoQTzBtp+IPMHkGucG7T7U8RYHYVNlPv938v3bWO2I4YXU5h/ehE5lxfhdTCEioMyXsG2seQIv4T03B1sTYxwrtI+G5l6Q0y/Eyjy128j7ZSbwN54rwSnWBZfBU6jn/AH/dponFMDUpNkdDbk33T6X19v6azovDOI08RTFSmwItmOvLr6aEa6ggg2Imvdp+0+Bp02DVBUqAHKqeLXaxI0tffmJBrXAu0tTh9TMhNSi5HeUdgw+Zb7Pbnz5zsvD8amIppWpNmp1FzKdvYjkQdCPKfPuJSvXQYgv4qnwZgDZTomYrol7WAsRqL2vOlfoaxT1MFWDG4TEHL5BkQkfXX3gdDiIgUGeZno0oIlVTBk2iRHk6XltUoAy9tKWWBgcbwpHBus1Li3ZcG5UTo7pLepQBhXDOI8DemTpMdh8VXw7ZkYqdt9xzB6jyNxO3Y/hKODcTUOL9lwblRKNLpYrD1dGH2aofvIt0Y9Wo3AHqhX90ya+EqLlcqHQH/FQ502IsToUOo0YAxxDgboTpLDDYqtQbMjEEab206eY8jpCMphsa9MMqNZWvdeVyLZh0O2o6CWGMxXdrcC7MbKPzP99ZeUeIYetpUXuXP+YgGUnq1PQfyFfSYniqA1aaBsyjMcwBAK33AIB5SjyTiDMLOmdfS/8AZh8jC6+68xOo4LsNh6dGn9pNU1nAvTpFFFMkXy+IG9uZJteaz257HHB5KtN89NjlVtA2a18rAaXsCbjQ2O20yNRRnpnMjWmRwfGnTS+U9PuH1HL2lhhXDe+48/KZHBcBrYrOKCd41NczLmVWKnmoYjN7SjK0uI06v7D21F9D5g8xKDiDTYOrlWU3VlNiD1B5TVmRl16S5wlapUenRQLnchcxuRc9RA6r2S7Y94woVBZ+VhfOANcg5NoTkGh1y2PhO5V+IUKYBqYimgtcZnRdPQmcV4hw+kKbGhUrMERnFVyuSrlZcwRFUFNGzDVtAb2M171POB2btF2o4WabI1UV3ykBUUuGvujE2XKbC+vIEWIBHKmxlNXbu1bKzHKjMG8J2U2Hi6X0mP09vSZXgi4skphKbOXZdVTPqpuNQDl33gWlTFPlKAlV1Yqb/FcA+HYbDz0HSWVVDUYhQWJ2sCSfQDUzpvCf0eJT/XcTqkt8f2ZDc6m5LsNtTrbT9oTL4ftbgKFengcJTWgXqCkXVQtqjEAB3IOt7C9m9RAx/ZPgVTF4dTVLYSiO6RkZMj1KtOmiZkZjqmmYabm3LXoHZ3g9PB0FoUlKoGZtQoLEn4iFFv8Aq19ZcYTDFfE7Zqh+9roOgJufr9BLuQVXiREKGQRKjIlRTaRaVGRIqkyJUZFpRSRKGWekWkRbsktquHB5S/IlLJKNax/B1cHSafxbsvuVE6e9OW1bDA8oVwjH8GdCdJ4cIpWxWHz6r31MG/y51uPS152PiHBUcHSaZxnsywDFBZrHKdteUDowem9Z1zMz6G1wACrsRY+t/Wxll2horiadTCMBU7whAVBvQqXJpudNQGX6AzE8Lr1MSKeKo5szpeoFAJV83jUgkDwuH03IO2uuf4fTqE0q2LRKNc507sHxPZrBgMxAuMpIBNr7zI+emXu6hBFrnb5T09jMilW1iDZhtrYj0kdpkQYvEZfhFerl/d7x7W9rS2o4pbWb/qaRmuDcEqY13pUcmcUzUAdsuYKQCAbHXxc7ShuzmOwWOoq2GarUXLXVKd3DpezC6j2PS46y34bxVsLVp4ii4V6ZuvMEEWKsvMEEiZjiH6SuI1CO7KUiNMyJ4sptcZnJIBsNrbCBt/DOwr4jDj7VUqYVdUSmRTzpRuD4reEMbAEm+g2F5cJ2f7P4RS1R1rMgsxeo1Q3PVEst/aclx/FMZiCWrVqlS+tmdmUeik2E9+E8VqYelWpCmjCsLEsNV0t7ix20kV02j2z4Hh2AoYVVHOqtBFt9fEZsVDtC706NQlVWsiuqKjFkRhfcFszWvYBdcp1nz2KRJFtdZ0PDdq6jUaNBKKUxTppTNQlnchBpb4ba663iDau1eJZcHUr0Efvu+pZGYF3qHvFuAtycttMunPSa32d7BYqvWXFYxu5U1BVZTY1KhzZj4Rol/PUdJmeEYuoQtyTbbkB6AaD2E3HCVbgGCMrmlQaWqPPRWhHveJ53iFepiDEoi0ESYgQRIk2giQURKrSLQKZBErIkQigiUMk9YIlFq9OWmIwSsNpkyJSUhXP8U2I4TWqYmnTNXB1jmxFJd6dT/VToSAL30Nt+njxT9IWG7tmw6u+IYfqy6ZRSa1g7Mx1tc6Lv1G86K9O4tNU4z2HweIJbu+7c6lkOQE9So0P0kHDcQxdtLnlc6+5POeYQjlOoYr9HpT/DcEeY1mOfsTUG9pUaB3ZlaKRym8f+HONxPSn2SYbiFjSVRzPeng2ab3R7MW5TIUOzwHKKRo+B4MzEaTbOFcAAsSJseF4MF5TLUMFaQWGD4eFA0maw1OwhaMuES0CpBPVBCLKwIFVokxArMQYlCIiAkSYgRIkxIIkWkxKKbRKpFpBTFpURItAgiUlZ6ERlgeJpzybDDpLqRAszhF6Sk4JekvotAsfsa9JIwwHKXloywLYUpUKc97RaB5hJUFldpNoRAEqAi0qhS0SbRAGIMShERAREQEiTIkCRJi0CIkxKIkSYgIMSICRJiBESoCLSCmLSqIEWkyJMAZEmICTEQJiIhExESqqiIgJSIiAiIgDERIiBAiJVDBiIEGIiAgxEBERIEREoREQEkSIgTJiJEVREQP/Z'
    //   if(this.stay.name === 'Soldier') this.url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlZgL1J5WN_d3HqyW1SWmmF4oqtAeFAXEz2g&usqp=CAU'


    // }
}
</script>
  
<style>
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}
</style>