<template>
<div v-if="post && user" class="post">
  <div class="user-info">
    <a href="profile.html#profile-details" class="user-name">{{ user.name }}</a>
    <a href="profile.html#profile-details">
      <img class="avatar-large" :src="user.avatar" alt="">
    </a>
    <p class="desktop-only text-small">{{ userThreadsCount }} threads</p>
    <p class="desktop-only text-small">{{ userPostsCount }} posts</p>
  </div>
  <div class="post-content">
    <template v-if="!editing">
      {{ post.text }}
      <a href="#" @click.prevent="editing = true" style="margin-left: auto;" class="link-unstyled" title="Make a change"><i class="fa fa-pencil"></i></a>
    </template>
    <template v-else>
      <PostEditor
        :post="post"
        @save="editing = false"
        @cancel="editing = false"
      />
    </template>
  </div>
  <div class="post-date text-faded">
    <div v-if="post.edited" class="edition-info">edited</div>
    <AppDate :timestamp="post.publishedAt" class="post-date text-faded" />
  </div>
</div>
</template>

<script>
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
      return this.$store.getters.userPostsCount(this.post.userId);
    },
    userThreadsCount() {
      return this.$store.getters.userThreadsCount(this.post.userId);
    },
  },
};
</script>
