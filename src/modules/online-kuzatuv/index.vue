<script>
import {mapActions, mapMutations} from "vuex";
import i18n from "@/i18n";
import CheckService from "@/shared/services/checkService";
import Toast from "vue-toastification";

export default {
  data() {
    return {
      showText:false,
      showTextMazmun:false,
      controlWorkNumber: null,
      loading: false,
      searchingModal: false,
      currentLocale: {},
      activeInput: 'workNumber',
      workNumber: null,
      pinfl: null,
      stir: null,
      fish: '',
      appealCount: '',
      appealDate: '',
      getUserDatas: {},
      modalVisible: false,
    }
  },
  computed: {
    nameState() {
      // if(this.createFirstInstItem.appealWorkNumber) {
      const pattern1 = /^\d+\s*-\s*\d+\s*-\s*\d+\s*\/\s*\d+$/;
      const pattern2 = /^\d+\s*\/\s*\d+\s*-\s*\d+\s*-\s*\d+$/;
      const pattern3 = /^\d+\s*-\s*\d+\s*\/\s*\d+\s*-\s*\d+$/;
      return (pattern1.test(this.workNumber) || pattern2.test(this.workNumber) || pattern3.test(this.workNumber)) ? true : false
      // }
      // else {
      //   return true
      // }
    },
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
      if (this.isWorkNumberActive) {
        return !this.workNumber.trim();
      } else if (this.isPinflActive) {
        return !this.pinfl.trim();
      } else if (this.isStirActive) {
        return !this.stir.trim();
      }
      return true; // Disable the button if neither input is active
    },
    activeInputValue() {
      return this[this.activeInput];
    },
    lenghtOfCaseBrake(){
      return this.getUserDatas.step1?.resultsCaseReviews.length
    },
    getLocale() {
      return localStorage.getItem('locale') ? localStorage.getItem('locale') : 'uzCyrillic'
    },
  },
  methods: {
    ...mapActions(['setCount']),
    ...mapMutations({
      setLocale: "SET_LOCALE"
    }),
    showInput(type) {
      if (type === 'workNumber') {
        this.activeInput = 'workNumber';
        this.stir = '';
        this.pinfl = '';
      } else if (type === 'stir') {
        this.activeInput = 'stir';
        this.workNumber = '';
        this.pinfl = '';
      } else if (type === 'pinfl') {
        this.activeInput = 'pinfl';
        this.workNumber = '';
        this.stir = '';
      }
    },
    sendRequest() {
      this.loading = true;
      let check = {
        workNumber: this.workNumber,
        stir: this.stir,
        pinfl: this.pinfl
      }
      this.searchLoader = true;
      return CheckService.onlineKuzatuv(check)
          .then((result) => {
            this.getUserDatas = result.data;
            // console.log(result.data)
            this.phoneNumber = '';
            this.pinfl = '';
            this.fish = '';
            this.appealCount = '';
            this.appealDate = '';
            this.searchLoader = false;
            this.loading = false;
            if (
                result.data &&
                (result.data.count !== null ||
                    result.data.date !== null ||
                    result.data.firstName !== null ||
                    result.data.lastName !== null ||
                    result.data.middleName !== null)
            ) {
              this.$toast.success(this.$t('statistics_info.download_success'));
              this.modalVisible = true;
            } else {
              this.$toast.error(this.$t('statistics_info.empty_message'));
              this.modalVisible = true;
            }
            // console.log(result.data)
          })
          .catch((err) => {
            this.$toast.error('Error');
            // this.catchErr(err);
          })
          .finally(() => {
            this.searchLoader = false;
            this.searchingModal = false;
            this.loading = false;
          });
    },
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
  },
  watch: {
    'workNumber': {
      handler(newVal) {
        if (newVal) {
          this.controlWorkNumber = this.nameState;
        }
      }
    },
  }
}
</script>
<template>
  <div class="row m-0">
    <b-col class="mb-2 mt-3">
      <b-button style="background: #F39138" class="btn btn-warning" size="md" @click="$router.go(-1)">
        {{ $t("actions.back") }}
      </b-button>
    </b-col>
    <div class="col-12 mt-4">
      <div class="text-center">
        <h4 class="font-weight-bold d-inline-block mb-4" style="color: #226358;">
          {{ $t('pharm_check_sms.main_title') }}
        </h4>
      </div>
      <div class="d-flex justify-content-center">
        <h4 class="p-5" style="color: #226358">
          {{ $t('online_kuzatuv.require_txt') }}
        </h4>
      </div>
      <div class="card mx-auto d-block p-3" style="border: 1px solid #226358; width: 750px">
        <div class="d-flex justify-content-between">
          <button @click="showInput('workNumber')"
                  :class="{'active-class-style': activeInput === 'workNumber', 'inactive-class-style': activeInput !== 'workNumber'}"
                  class="btn">
            {{ $t('online_kuzatuv.work_number_placeholder') }}
          </button>
          <button @click="showInput('stir')"
                  :class="{'active-class-style': activeInput === 'stir', 'inactive-class-style': activeInput !== 'stir'}"
                  class="btn">
            {{ $t('product_dashboard_info.stir') }}
          </button>
          <button @click="showInput('pinfl')"
                  :class="{'active-class-style': activeInput === 'pinfl', 'inactive-class-style': activeInput !== 'pinfl'}"
                  class="btn">
            {{ $t('services.online_checking.pinfl_placeholder') }}
          </button>
        </div>
        <b-row class="d-flex justify-content-center my-3">
