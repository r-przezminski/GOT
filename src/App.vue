<template>
  <div id="app">
    <app-header></app-header>
    <app-navigation></app-navigation>
    <app-view></app-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header     from '@/components/app/Header';
import Navigation from '@/components/app/Navigation';
import View       from '@/components/app/View'
import Footer     from '@/components/app/Footer';

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'app-navigation': Navigation,
    'app-view': View,
    'app-footer': Footer
  },
}
</script>

<style>

</style>

