import axios from 'axios';
import Host from './Host'
import { isEmpty } from 'lodash';
import * as Cookies from "js-cookie";

const http = axios.create({
  timeout: 10000,
  withCredentials: false
});
async function Request(data) {
  data.params = {
    ...data.params
  };
  let token = await Cookies.get('token');
  let lang = await localStorage.getItem('LANG');
  let item = JSON.parse(lang);
  //document.body.classList.add('');

  data.params.lang = !isEmpty(item) ? item.lang.name : 'ka';
  if (data.method === 'GET') {
    return http.get(Host.ip + data.url, {
      headers: {
        'Authorization': data.token ? data.token : token ? token : null,
        'Content-Type': 'application/json'
      },
      params: data.params ? data.params : null
    }).then(function (response) {
      return response.data
    }).catch(async function (error) {
      if (error.response.status === 401) {
        await Cookies.remove('token');
        document.location.href = '/';
      }
      else {
        return error.response.data
      }
    });
  }
  else if (data.method === 'POST') {
    return http.post(Host.ip + data.url, data.params, {
      headers: {
        'Authorization': data.token ? data.token : token ? token : null,
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      return response.data;
    }).catch(async function (error) {
      if (error.response.status === 401) {
        await Cookies.remove('token');
        document.location.href = '/';
      }
      else {
        return error.response.data
      }
    });
  }
}
let api = {
  Info: {
    getCompanies: async function () {
      return Request({
        method: 'GET',
        url: '/getCompanies',
        params: null
      });
    },
    getCompanies: async function () {
      return Request({
        method: 'GET',
        url: '/getCompanies',
        params: null
      });
    },
    getWinesInfo: async function () {
      return Request({
        method: 'GET',
        url: '/getWinesInfo',
        params: null
      });
    },
    getSpecies: async function () {
      return Request({
        method: 'GET',
        url: '/getSpecies',
        params: null
      });
    },
    getColors: async function () {
      return Request({
        method: 'GET',
        url: '/getColors',
        params: null
      });
    },
    getWyneTypes: async function () {
      return Request({
        method: 'GET',
        url: '/getWyneTypes',
        params: null
      });
    },
    getRegionList: async function () {
      return Request({
        method: 'GET',
        url: '/getRegionList',
        params: null
      });
    },

    getArgs: async function (argId) {
      return Request({
        method: 'GET',
        url: '/info/getArgs',
        params: {
          arg_id: argId
        }
      });
    },
    getUserCounts: async function () {
      return Request({
        method: 'GET',
        url: '/info/getUserCounts',
        params: null
      });
    },
    getInvoice: async function (itemId) {
      return Request({
        method: 'GET',
        url: '/info/getInvoiceInfo',
        params: {
          item_id: itemId
        }
      });
    }
  },
  Account: {
    Create: function (v, otherCantry) {
      return Request({
        method: 'POST',
        url: '/Account/create',
        params: {
          person_first_name: v.person_first_name ? v.person_first_name : '',
          person_last_name: v.person_last_name ? v.person_last_name : '',
          person_first_name_lat: v.person_first_name_lat,
          person_last_name_lat: v.person_last_name_lat,
          person_phone: v.person_phone,
          person_pin_number: v.person_pin_number,
          perosn_gender: v.perosn_gender.id,
          perosn_br_date: v.perosn_br_date,
          person_email: v.person_email,
          perosn_city: v.perosn_city.id,
          person_home_address: v.person_home_address,
          person_password: v.person_password,
          person_rep_password: v.person_rep_password,
          other_cantry: otherCantry
        }
      });
    },
    CreateOrganization: function (v) {
      return Request({
        method: 'POST',
        url: '/Account/create_organization',
        params: {
          person_first_name_ka: v.person_first_name_ka,
          person_first_name_en: v.person_first_name_en,
          person_phone: v.person_phone,
          person_pin_number: v.person_pin_number,
          person_email: v.person_email,
          perosn_city: v.perosn_city.id,
          person_home_address: v.person_home_address,
          person_password: v.person_password,
          person_rep_password: v.person_rep_password,
        }
      });
    },
    Cheack: function (v) {
      return Request({
        method: 'POST',
        url: '/Account/cheack',
        params: {
          person_phone: v.person_phone,
          person_pin_number: v.person_pin_number,
          person_email: v.person_email,
        }
      });
    },
    PasswordRecovery: function (v) {
      return Request({
        method: 'POST',
        url: '/Account/password_recovery',
        params: {
          email: v
        }
      });
    },
    getCurrentUser: async function (token) {
      return Request({
        method: 'GET',
        url: '/user/getCurrentuser',
        params: null,
        token: token
      });
    },
    getUserInfo: async function () {
      return Request({
        method: 'GET',
        url: '/user/getUserInfo',
        params: null
      });
    },
    updateUserInformation: async function (data) {
      return Request({
        method: 'POST',
        url: '/user/updateUserInformation',
        params: data
      });
    },
    updateUserPassword: async function (data) {
      return Request({
        method: 'POST',
        url: '/user/updateUserPassword',
        params: data
      });
    },
  },
  Tracking: {
    getMyOrders: async function () {
      return Request({
        method: 'GET',
        url: '/Tracking/getMyOrders',
        params: null
      });
    },
    AddTracking: async function (tracking) {
      return Request({
        method: 'POST',
        url: '/Tracking/addTrackingNumber',
        params: {
          tracking: tracking,
        }
      });
    },
    RemoveTracikngInfo: async function (trackingId) {
      return Request({
        method: 'GET',
        url: '/Tracking/removeTracikngInfo',
        params: {
          tracking_id: trackingId
        }
      });
    },
    saveTrackingItems: async function (trackingId, shopId, categoryId, price) {
      return Request({
        method: 'POST',
        url: '/Tracking/saveTrackingItems',
        params: {
          tracking_id: trackingId,
          shop_id: shopId,
          category_id: categoryId,
          price: price
        }
      });
    },
    removeTrackingSubItem: async function (trackingId, orderId) {
      return Request({
        method: 'GET',
        url: '/Tracking/removeTrackingSubItem',
        params: {
          order_id: orderId,
          tracking_id: trackingId
        }
      });
    },
    getMyTrackingOrders: async function (trackingId) {
      return Request({
        method: 'GET',
        url: '/Tracking/getMyTrackingOrders',
        params: {
          tracking_id: trackingId
        }
      });
    },
    onChangeAdditionalSecurity: async function (trackingId, pars) {
      return Request({
        method: 'GET',
        url: '/Tracking/onChangeAdditionalSecurity',
        params: {
          tracking_id: trackingId,
          value: pars ? 1 : 0
        }
      });
    },
    cutDownPackage: async function (trackingId, pars) {
      return Request({
        method: 'GET',
        url: '/Tracking/cutDownPackage',
        params: {
          tracking_id: trackingId,
          value: pars ? 1 : 0
        }
      });
    },
    onChnageRepack: async function (trackingId, pars) {
      return Request({
        method: 'GET',
        url: '/Tracking/onChnageRepack',
        params: {
          tracking_id: trackingId,
          value: pars ? 1 : 0
        }
      });
    },
    onChangeComments: async function (trackingId, pars) {
      return Request({
        method: 'POST',
        url: '/Tracking/onChangeComments',
        params: {
          tracking_id: trackingId,
          comments: pars
        }
      });
    },
    onChangeBranches: async function (trackingId, value) {
      return Request({
        method: 'POST',
        url: '/Tracking/onChangeBranches',
        params: {
          tracking_id: trackingId,
          id: value ? value.id : 0
        }
      });
    },
    onChnageCourierService: function (trackingId, pars) {
      return Request({
        method: 'POST',
        url: '/Tracking/onChnageCourierService',
        params: {
          tracking_id: trackingId,
          value: pars ? 1 : 0
        }
      });
    },
    FormDeclaration: async function (trackingId) {
      return Request({
        method: 'POST',
        url: '/Tracking/FormDeclaration',
        params: { tracking_id: trackingId }
      });
    },
    FormDeclarationOff: async function (trackingId) {
      return Request({
        method: 'POST',
        url: '/Tracking/FormDeclarationOff',
        params: { tracking_id: trackingId }
      });
    },
    getMyProductList: async function (status) {
      return Request({
        method: 'GET',
        url: '/Tracking/getMyProductList',
        params: { status: status }
      });
    },
    getPayments: async function (trackingId) {
      return Request({
        method: 'POST',
        url: '/Tracking/getPayments',
        params: {
          tracking_id: trackingId
        }
      });
    }
  }
}
export default api;