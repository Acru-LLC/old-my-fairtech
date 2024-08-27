<template>
  <div>
    {{ soato }} - - - {{ type }}
    <div>
      <khorezm_b :resData="resData" v-if="soato=='1733' && type=='BENZIN'"></khorezm_b>
      <khorezm_m :resData="resData" v-else-if="soato=='1733' && type=='METAN'"></khorezm_m>
      <khorezm_p :resData="resData" v-else-if="soato=='1733' && type=='PROPAN'"></khorezm_p>

      <navoi_b :resData="resData" v-else-if="soato=='1712' && type=='BENZIN'"></navoi_b>
      <navoi_m :resData="resData" v-else-if="soato=='1712' && type=='METAN'"></navoi_m>
      <navoi_p :resData="resData" v-else-if="soato=='1712' && type=='PROPAN'"></navoi_p>

      <bukhara_b :resData="resData" v-else-if="soato=='1706' && type=='BENZIN'"></bukhara_b>
      <bukhara_m :resData="resData" v-else-if="soato=='1706' && type=='METAN'"></bukhara_m>
      <bukhara_p :resData="resData" v-else-if="soato=='1706' && type=='PROPAN'"></bukhara_p>

      <namangan_b :resData="resData" v-else-if="soato=='1714' && type=='BENZIN'"></namangan_b>
      <namangan_m :resData="resData" v-else-if="soato=='1714' && type=='METAN'"></namangan_m>
      <namangan_p :resData="resData" v-else-if="soato=='1714' && type=='PROPAN'"></namangan_p>
    </div>
    <div class="loaderBody" v-show="loader">
      <div class="loaderPosition">
        <div class="loader">
          <div class="blue dot"></div>
          <div class="green dot"></div>
          <div class="red dot"></div>
          <div class="orange dot"></div>
          <div class="logoColor dot"></div>
        </div>
        <div class="mt-3 text-center"><p style="font-size: 20px; font-weight: bold">{{ $t('loader.waiting') }} <br>
          {{ $t('loader.downloading') }}</p></div>
      </div>
    </div>
  </div>
</template>

<script>
import khorezm_b from './khorezm/benzin.vue'
import khorezm_m from './khorezm/metan.vue'
import khorezm_p from './khorezm/propan.vue'

import navoi_b from './navoi/benzin.vue'
import navoi_m from './navoi/metan.vue'
import navoi_p from './navoi/propan.vue'

import bukhara_b from './bukhara/benzin.vue'
import bukhara_m from './bukhara/metan.vue'
import bukhara_p from './bukhara/propan.vue'

import namangan_b from './namangan/benzin.vue'
import namangan_m from './namangan/metan.vue'
import namangan_p from './namangan/propan.vue'

import Service from "@/modules/fair-price/stations/service";

export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    soato: {
      type: String,
      default: ''
    },
  },
  components: {
    khorezm_b,
    khorezm_m,
    khorezm_p,

    navoi_b,
    navoi_m,
    navoi_p,

    bukhara_b,
    bukhara_m,
    bukhara_p,

    namangan_b,
    namangan_m,
    namangan_p,
  },
  data() {
    return {
      resData: {},
      loader: false
    }
  },
  methods: {
    getData() {
      this.loader = true
      console.log(this.loader)
      Service.gasStationListData({soato: this.soato, type: this.type})
          .then(async res => {
            this.resData = res.data
            this.loader = false
          })
          .catch(e => {
            this.loader = false
          })
          .finally(() => {
            this.loader = false
          })
    }
  },
  async created() {
    await this.getData()
  }
}
</script>


<style scoped>

.loaderBody {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(239, 239, 239, 0.73);

}

.loaderPosition {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot {
  margin: 2px;
  border-radius: 100%;
  width: 15px;
  height: 15px;
}

.blue {
  -webkit-animation: pulse_blue 1s ease-in-out infinite,
  nudge 1s ease-in-out infinite;
}

.green {
  -webkit-animation: pulse_green 1s ease-in-out .1s infinite,
  nudge 1s ease-in-out .1s infinite;
}

.red {
  -webkit-animation: pulse_red 1s ease-in-out .2s infinite,
  nudge 1s ease-in-out .2s infinite;
}

.orange {
  -webkit-animation: pulse_orange 1s ease-in-out .3s infinite,
  nudge 1s ease-in-out .3s infinite;
}

.logoColor {
  -webkit-animation: pulse_logoColor 1s ease-in-out .4s infinite,
  nudge 1s ease-in-out .4s infinite;
}

@-webkit-keyframes pulse_blue {
  0%, 80%, 100% {
    background-color: #b4bec8;
  }
  40% {
    background-color: #00adef;
  }
}

@-webkit-keyframes pulse_green {
  0%, 80%, 100% {
    background-color: #b4bec8;
  }
  40% {
    background-color: #7fc400;
  }
}

@-webkit-keyframes pulse_red {
  0%, 80%, 100% {
    background-color: #b4bec8;
  }
  40% {
    background-color: #ff4d4d;
  }
}

@-webkit-keyframes pulse_orange {
  0%, 80%, 100% {
    background-color: #b4bec8;
  }
  40% {
    background-color: orange;
  }
}

@-webkit-keyframes pulse_logoColor {
  0%, 80%, 100% {
    background-color: #b4bec8;
  }
  40% {
    background-color: #2c675b;
  }
}

@-webkit-keyframes nudge {
  0%, 80% {
    transform: translate(0, 0);
  }
  40% {
    transform: translate(0, -20px);
  }
}


.live-icon {
  width: 14px;
  height: 14px;
  position: absolute;
  background-color: #ff435b;
  border-radius: 50%;
  z-index: 999;
}

.live-effect {
  width: 100%;
  height: 100%;
  background-color: #ff435b;
  border-radius: 50%;
  animation: live 2s linear infinite;
}

[id^='circle-'][id$='-info'] {
  display: none;
}

@keyframes live {
  from {
    transform: scale(0.8);
    opacity: 0.8;
  }
  to {
    transform: scale(2);
    opacity: 0.1;
  }
}
</style>

