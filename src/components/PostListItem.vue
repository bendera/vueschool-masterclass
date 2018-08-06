<template>
<div class="post">
  <div class="user-info">
    <a href="profile.html#profile-details" class="user-name">{{ user.name }}</a>
    <a href="profile.html#profile-details">
      <img class="avatar-large" :src="user.avatar" alt="">
    </a>
    <p class="desktop-only text-small">{{ userPostsCount }} posts</p>
  </div>
  <div class="post-content">
    <template v-if="!editing">
      {{ post.text }}
    </template>
    <template v-else>
      <PostEditor
        :post="post"
        @save="editing = false"
      />
    </template>
  </div>
  <AppDate :timestamp="post.publishedAt" class="post-date text-faded" />
</div>
</template>

<script>
import { countObjectProperties } from '@/utils';
import PostEditor from './PostEditor';

export default {
  components: {
    PostEditor,
  },
  data() {
    return {
      editing: false,
    };
  },
  props: {
    post: {
      required: true,
      type: Object,
    },
  },
  computed: {
    user() {
      return this.$store.state.users[this.post.userId];
    },
    userPostsCount() {
      return countObjectProperties(this.user.posts);
    },
  },
};
</script>
