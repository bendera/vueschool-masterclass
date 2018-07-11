<template>
  <div>
    <div
      v-for="thread in threads"
      :key="thread.id"
      class="col-large push-top"
    >
      <h1>{{ thread.title }}</h1>
      <div class="post-list">
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div v-for="postId in thread.posts" class="post">
          <div class="user-info">
            <a href="profile.html#profile-details" class="user-name">{{ users[posts[postId].userId].name }}</a>
            <a href="profile.html#profile-details">
              <img class="avatar-large" :src="users[posts[postId].userId].avatar" alt="">
            </a>
            <p class="desktop-only text-small">107 posts</p>
          </div>
          <div class="post-content">
            <div>
              {{ posts[postId].text }}
            </div>
          </div>
          <div class="post-date text-faded">
            {{ posts[postId].publishedAt }}
          </div>
        </div>
      </div>
    </div>
    <!-- <h1>Welcome to the Forum</h1>
    <div v-for="thread in threads" :key="thread.id">
      <h2>{{ thread.title }}</h2>
      <div v-for="postId in thread.posts" :key="postId">
        <p>{{ users[posts[postId].userId].name }}</p>
        <p>{{ posts[postId].text }}</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import sourceData from '@/data.json';

export default {
  name: 'HelloWorld',
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
