<template>
  <div>
    <!-- Region Selection Part -->
    <div v-if="!tableVisible">
      <b-row class="ml-4">
        <b-col class="mb-2 mt-3">
          <b-button style="background: #F39138" class="btn btn-warning p-2" size="md" @click="$router.go(-1)">
            {{ $t("actions.back") }}
          </b-button>
        </b-col>
      </b-row>
      <b-col cols="12">
        <b-row class="d-flex justify-content-center">
          <b-col cols="12" md="6" lg="4" xl="2" class="px-1" v-for="(element, index) in regionData?.slice(0, 12)" :key="index">
            <div class="frame-hover"
                 :class="{ 'active': element.value === activeBox }">
              <div class="box-style"
                   :class="{ 'active': element.value === activeBox,'activeShadow': element.value == activeBox }" @click="selectRegion(element)">
                <p class="box-title-style" :class="{ 'activeText': element.value == activeBox }">{{ $t(element.title) }}</p>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="d-flex justify-content-center">
          <b-col cols="12" md="6" lg="4" xl="2" class="px-1" v-for="(element, index) in regionData?.slice(12)" :key="index">
            <div class="frame-hover"
                 :class="{ 'active': element.value === activeBox }">
              <div class="box-style"
                   :class="{ 'active': element.value === activeBox,'activeShadow': element.value == activeBox }" @click="selectRegion(element)">
                <p class="box-title-style" :class="{ 'activeText': element.value == activeBox }">{{ $t(element.title) }}</p>
              </div>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4" xl="2" class="px-1">
            <div class="frame-hover d-none"></div>
          </b-col>
          <b-col cols="12" md="6" lg="4" xl="2" class="px-1">
            <div class="frame-hover d-none"></div>
          </b-col>
          <b-col cols="12" md="6" lg="4" xl="2" class="px-1">
            <div class="frame-hover d-none"></div>
          </b-col>
        </b-row>
      </b-col>
    </div>

    <!-- Table Part -->
    <div v-if="tableVisible" class="p-4">

      <b-row class="mb-3 d-flex justify-content-between">
        <b-col cols="1">
          <b-button style="background-color: #F39138" variant="warning" class="p-2" @click="goBack">
            <span>{{$t('actions.back')}}</span>
          </b-button>
        </b-col>
        <b-col cols="6"></b-col>
        <b-col cols="3" class="d-flex justify-content-end">
          <BaseDatePickerWithValidation v-model="today" only-form-element not-required
                                        format="DD-MM-YYYY"/>
          <b-button variant="primary" class="p-2 ml-1 d-flex align-items-center" style="height: 34px" @click="sendRequest(selectedRegion.value)"><span>{{$t('actions.search')}}</span></b-button>
        </b-col>
      </b-row>
      <b-row class="mb-3 d-flex justify-content-center">
        <p v-if="selectedRegionTitle !== $t('court_table_list.region.qomita')"><b class="text-color">{{$t('sud_xabarnoma.qomita')}} {{ selectedRegionTitle }} </b>{{$t('court_table_list.region.first_part_text')}} <b class="text-color">{{ today }}</b>
          {{ $t('court_table_list.region.second_part_text') }}</p>

        <p v-else><b class="text-color"> {{ $t('court_table_list.region.only_qomita') }}</b>{{$t('court_table_list.region.first_part_for_qomita')}} <b class="text-color">{{ formattedDate }}</b>
          {{ $t('court_table_list.region.second_part_text') }}</p>
      </b-row>
      <!-- Scrollable Table Container -->
      <span class="loader" v-if="loading"></span>
      <div class="table-container" v-if="!loading">
        <table class="table table-striped text-center">
          <thead class="bg-primary text-white">
          <tr class="text-center">
            <th class="align-middle">№</th>
            <th class="align-middle"><span>{{ $t('court_table_list.table_columns.subyekt') }}</span></th>
            <th class="align-middle"><span>{{ $t('court_table_list.table_columns.soha') }}</span></th>
            <th class="align-middle"><span>{{ $t('court_table_list.table_columns.docs') }}</span></th>
            <th class="align-middle"><span>{{ $t('court_table_list.table_columns.work_number') }}</span></th>
            <th class="align-middle"><span>{{ $t('court_table_list.table_columns.date_time') }}</span></th>
            <th class="align-middle"><span>{{ $t('court_table_list.table_columns.chairmon') }}</span></th>
            <th class="align-middle"><span>{{ $t('court_table_list.table_columns.work_step') }}</span></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in cases" :key="index">
            <td class="align-middle"><span>{{ index + 1 }}</span></td>
            <td class="align-middle"><span>{{ item && item.step1 &&item.step1.nameSubject }}</span></td>
            <td class="align-middle" v-if="item.step1 && item.step1.fieldWorkDto">
              <span>
              {{
                getName({
                  nameLt: item.step1.fieldWorkDto.nameLt,
                  nameUz: item.step1.fieldWorkDto.nameRu,
                  nameRu: item.step1.fieldWorkDto.nameUz,
                })
              }}
              </span>
            </td>
            <td class="align-middle">
              <p class="mb-2">
                <b class="detailText">
      <span v-if="!showTextIndices.includes(index)">
        <span v-if="item.step1?.resultsCaseReviews.length > 0">
          <span v-if="getLocale == 'uz'">
            {{ item.step1?.resultsCaseReviews[0].brokenDocsDto?.nameLt.split(' ').slice(0, 5).join(' ') }}
          </span>
          <span v-if="getLocale == 'uzCyrillic'">
            {{ item.step1?.resultsCaseReviews[0].brokenDocsDto?.nameUz.split(' ').slice(0, 5).join(' ') }}
          </span>
          <span v-if="getLocale == 'ru'">
            {{ item.step1?.resultsCaseReviews[0].brokenDocsDto?.nameRu.split(' ').slice(0, 5).join(' ') }}
          </span>
        </span>
      </span>
                  <ol v-if="showTextIndices.includes(index)" class="ml-3">
                    <li v-for="(tItem, tIndex) in item.step1?.resultsCaseReviews" :key="tIndex">
                      {{
                        getName({
                          nameLt: tItem.brokenDocsDto?.nameLt,
                          nameUz: tItem.brokenDocsDto?.nameUz,
                          nameRu: tItem.brokenDocsDto?.nameRu,
                        })
                      }}
                    </li>
                  </ol>
                  <span @click="toggleShowText(index)" style="color:#f39138; cursor: pointer;">
        <span v-if="!showTextIndices.includes(index)"> ...{{ $t('actions.details') }} ({{ item.step1?.resultsCaseReviews.length }})</span>
        <span v-else> ...{{ $t('actions.close') }}</span>
      </span>
                </b>
              </p>
            </td>

            <td class="align-middle"><span>{{ item.step1.numberOfWork }}</span></td>
            <td class="align-middle">
              <span>
              {{
                item.step1?.dateEnd ? item.step1.dateEnd : item.step2_all?.seeWorkDate ? item.step2_all.seeWorkDate : '- - -'
              }},
              {{
                item.step1?.timeEnd ? item.step1.timeEnd.slice(0, 5) : item.step2_all?.timeEnd ? item.step2_all.timeEnd.slice(0, 5) : '- - -'
              }}
              </span>
            </td>
            <td class="align-middle"><span>{{ item.step1.chairmanCommission }}</span></td>
            <td class="align-middle"><span>{{ $t('court_table_list.table_columns.first_step') }}</span></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>


