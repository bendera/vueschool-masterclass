import Vue from 'vue';
import Vuex from 'vuex';
import { countObjectProperties } from '@/utils';

Vue.use(Vuex);

const makeAppendChildToParentMutation = ({ parent, child }) =>
  (state, { childId, parentId }) => {
    const resource = state[parent][parentId];

    if (!resource[child]) {
      Vue.set(resource, child, {});
    }

    Vue.set(resource[child], childId, childId);
  };

export default new Vuex.Store({
  state: {
    categories: {},
    forums: {},
    threads: {},
    posts: {},
    users: {},
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  getters: {
    // eslint-disable-next-line no-unused-vars
    authUser(state) {
      // return state.users[state.authId];
      return {};
    },
    userThreadsCount: state => id => countObjectProperties(state.users[id].threads),
    userPostsCount: state => id => countObjectProperties(state.users[id].posts),
    threadRepliesCount: state => id => countObjectProperties(state.threads[id].posts) - 1,
  },
  actions: {
    createPost({ commit, state }, post) {
      const postId = `post_${Math.random()}`;
      // eslint-disable-next-line no-param-reassign
      post['.key'] = postId;
      // eslint-disable-next-line no-param-reassign
      post.userId = state.authId;
      // eslint-disable-next-line no-param-reassign
      post.publishedAt = Math.floor(Date.now() / 1000);

      commit('setPost', { post, postId });
      commit('appendPostToThread', { parentId: post.threadId, childId: postId });
      commit('appendPostToUser', { parentId: post.userId, childId: postId });

      return Promise.resolve(state.posts[postId]);
    },
    updateUser({ commit }, user) {
      commit('setUser', { userId: user['.key'], user });
    },
    createThread({ state, commit, dispatch }, { text, title, forumId }) {
      return new Promise((resolve) => {
        const threadId = `thread_${Math.random()}`;
        const userId = state.authId;
        const publishedAt = Math.floor(Date.now() / 1000);

        const thread = {
          forumId,
          title,
          publishedAt,
          userId,
          '.key': threadId,
        };

        commit('setThread', { threadId, thread });
        commit('appendThreadToForum', { parentId: forumId, childId: threadId });
        commit('appendThreadToUser', { parentId: userId, childId: threadId });

        dispatch('createPost', { text, threadId })
          .then((post) => {
            commit('setThread', { threadId, thread: { ...thread, firstPostId: post['.key'] } });
          });

        resolve(state.threads[threadId]);
      });
    },
    updateThread({ state, commit, dispatch }, { title, text, id }) {
      return new Promise((resolve) => {
        const thread = state.threads[id];
        const newThread = { ...thread, title };

        commit('setThread', { thread: newThread, threadId: id });

        dispatch('updatePost', { id: thread.firstPostId, text })
          .then(() => {
            resolve(newThread);
          });

        resolve(newThread);
      });
    },
    updatePost({ state, commit }, { id, text }) {
      return new Promise((resolve) => {
        const post = state.posts[id];

        commit('setPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId,
            },
          },
        });
        resolve(post);
      });
    },
  },
  mutations: {
    setPost(state, { post, postId }) {
      Vue.set(state.posts, postId, post);
    },
    setUser(state, { user, userId }) {
      Vue.set(state.users, userId, user);
    },
    setThread(state, { thread, threadId }) {
      Vue.set(state.threads, threadId, thread);
    },
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
    appendPostToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'posts' }),
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),
  },
});
