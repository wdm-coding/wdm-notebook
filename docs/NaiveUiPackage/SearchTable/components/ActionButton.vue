<script setup name='ActionButton'>
	function isHidden (hidden, index) {
		if (typeof hidden === 'function') {
			return hidden(index)
		} else {
			return false
		}
	}

	function isDisabled (disabled, index) {
		if (typeof disabled === 'function') {
			return disabled(index)
		} else {
			return false
		}
	}
</script>

<template>
  <n-space>
    <template
      v-for="(item,index) in $attrs.actions"
      :key="index"
    >
      <n-popconfirm
        v-if="item.hasConfim && !isHidden(item.hidden,$attrs.row,$attrs.rowIndex)"
        v-bind="item.confirmAttrs || {}"
        @positive-click="item.positiveClick($attrs.row,$attrs.rowIndex)"
        @negative-click="item.negativeClick ? item.negativeClick($attrs.row,$attrs.rowIndex) : ()=>{}"
      >
        <template #trigger>
          <n-tooltip v-if="item.tooltip" trigger="hover">
            <template #trigger>
              <n-button
                :type="item.type"
                size="small"
                :disabled="isDisabled(item.disabled, $attrs.row)"
                v-bind="item.btnAttr"
              >
                <template v-if="item.icon" #icon>
                  <Icon :name="item.icon" />
                </template>
                {{ item.name  }}
              </n-button>
            </template>
            {{ item.tooltip }}
          </n-tooltip>
          <n-button
            v-else
            :type="item.type"
            size="small"
            :disabled="isDisabled(item.disabled, $attrs.row)"
            v-bind="item.btnAttr"
          >
            <template v-if="item.icon" #icon>
              <Icon :name="item.icon" />
            </template>
            {{ item.name  }}
          </n-button>
        </template>

        {{ item.tips  || item.tipsData($attrs.row,$attrs.rowIndex) || '是否确认删除' }}
      </n-popconfirm>
      <div v-if="!item.hasConfim && !isHidden(item.hidden,$attrs.row,$attrs.rowIndex)">
        <n-tooltip v-if="item.tooltip" trigger="hover">
          <template #trigger>
            <n-button
              :type="item.type"
              size="small"
              v-bind="item.btnAttr"
              :disabled="isDisabled(item.disabled, $attrs.row)"
              @click="item.onClick($attrs.row,$attrs.rowIndex)"
            >
              <template v-if="item.icon" #icon>
                <Icon :name="item.icon" />
              </template>
              {{ item.name  }}
            </n-button>
          </template>
          {{ item.tooltip }}
        </n-tooltip>
        <n-button
          v-else
          :type="item.type"
          size="small"
          v-bind="item.btnAttr"
          :disabled="isDisabled(item.disabled, $attrs.row)"
          @click="item.onClick($attrs.row,$attrs.rowIndex)"
        >
          <template v-if="item.icon" #icon>
            <Icon :name="item.icon" />
          </template>
          {{ item.name  }}
        </n-button>
      </div>
    </template>
  </n-space>
</template>

<style lang='scss' scoped>

</style>
