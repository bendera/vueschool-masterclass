<template>
  <div class="col-full">
    <h1>Welcome to the forum</h1>
    <ForumList :forums="forums" />
  </div>
</template>

<script>
import sourceData from '@/data.json';
import ForumList from '@/components/ForumList';

export default {
  components: {
    ForumList,
  },
  name: 'HelloWorld',
  data() {
    return {
      forums: Object.values(sourceData.forums),
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
