核心埋点接口与参数文档
该脚本在全局暴露了 window.WebAnalytics 对象，主要提供以下手动埋点能力：
. 手动触发站内搜索埋点
调用方法：window.WebAnalytics.trackSiteSearch(config)
参数说明 (config 对象)：
keyword (String, 必填)：搜索的关键词。
category 或 searchCat (String, 必填)：搜索分类。注意：必须是以下四个预定义值之一，否则会被拦截：
data-product
data-resource
data-serviceNode
data-others
minLength (Number, 可选)：关键词最小长度限制，默认为 1。
maxLength (Number, 可选)：关键词最大长度限制，默认为 100。
searchCount (Number, 可选)：搜索结果的数量。
. 手动触发页面浏览埋点
调用方法：window.WebAnalyticsInit.pageView(config)
参数说明 (config 对象)：
url (String, 可选)：当前页面URL，默认为 window.location.href。
title (String, 可选)：页面标题，默认为 document.title。
自动埋点（声明式）属性文档
对于搜索框等元素，无需编写 JavaScript，直接在 HTML 标签上添加以下属性即可自动触发埋点：
track-site-search：标记该元素（或其父容器）为搜索追踪目标。
data-search-cat 或 search-cat：指定搜索分类（同上，必须是四个预定义值之一）。
search-min-length：最小长度限制。
search-max-length：最大长度限制。
search-result-count：搜索结果数量。
search-auto-track：设置为 "false" 可关闭自动追踪，仅触发 web-analytics:site-search 自定义事件。
search-input：CSS 选择器，用于指定该容器内的具体输入框元素。