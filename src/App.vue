<script>
  import CustomForm from './components/CustomForm.vue'
  import TicketMessage from './components/TicketMessage.vue'

  export default {

    components: {
      CustomForm,
      TicketMessage
    },

    data() {
      return { 

        message: 'What should I submit?',
        barColor: 'bg-gray-500',
        wizardStarted: false,
        currentPage: 1,
        showBack: false,
        nextQuestion: false,        

        // store input radio button states on this object
        questionSet: [
          { q1: false, q2: false, done: false, r1: null, r2: null }, // triage questions
          { q1: false, q2: false, done: false, r1: null, r2: null }, // urgent
          { q1: false, q2: false, done: false, r1: null, r2: null }, // high
          { q1: false, q2: false, done: false, r1: null, r2: null }  // low and normal          
        ],
     
        // for hiding/showing pages
        wizard: [
          { pageId: 1, showPage: false }, // start
          { PageId: 2, showPage: false }, // urgent dr questions
          { PageId: 3, showPage: false }, // high dr questions
          { PageId: 4, showPage: false }, // low and normal dr questions
          { PageId: 5, showPage: false }, // non-reportable issue
          { PageId: 6, showPage: false }, // submit urgent DR
          { PageId: 7, showPage: false }, // submit high DR
          { PageId: 8, showPage: false }, // submit normal DR
          { PageId: 9, showPage: false }  // submit low DR          
        ]
      }
    },

    methods: {

      startWizard() {
        this.wizardStarted = true
        this.wizard[0].showPage = true
        this.message = 'Triage/Evaluations Questions'        
      },

      restartWizard() {        

        // reset all wizard pages
        for (let x = 0; x < this.wizard.length; x++) {
          this.wizard[x].showPage = false            
        }

        // reset all input radio buttons values
        for (let x2 = 0; x2 < this.questionSet.length; x2++) {
          this.questionSet[x2].q1 = false
          this.questionSet[x2].q2 = false
          this.questionSet[x2].done = false
          this.questionSet[x2].r1 = null
          this.questionSet[x2].r2 = null       
        }

        this.wizardStarted = false;
        this.nextQuestion = false;
        this.showBack = false;
        this.currentPage = 1;
        this.barColor = 'bg-gray-500'
        this.message = 'What should I submit?'
        
      },

      // evaluate input radio button answers and show questions and CTA based on response
      updateWizard(questionNum, questionValue) {
        switch (questionNum) {

          case 'p1q1': 
            this.questionSet[0].q1 = questionValue; 
            this.nextQuestion = true;             
            break;

          case 'p1q2': 
            this.questionSet[0].q2 = questionValue; 
            this.questionSet[0].done = true;            
            break;
          
          case 'p2q1-yes': 
            this.questionSet[1].q1 = questionValue; 
            this.nextQuestion = false;
            break;

          case 'p2q1-no': 
            this.questionSet[1].q1 = questionValue; 
            this.nextQuestion = true;
          break;          

          case 'p2q2': 
            this.questionSet[1].q2 = questionValue; 
            this.questionSet[1].done = true; 
            break;

          case 'p3q1-yes': 
            this.questionSet[2].q1 = questionValue; 
            this.nextQuestion = false; 
            break;

          case 'p3q1-no': 
            this.questionSet[2].q1 = questionValue; 
            this.nextQuestion = true; 
            break;

          case 'p3q2': 
            this.questionSet[2].q2 = questionValue;
            this.questionSet[2].done = true; 
            break;
          
          case 'p4q1': 
            this.questionSet[3].q1 = questionValue;
            this.questionSet[3].done = true;
            break;

        }
      },

      // hide/show page
      goToPage(pageNumber) {  
        
        for (let x = 0; x < this.wizard.length; x++) {
          this.wizard[x].showPage = false
        }       

        this.wizard[pageNumber-1].showPage = true
        this.currentPage = pageNumber

        if ((this.currentPage > 1) && (this.currentPage < 5)) {
          this.showBack = true
        } else {
          this.showBack = false 
        } 

        this.nextQuestion = false
        this.updateMessage()
        
      },

      goPreviousPage() {

        this.currentPage -= 1

        for (let x = 0; x < this.wizard.length; x++) {
          this.wizard[x].showPage = false
        }        

        // clear input radio button values for current page
        this.questionSet[this.currentPage].q1 = null
        this.questionSet[this.currentPage].q2 = null
        this.questionSet[this.currentPage].r1 = null
        this.questionSet[this.currentPage].r2 = null
        this.questionSet[this.currentPage].done = false
                
        // clear input radio button values for previous page        
        this.questionSet[this.currentPage - 1].q1 = null
        this.questionSet[this.currentPage - 1].q2 = null
        this.questionSet[this.currentPage - 1].r1 = null
        this.questionSet[this.currentPage - 1].r2 = null
        this.questionSet[this.currentPage - 1].done = false        
        this.nextQuestion = false

        this.wizard[this.currentPage - 1].showPage = true
                
        if (this.currentPage == 1) { this.showBack = false }

      }

    },

    computed: {

      updateMessage() { 
        switch(this.currentPage) {
          case 1:
            this.barColor = 'bg-gray-500'; 
            return this.message = 'Triage/Evaluations Questions'; 
            break;
          case 2:
            this.barColor = 'bg-gray-500'; 
            return this.message = 'Urgent Priority DR Questions'; 
            break;
          case 3:
            this.barColor = 'bg-gray-500'; 
            return this.message = 'High Priority DR Questions'; 
            break;
          case 4:
            this.barColor = 'bg-gray-500'; 
            return this.message = 'Low/Normal Priority DR Question'; 
            break;  
          case 5: 
            this.barColor = 'bg-blue-500'; 
            return this.message = 'Non-Essential Issue'; 
            break;
          case 6: 
            this.barColor = 'bg-red-600'; 
            return this.message = 'Submit an Urgent Priority Ticket'; 
            break;
          case 7: 
            this.barColor = 'bg-orange-400'; 
            return this.message = 'Submit a High Priority Ticket'; 
            break;
          case 8: 
            this.barColor = 'bg-yellow-400'; 
            return this.message = 'Submit a Normal Priority Ticket'; 
            break;
          case 9: 
            this.barColor = 'bg-green-400'; 
            return this.message = 'Submit a Low Priority Ticket'; 
            break;
        } 
        
      }
    }
    
  }