<!--          <input-->
<!--              v-if="activeInput === 'workNumber'"-->
<!--              class="form-control"-->
<!--              style="width: 48%!important;"-->
<!--              v-model="workNumber"-->
<!--              placeholder="0-00-2024/00"-->
<!--          />-->
<!--          <label class="base-form-component__label" for="input-live">{{ $t('purchase_info.form1.number') }} <span style="color: red">*</span></label>-->
          <b-col cols="6" v-if="activeInput === 'workNumber'">
          <b-form-input
              v-if="activeInput === 'workNumber'"
              id="input-live"
              v-model="workNumber"
              :state="nameState"
              class=""
              placeholder="0-00-2024/00"
              trim
          ></b-form-input>
          <b-form-invalid-feedback
              id="input-live-feedback"
              v-if="activeInput === 'workNumber'"
          >
            <span v-if="workNumber">{{ $t('online_kuzatuv.errorFeedback') }}</span>
          </b-form-invalid-feedback>
          </b-col>
          <b-col cols="6" v-if="activeInput === 'stir'">
          <input
              v-if="activeInput === 'stir'"
              class="form-control"
              v-model="stir"
              maxlength="9"
              :state="nameState"
              placeholder="000 000 000"
          />
          </b-col>
          <b-col cols="6"  v-if="activeInput === 'pinfl'">
          <input
              v-if="activeInput === 'pinfl'"
              class="form-control"
              v-model="pinfl"
              maxlength="14"
              type="number"
              placeholder="00000000000000"
          />
          </b-col>
        </b-row>
        <button
            @click="sendRequest"
            :disabled="!activeInputValue"
            class="btn btn-success w-50 d-flex justify-content-center mx-auto"
            style="background-color: #226358"
        >
          {{ $t('online_kuzatuv.take_court_btn') }}
        </button>
      </div>

      <b-modal id="modal-lg" size="md" centered no-close-on-backdrop no-close-on-esc hide-header-close>
        <div class="w-100 h-50 pt-3 pb-3">
          <div class="bg-white w-100 h-100 d-flex justify-content-center p-3">
            <b-row cols="12" class="text-center">
              <b-col style="height: 0" class="text-success">
                {{ $t('pharm_check_sms.murojaat_count') }}
                <b-form-text class="font-size-17 font-weight-bold" style="color: #226358">
                  {{ getUserDatas.count ? getUserDatas.count : 0 }} ta
                </b-form-text>
              </b-col>
            </b-row>
          </div>
        </div>
        <template v-slot:modal-footer>
          <div class="w-100 d-flex justify-content-between">
            <b-button @click="modalVisible = false" class=" border">
              {{ $t('submodules.dxa.close_modal') }}
            </b-button>
            <a href="https://cabinet.fairtech.uz/" target="_blank" class="btn btn-primary ">
              {{ $t('sud_xabarnoma.take_court_btn') }}
            </a>
          </div>
        </template>
      </b-modal>

      <span class="loader" v-if="loading"></span>

      <div class="mt-4 w-50 mx-auto p-2 mb-5" style="border: 1px solid #439b8e; border-radius: 5px" v-for="(item, index) in getUserDatas" :key="index">
        <b-row class="ml-1">
            <span class="text-white p-2 font-weight-bold font-size-15" style="background-color: #226358; border-radius: 5px; width: 345px">
              {{ $t('online_kuzatuv.workNumber') }}: {{ item && item.step2_all && item.step2_all.numberOfWork ? item.step2_all.numberOfWork : '---' }}
            </span>
        </b-row>
        <div class="justify-content-center p-2 my-2" style="border: 1px solid #439b8e; border-radius: 5px">
          <b-col class="p-2 ml-0" style="background-color: #226358; border-radius: 5px; width: 340px">
            <span class="text-white p-2 font-weight-bold font-size-15">{{ $t('online_kuzatuv.qozgatilgan_infos') }}</span>
          </b-col>
          <b-row class="mt-3">
            <b-col>
              <span style="color:#839690;">{{ $t('online_kuzatuv.subject_name') }}</span>
            </b-col>
            <b-col>
              <span style="color:#839690;">{{ $t('online_kuzatuv.qozgatish_asosi') }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="detailText">
                {{item.step1.nameSubject ? item.step1.nameSubject : '---'}}
<!--                {{-->
<!--                  getName({-->
<!--                    nameLt: item.regionNameLt,-->
<!--                    nameUz: item.regionNameRu,-->
<!--                    nameRu: item.regionNameUz,-->
<!--                  })-->
<!--                }}-->
              </p>
            </b-col>
            <b-col>
              <p class="detailText"> {{item.step1.otherBasisName ? item.step1.otherBasisName : '---'}}</p>
            </b-col>
          </b-row>

          <b-row class="mt-4">
            <b-col>
              <span style="color:#839690;">{{ $t('online_kuzatuv.qozgatilgan_soha') }}</span>
            </b-col>
            <b-col>
                  <span class="title" style="color:#839690;">{{ $t('online_kuzatuv.register_date') }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="detailText">
                {{
                  getName({
                    nameLt: item.step1.fieldWorkDto.nameLt,
                    nameUz: item.step1.fieldWorkDto.nameRu,
                    nameRu: item.step1.fieldWorkDto.nameUz,
                  }) ? getName({
                    nameLt: item.step1.fieldWorkDto.nameLt,
                    nameUz: item.step1.fieldWorkDto.nameRu,
                    nameRu: item.step1.fieldWorkDto.nameUz,
                  }) : '---'
                }}
              </p>
            </b-col>
            <b-col>
              <span class="detailText">
                {{ item.step1?.regstrationDate ? item.step1.regstrationDate : '' }}
              </span>
            </b-col>

<!--            <b-col>-->
<!--              <p v-if="item && item.step2_all && item.step2_all.resultDecisionNewDto">-->
<!--                {{-->
<!--                  getName({-->
<!--                    nameLt: item.step2_all.resultDecisionNewDto.nameLt,-->
<!--                    nameUz: item.step2_all.resultDecisionNewDto.nameRu,-->
<!--                    nameRu: item.step2_all.resultDecisionNewDto.nameUz,-->
<!--                  })-->
<!--                }}-->
<!--              </p>-->
<!--            </b-col>-->
          </b-row>
          <b-row>
            <b-col>
              <span class="title" style="color:#839690;">{{ $t('online_kuzatuv.buzilgan_hujjatlar') }}</span>
            </b-col>
            <b-col>
              <span class="title" style="color:#839690;">{{ $t('online_kuzatuv.aniqlangan_holat') }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col>

              <p class="mb-2"><b class="detailText">
                            <span v-if="!showText">
                           <span v-if="item.step1?.resultsCaseReviews.length > 0">
                             <span v-if="getLocale == 'uz'">{{item.step1?.resultsCaseReviews[0].brokenDocsDto?.nameLt.split(' ').slice(0, 5).join(' ')}}</span>
                             <span v-if="getLocale == 'uzCyrillic'">{{item.step1?.resultsCaseReviews[0].brokenDocsDto?.nameUz.split(' ').slice(0, 5).join(' ')}}</span>
                             <span v-if="getLocale == 'ru'">{{item.step1?.resultsCaseReviews[0].brokenDocsDto?.nameRu.split(' ').slice(0, 5).join(' ')}}</span>
                           </span>
                            </span>
                <ol v-if="showText">
                  <li v-for="(sItem, sIndex) in item.step1?.resultsCaseReviews" :key="sIndex">
                    {{
                      getName({
                        nameLt: sItem.brokenDocsDto.nameLt,
                        nameUz: sItem.brokenDocsDto.nameUz,
                        nameRu: sItem.brokenDocsDto.nameRu,
                      })
                    }}
                  </li>
                </ol>
                <span @click="showText = !showText" style="color:#f39138; cursor: pointer;">
                              <span v-if="!showText"> ...{{$t('actions.details')}} ({{item.step1?.resultsCaseReviews.length}})</span>
                              <span v-else> ...{{$t('actions.close')}}</span>
                  <!--                              {{ !showText ? ($t('actions.details'))(lenghtOfCaseBrake) : $t('actions.hide')}}-->
                            </span>
              </b></p>
              <!--              <b-row>-->
              <!--                <b-col>-->
              <!--                  <p class="value">{{item && item.step2_all && item.step2_all.seeWorkDate}}</p>-->
              <!--                </b-col>-->
              <!--                <b-col>-->
              <!--                  <p class="value">{{item && item.step2_all && item.step2_all.timeEnd}}</p>-->
              <!--                </b-col>-->
              <!--              </b-row>-->
            </b-col>
            <b-col>
              <p class="mb-2"><b class="detailText">
                            <span v-if="item.step1?.definedCaseContent?.split(' ').length < 5">
                                {{ item.step1?.definedCaseContent ? item.step1.definedCaseContent : '' }}
                            </span>
                <span v-else>
                               <span v-if="!showTextMazmun">
                                <span v-if="item.step1?.definedCaseContent">
                                <span>{{
                                    item.step1?.definedCaseContent ? item.step1.definedCaseContent.split(' ').slice(0, 5).join(' ') : ''
                                  }}</span>
                                </span>
                            </span>
                               <span v-if="showTextMazmun">
                              {{ item.step1?.definedCaseContent ? item.step1.definedCaseContent : '' }}
                            </span>
                            <span @click="showTextMazmun = !showTextMazmun" style="color:#f39138; cursor: pointer;">
                              <span v-if="!showTextMazmun"> ...{{ $t('actions.details') }}</span>
                              <span v-else> ...{{ $t('actions.close') }}</span>
                            </span>
                            </span>
              </b></p>
            </b-col>
          </b-row>
        </div>

        <div class="justify-content-center p-2 my-2" style="border: 1px solid #439b8e; border-radius: 5px">
          <b-col class="p-2 ml-0" style="background-color: #226358; border-radius: 5px; width: 340px">
            <span class="text-white p-2 font-weight-bold font-size-15">{{ $t('online_kuzatuv.seeWork_info') }}</span>
          </b-col>
          <b-row class="mt-3">
            <b-col>
              <span style="color:#839690;">{{ $t('online_kuzatuv.chairmon') }}</span>
            </b-col>
            <b-col>
              <span style="color:#839690;">{{ $t('online_kuzatuv.seeWorkdate') }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="detailText">
                {{item.step2_all.chairmanCommission ? item.step2_all.chairmanCommission : '---'}}
              </p>
            </b-col>
            <b-col>
                  <span class="value detailText">{{item && item.step2_all && item.step2_all.seeWorkDate}}</span>
                  <span class="value detailText"> {{item && item.step2_all && item.step2_all.timeEnd}}</span>
            </b-col>
          </b-row>
        </div>

        <div class="justify-content-center p-2 my-2" style="border: 1px solid #439b8e; border-radius: 5px">
          <b-col class="p-2 ml-0" style="background-color: #226358; border-radius: 5px; width: 340px">
            <span class="text-white p-2 font-weight-bold font-size-15">{{ $t('online_kuzatuv.final_result') }}</span>
          </b-col>
          <b-row>
            <!-- Left Column with Two Boxes -->
            <b-col>
              <!-- First Box: Qaror mazmuni -->
              <div class="left-box my-3">
                <span class="box-title" style="color:#839690;">{{ $t('online_kuzatuv.court_mind') }}</span>
                <p v-if="item && item.step2_all && item.step2_all.resultDecisionNewDto.code === 'QANOATLANTIRILDI'" style="color:#f39138;" class="detailText">
                  {{
                    getName({
                      nameLt: item.step2_all.resultDecision.nameLt,
                      nameUz: item.step2_all.resultDecision.nameRu,
                      nameRu: item.step2_all.resultDecision.nameUz,
                    }) ?
                    getName({
                      nameLt: item.step2_all.resultDecision.nameLt,
                      nameUz: item.step2_all.resultDecision.nameRu,
                      nameRu: item.step2_all.resultDecision.nameUz,
                    }) : '---'
                  }}
                </p>
                <p v-else style="color:#f39138;">
                  {{
                    getName({
                      nameLt: item.step2_all.resultDecisionNewDto.nameLt,
                      nameUz: item.step2_all.resultDecisionNewDto.nameRu,
                      nameRu: item.step2_all.resultDecisionNewDto.nameUz,
                    }) ?
                    getName({
                      nameLt: item.step2_all.resultDecisionNewDto.nameLt,
                      nameUz: item.step2_all.resultDecisionNewDto.nameRu,
                      nameRu: item.step2_all.resultDecisionNewDto.nameUz,
                    }) : '---'
                  }}
                </p>
              </div>
              <!-- Second Box: Qaror sanasi -->
              <div class="left-box my-3">
                <span class="box-title" style="color:#839690;">{{ $t('online_kuzatuv.court_date') }}</span>
                <div>
                <span class="value detailText">{{item && item.step2_all && item.step2_all.decisionDate}}</span>
                <span class="value detailText"> {{item && item.step2_all && item.step2_all.timeEnd}}</span>
                </div>
              </div>
            </b-col>

            <!-- Right Column with Larger Box -->
            <b-col>
              <div class="my-3">
                <span class="box-title" style="color:#839690;">{{ $t('online_kuzatuv.short_mind') }}</span>
                <p class="detailText">
                  {{
                    item.step2_all?.decisionOfContent ? editingItem.step2_all.decisionOfContent : '---'
                  }}
                </p>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
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

.modal-dialog {
  max-height: 150px !important;
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

.active-class-style {
  background-color: #2B675B !important;
  color: white !important;
  font-size: 17px;
  //width: 80%;
}

.inactive-class-style {
  background-color: #E1E8E7 !important;
  color: #2B675B !important;
  font-size: 17px;
  //width: 48%;
}
p{
  font-size: 16px;
  color: #2B675B;
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
.detailText {
  color: #2b6c58;
  font-size: 15px;
}
@keyframes animloader {
  0%   { height: 48px}
  100% { height: 4px}
}
</style>
