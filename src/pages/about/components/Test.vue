<template>
  <div>{{ count }}</div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.count++;
      console.log(`this.count`, this.count);
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss" scoped></style>