<!--      No data modal-->
    <b-modal id="no-data-modal" hide-footer hide-header no-close-on-esc no-close-on-backdrop size="lg" centered v-model="emptyModal">
      <div class="d-flex flex-column align-items-center modal-body-custom">
        <p class="font-size-17">{{ $t('court_table_list.empty_modal') }}</p>
        <b-button style="width: 150px; border-radius: 10px; background-color: #f39138" class="btn-warning p-2" @click="closeModal"><span>{{ $t('actions.close') }}</span></b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import CheckService from "@/shared/services/checkService";
import axios from "axios";

export default {
  name: "Region",
  data: () => ({
    showTextIndices: [],
    emptyModal: false,
    showText: false,
    selectedRegion: null,
    today: '',              // Display format: DD-MM-YYYY
    backendDate: '',        // Backend format: YYYY-MM-DD
    formattedDate: '',      // Also in display format: DD-MM-YYYY
    selectedOption: null,
    regionIsCentral: null,
    testValue: {},
    regionData: [
      // { value: 17, title: "rais.region.republic" },
      { value: 1735, title: "court_table_list.region.qoraqalpoq" },
      { value: 1703, title: "court_table_list.region.andijon" },
      { value: 1706, title: "court_table_list.region.buxoro" },
      { value: 1708, title: "court_table_list.region.jizzax" },
      { value: 1712, title: "court_table_list.region.navoi" },
      { value: 1714, title: "court_table_list.region.namangan" },
      { value: 1718, title: "court_table_list.region.samarqand" },
      { value: 1724, title: "court_table_list.region.sirdaryo" },
      { value: 1722, title: "court_table_list.region.surxandaryo" },
      { value: 1730, title: "court_table_list.region.fargona" },
      { value: 1727, title: "court_table_list.region.toshkentV" },
      { value: 1726, title: "court_table_list.region.toshkentSh" },
      { value: 1710, title: "court_table_list.region.qashqadaryo" },
      { value: 1733, title: "court_table_list.region.xorazm" },
      { value: 1, title: "court_table_list.region.qomita" }
    ],
    cases: [],
    activeBox: null,
    tableVisible: false,
    loading: true,
    searchLoader: false,
    modalVisible: false,
    searchingModal: false,
    getUserDatas: {}
  }),
  methods: {
    closeModal() {
      this.showModal = false;
      this.$bvModal.hide('no-data-modal');
    },
    resetModal() {
      this.showModal = false;
    },
    toggleShowText(index) {
      const idx = this.showTextIndices.indexOf(index);
      if (idx > -1) {
        // Remove from array to collapse
        this.showTextIndices.splice(idx, 1);
      } else {
        // Add to array to expand
        this.showTextIndices.push(index);
      }
    },
    updateFormattedDate() {
      this.formattedDate = this.today;
      this.backendDate = this.formatDateToBackend(this.today);
    },
    formatDateToDisplay(date) {
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    },
    formatDateToBackend(date) {
      const [day, month, year] = date.split('-');
      return `${year}-${month}-${day}`;
    },
    selectRegion(region) {
      this.selectedRegion = region;
      this.sendRequest(region.value);
      this.tableVisible = true;
    },
    sendRequest(data) {
      this.loading = true;
      this.emptyModal = false;
      this.cases = [];

      let check = {
        soato: data,
        date: this.backendDate // Sending backend formatted date
      };

      this.searchLoader = true;

      axios.post(`/complaens_info_case_field/get-works-soato-date?soato=${check.soato ? check.soato : ''}&date=${check.date ? check.date : ''}`)
          .then((result) => {
            this.cases = result.data || [];
            this.activeBox = data;
            this.tableVisible = true;
            if (result.data !== 'Ma\'lumot topilmadi') {
              this.$toast.success(this.$t('statistics_info.download_success'));
              this.modalVisible = true;
              this.emptyModal = false;
            } else {
              this.modalVisible = true;
              this.emptyModal = true;
            }
          })
          .catch((err) => {
            this.emptyModal = true;
          })
          .finally(() => {
            this.searchLoader = false;
            this.searchingModal = false;
            this.loading = false;
          });
    },

    goBack() {
      this.tableVisible = false;
      this.cases = [];
      this.selectedRegion = null;
      this.emptyModal = false;
      this.setTodayDate();  // Reset today's date when going back
    },

    setTodayDate() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();

      // Set the date for display in DD-MM-YYYY format
      this.today = `${day}-${month}-${year}`;

      // Set the date for backend in YYYY-MM-DD format
      this.backendDate = `${year}-${month}-${day}`;

      this.updateFormattedDate();
    }
  },
  mounted() {
    this.setTodayDate();
    this.updateFormattedDate();
  },
  watch: {
    today: 'updateFormattedDate'
  },
  computed: {
    selectedRegionTitle() {
      return this.selectedRegion ? this.$t(this.selectedRegion.title) : '';
    },
    selectedRegionValue() {
      return this.selectedRegion ? this.selectedRegion.value : '';
    },
    lengthOfCaseBrake() {
      return this.cases.reduce((acc, e) => acc + (e.step1.resultsCaseReviews?.length || 0), 0);
    },
    getLocale() {
      return localStorage.getItem('locale') ? localStorage.getItem('locale') : 'uzCyrillic';
    },
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
a, p, span, div, b, h1, h2, h3, h4, h5, h6, td, th, tr {
  font-size: 17px;
}
.disable-content {
  pointer-events: none;
  opacity: 1;
}

.frame-hover {
  padding: 10px;
  margin: 5px 0px;
  border-width: 10px;
  border-style: solid;
  border-radius: 10px;
  border-color: transparent;
  transition: all 0.4s ease;
}

.box-style {
  width: 100%;
  height: 160px;
  display: flex;
  padding: 10px;
  margin: 0px auto;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 3px solid #029984;
  border-radius: 10px;
  transition: all 0.4s ease;
  cursor: pointer;
  .box-title-style {
    padding: 18px;
    font-size: 19px;
    font-weight: 700;
    text-align: center;
    color: #029984;
  }
}

.frame-hover:hover {
  border-width: 10px;
  border-style: solid;
  border-color: #029984;
}
.frame-hover:hover .box-style {
  border: 3px solid #029984;
  box-shadow: 0 0 13px #029984
}

.frame-hover:first-child:hover .box-title-style {
  color: #2c675b;
}
.active {
  border-width: 10px;
  border-style: solid;
  border-color: #029984;
  color: white;
}

.activeText {
  color: #2c675b !important;
}

.activeShadow {
  border: 3px solid #029984;
  box-shadow: 0 0 13px #029984
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
.table-container {
  max-height: 500px; /* Adjust this value as needed */
  overflow-y: auto;
}

.modal-body-custom {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal-body-custom p {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.modal-body-custom .btn-warning {
  background-color: #F39138;
  border: none;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
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
/*.box-style:hover {
  background-color: #029984 !important;
  box-shadow: 0 0 13px #029984;
  color:white;
}

.box-style:hover .box-title-style {
  color: white !important;
}*/

/*.active {
  background-color: #029984 !important;
  border-radius: 10px;
}

.activeText {
  color: white !important;
}*/
</style>
