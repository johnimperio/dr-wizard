<script>
  import CustomForm from './components/CustomForm.vue'

  export default {
    components: {
      CustomForm
    },
    data() {
      return { 

        wizardStarted: false,
        showBack: false,
        nextQuestion: false,
        summary: '',
        currentPage: 1,

        questionSet: [
          { q1: false, q2: false, done: false, r1: null, r2: null },
          { q1: false, q2: false, done: false, r1: null, r2: null },
          { q1: false, q2: false, done: false, r1: null, r2: null },
          { q1: false, q2: false, done: false, r1: null, r2: null },
          { q1: false, q2: false, done: false, r1: null, r2: null }
        ],
     
        wizard: [
          { pageId: 1, showPage: false }, // start
          { PageId: 2, showPage: false }, // urgent dr questions
          { PageId: 3, showPage: false }, // high dr questions
          { PageId: 4, showPage: false }, // normal dr questions
          { PageId: 5, showPage: false }, // low dr questions
          { PageId: 6, showPage: false }, // non-reportable issue
          { PageId: 7, showPage: false }, // submit urgent DR
          { PageId: 8, showPage: false }, // submit high DR
          { PageId: 9, showPage: false }, // submit normal DR
          { PageId: 10, showPage: false }, // submit low DR
        ]
      }
    },
    methods: {

      startWizard() {
        this.wizardStarted = !this.wizardStarted
        this.wizard[0].showPage = !this.wizard[0].showPage
      },

      restartWizard() {        

        for (let x = 0; x < this.wizard.length; x++) {
          this.wizard[x].showPage = false            
        }

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

        this.summary = '';
      },

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
          
          case 'p2q1': 
            this.questionSet[1].q1 = questionValue; 
            this.nextQuestion = true; 
            break;

          case 'p2q2': 
            this.questionSet[1].q2 = questionValue; 
            this.questionSet[1].done = true; 
            break;

          case 'p3q1': 
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

          case 'p5q1': 
            this.questionSet[4].q1 = questionValue;
            this.nextQuestion = true; 
            break;

          case 'p5q2': 
            this.questionSet[4].q2 = questionValue;
            this.questionSet[4].done = true;
            break;

        }
      },

      goToPage(pageNumber) {  

        switch (pageNumber) {
          case 1 : this.showBack = false; this.currentPage = 1; break;
          case 2 : this.showBack = true; this.currentPage = 2; break;
          case 3 : this.showBack = true; this.currentPage = 3; break;
          case 4 : this.showBack = true; this.currentPage = 4; break;
          case 5 : this.showBack = true; this.currentPage = 5; break;
          case 6 : this.showBack = false; this.currentPage = 6; break;
          case 7 : this.showBack = false; this.currentPage = 7; break;
          case 8 : this.showBack = false; this.currentPage = 8; break;
          case 9 : this.showBack = false; this.currentPage = 9; break;
          case 10 : this.showBack = false; this.currentPage = 10; break;
          default: this.showBack = false;          
        }        
        
        for (let x = 0; x < this.wizard.length; x++) {
          this.wizard[x].showPage = false
        }
        this.wizard[pageNumber-1].showPage = true        
        this.nextQuestion = false
        
      },

      goPreviousPage() {

        this.currentPage -= 1;        

        for (let x = 0; x < this.wizard.length; x++) {
          this.wizard[x].showPage = false
        }
        this.wizard[this.currentPage-1].showPage = true        
        this.questionSet[this.currentPage-1].done = false        
        this.nextQuestion = false        

      }

    }
    
  }
</script>

