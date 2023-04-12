<script>
  export default {

    props: ['priority'],

    data() {
      return {

        issueTitle: '',
        product: -1,
        expectedBehavior: '',
        actualBehavior: '',
        isolatedClient: null,
        isolatedClientText: '',
        hasWorkaround: null,
        errorDetails: '',
        loginDetails: '',
        urlDetails: '',              
        fullSummary: '',
        fieldsEmpty: true,
        canSubmit: false // only allow submission if data have been provided

      }
    },

    methods: {

      submitFormDetails() {       

        if (this.canSubmit) { 
          // store all form details in this variable
          this.fullSummary = 
            'Issue Title: ' + this.issueTitle + `\n` + 
            'Product: ' + this.product + `\n` + 
            'Priority: ' + this.priority + `\n` + 
            `Expected behavior\n` + this.expectedBehavior + `\n` +
            `Actual behavior\n` + this.actualBehavior + `\n` +
            `Is isolated to Client/Event\n` + this.isolatedClient + `\n` +
            `Additional Event IDs\n` + this.isolatedClientText + `\n` +
            `Has a workaround\n` + this.hasWorkaround + `\n` +
            `Error details\n` + this.errorDetails + `\n` +
            `Login details\n` + this.loginDetails + `\n` +
            `URL details\n` + this.urlDetails + `\n`

          alert(this.fullSummary)

        } 

      }

    },

    computed: {

      fieldsNotEmpty() {
 
        if ((this.issueTitle != '') && (this.product > -1) && (this.expectedBehavior != '') && (this.actualBehavior != '') && (this.isolatedClient != null) && (this.isolatedClientText) &&
            (this.hasWorkaround != null) && (this.errorDetails != '') && (this.loginDetails != '') && (this.urlDetails != '')) {
            
            this.canSubmit = true
            return true            

        }  

      }

    }
    
  }
</script>

<template>
  <div class="h-full w-full md:w-1/2 md:ml-10 md:p-0 p-4 text-base relative">
    <h3 class="mb-3 text-xl font-bold">Fill up these questions before proceeding</h3>
    <form>
      <label for="expectedBehavior">Issue Title</label>
      <input requried v-model="issueTitle" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-4" type="text" id="issueTitle" name="issueTitle" placeholder="What do you want to call this?">
      <label for="drProductID">Product associated with</label>
      <select id="drProductID" name="drProductID" v-model="product" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-4">
        <option value="-1" selected>Select the associated product below</option>
        <option value="0">myCadmium</option>
        <option value="1">Abstract Scorecard</option>
        <option value="2">Education Harvester</option>
        <option value="3">Expo Harvester</option>
        <option value="4">eventScribe Website</option>
        <option value="5">eventScribe Mobile App</option>
        <option value="6">eventScribe ePoster Gallery</option>
        <option value="7">Survey Magnet</option>
        <option value="8">Conference Passport</option>
        <option value="9">Hermes</option>
        <option value="10">Harvester Digital Signs</option>
        <option value="11">Web Services</option>
        <option value="12">Logistics Harvester</option>
        <option value="13">eventScribe Live</option>
        <option value="14">Registration</option>
        <option value="15">Membership</option>
        <option value="16">Professional Services</option>
        <option value="17">Live Event Lead Retrieval</option>
        <option value="18">Elevate LMS</option>
        <option value="19">EthosCE LMS</option>
        <option value="20">Elevate VC</option>
        <option value="21">Elevate WebCentral</option>
        <option value="22">Conference365</option>
        <option value="23">Audio Recordings</option>
      </select>      
      <label for="expectedBehavior">What is the expected behavior?</label>
      <input requried v-model="expectedBehavior" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-4" type="text" id="expectedBehavior" name="expectedBehavior" placeholder="Describe the expected behavior here">
      <label for="actualBehavior">What is the actual behavior?</label>
      <input v-model="actualBehavior" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-4" type="text" id="actualBehavior" name="actualBehavior" placeholder="Describe the actual behavior here">
      <label for="isolatedClient">Is this isolated to this client/event, or is this being experienced by all/most clients? (Please include additional event IDs if it is a subset of events)</label>
      <br>
      <input v-model="isolatedClient" type="radio" name="isolatedClient" value="Yes"><label for="isolatedClient"> Yes</label>
      <input v-model="isolatedClient" type="radio" name="isolatedClient" value="No" class="ml-4"><label for="isolatedClient"> No</label>
      <input v-model="isolatedClientText" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-4 mt-2" type="text" id="isolatedClientText" name="isolatedClientText" placeholder="Add Event IDs here">
      <label for="hasWorkaround">Is there a workaround? </label>
      <br>
      <input v-model="hasWorkaround" type="radio" name="hasWorkaround" value="Yes"><label for="hasWorkaround"> Yes</label>
      <input v-model="hasWorkaround" type="radio" name="hasWorkaround" value="No" class="ml-4 mb-5"><label for="hasWorkaround"> No</label>
      <br>
      <label for="errorDetails">Error message details, blue screen #</label>
      <textarea v-model='errorDetails' class="text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mb-4 h-14" name="errorDetails" placeholder="Add details here"></textarea>      
      <label for="loginDetails">Login details (user information, SSO login/pass, app user QR code, etc.)</label>
      <textarea v-model='loginDetails' class="text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mb-4 h-14" name="loginDetails" placeholder="Add details here"></textarea>            
      <label for="urlDetails">URLs related to where the issue is occurring</label>
      <textarea v-model='urlDetails' class="text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mb-4 h-14" name="urlDetails" placeholder="Add details here"></textarea>      
    </form>
    <button :disabled="!fieldsNotEmpty" type="submit" @click="submitFormDetails()" class="disabled:opacity-25 font-bold mt-5 inline-block float-right rounded-full px-6 py-2 bg-orange-400 mb-8">Next</button>
    <br><br>
    
  </div>
</template>

<style scoped>
 
  input[type="radio"] {
    width: 22px;
    height: 22px;
    position: relative;
    top: 4px;
    margin-right: 4px;    
  }  

</style>