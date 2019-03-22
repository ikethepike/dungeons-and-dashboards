<template>
  <div class="dashboard">
    <h1 v-if="dashboard">{{ dashboard.name }}</h1>
  </div>
</template>

<script>
export default {
  data: () => ({
    dashboard: null
  }),
  mounted() {
    this.$db
      .collection("dashboards")
      .doc(this.$route.params.id)
      .onSnapshot(doc => (this.dashboard = doc.data()));
  }
};
</script>

