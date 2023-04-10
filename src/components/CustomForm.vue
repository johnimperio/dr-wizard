<script>
  export default {

    props: ['priority'],

    data() {
      return {

        expectedBehavior: '',
        actualBehavior: '',
        isolatedClient: null,
        isolatedClientText: '',
        hasWorkaround: null,
        errorDetails: '',
        loginDetails: '',
        urlDetails: '',              
        fullSummary: ''

      }
    },
    methods: {

      submitFormDetails() {

        // store all form details in this variable
        this.fullSummary = `1. Expected behavior\n` + this.expectedBehavior + `\n\n` +
          `2. Actual behavior\n` + this.actualBehavior + `\n\n` +
          `3. Is isolated to Client/Event\n` + this.isolatedClient + `\n\n` +
          `4. Has a workaround\n` + this.hasWorkaround + `\n\n` +
          `5. Error details\n` + this.errorDetails + `\n\n` +
          `6. Login details\n` + this.loginDetails + `\n\n` +
          `7. URL details\n` + this.urlDetails + `\n\n`

        alert('Priority: ' + this.priority + `\n` + this.fullSummary)        
      }

    }
    
  }
</script>

<template>
  <div class="h-full w-full md:w-1/2 md:ml-10 md:p-0 p-4 text-base">
    <h3 class="mb-3 text-xl font-bold">Fill up these questions before proceeding</h3>
    <form @submit.prevent="requireInput">
      <label for="expectedBehavior">1. What is the expected behavior?</label>
      <input requried v-model="expectedBehavior" class="mb-4" type="text" id="expectedBehavior" name="expectedBehavior" placeholder="Describe the behavior here">
      <br><br>
      <label for="actualBehavior">2. What is the actual behavior?</label>
      <input required v-model="actualBehavior" class="mb-4" type="text" id="actualBehavior" name="actualBehavior" placeholder="Describe the behavior here">
      <br>
      <br>
      <label for="isolatedClient">3. Is this isolated to this client/event, or is this being experienced by all/most clients? (Please include additional event IDs if it is a subset of events)</label>
      <br>
      <input required v-model="isolatedClient" type="radio" name="isolatedClient" value="Yes"><label for="isolatedClient"> Yes</label>
      <input required v-model="isolatedClient" type="radio" name="isolatedClient" value="No" class="ml-4"><label for="isolatedClient"> No</label>
      <input required v-model="isolatedClientText" class="mt-2 mb-4" type="text" id="isolatedClientText" name="isolatedClientText" placeholder="Add Event IDs here">
      <br>
      <br>
      <label for="hasWorkaround">4. Is there a workaround? </label>
      <br>
      <input required v-model="hasWorkaround" type="radio" name="hasWorkaround" value="Yes"><label for="hasWorkaround"> Yes</label>
      <input required v-model="hasWorkaround" type="radio" name="hasWorkaround" value="No" class="ml-4 mb-5"><label for="hasWorkaround"> No</label>
      <br>
      <br>
      <label for="errorDetails">5. Error message details, blue screen #</label>
      <textarea v-model='errorDetails' class="block mt-3 w-full h-15 p-2" name="errorDetails" placeholder="Add details here"></textarea>
      <br>
      <br>
      <label for="loginDetails">6. Login details (user information, SSO login/pass, app user QR code, etc.)</label>
      <textarea v-model='loginDetails' class="block mt-3 w-full h-15 p-2" name="loginDetails" placeholder="Add details here"></textarea>
      <br>
      <br>
      <label for="urlDetails">7. URLs related to where the issue is occurring</label>
      <textarea v-model='urlDetails' class="block mt-3 w-full h-15 p-2" name="urlDetails" placeholder="Add details here"></textarea>      
    </form>
    <button type="submit" @click="submitFormDetails()" class="font-bold mt-5 inline-block float-right rounded-full px-6 py-2 bg-orange-400 hover:bg-orange-600">Next</button>
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

  input[type="text"] {
    width: 100%;
    padding: 3px 10px;
    font-size: 1rem;
    color: #000;
  }

  textarea {
    color: #000;    
  }

  .slide-fade-enter-active {
    transition: all 0.3s 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s 0.3s ease-out;
  }
  .slide-fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
  }
  .slide-fade-enter-from {
    transform: translateX(-20px);
    opacity: 0;
  }

</style>