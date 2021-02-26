<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      The Gifting Company
    </p>
    <hr class="dashed">
    <h3>Admin Page</h3>
    <p style="margin-top: -5px;"><b>The list of coupon types</b></p> 
    <div v-for="item in couponTypes" v-bind:key="'admin' + item.id"> 
      * {{ item.name }} 
    </div>
    <form id="new-coupon" @submit="onNewCouponTypeSubmit" style="margin-top: 30px;">
      <input v-model="newCouponTypeName" placeholder="New Coupon Name">
      <p> <input type="submit" value="Create Coupon Type" > </p>
    </form>

    <hr class="dashed">
    <h3>User Page</h3>
    <h4 style="margin-top: 40px;">1. Issue Coupons</h4>
    <form id="issue-form" @submit="onIssueCouponSubmit" style="margin-top:30px;">
      <li v-for="item in couponTypes" v-bind:key="'issue' + item.id">
        <input v-model="checkedCouponTypes" :id="'coupon-' + item.id" :value="item.id" :name="item.name" type="radio" />
        <label :for="'coupon-' + item.id">{{item.name}}</label>
      </li>
      <div style="margin-top: 20px;">
        <label for="issue-count">The amount of coupons being issued: </label>
        <input id="issue-count" v-model="issueCount" />
      </div>
      <p> <input type="submit" value="Issue Coupons"></p>
    </form>
    <h4 style="margin-top: 40px;">2. List Coupons</h4>
    <form id="show-coupons-form" @submit="onCouponListSubmit" style="margin-top:30px;">
      <p><b>Filters</b></p>
      <li v-for="item in couponTypes" v-bind:key="'filter' + item.id">
        <input @click="uncheckFilter(item)" v-model="selectedFilterId" :id="item.id" :value="item.id" :name="item.name" type="radio" />
        <label :for="'filter-' + item.id">{{item.name}}</label>
      </li>
      <ul>
        <label for="page-size">Page Size: </label>
        <input id="page-size" v-model="pageSize">
        <label for="page-size">Page No: </label>
        <input id="page-size" v-model="pageNo">
      </ul>
      <p> <input type="submit" value="Show Coupons"></p>
    </form>
    <table>
      <tr>
        <th>
          <b>Coupon No</b>
        </th>
        <th>
          <b>Coupon Type</b>
        </th>
      </tr>
      <tr v-for="coupon in couponList" v-bind:key="'coupon' + coupon.id">
        <th>
          {{coupon.id}}
        </th>
        <th>
          {{couponTypeHash[coupon.couponTypeId]}}
          </th>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CouponIssuer',
  props: {
    msg: String
  },
  data: function(){
    return {
      couponTypes: [],
      newCouponTypeName: '',
      checkedCouponTypes: [],
      filterCouponTypes: [],
      selectedFilterId: '',
      issueCount: 1,
      pageSize: 10,
      pageNo: 1,
      couponList: [],
      couponTypeHash: {}
    }
  },
  methods: {
    onCouponListSubmit: function(e) {
      const uri = (this.selectedFilterId)?
        `http://localhost:3000/coupons/${this.selectedFilterId}/list/${this.pageNo}`
        : `http://localhost:3000/coupons/list/${this.pageNo}`
      axios.get(uri).then((resp) => {
        console.log(resp)
        this.couponList = resp.data.payload
      })
      e.preventDefault()
    },
    onNewCouponTypeSubmit: function() {
      axios.post('http://localhost:3000/coupons/name', {
        name: this.newCouponTypeName
      })
    },
    uncheckFilter(item) {
      if (item.id === this.selectedFilterId) {
        this.selectedFilterId = false;
      }
    },
    getCouponTypesList: function() { 
      const that = this
      axios.get('http://localhost:3000/coupons/names')
        .then(function(response) {
          console.log(response.data)
          that.couponTypes = response.data.payload
          console.log('couponTypes: ', that.couponTypes)
          that.createCouponTypeHash(response.data.payload)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    createCouponTypeHash(couponList) {
      this.couponTypeHash = {}
      couponList.forEach(coupon => { 
        this.couponTypeHash[coupon.id] = coupon.name
      })
    },
    selectCouponType: function(param) {
      console.log('selectCouponType.value: ', param)
    },
    onIssueCouponSubmit: async function(e) {
      console.log("checkedCouponTypes: ", this.checkedCouponTypes)
      console.log("issueCount: ", this.issueCount)
      e.preventDefault()
      axios.post('http://localhost:3000/coupons', {
        couponTypeId: this.checkedCouponTypes,
        issueCount: this.issueCount
      }).then(res => {
        console.log(res)
      }).catch(e => {
        throw e; // no exception handling
      })
    },
  },
  mounted: function() {
    this.getCouponTypesList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/* Dashed border */
hr.dashed {
  border-top: 3px dashed #bbb;
}

/* Dotted border */
hr.dotted {
  border-top: 3px dotted #bbb;
}

/* Solid border */
hr.solid {
  border-top: 3px solid #bbb;
}

/* Rounded border */
hr.rounded {
  border-top: 8px solid #bbb;
  border-radius: 5px;
}
</style>
