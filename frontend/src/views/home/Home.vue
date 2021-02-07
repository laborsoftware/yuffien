<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
      return({
         redirectURL: process.env.VUE_APP_LOCAL_API_URL,
         addServerCSS: {
           '--content':`'${this.$t('home.addToServerBtn.name')}'`
         },
         goToPanelCSS: {
           '--content':`'${this.$t('home.panelBtn.name')}',`
         
         }
      })
   },
  methods:{
    ...mapActions("auth",["logout"])

  },
  computed:{
    ...mapState("auth",["user"])
  }
}
</script>



<template lang="pug">
        a-row.home(type="flex" justify="space-between")
          a-col(span="13" :style={textAlign:"left"})
            h1.title()
              | Tek bir bot ile tüm işlemlerinizi yapın.
            p.description
              | Yuffien içerisinde bulunan x komut ve x geliştirici ile x sunucuda x kullanıcıya hizmet vermektedir!
            a-button-group(size="large" ghost shape="circle")
              button(v-if="!user" :style="addServerCSS")
                div(class="left")
                | {{ this.$t("home.addToServerBtn.name") }}
                div(class="right")
              button(v-if="user" :style="goToPanelCSS")
                router-link(:to="$t('home.panelBtn.url')")
                  div(class="left")
                  | {{ this.$t('home.panelBtn.name') }}
                  div(class="right")
              //- button(style="--content: 'Özellikler';" class="features")
              //-   div(class="left")
              //-   |  Özellikler
              //-   div(class="right")



</template>


<style lang="scss" scoped>
@import 'public/assets/scss/global';


* {
  color:white;
}

h1.title{
  font-size:50px;
  // line-height: 50px;
}
p.description{
  font-size:17px;
}

.ant-btn-group{
  display:flex;
  justify-content: space-between;
}

button {
  position:relative;
  padding: 10px 20px;  
  border: none;
  background: none;
  cursor: pointer;
  
  font-family: "Source Code Pro";
  font-weight: 900;
  text-transform: uppercase;
  font-size: 30px;  
  color: $text-color;
  
  background-color: $btn-color;
  box-shadow: $shadow-color 2px 2px 22px;
  border-radius: 4px; 
  z-index: 0;  
  overflow: hidden;   
}

.features{
    background-color: $btn-color3;

}

button:focus {
  outline-color: transparent;
  box-shadow: $btn-color 2px 2px 22px;
}

.right::after, button::after {
  content: var(--content);
  display: block;
  position: absolute;
  white-space: nowrap;
  padding: 40px 40px;
  pointer-events:none;
}

button::after{
  font-weight: 200;
  top: -30px;
  left: -20px;
} 

.right, .left {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.right {
  left: 66%;
}
.left {
  right: 66%;
}
.right::after {
  top: -30px;
  left: calc(-66% - 20px);
  
  background-color: $bg-color;
  color:transparent;
  transition: transform .4s ease-out;
  transform: translate(0, -90%) rotate(0deg)
}

button:hover .right::after {
  transform: translate(0, -47%) rotate(0deg)
}

button .right:hover::after {
  transform: translate(0, -50%) rotate(-7deg)
}

button .left:hover ~ .right::after {
  transform: translate(0, -50%) rotate(7deg)
}

/* bubbles */
button::before {
  content: '';
  pointer-events: none;
  opacity: .6;
  background:
    radial-gradient(circle at 20% 35%,  transparent 0,  transparent 2px, $text-color 3px, $text-color 4px, transparent 4px),
    radial-gradient(circle at 75% 44%, transparent 0,  transparent 2px, $text-color 3px, $text-color 4px, transparent 4px),
    radial-gradient(circle at 46% 52%, transparent 0, transparent 4px, $text-color 5px, $text-color 6px, transparent 6px);

  width: 100%;
  height: 300%;
  top: 0;
  left: 0;
  position: absolute;
  animation: bubbles 5s linear infinite both;
}

@keyframes bubbles {
  from {
    transform: translate();
  }
  to {
    transform: translate(0, -66.666%);
  }
}

a{
  color:white !important;
}

</style>