<template>  
  
  <div class="h-full md:h-screen font-sans text-xl bg-gray-800 p-4 md:p-8 relative text-white font-light">

    <div class="pb-4 mb-10 border border-gray-500 border-t-0 border-separate border-l-0 border-r-0 border-b">
      <h1 class="text-xl sm:text-3xl md:text-4xl md:mt-0 font-bold md:max-w-none w-1/2 sm:w-full md:w-full">DR Issuance Workflow</h1>
      <p v-show="!wizardStarted" class="text-gray-400 text-base">This wizard will ask you a series of Yes or No questions.</p>
    </div>          
    
    <div class="flex justify-between">
      <div class="w-screen">          

        <button v-show="!wizardStarted" v-on:click="startWizard()" class="mt-0 md:mt-4 px-4 py-1 md:px-5 md:py-3 md:text-xl text-lg rounded-full text-white bg-blue-500 hover:bg-blue-600">Start Wizard</button>
        <button v-show="wizardStarted" v-on:click="restartWizard()" class="absolute top-4 right-4 md:top-6 md:right-7 px-3 py-1 md:px-5 md:py-3 rounded-full text-base text-white border bg-gray-0 hover:bg-gray-700">Start Over</button>
        <button v-show="showBack" v-on:click="goPreviousPage()" class="absolute top-4 right-32 md:top-6 md:right-40 px-3 py-1 md:px-5 md:py-3 rounded-full text-base text-white border bg-gray-0 hover:bg-gray-700">Back</button>
        <p class="absolute bottom-7 right-7 text-base font-light text-gray-400" v-show="(this.currentPage < 6)">Page {{ currentPage }}</p>
        
        <!-- Page 1 - START TRIAGE/EVAL QUESTIONS -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[0].showPage"> <!-- if wizard has started -->
            
            <h2 class="md:text-3xl my-5 font-medium">Triage/Evaluations Questions</h2>

            <ol>
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
              <button @click="goToPage(2)" v-show="(this.questionSet[0].q1 && this.questionSet[0].q2)" class="btn bg-blue-500 hover:bg-blue-600">See Urgent Priority DR Questions</button>

              <!-- if one or both no, go to Non-Reportable Page -->
              <button @click="goToPage(6)" v-show="this.questionSet[0].done && !(this.questionSet[0].q1 && this.questionSet[0].q2)" class="btn bg-blue-500 hover:bg-blue-600">See Non-Reportable Issue</button>
            </div>
            
          </div>
          
        </Transition>

        <!-- Page 2 - URGENT PRIORITY DR QUESTIONS -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[1].showPage">
            <h2 class="md:text-3xl my-5 font-medium">Urgent Priority DR Questions</h2>

            <ol>
              <li>
                <p>Is the event live and causing major disruption?</p>
                <input type="radio" name="p2q1" v-model="this.questionSet[1].r1" @click="updateWizard('p2q1', true)" value="Yes"><label for="p2q1"> Yes</label>
                <input type="radio" name="p2q1" v-model="this.questionSet[1].r1" @click="updateWizard('p2q1', false)" value="No"><label for="p2q1"> No</label>
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
              <button @click="goToPage(7)" v-show="(this.questionSet[1].q1 && this.questionSet[1].q2)" class="btn bg-blue-500 hover:bg-blue-600">Urgent Priority DR Required</button>

              <!-- if one or both no, go to High Priority DR Questions -->
              <button @click="goToPage(3)" v-show="this.questionSet[1].done && !(this.questionSet[1].q1 && this.questionSet[1].q2)" class="btn bg-blue-500 hover:bg-blue-600">See High Priority Questions</button>
            </div>

          </div>
        </Transition>

        <!-- Page 3 - HIGH PRIORITY DR QUESTIONS -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[2].showPage">
            <h2 class="md:text-3xl my-5 font-medium">High Priority DR Questions</h2>

            <ol>
              <li>
                <p>Is the issue impacting a customer’s product that has launched, is launching, or closing within the next 2 days? </p>
                <input type="radio" name="p3q1" v-model="this.questionSet[2].r1" @click="updateWizard('p3q1', true)" value="Yes"><label for="p3q1"> Yes</label>
                <input type="radio" name="p3q1" v-model="this.questionSet[2].r1" @click="updateWizard('p3q1', false)" value="No"><label for="p3q1"> No</label>
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
              <button @click="goToPage(8)" v-show="(this.questionSet[2].q1 && this.questionSet[2].q2)" class="btn bg-blue-500 hover:bg-blue-600">High Priority DR Required</button>

              <!-- if one or both no, go to Normal Priority DR Questions -->
              <button @click="goToPage(4)" v-show="this.questionSet[2].done && !(this.questionSet[2].q1 && this.questionSet[2].q2)" class="btn bg-blue-500 hover:bg-blue-600">See Normal Priority Questions</button>
            </div>

          </div>
        </Transition>

        <!-- Page 4 - NORMAL PRIORITY DR QUESTIONS -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[3].showPage">
            <h2 class="md:text-3xl my-5 font-medium">Normal Priority DR Questions</h2>

            <ol>
              <li>
                <p>Is a front-end or admin feature down for more than one customer but there is a workaround?</p>
                <input type="radio" name="p4q1" v-model="this.questionSet[3].r1" @click="updateWizard('p4q1', true)" value="Yes"><label for="p4q1"> Yes</label>
                <input type="radio" name="p4q1" v-model="this.questionSet[3].r1" @click="updateWizard('p4q1', false)" value="No"><label for="p4q1"> No</label>
              </li>                
            </ol>

            <div class="mt-10">
              <!-- if both yes, submit Normal Priority DR -->
              <button @click="goToPage(9)" v-show="this.questionSet[3].q1" class="btn bg-blue-500 hover:bg-blue-600">Normal Priority DR Required</button>

              <!-- if one or both no, go to Low Priority DR Questions -->
              <button @click="goToPage(5)" v-show="this.questionSet[3].done && !this.questionSet[3].q1" class="btn bg-blue-500 hover:bg-blue-600">See Low Priority Questions</button>
            </div>

          </div>
        </Transition>
        
        <!-- Page 5 - LOW PRIORITY DR QUESTIONS -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[4].showPage">
            <h2 class="md:text-3xl my-5 font-medium">Low Priority DR Questions</h2>

            <ol>
              <li>
                <p>Is a feature down for one customer or one front-end user?</p>
                <input type="radio" name="p5q1" v-model="this.questionSet[4].r1" @click="updateWizard('p5q1', true)" value="Yes"><label for="p5q1"> Yes</label>
                <input type="radio" name="p5q1" v-model="this.questionSet[4].r1" @click="updateWizard('p5q1', false)" value="No"><label for="p5q1"> No</label>
              </li>
              <Transition name="slide-fade">
              <li v-show="nextQuestion">
                <p>Has the event has concluded?</p>
                <input type="radio" name="p5q2" v-model="this.questionSet[4].r2" @click="updateWizard('p5q2', true)" value="Yes"><label for="p5q2"> Yes</label>
                <input type="radio" name="p5q2" v-model="this.questionSet[4].r2" @click="updateWizard('p5q2', false)" value="No"><label for="p5q2"> No</label>
              </li>
              </Transition>
            </ol>

            <div class="mt-10">
              <!-- if both yes, submit Low Priority DR -->
              <button @click="goToPage(10)" v-show="(this.questionSet[4].q1 && this.questionSet[4].q2)" class="btn bg-blue-500 hover:bg-blue-600">Low Priority DR Required</button>

              <!-- if one or both no, go to Non-Reportable Issue -->
              <button @click="goToPage(6)" v-show="this.questionSet[4].done && !(this.questionSet[4].q1 && this.questionSet[4].q2)" class="btn bg-blue-500 hover:bg-blue-600">Non-Reportable Issue</button>
            </div>

          </div>
        </Transition>

        <!-- ********************************************************************* -->
        <!-- Page 6 - NON REPORTABLE ISSUE -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[5].showPage">

            <div class="w-full text-base p-4 ring-1 ring-slate-600 rounded bg-gray-700 shadow-2xl shadow-slate-950">
              <div class="bg-blue-600 h-5 md:w-1/2 w-full"></div>
              <h2 class="text-2xl md:text-3xl md:text-3xl font-bold my-5">Non-Reportable Issue</h2>
              <p class="text-gray-300">A non-reportable issue is anything that does not have the ability to be reproduced, does not have clear instructions to recreate, or is a surface level cosmetic adjustment. For example, a grammatical error in a mission or a request to change the language that is currently published.</p>
              <div class="p-5 bg-gray-500 mt-5">
                <h3 class="text-xl font-bold">Possible next steps to make the issue reportable:</h3>
                <ul>
                  <li>Get further clarification from the client</li>
                  <li>Work with your team to further research the issue</li>
                  <li>Provide clear steps for reproduction</li>
                </ul>
              </div>              
              <a href="#" class="mt-5 inline-block font-bold rounded-full px-6 py-2 bg-orange-400 hover:bg-orange-600">Next</a>
            </div>

          </div>
        </Transition>

        <!-- Page 7 - SUBMIT URGENT DR -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[6].showPage">

            <div class="flex items-start justify-between flex-wrap md:flex-nowrap">
              <div class="w-full mb-5 md:w-1/2 text-base p-4 ring-1 ring-slate-600 rounded bg-gray-700 shadow-2xl shadow-slate-950">
                <div class="bg-red-500 h-5 w-full"></div>
                <h2 class="text-2xl md:text-3xl my-5 font-bold">Submit an Urgent Priority DR</h2>
                <h3 class="text-xl font-semibold mt-5 mb-3">Timeline</h3>
                <p>If an issue is truly urgent, a development manager will be notified and the issue will be pulled into an active sprint. The submitter will be notified of any updates along the way as well as immediate confirmation that the request has been seen.</p>
                <div class="p-5 bg-gray-500 mt-5">
                  <h3 class="text-xl font-semibold mb-4">Suggested Client Messaging</h3>
                  <p>We recognize that this issue is causing major disruption to your event and products. The team is working to find a solution or workaround for the problem that you have reported. We will provide an update as soon as we have any additional information.</p>
                </div>
              </div>
              <CustomForm />
            </div>

          </div>
        </Transition>

        <!-- Page 8 - SUBMIT HIGH DR -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[7].showPage">

            <div class="flex items-start justify-between flex-wrap md:flex-nowrap">
              <div class="w-full mb-5 md:w-1/2 text-base p-4 ring-1 ring-slate-600 rounded bg-gray-700 shadow-2xl shadow-slate-950">
                <div class="bg-orange-400 h-5 w-full"></div>
                <h2 class="text-2xl md:text-3xl my-5 font-bold">Submit a High Priority DR</h2>
                <h3 class="text-2xl font-bold mt-5 mb-3">Timeline</h3>
                <p>Based on prioritization and number of other high issues being reported. If a high issue is submitted, the PO will respond to the submitter to let them know the issue has been received, evaluate it within one (1) business day, and work with development managers to have the issue prioritized in a current sprint.</p>
                <div class="p-5 bg-gray-500 mt-5">
                  <h3 class="text-2xl font-bold mb-5">Suggested Client Messaging</h3>
                  <p><strong class="font-bold">If a workaround exists:</strong></p>
                  <p>As we continue to look into the issue, here is a workaround that you can use to get the same information that you need.</p>
                  <br>
                  <p><strong class="font-bold">If no workaround exists:</strong></p>
                  <p>Thank you for reporting this issue. We are investigating the problem further and will get back to you with a status update when we have more information.</p>
                </div>     
              </div>              
              <CustomForm />
            </div>

          </div>
        </Transition>

        <!-- Page 9 - SUBMIT NORMAL DR -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[8].showPage">

            <div class="flex items-start justify-between flex-wrap md:flex-nowrap">
              <div class="w-full mb-5 md:w-1/2 text-base p-4 ring-1 ring-slate-600 rounded bg-gray-700 shadow-2xl shadow-slate-950">
                <div class="bg-yellow-400 h-5 w-full"></div>
                <h2 class="text-2xl md:text-3xl my-5 font-bold">Submit a Normal Priority DR</h2>
                <h3 class="text-2xl font-bold mt-5 mb-3">Timeline</h3>
                <p>Priority is evaluated on a 2 week basis by the PO and pulled into a sprint when resources are available by a development manager.</p>
                <div class="p-5 bg-gray-500 mt-5">
                  <h3 class="text-2xl font-bold mb-5">Suggested Client Messaging</h3>
                  <p><strong class="font-bold">If a workaround exists:</strong></p>
                  <p>Thank you for bringing this to our attention. Here is a workaround that you can use to get the same or similar outcome.</p>
                  <br>
                  <p><strong class="font-bold">If no workaround exists:</strong></p>
                  <p>Thank you for reporting this issue. We have added it to our issue queue and will consider it for future development.</p>
                </div>
              </div>
              <CustomForm />
            </div>           

          </div>
        </Transition>

        <!-- Page 10 - SUBMIT LOW DR -->
        <Transition name="slide-fade">
          <div v-show="this.wizard[9].showPage">

            <div class="flex items-start justify-between flex-wrap md:flex-nowrap">
              <div class="w-full mb-5 md:w-1/2 text-base p-4 ring-1 ring-slate-600 rounded bg-gray-700 shadow-2xl shadow-slate-950">
                <div class="bg-green-400 h-5 w-full"></div>
                <h2 class="text-2xl md:text-3xl my-5 font-bold">Submit a Low Priority DR</h2>
                <h3 class="text-2xl font-bold mt-5 mb-3">Timeline</h3>
                <p>Priority is evaluated on a 2 week basis by the PO and pulled into a sprint when resources are available by a development manager.</p>
                <div class="p-5 bg-gray-500 mt-5">
                  <h3 class="text-2xl font-bold mb-5">Suggested Client Messaging</h3>                
                  <p>Thank you for reporting this issue. We have added it to our issue queue and will consider it for future development.</p>                
                </div>             
              </div>
              <CustomForm />
            </div>

          </div>
        </Transition>

      </div>

    </div>

  </div>  
  
</template>

<style scoped>

  ol { list-style: numerals; margin-left: 30px; }
  ol li { margin-top: 15px; }
  ol li label { margin-right: 20px; }

  ul { list-style: disc; margin: 20px 0 20px 30px; }
  
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
  }

  .btn {
    border-radius: 50px;
    padding: 4px 16px;    
    margin: 10px 15px 0 0;
    color: #fff;
    font-size: 1rem;
  }

  hr { margin: 8px 0 12px 0; }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-enter-from {
    transform: translateX(-20px);
    opacity: 0;
  }

</style>