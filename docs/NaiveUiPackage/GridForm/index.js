import { onMounted, onBeforeUnmount, watchEffect } from 'vue'
export function useBreakPoint () {
	const point = ref(0)
	const computedSize = () => {
		const width = window.innerWidth
		switch (!!width) {
			case width < 768:
				point.value = 1
				break
			case width >= 768 && width < 992:
				point.value = 1
				break
			case width >= 992 && width < 1200:
				point.value = 2
				break
			case width >= 1200 && width < 1920:
				point.value = 3
				break
			case width >= 1920 && width < 2560:
				point.value = 4
				break
			case width >= 2560:
				point.value = 5
				break
		}
	}
	onMounted(() => {
		computedSize()
		window.addEventListener('resize', () => {
			computedSize()
		})
	})
	onBeforeUnmount(() => {
		window.removeEventListener('resize', () => {
			computedSize()
		})
	})
	watchEffect(() => {
		computedSize()
	})
	return point
}
export const baseConfig = {
	formConfig: {
		'label-width': 'auto',
		'label-align': 'left',
		'label-placement': 'left',
		'show-require-mark': false,
		'require-mark-placement': 'left',
		size: 'small'
	},
	gridConfig: {
		cols: 1,
		'y-gap': 1,
		responsive: 'screen'
	},
	searchGridConfig: {
		cols: '1 s:5 m:3 l:4 xl:5 2xl:5',
		'x-gap': '1 s:3 m:4 l:5 xl:20 2xl:20',
		responsive: 'screen',
		'collapsed-rows': 1
	},
	itemConfig: {
		clearable: true
	}
}
