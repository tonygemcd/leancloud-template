<template lang="html">
  <div class="home-wrap">
    <div class="demo-card-wide mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Welcome</h2>
      </div>
      <div class="mdl-card__supporting-text">
        If you can see the picture above, it means everything is fine! Congratulation!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {},
  ready () {
    $request.post('/api/user/register')
      .send({
        username: '11123'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          this.$dispatch('show-alert')
          return console.log(err)
        }
        console.log(res.body)
      })
  },
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss">
.demo-card-wide.mdl-card {
  width: 100%;
  max-width: 512px;
  margin: 0 auto;
}
.demo-card-wide > .mdl-card__title {
  color: #fff;
  height: 176px;
  background: url('../assets/Home/welcome_card.jpg') center / cover;
}
</style>
