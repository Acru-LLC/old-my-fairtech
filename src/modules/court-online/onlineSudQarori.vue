<script>
import {mapActions, mapMutations} from "vuex";
import i18n from "@/i18n";
import CheckService from "@/shared/services/checkService";
import Toast from "vue-toastification";

export default {
  data() {
    return {
      dailyIndex: {},
      loading: false,
      searchingModal: false,
      isTelefonActive: true,
      isJshshirActive: false,
      telefonInput: '',
      jshshirInput: '',
      fish: '',
      appealCount: '',
      appealDate: '',
      getUserDatas: {},
      modalVisible: false,
      selectedLanguage: 'UZ',
      languages: [
        {
          language: "uz",
          title: "O'Z",
        },
        {
          language: "uzCyrillic",
          title: "ЎЗ",

        },
        {
          language: "ru",
          title: "РУ",
        },
        // {
        //     flag: require("../shared/views/auth/images/mainPageImages/flags/united-states-of-america.png"),
        //     language: "en",
        //     title: "En",
        // }
      ],
      lan: this.$i18n.locale,
      text: null,
      currentLocale: {},
    }
  },
  computed: {
    getCurrentDate() {
      const now = new Date();
      // console.log(new Date())
      // console.log(now)
      // const options = { year: 'numeric', month: 'long', day: 'numeric' };
      // return now.toLocaleDateString(undefined, options);
      let day = now.getDate()
      let month = now.getMonth()
      let year = now.getFullYear()
      return day + ' ' + this.monthName(month) + ' ' + year
    },
    isSendButtonDisabled() {
      if (this.isTelefonActive) {
        return !this.telefonInput.trim();
      } else if (this.isJshshirActive) {
        return !this.jshshirInput.trim();
      }
      return true; // Disable the button if neither input is active
    },
  },
  methods: {
    ...mapActions(['setCount']),
    ...mapMutations({
      setLocale: "SET_LOCALE"
    }),
    async changeLocale(localeCode) {
      if (this.$i18n.locale !== localeCode) {
        window.location.reload();
        await this.setLocale(localeCode);
        this.currentLocale = this.languages.find(locale => locale.language === localeCode)
      }
    },
    selectLanguage(language) {
      this.selectedLanguage = language;
      // You can perform additional actions here when a language is selected
    },

    showInput(type) {
      if (type === 'phoneNumber') {
        this.isTelefonActive = true;
        this.isJshshirActive = false;
        this.jshshirInput = '';
      } else if (type === 'pinfl') {
        this.isTelefonActive = false;
        this.isJshshirActive = true;
        this.telefonInput = '';
      }
    },
    sendRequest() {
      this.loading = true;

      // Create check object based on active input
      let check = {
        stir: this.isJshshirActive ? this.telefonInput.replace(/\s+/g, '') : '',
        pinfl: this.isTelefonActive ? this.jshshirInput : '',
        // fish: this.fish,
        // appealCount: this.appealCount,
        // appealDate: this.appealDate
      }

      this.searchLoader = true;
      return CheckService.onlineSudQarori(check)
          .then((result) => {
            this.getUserDatas = result.data;

            // Clear inputs after request
            this.telefonInput = '';
            this.jshshirInput = '';
            // this.fish = '';
            // this.appealCount = '';
            // this.appealDate = '';
            this.searchLoader = false;
            this.loading = false;
            this.modalVisible = true;

            this.fetchDailyIndex();
          })
          .catch((err) => {
            console.error('Error:', err);
            this.$toast.error(this.$t('error_message'));
          })
          .finally(() => {
            this.searchLoader = false;
            this.searchingModal = false;
            this.loading = false;
          });
    },

    fetchDailyIndex() {
      this.searchLoader = true;
      return CheckService.getXabarnomaCount('ONLAYIN_QAROR')
          .then((result) => {
            this.dailyIndex = result.data;
            // console.log(result.data)
          })
          .catch((err) => {
            this.$toast.error('Error');
            // this.catchErr(err);
          })
          .finally(() => {
            this.searchLoader = false;
          });
    },
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
  },
  created() {
    this.fetchDailyIndex();
  },
}
</script>
<template>
  <div>
    <b-row style="background-color: #e3f2ef; min-height: 100vh">
      <div :style="modalVisible ? 'opacity: 0.5; pointer-events: none; z-index: 1' : ''"
           class="p-3 page-left-content"
           style="box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15); border-bottom-right-radius: 20px; border-top-right-radius: 20px; background-color: white">
        <div class="d-flex justify-content-between align-items-center ml-4">
          <a class="" href="/">
            <img src="@/assets/image/gerb.svg"
                 width="60" height="60"
                 alt="logo"
                 style="box-shadow: rgb(36, 98, 86) 1px 2px 8px; border-radius: 50%"
            />
          </a>
          <span class="text-color ml-2 font-size-15 custom-font font-weight-bold">
                    {{ $t('navbar.main_title') }}
                </span>
          <b-dropdown variant="white" right toggle-class="header-item" class="languageBar">
            <template v-slot:button-content>
              {{ text }}
            </template>
            <b-dropdown-item
                v-for="(entry, i) in languages"
                :key="i"
                :value="entry"
                :class="{ active: currentLocale.language === entry.language }"
                @click="changeLocale(entry.language)"
                class="notify-item"
            >
              <span class="align-middle">{{ entry.title }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <div class="ml-4 mb-2">
          <h5 class="font-weight-bold my-4 custom-font" style="color: #226358;">
            {{ $t('court_online.require_txt') }}
          </h5>
          <hr style="background-color: #226358; width: 25%; height: 2px;margin-left: 0; margin-top: -10px">
        </div>

        <div class="ml-4">
          <div class="d-flex justify-content-between shadow-box custom-font">
            <button @click="showInput('phoneNumber')"
                    :class="{'active-class-qaror': isTelefonActive, 'inactive-class-qaror': !isTelefonActive}"
                    class="btn">{{ $t('column.individual') }}
            </button>
            <button @click="showInput('pinfl')"
                    :class="{'active-class-qaror': isJshshirActive, 'inactive-class-qaror': !isJshshirActive}"
                    class="btn">{{ $t('column.legal_entity') }}
            </button>
          </div>
          <div class="d-flex justify-content-center my-2 custom-font">
            <input v-if="isJshshirActive" class="form-control shadow-box font-size-17" v-model="telefonInput"
                   v-mask="'### ### ###'" :placeholder="$t('bojxona_info.stir')"/>
            <input v-if="isTelefonActive" class="form-control shadow-box font-size-17" v-model="jshshirInput"
                   v-mask="'##############'" :placeholder="$t('pharm_check_sms.pinfl_placeholder')"/>
          </div>
          <button @click="sendRequest"
                  :disabled="!telefonInput && !jshshirInput"
                  class="btn btn-success d-flex justify-content-center green-gradient-bg2 custom-font font-size-17">
            {{ $t('pharm_check_sms.check_btn') }}
          </button>
          <div class="contact-info custom-font mt-3">
            <p class="custom-font"><img width="30" height="30" src="./tg_gradient.svg"
                                        alt=""><a target="_blank" href="https://t.me/rquzBot">{{ $t('sud_xabarnoma.telegram') }}</a></p>
            <p class="custom-font"><img width="30" height="30" src="./info_gradient.svg" alt="">
              {{ $t('sud_xabarnoma.support') }}: <a class="custom-font" href="tel:+998712074800">71-207-48-00 </a><a
                  class="custom-font" href="tel:1159">(1159)</a></p>
          </div>
        </div>

<!--        <span class="loader" v-if="loading"></span>-->
        <div class="container-box mt-3 ml-4">
          <div class="row text-center">
            <div class="col-md-6 mb-4">
              <div class="info-box">
                <h1 class="counter custom-font">{{ dailyIndex && dailyIndex.AllLoaded ? dailyIndex.AllLoaded : 0 }}</h1>
                <p class="custom-font text-color font-size-17">
                  {{ $t('sud_xabarnoma.downloaded') }}
                </p>
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <div class="info-box highlighted">
                <h1 class="counter custom-font">{{ dailyIndex && dailyIndex.loadedToday ? dailyIndex.loadedToday : 0 }}</h1>
                <p class="custom-font text-color font-size-17">
                  {{ $t('sud_xabarnoma.downloaded_today') }}
                </p>
              </div>
            </div>
          </div>
          <div class="row text-center">
            <div class="col-md-6 mb-4">
              <div class="info-box">
                <h1 class="counter custom-font">{{ dailyIndex && dailyIndex.AllChecked ? dailyIndex.AllChecked : 0 }}</h1>
                <p class="custom-font text-color font-size-17">
                  {{ $t('sud_xabarnoma.checked') }}
                </p>
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <div class="info-box highlighted">
                <h1 class="counter custom-font">{{ dailyIndex && dailyIndex.checkedToday ? dailyIndex.checkedToday : 0 }}</h1>
                <p class="custom-font text-color font-size-17">
                  {{ $t('sud_xabarnoma.checked_today') }}
                </p>
              </div>
            </div>
          </div>

<!--          <div class="contact-info custom-font ">-->
<!--            <p class="custom-font"><img width="30" height="30" src="./tg_gradient.svg"-->
<!--                                        alt=""><a target="_blank" href="https://t.me/rquzBot">{{ $t('sud_xabarnoma.telegram') }}</a></p>-->
<!--            <p class="custom-font"><img width="30" height="30" src="./info_gradient.svg" alt="">-->
<!--              {{ $t('sud_xabarnoma.support') }}: <a class="custom-font" href="tel:+998712074800">71-207-48-00 </a><a-->
<!--                  class="custom-font" href="tel:1159">(1159)</a></p>-->
<!--          </div>-->

          <footer>
            <b-row>
              <b-col>
                <b-button style="background: #F39138" class="btn btn-warning float-left" size="md" @click="$router.go(-1)">
                  &leftarrow; {{ $t("actions.back") }}
                </b-button>
              </b-col>
              <b-col>
                <p class="custom-font mb-0 d-flex">©{{ $t('sud_xabarnoma.qomita') }}</p>
                <p class="custom-font">2021-2024</p>
              </b-col>
              <b-col>
                <span class="mb-0" style="color: #bfbfbfee">{{ $t('site_creator') }}</span>
                <p class="custom-font">{{ $t('rtam') }} 2024</p>
              </b-col>
            </b-row>
          </footer>
        </div>

      </div>
      <div class="d-flex justify-content-center align-items-center position-relative page-right-content">
        <div class="logo"></div>
        <div v-if="modalVisible" class="modal-container">
          <span class="close-btn" @click="modalVisible = false">&times;</span>
          <div class="modal-number mt-3 custom-font text-center w-75"
               :style="getUserDatas !== 0 ? 'background-color: rgba(253, 240, 240, .5)' : 'background-color: rgba(240, 253, 244, .5)'">
            {{ getUserDatas ? getUserDatas : 0 }}


            <p class="modal-text font-size-17 custom-font" v-if="getUserDatas !== 0">
              {{ $t('court_online.modal_red_message') }}
            </p>
            <p class="modal-text font-size-17 custom-font" v-else>
              {{ $t('court_online.modal_message') }}
            </p>
          </div>
          <div class="text-color text-center p-3"
          >
            <span
                @click="modalVisible = false"
                class="modal-button1 btn btn-warning custom-font">
              {{ $t('submodules.dxa.close_modal') }}
            </span>
            <a href="https://cabinet.fairtech.uz/online-qaror" target="_blank"
               class="modal-button green-gradient-bg2 btn btn-success custom-font">
              {{ $t('court_online.take_court_btn') }}
            </a>
          </div>
        </div>
      </div>
    </b-row>
  </div>
</template>
<style>
@font-face {
  font-family: 'NoirPro';
  src: url('NoirPro-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.custom-font {
  font-family: 'NoirPro', sans-serif;
}
.header {
  width: 100%;
  height: 10%;
  padding: 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 8px 5px rgba(41, 105, 93, 0.20);
  justify-content: space-between;
}

.header-text {
  margin-left: 1%;
}

.header-main-text a {
  color: #2C665A;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 38px;
  line-height: 35px;
}

.header-sub-text {
  color: #2C665A;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 12px;
}

.container-box {
  max-width: 600px;
  //margin: 0 auto;
}

.info-box {
  background-color: #f8fdfc;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.info-box.highlighted {
  background-color: #e6f8f4;
}

.counter {
  font-size: 56px;
  color: #2B675B;
  font-weight: bold;
}

.contact-info p {
  font-size: 16px;
  margin-bottom: 10px;
  color: #2B675B;
}

.contact-info i {
  margin-right: 8px;
  font-size: 20px;
  color: #2B675B;
}

footer p {
  font-size: 16px;
  color: #2B675B;
}


.languageBar {
  display: flex;
  align-items: center;
  justify-content: center;
  //margin-right: 10px;
  //top: 50px;
  //left: 50px;
  //position: absolute;
  border: 2px solid #2C665A;
  border-radius: 6px;
  width: 68px;
  height: 40px;
}

.language-bar {
  background-color: #E1E8E7;
  border-radius: 50%;
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.language-img {
  width: 21px;
  height: 21px;
  margin-right: 10px;
}

.language-select {
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 33px;
  height: 33px;
  margin-right: 0.25rem;
}
.logo {
  width: 700px;
  height: 700px;
  background-image: url("logo.png");
  background-size: cover;
  opacity: 0.3;
}
.language-select .selected-language {
  display: flex;
  align-items: center;
  padding: 5px;
  border: 1px solid #ffffff;
  border-radius: 50%;
  background-color: #E1E8E7;
}

.language-select .selected-language i {
  margin-right: 10px;
}

.language-select .dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.language-select .dropdown-content a {
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: #333;
}

.language-select .dropdown-content a i {
  margin-right: 10px;
}

.language-select .dropdown-content a:hover {
  background-color: #e4e4e4;
}

.language-select.active .dropdown-content {
  display: block;
  z-index: 2;
}

/* Close Button */
.modal-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //width: 100%;
  //max-width: 800px; /* Adjust based on your design */
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  color: #888;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0px 0px 6px 2px rgb(44, 102, 90);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Number Style */
.modal-number {
  font-size: 100px;
  color: #2C665A; /* Dark Green */
  margin-bottom: 20px;
}

/* Modal Text */
.modal-text {
  font-size: 18px;
  color: #2C665A; /* Dark Green */
  margin-bottom: 30px;
}

/* Button Style */
.modal-button {
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
/* Button Style */
.modal-button1 {
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 3rem;
}

.modal-button:hover {
  background-color: #005333; /* Darker Green */
}
.modal-button1:hover {
  background-color: orange; /* Darker Green */
}

.date-label {
  width: 156px;
  height: 40px;
  border-radius: 6px;
  border: 2px solid #2C665A;
  background: rgba(217, 217, 217, 0.00);
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  position: relative;
  //display: inline-block; transition: all 0.4s;
}

.date-label span {
  background-color: #2C665A;
  display: block;
  position: absolute;
  transition: all 0.4s;
}

.date-label span:nth-child(odd) {
  width: 0;
  height: 2px;
}

.date-label span:nth-child(even) {
  width: 2px;
  height: 0;
}

.date-label span:nth-child(1) {
  left: 0;
  bottom: 0;
}

.date-label span:nth-child(2) {
  right: 0;
  bottom: 0;
}

.date-label span:nth-child(3) {
  right: 0;
  top: 0;
}

.date-label span:nth-child(4) {
  left: 0;
  top: 0;
}

.date-label:hover span:nth-child(odd) {
  width: 100%;
}

.date-label:hover span:nth-child(even) {
  height: 100%;
}

.date-label:hover {
  box-shadow: 0 2px 4px rgba(75, 0, 130, 0.2);
}

.date-text {
  color: #2C665A;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 15px;
  line-height: 36px; /* 93.333% */
}

.active-class-qaror {
  color: #2B675B !important;
  font-size: 17px;
  width: 48%;
  font-weight: bolder;
  border: none;
  border-bottom: 3px solid transparent; /* Makes sure the bottom border space is reserved */
  background-image: linear-gradient(to right, #2A6D60, #217C69, #0E977B);
  background-size: 100% 3px; /* 100% width and 3px height to match the border-bottom size */
  background-repeat: no-repeat;
  background-position: bottom;
}
.shadow-box{
  box-shadow: 0px 0px 6px 4px rgba(227, 242, 239, 1)!important;
  border-radius: 8px;
}

.inactive-class-qaror {
  //background-color: #E1E8E7 !important;
  color: #2B675B !important;
  font-size: 17px;
  width: 48%;
}
.loader {
  width: 8px;
  height: 40px;
  border-radius: 4px;
  display: block;
  margin: 20px auto;
  position: relative;
  background: currentColor;
  color: #2c665a;
  box-sizing: border-box;
  animation: animloader 0.3s 0.3s linear infinite alternate;
}

.loader::after, .loader::before {
  content: '';
  width: 8px;
  height: 40px;
  border-radius: 4px;
  background: currentColor;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  box-sizing: border-box;
  animation: animloader 0.3s  0.45s  linear infinite alternate;
}
.loader::before {
  left: -20px;
  animation-delay: 0s;
}

@keyframes animloader {
  0%   { height: 48px}
  100% { height: 4px}
}
.page-left-content{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
}
.page-right-content{
  display: none;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 100%;
}
@media (min-width: 1280px) {
  .page-right-content {
    display: flex;
    flex: 0 0 calc(100% - 600px);
    max-width: calc(100% - 600px);
  }
}
@media (min-width: 1280px) {
  .page-left-content {
    padding: 1.5rem;
    flex: 0 0 600px;
    max-width: 600px;
  }
}
</style>