</script>

<template>  
  
  <div class="h-screen md:h-screen font-sans text-xl bg-gray-800 p-4 md:p-8 relative text-white font-light">

    <div class="pb-4 mb-2">
      <h1 class="text-xl sm:text-2xl md:text-3xl md:mt-0 font-semibold md:max-w-none w-1/2 sm:w-full md:w-full">{{ message }}</h1>      
      <div class="mt-3 h-1 w-full transition-all ease-in-out" :class="this.barColor" ></div>      
    </div>          
    
    <div class="flex justify-between">
      <div class="w-screen">

        <!-- What do I need to submit? -->
        <Transition name="slide-fade">
          <div v-show="!wizardStarted" class="flex justify-center gap-6 flex-wrap lg:flex-nowrap">
                
            <a v-on:click="startWizard()" class="flex items-start cursor-pointer justify-center h-52 md:h-45 max-w-sm p-6 md:p-6 text-center bg-blue-600 ring-1 ring-blue-700 rounded-lg shadow-zinc-950 shadow-lg hover:bg-blue-800 w-60 text-white">
              <div>                
                <h5 class="mb-4 text-xl font-bold tracking-tight underline">Experiencing an issue?</h5>
                <p class="text-sm font-light leading-tight">Click here if the behavior or feature of the system is not working as expected</p>
              </div>
            </a>

            <a target="_blank" href="#" class="flex items-start justify-center h-52 md:h-45 max-w-sm p-6 md:p-6 text-center bg-teal-600 ring-1 ring-teal-700 rounded-lg shadow-zinc-950 shadow-lg hover:bg-teal-800 w-60 text-white">
              <div>                
                <h5 class="mb-4 text-xl font-bold tracking-tight leading-tight underline">Need help with integrations?</h5>
                <p class="text-sm font-light leading-tight">Click here if you need assistance with product integrations</p>
              </div>
            </a>

            <a target="_blank" href="#" class="flex items-start justify-center h-52 md:h-45 max-w-sm p-6 md:p-6 text-center bg-indigo-600 ring-1 ring-indigo-700 rounded-lg shadow-zinc-950 shadow-lg hover:bg-indigo-800 w-60 text-white">
              <div>                
                <h5 class="mb-4 text-xl font-bold tracking-tight leading-tight underline">Looking for a report?</h5>
                <p class="text-sm font-light leading-tight">Click here if you require assistance generating custom analytics data</p>
              </div>
            </a>
          
            <a target="_blank" href="https://forms.monday.com/forms/bcb5036610a533c452bb769c487a1c57?r=use1" class="flex items-start justify-center h-52 md:h-45 max-w-sm p-6 md:p-6 text-center bg-orange-500 ring-1 ring-orange-600 rounded-lg shadow-zinc-950 shadow-lg hover:bg-orange-600 w-60 text-white">
              <div>                
                <h5 class="mb-4 text-xl font-bold tracking-tight text-white-200 leading-tight underline">Have a feature or idea request?</h5>
                <p class="text-sm font-light leading-tight">Click here if the issue is a feature improvement, cosmetic enhancement, grammatical error or copy adjustment</p>
              </div>
            </a>
            
          </div>        
        </Transition>
        
        <button v-show="wizardStarted" v-on:click="restartWizard()" class="absolute top-3 right-4 md:top-6 md:right-7 px-3 py-1 md:px-5 md:py-2 rounded-full text-base text-white border bg-gray-0 hover:bg-gray-700">Start Over</button>
        <button v-show="showBack" v-on:click="goPreviousPage()" class="absolute top-3 right-32 md:top-6 md:right-40 px-3 py-1 md:px-5 md:py-2 rounded-full text-base text-white border bg-gray-0 hover:bg-gray-700">Back</button>
        <p class="absolute bottom-7 right-7 text-base font-light text-gray-400" v-show="(this.currentPage < 5) && (this.wizardStarted)">Page {{ currentPage }}</p>
        
        <!-- Page 1 - START TRIAGE/EVAL QUESTIONS -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[0].showPage"> <!-- if wizard has started -->           

            <ol class="ml-8 list-decimal">
              <li>
                <p>Have you recreated this issue?</p>                  
                <input type="radio" name="p1q1" v-model="this.questionSet[0].r1" @click="updateWizard('p1q1', true)" value="Yes"><label for="p1q1"> Yes</label>
                <input type="radio" name="p1q1" v-model="this.questionSet[0].r1" @click="updateWizard('p1q1', false)" value="No"><label for="p1q1"> No</label>
              </li>
              <Transition name="slide-fade">
              <li v-show="nextQuestion">
                <p>Have you verified this with a peer?</p>
                <input type="radio" name="p1q2" v-model="this.questionSet[0].r2" @click="updateWizard('p1q2', true)" value="Yes"><label for="p1q2"> Yes</label>
                <input type="radio" name="p1q2" v-model="this.questionSet[0].r2" @click="updateWizard('p1q2', false)" value="No"><label for="p1q2"> No</label>
              </li>
              </Transition>
            </ol>

            <div class="mt-10">
              <!-- if both yes, go to Urgent DR Questions -->
              <button @click="goToPage(2)" v-show="(this.questionSet[0].q1 && this.questionSet[0].q2)" class="btn bg-blue-500 hover:bg-blue-600">Next</button>

              <!-- if one or both no, go to Non-Reportable Page -->
              <button @click="goToPage(5)" v-show="this.questionSet[0].done && !(this.questionSet[0].q1 && this.questionSet[0].q2)" class="btn bg-orange-500 hover:bg-orange-600">See Non-Essential Issue</button>
            </div>
            
          </div>
          
        </Transition>

        <!-- Page 2 - URGENT PRIORITY DR QUESTIONS -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[1].showPage">

            <ol class="ml-8 list-decimal">
              <li>
                <p>Is the event live and causing major disruption?</p>
                <input type="radio" name="p2q1" v-model="this.questionSet[1].r1" @click="updateWizard('p2q1-yes', true)" value="Yes"><label for="p2q1"> Yes</label>
                <input type="radio" name="p2q1" v-model="this.questionSet[1].r1" @click="updateWizard('p2q1-no', false)" value="No"><label for="p2q1"> No</label>
              </li>
              <Transition name="slide-fade">
              <li v-show="nextQuestion">
                <p>Is an entire product down for all customers?</p>
                <input type="radio" name="p2q2" v-model="this.questionSet[1].r2" @click="updateWizard('p2q2', true)" value="Yes"><label for="p2q2"> Yes</label>
                <input type="radio" name="p2q2" v-model="this.questionSet[1].r2" @click="updateWizard('p2q2', false)" value="No"><label for="p2q2"> No</label>
              </li>
              </Transition>
            </ol>

            <div class="mt-10">
              <!-- if both yes, submit Urgent DR -->
              <button @click="goToPage(6)" v-show="(this.questionSet[1].q1) || ((!this.questionSet[1].q1 && this.questionSet[1].q2))" class="btn bg-blue-500 hover:bg-blue-600">Urgent Priority DR Required</button>
              
              <!-- if one or both no, go to High Priority DR Questions -->
              <button @click="goToPage(3)" v-show="this.questionSet[1].done && (!this.questionSet[1].q1 && !this.questionSet[1].q2)" class="btn bg-orange-500 hover:bg-orange-600">Next</button>
            </div>

          </div>
        </Transition>

        <!-- Page 3 - HIGH PRIORITY DR QUESTIONS -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[2].showPage">

            <ol class="ml-8 list-decimal">
              <li>
                <p>Is the issue impacting a customer’s product that has launched, is launching, or closing within the next 2 days? </p>
                <input type="radio" name="p3q1" v-model="this.questionSet[2].r1" @click="updateWizard('p3q1-yes', true)" value="Yes"><label for="p3q1"> Yes</label>
                <input type="radio" name="p3q1" v-model="this.questionSet[2].r1" @click="updateWizard('p3q1-no', false)" value="No"><label for="p3q1"> No</label>
              </li>
              <Transition name="slide-fade">
              <li v-show="nextQuestion">
                <p>Is a front-end user or admin feature down without a workaround? </p>
                <input type="radio" name="p3q2" v-model="this.questionSet[2].r2" @click="updateWizard('p3q2', true)" value="Yes"><label for="p3q2"> Yes</label>
                <input type="radio" name="p3q2" v-model="this.questionSet[2].r2" @click="updateWizard('p3q2', false)" value="No"><label for="p3q2"> No</label>
              </li>
              </Transition>
            </ol>

            <div class="mt-10">
              <!-- if both yes, submit High Priority DR -->
              <button @click="goToPage(7)" v-show="(this.questionSet[2].q1) || ((!this.questionSet[2].q1 && this.questionSet[2].q2))" class="btn bg-blue-500 hover:bg-blue-600">High Priority DR Required</button>

              <!-- if one or both no, go to Normal Priority DR Questions -->
              <button @click="goToPage(4)" v-show="this.questionSet[2].done && (!this.questionSet[2].q1 && !this.questionSet[2].q2)" class="btn bg-orange-500 hover:bg-orange-600">Next</button>
            </div>

          </div>
        </Transition>

        <!-- Page 4 - NORMAL PRIORITY DR QUESTIONS -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[3].showPage">

            <ol class="ml-8 list-decimal">
              <li>
                <p>Is a front-end or admin feature down for more than one customer but there is a workaround?</p>
                <input type="radio" name="p4q1" v-model="this.questionSet[3].r1" @click="updateWizard('p4q1', true)" value="Yes"><label for="p4q1"> Yes</label>
                <input type="radio" name="p4q1" v-model="this.questionSet[3].r1" @click="updateWizard('p4q1', false)" value="No"><label for="p4q1"> No</label>
              </li>                
            </ol>

            <div class="mt-10">
              <!-- if yes, submit Low Priority DR -->
              <button @click="goToPage(9)" v-show="this.questionSet[3].q1" class="btn bg-blue-500 hover:bg-blue-600">Low Priority DR Required</button>

              <!-- if no, submit Normaly Priority DR -->
              <button @click="goToPage(8)" v-show="this.questionSet[3].done && !this.questionSet[3].q1" class="btn bg-orange-500 hover:bg-orange-600">Normal Priority DR Required</button>
            </div>

          </div>
        </Transition>

        <!-- ********************************************************************* -->
        <!-- Page 5 - NON REPORTABLE ISSUE -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[4].showPage">

            <div class="w-full text-base">              
              <p class="text-gray-300 selection:bg-orange-500 selection:text-white">A non-essential issue is anything that does not have the ability to be reproduced or does not have clear instructions to recreate.</p>
              <div class="p-5 bg-gray-900 mt-5 rounded-lg">
                <h3 class="text-xl font-bold">Possible next steps to make the issue reportable:</h3>
                <ul class="list-disc mx-5 mt-3 mb-4">
                  <li>Get further clarification from the client</li>
                  <li>Work with your team to further research the issue</li>
                  <li>Provide clear steps for reproduction</li>
                </ul>
              </div>              
              <a href="#" class="mt-5 inline-block font-bold rounded-full px-6 py-2 bg-orange-400 hover:bg-orange-600">Next</a>
            </div>

          </div>
        </Transition>
                                                                                                                                                                                   
        <!-- Page 6 - SUBMIT URGENT DR -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[5].showPage">

            <div class="flex items-start justify-between flex-wrap md:flex-nowrap gap-7">

              <TicketMessage cardColor="bg-red-200">
                <template v-slot:ticketTimeline>
                  <p>If the issue is truly urgent, a developer will be assigned to work on the ticket immediately. The submitter will be notified of any updates along the way as well as immediate confirmation that the request has been seen.</p>
                </template>
                <template v-slot:suggestedMessage>
                  <p>We recognize that this issue is causing major disruption to your event and products. The team is working to find a solution or workaround for the problem that you have reported. We will provide an update as soon as we have any additional information.</p>
                </template>
              </TicketMessage>

              <CustomForm priority="urgent"></CustomForm>
              
            </div>

          </div>
        </Transition>

        <!-- Page 7 - SUBMIT HIGH DR -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[6].showPage">

            <div class="flex items-start justify-between flex-wrap md:flex-nowrap gap-7">

              <TicketMessage cardColor="bg-orange-200">
                <template v-slot:ticketTimeline>
                  <p>Based on prioritization and number of other high issues being reported. If a high issue is submitted, the PO will respond to the submitter to let them know the issue has been received, evaluate it within one (1) business day, and work with development managers to have the issue prioritized in a current sprint.</p>
                </template>
                <template v-slot:suggestedMessage>
                  <p><strong class="font-bold">If a workaround exists:</strong></p>
                  <p>As we continue to look into the issue, here is a workaround that you can use to get the same information that you need.</p>
                  <br>
                  <p><strong class="font-bold">If no workaround exists:</strong></p>
                  <p>Thank you for reporting this issue. We are investigating the problem further and will get back to you with a status update when we have more information.</p>
                </template>
              </TicketMessage>

              <CustomForm priority="high"></CustomForm>
            </div>

          </div>
        </Transition>

        <!-- Page 8 - SUBMIT NORMAL DR -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[7].showPage">

            <div class="flex items-start justify-between flex-wrap md:flex-nowrap gap-7">

              <TicketMessage cardColor="bg-yellow-200">
                <template v-slot:ticketTimeline>
                  <p>Priority is evaluated on a 2 week basis by the PO and pulled into a sprint when resources are available by a development manager.</p>
                </template>
                <template v-slot:suggestedMessage>
                  <p><strong class="font-bold">If a workaround exists:</strong></p>
                  <p>Thank you for bringing this to our attention. Here is a workaround that you can use to get the same or similar outcome.</p>
                  <br>
                  <p><strong class="font-bold">If no workaround exists:</strong></p>
                  <p>Thank you for reporting this issue. We have added it to our issue queue and will consider it for future development.</p>
                </template>
              </TicketMessage>

              <CustomForm priority="normal"></CustomForm>
            </div>           

          </div>
        </Transition>

        <!-- Page 9 - SUBMIT LOW DR -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[8].showPage">

            <div class="flex items-start justify-between flex-wrap md:flex-nowrap gap-7">

              <TicketMessage cardColor="bg-green-200">
                <template v-slot:ticketTimeline>
                  <p>Priority is evaluated on a 2 week basis by the PO and pulled into a sprint when resources are available by a development manager.</p>
                </template>
                <template v-slot:suggestedMessage>
                  <p>Thank you for reporting this issue. We have added it to our issue queue and will consider it for future development.</p>                
                </template>
              </TicketMessage>

              <CustomForm priority="low"></CustomForm>
            </div>

          </div>
        </Transition>

      </div>
    </div>
  </div>  
  
</template>

<style scoped>
  
  ol li { margin-top: 15px; }
  ol li label { margin-right: 20px; }
  
  input[type="radio"] {
    width: 22px;
    height: 22px;
    position: relative;
    top: 4px;
    margin-right: 4px;    
  }  

  .btn {
    border-radius: 50px;
    padding: 4px 16px;    
    margin: 10px 15px 0 0;
    color: #fff;
    font-size: 1rem;
  }

  .slide-fade-enter-active {
    transition: all 0.3s 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s ease-out;
  }
  .slide-fade-leave-to {
    transform: translateY(30px);
    opacity: 0;
  }
  .slide-fade-enter-from {
    transform: translateY(30px);
    opacity: 0;
  }

</style>