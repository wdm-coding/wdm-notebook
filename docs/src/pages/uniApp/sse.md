# uni-app SSE插件

```js
<template>
	<gao-ChatSSEClient ref="chatSSEClientRef" @onOpen="openSse" @onError="errorSse" @onMessage="eventSse" @onFinish="finishSse" />
</template>

<script>
	import {
		getItem
	} from '@/utils/auth.js'
	export default {
		name: 'SSE',
		data() {
			return {
				timer: null,
				connectCount: 0
			};
		},
		computed: {
			showDot() {
				return this.$store.state.sse.showDot
			}
		},
		watch: {
			showDot: {
				handler(val) {
					if (val) {
						uni.showTabBarRedDot({
							index: 3
						})
					} else {
						uni.hideTabBarRedDot({
							index: 3
						})
					}
				},
				immediate: true
			}
		},
		mounted() {
			this.$store.commit('sse/SET_USER_TYPE', this.$attrs.userType)
			this.connectSse()
		},
		beforeDestroy() {
			clearTimeout(this.timer)
		},
		methods: {
			// 连接sse
			connectSse() {
				const params = {
					userId: getItem('sseUserId'),
					userType: this.$attrs.userType
				}
				this.$store.commit('sse/SET_LOADING', true)
				const url = `${uni.$baseUrl}/dc/api/message/subscribe?userId=${params.userId}&userType=${params.userType}`
				this.$refs.chatSSEClientRef.startChat({
					url: url,
					method: 'get',
				})
			},
			// 断开连接
			stop() {
				this.$refs.chatSSEClientRef.stopChat()
			},
			// 连接成功
			openSse() {
				console.log("连接成功");
			},
			// 监听事件
			eventSse({
				event,
				data
			}) {
				if (event === 'message') {
					this.$store.commit('sse/SET_LOADING', false)
					this.$store.dispatch('sse/initList', data)
				}
			},
			// 连接终止后
			finishSse() {},
			// 连接失败
			errorSse() {
				this.$store.commit('sse/SET_LOADING', false)
				clearTimeout(this.timer)
				if (this.connectCount < 6) {
					this.timer = setTimeout(() => {
						this.connectSse()
					}, 1500)
				} else {
					console.log('重连次数受限');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sse_wrap {}
</style>
```