<template>
    <form class="form-filter">
        <div class="filter-header">
            <div class="close-filter">
                <button>
                    <span @click="closeModal"><img src="../assets/icons/close-icon.svg"></span>
                </button>
            </div>
            <h2>Filters</h2>
        </div>

        <div class="filter-content">
            <div class="price-filter">
                <h2>Price range</h2>
                <p>The average nightly price is 220$</p>

                <HistogramSlider @change="setRange" @start="startRange" :width="650" :hist-slider-gap="0" :bar-height="100" :bar-width="12"
                    :bar-radius="0" :line-height="1" :bar-color="'#b0b0b0'" :primary-color="'#b0b0b0'"
                    :label-color="'#bdd6f8'" :holder-color="'#dddddd'" :handel-color="'#ffffff'" :data="data" :min="min"
                    :max="max" />
                <div class="form-inputs">
                    <div class="inner-price">
                        <label for="min">min price</label>
                        <div class="flex form-input">
                            <span>$</span>
                            <input v-model="filterBy.range[0]" type="number" name="min" :min="min" >
                        </div>
                    </div>
                    <div class="between-prices">-</div>
                    <div class="inner-price">
                        <label for="max">max price</label>
                        <div class="flex form-input">
                            <span>$</span>
                            <input v-model="filterBy.range[1]" type="number" name="max" :max="max">
                        </div>
                        <!-- <el-input-number v-model="filterBy.max" :min="min" :max="max" size="small" :controls="false"
                            @change="handleChange" /> -->
                    </div>
                </div>
            </div>



            <div class="rooms-beds-filter">
                <h2>Rooms and beds</h2>
                <h3>Bedrooms</h3>
                <el-radio-group>
                    <label class="el-radio-button">
                        <input v-model="filterBy.rooms" type="radio" class="el-radio-button__original-radio"
                            value="any">
                        <span class="el-radio-button__inner any">Any</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.rooms" type="radio" class="el-radio-button__original-radio" value="1">
                        <span class="el-radio-button__inner">1</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.rooms" type="radio" class="el-radio-button__original-radio" value="2">
                        <span class="el-radio-button__inner">2</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.rooms" type="radio" class="el-radio-button__original-radio" value="3">
                        <span class="el-radio-button__inner">3</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.rooms" type="radio" class="el-radio-button__original-radio" value="4">
                        <span class="el-radio-button__inner">4</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.rooms" type="radio" class="el-radio-button__original-radio" value="5">
                        <span class="el-radio-button__inner">5</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.rooms" type="radio" class="el-radio-button__original-radio" value="6">
                        <span class="el-radio-button__inner">6</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.rooms" type="radio" class="el-radio-button__original-radio" value="7">
                        <span class="el-radio-button__inner">7</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.rooms" type="radio" class="el-radio-button__original-radio" value="8">
                        <span class="el-radio-button__inner">8+</span>
                    </label>
                    <!-- <label v-for="item in 8" class="el-radio-button">
                        <input v-model="filterBy.rooms" type="radio" class="el-radio-button__original-radio"
                            value="item">
                        <span class="el-radio-button__inner">{{ item }}</span>
                    </label> -->
                </el-radio-group>
                <h3>Beds</h3>
                <el-radio-group :fill="'#222222'">
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="any">
                        <span class="el-radio-button__inner any">Any</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="1">
                        <span class="el-radio-button__inner">1</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="2">
                        <span class="el-radio-button__inner">2</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="3">
                        <span class="el-radio-button__inner">3</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="4">
                        <span class="el-radio-button__inner">4</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="5">
                        <span class="el-radio-button__inner">5</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="6">
                        <span class="el-radio-button__inner">6</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="7">
                        <span class="el-radio-button__inner">7</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="8">
                        <span class="el-radio-button__inner">8+</span>
                    </label>
                </el-radio-group>
            </div>


            <div class="property-type-filter">
                <h2>Property type</h2>
                <div class="flex">
                    <div @click="setType" class="property-type" :class="setBorder('House')">
                        <div>
                            <img
                                src="https://res.cloudinary.com/ddt1fjmim/image/upload/v1669845855/house_oz9fpr_eljbtg.png">
                            <span>House</span>
                        </div>
                    </div>
                    <div @click="setType" class="property-type" :class="setBorder('Apartment')">
                        <div>
                            <img
                                src="https://res.cloudinary.com/ddt1fjmim/image/upload/v1669845869/Apartment_s5whob_lmgvut.png">
                            <span>Apartment</span>
                        </div>
                    </div>
                    <div @click="setType" class="property-type" :class="setBorder('Guesthouse')">
                        <div>
                            <img
                                src="https://res.cloudinary.com/ddt1fjmim/image/upload/v1669845874/Guesthouse_rxvpqm_znyqbs.png">
                            <span>Guesthouse</span>
                        </div>
                    </div>
                    <div @click="setType" class="property-type" :class="setBorder('Hotel')">
                        <div>
                            <img
                                src="https://res.cloudinary.com/ddt1fjmim/image/upload/v1669845864/Hotel_lywp1t_y3foc7.png">
                            <span>Hotel</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="amenities-filter">
                <div class="amenities-title">
                    <h2>Amenities</h2>
                </div>
                <div class="essentials">
                    <h3>Essentials</h3>
                    <el-checkbox-group v-model="filterBy.amenities">
                        <el-checkbox label="TV" />
                        <el-checkbox label="Wifi" />
                        <el-checkbox label="Kitchen" />
                        <el-checkbox label="Smoking allowed" />
                        <el-checkbox label="Pets allowed" />
                        <el-checkbox label="Cooking basics" />
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <div class="filter-footer">
            <button>Clear all</button>
            <button @click.stop.prevent="setFilter">Show 29 homes</button>
        </div>
    </form>
</template>

<script>
import HistogramSlider from "vue3-histogram-slider";
import "vue3-histogram-slider/dist/histogram-slider.css";

export default {
    name: 'filter-modal',
    data() {
        return {
            min: 0,
            max: 300,
            isActive: false,
            data: [80, 150, 250],
            filterBy: {
                range: [0, 1],
                rooms: 'any',
                beds: 'any',
                type: [],
                amenities: [],
            },

        }
    },
    methods: {
        startRange($event){
            this.filterBy.range[0] = $event.from
            this.filterBy.range[1] = $event.to
        },
        setRange($event) {
            this.filterBy.range[0] = $event.from
            this.filterBy.range[1] = $event.to
        },
        closeModal() {
            this.$emit('onClickAway')
            event.preventDefault()

        },
        setBorder(type) {
            if (this.filterBy.type.includes(type)) {
                return 'active'
            }
        },
        setType(target) {
            this.isActive = !this.isActive
            console.log(target.target.innerText)
            let type = target.target.innerText
            let filter = this.filterBy.type
            if (filter.includes(type)) {
                let filteredType = filter.filter(item => item !== type)
                this.filterBy.type = filteredType
                return filteredType
            }
            this.filterBy.type.push(type)
        },
        setFilter() {
            console.log('IM FROM SET FILTER',this.filterBy)
            this.$emit('setFilter', { ...this.filterBy })
        },
    },
    computed: {

    },
    components: {
        HistogramSlider,
    }
}
</script>
