<template>
  <div 
    v-show="isShowed" 
    class="dialog-back">
    <div class="dialog-card">
      <form @submit="submitForm">
        <header> <slot name="title"></slot> </header>
        <main> <slot name="content"></slot> </main>
        <footer> <slot name="footer"></slot> </footer>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    props : ['show'],
    computed : {
      isShowed : function(){
        return this.show;
      }
    },
    methods:{
      submitForm(e){
        e.preventDefault();
        this.$emit('handler');
      },
    }
  }
</script>
<style scoped>
    .dialog-back{
      @apply bg-black/[.50] fixed inset-0 w-full h-full flex items-center justify-center;
    } 
    .dialog-back .dialog-card{
      @apply bg-default-whiteTwo rounded-2xl w-full max-w-[27rem] shadow-dialog;
    }

    .dialog-back .dialog-card header { @apply flex items-center p-4 border-b border-default-blueGrey2 text-base text-default-dark; }

    .dialog-back .dialog-card footer { @apply flex items-center p-6 border-t border-default-blueGrey2; }
</style>