<template>
  <div>
    <b-row>
      <b-col cols="7" style="padding: 1px">
        <b-card
            style="height: 50rem;  box-shadow: 0 4px 8px rgb(162,217,247); border-radius: 3px; margin: 5px; padding: 0">

          <b-row style="margin-top: -20px; margin-bottom: 30px">
            <b-col cols="4" style="margin: 0; padding: 2px; padding-left: 15px; padding-top: 23px">
              <div class="card1">
                <div class="header-content1">
                  {{ $t('stations.count') }}
                </div>


                <div class="body-content1">
                  <b-row class="d-flex justify-content-between" style="align-items: center">
                    <span style="font-size: 14px; font-weight: 500; color: #2b675b">{{ $t('submodules.integration.price_stock.region_name') }}</span>
                    <b-form-select
                        style="width: 78%; margin-left: 5px; float: right; color: #2b675b"
                        v-model="region"
                        size="sm" value="soato">
                      <b-form-select-option :value="17">
                        {{
                          getName({
                            nameLt: "O'zbekiston Respublikasi",
                            nameUz: "Ўзбекистон Республикаси",
                            nameRu: "Ўзбекистон Республикаси",
                          })
                        }}
                      </b-form-select-option>
                      <b-form-select-option v-for="(region, index) in regions"
                                            :key="index" :value="region.soato">
                        {{
                          getName({
                            nameLt: region.nameLt,
                            nameUz: region.nameUz,
                            nameRu: region.nameRu,
                          })
                        }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-row>

                  <b-row class="mt-3" style="justify-content: space-between;">
                  <span style="font-size: 14px; font-weight: bold; color: #4696D3">
                        {{ $t('stations.propan_stations') }}
                  </span>
                    <span
                        style="border-left: 4px solid #2E75AB; width: 60px; background: #4696D3; margin-right: 0; text-align: center; color: #FFFFFF; font-weight: bold; font-size: 15px">
                    <span v-if="getStationCounts.propan"> {{ formatNumber(getStationCounts.propan) }}  </span>
                        <b-spinner v-else small class="ml-auto" style="color: #ffffff"></b-spinner>
                  </span>
                  </b-row>

                  <b-row class="mt-2" style="justify-content: space-between;">
                  <span style="font-size: 14px; font-weight: bold; color: #4D65A3">
                       {{ $t('stations.metan_stations') }}
                  </span>
                    <span
                        style="border-left: 4px solid #4663AB; width: 60px; background: #7B9AE8; margin-right: 0; text-align: center; color: #FFFFFF; font-weight: bold; font-size: 15px">
                       <span v-if="getStationCounts.metan"> {{ formatNumber(getStationCounts.metan) }}  </span>
                        <b-spinner v-else small class="ml-auto" style="color: #ffffff"></b-spinner>
                  </span>
                  </b-row>

                  <b-row class="mt-2" style="justify-content: space-between;">
                  <span style="font-size: 14px; font-weight: bold; color: #e79443">
                        {{ $t('stations.benzin_stations') }}
                  </span>
                    <span
                        style="border-left: 4px solid #D57726; width: 60px; background: #EF982C; margin-right: 0; text-align: center; color: #FFFFFF; font-weight: bold; font-size: 15px">
                       <span v-if="getStationCounts.benzin"> {{ formatNumber(getStationCounts.benzin) }}  </span>
                        <b-spinner v-else small class="ml-auto" style="color: #ffffff"></b-spinner>
                  </span>
                  </b-row>
                </div>
              </div>
            </b-col>

            <b-col cols="4" style="margin: 0; padding:2px; padding-top: 23px">
              <div class="card2">
                <b-row>
                  <b-col style="padding: 0 2px 0 15px">
                    <div class="header-content2">
                      {{ $t('stations.max_cost') }}
                    </div>
                  </b-col>
                  <b-col cols="3"></b-col>
                  <b-col style="padding: 0 12px 0 2px">
                    <div class="header-content3">
                      {{ $t('stations.min_cost') }}
                    </div>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col>
                    <div style="padding: 2px 10px 2px 18px">
                      <b-row>
                  <span
                      style="border-left: 4px solid  #97052D; width: 70%; background: #AD3958;text-align: center; color: #FFFFFF; font-weight: bold;
                          font-size: 13px">
                                                      {{ formatNumber(Math.trunc(topInfos && topInfos.propMax)) }}
                  </span>
                        <img
                            @click="getStationByCost({ price: topInfos && topInfos.propMax, type: 'PROPAN', priceType:'max'})"
                            style="width: 13px;position: relative; right: -20px; !important; cursor: pointer"
                            class="user-img" src="./files/info_red.svg"
                            alt="">
                      </b-row>

                      <b-row class="mt-1">
                 <span
                     style="border-left: 4px solid #97052D; width: 70%;; background: #AD3958;margin-right: 0; text-align: center; color: #FFFFFF; font-weight: bold;
                          font-size: 13px">
                                       {{ formatNumber(Math.trunc(topInfos && topInfos.gasMax)) }}
                  </span>
                        <img
                            @click="getStationByCost({ price: topInfos && topInfos.gasMax, type: 'METAN', priceType:'max'})"
                            style="width: 13px;position: relative; right: -20px; !important; cursor: pointer"
                            class="user-img" src="./files/info_red.svg"
                            alt="">
                      </b-row>

                      <b-row class="mt-1">

               <span
                   style="border-left: 4px solid #97052D; width: 70%; background: #AD3958;margin-right: 0; text-align: center; color: #FFFFFF; font-weight: bold;
                          font-size: 13px">
                                 {{formatNumber( Math.trunc(topInfos && topInfos.b80Max)) }}
                  </span>
                        <img
                            @click="getStationByCost({price: topInfos && topInfos.b80Max, type: 'AI 80', priceType:'max'})"
                            style="width: 13px;position: relative; right: -20px; !important; cursor: pointer"
                            class="user-img" src="./files/info_red.svg"
                            alt="">
                      </b-row>

                      <b-row class="mt-1">
                        <span
                            style="border-left: 4px solid #97052D; width: 70%;; background: #AD3958;margin-right: 0; text-align: center; color: #FFFFFF; font-weight: bold;
                          font-size: 13px">
                                 {{ formatNumber(Math.trunc(topInfos && topInfos.b92Max)) }}
                  </span>
                        <img
                            @click="getStationByCost({price: topInfos && topInfos.b92Max, type: 'AI 92', priceType:'max'})"
                            style="width: 13px;position: relative; right: -20px; !important; cursor: pointer"
                            class="user-img" src="./files/info_red.svg"
                            alt="">
                      </b-row>

                      <b-row class="mt-1">
                    <span
                        style="border-left: 4px solid #97052D; width: 70%;; background: #AD3958;margin-right: 0; text-align: center; color: #FFFFFF; font-weight: bold;
                          font-size: 13px">
                                 {{ formatNumber(Math.trunc(topInfos && topInfos.b95Max)) }}
                  </span>
                        <img
                            @click="getStationByCost({price: topInfos && topInfos.b95Max, type: 'AI 92', priceType:'max'})"
                            style="width: 13px;position: relative; right: -20px; !important; cursor: pointer"
                            class="user-img" src="./files/info_red.svg"
                            alt="">
                      </b-row>

                      <b-row class="mt-1">
                    <span
                        style="border-left: 4px solid #97052D; width: 70%; background: #AD3958;margin-right: 0; text-align: center; color: #FFFFFF; font-weight: bold;
                          font-size: 13px">
                               {{ formatNumber(Math.trunc(topInfos && topInfos.dizMax)) }}
                  </span>
                        <img
                            @click="getStationByCost({price: topInfos && topInfos.dizMax, type: 'DIZEL', priceType:'max'})"
                            style="width: 13px;position: relative; right: -20px; !important; cursor: pointer"
                            class="user-img" src="./files/info_red.svg"
                            alt="">
                      </b-row>
                    </div>
                  </b-col>

                  <b-col cols="4" style="padding: 0">
                    <div style="text-align: center">
                       <span class="mt-1" style="font-size: 13px; font-weight: bold; color: #4696D3; display: block">
                          {{ $t('stations.propan') }}
                        </span>

                      <span class="mt-1" style="font-size: 13px; font-weight: bold; color: #4D65A3; display: block">
                          {{ $t('stations.metan') }}
                  </span>
                      <span class="mt-1" style="font-size: 13px; font-weight: bold; color: #3C9053; display: block">
                          {{ $t('stations.benzin80') }}
                  </span>
                      <span style="font-size: 13px; margin-top: 3px; font-weight: bold; color: #e9ba6b; display: block">
                          {{ $t('stations.benzin92') }}
                  </span>
                      <span class="mt-1" style="font-size: 13px; font-weight: bold; color: #e79443; display: block">
                          {{ $t('stations.benzin95') }}
                  </span>
                      <span class="mt-1" style="font-size: 13px; font-weight: bold; color: #d86c35; display: block">
                          {{ $t('stations.dizel') }}
                  </span>
                    </div>
                  </b-col>

                  <b-col>
                    <div style="padding: 2px 5px 2px 25px">

                      <b-row class="mt-1">
                        <img
                            @click="getStationByCost({price: topInfos && topInfos.propMin, type: 'PROPAN', priceType:'min'})"
                            style="width: 13px; position: relative; left: -10px; !important;cursor: pointer"
                            class="user-img"
                            src="./files/info_green.svg" alt="">
                        <span
                            style="border-right: 4px solid  #077863; width: 70%; background: #1FA38B;margin-left: 0; text-align: center; color: #FFFFFF; font-weight: bold;
                          font-size: 13px">
                                                      {{ formatNumber(Math.trunc(topInfos && topInfos.propMin)) }}
                  </span>
                      </b-row>

                      <b-row class="mt-1">
                        <img
                            @click="getStationByCost({price: topInfos && topInfos.gasMin, type: 'METAN', priceType:'min'})"
                            style="width: 13px; position: relative; left: -10px; !important;cursor: pointer"
                            class="user-img"
                            src="./files/info_green.svg" alt="">
                        <span
                            style="border-right: 4px solid  #077863; width: 70%; background: #1FA38B;margin-left: 0; text-align: center; color: #FFFFFF; font-weight: bold;
                          font-size: 13px">
                                                      {{ formatNumber(Math.trunc(topInfos && topInfos.gasMin)) }}
                  </span>
                      </b-row>

                      <b-row class="mt-1">
                        <img
                            @click="getStationByCost({price: topInfos && topInfos.b80Min, type: 'AI 80', priceType:'min'})"
                            style="width: 13px; position: relative; left: -10px; !important;cursor: pointer"
                            class="user-img"
                            src="./files/info_green.svg" alt="">
                        <span
                            style="border-right: 4px solid  #077863; width: 70%; background: #1FA38B;margin-left: 0; text-align: center; color: #FFFFFF; font-weight: bold;
                          font-size: 13px">
                                                      {{ formatNumber(Math.trunc(topInfos && topInfos.b80Min)) }}
                  </span>
                      </b-row>

                      <b-row class="mt-1">
                        <img
                            @click="getStationByCost({price: topInfos && topInfos.b92Min, type: 'AI 92', priceType:'min'})"
                            style="width: 13px; position: relative; left: -10px; !important;cursor: pointer"
                            class="user-img"
                            src="./files/info_green.svg" alt="">
                        <span
                            style="border-right: 4px solid  #077863; width: 70%; background: #1FA38B;margin-left: 0; text-align: center; color: #FFFFFF; font-weight: bold;
                          font-size: 13px">
                                                      {{ formatNumber(Math.trunc(topInfos && topInfos.b92Min)) }}
                  </span>
                      </b-row>

                      <b-row class="mt-1">
                        <img
                            @click="getStationByCost({price: topInfos && topInfos.b95Min, type: 'AI 95', priceType:'min'})"
                            style="width: 13px; position: relative; left: -10px; !important;cursor: pointer"
                            class="user-img"
                            src="./files/info_green.svg" alt="">
                        <span
                            style="border-right: 4px solid  #077863; width: 70%; background: #1FA38B;margin-left: 0; text-align: center; color: #FFFFFF; font-weight: bold;
                          font-size: 13px">
                                                      {{ formatNumber(Math.trunc(topInfos && topInfos.b95Min)) }}
                  </span>
                      </b-row>

                      <b-row class="mt-1">
                        <img
                            @click="getStationByCost({price: topInfos && topInfos.dizMin, type: 'DIZEL', priceType:'min'})"
                            style="width: 13px; position: relative; left: -10px; !important; cursor: pointer"
                            class="user-img"
                            src="./files/info_green.svg" alt="">
                        <span
                            style="border-right: 4px solid  #077863; width: 70%; background: #1FA38B;margin-left: 0; text-align: center; color: #FFFFFF; font-weight: bold;
                          font-size: 13px">
                                                      {{formatNumber(Math.trunc(topInfos && topInfos.dizMin))  }}
                  </span>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-col>

            <b-col cols="4" style="margin: 0; padding: 2px; padding-right: 15px; padding-top: 23px">
              <div class="card3">
                <LineCharts></LineCharts>
              </div>
            </b-col>
          </b-row>
          <!--          <h4 style="color: #2b675b; text-align: center; ">-->
          <!--            {{ $t('stations.title1') }}</h4>-->
          <div class="map-container">
            <svg style="height: 35rem; width: 100%; position: relative;" :viewBox="uzbekistan.viewBox" xmlns="http://www.w3.org/2000/svg">
              <!-- Uzbekistan xaritasi -->
              <path
                  v-for="(region, index) in filteredLocations"
                  :key="index"
                  :d="region.path"
                  :title="region.name"
                  @click="selectRegion(region)"
                  style="fill: #FFFFFF; stroke: #d7d5d5; stroke-width: 2px; cursor: pointer;"
              />
              <!-- Hudud nomlarini yozish qismi -->
              <text
                  v-for="(region, index) in filteredLocations"
                  :key="'text-' + index"
                  :x="getRegionCenter(region).x"
                  :y="getRegionCenter(region).y + 7"
                  style="fill: #2b675b; font-size: 10px; font-weight: bold; text-anchor: middle;"
              >
                {{
                  getName({
                    nameLt: region.nameLt,
                    nameUz: region.nameUz,
                    nameRu: region.nameUz
                  })
                }}
              </text>

              <!-- foreignObject ichiga HTML elementini joylashtirish  v-show="loaderGetPrice" -->
              <!--              <foreignObject x="calc(100% - 200px)" y="0" width="300" height="50" v-show="loaderGetPrice">-->
              <!--                <div xmlns="http://www.w3.org/1999/xhtml">-->
              <!--                  <strong style="color: #2b675b">{{ $t('stations.loading') }}</strong>-->
              <!--                  <b-spinner small class="ml-auto" style="color: #2b675b"></b-spinner>-->
              <!--                  <div class="loader">-->
              <!--                    <div class="blue dot"></div>-->
              <!--                    <div class="green dot"></div>-->
              <!--                    <div class="red dot"></div>-->
              <!--                    <div class="orange dot"></div>-->
              <!--                    <div class="logoColor dot"></div>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </foreignObject>-->
              <!-- Tanlangan hudud ma'lumotlarini ko'rsatish -->
              <foreignObject x="-35" y="375" width="300" height="200">
                <div xmlns="http://www.w3.org/1999/xhtml" class="info-panel">
                  <img v-if="locateData == 'uzCyrillic'" width="130" class="user-img" src="@/assets/diagramm_1_cyrilic_2.svg" alt=""/>
                  <img v-else width="130" class="user-img" src="@/assets/diagramm_1_lt_2.svg" alt=""/>
                  <!--                  <div>-->
                  <!--                    <img style="width: 15px" class="user-img" src="./files/propan.svg" alt=""/>-->
                  <!--                    &lt;!&ndash;                    <img style="width: 25px" class="user-img" src="@/modules/fair-price/stations/files/propan.svg" alt=""/>&ndash;&gt;-->
                  <!--                    &lt;!&ndash;                    <img src="@/assets/images/profile-5.png">&ndash;&gt;-->
                  <!--                    <span class="ml-2"-->
                  <!--                          style="color: #4696D3; font-weight: bold; font-size: 13px">{{ $t('stations.propan') }}</span>-->
                  <!--                  </div>-->

                  <!--                  <div class="mt-2">-->
                  <!--                    <img style="width: 15px" class="user-img" src="./files/metan.svg" alt="">-->
                  <!--                    <span class="ml-2"-->
                  <!--                          style="color: #4D65A3; font-weight: bold; font-size: 13px">{{ $t('stations.metan') }}</span>-->
                  <!--                  </div>-->

                  <!--                  <div class="mt-2">-->
                  <!--                    <img style="width: 18px; height: 18px" class="user-img" src="./files/benzin.svg" alt="">-->
                  <!--                    <span class="ml-1"-->
                  <!--                          style="color: #3C9053; font-weight: bold; font-size: 13px">{{-->
                  <!--                        $t('stations.benzin80')-->
                  <!--                      }}</span>-->
                  <!--                  </div>-->

                  <!--                  <div class="mt-2">-->
                  <!--                    <img style="width: 18px; height: 18px" class="user-img" src="./files/benzin.svg" alt="">-->
                  <!--                    <span class="ml-1"-->
                  <!--                          style="color: #e79443; font-weight: bold; font-size: 13px">{{-->
                  <!--                        $t('stations.benzin92')-->
                  <!--                      }}</span>-->
                  <!--                  </div>-->

                  <!--                  <div class="mt-2">-->
                  <!--                    <img style="width: 18px; height: 18px" class="user-img" src="./files/benzin.svg" alt="">-->
                  <!--                    <span class="ml-1"-->
                  <!--                          style="color: #e79443; font-weight: bold; font-size: 13px">{{-->
                  <!--                        $t('stations.benzin95')-->
                  <!--                      }}</span>-->
                  <!--                  </div>-->

                  <!--                  <div class="mt-2">-->
                  <!--                    <img style="width: 18px; height: 18px" class="user-img" src="./files/dizel.svg" alt="">-->
                  <!--                    <span class="ml-1"-->
                  <!--                          style="color: #d86c35; font-weight: bold; font-size: 13px">{{ $t('stations.dizel') }}</span>-->
                  <!--                  </div>-->
                </div>
              </foreignObject>
              <!--Qoraqalpogiston Qo'shimcha SVG -->
              <svg x="50" y="10" width="52.4mm" height="52.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(Math.trunc(filteredCost && filteredCost.qoraqalpogiston && filteredCost.qoraqalpogiston.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(Math.trunc(filteredCost && filteredCost.qoraqalpogiston && filteredCost.qoraqalpogiston.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(Math.trunc(filteredCost && filteredCost.qoraqalpogiston && filteredCost.qoraqalpogiston.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(Math.trunc(filteredCost && filteredCost.qoraqalpogiston && filteredCost.qoraqalpogiston.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.qoraqalpogiston && filteredCost.qoraqalpogiston.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="3100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(Math.trunc(filteredCost && filteredCost.qoraqalpogiston && filteredCost.qoraqalpogiston.b95Max))
                    }}
                  </text>

                  <circle style="fill: white; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" cx="2381.73" cy="2500.98" r="513.08" />
                  <!--                  <div class="live-icon">-->
                  <!--                    <div class="live-effect"></div>-->
                  <!--                  </div>-->

                </g>
              </svg>

              <!--Samarqand Qo'shimcha SVG -->
              <svg x="300" y="-13" width="54.4mm" height="54.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.qoraqalpogiston && filteredCost.qoraqalpogiston.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.qoraqalpogiston && filteredCost.qoraqalpogiston.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.qoraqalpogiston && filteredCost.qoraqalpogiston.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.qoraqalpogiston && filteredCost.qoraqalpogiston.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.qoraqalpogiston && filteredCost.qoraqalpogiston.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="3100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.qoraqalpogiston && filteredCost.qoraqalpogiston.b95Max))
                    }}
                  </text>

                  <circle style="fill: #FEFEFE; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil4"
                          cx="2381.73" cy="2500.98" r="513.08"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="480" y1="350" x2="400" y2="110" :stroke="'#2b675b'" stroke-width="2"/>
              </svg>

              <!--Toshkent Qo'shimcha SVG -->
              <svg x="580" y="20" width="52.4mm" height="52.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.toshkent_sh && filteredCost.toshkent_sh.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.toshkent_sh && filteredCost.toshkent_sh.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.toshkent_sh && filteredCost.toshkent_sh.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.toshkent_sh && filteredCost.toshkent_sh.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.toshkent_sh && filteredCost.toshkent_sh.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="3100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.toshkent_sh && filteredCost.toshkent_sh.b95Max))
                    }}
                  </text>

                  <circle style="fill: #FEFEFE; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil4"
                          cx="2381.73" cy="2500.98" r="513.08"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="650" y1="275" x2="650" y2="140" :stroke="'#2b675b'" stroke-width="2"/>
              </svg>

              <!--Sirdaryo Qo'shimcha SVG -->
              <svg x="520" y="150" width="46.4mm" height="46.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.sirdaryo && filteredCost.sirdaryo.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.sirdaryo && filteredCost.sirdaryo.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.sirdaryo && filteredCost.sirdaryo.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.sirdaryo && filteredCost.sirdaryo.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.sirdaryo && filteredCost.sirdaryo.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="3100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.sirdaryo && filteredCost.sirdaryo.b95Max))
                    }}
                  </text>

                  <circle style="fill: #FEFEFE; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil4"
                          cx="2381.73" cy="2500.98" r="513.08"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="590" y1="320" x2="580" y2="260" :stroke="'#2b675b'" stroke-width="2"/>
              </svg>

              <!-- Jizzax Qo'shimcha SVG -->
              <svg x="440" y="50" width="50.4mm" height="50.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.jizzax && filteredCost.jizzax.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.jizzax && filteredCost.jizzax.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.jizzax && filteredCost.jizzax.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.jizzax && filteredCost.jizzax.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.jizzax && filteredCost.jizzax.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="3100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.jizzax && filteredCost.jizzax.b95Max))
                    }}
                  </text>

                  <circle style="fill: #FEFEFE; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil4"
                          cx="2381.73" cy="2500.98" r="513.08"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="535" y1="320" x2="510" y2="170" :stroke="'#2b675b'" stroke-width="2"/>
              </svg>

              <!--Navoiy Qo'shimcha SVG -->
              <svg x="300" y="130" width="45.4mm" height="45.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.navoiy && filteredCost.navoiy.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.navoiy && filteredCost.navoiy.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.navoiy && filteredCost.navoiy.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(    Math.trunc(filteredCost && filteredCost.navoiy && filteredCost.navoiy.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.navoiy && filteredCost.navoiy.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="3100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.navoiy && filteredCost.navoiy.b95Max))
                    }}
                  </text>

                  <circle style="fill: #FEFEFE; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil4"
                          cx="2381.73" cy="2500.98" r="513.08"/>
                </g>
              </svg>

              <!--Andijon Qo'shimcha SVG -->
              <svg x="680" y="110" width="45.4mm" height="45.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.andijon && filteredCost.andijon.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.andijon && filteredCost.andijon.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.andijon && filteredCost.andijon.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.andijon && filteredCost.andijon.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(    Math.trunc(filteredCost && filteredCost.andijon && filteredCost.andijon.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="3100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.andijon && filteredCost.andijon.b95Max))
                    }}
                  </text>

                  <circle style="fill: #FEFEFE; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil4"
                          cx="2381.73" cy="2500.98" r="513.08"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="765" y1="305" x2="750" y2="215" :stroke="'#2b675b'" stroke-width="2"/>
              </svg>

              <!--Xorazm Qo'shimcha SVG -->
              <svg x="70" y="250" width="50.4mm" height="50.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(Math.trunc(filteredCost && filteredCost.xorazm && filteredCost.xorazm.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(Math.trunc(filteredCost && filteredCost.xorazm && filteredCost.xorazm.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(Math.trunc(filteredCost && filteredCost.xorazm && filteredCost.xorazm.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(Math.trunc(filteredCost && filteredCost.xorazm && filteredCost.xorazm.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.xorazm && filteredCost.xorazm.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="3100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.xorazm && filteredCost.xorazm.b95Max))
                    }}
                  </text>

                  <circle style="fill: #FEFEFE; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil4"
                          cx="2381.73" cy="2500.98" r="513.08"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="170" y1="280" x2="220" y2="260" :stroke="'#2b675b'" stroke-width="2"/>
              </svg>

              <!--Buxoro Qo'shimcha SVG -->
              <svg x="180" y="330" width="50.4mm" height="50.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.buxoro && filteredCost.buxoro.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.buxoro && filteredCost.buxoro.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.buxoro && filteredCost.buxoro.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.buxoro && filteredCost.buxoro.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(Math.trunc(filteredCost && filteredCost.buxoro && filteredCost.buxoro.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="3100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.buxoro && filteredCost.buxoro.b95Max))
                    }}
                  </text>

                  <circle style="fill: #FEFEFE; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil4"
                          cx="2381.73" cy="2500.98" r="513.08"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="280" y1="360" x2="350" y2="350" :stroke="'#2b675b'" stroke-width="2"/>
              </svg>

              <!--Qashqadaryo Qo'shimcha SVG -->
              <svg x="300" y="400" width="48.4mm" height="48.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.qashqadaryo && filteredCost.qashqadaryo.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.qashqadaryo && filteredCost.qashqadaryo.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.qashqadaryo && filteredCost.qashqadaryo.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.qashqadaryo && filteredCost.qashqadaryo.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.qashqadaryo && filteredCost.qashqadaryo.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="3100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.qashqadaryo && filteredCost.qashqadaryo.b95Max))
                    }}
                  </text>

                  <circle style="fill: #FEFEFE; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil4"
                          cx="2381.73" cy="2500.98" r="513.08"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="400" y1="430" x2="440" y2="415" :stroke="'#2b675b'" stroke-width="2"/>
              </svg>


              <!--Namangan Qo'shimcha SVG -->
              <svg x="595" y="320" width="40.4mm" height="40.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.namangan && filteredCost.namangan.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.namangan && filteredCost.namangan.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.namangan && filteredCost.namangan.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.namangan && filteredCost.namangan.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.namangan && filteredCost.namangan.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="3100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.namangan && filteredCost.namangan.b95Max))
                    }}
                  </text>

                  <circle style="fill: #FEFEFE; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil4"
                          cx="2381.73" cy="2500.98" r="513.08"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="680" y1="350" x2="700" y2="290" :stroke="'#2b675b'" stroke-width="2"/>
              </svg>

              <!--Fargona Qo'shimcha SVG -->
              <svg x="680" y="370" width="48.4mm" height="48.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.fargona && filteredCost.fargona.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.fargona && filteredCost.fargona.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.fargona && filteredCost.fargona.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.fargona && filteredCost.fargona.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.fargona && filteredCost.fargona.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="3100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(  Math.trunc(filteredCost && filteredCost.fargona && filteredCost.fargona.b95Max))
                    }}
                  </text>

                  <circle style="fill: #FEFEFE; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil4"
                          cx="2381.73" cy="2500.98" r="513.08"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="740" y1="380" x2="720" y2="320" :stroke="'#2b675b'" stroke-width="2"/>
              </svg>

              <!--Surxondaryo Qo'shimcha SVG -->
              <svg x="570" y="410" width="43.4mm" height="43.4mm" viewBox="0 0 7500 7800"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="additional-svg" transform="translate(200, 500)">
                  <!-- Existing paths for Uzbekistan -->
                  <path style="fill: #d86c35; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M2381.73 2500.97c1.21,-521.27 4.11,-1768.14 5.32,-2289.41 931.63,-65.9 1846.15,701.69 1990.59,1441.43 -478.19,201.66 -1517.71,646.32 -1995.91,847.98z"/>
                  <text x="3300" y="1500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.surxondaryo && filteredCost.surxondaryo.dizMax))
                    }}
                  </text>

                  <path style="fill: #4696D3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil1"
                        d="M560.54 834.9c427.73,-526.64 1289.17,-964.09 2202.9,-798.99l-381.71 2465.06c-607.06,-555.36 -1214.13,-1110.71 -1821.19,-1666.07z"/>
                  <text x="1800" y="1100" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.surxondaryo && filteredCost.surxondaryo.propMax))
                    }}
                  </text>

                  <path style="fill: #4D65A3; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil2"
                        d="M604.78 875.37c-375.01,434.07 -762.95,1111.68 -552.53,2176.55l2329.48 -550.95c-588.96,-538.79 -1187.99,-1086.8 -1776.95,-1625.6z"/>
                  <text x="1000" y="2300" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.surxondaryo && filteredCost.surxondaryo.gasMax))
                    }}
                  </text>

                  <path style="fill: #3C9053; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M140.26 3031.1c141.92,660.95 820.34,1336.66 1376.89,1535.64 893.72,-2154.55 -29.14,88.78 864.58,-2065.77 -1323.68,313.06 -737.38,174.39 -2241.47,530.13z"/>
                  <text x="1200" y="3500" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber( Math.trunc(filteredCost && filteredCost.surxondaryo && filteredCost.surxondaryo.b80Max))
                    }}
                  </text>

                  <path style="fill: #EF982C; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil0"
                        d="M1639.34 4250.39c656.95,272.85 1384.8,110.9 1938.09,-280.71 -1185.14,-1477.96 -676.75,-828.04 -1195.69,-1468.71 -726.33,1750.95 -16.08,-1.53 -742.4,1749.42z"/>
                  <text x="2500" y="4000" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(Math.trunc(filteredCost && filteredCost.surxondaryo && filteredCost.surxondaryo.b92Max))
                    }}
                  </text>

                  <path style="fill: #e79443; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil3"
                        d="M2381.73 2500.97c723.02,-304.92 1387.07,-594.01 2110.08,-898.94 269.09,597.38 333.89,1924.34 -656.45,2693.52l-1453.63 -1794.58z"/>
                  <text x="3800" y="2800" style="fill: #FFFFFF; font-size: 400px; text-anchor: middle;">
                    {{
                      formatNumber(   Math.trunc(filteredCost && filteredCost.surxondaryo && filteredCost.surxondaryo.b95Max))
                    }}
                  </text>

                  <circle style="fill: #FEFEFE; stroke: #2b675b; stroke-width: 2px; cursor: pointer;" class="fil4 "
                          cx="2381.73" cy="2500.98" r="513.08"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="540" y1="450" x2="580" y2="460" :stroke="'#2b675b'" stroke-width="2"/>
              </svg>

            </svg>
            <div class="loaderBody" v-show="loaderGetPrice">
              <div class="loaderPosition">
                <div class="loader">
                  <div class="blue dot"></div>
                  <div class="green dot"></div>
                  <div class="red dot"></div>
                  <div class="orange dot"></div>
                  <div class="logoColor dot"></div>
                </div>
                <div class="mt-3 text-center"><p style="font-size: 20px; font-weight: bold">Iltimos kuting! <br> Ma'lumotlar yuklanmoqda.</p></div>

              </div>
            </div>
            <!--            <div class="loader" v-show="loaderGetPrice">-->
            <!--              <div class="blue dot"></div>-->
            <!--              <div class="green dot"></div>-->
            <!--              <div class="red dot"></div>-->
            <!--              <div class="orange dot"></div>-->
            <!--              <div class="logoColor dot"></div>-->
            <!--            </div>-->
          </div>
        </b-card>
      </b-col>

      <b-col cols="5" style="padding: 1px">
        <b-card
            style="height: 50rem; box-shadow: 0 4px 8px rgb(162,217,247);border-radius: 3px; margin: 5px; padding: 0 !important; ">

          <b-row class="pl-4 pr-3 pt-3" style="margin-top: -15px !important; max-height: 9rem; overflow-y: scroll">

            <b-col cols="4" style="padding-left: 5px">
              <b-row>
                <b-col style="padding: 2px;">
                  <b-button block size="sm" class="colorBtnActive" style="cursor: default">
                    {{ $t('stations.stations_search') }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col style="padding: 2px;">
                  <b-form-input
                      style="border: 1px solid #2b675b"
                      size="sm"
                      v-model="editingItem.stir"
                      :placeholder="`${$t('purchase_info.form1.tin')}`"
                      type="search"
                      v-mask="'#########'"
                  ></b-form-input>
                </b-col>
                <b-col style="padding: 2px;">
                  <BaseDatePickerWithValidation
                      style="width: 100% !important; font-size: 11px"
                      custom-styles="grid-template-columns:  0% 100% !important"
                      v-model="editingItem.dateFrom"
                      format="DD-MM-YYYY"
                      :placeholder="$t('reporting.main.form2.name6')"
                      size="sm"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col style="padding: 2px; margin: 0">
                  <b-form-select
                      v-model="editingItem.mxik"
                      size="sm" value="soato">
                    <b-form-select-option v-for="(type, index) in gasStationListTypes"
                                          :key="index" :value="type.mxik">
                      {{
                        getName({
                          nameLt: type.nameLt,
                          nameUz: type.nameUz,
                          nameRu: type.nameRu,
                        })
                      }}
                    </b-form-select-option>
                  </b-form-select>
                </b-col>

                <b-col style="padding: 2px; margin: 0">
                  <BaseDatePickerWithValidation
                      style="width: 100% !important;"
                      custom-styles="grid-template-columns: 0% 100% !important"
                      v-model="editingItem.dateTo"
                      format="DD-MM-YYYY"
                      :placeholder="$t('reporting.main.form2.name7')"
                      size="sm"
                  />
                </b-col>
              </b-row>
              <b-row>
                <!--                <b-col style="padding: 2px; margin: 0"></b-col>-->
                <b-col cols="12" style="padding: 0px; margin: 3px 0">
                  <b-button @click="getStationByMxik"
                            block
                            style="width: 100%"
                            size="sm"
                            class="colorBtnActive">
                    {{
                      $t('actions.search')
                    }}
                  </b-button>
                </b-col>
              </b-row>
            </b-col>

            <b-col cols="4" style="padding-left: 10px">
              <b-row>
                <b-col style="padding: 2px;">
                  <b-button block size="sm" class="colorBtnActive" style="cursor: default">
                    {{ $t('stations.stations_info') }}
                  </b-button>
                </b-col>
              </b-row>

              <b-row style="margin: 0 1px">
                <b-col cols="12" style="padding: 2px;">
                  <span style="color: #2b675b;  font-size: 11px"> {{ $t('stations.stations_name') }}</span><br>
                  <span
                      style="color: #2b675b; font-weight: bold; font-size: 10px"> {{
                      Object.keys(this.selectedStations).length !== 0 ? selectedStations && selectedStations.station && selectedStations.station.nameShort : '-'
                    }}</span>
                </b-col>
                <b-col cols="12" style="padding: 2px;">
                  <span style="color: #2b675b;  font-size: 11px"> {{ $t('stations.direktor') }}</span><br>
                  <span
                      style="color: #2b675b; font-weight: bold; font-size: 10px">
                     {{
                      Object.keys(this.selectedStations).length !== 0 ? selectedStations && selectedStations.station && selectedStations.station.directorLastname : '-'
                    }}         {{
                      Object.keys(this.selectedStations).length !== 0 ? selectedStations && selectedStations.station && selectedStations.station.directorFirstname : '-'
                    }}         {{
                      Object.keys(this.selectedStations).length !== 0 ? selectedStations && selectedStations.station && selectedStations.station.directorMiddlename : '-'
                    }}
                  </span>
                </b-col>
              </b-row>

              <b-row style="margin: 0 1px">
                <b-col cols="12" style="padding: 2px;">
                  <span style="color: #2b675b;  font-size: 11px"> {{ $t('stations.address') }}</span><br>
                  <span style="color: #2b675b; font-weight: bold; font-size: 10px">
                    {{
                      Object.keys(this.selectedStations).length !== 0 ? selectedStations && selectedStations.station && selectedStations.station.excelRegion : '-'
                    }}
                    {{
                      Object.keys(this.selectedStations).length !== 0 ? selectedStations && selectedStations.station && selectedStations.station.excelAddress : '-'
                    }}
                  </span>
                </b-col>
                <b-col cols="12" style="padding: 2px;">
                  <span style="color: #2b675b;  font-size: 11px"> {{
                      $t('submodules.integration.soliqQomita_info.response.phoneNumber')
                    }}</span><br>
                  <span style="color: #2b675b; font-weight: bold; font-size: 12px"> {{
                      Object.keys(this.selectedStations).length !== 0 ? selectedStations && selectedStations.station && selectedStations.station.directorPhone : '-'
                    }}</span>
                </b-col>
              </b-row>
            </b-col>

            <b-col cols="4" style="padding-left: 10px">
              <b-row>
                <b-col style="padding: 2px;">
                  <b-button block size="sm" class="colorBtnActive" style="cursor: default">
                    {{ $t('stations.stations_cost_info') }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row style="margin: 0 1px">
                <b-col style="padding: 2px;">
                  <span style="color: #2b675b;  font-size: 10px"> {{ $t('stations.name') }}</span><br>
                  <div style="border-left: 4px solid  #1972b6; width: 70%; background: #4696D3;text-align: center; color: #FFFFFF; font-weight: bold;
                  font-size: 13px">
                    {{
                      Object.keys(this.selectedStations).length !== 0 ?
                          getName({
                            nameLt: selectedStations && selectedStations.type && selectedStations.type.nameLt,
                            nameUz: selectedStations && selectedStations.type && selectedStations.type.nameUz,
                            nameRu: selectedStations && selectedStations.type && selectedStations.type.nameRu,
                          }) : '-'
                    }}
                  </div>
                </b-col>
                <b-col style="margin: 0 1px">
                    <span style=" color: #2b675b;  font-size: 9px"> {{
                        $t('pharm.pharmUlgurji.productPaymentPrice')
                      }}</span><br>
                  <div style="border-left: 4px solid  #077863; width:70% !important; background: #1FA38B;margin-left: 0;
                  text-align: center; color: #FFFFFF; font-weight: bold;font-size: 13px">
                    {{
                      Object.keys(this.selectedStations).length !== 0 ? formatNumber(Math.trunc(selectedStations && selectedStations.maxPrice)) : '-'
                    }}
                  </div>
                </b-col>
              </b-row>

              <b-row style="margin: 0 1px">
                <b-col style="padding: 0">
                  <span style="color: #2b675b;  font-size: 9px"> {{ $t('pharm.medicationPaymentDate') }}</span><br>
                  <span
                      style="color: #2b675b; font-weight: bold; font-size: 12px">&nbsp;   {{
                      Object.keys(this.selectedStations).length !== 0 ?
                          selectedStations && selectedStations.date : '-'
                    }}</span>
                </b-col>
                <b-col style="padding: 0">
                  <span style="color: #2b675b;  font-size: 9px"> {{
                      $t('stations.belgilangan')
                    }}</span><br>
                  <div style="border-left: 4px solid  #97052D; width: 70%; background: #AD3958;text-align: center; color: #FFFFFF; font-weight: bold;
                  font-size: 13px">
                    {{
                      Object.keys(this.selectedStations).length !== 0 ? formatNumber(Math.trunc(selectedStations && selectedStations.type && selectedStations.type.gasTypePrice && selectedStations.type.gasTypePrice.referentPrice)) : '-'
                    }}
                  </div>
                </b-col>
              </b-row>
            </b-col>

            <img src="../../analysis/concentrate/work-menu/main/arrow.gif" alt=""
                 style="width: 30px; height: 30px;cursor: pointer;   position: absolute;
  cursor: pointer;
  top: 100px;
  right: 50%;
  margin: 2px;">
          </b-row>

          <div class="table-container" style="padding: 0 !important;">
            <table class="table text-center mt-1" style="border-collapse: separate;">
              <thead class="table-tr">
              <tr>
                <th width="4%">№</th>
                <th width="25%">{{ $t('stations.stations_name') }}</th>
                <th width="15%">{{ $t('open_data.brand_and_finance_reestr.regions') }}</th>
                <th width="10%">{{ $t('submodules.integration.soliqQomita_info.tin') }}</th>
                <th width="18%" style="font-size: 11px">{{ $t('market_place.method1.name') }}</th>
                <th width="18%" style="font-size: 11px">{{ $t('stations.max_cost') }}</th>
                <th width="18%">{{ $t('stations.date') }}</th>
              </tr>
              </thead>
              <div class="d-flex justify-content-center align-items-center">
              </div>
              <tbody v-if="stationByMxik.length <= 0">
              <tr>
                <td colspan="7" style="height: 35rem;">
                  <div class="loaderBody">
                    <div class="loaderPosition">
                      <div class="loader">
                        <div class="blue dot"></div>
                        <div class="green dot"></div>
                        <div class="red dot"></div>
                        <div class="orange dot"></div>
                        <div class="logoColor dot"></div>
                      </div>

                      <div class="mt-3"><p style="font-size: 20px; font-weight: bold">Iltimos kuting! <br> Ma'lumotlar yuklanmoqda.</p></div>

                    </div>
                  </div>
                </td>
              </tr>
              </tbody>

              <tbody v-else>
              <tr
                  v-for="(item, index) in stationByMxik" :key="index"
                  @click="selectedStationsBtn(item)"
                  :style="item.id == selectedStations.id ? `background: #bed2e0`:``"
                  style="cursor: pointer;">
                <td> {{
                    util_paginate(index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
                  }}
                </td>
                <td style="font-size: 12px; text-align: left">{{ item.station?.nameShort }}</td>
                <td style="font-size: 10px; text-align: left">{{ item.station?.excelRegion }}</td>
                <td style="font-size: 10px;"><b-badge style="background: #D8EEFC; color: black; font-size: 10px;">{{ formatNumber(item.tin) }}</b-badge></td>
                <td>{{
                    getName({
                      nameLt: item?.type?.nameLt ? item?.type?.nameLt : "",
                      nameUz: item?.type?.nameUz ? item?.type?.nameUz : "",
                      nameRu: item?.type?.nameRu ? item?.type?.nameRu : "",
                    })
                  }}</td>
                <td>{{formatNumber( Math.trunc(item.maxPrice)) }}</td>
                <td style="font-size: 10px">{{ item.date }}</td>

              </tr>
              </tbody>
            </table>

          </div>
          <b-pagination
              class="mt-1 left-pagination"
              size="sm"
              v-model="var_default_search_payload.page"
              :total-rows="totalItems"
              :per-page="var_default_search_payload.itemsPerPage"
          ></b-pagination>
        </b-card>
      </b-col>


    </b-row>

    <b-modal
        :no-close-on-backdrop="true"
        scrollable
        v-model="viewStationsModal"
        size="xl"
    >
      <div class="table-container" style="padding: 0 !important;">
        <table class="table text-center mt-1" style="border-collapse: separate;">

          <thead class="table-tr">
          <tr>
            <th width="4%">№</th>
            <th width="25%">{{ $t('stations.stations_name') }}</th>
            <th width="25%">{{ $t('stations.address') }}</th>
            <th width="18%" style="font-size: 11px">{{ $t('stations.max_cost') }}</th>
            <th width="18%" style="font-size: 11px">{{ $t('stations.min_cost') }}</th>
            <th width="18%">{{ $t('stations.date') }}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(item, index) in stationByCost" :key="index"
              style="cursor: pointer; ">
            <td> {{
                util_paginate(index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
              }}
            </td>
            <td style="font-size: 12px; text-align: left">{{ item.station?.nameShort }}</td>
            <td style="font-size: 10px; text-align: left">{{ item.station?.excelRegion }},
              {{ item.station?.excelAddress }}
            </td>
            <td>{{ Math.trunc(item.maxPrice) }}</td>
            <td>{{ Math.trunc(item.minPrice) }}</td>
            <td style="font-size: 10px">{{ item.date }}</td>

          </tr>
          </tbody>
        </table>

      </div>
      <template v-slot:modal-footer>
        <b-button style="background: red" @click="viewStationsModal = false">
          {{
            $t("actions.close")
          }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>

import LineCharts from "./Line1.vue";
import uzbekistan from "@svg-maps/uzbekistan";
import helperService from "@/shared/services/helper.service";
import Service from "@/modules/fair-price/service";
import BaseDatePickerWithValidation from "@/components/base/BaseDatePickerWithValidation.vue";

export default {
  components: {
    BaseDatePickerWithValidation,
    LineCharts
  },
  data() {
    return {
      locateData:localStorage.getItem('locale'),
      viewStationsModal: false,
      topInfo: {
        b80Max: 0,
        b80Min: 0,
        b92Max: 0,
        b92Min: 0,
        b95Max: 0,
        b95Min: 0,
        dizMax: 0,
        dizMin: 0,
        gasMax: 0,
        gasMin: 0,
        propMax: 0,
        propMin: 0
      },
      currentPage: 1,
      perPage: 5,
      loaderGetPrice: false,
      regionPricesForMap: {
        'andijon': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'buxoro': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'jizzax': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'qashqadaryo': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'qoraqalpogiston': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'navoiy': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'namangan': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'samarqand': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'sirdaryo': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'surxondaryo': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'toshkent_vil': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'toshkent_sh': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'fargona': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
        'xorazm': {
          b80Max: '',
          b80Mid: '',
          b80Min: '',
          b92Max: '',
          b92Mid: '',
          b92Min: '',
          b95Max: '',
          b95Mid: '',
          b95Min: '',
          dizMax: '',
          dizMid: '',
          dizMin: '',
          gasMax: '',
          gasMid: '',
          gasMin: '',
          propMax: '',
          propMid: '',
          propMin: ''
        },
      },
      editingItem: {},
      editingItem2: {},
      gasStationListTypes: [],
      stationByMxik: [],
      stationByCost: [],
      getStationCounts: {},
      selectedStations: {},
      searchValue: '',
      region: '17',
      totalItems: 0,
      regions: [],
      uzbekistan,
      capitalName: "Toshkon",
      selectedRegion: null,
      uzb: {
        "label": "Map of Uzbekistan",
        "viewBox": "0 0 793 517",
        "locations": [{
          "nameLt": "Andijon",
          "nameUz": "Андижон",
          "id": "andijan",
          "path": "m 750.33007,320.40972 -0.11,-3.61 -0.31,-0.84 -4.01,-1.28 -2.25,-0.45 -0.24,0.17 -0.33,0 -9.25,-1.57 -2.24,-3.46 -0.62,-0.65 -3.02,-1.56 -4.16,-0.6 -0.2,1.45 -3.03,-4.48 0,0 1.9,-1.21 -2.2,-2.67 2.03,-1.9 1.19,-0.8 8.59,-2.19 3.68,0.03 0.57,0.26 0.73,0.56 3.33,0.74 1.46,0.15 4.88,-0.44 0.53,-0.27 0.4,-0.45 1.26,-5.87 0,0 0.24,0.15 0.67,-0.01 2.85,-1.35 0.76,-0.18 1.22,-0.92 1.13,-1.24 0.69,-0.07 0.15,0.18 1.32,0.35 0.97,0.68 0.89,0.05 0.79,0.4 0.86,-0.09 0.78,0.17 0.66,0.32 0.26,1.17 -0.1,0.65 -0.82,1.52 0.01,0.22 0.18,0.22 0.15,-0.02 0.46,-0.72 0.23,-0.05 0.24,-0.03 0.47,0.24 0.42,0.39 1.32,2.26 0.58,0.69 0.2,2 0.77,0.55 1.2,0.35 1.33,0.65 1.57,0.58 0.55,-0.2 1.82,0.29 0.94,-0.4 0.92,-0.19 0.68,0.21 2.21,-0.56 0.72,0.02 0.82,0.45 1.52,1.67 0.38,1.05 0.17,0.15 0.66,0.16 0.51,-0.04 0.65,-0.25 0.19,-0.3 0.64,-0.33 0.4,-0.48 0.58,-0.02 0.35,-0.21 -0.15,-0.54 -0.58,-0.4 -0.35,-0.49 0.43,-1.42 0.23,-0.23 0.43,0.01 1.01,1.46 0.9,0.2 1.13,0.76 0.95,-0.52 1.5,0.07 0.43,0.38 0.23,0.97 -0.43,1.74 -0.43,0.61 -0.45,0.31 -2.88,1.21 -1.66,0.24 -0.63,0.87 -1.16,0.8 -1.4,0.78 -0.81,0.17 -0.05,0.23 -0.87,0.2 -1.34,0.74 -1,0.96 -1.54,0.5 -1.13,-0.15 -0.79,0.11 -0.31,0.36 -0.05,0.32 0.14,0.44 0.38,0.46 0.03,0.34 -0.74,0.61 -0.1,0.42 0.18,2.74 -0.07,1.07 -0.65,0.21 -0.52,-0.3 -0.96,-0.98 -1.5,-0.34 -0.32,0.37 -0.05,0.76 -0.87,0.63 -0.14,0.24 -0.21,1.4 -0.58,1.07 -0.67,0.16 -0.42,-0.04 -1.39,-1.12 -1.47,-0.07 -0.69,-0.38 -0.91,-0.87 -0.51,-0.18 -0.68,0.29 -0.21,-0.04 -1.37,-1.67 -0.55,-1 -1.39,-1.17 -0.4,-0.19 -0.98,0.43 -1.1,0.01 -0.4,0.54 0.15,0.28 1.12,0.38 0.32,0.31 0.46,1.03 1.05,0.32 0.41,0.56 -0.04,0.55 -0.35,0.4 -1.03,0.1 -0.27,0.19 -0.17,0.51 0.14,0.45 1.08,-0.11 0.26,0.37 0.23,1.47 0.49,0.53 0.24,0.75 -1.14,2.67 0.28,0.83 -0.07,0.64 -0.17,0.16 -0.3,0.06 -1.48,-0.38 -0.45,-0.27 -1.55,-1.6 -0.65,-0.46 -0.29,-0.1 -0.8,0.3 -0.32,-0.21 -0.5,-0.71 -0.29,-0.21 -0.9,0.01 -0.27,-0.11 -0.18,-0.4 0.33,-1.13 -0.06,-0.25 -0.45,-0.27 z"
        }, {
          "nameLt": "Buxoro",
          "nameUz": "Бухоро",
          "id": "bukhara",
          "path": "m 421.26007,383.36972 -3.77,3.59 -3.35,2.22 -0.57,0.11 -4.4,4.71 -0.35,1.03 0.15,0.86 0.71,1.2 0.83,0.88 0.82,1.17 0.23,0.51 -0.28,0.61 -18.12,6.64 -5.61,6.23 0,0 -2.13,-2.3 -0.41,-0.03 -1.18,0.3 -2.1,1.21 -1,0.26 -1.05,0.02 -1.38,-0.18 -0.85,-0.42 -2.95,-2.43 -2.87,-2 -6.79,-5.22 -1.82,-1.17 -4.68,-3.44 -1.31,-1.29 -1.15,-1.39 -0.29,-0.63 -0.41,-0.37 -0.78,-1.23 -3.57,-3.46 -2.02,-2.15 -3.97,-2.81 -4.38,-2.62 -4.45,-3.15 -4.24,-2.78 -10.26,-7.3 -6.96,-4.77 -14.33,-10.53 -1.18,-1.1 -0.91,-1.29 -0.16,-0.53 -0.2,-0.9 0.06,-0.55 -0.29,-0.7 -0.13,-1.75 -1.41,-2.07 0.02,-0.65 0.69,-1.19 0.08,-2.63 -0.38,-1.01 -0.14,-1.23 -0.59,-2.04 -0.06,-1.14 -0.23,-0.77 0.04,-0.6 0.36,-0.91 -0.03,-1.01 -0.75,-1.34 -1.16,-1.05 -0.72,-1.06 -0.06,-0.51 0.5,-1.54 0.29,-1.47 -0.04,-0.31 -1.32,-0.52 -1.32,-0.84 -1.32,-1.45 -1.27,-0.57 -1.32,-0.87 -0.4,-0.56 0,0 6.28,-7.61 4.59,-5.13 0.79,-3.8 0.03,-1.54 -0.68,-1.15 -5.91,-6.68 -3.24,-3.33 0,0 10.94,-5.06 -13.78,-19.18 0,0 0.56,-0.28 3.67,-0.92 13.55,-3.21 1.05,-0.08 3.34,6.7 1.39,2.06 2.15,2.32 2.39,1.55 3.54,1.9 1.57,1.58 2.08,4.35 1.4,5.15 0.57,1.39 0.88,-0.09 0.45,-0.37 2.04,-0.05 3.16,0.91 5.38,2.31 8.48,4.6 9.83,5.7 2.12,1.67 0.56,1.05 0.34,1.49 -0.48,2.23 3.4,-0.09 2.64,-0.23 0.55,-0.19 5.38,-12.19 1.04,-1.09 2.19,-1.17 0.88,0.15 1.67,1.93 0.1,7.61 16.19,1.89 0.19,-0.49 0.82,-4.49 0.57,-0.19 5.02,-0.58 3.79,-0.06 2.27,-0.38 1.13,-2.68 0.72,-2.1 0.45,-0.19 0.97,0.22 0.79,2.83 2.14,10.12 1.14,1.1 0.8,0.42 1.03,0.34 8.63,1.19 5.93,0.63 7.97,1.14 -1.4,9.26 -3.99,2.81 -0.17,1.03 -1.45,4.13 -3.35,4.14 -0.64,0.61 -0.94,0.38 -3.85,-0.23 -2.9,-0.54 -2.01,-0.99 -0.82,-0.79 -2,-1.3 -2.06,-0.12 -1.11,0.48 -0.36,0.62 0.36,3.32 -0.45,4.36 -1.29,5.71 -2.53,4.78 -2.13,2.47 -4.4,2.67 -0.89,0.33 -1.42,2.72 4.27,5.79 1.19,1.15 7.06,2.67 1.08,0.06 3.2,-0.78 4.91,3.69 4.39,9.39 0.36,1.15 z"
        }, {
          "nameLt": "Farg'ona",
          "nameUz": "Фарғoна",
          "id": "fergana",
          "path": "m 673.77007,331.35972 0.1,-0.66 -0.23,-0.55 -0.74,-0.66 -2.91,-1.31 -1.63,-0.33 -1,-0.4 -0.32,0 -0.9,0.43 -0.43,-0.03 -0.46,-0.21 -0.33,-0.37 -0.46,-1.11 -0.29,-0.31 -0.28,-0.1 -0.15,-0.74 -0.91,-1.77 -0.06,-0.61 0.13,-0.2 0.81,-0.22 1,-0.81 1.19,-0.22 1.1,-0.57 2.05,-0.72 0.8,0 0.47,-0.41 0.12,-0.81 0.44,-0.44 0.14,-0.89 0.19,-0.4 0.4,-0.22 0.59,-0.08 0.77,0.07 0.48,-0.36 0.72,-0.02 0.43,-0.16 0.87,-1.11 1.11,-2.22 0.36,-0.38 0.65,-0.18 0.68,-0.73 0.51,-0.17 0.15,-0.28 0.41,-0.08 0.41,-0.5 0.97,-0.22 0.4,0.28 0.32,0.03 0.05,-0.66 -0.18,-0.99 0.31,-0.23 0.28,0.25 0.66,-0.04 0.44,-0.58 0.3,-1 0.58,-0.53 0.06,-0.26 0,0 0.34,-0.09 0.26,-0.26 4.87,-1.25 3.37,-0.61 6.76,-0.1 0,0.22 -0.37,0.52 -1.36,1.66 0.83,1.97 1.87,1.86 5.59,2.73 0.4,0.08 0.75,-0.42 3.02,-2.85 0.76,-0.99 0.74,-1.45 1.24,-0.8 4.11,-2.23 3.44,-1.03 0,0 3.03,4.48 0.2,-1.45 4.16,0.6 3.02,1.56 0.62,0.65 2.24,3.46 9.25,1.57 0.33,0 0.24,-0.17 2.25,0.45 4.01,1.28 0.31,0.84 0.11,3.61 0,0 -0.49,0.04 -1.07,-0.26 -0.39,0.08 -0.51,1.38 -0.3,0.5 -0.63,0.6 -0.46,0.24 -0.37,0.07 -0.59,-0.2 -0.89,-0.59 -0.46,1.04 0.45,1.71 -0.14,0.34 -0.64,0.71 -0.07,0.57 -0.29,0.4 -1.37,0.41 -1.04,1.34 -0.51,0.38 -0.8,1.13 -1.19,0.52 -0.93,0.86 -0.12,0.26 0.21,0.5 0.98,0.23 0.98,0.89 -0.07,0.49 -1.11,1.03 -0.46,1.08 -0.29,0.32 -0.66,0.33 -0.62,-0.02 -1.27,-0.92 -2.02,-0.47 -0.48,0.39 -0.13,0.48 0.05,0.27 0.74,1.13 0.02,0.53 -0.75,0.5 -0.54,-0.03 -2.49,1.59 -1.32,0.42 -0.92,0.66 -0.35,0.06 -0.25,-0.14 -0.46,-0.85 -0.43,-0.51 -0.24,-0.07 -0.36,-0.4 -0.15,-0.36 0.17,-1.9 -0.19,-0.81 -0.68,-0.91 -0.52,-0.36 -0.77,-0.08 -1.23,0.12 -0.11,0.84 0.24,1.43 -0.21,0.95 0.08,0.56 -0.12,0.2 -0.29,-0.03 -0.81,-0.96 -1,0 -0.55,0.19 -0.92,-0.58 -1.77,-0.79 -0.22,-0.54 0.19,-1.35 -0.24,-0.52 -1.3,-0.03 -1.54,-0.4 -0.63,-0.5 -1.09,-1.23 -0.41,-0.27 -0.49,-0.15 -0.5,0.22 -0.62,0.06 -0.16,-0.31 0.09,-0.39 -0.32,-0.25 -1.53,0.64 -0.75,0.1 -0.27,-0.1 -0.15,-0.27 -0.02,-1 -1.54,0.11 -1.01,-0.34 -1,-0.09 -0.83,0.11 -1.38,0.46 -0.98,-0.02 -0.61,0.21 -2.56,1.78 -1.95,0.35 -2.07,0.9 -0.45,0.29 -0.14,0.27 0.31,0.92 -0.11,0.97 -2.38,0.07 -1.95,0.35 -0.27,-0.09 -1.7,1.26 -2.47,1.1 -1.58,0.33 -1.4,0.12 -3.13,0.69 -0.83,-0.34 -1.18,-2.14 -0.32,-0.88 -0.72,-0.39 -0.53,-0.94 0.13,-0.11 0.07,-1.28 0.37,-0.99 -0.55,-1.75 z"
        }, {
          "nameLt": "Jizzax",
          "nameUz": "Жиззах",
          "id": "jizzakh",
          "path": "m 580.63007,374.69972 -0.48,0.25 -0.21,1.54 -0.32,1.02 -0.82,0.73 -1.08,-0.38 -1.15,0.26 -2.96,-0.47 -1.86,0.81 -0.39,-0.12 -0.79,-0.76 -0.51,-0.24 -1.42,-0.32 -1.77,-0.21 -1.26,0.14 -0.93,0.26 -0.74,-0.13 -1.02,-0.59 -0.74,0.1 -2.23,-0.16 -0.97,-0.48 -0.74,-0.19 -1.09,0.09 -0.6,-0.15 -1.1,-0.85 -0.91,-0.37 -1.37,-0.08 -0.92,0.1 -1.87,-0.84 -0.96,-0.88 -1.38,-0.08 -2.43,-1.65 -0.7,0.39 -1.21,0.32 -1.93,-0.83 -0.4,-0.01 -0.88,1.02 -1.09,0.38 -0.64,0.45 -0.94,1.53 -0.58,0.16 -1.43,0.03 -3.98,1.49 -0.12,0.68 0.2,1.61 -0.41,0.51 -2.22,-0.55 -0.46,0.11 -0.35,0.8 -0.02,1.31 0.32,0.51 0,0 -4.53,-3.82 -1.03,-1.05 -0.65,-0.96 -0.21,-0.95 -0.02,-4.16 0.1,-0.37 3.22,-5.24 0.76,-0.91 0.69,-0.54 2.16,-1.03 1.54,-0.38 1.3,-0.15 -0.08,-1.02 -1.07,-5.96 -0.21,-0.24 -11.87,-2.53 -4.81,-0.4 -2.12,-0.8 -5.83,-3.93 -0.35,-3.71 0.1,-0.35 1.24,-0.29 0.24,-0.16 0.45,-1.34 0.07,-0.81 -1.44,-2.81 -1.86,-1.66 -0.84,-4.1 -0.1,-3.93 0.14,-0.77 0.83,-1.83 -0.01,-1.1 -0.96,-2.18 -4.61,-0.1 -7.79,-0.92 0,0 0.73,-1.79 4.43,-8.59 3.12,-5.32 0.28,-0.74 -1.57,-6.86 -0.23,-0.53 -0.25,-0.23 -4.27,-1.05 -0.95,-0.58 -0.72,-1.27 -1.13,-10.64 6.71,-0.22 0.29,-2.93 0.22,0.04 0.52,-4.76 0,0 17.4,1.31 4.64,0.52 2.72,0.01 0.85,0.56 0.87,0.13 1.25,-0.41 1.27,-0.2 15.41,0.47 1.41,1.29 0.87,0.23 2.05,2.49 3.32,3.08 1.47,-1.3 0.84,1.19 3.05,-1.98 1.38,1.29 0.59,-0.26 0.79,0.47 -2.47,0.53 -1.41,1.48 1.39,3.45 -1.48,1.47 0.08,5.22 -4.07,0.15 -0.73,2.28 1.44,2 2.44,0.68 5.77,3.4 3.59,4.03 3.79,1.34 0.44,0.38 0,0 -0.17,2.84 -0.34,0.61 -1.86,-0.1 -2.1,0.54 -0.48,4.89 0.16,0.27 2.11,-1.02 0.33,-0.1 0.16,0.2 -0.15,0.77 -0.77,2 -4.95,11.04 -0.2,1.52 0.15,0.96 0.34,0.9 0.66,0.97 0.32,0.05 6.55,0.31 4.57,-0.17 4.02,-0.82 2.28,-0.79 7.13,-1.64 0.31,0.68 -1.01,6.41 0,0 -1.55,0.28 -0.09,0.14 -2.89,0.84 -0.24,0.6 0.86,0.8 2.62,1.54 1.23,-0.03 2.15,-0.45 1.31,-0.56 2.87,-0.81 1.23,-0.55 3.43,-0.89 1.68,-0.21 3.15,-0.11 0.84,0.65 0.41,1.28 0.45,2.38 -0.32,0.66 -0.75,0.06 -1.53,-0.36 -0.9,-0.01 -0.75,0.03 -1.52,0.35 -1.17,0.88 -0.21,1.04 -0.15,0.12 -0.46,-0.26 -0.3,-1.29 -0.73,-1.1 -0.65,-0.1 -0.58,0.2 -0.24,0.28 -0.03,0.53 0.35,0.57 0.94,0.94 0.05,0.63 -0.41,1.35 0.03,0.3 1.5,1.4 2.61,3.24 0.54,1.1 0.04,0.75 -0.2,0.69 -0.71,0.72 -0.81,0.1 -0.62,-0.31 -0.6,-0.94 -0.07,-1.78 -1.35,-3.21 -0.72,-0.88 -0.4,-0.07 -0.47,0.22 -0.12,0.4 0.08,1.1 1.04,1.98 0.81,1.92 0.03,0.69 -0.36,0.8 -0.36,0.27 -0.92,0.21 -0.3,0.39 -0.27,1.43 -0.24,0.22 -0.46,0.11 -0.56,-0.42 -0.31,-1.27 -0.78,-0.89 -0.46,-0.13 -1.47,1.23 -0.51,-0.3 -1.2,-0.15 -0.09,1.15 0.3,1.67 -0.32,1.31 -0.49,0.85 -0.25,0.92 -0.3,0.56 -0.64,0.27 -0.63,0.04 -0.42,0.51 0.27,0.64 1.88,2.68 -0.27,1.72 -2.37,2.68 z"
        }, {
          "nameLt": "Namangan",
          "nameUz": "Наманган",
          "id": "namangan",
          "path": "m 749.31007,281.14972 -0.5,-0.84 -0.46,-0.29 -0.45,-0.07 -0.45,0.24 -1.05,-0.35 -0.76,-0.03 -1.88,1.36 -0.35,0.08 -0.68,-0.3 -1.74,-1.12 -1.14,-0.31 -1.22,-0.14 -1.16,0.79 -0.46,-0.22 -0.56,-0.05 -1.62,-0.65 -0.32,-0.41 0.02,-0.88 -0.56,-0.06 -0.37,-0.2 -0.07,-0.21 0.64,-2 0.92,-1.61 0.78,-0.8 0.47,-0.82 0.56,-1.35 -0.05,-0.25 -1.08,-0.58 -0.85,-1.03 -0.28,-0.65 0.13,-1.3 -0.14,-0.37 -0.38,-0.28 -0.41,0.24 -0.34,0.56 -0.81,0.17 -0.25,-0.17 -0.06,-0.19 0.26,-1.3 -0.62,-1.06 -1.4,-1.35 -1.05,-2.21 -0.37,-0.1 -0.14,0.12 -0.11,1.69 -0.17,0.26 -0.31,0.07 -0.21,-0.41 -0.1,-0.68 -0.31,-0.27 -0.38,-0.03 -0.63,0.45 -0.12,0.4 0.41,0.66 -0.06,0.56 -0.27,0.21 -0.42,-0.26 -0.41,-0.71 -0.1,-0.46 0.09,-0.43 0.84,-1.1 0.46,-0.83 0.07,-0.47 -0.24,-1.41 0.13,-0.3 -0.06,-0.74 0.43,-0.9 -0.35,-0.61 -1.14,-0.05 -0.36,0.1 -0.77,0.72 -0.76,1.36 -0.44,0.5 -1.26,0.43 -0.24,0.35 0.05,0.42 0.32,0.24 1.14,0.11 0.57,0.23 0.5,0.78 0.13,0.68 -0.34,1.22 -0.44,0.81 -0.04,0.41 0.8,1.23 -0.29,0.66 -0.66,0.72 -0.36,0.7 -0.27,0.98 -0.22,0.01 -0.36,-0.25 -0.26,0.25 -0.32,0.72 -0.6,0.49 -0.17,0.58 -0.17,0.04 -0.25,0.95 -0.38,0.32 -0.6,-0.16 -0.61,-0.69 -0.4,-0.22 -0.88,-0.02 -0.42,0.35 -0.67,0.14 -0.82,-0.51 -0.32,0.07 -1.44,1.72 -0.05,0.41 0.25,0.77 -0.26,0.85 0,0.53 0.18,0.37 0.86,0.37 0.3,0.72 -0.89,2 -0.32,1.99 -0.71,1.61 -0.03,0.37 -1.03,1.12 -0.53,0.04 -0.26,-0.17 -0.15,-0.29 -0.23,-1.77 -0.23,-0.49 -0.79,-0.83 -0.39,-0.19 -0.54,0.01 -0.51,0.3 -0.35,0.41 -0.23,1.41 -0.4,0.76 -0.8,0.75 -0.51,0.12 -0.38,-0.11 -0.14,-0.3 0.22,-2.39 -0.26,-1.43 -0.26,-0.42 -0.95,-0.63 -0.3,-0.04 -0.62,0.29 -0.13,0.4 0.04,0.54 -0.31,0.23 -0.28,-0.06 -0.43,-1.06 -0.32,-0.01 -0.35,0.3 -0.47,0.72 -0.48,-0.02 -0.26,0.15 -0.83,0.88 -0.5,0.29 -0.4,0.03 -1.21,-0.43 -0.41,-0.37 -0.61,-1.02 -0.8,-0.19 -1.23,-0.8 -0.59,0.03 -2.66,1.81 -0.56,-0.2 -0.54,-1.23 -0.92,-0.86 -0.86,-0.54 -0.58,-0.85 -0.53,-0.5 -0.27,-0.04 -0.71,0.32 -0.47,0.68 -0.83,2.06 -0.3,0.44 -0.33,0.16 -0.86,-0.35 -0.5,-0.61 -0.22,-0.9 0.03,-1.09 0.74,-0.95 0.18,-0.6 -0.1,-0.35 -0.62,-0.91 -0.25,-0.74 -0.07,-1.79 0.42,-0.92 0.25,-1.16 -0.49,-2.05 -2.55,-4.08 -0.42,-1.17 -0.19,-0.16 -1.21,-0.34 -0.31,0.03 -1.14,0.85 -1.23,-0.06 -1.52,0.48 -0.98,0.84 -0.41,0.74 -1.68,1.39 -2.08,0 -0.5,-0.54 0,0 -0.68,1.93 -2.97,4.11 0.67,7.3 1.91,2.62 0.66,1.34 0.24,2.33 0.03,1.75 -0.15,0.88 0.2,0.42 0,0 0.45,-0.02 0.73,0.4 0.27,0.68 1.1,0.89 0.07,0.62 0.32,0.24 0.88,1.19 0.68,0.02 0.55,1.37 1.01,1.25 0.39,0.89 1.11,1.65 0.46,1.18 0.27,0.01 0.12,0.37 0.97,0.83 0.56,1.37 0.83,0.31 0.53,0.47 0.73,0.99 -0.48,0.38 -0.17,-0.09 -0.29,0.18 0.08,0.32 -0.19,0.29 -0.37,0.1 -0.57,-0.25 -0.47,-1.21 -0.37,1.24 0.04,0.71 0.32,0.64 0.83,-0.24 1.23,0.1 0.85,0.45 -0.28,0.18 0.9,0.04 0.43,0.23 1,0.85 0.22,0.49 0,0 0.34,-0.09 0.26,-0.26 4.87,-1.25 3.38,-0.61 6.75,-0.1 0,0.22 -0.37,0.52 -1.36,1.66 0.83,1.97 1.88,1.85 5.58,2.73 0.4,0.08 0.76,-0.42 3.02,-2.85 0.76,-1 0.75,-1.45 1.23,-0.79 4.11,-2.23 3.44,-1.03 0,0 1.9,-1.21 -2.2,-2.67 2.03,-1.89 1.2,-0.8 8.59,-2.19 3.67,0.03 0.58,0.25 0.73,0.56 3.33,0.75 1.46,0.15 4.88,-0.44 0.53,-0.27 0.4,-0.46 1.26,-5.86 0,0 -0.42,-0.26 -0.45,-0.58 0.16,-0.33 1.26,-0.3 0.53,-0.41 0.47,-1.02 -0.45,-0.82 -0.77,-4.63 z m -70.46,14.69 -3.18,-4.31 -1.22,-0.9 -1.01,-0.03 -0.19,-0.68 0.27,-0.47 0.73,-0.56 -0.27,0.38 1.2,0.51 1.51,1.77 1.73,2.35 0.64,1.58 -0.21,0.36 z"
        }, {
          "nameLt": "Navoiy",
          "nameUz": "Навоий",
          "id": "navoiy",
          "path": "m 498.40007,274.98972 -0.52,4.76 -0.22,-0.04 -0.29,2.93 -6.71,0.22 1.13,10.64 0.72,1.27 0.95,0.58 4.27,1.05 0.25,0.23 0.23,0.53 1.57,6.86 -0.28,0.74 -3.12,5.32 -4.43,8.59 -0.73,1.79 0,0 -1.26,-3.47 -1.86,-2.66 -0.97,-1.12 -0.58,-0.27 -2.11,1.92 -2.35,1.29 -1.38,0.11 -1.83,-0.25 -1.04,-0.79 -1.03,-1.55 -1.19,-0.09 -1.11,0.19 -0.91,1.08 -2.15,4.68 -0.59,4.91 0.25,0.35 0.54,0.2 0.37,0.72 -0.17,2.27 -0.88,6.12 -0.86,1.34 -2.3,6.07 0.2,0.98 0.8,0.1 1.43,-0.92 0.82,0.07 0.18,0.45 -0.14,1.12 -0.43,0.62 -3.49,3.29 -1.63,0.76 -8.91,1.93 -1.22,-0.2 -5.38,-2.3 -2.09,-1.14 -0.46,-1.04 -1,-1.55 -5.48,-2.07 -1.01,-0.17 -0.52,0.28 -0.35,0.57 -0.16,0.7 0.05,0.97 -0.42,5.8 -1.83,5.54 -0.71,1.29 -0.52,0.3 -0.59,0.01 -2.85,-0.88 -1,-0.49 -8.65,2.92 -0.5,0.35 -0.08,0.37 0.33,0.77 1.48,1.53 0.97,0.81 0.94,1.45 1.35,5.22 -0.17,0.97 -0.51,1.46 -1.17,2.34 -0.04,0.63 0.17,0.81 0.81,1.81 2.12,3.8 0,0 -0.4,0.43 -0.53,0.21 -2.6,0.4 -1.39,0.37 -0.8,0.38 -1.17,0.81 0,0 0,0 0,0 -0.29,-3.38 -0.36,-1.15 -4.39,-9.39 -4.91,-3.69 -3.2,0.78 -1.08,-0.06 -7.06,-2.67 -1.19,-1.15 -4.27,-5.79 1.42,-2.72 0.89,-0.33 4.4,-2.67 2.13,-2.47 2.53,-4.78 1.29,-5.71 0.45,-4.36 -0.36,-3.32 0.36,-0.62 1.11,-0.48 2.06,0.12 2,1.3 0.82,0.79 2.01,0.99 2.9,0.54 3.85,0.23 0.94,-0.38 0.64,-0.61 3.35,-4.14 1.45,-4.13 0.17,-1.03 3.99,-2.81 1.4,-9.26 -7.97,-1.14 -5.93,-0.63 -8.63,-1.19 -1.03,-0.34 -0.8,-0.42 -1.14,-1.1 -2.14,-10.12 -0.79,-2.83 -0.97,-0.22 -0.45,0.19 -0.72,2.1 -1.13,2.68 -2.27,0.38 -3.79,0.06 -5.02,0.58 -0.57,0.19 -0.82,4.49 -0.19,0.49 -16.19,-1.89 -0.1,-7.61 -1.67,-1.93 -0.88,-0.15 -2.19,1.17 -1.04,1.09 -5.38,12.19 -0.55,0.19 -2.64,0.23 -3.4,0.09 0.48,-2.23 -0.34,-1.49 -0.56,-1.05 -2.12,-1.67 -9.83,-5.7 -8.48,-4.6 -5.38,-2.31 -3.16,-0.91 -2.04,0.05 -0.45,0.37 -0.88,0.09 -0.57,-1.39 -1.4,-5.15 -2.08,-4.35 -1.57,-1.58 -3.54,-1.9 -2.39,-1.55 -2.15,-2.32 -1.39,-2.06 -3.34,-6.7 -1.05,0.08 -13.55,3.21 -3.67,0.92 -0.56,0.28 0,0 -20.92,-28.67 12.85,-7.1 -6.74,-12.15 1.26,-15.77 27.66,-52.21 -15.44,-4.18 -5.85,-10.49 0,0 42.36,-8.25 20.45,-3.61 3.48,0.68 3.01,0.36 9.7,1.05 5.93,0.38 2.4,0.42 14.18,1.09 13.64,0.67 0.2,-0.15 0.85,-0.04 10.52,-5.17 7,-3.06 4.38,-2.19 2.06,-0.51 1.08,-0.11 1.67,0.07 0.83,0.32 0.76,0.58 0.99,1.14 5.73,12.62 2.02,1.91 3.6,3.74 10.88,9.68 1.5,6.07 6.64,21.39 12.57,-5.92 0.35,31.3 -0.05,7.21 -0.58,-0.18 -2.42,-1.23 -0.25,0 -0.1,6.6 -0.91,1.1 -0.3,16.64 0.07,2.15 24.14,2.92 3.48,39.7 z"
        }, {
          "nameLt": "Qashqadaryo",
          "nameUz": "Қашқадарё",
          "id": "qashqadaryo",
          "path": "m 421.26007,383.36972 1.17,-0.81 0.8,-0.38 1.39,-0.37 2.6,-0.4 0.53,-0.21 0.4,-0.43 0,0 0.69,0.16 17.55,0.53 1.49,-0.18 1.31,-0.55 1.43,-1.07 0.19,-0.27 0.04,-0.33 4.31,0.88 3.3,3.81 2.77,4.65 0.09,1.49 0.22,0.21 0.72,0.25 3.08,0.78 1.53,-0.04 2.21,-1.38 3.27,-1.67 7.55,-1.87 0.63,0.16 1.17,0.75 1.65,1.44 1.64,1.15 0.69,0.33 0.3,-0.01 3.64,-1.56 0.82,-0.96 1.1,-1.78 0.83,-0.95 0.81,-0.28 1.19,-0.06 8.57,1.53 0.63,0.67 0.49,1.32 -0.11,1.26 -0.46,1.7 0.06,0.58 0.33,0.48 0.93,0.53 1.89,0.15 3.88,-0.24 0.82,-0.21 0.42,-0.48 0.11,-0.35 -0.07,-1.78 0.43,-0.48 0.88,-0.05 4.46,1.27 2.56,1.09 3.84,1.19 1.65,0.32 1,-0.23 0,0 0.38,1.58 1.39,2.41 0.73,0.75 0.96,0.53 1.76,0.37 0.62,0.41 0.85,0.29 0.8,0.02 1.03,-0.22 1.08,0.19 1.02,0.47 0.65,1.67 0.57,0.23 1.59,0.08 0.28,0.29 -0.01,0.57 -0.35,0.51 -0.21,2.5 0.44,1.26 0.13,2.05 0.39,0.56 0,0 -0.8,0.82 -0.98,0.58 -3.99,0.23 -0.86,0.26 -0.51,0.25 -0.67,0.57 -0.45,0.84 -0.06,0.4 0.54,3.14 1.02,2.1 0.38,0.46 0.15,0.52 0.13,4.2 -1.34,4.3 -0.54,-0.18 -1.41,-1.43 -1,-0.32 -1.43,-0.07 -1.14,0.33 -0.45,0.34 -0.59,0.64 -0.81,1.3 -1.19,2.22 -8.89,8.88 -0.72,3.35 -0.16,1.52 -0.37,1.4 -0.45,0.87 -2.42,2.43 -1.83,1.28 -3.54,1.85 -11.58,12.1 -0.43,1.25 -1.04,4.27 0.27,0.9 0,0 -2.39,-2.79 -1.05,-0.67 -1.48,-0.61 -3.19,-0.35 -2.63,0.82 -0.57,0.06 -1.26,-0.33 -1.23,-1.07 -2.79,-1.64 -1.83,-2.07 -1.29,-2.33 -0.47,-0.3 -1.9,-0.11 -3.5,-1.03 -0.63,-0.4 -0.5,-0.97 -1.17,-0.4 -0.87,-0.13 -0.76,-0.8 -0.47,-0.17 -1.37,0.07 -0.83,-0.27 -0.9,-0.6 -1.91,-1.96 -0.9,-0.24 -1.07,0.01 -0.97,0.27 -0.73,1.4 -0.56,-0.07 -0.14,0.1 -0.16,0.64 -0.37,0.17 -0.53,0 -4.68,-0.96 -9.93,-3.92 -1.95,-1.12 -6.41,-4.13 -1.85,-1.49 -2.7,-2.52 -7.61,-7.6 -0.58,-0.39 -2.73,-1.25 -3.5,-1.33 -2.94,-1.37 -1.73,-1.26 -0.61,-0.66 -8.98,-5.55 -2.72,-1.9 -5.54,-5.13 -1.19,-1.31 0,0 5.61,-6.23 18.12,-6.64 0.28,-0.61 -0.23,-0.51 -0.82,-1.17 -0.83,-0.88 -0.71,-1.2 -0.15,-0.86 0.35,-1.03 4.4,-4.71 0.57,-0.11 3.35,-2.22 z"
        }, {
          "nameLt": "Qoraqalpog'iston",
          "nameUz": "Қорақалпоғистон",
          "id": "karakalpakstan",
          "path": "m 157.43007,23.739722 0.35,7.72 -2.01,5.84 -3.22,5.44 -2.82,6.04 -1.01,4.23 -2.21,0 -1.81,0.2 -1.41,1.41 -0.6,2.62 0.81,4.63 1.21,2.62 0.81,2.82 -2.42,0.81 -3.02,-1.61 -2.42,1.41 -1.81,4.03 -2.42,4.23 -2.21,2.42 -3.02,-1.81 -0.4,-4.03 -0.2,-6.24 -1.21,-1.61 0,-3.45 1.61,0 1.21,2.82 1.81,1.01 2.82,-1.01 1.41,-3.02 0,-4.03 1.01,-3.22 -3.03,-1.81 -3.22,-2.62 -0.6,-2.42 1.81,-2.01 1.81,-0.4 2.01,1.01 0.2,-8.25 2.82,-0.4 -0.2,-3.22 -2.42,-0.6 -3.82,-0.6 -1.41,1.01 -1.61,2.01 -2.21,1.01 1.41,-2.21 2.82,-5.23 1.81,-2.62 -1.01,-3.02 -2.01,-2.82 0.6,-3.82 1.01,-3.42 3.4,-6.4299998 0,0 23.01,16.5899998 z m -38.32,-23.3999998 -0.18,3.55 -1.61,3.22 -0.2,4.8299998 -3.82,3.42 -2.01,3.22 -0.2,5.84 -2.62,2.62 -1.21,5.64 -3.02,4.83 -2.01,5.43 -0.4,4.63 0.2,6.04 1.21,2.82 2.01,3.62 -0.4,2.62 -3.02,8.45 0.4,5.23 2.21,5.23 2.21,2.62 3.02,1.41 4.03,1.61 3.02,0.2 2.62,2.01 2.01,0.6 1.01,-2.01 1.61,-0.4 2.42,0.2 1.81,-0.81 5.03,-1.61 2.62,-1.21 1.61,1.01 0.81,3.62 -1.81,2.21 -2.83,1.83 1.01,3.62 2.21,1.01 1.81,1.81 5.23,0.809998 2.62,2.21 3.02,0.4 6.04,0.6 4.43,0.2 3.62,-2.21 2.42,1.41 1.21,1.01 3.82,-0.81 2.01,-0.6 3.62,1.21 5.03,-1.01 4.83,-1.61 7.05,-2.819998 0.6,-2.62 3.42,0 1.21,-1.81 -1,-1.8 1.61,-3.42 6.24,-5.03 4.63,-4.63 2.82,-5.03 0.81,-3.82 -1.01,-1.41 -1.61,-1.41 -1.01,-2.01 3.88,-0.35 0,0 21.68,15.65 2.21,7.05 6.07,6.13 6.39,7.709998 0.29,0.64 0.64,0.59 2.53,3.01 5.7,7.01 16.83,20.9 1.63,1.56 0.55,0.05 0,0 5.85,10.5 15.43,4.18 -27.66,52.2 -1.26,15.77 6.74,12.15 -12.85,7.1 20.92,28.67 0,0 13.79,19.18 -10.94,5.06 0,0 -2.55,1.21 -0.65,-0.19 -0.27,-0.22 -4.56,-7.41 -1.5,-2.77 -8,-8.81 -3.08,-1.91 -3.52,-1.86 -8.95,-2.06 -3.04,-0.02 -0.62,0.2 -1.39,0.77 -0.78,0.89 -1.17,2.3 -0.51,1.87 -0.72,0.77 -1.49,0 -2.25,-1.44 -0.25,-1.16 -0.37,-0.87 -2.02,-2.27 -0.71,-0.61 -0.74,-0.29 -2.16,-0.36 -1.41,-0.58 -5.96,-4.54 -8.23,-7.31 -1.57,-1.5 -3.35,-3.9 -5.17,-4.83 -0.69,-0.31 -0.67,-0.65 -0.37,-0.46 -3.08,-5.39 -0.41,-2.46 -0.04,-2.63 -0.17,-0.58 -0.39,-0.48 -5.28,-1.12 -4.26,1.39 -1.9,0.84 -2.67,5.23 0,0 -0.22,-0.53 -0.5,-0.6 -0.55,-0.39 -2.42,-0.83 -0.81,-0.51 -1.78,-2.19 -0.17,0.04 -0.33,-0.35 -0.88,0.2 -1.26,-1.24 -0.19,-0.81 0.19,-0.34 0.56,-0.45 2.82,-0.2 0.35,-0.45 -0.2,-0.8 -0.51,-0.73 -0.41,-0.97 -0.22,-0.94 -0.16,-2.27 -1.26,-1.64 -0.03,-0.67 0.18,-0.48 1.09,-0.58 0.42,0.19 0.85,0.1 0.46,-0.11 0.45,-0.43 0.25,-0.39 0.02,-0.64 -0.49,-1.19 -0.48,-0.56 -0.99,-0.6 -1.75,-0.24 -0.58,-0.24 -0.82,-0.71 -0.83,-1.12 -0.68,-1.36 -0.63,-0.56 -1.97,-0.64 -1.04,-0.84 -0.31,0.55 -0.46,1.43 -0.36,0.35 -0.5,0.01 -1.8,-0.55 -0.68,-0.35 -0.46,0.02 -0.54,-0.21 -1.97,-0.04 -1.57,0.37 -1.51,0 -1.34,0.16 -7.41,0.1 -0.57,-0.45 -0.73,-1.4 -0.65,-0.3 -0.88,-1.06 -4.04,-4.03 -0.04,-0.4 0.46,-1.24 -0.11,-1.23 -3.41,-4.45 -0.47,-0.46 -1.11,-0.66 -0.4,-0.06 -1.09,0.3 -0.96,0.77 -0.57,0.24 -2.6,-0.17 -0.7,-0.22 -1.58,-0.86 -2.27,-0.66 -0.67,-0.32 -1.73,-1.5 -4.19,-4.6 -4.81,-5.35 -3.08,-3.9 -0.48,-0.43 -0.03,0.85 -0.31,1.18 0.1,0.55 0.89,0.89 0.04,0.29 -0.17,0.52 -0.34,0.22 -0.42,-0.01 -0.55,-0.31 -0.63,0 -0.51,0.63 0,0.17 0.69,0.57 0.26,0.42 -0.42,2.18 -0.31,0.49 -0.49,0.3 -1.15,-0.37 -2.65,0.5 -1.07,0.06 -1.32,-0.64 -1.21,-0.24 -1.19,-0.57 -1.49,-0.41 -2.9,-0.6 -0.9,0.03 -1.42,0.57 -1.04,0.6 -2.33,1.94 -0.62,0.06 -0.410003,0.35 -0.18,0.69 0.32,0.76 1.860003,1.35 2.37,1.33 0.99,0.38 1.35,0.25 0.45,0.54 2.67,6.2 1.3,2.05 0.57,0.68 0.19,0.94 -0.04,1.21 0.44,0.4 0.53,-0.13 3.15,1.98 0.96,0.79 0.13,0.71 -0.51,1.04 -0.37,0.26 -0.43,0.02 -2.11,-0.5 -1.87,0.38 -0.19,-0.67 0.12,-2.02 -0.11,-1.05 -0.81,-2.86 -0.71,-1.34 -0.89,-0.99 -1.25,-0.84 -4.85,-1.25 -0.8,0.05 -2.180003,1.13 -1.3,0.48 -0.19,-0.1 -0.19,-0.72 -0.92,-0.65 -0.29,-0.37 -0.27,-1.2 -0.85,-0.75 -0.96,-0.18 -1.43,0.31 -0.99,0.68 -0.53,-0.01 -0.27,0.29 -0.4,1.83 -0.29,0.75 -0.32,-0.13 -0.74,-0.86 -0.44,-0.11 -0.67,0.22 -0.22,0.39 -0.28,1.55 0.34,0.78 0.89,0.82 0.44,0.72 0.33,1.08 -0.02,0.54 -0.37,1.05 0.03,1.41 -0.24,1.11 0.12,1.55 -0.2,1.61 -0.18,0.6 -0.34,0.39 -0.47,0.16 -0.85,-0.03 -1.66,-0.69 -0.44,0.1 -0.28,0.52 -0.34,1.2 0.7,1.2 0.44,1.1 -0.19,0.42 -0.87,0.12 -3.06,-0.52 -2.59,0.89 -1.77,0.93 -0.74,0.18 -0.6,-0.02 -1.62,-0.99 -1.87,-0.37 -2.29,-0.18 -5.17,0.28 -1.96,0.73 -2.52,1.24 -2.19,1.6 -1.26,1.09 -1.12,1.61 -0.41,0.87 -0.68,1.59 -1.07,3.33 -0.61,0.85 -1.13,1.1 -0.71,0.43 -1.37,0.51 -2.16,0.64 -0.73,0.44 -0.86,0.79 -0.92,1.92 -0.31,2.04 -0.45,1.83 0.05,2.75 0.3,2.68 -0.14,2.73 0.56,2.37 0.4,0.99 0.38,0.5 -0.02,0.24 0.36,0.16 0.53,1.03 0.24,1.15 0.09,0.8 -0.2,1.22 0,2.34 0.42,3.14 0.3,0.99 0.38,0.72 1.85,2.64 0.91,0.02 1.95,-0.6 0.43,0.4 0.04,0.52 -0.32,0.71 -0.4,0.4 -0.53,0.33 -1.98,0.69 -0.84,0.79 -0.46,0.88 -0.04,1.5 -0.32,0.67 -0.49,0.54 -0.55,0.29 -1.32,0 -1.8,-0.44 -3.96,-0.34 -4.15,-0.59 -6.75,-0.42 -3.77,-0.08 -5.88,-0.68 -3.49,-0.26 -1.88,0.01 -5.1800003,-0.47 -9.41999997,-0.39 -0.08,-232.559998 1.51999997,-0.39 1.43,-0.63 30.1400003,-9.85 0.02,-0.13 1.67,-0.29 0.34,-0.35 1.01,-0.34 13.14,-4.2 43.66,-13.4999998 6.65,-2.22 2.220003,-0.46 17.06,-5.04 z"
        }, {
          "nameLt": "Samarqand",
          "nameUz": "Самарқанд",
          "id": "samarqand",
          "path": "m 532.92007,390.83972 -0.11,0.3 -1.6,-0.31 -0.97,0.21 -3.33,1.15 -0.23,0.29 0,0.19 0,0 -1,0.23 -1.65,-0.32 -3.84,-1.19 -2.56,-1.09 -4.46,-1.27 -0.88,0.05 -0.43,0.48 0.07,1.78 -0.11,0.35 -0.42,0.48 -0.82,0.21 -3.88,0.24 -1.89,-0.15 -0.93,-0.53 -0.33,-0.48 -0.06,-0.58 0.46,-1.7 0.11,-1.26 -0.49,-1.32 -0.63,-0.67 -8.57,-1.53 -1.19,0.06 -0.81,0.28 -0.83,0.95 -1.1,1.78 -0.82,0.96 -3.64,1.56 -0.3,0.01 -0.69,-0.33 -1.64,-1.15 -1.65,-1.44 -1.17,-0.75 -0.63,-0.16 -7.55,1.87 -3.27,1.67 -2.21,1.38 -1.53,0.04 -3.08,-0.78 -0.72,-0.25 -0.22,-0.21 -0.09,-1.49 -2.77,-4.65 -3.3,-3.81 -4.31,-0.88 -0.04,0.33 -0.19,0.27 -1.43,1.07 -1.31,0.55 -1.49,0.18 -17.55,-0.53 -0.69,-0.16 0,0 -2.12,-3.8 -0.81,-1.81 -0.17,-0.81 0.04,-0.63 1.17,-2.34 0.51,-1.46 0.17,-0.97 -1.35,-5.22 -0.94,-1.45 -0.97,-0.81 -1.48,-1.53 -0.33,-0.77 0.08,-0.37 0.5,-0.35 8.65,-2.92 1,0.49 2.85,0.88 0.59,-0.01 0.52,-0.3 0.71,-1.29 1.83,-5.54 0.42,-5.8 -0.05,-0.97 0.16,-0.7 0.35,-0.57 0.52,-0.28 1.01,0.17 5.48,2.07 1,1.55 0.46,1.04 2.09,1.14 5.38,2.3 1.22,0.2 8.91,-1.93 1.63,-0.76 3.49,-3.29 0.43,-0.62 0.14,-1.12 -0.18,-0.45 -0.82,-0.07 -1.43,0.92 -0.8,-0.1 -0.2,-0.98 2.3,-6.07 0.86,-1.34 0.88,-6.12 0.17,-2.27 -0.37,-0.72 -0.54,-0.2 -0.25,-0.35 0.59,-4.91 2.15,-4.68 0.91,-1.08 1.11,-0.19 1.19,0.09 1.03,1.55 1.04,0.79 1.83,0.25 1.38,-0.11 2.35,-1.29 2.11,-1.92 0.58,0.27 0.97,1.12 1.86,2.66 1.26,3.47 0,0 7.79,0.92 4.61,0.1 0.96,2.18 0.01,1.1 -0.83,1.83 -0.14,0.77 0.1,3.93 0.84,4.1 1.86,1.66 1.44,2.81 -0.07,0.81 -0.45,1.34 -0.24,0.16 -1.24,0.29 -0.1,0.35 0.35,3.71 5.83,3.93 2.12,0.8 4.81,0.4 11.87,2.53 0.21,0.24 1.07,5.96 0.08,1.02 -1.3,0.15 -1.54,0.38 -2.16,1.03 -0.69,0.54 -0.76,0.91 -3.22,5.24 -0.1,0.37 0.02,4.16 0.21,0.95 0.65,0.96 1.03,1.05 4.53,3.82 0,0 2.23,4.67 0.83,2.3 0.94,1.95 0.21,0.81 z"
        }, {
          "nameLt": "Sirdaryo",
          "nameUz": "Сирдарё",
          "id": "sirdaryo",
          "path": "m 596.13007,337.79972 -1.61,0.97 -1.29,0.33 -2.39,-0.67 -0.98,0.44 -5.44,1.74 0,0 1.01,-6.41 -0.31,-0.68 -7.13,1.64 -2.28,0.79 -4.02,0.82 -4.57,0.17 -6.55,-0.31 -0.32,-0.05 -0.66,-0.97 -0.34,-0.9 -0.15,-0.96 0.2,-1.52 4.95,-11.04 0.77,-2 0.15,-0.77 -0.16,-0.2 -0.33,0.1 -2.11,1.02 -0.16,-0.27 0.48,-4.89 2.1,-0.54 1.86,0.1 0.34,-0.61 0.17,-2.84 0,0 3.65,3.11 1.89,-0.5 1.91,1.57 -0.54,1.14 4.87,1.43 0.81,-1.12 2.4,0.18 4.31,-1.73 -0.84,-2.09 -2.41,-1.29 -1.13,-3.29 -3.28,-4.53 0.87,-7.45 -1,-2.53 0.86,-0.9 -0.88,-1.39 -3.62,-0.23 -0.01,-1.3 4.92,0.31 0.32,0.6 2.36,-1.47 -0.02,0.24 0.31,0.09 0.2,1.2 0.67,0.25 0.8,-0.37 0.94,0.21 0.37,0.38 -0.14,0.33 -1.44,0.55 -0.19,0.35 -0.03,0.56 0.54,1.06 0.4,-0.33 0,0 4.86,5.52 3.47,3.47 4.92,4.44 4.71,3.91 0.62,0.08 3.03,4.23 -0.5,4.7 -0.86,5.32 -1.01,4.96 0.02,1.06 0.14,0.62 0.5,1.05 -0.25,4.73 0,0 -1.11,-0.35 -2.57,-0.02 -3.36,0.35 z"
        }, {
          "nameLt": "Surxondaryo",
          "nameUz": "Сурхондарё",
          "id": "surxondaryo",
          "path": "m 573.27007,459.46972 -1.03,3.53 -0.14,1.23 -2.3,2.42 -1.64,3.1 0.07,1.57 -0.47,1.11 0.09,0.79 -0.35,0.89 -2.5,1.17 -4.05,0.7 -0.81,1.44 -3.16,6.75 -1.15,1.66 -1.37,0.98 -2.29,2.97 -1.05,2.43 -1.27,2.43 -1.59,1.53 -1.19,3.88 -0.05,2.56 0.26,4.01 -0.56,6.66 -0.71,2.43 -0.68,0.44 -0.59,-1.11 -1.5,-1.2 -0.74,-0.22 -1.38,0.15 -0.42,-0.06 -0.86,-0.76 -1,-0.59 -0.61,0.09 -1.37,0.55 -0.67,0.54 -0.39,0.5 -0.7,0.09 -0.42,-0.65 -0.42,-1.37 -0.74,-0.72 -0.82,-0.4 -0.67,0.14 -0.57,0.38 -1.87,1.72 -1.35,0.46 -1.15,0.68 -1.26,0.11 -1.84,0.47 -0.96,1.03 -1.5,0.63 -0.54,-0.2 -0.86,-0.77 -0.17,-1.53 -0.28,-0.49 -0.77,-0.37 -0.37,-0.87 -0.27,-0.27 -0.97,-0.38 -0.45,-0.34 -0.7,0.15 -0.46,-0.12 -1.52,-0.85 -0.46,-0.71 0.36,-1.53 -0.32,-0.84 -1.73,-0.86 -1.36,-1.41 -0.43,-0.26 -1.93,-0.72 -1.88,0.13 -3.58,1.59 -1.58,-0.19 -0.82,0.07 -2.23,0.76 -1.95,-0.49 -0.95,0.01 -1.1,0.37 -1.6,-0.37 -1.45,0.23 -1.17,-0.12 -1.79,0.07 -1.31,0.54 -0.4,-2.01 0.17,-0.66 0.43,-0.62 0.86,-0.63 1.13,-0.58 3.04,-0.91 0.3,-0.73 0.01,-0.75 -0.43,-1.1 -4.56,-5.54 -0.26,-1.49 0.56,-5.62 -0.29,-1.53 0,-0.6 0.45,-3.11 0.74,-1.79 0.73,-1.12 0.77,-0.76 0.54,-1.27 0.56,-0.73 2.28,-1.33 0.43,-0.4 0.24,-0.83 -0.03,-0.89 -0.54,-1.05 0,0 -0.27,-0.9 1.04,-4.27 0.43,-1.25 11.58,-12.1 3.54,-1.85 1.83,-1.28 2.42,-2.43 0.45,-0.87 0.37,-1.4 0.16,-1.52 0.72,-3.35 8.89,-8.88 1.19,-2.22 0.81,-1.3 0.59,-0.64 0.45,-0.34 1.14,-0.33 1.43,0.07 1,0.32 1.41,1.43 0.54,0.18 1.34,-4.3 -0.13,-4.2 -0.15,-0.52 -0.38,-0.46 -1.02,-2.1 -0.54,-3.14 0.06,-0.4 0.45,-0.84 0.67,-0.57 0.51,-0.25 0.86,-0.26 3.99,-0.23 0.98,-0.58 0.8,-0.82 0,0 0.39,0.53 0.68,0.29 0.91,-0.32 0.62,0.24 1.04,-0.72 2.05,-0.19 1.35,0.82 1.47,0.14 1.05,-1.35 2.05,-0.07 1.04,-0.55 0.45,0.01 1.11,1.16 1.02,0.25 1.84,-0.99 1.25,0.14 1.24,0.82 0.87,1.84 0.31,1.03 2.69,2.1 0.09,0.8 -0.14,1.24 -0.35,0.22 0.3,2.16 -1.26,0.65 -0.59,0.9 -1.03,0.32 -2.5,0.4 -0.35,0.56 2.53,3.68 -0.36,0.67 -1.59,0.19 -1.27,1.22 0.42,1.48 0.87,1.94 -0.01,0.45 -0.47,0.56 -0.33,5.31 2.42,3.21 1,0.81 -0.37,1.12 -0.93,1.45 -0.25,1.01 0.45,0.01 1.48,-0.65 0.46,0.01 1.67,0.94 1.41,2.4 0.21,0.79 0.08,1.36 0.22,0.23 1.34,0.48 1.45,0.71 1,0.69 1.97,2.53 0.02,0.38 0.72,1.32 1.09,1.49 -0.01,0.79 z"
        },
          //   {
          //   "nameLt": "Toshkent",
          //   "nameUz": "Тошкент",
          //   "id": "toshkent",
          //   "path": "m 618.94007,266.48972 0.05,-0.57 -0.09,-0.14 -0.24,0 -0.3,0.25 -0.13,0.37 -0.75,0.23 -0.71,0.75 -0.7,-0.07 -0.36,0.66 -0.55,-0.27 -0.57,0.11 -1.6,-0.84 -0.2,0.02 -0.26,0.34 -0.82,0.37 -1.03,-0.21 -0.11,-0.18 -0.14,0 -1.2,1.32 -0.1,0.85 -0.45,1.25 -0.14,0.87 -0.12,1.46 0.09,0.34 0.93,0.22 0.29,0.21 0.33,-0.18 0.48,0.25 0.32,0.84 0.16,0.05 0.36,-0.23 0.17,0.25 0.69,0.13 0.57,-0.06 0.01,-0.48 1.08,-0.87 1.09,0.09 0.72,0.23 -0.16,0.41 0.43,0.94 0.37,0.25 0.63,-0.09 1.05,-1.05 0.38,-0.87 -0.07,-1.18 -0.38,-0.73 -0.29,-0.27 0.48,-0.76 0.34,-0.25 -0.13,-0.34 0.05,-0.48 0.29,-0.68 0.15,-0.12 0.4,0.05 -0.09,-0.66 0.28,-0.27 0.12,-0.48 -0.11,-0.32 -0.24,-0.14 z"
          // },
          {
            "nameLt": "Toshkent",
            "nameUz": "Тoшкент",
            "id": "tashkent",
            "path": "m 705.74007,216.12972 -0.15,-0.38 -0.65,-0.51 -0.79,-0.38 -3.33,-3 -0.94,-0.54 -1.75,-0.21 -1.22,-0.7 -0.46,-0.02 -0.86,0.21 -1.14,0.5 -1.25,1.16 -0.68,0.03 -0.94,-0.34 -0.42,0.04 -1.77,2.24 -1.02,0.69 -0.96,0.43 -1.18,0.89 -0.7,0.02 -1.06,-1.01 -0.52,0.16 -0.58,0.56 -0.67,0.73 -0.84,1.38 -0.82,0.66 -0.55,0.9 -0.98,0.78 -0.75,1.09 -0.15,1.26 -0.91,1.8 -1.1,2.99 0.05,0.2 -0.22,0.48 -0.74,0.26 -0.42,-0.02 -1.23,-1.13 -0.75,-0.21 -0.15,-0.63 0.11,-1.61 -0.55,-0.91 -2.54,-1.39 -2.69,-2.37 -0.37,-0.16 -0.69,0.14 -0.37,0.46 -0.3,2.12 -0.22,0.37 -0.97,0.87 -0.3,0.69 -1.58,0.96 -0.31,0.5 0.13,1.17 0.34,1.39 -0.08,1.08 -1.04,0.74 -0.96,0.31 -0.49,0.55 -0.54,-0.02 -1.16,0.55 -0.89,1.3 -1.07,0.9 -0.44,0.76 -0.74,2.01 -0.59,1.01 -3.19,1.6 -1.34,0.96 -0.73,2.14 -0.32,0.3 -0.33,0.12 -0.36,-0.12 -0.16,-0.29 0.05,-0.56 -0.38,-0.67 -0.39,-0.07 -0.68,0.2 -0.26,0.31 -1.65,3.99 -2.93,1.2 -1.2,-1.04 -0.74,-0.33 -0.5,0 -1.67,1.05 -2.04,0.33 -0.25,-0.13 -0.84,0.13 -0.31,0.2 -0.2,0.44 -0.53,0.53 -0.68,0.33 -2.74,0.65 -0.52,0.23 -1.22,1.14 -0.29,0.51 -0.95,0.71 -1.3,1.39 -0.4,0.54 -0.5,1.56 -0.23,0.28 -0.74,0.38 -1.22,0.35 -0.38,-0.06 -0.33,0.12 -1.68,1.43 -0.67,1.1 0.02,0.52 0.33,0.54 1.17,0.76 -0.34,1.01 -0.41,0.21 -2.21,-0.35 -0.53,0.23 -0.83,0.04 -1.31,0.35 -0.47,-0.02 -1,-0.58 -0.56,-0.14 -1.1,0.13 -0.36,-0.12 -1.5,0.32 -1.15,0.69 -0.64,1.9 -0.44,0.5 -2.23,1.26 -1.14,2.84 -0.66,0.46 -0.51,-0.06 -0.59,-0.58 -0.29,-0.12 -0.51,0.16 -1.98,3.07 -0.19,2.71 -0.23,0.37 -1.39,1.17 -0.3,1.8 -0.21,0.14 -0.85,-0.15 -0.68,0.46 -0.65,0.86 -1.41,1.37 -1.53,2.02 -0.74,1.15 -0.48,1.1 -1.66,2.09 -0.72,1.67 -0.15,1.51 -0.17,0.35 -1.33,1.21 -1.83,0.72 -1.04,0.86 0,0 4.86,5.52 3.47,3.47 4.92,4.44 4.71,3.91 0.62,0.08 3.03,4.23 -0.5,4.7 -0.86,5.32 -1.01,4.96 0.01,1.06 0.14,0.62 0.5,1.06 -0.25,4.73 0,0 2.55,0.22 0.64,-0.05 1.05,0.37 1.09,-0.09 0.77,-0.25 1.3,0.31 1.96,0.04 1.12,0.62 0.48,-0.4 -0.84,-2.12 -0.41,-0.42 -1.38,-0.27 -0.41,-0.42 0.24,-0.85 -0.35,-0.58 0.18,-0.62 1.75,0.24 0.83,-0.06 1.13,-1.07 0.01,-0.91 0.33,-0.55 -0.02,-1.21 -1.04,-0.83 -0.42,-0.5 0.01,-0.83 -0.29,-0.81 -0.4,-0.35 0.24,-0.85 -0.47,-0.19 -0.61,-2.07 -0.42,-0.5 0.01,-0.83 0.35,-0.41 0.04,-0.76 -0.66,-0.57 -1.34,-1.85 -0.07,-0.33 0.27,-0.64 1.56,-1.05 1.82,-0.24 0.87,0.17 0.3,-0.08 0.26,-0.27 -0.03,-0.18 0.4,-0.75 0.48,-0.23 0.26,-1.27 -0.56,-1.23 -0.34,-1.13 0.21,-3.51 0.06,-0.32 0.33,-0.39 0.2,-0.95 1.84,-2.59 1.64,-0.2 0.66,0.33 2.53,0.7 1.21,0.15 0.75,0.74 0.85,1.71 0.25,1.19 0.55,0.78 1.26,0.9 0.73,0.88 0.69,0.11 0.4,0.21 0.5,1.3 0.3,0.41 0.66,0.15 1.62,-0.11 0.93,-0.59 1.4,-3.02 0.45,-0.4 0.71,-0.21 1.43,0.41 0.3,-0.03 0.94,-1.01 1.11,-0.66 0.43,-0.01 1.59,0.98 0.21,0.01 1.18,-1.12 0.76,-0.49 2.03,-0.29 0.83,-0.36 1.06,-0.9 1.43,-0.56 2.38,-2.32 0.31,-0.44 0.28,-0.87 0.49,-0.59 0.59,-0.11 1.03,0.41 1.14,0.18 1.46,-0.94 0.88,-0.39 0.72,-1.02 1.64,-0.99 1.2,-0.03 0.68,-0.23 0.37,-0.36 0.51,-1.01 0.01,-0.36 -0.29,-0.93 0.15,-0.72 0.68,-0.82 0.03,-0.76 0.3,-0.53 -0.28,-1.28 0.11,-0.46 0.38,-0.28 0.4,-0.94 0.55,-0.6 1.3,-0.52 1.03,0.25 0,0 -0.2,-0.42 0.15,-0.88 -0.03,-1.75 -0.24,-2.33 -0.66,-1.34 -1.91,-2.62 -0.67,-7.3 2.97,-4.11 0.68,-1.93 0,0 -0.49,-1.01 -0.48,-0.56 -0.85,-0.56 -1.21,-1.45 -1.17,-0.12 -0.5,-0.52 -0.63,-1.47 -0.4,-0.27 -1.31,-0.56 -1.07,-0.18 -0.97,0.06 -0.52,0.28 -0.82,0.1 -0.94,-0.24 -1.25,0.09 -0.63,-0.37 -0.16,-0.37 -0.17,-1.24 0.08,-1.97 0.28,-0.74 0.41,-0.58 1.27,-0.54 0.69,-0.12 1.28,0.11 1.66,-1.54 1.3,0.05 0.85,-0.4 1.51,-1.46 0.58,-0.9 0.3,-0.23 2.07,-1.13 0.54,-0.16 1.66,-1.13 0.67,-1.34 0.09,-2.21 0.24,-0.49 0.62,-0.59 1.24,-0.56 2.17,-1.52 0.33,-1.21 1.12,-0.8 0.37,-0.42 0.74,-1.53 1.05,-1.08 1.19,-0.57 0.65,-0.05 0.88,0.32 0.41,-0.01 0.17,-0.19 0.17,-0.82 0.22,-0.2 0.68,0.46 1.04,0.36 0.88,0.01 0.43,-0.15 0.89,-0.9 0.3,-0.51 0.16,-1.82 -0.91,-1.58 0.34,-0.9 0.65,-0.66 0.12,-0.73 0.17,-0.29 0.6,-0.29 0.8,0 1.87,1.04 0.81,0.2 0.77,0 1.05,-0.52 1.29,-1.1 0.68,-0.3 1.76,-1.81 0.81,-0.31 2.68,-2.56 1.08,-0.41 0.82,-0.03 1.27,0.31 0.4,-0.62 0.7,-0.54 0.45,-0.18 0.2,-0.28 0.1,-1.57 0.33,-0.45 z m -86.22,51.43 -0.36,0.46 0.09,0.66 -0.39,-0.05 -0.16,0.11 -0.29,0.68 -0.05,0.48 0.14,0.34 -0.34,0.25 -0.48,0.75 0.57,0.75 0.17,0.55 0,0.89 -0.15,0.55 -0.95,1.14 -0.33,0.23 -0.64,0.09 -0.36,-0.25 -0.43,-0.93 0.16,-0.41 -0.72,-0.23 -1.08,-0.09 -1.08,0.87 -0.02,0.48 -0.57,0.07 -0.69,-0.14 -0.17,-0.25 -0.36,0.23 -0.16,-0.05 -0.33,-0.84 -0.48,-0.25 -0.33,0.18 -0.29,-0.21 -0.93,-0.23 -0.09,-0.34 0.12,-1.46 0.14,-0.87 0.45,-1.25 0.1,-0.84 1.2,-1.32 0.14,0 0.1,0.18 1.03,0.21 0.83,-0.37 0.26,-0.34 0.21,-0.02 1.6,0.84 0.57,-0.11 0.55,0.27 0.36,-0.66 0.71,0.07 0.7,-0.75 0.6,-0.11 0.38,-0.62 0.45,-0.11 0.04,0.71 0.51,0.46 0.05,0.6 z"
          },
          {
            "nameLt": "Xorazm",
            "nameUz": "Хоразм",
            "id": "xorazm",
            "path": "m 282.54007,312.32972 -1.26,-2.86 -0.52,-0.75 -0.69,-0.61 -0.3,-0.81 -0.16,-2.77 -0.46,-0.74 -0.26,-1.03 -1.22,-2.04 -0.09,-1.22 0.16,-1.18 -0.07,-1.98 -0.15,-0.48 -0.25,-2.85 0.23,-1.62 -0.22,-0.4 -0.51,-0.21 -0.18,-0.72 0.02,-0.64 -0.29,-0.81 -0.74,-0.94 -1.47,-0.78 -0.57,-0.11 -0.45,-0.26 -0.3,-0.56 0.19,-0.94 -0.37,-1.05 -0.47,-0.87 -1.22,-0.73 -1.88,-1.98 -1.13,-0.34 -1.49,-1.01 -2.03,-2.41 -0.48,-0.3 -1.27,-0.13 -0.66,-0.23 -0.49,-0.34 -0.41,-0.38 -0.28,-0.95 -0.38,-0.72 -0.85,-0.64 -0.47,-0.01 -1.3,0.57 -1.77,-0.14 -0.74,-0.22 -1.61,-0.9 -1.76,-0.29 -0.52,0.04 -0.47,0.31 -0.82,1.47 0.06,2.65 -0.45,0.8 -0.28,1.57 -0.43,0.91 -0.35,0.39 -0.49,0.33 -1.05,0.16 -0.15,0.14 -1.67,0.19 -0.33,-0.1 -1.32,0.05 -0.2,-0.13 -0.28,0.1 -0.7,-0.16 -3.1,-1.48 -2.13,-2.23 -0.34,-0.15 -2.01,0.18 -1.32,-1.56 -4.91,-0.22 -0.42,0.21 -1.04,-0.07 -2.18,0.32 -2.58,-0.12 -1.68,0.31 -3.93,0.01 -4.76,0.3 -0.88,-0.05 -2.6,0.43 -0.95,-0.06 -0.72,-0.24 -3.24,-1.94 -2.91,-2.6 -6.11,-4.17 -3.37,-1.93 -1.16,-1.04 -0.57,-1.24 -0.02,-0.69 0.16,-0.79 0.04,-2.99 0.28,-1.86 0.38,-0.81 2.14,-2 0.25,-0.61 0,-1.17 -0.27,-0.89 -1.13,-2.02 -1.15,-1.53 -1.85,-2.89 -0.38,-1.5 0.52,-1.24 0.56,-2.25 0.24,-0.14 0.31,0.02 0.9,0.49 1,-0.02 1.98,0.72 1.11,0.53 1.28,1.05 1.19,-0.03 0.78,0.63 0.82,0.27 0.26,-0.4 0.73,0.01 0.26,-0.16 0.03,-0.44 -0.52,-0.7 -1.13,-0.89 -1.16,-1.32 -1.25,-0.57 -1.65,-0.37 -1.39,-0.87 -0.76,-0.85 -0.31,-0.72 0,0 2.67,-5.23 1.9,-0.85 4.26,-1.39 5.28,1.12 0.39,0.48 0.16,0.58 0.04,2.64 0.41,2.45 3.08,5.39 0.38,0.47 0.66,0.65 0.7,0.31 5.17,4.83 3.35,3.9 1.57,1.51 8.23,7.31 5.96,4.54 1.41,0.58 2.16,0.36 0.74,0.29 0.71,0.61 2.01,2.27 0.37,0.87 0.26,1.16 2.25,1.44 1.49,0 0.72,-0.76 0.51,-1.88 1.17,-2.3 0.78,-0.88 1.39,-0.77 0.62,-0.2 3.04,0.01 8.95,2.06 3.52,1.86 3.08,1.91 8,8.81 1.5,2.77 4.56,7.41 0.27,0.22 0.65,0.19 2.55,-1.22 0,0 3.24,3.33 5.91,6.68 0.68,1.15 -0.03,1.54 -0.79,3.8 -4.59,5.13 -6.28,7.61 0,0 z"
          },
          {
            "nameLt": "",
            "nameUz": "",
            "id": "aral-sea",
            "path": "m 134.41007,7.1297222 -3.4,6.4199998 -1,3.43 -0.61,3.82 2.02,2.82 1,3.02 -1.81,2.62 -2.82,5.23 -1.41,2.21 2.22,-1 1.61,-2.02 1.41,-1 3.82,0.6 2.42,0.6 0.2,3.23 -2.82,0.4 -0.2,8.25 -2.01,-1.01 -1.81,0.41 -1.82,2.01 0.61,2.42 3.22,2.61 3.02,1.81 -1.01,3.23 0,4.02 -1.41,3.02 -2.82,1.01 -1.81,-1.01 -1.2,-2.82 -1.62,0 0,3.42 1.21,1.61 0.2,6.24 0.41,4.03 3.02,1.81 2.21,-2.41 2.42,-4.23 1.81,-4.03 2.41,-1.41 3.02,1.61 2.42,-0.8 -0.81,-2.82 -1.21,-2.62 -0.8,-4.62 0.6,-2.62 1.41,-1.41 1.81,-0.2 2.22,0 1,-4.23 2.82,-6.04 3.22,-5.43 2.02,-5.84 -0.36,-7.73 0,0 56.78,40.99 0,0 -3.89,0.36 1.01,2.01 1.61,1.41 1.01,1.41 -0.81,3.82 -2.82,5.03 -4.63,4.63 -6.24,5.04 -1.61,3.42 1.01,1.81 -1.21,1.81 -3.42,0 -0.6,2.62 -7.05,2.819998 -4.83,1.61 -5.03,1 -3.63,-1.21 -2.01,0.61 -3.82,0.8 -1.21,-1 -2.42,-1.41 -3.62,2.21 -4.43,-0.2 -6.04,-0.6 -3.02,-0.41 -2.61,-2.21 -5.24,-0.799998 -1.81,-1.82 -2.21,-1 -1.01,-3.63 2.82,-1.81 1.81,-2.21 -0.8,-3.63 -1.61,-1 -2.62,1.21 -5.03,1.61 -1.82,0.8 -2.41,-0.2 -1.61,0.4 -1.01,2.02 -2.01,-0.61 -2.62,-2.01 -3.02,-0.2 -4.02,-1.61 -3.02,-1.41 -2.22,-2.62 -2.21,-5.23 -0.4,-5.24 3.02,-8.45 0.4,-2.62 -2.01,-3.62 -1.21,-2.82 -0.2,-6.04 0.4,-4.63 2.01,-5.43 3.02,-4.83 1.21,-5.64 2.62,-2.62 0.2,-5.83 2.01,-3.22 3.83,-3.43 0.2,-4.8299998 1.61,-3.22 0.17,-3.55 0,0"
          }
        ]
      }
    };
  },
  computed: {
    filteredLocations() {
      return this.uzb.locations.filter(
          (location) => location.name !== this.capitalName
      );
    },
    filteredCost() {
      return this.regionPricesForMap
    },
    toFiveDigits(num) {
      let numStr = num.toString();

      if (num != 0) {
        if (numStr.length > 5) {
          numStr = Math.trunc(num.slice(0, 5));
        } else {
          numStr = Math.trunc(num);
        }
      }
      return numStr
    },
    topInfos() {
      const b80MaxValues = Object.values(this.regionPricesForMap)
          .map(region => parseFloat(region.b80Max))
          .filter(value => !isNaN(value));

      const b80MinValues = Object.values(this.regionPricesForMap)
          .map(region => parseFloat(region.b80Min))
          .filter(value => !isNaN(value));

      // const b80MaxValues = Object.entries(this.regionPricesForMap)
      //     .reduce((maxRegion, [region, values]) => {
      //       const b80Max = parseFloat(values.b80Max);
      //       return (!isNaN(b80Max) && (maxRegion === null || b80Max > parseFloat(maxRegion[1].b80Max)))
      //           ? [region, values]
      //           : maxRegion;
      //     }, null);
      //
      // const b80MinValues = Object.entries(this.regionPricesForMap)
      //     .reduce((minRegion, [region, values]) => {
      //       const b80Min = parseFloat(values.b80Min);
      //       return (!isNaN(b80Min) && (minRegion === null || b80Min < parseFloat(minRegion[1].b80Min)))
      //           ? [region, values]
      //           : minRegion;
      //     }, null);

      const b92MaxValues = Object.values(this.regionPricesForMap)
          .map(region => parseFloat(region.b92Max))
          .filter(value => !isNaN(value));

      const b92MinValues = Object.values(this.regionPricesForMap)
          .map(region => parseFloat(region.b92Min))
          .filter(value => !isNaN(value));

      // const b92MaxValues = Object.entries(this.regionPricesForMap)
      //     .reduce((maxRegion, [region, values]) => {
      //       const b92Max = parseFloat(values.b92Max);
      //       return (!isNaN(b92Max) && (maxRegion === null || b92Max > parseFloat(maxRegion[1].b92Max)))
      //           ? [region, values]
      //           : maxRegion;
      //     }, null);
      //
      // const b92MinValues = Object.entries(this.regionPricesForMap)
      //     .reduce((minRegion, [region, values]) => {
      //       const b92Min = parseFloat(values.b92Min);
      //       return (!isNaN(b92Min) && (minRegion === null || b92Min < parseFloat(minRegion[1].b92Min)))
      //           ? [region, values]
      //           : minRegion;
      //     }, null);

      const b95MaxValues = Object.values(this.regionPricesForMap)
          .map(region => parseFloat(region.b95Max))
          .filter(value => !isNaN(value));

      const b95MinValues = Object.values(this.regionPricesForMap)
          .map(region => parseFloat(region.b95Min))
          .filter(value => !isNaN(value));

      // const b95MaxValues = Object.entries(this.regionPricesForMap)
      //     .reduce((maxRegion, [region, values]) => {
      //       const b95Max = parseFloat(values.b95Max);
      //       return (!isNaN(b95Max) && (maxRegion === null || b95Max > parseFloat(maxRegion[1].b95Max)))
      //           ? [region, values]
      //           : maxRegion;
      //     }, null);
      //
      // const b95MinValues = Object.entries(this.regionPricesForMap)
      //     .reduce((minRegion, [region, values]) => {
      //       const b95Min = parseFloat(values.b95Min);
      //       return (!isNaN(b95Min) && (minRegion === null || b95Min < parseFloat(minRegion[1].b95Min)))
      //           ? [region, values]
      //           : minRegion;
      //     }, null);

      const dizMaxValues = Object.values(this.regionPricesForMap)
          .map(region => parseFloat(region.dizMax))
          .filter(value => !isNaN(value));

      const dizMinValues = Object.values(this.regionPricesForMap)
          .map(region => parseFloat(region.dizMin))
          .filter(value => !isNaN(value));

      // const dizMaxValues = Object.entries(this.regionPricesForMap)
      //     .reduce((maxRegion, [region, values]) => {
      //       const dizMax = parseFloat(values.dizMax);
      //       return (!isNaN(dizMax) && (maxRegion === null || dizMax > parseFloat(maxRegion[1].dizMax)))
      //           ? [region, values]
      //           : maxRegion;
      //     }, null);
      //
      // const dizMinValues = Object.entries(this.regionPricesForMap)
      //     .reduce((minRegion, [region, values]) => {
      //       const dizMin = parseFloat(values.dizMin);
      //       return (!isNaN(dizMin) && (minRegion === null || dizMin < parseFloat(minRegion[1].dizMin)))
      //           ? [region, values]
      //           : minRegion;
      //     }, null);

      const gasMaxValues = Object.values(this.regionPricesForMap)
          .map(region => parseFloat(region.gasMax))
          .filter(value => !isNaN(value));

      const gasMinValues = Object.values(this.regionPricesForMap)
          .map(region => parseFloat(region.gasMin))
          .filter(value => !isNaN(value));

      // const gasMaxValues = Object.entries(this.regionPricesForMap)
      //     .reduce((maxRegion, [region, values]) => {
      //       const gasMax = parseFloat(values.gasMax);
      //       return (!isNaN(gasMax) && (maxRegion === null || gasMax > parseFloat(maxRegion[1].gasMax)))
      //           ? [region, values]
      //           : maxRegion;
      //     }, null);
      //
      // const gasMinValues = Object.entries(this.regionPricesForMap)
      //     .reduce((minRegion, [region, values]) => {
      //       const gasMin = parseFloat(values.gasMin);
      //       return (!isNaN(gasMin) && (minRegion === null || gasMin < parseFloat(minRegion[1].gasMin)))
      //           ? [region, values]
      //           : minRegion;
      //     }, null);

      const propMaxValues = Object.values(this.regionPricesForMap)
          .map(region => parseFloat(region.propMax))
          .filter(value => !isNaN(value));

      const propMinValues = Object.values(this.regionPricesForMap)
          .map(region => parseFloat(region.propMin))
          .filter(value => !isNaN(value));

      // const propMaxValues = Object.entries(this.regionPricesForMap)
      //     .reduce((maxRegion, [region, values]) => {
      //       const propMax = parseFloat(values.propMax);
      //       return (!isNaN(propMax) && (maxRegion === null || propMax > parseFloat(maxRegion[1].propMax)))
      //           ? [region, values]
      //           : maxRegion;
      //     }, null);
      //
      // const propMinValues = Object.entries(this.regionPricesForMap)
      //     .reduce((minRegion, [region, values]) => {
      //       const propMin = parseFloat(values.gasMin);
      //       return (!isNaN(propMin) && (minRegion === null || propMin < parseFloat(minRegion[1].propMin)))
      //           ? [region, values]
      //           : minRegion;
      //     }, null);

      if (b80MaxValues.length > 0) {
        this.$set(this.topInfo, 'b80Max', Math.max(...b80MaxValues))
      }
      if (b80MinValues.length > 0) {
        this.$set(this.topInfo, 'b80Min', Math.min(...b80MinValues))
      }
      if (b92MaxValues.length > 0) {
        this.$set(this.topInfo, 'b92Max', Math.max(...b92MaxValues))
      }
      if (b92MinValues.length > 0) {
        this.$set(this.topInfo, 'b92Min', Math.min(...b92MinValues))
      }

      if (b95MaxValues.length > 0) {
        this.$set(this.topInfo, 'b95Max', Math.max(...b95MaxValues))
      }
      if (b95MinValues.length > 0) {
        this.$set(this.topInfo, 'b95Min', Math.min(...b95MinValues))
      }

      if (dizMaxValues.length > 0) {
        this.$set(this.topInfo, 'dizMax', Math.max(...dizMaxValues))
      }
      if (dizMinValues.length > 0) {
        this.$set(this.topInfo, 'dizMin', Math.min(...dizMinValues))
      }

      if (gasMaxValues.length > 0) {
        this.$set(this.topInfo, 'gasMax', Math.max(...gasMaxValues))
      }
      if (gasMinValues.length > 0) {
        this.$set(this.topInfo, 'gasMin', Math.min(...gasMinValues))
      }

      if (propMaxValues.length > 0) {
        this.$set(this.topInfo, 'propMax', Math.max(...propMaxValues))
      }
      if (propMinValues.length > 0) {
        this.$set(this.topInfo, 'propMin', Math.min(...propMinValues))
      }


      return this.topInfo

    }
  },
  methods: {
    selectedStationsBtn(item) {
      this.selectedStations = item
    },
    async getRegionPricesFor() {
      this.loaderGetPrice = true
      await this.getRegionPrices('')
      // for (let i = 0; i < this.regions.length; i++) {
      //
      // }
    },

    async getRegionPrices(soato) {
      Service.getRegionPrice(soato)
          .then(async res => {
            this.regionPricesForMap = res.data
            // if (soato == '1703') {
            //   this.$set(this.regionPricesForMap, 'andijon', res.data)
            // } else if (soato == '1706') {
            //   this.$set(this.regionPricesForMap, 'buxoro', res.data)
            // } else if (soato == '1708') {
            //   this.$set(this.regionPricesForMap, 'jizzax', res.data)
            // } else if (soato == '1710') {
            //   this.$set(this.regionPricesForMap, 'qashqadaryo', res.data)
            // } else if (soato == '1735') {
            //   this.$set(this.regionPricesForMap, 'qoraqalpogiston', res.data)
            // } else if (soato == '1712') {
            //   this.$set(this.regionPricesForMap, 'navoiy', res.data)
            // } else if (soato == '1714') {
            //   this.$set(this.regionPricesForMap, 'namangan', res.data)
            // } else if (soato == '1718') {
            //   this.$set(this.regionPricesForMap, 'samarqand', res.data)
            // } else if (soato == '1724') {
            //   this.$set(this.regionPricesForMap, 'sirdaryo', res.data)
            // } else if (soato == '1722') {
            //   this.$set(this.regionPricesForMap, 'surxondaryo', res.data)
            // } else if (soato == '1727') {
            //   this.$set(this.regionPricesForMap, 'toshkent_vil', res.data)
            // } else if (soato == '1726') {
            //   this.$set(this.regionPricesForMap, 'toshkent_sh', res.data)
            // } else if (soato == '1730') {
            //   this.$set(this.regionPricesForMap, 'fargona', res.data)
            // } else if (soato == '1733') {
            //   this.$set(this.regionPricesForMap, 'xorazm', res.data)
            // }
          })
          .catch(e => {
          })
          .finally(() => {
            this.loaderGetPrice = false
          })
      // }
    },

    async getRegions() {
      await helperService.fetchRegions()
          .then(res => {
            this.regions = res.data
          })
          .catch(e => {
            console.log(e)
          })
    },
    customLabelRegion(opt) {
      let selected = this.regions.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    selectRegion(region) {
      const center = this.getRegionCenter(region);
      this.selectedRegion = {
        name: region.name,
        x: center.x,
        y: center.y,
      };
    },
    getRegionCenter(region) {
      const bbox = this.getBBoxFromPath(region.path);
      return {
        x: bbox.x + bbox.width / 2,
        y: bbox.y + bbox.height / 2,
      };
    },
    getBBoxFromPath(path) {
      const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tempPath.setAttribute("d", path);
      tempSvg.appendChild(tempPath);
      document.body.appendChild(tempSvg);
      const bbox = tempPath.getBBox();
      document.body.removeChild(tempSvg);
      return bbox;
    },
    getStationCount() {
      this.getStationCounts = {}
      Service.getStationCount(this.region)
          .then(async res => {
            this.getStationCounts = res.data
          })
          .catch(e => {
          })
          .finally(() => {
          })
    },
    gasStationListType() {

      Service.gasStationListType()
          .then(async res => {
            console.log(res.data)
            this.gasStationListTypes = res.data
          })
          .catch(e => {
          })
          .finally(() => {

          })
    },
    getStationByMxik() {
      this.stationByMxik = []
      this.var_default_search_payload.itemsPerPage = 20
      Service.getStationByMxik(this.editingItem, this.var_default_search_payload)
          .then(async res => {
            this.stationByMxik = res.data.list
            this.totalItems = res.data.total
          })
          .catch(e => {
          })
          .finally(() => {

          })
    },
    getStationByCost(obj) {
      this.viewStationsModal = true
      this.stationByCost = []
      Service.getStationByCost(obj, this.var_default_search_payload)
          .then(async res => {
            this.stationByCost = res.data
          })
          .catch(e => {
          })
          .finally(() => {

          })
    },
  },
  watch: {
    'region': {
      async handler() {
        await this.getStationCount()
      }
    },
    'var_default_search_payload.page': {
      handler() {
        this.getStationByMxik()
      }
    }
  },
  async created() {
    await this.getRegionPricesFor()
    await this.getStationByMxik()
    await this.getStationCount()
    await this.gasStationListType()
    await this.getRegions()
  },
}
</script>


<style src="vue-svg-map/dist/index.css" scoped></style>
<style lang="scss" scoped>

.map-container {
  position: relative;
  width: 100%;
}

.svg-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  background-color: white; /* or any color you want */
}

.map {
  width: 100%;
  height: auto;
}

.region {
  fill: lightblue;
  stroke: black;
  stroke-width: 2px;
  cursor: pointer;
}

.region:hover {
  fill: lightcoral;
}

.region-text {
  fill: black;
  font-size: 10px;
  text-anchor: middle;
}

.info-panel {
  width: 80%;
  height: 100%;
  font-size: 12px;
  background: #FFFFFF;
  padding: 5px;
}

.card1 {
  border: 1px solid #ddd; /* Cardning chegarasi */
  overflow: hidden; /* Ichki elementlarni card ichida saqlash */
  height: 11rem;
  box-shadow: 0 4px 8px rgb(162, 217, 247);
  border-radius: 3px;
  border-left: 6px solid #4696D3;
  padding: 0 0px;
}

.header-content1 {
  display: flex;
  justify-content: start; /* Gorizontal markazlash */
  align-items: center; /* Vertikal markazlash */
  padding: 10px;
  background-color: #4696D3; /* Headerning fon rangi */
  height: 25px; /* Headerning balandligi */
  font-weight: bold; /* Textni qalin qilish */
  margin-right: 30%;
  margin-left: 2%;
  margin-top: 3px;
  border-radius: 3px;
  color: #FFFFFF;
}

.body-content1 {
  padding: 10px 20px; /* Card ichidagi mazmunning paddingi */
}

.card2 {
  border: 1px solid #ddd; /* Cardning chegarasi */
  overflow: hidden; /* Ichki elementlarni card ichida saqlash */
  height: 11rem;
  box-shadow: 0 4px 8px rgb(162, 217, 247);
  border-radius: 3px;
  border-left: 6px solid #97052D;
  border-right: 6px solid #2b675b;
  padding: 0 0px;
}

.header-content2 {
  display: flex;
  justify-content: start; /* Gorizontal markazlash */
  align-items: center; /* Vertikal markazlash */
  padding: 10px;
  background-color: #97052D; /* Headerning fon rangi */
  height: 25px; /* Headerning balandligi */
  font-weight: bold; /* Textni qalin qilish */
  margin-left: 2%;
  margin-top: 3px;
  border-radius: 3px;
  color: #FFFFFF;
  font-size: 10px;
}

.body-content2 {
  padding: 4px 20px; /* Card ichidagi mazmunning paddingi */
}

.card3 {
  border: 1px solid #ddd; /* Cardning chegarasi */
  overflow: hidden; /* Ichki elementlarni card ichida saqlash */
  height: 11rem;
  box-shadow: 0 4px 8px rgb(162, 217, 247);
  border-radius: 3px;
  border-left: 6px solid #2b675b;
  padding: 0 0px;
}

.header-content3 {
  display: flex;
  justify-content: start; /* Gorizontal markazlash */
  align-items: center; /* Vertikal markazlash */
  padding: 10px;
  background-color: #2b675b; /* Headerning fon rangi */
  height: 25px; /* Headerning balandligi */
  font-weight: bold; /* Textni qalin qilish */
  margin-right: 2%;
  margin-top: 3px;
  border-radius: 3px;
  color: #FFFFFF;
  font-size: 10.5px;
}

.body-content3 {
  padding: 4px 20px; /* Card ichidagi mazmunning paddingi */
}

.colorBtnActive {
  background: #2b675b;
  color: #FFFFFF !important;
  height: 27px;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 1px; /* Ustun va qator oralig'i */
  color: #2b675b; /* Text rangi */
}

th, td {
  padding: 0;
  color: #2b675b; /* Uyalar text rangi */
  border: 1px solid #ddd; /* Uyalar chegara chizig'i */
}

th {
  background-color: #2B675B; /* Ustun boshligi orqa fon rangi */
  color: #fff; /* Ustun boshligi text rangi */
}

tbody tr:nth-child(odd) {
  background-color: #DBE7E4; /* Toq qator rangi */
}

tbody tr:nth-child(even) {
  background-color: #D8EEFC; /* Juft qator rangi */
}

@keyframes pulse {
  0% {
    fill: #FEFEFE;
    stroke: #2b675b;
    stroke-width: 2px;
  }
  50% {
    fill: #FF6347;
    stroke: #FF6347;
    stroke-width: 5px;
  }
  100% {
    fill: #FEFEFE;
    stroke: #2b675b;
    stroke-width: 2px;
  }
}

.pulse {
  animation: pulse 1s infinite;
}

::v-deep .mx-input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 27px !important;
  padding: 6px 30px;
  padding-left: 10px;
  font-size: 10px;
  line-height: 1.4;
  color: #2b675b;
  background-color: #fff;
  border: 1px solid #2b675b;
  border-radius: 3px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
}

::v-deep .custom-datepicker.valid .mx-input {
  border: 1px solid #2b675b !important;
}


::v-deep .mx-icon-calendar, .mx-icon-clear {
  position: absolute;
  top: 50%;
  right: 8px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 16px;
  line-height: 1;
  color: rgb(43, 103, 91);
  vertical-align: middle;
}

::v-deep .custom-select-sm {
  border: 1px solid #2b675b !important;
  height: 27px;
}

.table-container {
  position: relative;
  max-height: 40rem;
  overflow-y: scroll;
  border-radius: 3px;
  margin-top: 3px;
  margin-left: 3px;
  padding: 0;
}

.left-pagination {
  position: absolute;
  cursor: pointer;
  bottom: 5px;
  left: 2px;
  margin: 2px; /* Optional: adds some space around the button */
}

::v-deep .b-pagination .page-item {
  border: 1px solid #2b675b;
  border-radius: 2px;
}

::v-deep .b-pagination .page-link {
  color: #2b675b;
}

::v-deep .b-pagination .active button {
  color: #FFFFFF !important;
}

.card-body {
  padding: 0 !important;
}

.loaderBody {
  width: 100%;
  height: 35rem;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(239, 239, 239, 0.73);

}
.loaderPosition{
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
  -webkit-animation:
      pulse_blue 1s ease-in-out infinite,
      nudge 1s ease-in-out infinite;
}

.green {
  -webkit-animation:
      pulse_green 1s ease-in-out .1s infinite,
      nudge 1s ease-in-out .1s infinite;
}

.red {
  -webkit-animation:
      pulse_red 1s ease-in-out .2s infinite,
      nudge 1s ease-in-out .2s infinite;
}

.orange {
  -webkit-animation:
      pulse_orange 1s ease-in-out .3s infinite,
      nudge 1s ease-in-out .3s infinite;
}

.logoColor {
  -webkit-animation:
      pulse_logoColor 1s ease-in-out .4s infinite,
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