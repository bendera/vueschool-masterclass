<template>
<div class="flex-grid">
  <UserProfileCard
    v-if="!edit"
    v-bind="{ user }"
  />
  <UserProfileCardEditor
    v-else
    v-bind="{ user }"
  />
  <div class="col-7 push-top">

    <div class="profile-header">
        <span class="text-lead">
            {{ user.username }}'s recent activity
        </span>
        <a href="#">See only started threads?</a>
    </div>

    <hr>

    <PostList :posts="userPosts" />
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import PostList from '@/components/PostList';
import UserProfileCard from '@/components/UserProfileCard';
import UserProfileCardEditor from '@/components/UserProfileCardEditor';

export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      user: 'authUser',
    }),
    userPosts() {
      if (this.user.posts) {
        return Object.values(this.$store.state.posts)
          .filter(post => post.userId === this.user['.key']);
      }

      return [];
    },
  },
};
</script>

