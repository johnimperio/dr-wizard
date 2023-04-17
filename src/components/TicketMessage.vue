<script>
  export default {

    props: ['cardColor']
      
  }
</script>

<template>
    
    <div class="w-full mb-5 md:w-1/2 text-base">      
      <div class="flex mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />                  
        </svg>
        <h3 class="text-lg md:text-xl font-semibold leading-none ml-2">Timeline</h3>
      </div>                
      <slot name="ticketTimeline"></slot>      
      <div class="p-5 mt-5 rounded-lg text-gray-700" :class="this.cardColor">
        <div class="flex mb-4">          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
          <h3 class="text-lg md:text-xl font-normal leading-none ml-2">Suggested Client Messaging</h3>
        </div>
        <slot name="suggestedMessage"></slot>        
      </div>
    </div>

</template>