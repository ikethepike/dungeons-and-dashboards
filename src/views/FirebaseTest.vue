<template>
  <div>
    <input
      type="text"
      placeholder="Write something then press enter!"
      v-model="message"
      v-on:keyup.enter="submit"
    >
    <pre>
      <p v-for="(message, index) in messages" :key="index">{{message}}</p>
    </pre>
  </div>
</template>

<script>
import { firestore } from "firebase";

export default {
  data: () => ({
    message: "",
    messages: []
  }),
  methods: {
    submit() {
      if (this.message.length > 0) {
        this.$db
          .collection("conversations")
          .doc("testconversation")
          .update({
            messages: firestore.FieldValue.arrayUnion(this.message)
          })
          .then(() => {
            this.message = "";
            console.log("Message saved!");
          })
          .catch(error => {
            console.error(`Error adding document: ${error}`);
          });
      }
    }
  },
  mounted() {
    this.$db
      .collection("conversations")
      .doc("testconversation")
      .onSnapshot(doc => {
        const { messages } = doc.data();
        this.messages = messages;
      });
  }
};
</script>

<style scoped>
input {
  width: 200px;
  height: 50px;
  border: 2px dashed #26547c;
}
</style>

