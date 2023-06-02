<script>
  export default {

    props: ['priority'],

    data() {
      return {

        ifMobileApp: false,
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
 
        // if Mobile app; also require URL details
        if ((this.product == 5)) {
          
          this.ifMobileApp = true

          if ((this.isolatedClient == 'Yes')) {        
            // also require Isolated Client Text
            if ((this.issueTitle != '') && // require Issue Title              
                (this.expectedBehavior != '') && // require Expected Behavior
                (this.actualBehavior != '') && // require Actual Behavior                
                (this.isolatedClientText) &&  // require Isolated Client (additional info)
                (this.hasWorkaround != null) && // require Has Workaround (yes/no)
                (this.urlDetails != '')) // require URL details
                {            
                  this.canSubmit = true
                  return true            
                }
          }

          if ((this.isolatedClient == 'No')) {
            // no need to require Isolated Client Text
            if ((this.issueTitle != '') && // require Issue Title              
                (this.expectedBehavior != '') && // require Expected Behavior
                (this.actualBehavior != '') && // require Actual Behavior
                (this.hasWorkaround != null) && // require Has Workaround (yes/no)
                (this.urlDetails != '')) // require URL details
                {            
                  this.canSubmit = true
                  return true            
                }
          }

        } else { // no need to require URL details

          this.ifMobileApp = false
          
          if ((this.isolatedClient == 'Yes')) {
            // also require Isolated Client Text
            if ((this.issueTitle != '') && // require Issue Title              
                (this.expectedBehavior != '') && // require Expected Behavior
                (this.actualBehavior != '') && // require Actual Behavior
                (this.isolatedClientText) && // require isolated Client Text
                (this.hasWorkaround != null)) // require has workaround
                {
                  this.canSubmit = true
                  return true             
            }
          }

          if ((this.isolatedClient == 'No')) {
            // do no require Isolated Client Text
            if ((this.issueTitle != '') && // require Issue Title              
                (this.expectedBehavior != '') && // require Expected Behavior
                (this.actualBehavior != '') && // require Actual Behavior                
                (this.hasWorkaround != null))  // require has workaround
                {
                  this.canSubmit = true
                  return true             
            }
          }

        }
                  

      }

    }
    
  }
</script>

<template>
  <div class="h-full w-full md:w-1/2 mb-8 p-6 text-base relative ring-1 ring-slate-800 rounded-xl bg-gray-900 shadow-2xl shadow-slate-950">
    <h3 class="mb-5 text-xl font-light">Please fill the form before proceeding</h3>
    <form class="text-sm">
      <label for="issueTitle">Issue Title <span class="text-yellow-200">*</span>
        <input requried v-model="issueTitle" class="bg-gray-900 border border-gray-600 text-white placeholder:text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-4 mt-1" type="text" id="issueTitle" name="issueTitle" placeholder="What do you want to call this?">
      </label>
     
      <label for="drProductID">Product associated with <span class="text-yellow-200">*</span>
      <select id="drProductID" name="drProductID" v-model="product" class="bg-gray-900 border border-gray-600 text-white placeholder:text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-4 mt-1 appearance-none">
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
      </label>

      <label for="expectedBehavior">What is the expected behavior? <span class="text-yellow-200">*</span>
        <input requried v-model="expectedBehavior" class="bg-gray-900 border border-gray-600 text-white placeholder:text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-4 mt-1" type="text" id="expectedBehavior" name="expectedBehavior" placeholder="Describe the expected behavior here">
      </label>
      
      <label for="actualBehavior">What is the actual behavior? <span class="text-yellow-200">*</span>
        <input v-model="actualBehavior" class="bg-gray-900 border border-gray-600 text-white placeholder:text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-4 mt-1" type="text" id="actualBehavior" name="actualBehavior" placeholder="Describe the actual behavior here">
      </label>
      
      <fieldset>
        <legend for="isolatedClientText">Is this isolated to this client/event, or is this being experienced by all/most clients? (Please include additional event IDs if it is a subset of events) <span class="text-yellow-200">*</span></legend>        
        <label><input v-model="isolatedClient" type="radio" name="isolatedClient" value="Yes"> Yes</label>
        <label><input v-model="isolatedClient" type="radio" name="isolatedClient" value="No" class="ml-4"> No</label>
        <input v-model="isolatedClientText" class="bg-gray-900 border border-gray-600 text-white placeholder:text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-4 mt-2" type="text" id="isolatedClientText" name="isolatedClientText" placeholder="Add Event IDs here">      
      </fieldset>
            
      <fieldset>
        <legend>Is there a workaround? <span class="text-yellow-200">*</span></legend>
        <label><input v-model="hasWorkaround" type="radio" name="hasWorkaround" value="Yes"> Yes</label>
        <label><input v-model="hasWorkaround" type="radio" name="hasWorkaround" value="No" class="ml-4 mb-2"> No</label>        
      </fieldset>
      
      <label for="errorDetails">Error message details, blue screen #
        <textarea v-model='errorDetails' class="bg-gray-900 border border-gray-600 text-white placeholder:text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mb-4 mt-1 h-12" id="errorDetails" name="errorDetails" placeholder="Add details here"></textarea>      
      </label>
      
      <label for="loginDetails">Login details (user information, SSO login/pass, app user QR code, etc.)
        <textarea v-model='loginDetails' class="bg-gray-900 border border-gray-600 text-white placeholder:text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mb-4 mt-1 h-12" id="loginDetails" name="loginDetails" placeholder="Add details here"></textarea>            
      </label>
      
      <label for="urlDetails">URLs related to where the issue is occurring <span v-show="ifMobileApp" class="text-yellow-200">*</span>
        <textarea v-model='urlDetails' class="bg-gray-900 border border-gray-600 text-white placeholder:text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mb-4 mt-1 h-12" id="urlDetails" name="urlDetails" placeholder="Add details here"></textarea>      
      </label>
      <button :disabled="!fieldsNotEmpty" type="submit" @click="submitFormDetails()" class="disabled:hidden font-bold mt-2 inline-block rounded-full px-6 py-2 bg-orange-400 hover:bg-orange-500 text-black">Next</button>
    </form>    
        
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