;(function (i, u) {
	const k = "https://insight.ndilab.cn/",
		S = "[track-site-search]",
		V = ["submit", "click", "keydown", "search"],
		A = {
			DataProduct: "data-product",
			DataResource: "data-resource",
			DataServiceNode: "data-serviceNode",
			DataOthers: "data-others",
		},
		F = new Set(Object.values(A)),
		y = [
			"[search-keyword]",
			"input[type='search']",
			"input[name='keyword']",
			"input[name='q']",
			"input[name='search']",
			"input[name='query']",
			"textarea[name='keyword']",
			"textarea[name='q']",
		].join(","),
		z = [
			"input:not([type])",
			"input[type='text']",
			"input[type='search']",
			"textarea",
			"[contenteditable='true']",
			"[role='searchbox']",
		].join(","),
		Y = "[search-submit]",
		o = new WeakMap(),
		_ = new WeakMap(),
		T = new Map(),
		I = new Set()
	let m = !1,
		L = !1,
		D = ""
	function $(e) {
		if (I.has(e)) return
		I.add(e)
		const t = u.createElement("script")
		;((t.async = !0), (t.src = e), u.head.appendChild(t))
	}
	function E() {
		return ((i._paq = i._paq || []), i._paq)
	}
	function C(e = {}) {
		if (!m) return (console.warn("[WebAnalyticsInit] please call init first"), !1)
		const t = e.url || i.location.href,
			r = e.title || u.title,
			n = E()
		return (n.push(["setCustomUrl", t]), n.push(["setDocumentTitle", r]), n.push(["trackPageView"]), (D = t), !0)
	}
	function Q() {
		if (L) return
		L = !0
		const e = () => {
				const n = i.location.href
				n !== D && C({ url: n })
			},
			{ pushState: t, replaceState: r } = history
		;((history.pushState = function (...a) {
			;(t.apply(history, a), e())
		}),
			(history.replaceState = function (...a) {
				;(r.apply(history, a), e())
			}),
			i.addEventListener("popstate", e),
			i.addEventListener("hashchange", e))
	}
	function w(e) {
		const t = e == null ? void 0 : e.siteId
		if (!t) return (console.warn("[WebAnalyticsInit] siteId is required"), !1)
		const r = E()
		return (
			m
				? r.push(["setSiteId", String(t)])
				: (r.push(["setTrackerUrl", `${k}matomo.php`]),
					r.push(["setSiteId", String(t)]),
					$(`${k}matomo.js`),
					(m = !0),
					Q()),
			C(),
			!0
		)
	}
	function X() {
		const e = u.currentScript
		return (
			(e == null ? void 0 : e.getAttribute("data-site-id")) ||
			(e == null ? void 0 : e.getAttribute("data-siteId")) ||
			i.WEB_ANALYTICS_SITE_ID ||
			""
		)
	}
	function G() {
		const e = X()
		e && w({ siteId: String(e) })
	}
	function p(e) {
		return !!e && F.has(e)
	}
	function h(e) {
		if (e == null || e === "") return
		const t = Number(e)
		return Number.isFinite(t) ? t : void 0
	}
	function R(e, t) {
		return String(e || "")
			.trim()
			.replace(/\s+/g, " ")
			.slice(0, t)
	}
	function f(e, t) {
		var r
		return e === t || !!((r = e.contains) != null && r.call(e, t))
	}
	function q(e, t) {
		console.warn("[WebAnalytics]", e, t || "")
	}
	function x(e, t) {
		return (q(e, t), { ok: !1, reason: e, detail: t })
	}
	function g(e) {
		var t
		return (
			e.getAttribute("data-search-cat") ||
			e.getAttribute("search-cat") ||
			((t = e.dataset) == null ? void 0 : t.searchCat) ||
			""
		)
	}
	function J(e) {
		var t, r
		return {
			searchCat: g(e),
			minLength: (t = h(e.getAttribute("search-min-length"))) != null ? t : 1,
			maxLength: (r = h(e.getAttribute("search-max-length"))) != null ? r : 100,
			searchCount: h(e.getAttribute("search-result-count")),
			autoTrack: e.getAttribute("search-auto-track") !== "false",
		}
	}
	function Z(e) {
		var a, l, s
		const t = e.getAttribute("search-input")
		if (t) return u.querySelector(t)
		if ((a = e.matches) != null && a.call(e, y)) return e
		const r = (l = e.querySelector) == null ? void 0 : l.call(e, y)
		if (r) return r
		const n = Array.from(((s = e.querySelectorAll) == null ? void 0 : s.call(e, z)) || []).filter(
			(c) => !c.disabled && c.type !== "hidden",
		)
		return n.length === 1 ? n[0] : null
	}
	function ee(e, t) {
		const r = Z(e),
			n = r && "value" in r ? r.value : r == null ? void 0 : r.textContent
		return R(n, t)
	}
	function te(e, t) {
		var r
		return !!((r = e == null ? void 0 : e.matches) != null && r.call(e, y) && f(t, e))
	}
	function ne(e, t) {
		var r, n
		return e.key !== "Enter" || e.isComposing || !f(t, e.target)
			? !1
			: !!(
					(n = (r = e.target) == null ? void 0 : r.matches) != null &&
					n.call(r, "input, textarea, [contenteditable='true'], [role='searchbox']")
				)
	}
	function re(e, t) {
		var l, s, c, b, d, B, j, H, P, v, K
		if (!f(t, e.target)) return !1
		const r = (s = (l = e.target).closest) == null ? void 0 : s.call(l, Y)
		if (r && f(t, r)) return !0
		const n =
			(b = (c = e.target).closest) == null
				? void 0
				: b.call(c, "button, input[type='button'], input[type='submit'], [role='button']")
		if (!n || !f(t, n) || ((d = n.matches) != null && d.call(n, "button[type='reset'], input[type='reset']"))) return !1
		if ((B = n.matches) != null && B.call(n, "button[type='submit'], input[type='submit']")) return !0
		const a = [
			(j = n.getAttribute) == null ? void 0 : j.call(n, "aria-label"),
			(H = n.getAttribute) == null ? void 0 : H.call(n, "title"),
			(P = n.getAttribute) == null ? void 0 : P.call(n, "class"),
			(K = (v = e.target).getAttribute) == null ? void 0 : K.call(v, "class"),
			n.textContent,
		]
			.filter(Boolean)
			.join(" ")
			.toLowerCase()
		return /search|query|submit|鎼滅储|鏌ヨ|鏌ユ壘/.test(a)
	}
	function ae(e, t) {
		return t.type === "submit"
			? !0
			: t.type === "search"
				? te(t.target, e)
				: t.type === "keydown"
					? ne(t, e)
					: t.type === "click"
						? re(t, e)
						: !1
	}
	function ie(e, t) {
		const r = Date.now(),
			n = [t.searchCat, t.keyword].join(`
`),
			a = _.get(e)
		return (a == null ? void 0 : a.key) === n && r - a.time < 350 ? !0 : (_.set(e, { key: n, time: r }), !1)
	}
	function se(e) {
		const t = Date.now(),
			r = [e.searchCat, e.keyword].join(`
`),
			n = T.get(r)
		return n && t - n < 350 ? !0 : (T.set(r, t), !1)
	}
	function ce(e, t, r) {
		const n = E()
		if (r !== void 0) {
			n.push(["trackSiteSearch", e, t, r])
			return
		}
		n.push(["trackSiteSearch", e, t])
	}
	function M(e = {}) {
		var l, s
		const t = e.searchCat || e.category || ""
		if (!p(t)) return x("invalid_search_cat", { searchCat: t })
		const r = (l = h(e.minLength)) != null ? l : 1,
			n = R(e.keyword, (s = e.maxLength) != null ? s : 100)
		if (n.length < r) return x("keyword_missing")
		const a = { keyword: n, searchCat: t, searchCount: h(e.searchCount) }
		return se(a) ? { ok: !1, reason: "duplicate", detail: a } : (ce(n, t, a.searchCount), { ok: !0, detail: a })
	}
	function O(e) {
		if (!e || o.has(e)) return
		const t = g(e)
		if (!p(t)) {
			q("invalid_search_cat_skip_bind", { searchCat: t, element: e })
			return
		}
		const r = (n) => {
			if (!ae(e, n)) return
			const a = J(e),
				l = p(a.searchCat) ? a.searchCat : t,
				s = ee(e, a.maxLength)
			if (s.length < a.minLength) return
			const c = { keyword: s, searchCat: l, searchCount: a.searchCount, originalEvent: n }
			if (ie(e, c)) return
			const b = new CustomEvent("web-analytics:site-search", { detail: c, bubbles: !0, cancelable: !0 }),
				d = e.dispatchEvent(b)
			;(!d && n.cancelable && n.preventDefault(),
				d && a.autoTrack && M({ keyword: c.keyword, searchCat: c.searchCat, searchCount: c.searchCount }))
		}
		;(V.forEach((n) => {
			e.addEventListener(n, r, !0)
		}),
			o.set(e, r))
	}
	function W(e) {
		if ((O(e), o.has(e))) return
		const t = g(e)
		p(t) ||
			i.requestAnimationFrame(() => {
				O(e)
			})
	}
	function N(e = u) {
		var r
		const t = Array.from(e.querySelectorAll(S))
		;((r = e.matches) != null && r.call(e, S) && t.unshift(e), t.forEach(W))
	}
	function ue() {
		if (!i.MutationObserver || !u.documentElement) return
		new MutationObserver((t) => {
			t.forEach((r) => {
				var n
				if (r.type === "attributes") {
					const { target: a } = r
					a.nodeType === 1 && (n = a.matches) != null && n.call(a, S) && !o.has(a) && W(a)
					return
				}
				r.addedNodes.forEach((a) => {
					a.nodeType === 1 && N(a)
				})
			})
		}).observe(u.documentElement, {
			childList: !0,
			subtree: !0,
			attributes: !0,
			attributeFilter: ["track-site-search", "search-cat", "data-search-cat"],
		})
	}
	function U() {
		;(N(), ue())
	}
	;((i.WebAnalyticsInit = { init: w, pageView: C }),
		(i.WebAnalytics = { SearchCat: A, trackSiteSearch: M }),
		G(),
		u.readyState === "loading" ? u.addEventListener("DOMContentLoaded", U, { once: !0 }) : U())
})(window, document)
