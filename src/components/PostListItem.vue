<template>
<div class="post">
  <div class="user-info">
    <a href="profile.html#profile-details" class="user-name">{{ user.name }}</a>
    <a href="profile.html#profile-details">
      <img class="avatar-large" :src="user.avatar" alt="">
    </a>
    <p class="desktop-only text-small">107 posts</p>
  </div>
  <div class="post-content">
    <div>
      {{ post.text }}
    </div>
  </div>
  <AppDate :timestamp="post.publishedAt" class="post-date text-faded" />
</div>
</template>

<script>
import sourceData from '@/data.json';
import AppDate from './AppDate';

export default {
  components: {
    AppDate,
  },
  props: {
    post: {
      required: true,
      type: Object,
    },
  },
  computed: {
    user() {
      return sourceData.users[this.post.userId];
    },
    userPostsCount() {
      return Object.keys(this.user.postIds).length;
    },
  },
};
</script>
