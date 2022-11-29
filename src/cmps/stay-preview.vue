<template>
    <li class="stay-preview-container flex space-between" @click="showStayDetails">
      <div class="stay-preview-info flex column space-between">
        <div>
          <h3>{{ stay.name }}</h3>
        </div>
        <h4>{{ stay.price }}</h4>
      </div>
      <div class="stay-preview-btns flex column space-between">
        <!-- <router-link @click.native.stop :to="'stay/edit/' + stay._id" class="btn">
          edit
        </router-link> -->
        <button @click="toEdit(stay._id)">Edit</button>
        <button class="btn" @click.stop="removeStay">X</button>
      </div>
    </li>
  </template>
  
  <script>
    export default {
      props: {
        stay: Object,
      },
      methods: {
        showStayDetails() {
          this.$router.push('/stay/' + this.stay._id);
        },
        toEdit(stayId) {
          this.$router.push(`/stay/edit/${stayId}`);
        },
        removeStay() {
          this.$store.dispatch({
            type: 'removeStay',
            stayId: this.stay._id,
          });
        },
      },
    };
  </script>
  