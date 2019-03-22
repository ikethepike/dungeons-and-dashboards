<template>
  <button @click="newDashboard">New dashboard</button>
</template>

<script>
// @ is an alias to /src

export default {
  name: "newDashboardButton",
  methods: {
    newDashboard() {
      this.$db
        .collection("dashboards")
        .add({ name: "New Dashboard" })
        .then(docRef =>
          this.$router.push({ name: "dashboard", params: { id: docRef.id } })
        );
    }
  }
};
</script>
