(() => {
  // _build/js/release/build/client/client.js
  function Option$Some$0$(param0) {
    this._0 = param0;
  }
  Option$Some$0$.prototype.$tag = 1;
  function $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Static(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Static.prototype.$tag = 0;
  function $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Dynamic(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Dynamic.prototype.$tag = 1;
  function $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Handler(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Handler.prototype.$tag = 2;
  function $64$mizchi$47$markdown$46$ListMarkerKind$Bullet(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$markdown$46$ListMarkerKind$Bullet.prototype.$tag = 0;
  function $64$mizchi$47$markdown$46$ListMarkerKind$Ordered(param0, param1) {
    this._0 = param0;
    this._1 = param1;
  }
  $64$mizchi$47$markdown$46$ListMarkerKind$Ordered.prototype.$tag = 1;
  function $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrString(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrString.prototype.$tag = 0;
  function $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrNumber(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrNumber.prototype.$tag = 1;
  function $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrInt(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrInt.prototype.$tag = 2;
  function $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrBool(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrBool.prototype.$tag = 3;
  var $PanicError = class extends Error {
  };
  function $panic() {
    throw new $PanicError();
  }
  function $bound_check(arr, index) {
    if (index < 0 || index >= arr.length) throw new Error("Index out of bounds");
  }
  var moonbitlang$core$builtin$$random_seed = () => {
    if (globalThis.crypto?.getRandomValues) {
      const array = new Uint32Array(1);
      globalThis.crypto.getRandomValues(array);
      return array[0] | 0;
    } else {
      return Math.floor(Math.random() * 4294967296) | 0;
    }
  };
  function Result$Err$1$(param0) {
    this._0 = param0;
  }
  Result$Err$1$.prototype.$tag = 0;
  function Result$Ok$1$(param0) {
    this._0 = param0;
  }
  Result$Ok$1$.prototype.$tag = 1;
  function $make_array_len_and_init(a, b) {
    const arr = new Array(a);
    arr.fill(b);
    return arr;
  }
  var Option$None$2$ = { $tag: 0 };
  function Option$Some$2$(param0) {
    this._0 = param0;
  }
  Option$Some$2$.prototype.$tag = 1;
  var mizchi$js$core$$null = () => null;
  function Option$Some$3$(param0) {
    this._0 = param0;
  }
  Option$Some$3$.prototype.$tag = 1;
  function $64$mizchi$47$luna$47$luna$47$dom$47$element$46$DomNode$El(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$luna$47$luna$47$dom$47$element$46$DomNode$El.prototype.$tag = 0;
  function $64$mizchi$47$luna$47$luna$47$dom$47$element$46$DomNode$Txt(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$luna$47$luna$47$dom$47$element$46$DomNode$Txt.prototype.$tag = 1;
  function $64$mizchi$47$luna$47$luna$47$dom$47$element$46$DomNode$Raw(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$luna$47$luna$47$dom$47$element$46$DomNode$Raw.prototype.$tag = 2;
  function $64$mizchi$47$luna$47$luna$47$dom$47$element$46$DomNode$Static(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$luna$47$luna$47$dom$47$element$46$DomNode$Static.prototype.$tag = 3;
  function Option$Some$4$(param0) {
    this._0 = param0;
  }
  Option$Some$4$.prototype.$tag = 1;
  function $64$mizchi$47$markdown$46$Inline$Text(param0, param1) {
    this._0 = param0;
    this._1 = param1;
  }
  $64$mizchi$47$markdown$46$Inline$Text.prototype.$tag = 0;
  function $64$mizchi$47$markdown$46$Inline$SoftBreak(param0) {
    this._0 = param0;
  }
  $64$mizchi$47$markdown$46$Inline$SoftBreak.prototype.$tag = 1;
  function $64$mizchi$47$markdown$46$Inline$HardBreak(param0, param1) {
    this._0 = param0;
    this._1 = param1;
  }
  $64$mizchi$47$markdown$46$Inline$HardBreak.prototype.$tag = 2;
  function $64$mizchi$47$markdown$46$Inline$Emphasis(param0, param1, param2) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
  }
  $64$mizchi$47$markdown$46$Inline$Emphasis.prototype.$tag = 3;
  function $64$mizchi$47$markdown$46$Inline$Strong(param0, param1, param2) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
  }
  $64$mizchi$47$markdown$46$Inline$Strong.prototype.$tag = 4;
  function $64$mizchi$47$markdown$46$Inline$Strikethrough(param0, param1) {
    this._0 = param0;
    this._1 = param1;
  }
  $64$mizchi$47$markdown$46$Inline$Strikethrough.prototype.$tag = 5;
  function $64$mizchi$47$markdown$46$Inline$Code(param0, param1, param2) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
  }
  $64$mizchi$47$markdown$46$Inline$Code.prototype.$tag = 6;
  function $64$mizchi$47$markdown$46$Inline$Link(param0, param1, param2, param3) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
  }
  $64$mizchi$47$markdown$46$Inline$Link.prototype.$tag = 7;
  function $64$mizchi$47$markdown$46$Inline$RefLink(param0, param1, param2) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
  }
  $64$mizchi$47$markdown$46$Inline$RefLink.prototype.$tag = 8;
  function $64$mizchi$47$markdown$46$Inline$Autolink(param0, param1, param2) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
  }
  $64$mizchi$47$markdown$46$Inline$Autolink.prototype.$tag = 9;
  function $64$mizchi$47$markdown$46$Inline$Image(param0, param1, param2, param3) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
  }
  $64$mizchi$47$markdown$46$Inline$Image.prototype.$tag = 10;
  function $64$mizchi$47$markdown$46$Inline$RefImage(param0, param1, param2) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
  }
  $64$mizchi$47$markdown$46$Inline$RefImage.prototype.$tag = 11;
  function $64$mizchi$47$markdown$46$Inline$HtmlInline(param0, param1) {
    this._0 = param0;
    this._1 = param1;
  }
  $64$mizchi$47$markdown$46$Inline$HtmlInline.prototype.$tag = 12;
  function $64$mizchi$47$markdown$46$Inline$FootnoteReference(param0, param1) {
    this._0 = param0;
    this._1 = param1;
  }
  $64$mizchi$47$markdown$46$Inline$FootnoteReference.prototype.$tag = 13;
  function $64$mizchi$47$markdown$46$Block$ThematicBreak(param0, param1, param2, param3, param4) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
    this._4 = param4;
  }
  $64$mizchi$47$markdown$46$Block$ThematicBreak.prototype.$tag = 0;
  function $64$mizchi$47$markdown$46$Block$Heading(param0, param1, param2, param3, param4, param5, param6) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
    this._4 = param4;
    this._5 = param5;
    this._6 = param6;
  }
  $64$mizchi$47$markdown$46$Block$Heading.prototype.$tag = 1;
  function $64$mizchi$47$markdown$46$Block$Paragraph(param0, param1, param2, param3) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
  }
  $64$mizchi$47$markdown$46$Block$Paragraph.prototype.$tag = 2;
  function $64$mizchi$47$markdown$46$Block$FencedCode(param0, param1, param2, param3, param4, param5, param6, param7) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
    this._4 = param4;
    this._5 = param5;
    this._6 = param6;
    this._7 = param7;
  }
  $64$mizchi$47$markdown$46$Block$FencedCode.prototype.$tag = 3;
  function $64$mizchi$47$markdown$46$Block$IndentedCode(param0, param1, param2, param3) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
  }
  $64$mizchi$47$markdown$46$Block$IndentedCode.prototype.$tag = 4;
  function $64$mizchi$47$markdown$46$Block$Blockquote(param0, param1, param2, param3) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
  }
  $64$mizchi$47$markdown$46$Block$Blockquote.prototype.$tag = 5;
  function $64$mizchi$47$markdown$46$Block$BulletList(param0, param1, param2, param3, param4, param5) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
    this._4 = param4;
    this._5 = param5;
  }
  $64$mizchi$47$markdown$46$Block$BulletList.prototype.$tag = 6;
  function $64$mizchi$47$markdown$46$Block$OrderedList(param0, param1, param2, param3, param4, param5, param6) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
    this._4 = param4;
    this._5 = param5;
    this._6 = param6;
  }
  $64$mizchi$47$markdown$46$Block$OrderedList.prototype.$tag = 7;
  function $64$mizchi$47$markdown$46$Block$HtmlBlock(param0, param1, param2, param3) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
  }
  $64$mizchi$47$markdown$46$Block$HtmlBlock.prototype.$tag = 8;
  function $64$mizchi$47$markdown$46$Block$Table(param0, param1, param2, param3, param4, param5) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
    this._4 = param4;
    this._5 = param5;
  }
  $64$mizchi$47$markdown$46$Block$Table.prototype.$tag = 9;
  function $64$mizchi$47$markdown$46$Block$BlankLines(param0, param1) {
    this._0 = param0;
    this._1 = param1;
  }
  $64$mizchi$47$markdown$46$Block$BlankLines.prototype.$tag = 10;
  function $64$mizchi$47$markdown$46$Block$FootnoteDefinition(param0, param1, param2, param3, param4) {
    this._0 = param0;
    this._1 = param1;
    this._2 = param2;
    this._3 = param3;
    this._4 = param4;
  }
  $64$mizchi$47$markdown$46$Block$FootnoteDefinition.prototype.$tag = 11;
  function Option$Some$5$(param0) {
    this._0 = param0;
  }
  Option$Some$5$.prototype.$tag = 1;
  function Option$Some$6$(param0) {
    this._0 = param0;
  }
  Option$Some$6$.prototype.$tag = 1;
  function Option$Some$7$(param0) {
    this._0 = param0;
  }
  Option$Some$7$.prototype.$tag = 1;
  var kazuph$blog_admin$client$$query_selector_all = (s) => document.querySelectorAll(s);
  var kazuph$blog_admin$client$$get_element_by_id = (id) => document.getElementById(id);
  var kazuph$blog_admin$client$$get_attribute = (el, name) => el.getAttribute(name) ?? "";
  var kazuph$blog_admin$client$$get_tag_name = (el) => el.tagName.toLowerCase();
  var kazuph$blog_admin$client$$get_text_content = (el) => el.textContent ?? "";
  var kazuph$blog_admin$client$$is_null_element = (el) => el == null || el === void 0;
  var kazuph$blog_admin$client$$get_length = (arr) => arr.length;
  var kazuph$blog_admin$client$$get_item = (arr, idx) => arr[idx];
  var kazuph$blog_admin$client$$is_document_loading = () => document.readyState === "loading";
  var kazuph$blog_admin$client$$add_dom_ready_listener = (cb) => document.addEventListener("DOMContentLoaded", cb, { once: true });
  var kazuph$blog_admin$client$$request_idle_callback = (cb) => requestIdleCallback(cb);
  var kazuph$blog_admin$client$$create_visibility_observer = (el, cb) => {
    new IntersectionObserver((entries, obs) => {
      if (entries.some((e) => e.isIntersecting)) {
        obs.disconnect();
        cb();
      }
    }, { rootMargin: "50px" }).observe(el);
  };
  var kazuph$blog_admin$client$$create_media_listener = (query, cb) => {
    const mq = matchMedia(query);
    const handler = () => {
      if (mq.matches) {
        mq.removeEventListener("change", handler);
        cb();
      }
    };
    mq.matches ? cb() : mq.addEventListener("change", handler);
  };
  var kazuph$blog_admin$client$$observe_dom_additions = (setupFn) => {
    new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((n) => {
        if (n.nodeType === 1 && n.hasAttribute("luna:url")) setupFn(n);
      }));
    }).observe(document.body ?? document.documentElement, {
      childList: true,
      subtree: true
    });
  };
  var kazuph$blog_admin$client$$dynamic_import_and_hydrate = async (url, exportName, el, state, id) => {
    try {
      const mod = await import(url);
      const fn = exportName ? mod[exportName] : mod.hydrate ?? mod.default;
      if (fn) fn(el, state, id);
    } catch (e) {
      console.warn(`[luna] Failed to load ${url}:`, e);
    }
  };
  var kazuph$blog_admin$client$$set_global = (name, value) => {
    window[name] = value;
  };
  var kazuph$blog_admin$client$$create_scan_wrapper = (fn) => fn;
  var kazuph$blog_admin$client$$create_hydrate_wrapper = (fn) => fn;
  var kazuph$blog_admin$client$$create_unload_wrapper = (fn) => fn;
  var kazuph$blog_admin$client$$create_clear_wrapper = (fn) => fn;
  var kazuph$blog_admin$client$$hashmap_to_js_object = (getFn) => new Proxy({}, { get: (_, key) => getFn(key) });
  var kazuph$blog_admin$client$$parse_json_to_js = (s) => {
    try {
      return JSON.parse(s);
    } catch {
      return null;
    }
  };
  var mizchi$luna$luna$dom$element$$button$46$constr$47$1361 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Static("true");
  var mizchi$luna$luna$dom$element$$input$46$constr$47$1384 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Static("true");
  var mizchi$luna$luna$dom$element$$input$46$constr$47$1386 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Static("true");
  var mizchi$luna$luna$dom$element$$input$46$constr$47$1388 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Static("true");
  var mizchi$luna$luna$dom$element$$input$46$constr$47$1390 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Static("true");
  var mizchi$luna$luna$dom$element$$textarea$46$constr$47$1439 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Static("true");
  var mizchi$markdown$$detect_list_marker$46$constr$47$2164 = new $64$mizchi$47$markdown$46$ListMarkerKind$Bullet(0);
  var mizchi$markdown$$detect_list_marker$46$constr$47$2167 = new $64$mizchi$47$markdown$46$ListMarkerKind$Bullet(1);
  var mizchi$markdown$$detect_list_marker$46$constr$47$2170 = new $64$mizchi$47$markdown$46$ListMarkerKind$Bullet(2);
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2724 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrString("POST");
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2731 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrString("true");
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2733 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrString("\u8A18\u4E8B\u306E\u30BF\u30A4\u30C8\u30EB");
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2740 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrString("true");
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2742 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrString("[a-z0-9\\-]+");
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2744 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrString("my-article-slug");
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2748 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Static("status");
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2750 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Static("status");
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2752 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Static("draft");
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2754 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$AttrValue$Static("published");
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2763 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrString("\u30DE\u30FC\u30AF\u30C0\u30A6\u30F3\u3067\u8A18\u4E8B\u3092\u66F8\u304F...");
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2765 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrString("true");
  var kazuph$blog_admin$client$$markdown_editor$46$constr$47$2769 = new $64$mizchi$47$luna$47$luna$47$dom$47$element$46$Attr$AttrString("submit");
  var kazuph$blog_admin$client$$setup_trigger$46$constr$47$2844 = 5;
  var moonbitlang$core$builtin$$seed = moonbitlang$core$builtin$$random_seed();
  var _bind = [];
  var kazuph$blog_admin$client$$loaded_components = moonbitlang$core$builtin$$Map$from_array$2$({ buf: _bind, start: 0, end: 0 });
  var _bind$2 = [];
  var kazuph$blog_admin$client$$luna_state = moonbitlang$core$builtin$$Map$from_array$3$({ buf: _bind$2, start: 0, end: 0 });
  function moonbitlang$core$builtin$$Hasher$consume4(self, input) {
    const _p = (self.acc >>> 0) + ((Math.imul(input, -1028477379) | 0) >>> 0) | 0;
    const _p$2 = 17;
    self.acc = Math.imul(_p << _p$2 | (_p >>> (32 - _p$2 | 0) | 0), 668265263) | 0;
  }
  function moonbitlang$core$builtin$$Hasher$combine_uint(self, value) {
    self.acc = (self.acc >>> 0) + (4 >>> 0) | 0;
    moonbitlang$core$builtin$$Hasher$consume4(self, value);
  }
  function moonbitlang$core$builtin$$Hasher$combine$5$(self, value) {
    moonbitlang$core$builtin$$Hash$hash_combine$5$(value, self);
  }
  function moonbitlang$core$builtin$$Hasher$avalanche(self) {
    let acc = self.acc;
    acc = acc ^ (acc >>> 15 | 0);
    acc = Math.imul(acc, -2048144777) | 0;
    acc = acc ^ (acc >>> 13 | 0);
    acc = Math.imul(acc, -1028477379) | 0;
    acc = acc ^ (acc >>> 16 | 0);
    return acc;
  }
  function moonbitlang$core$builtin$$Hasher$finalize(self) {
    return moonbitlang$core$builtin$$Hasher$avalanche(self);
  }
  function moonbitlang$core$builtin$$Hasher$new$46$inner(seed) {
    return { acc: (seed >>> 0) + (374761393 >>> 0) | 0 };
  }
  function moonbitlang$core$builtin$$Hasher$new(seed$46$opt) {
    let seed;
    if (seed$46$opt === void 0) {
      seed = moonbitlang$core$builtin$$seed;
    } else {
      const _Some = seed$46$opt;
      seed = _Some;
    }
    return moonbitlang$core$builtin$$Hasher$new$46$inner(seed);
  }
  function moonbitlang$core$builtin$$Hash$hash$22$(self) {
    const _self = moonbitlang$core$builtin$$Hasher$new(void 0);
    moonbitlang$core$builtin$$Hasher$combine$5$(_self, self);
    return moonbitlang$core$builtin$$Hasher$finalize(_self);
  }
  function moonbitlang$core$string$$String$substring$46$inner(self, start, end) {
    const len = self.length;
    let end$2;
    if (end === void 0) {
      end$2 = len;
    } else {
      const _Some = end;
      end$2 = _Some;
    }
    return start >= 0 && (start <= end$2 && end$2 <= len) ? self.substring(start, end$2) : $panic();
  }
  function moonbitlang$core$int$$Int$next_power_of_two(self) {
    if (self >= 0) {
      if (self <= 1) {
        return 1;
      }
      if (self > 1073741824) {
        return 1073741824;
      }
      return (2147483647 >> (Math.clz32(self - 1 | 0) - 1 | 0)) + 1 | 0;
    } else {
      return $panic();
    }
  }
  function moonbitlang$core$builtin$$Map$new$46$inner$2$(capacity) {
    const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
    const _bind$3 = capacity$2 - 1 | 0;
    const _bind$4 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
    const _bind$5 = $make_array_len_and_init(capacity$2, void 0);
    const _bind$6 = void 0;
    return { entries: _bind$5, size: 0, capacity: capacity$2, capacity_mask: _bind$3, grow_at: _bind$4, head: _bind$6, tail: -1 };
  }
  function moonbitlang$core$builtin$$Map$new$46$inner$3$(capacity) {
    const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
    const _bind$3 = capacity$2 - 1 | 0;
    const _bind$4 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
    const _bind$5 = $make_array_len_and_init(capacity$2, void 0);
    const _bind$6 = void 0;
    return { entries: _bind$5, size: 0, capacity: capacity$2, capacity_mask: _bind$3, grow_at: _bind$4, head: _bind$6, tail: -1 };
  }
  function moonbitlang$core$builtin$$Map$add_entry_to_tail$3$(self, idx, entry) {
    const _bind$3 = self.tail;
    if (_bind$3 === -1) {
      self.head = entry;
    } else {
      const _tmp2 = self.entries;
      $bound_check(_tmp2, _bind$3);
      const _p = _tmp2[_bind$3];
      let _tmp$2;
      if (_p === void 0) {
        _tmp$2 = $panic();
      } else {
        const _p$2 = _p;
        _tmp$2 = _p$2;
      }
      _tmp$2.next = entry;
    }
    self.tail = idx;
    const _tmp = self.entries;
    $bound_check(_tmp, idx);
    _tmp[idx] = entry;
    self.size = self.size + 1 | 0;
  }
  function moonbitlang$core$builtin$$Map$add_entry_to_tail$2$(self, idx, entry) {
    const _bind$3 = self.tail;
    if (_bind$3 === -1) {
      self.head = entry;
    } else {
      const _tmp2 = self.entries;
      $bound_check(_tmp2, _bind$3);
      const _p = _tmp2[_bind$3];
      let _tmp$2;
      if (_p === void 0) {
        _tmp$2 = $panic();
      } else {
        const _p$2 = _p;
        _tmp$2 = _p$2;
      }
      _tmp$2.next = entry;
    }
    self.tail = idx;
    const _tmp = self.entries;
    $bound_check(_tmp, idx);
    _tmp[idx] = entry;
    self.size = self.size + 1 | 0;
  }
  function moonbitlang$core$builtin$$Map$set_entry$2$(self, entry, new_idx) {
    const _tmp = self.entries;
    $bound_check(_tmp, new_idx);
    _tmp[new_idx] = entry;
    const _bind$3 = entry.next;
    if (_bind$3 === void 0) {
      self.tail = new_idx;
      return;
    } else {
      const _Some = _bind$3;
      const _next = _Some;
      _next.prev = new_idx;
      return;
    }
  }
  function moonbitlang$core$builtin$$Map$set_entry$3$(self, entry, new_idx) {
    const _tmp = self.entries;
    $bound_check(_tmp, new_idx);
    _tmp[new_idx] = entry;
    const _bind$3 = entry.next;
    if (_bind$3 === void 0) {
      self.tail = new_idx;
      return;
    } else {
      const _Some = _bind$3;
      const _next = _Some;
      _next.prev = new_idx;
      return;
    }
  }
  function moonbitlang$core$builtin$$Map$push_away$3$(self, idx, entry) {
    let _tmp = entry.psl + 1 | 0;
    let _tmp$2 = idx + 1 & self.capacity_mask;
    let _tmp$3 = entry;
    while (true) {
      const psl = _tmp;
      const idx$2 = _tmp$2;
      const entry$2 = _tmp$3;
      const _tmp$4 = self.entries;
      $bound_check(_tmp$4, idx$2);
      const _bind$3 = _tmp$4[idx$2];
      if (_bind$3 === void 0) {
        entry$2.psl = psl;
        moonbitlang$core$builtin$$Map$set_entry$3$(self, entry$2, idx$2);
        break;
      } else {
        const _Some = _bind$3;
        const _curr_entry = _Some;
        if (psl > _curr_entry.psl) {
          entry$2.psl = psl;
          moonbitlang$core$builtin$$Map$set_entry$3$(self, entry$2, idx$2);
          _tmp = _curr_entry.psl + 1 | 0;
          _tmp$2 = idx$2 + 1 & self.capacity_mask;
          _tmp$3 = _curr_entry;
          continue;
        } else {
          _tmp = psl + 1 | 0;
          _tmp$2 = idx$2 + 1 & self.capacity_mask;
          continue;
        }
      }
    }
  }
  function moonbitlang$core$builtin$$Map$push_away$2$(self, idx, entry) {
    let _tmp = entry.psl + 1 | 0;
    let _tmp$2 = idx + 1 & self.capacity_mask;
    let _tmp$3 = entry;
    while (true) {
      const psl = _tmp;
      const idx$2 = _tmp$2;
      const entry$2 = _tmp$3;
      const _tmp$4 = self.entries;
      $bound_check(_tmp$4, idx$2);
      const _bind$3 = _tmp$4[idx$2];
      if (_bind$3 === void 0) {
        entry$2.psl = psl;
        moonbitlang$core$builtin$$Map$set_entry$2$(self, entry$2, idx$2);
        break;
      } else {
        const _Some = _bind$3;
        const _curr_entry = _Some;
        if (psl > _curr_entry.psl) {
          entry$2.psl = psl;
          moonbitlang$core$builtin$$Map$set_entry$2$(self, entry$2, idx$2);
          _tmp = _curr_entry.psl + 1 | 0;
          _tmp$2 = idx$2 + 1 & self.capacity_mask;
          _tmp$3 = _curr_entry;
          continue;
        } else {
          _tmp = psl + 1 | 0;
          _tmp$2 = idx$2 + 1 & self.capacity_mask;
          continue;
        }
      }
    }
  }
  function moonbitlang$core$builtin$$Map$set_with_hash$3$(self, key, value, hash) {
    if (self.size >= self.grow_at) {
      moonbitlang$core$builtin$$Map$grow$3$(self);
    }
    let _bind$3;
    let _tmp = 0;
    let _tmp$2 = hash & self.capacity_mask;
    while (true) {
      const psl = _tmp;
      const idx = _tmp$2;
      const _tmp$3 = self.entries;
      $bound_check(_tmp$3, idx);
      const _bind$42 = _tmp$3[idx];
      if (_bind$42 === void 0) {
        _bind$3 = { _0: idx, _1: psl };
        break;
      } else {
        const _Some = _bind$42;
        const _curr_entry = _Some;
        if (_curr_entry.hash === hash && _curr_entry.key === key) {
          _curr_entry.value = value;
          return void 0;
        }
        if (psl > _curr_entry.psl) {
          moonbitlang$core$builtin$$Map$push_away$3$(self, idx, _curr_entry);
          _bind$3 = { _0: idx, _1: psl };
          break;
        }
        _tmp = psl + 1 | 0;
        _tmp$2 = idx + 1 & self.capacity_mask;
        continue;
      }
    }
    const _idx = _bind$3._0;
    const _psl = _bind$3._1;
    const _bind$4 = self.tail;
    const _bind$5 = void 0;
    const entry = { prev: _bind$4, next: _bind$5, psl: _psl, hash, key, value };
    moonbitlang$core$builtin$$Map$add_entry_to_tail$3$(self, _idx, entry);
  }
  function moonbitlang$core$builtin$$Map$set_with_hash$2$(self, key, value, hash) {
    if (self.size >= self.grow_at) {
      moonbitlang$core$builtin$$Map$grow$2$(self);
    }
    let _bind$3;
    let _tmp = 0;
    let _tmp$2 = hash & self.capacity_mask;
    while (true) {
      const psl = _tmp;
      const idx = _tmp$2;
      const _tmp$3 = self.entries;
      $bound_check(_tmp$3, idx);
      const _bind$42 = _tmp$3[idx];
      if (_bind$42 === void 0) {
        _bind$3 = { _0: idx, _1: psl };
        break;
      } else {
        const _Some = _bind$42;
        const _curr_entry = _Some;
        if (_curr_entry.hash === hash && _curr_entry.key === key) {
          _curr_entry.value = value;
          return void 0;
        }
        if (psl > _curr_entry.psl) {
          moonbitlang$core$builtin$$Map$push_away$2$(self, idx, _curr_entry);
          _bind$3 = { _0: idx, _1: psl };
          break;
        }
        _tmp = psl + 1 | 0;
        _tmp$2 = idx + 1 & self.capacity_mask;
        continue;
      }
    }
    const _idx = _bind$3._0;
    const _psl = _bind$3._1;
    const _bind$4 = self.tail;
    const _bind$5 = void 0;
    const entry = { prev: _bind$4, next: _bind$5, psl: _psl, hash, key, value };
    moonbitlang$core$builtin$$Map$add_entry_to_tail$2$(self, _idx, entry);
  }
  function moonbitlang$core$builtin$$Map$grow$3$(self) {
    const old_head = self.head;
    const new_capacity = self.capacity << 1;
    self.entries = $make_array_len_and_init(new_capacity, void 0);
    self.capacity = new_capacity;
    self.capacity_mask = new_capacity - 1 | 0;
    const _p = self.capacity;
    self.grow_at = (Math.imul(_p, 13) | 0) / 16 | 0;
    self.size = 0;
    self.head = void 0;
    self.tail = -1;
    let _tmp = old_head;
    while (true) {
      const _param = _tmp;
      if (_param === void 0) {
        return;
      } else {
        const _Some = _param;
        const _x = _Some;
        const _next = _x.next;
        const _key = _x.key;
        const _value = _x.value;
        const _hash = _x.hash;
        moonbitlang$core$builtin$$Map$set_with_hash$3$(self, _key, _value, _hash);
        _tmp = _next;
        continue;
      }
    }
  }
  function moonbitlang$core$builtin$$Map$grow$2$(self) {
    const old_head = self.head;
    const new_capacity = self.capacity << 1;
    self.entries = $make_array_len_and_init(new_capacity, void 0);
    self.capacity = new_capacity;
    self.capacity_mask = new_capacity - 1 | 0;
    const _p = self.capacity;
    self.grow_at = (Math.imul(_p, 13) | 0) / 16 | 0;
    self.size = 0;
    self.head = void 0;
    self.tail = -1;
    let _tmp = old_head;
    while (true) {
      const _param = _tmp;
      if (_param === void 0) {
        return;
      } else {
        const _Some = _param;
        const _x = _Some;
        const _next = _x.next;
        const _key = _x.key;
        const _value = _x.value;
        const _hash = _x.hash;
        moonbitlang$core$builtin$$Map$set_with_hash$2$(self, _key, _value, _hash);
        _tmp = _next;
        continue;
      }
    }
  }
  function moonbitlang$core$builtin$$Map$set$3$(self, key, value) {
    moonbitlang$core$builtin$$Map$set_with_hash$3$(self, key, value, moonbitlang$core$builtin$$Hash$hash$22$(key));
  }
  function moonbitlang$core$builtin$$Map$set$2$(self, key, value) {
    moonbitlang$core$builtin$$Map$set_with_hash$2$(self, key, value, moonbitlang$core$builtin$$Hash$hash$22$(key));
  }
  function moonbitlang$core$builtin$$Map$from_array$2$(arr) {
    const length = arr.end - arr.start | 0;
    let capacity = moonbitlang$core$int$$Int$next_power_of_two(length);
    const _p = capacity;
    if (length > ((Math.imul(_p, 13) | 0) / 16 | 0)) {
      capacity = Math.imul(capacity, 2) | 0;
    }
    const m = moonbitlang$core$builtin$$Map$new$46$inner$2$(capacity);
    const _len = arr.end - arr.start | 0;
    let _tmp = 0;
    while (true) {
      const _i = _tmp;
      if (_i < _len) {
        const e = arr.buf[arr.start + _i | 0];
        moonbitlang$core$builtin$$Map$set$2$(m, e._0, e._1);
        _tmp = _i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return m;
  }
  function moonbitlang$core$builtin$$Map$from_array$3$(arr) {
    const length = arr.end - arr.start | 0;
    let capacity = moonbitlang$core$int$$Int$next_power_of_two(length);
    const _p = capacity;
    if (length > ((Math.imul(_p, 13) | 0) / 16 | 0)) {
      capacity = Math.imul(capacity, 2) | 0;
    }
    const m = moonbitlang$core$builtin$$Map$new$46$inner$3$(capacity);
    const _len = arr.end - arr.start | 0;
    let _tmp = 0;
    while (true) {
      const _i = _tmp;
      if (_i < _len) {
        const e = arr.buf[arr.start + _i | 0];
        moonbitlang$core$builtin$$Map$set$3$(m, e._0, e._1);
        _tmp = _i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return m;
  }
  function moonbitlang$core$builtin$$Map$get$2$(self, key) {
    const hash = moonbitlang$core$builtin$$Hash$hash$22$(key);
    let _tmp = 0;
    let _tmp$2 = hash & self.capacity_mask;
    while (true) {
      const i = _tmp;
      const idx = _tmp$2;
      const _tmp$3 = self.entries;
      $bound_check(_tmp$3, idx);
      const _bind$3 = _tmp$3[idx];
      if (_bind$3 === void 0) {
        return -1;
      } else {
        const _Some = _bind$3;
        const _entry = _Some;
        if (_entry.hash === hash && _entry.key === key) {
          return _entry.value;
        }
        if (i > _entry.psl) {
          return -1;
        }
        _tmp = i + 1 | 0;
        _tmp$2 = idx + 1 & self.capacity_mask;
        continue;
      }
    }
  }
  function moonbitlang$core$builtin$$Map$get$3$(self, key) {
    const hash = moonbitlang$core$builtin$$Hash$hash$22$(key);
    let _tmp = 0;
    let _tmp$2 = hash & self.capacity_mask;
    while (true) {
      const i = _tmp;
      const idx = _tmp$2;
      const _tmp$3 = self.entries;
      $bound_check(_tmp$3, idx);
      const _bind$3 = _tmp$3[idx];
      if (_bind$3 === void 0) {
        return Option$None$2$;
      } else {
        const _Some = _bind$3;
        const _entry = _Some;
        if (_entry.hash === hash && _entry.key === key) {
          return new Option$Some$2$(_entry.value);
        }
        if (i > _entry.psl) {
          return Option$None$2$;
        }
        _tmp = i + 1 | 0;
        _tmp$2 = idx + 1 & self.capacity_mask;
        continue;
      }
    }
  }
  function moonbitlang$core$builtin$$Map$remove_entry$2$(self, entry) {
    const _bind$3 = entry.prev;
    if (_bind$3 === -1) {
      self.head = entry.next;
    } else {
      const _tmp = self.entries;
      $bound_check(_tmp, _bind$3);
      const _p = _tmp[_bind$3];
      let _tmp$2;
      if (_p === void 0) {
        _tmp$2 = $panic();
      } else {
        const _p$2 = _p;
        _tmp$2 = _p$2;
      }
      const _tmp$3 = _tmp$2;
      _tmp$3.next = entry.next;
    }
    const _bind$4 = entry.next;
    if (_bind$4 === void 0) {
      self.tail = entry.prev;
      return;
    } else {
      const _Some = _bind$4;
      const _next = _Some;
      _next.prev = entry.prev;
      return;
    }
  }
  function moonbitlang$core$builtin$$Map$shift_back$2$(self, idx) {
    let _tmp = idx;
    while (true) {
      const idx$2 = _tmp;
      const next = idx$2 + 1 & self.capacity_mask;
      _L: {
        const _tmp$22 = self.entries;
        $bound_check(_tmp$22, next);
        const _bind$3 = _tmp$22[next];
        if (_bind$3 === void 0) {
          break _L;
        } else {
          const _Some = _bind$3;
          const _x = _Some;
          const _x$2 = _x.psl;
          if (_x$2 === 0) {
            break _L;
          } else {
            _x.psl = _x.psl - 1 | 0;
            moonbitlang$core$builtin$$Map$set_entry$2$(self, _x, idx$2);
            _tmp = next;
            continue;
          }
        }
      }
      const _tmp$2 = self.entries;
      $bound_check(_tmp$2, idx$2);
      _tmp$2[idx$2] = void 0;
      return;
    }
  }
  function moonbitlang$core$builtin$$Map$remove_with_hash$2$(self, key, hash) {
    let _tmp = 0;
    let _tmp$2 = hash & self.capacity_mask;
    while (true) {
      const i = _tmp;
      const idx = _tmp$2;
      const _tmp$3 = self.entries;
      $bound_check(_tmp$3, idx);
      const _bind$3 = _tmp$3[idx];
      if (_bind$3 === void 0) {
        break;
      } else {
        const _Some = _bind$3;
        const _entry = _Some;
        if (_entry.hash === hash && _entry.key === key) {
          moonbitlang$core$builtin$$Map$remove_entry$2$(self, _entry);
          moonbitlang$core$builtin$$Map$shift_back$2$(self, idx);
          self.size = self.size - 1 | 0;
          break;
        }
        if (i > _entry.psl) {
          break;
        }
        _tmp = i + 1 | 0;
        _tmp$2 = idx + 1 & self.capacity_mask;
        continue;
      }
    }
  }
  function moonbitlang$core$builtin$$Map$remove$2$(self, key) {
    moonbitlang$core$builtin$$Map$remove_with_hash$2$(self, key, moonbitlang$core$builtin$$Hash$hash$22$(key));
  }
  function moonbitlang$core$array$$FixedArray$fill$46$inner$41$(self, value, start, end) {
    const array_length = self.length;
    if (array_length > 0) {
      if (start >= 0 && start < array_length) {
        let length;
        if (end === void 0) {
          length = array_length - start | 0;
        } else {
          const _Some = end;
          const _e = _Some;
          length = _e >= start && _e <= array_length ? _e - start | 0 : $panic();
        }
        self.fill(value, start, start + length);
        return;
      } else {
        $panic();
        return;
      }
    } else {
      return;
    }
  }
  function moonbitlang$core$builtin$$Map$clear$2$(self) {
    moonbitlang$core$array$$FixedArray$fill$46$inner$41$(self.entries, void 0, 0, void 0);
    self.size = 0;
    self.head = void 0;
    self.tail = -1;
  }
  function moonbitlang$core$builtin$$Hasher$combine_string(self, value) {
    const _end2373 = value.length;
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < _end2373) {
        moonbitlang$core$builtin$$Hasher$combine_uint(self, value.charCodeAt(i));
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
  function moonbitlang$core$builtin$$Hash$hash_combine$5$(self, hasher) {
    moonbitlang$core$builtin$$Hasher$combine_string(hasher, self);
  }
  function kazuph$blog_admin$client$$parse_state(el) {
    const attr = kazuph$blog_admin$client$$get_attribute(el, "luna:state");
    if (attr === "") {
      return mizchi$js$core$$null();
    }
    let _tmp;
    if (attr.length > 0) {
      $bound_check(attr, 0);
      const _p = attr.charCodeAt(0);
      const _p$2 = 35;
      _tmp = _p === _p$2;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      const id = moonbitlang$core$string$$String$substring$46$inner(attr, 1, void 0);
      const script_el = kazuph$blog_admin$client$$get_element_by_id(id);
      if (kazuph$blog_admin$client$$is_null_element(script_el)) {
        return mizchi$js$core$$null();
      }
      const text = kazuph$blog_admin$client$$get_text_content(script_el);
      return kazuph$blog_admin$client$$parse_json_to_js(text);
    }
    return kazuph$blog_admin$client$$parse_json_to_js(attr);
  }
  function kazuph$blog_admin$client$$is_loaded(id) {
    const _bind$3 = moonbitlang$core$builtin$$Map$get$2$(kazuph$blog_admin$client$$loaded_components, id);
    if (_bind$3 === -1) {
      return false;
    } else {
      const _Some = _bind$3;
      const _x = _Some;
      if (_x === true) {
        return true;
      } else {
        return false;
      }
    }
  }
  function kazuph$blog_admin$client$$mark_loaded(id) {
    moonbitlang$core$builtin$$Map$set$2$(kazuph$blog_admin$client$$loaded_components, id, true);
  }
  function kazuph$blog_admin$client$$unload(id) {
    moonbitlang$core$builtin$$Map$remove$2$(kazuph$blog_admin$client$$loaded_components, id);
  }
  function kazuph$blog_admin$client$$clear_loaded() {
    moonbitlang$core$builtin$$Map$clear$2$(kazuph$blog_admin$client$$loaded_components);
  }
  function kazuph$blog_admin$client$$hydrate(el) {
    const id = kazuph$blog_admin$client$$get_attribute(el, "luna:id");
    const component_id = id === "" ? kazuph$blog_admin$client$$get_tag_name(el) : id;
    if (kazuph$blog_admin$client$$is_loaded(component_id)) {
      return void 0;
    }
    kazuph$blog_admin$client$$mark_loaded(component_id);
    const state = kazuph$blog_admin$client$$parse_state(el);
    moonbitlang$core$builtin$$Map$set$3$(kazuph$blog_admin$client$$luna_state, component_id, state);
    const url = kazuph$blog_admin$client$$get_attribute(el, "luna:url");
    if (url === "") {
      return void 0;
    }
    const export_name = kazuph$blog_admin$client$$get_attribute(el, "luna:export");
    kazuph$blog_admin$client$$dynamic_import_and_hydrate(url, export_name, el, state, component_id);
  }
  function kazuph$blog_admin$client$$setup_trigger(el, trigger, hydrate_fn) {
    if (trigger === "" || trigger === "load") {
      if (kazuph$blog_admin$client$$is_document_loading()) {
        kazuph$blog_admin$client$$add_dom_ready_listener(hydrate_fn);
        return;
      } else {
        hydrate_fn();
        return;
      }
    } else {
      if (trigger === "idle") {
        kazuph$blog_admin$client$$request_idle_callback(hydrate_fn);
        return;
      } else {
        let _tmp;
        if (trigger.length > 0) {
          $bound_check(trigger, 0);
          const _p = trigger.charCodeAt(0);
          const _p$2 = 118;
          _tmp = _p === _p$2;
        } else {
          _tmp = false;
        }
        if (_tmp) {
          kazuph$blog_admin$client$$create_visibility_observer(el, hydrate_fn);
          return;
        } else {
          if (trigger.length > 5 && moonbitlang$core$string$$String$substring$46$inner(trigger, 0, kazuph$blog_admin$client$$setup_trigger$46$constr$47$2844) === "media") {
            const query = moonbitlang$core$string$$String$substring$46$inner(trigger, 6, void 0);
            kazuph$blog_admin$client$$create_media_listener(query, hydrate_fn);
            return;
          } else {
            if (kazuph$blog_admin$client$$is_document_loading()) {
              kazuph$blog_admin$client$$add_dom_ready_listener(hydrate_fn);
              return;
            } else {
              hydrate_fn();
              return;
            }
          }
        }
      }
    }
  }
  function kazuph$blog_admin$client$$setup_element(el) {
    const trigger = kazuph$blog_admin$client$$get_attribute(el, "luna:trigger");
    kazuph$blog_admin$client$$setup_trigger(el, trigger, () => {
      kazuph$blog_admin$client$$hydrate(el);
    });
  }
  function kazuph$blog_admin$client$$scan() {
    const elements = kazuph$blog_admin$client$$query_selector_all("[luna\\:url]");
    const len = kazuph$blog_admin$client$$get_length(elements);
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const el = kazuph$blog_admin$client$$get_item(elements, i);
        kazuph$blog_admin$client$$setup_element(el);
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
  function kazuph$blog_admin$client$$init_json_scripts() {
    const scripts = kazuph$blog_admin$client$$query_selector_all('script[type="luna/json"]');
    const len = kazuph$blog_admin$client$$get_length(scripts);
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const script = kazuph$blog_admin$client$$get_item(scripts, i);
        const id = kazuph$blog_admin$client$$get_attribute(script, "id");
        const _p = "";
        if (!(id === _p)) {
          const text = kazuph$blog_admin$client$$get_text_content(script);
          const state = kazuph$blog_admin$client$$parse_json_to_js(text);
          moonbitlang$core$builtin$$Map$set$3$(kazuph$blog_admin$client$$luna_state, id, state);
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
  function kazuph$blog_admin$client$$get_state(id) {
    const _bind$3 = moonbitlang$core$builtin$$Map$get$3$(kazuph$blog_admin$client$$luna_state, id);
    if (_bind$3.$tag === 1) {
      const _Some = _bind$3;
      return _Some._0;
    } else {
      return mizchi$js$core$$null();
    }
  }
  function kazuph$blog_admin$client$$start() {
    kazuph$blog_admin$client$$init_json_scripts();
    if (kazuph$blog_admin$client$$is_document_loading()) {
      kazuph$blog_admin$client$$add_dom_ready_listener(kazuph$blog_admin$client$$scan);
    } else {
      kazuph$blog_admin$client$$scan();
    }
    kazuph$blog_admin$client$$observe_dom_additions(kazuph$blog_admin$client$$setup_element);
    kazuph$blog_admin$client$$set_global("__LUNA_STATE__", kazuph$blog_admin$client$$hashmap_to_js_object(kazuph$blog_admin$client$$get_state));
    kazuph$blog_admin$client$$set_global("__LUNA_HYDRATE__", kazuph$blog_admin$client$$create_hydrate_wrapper(kazuph$blog_admin$client$$hydrate));
    kazuph$blog_admin$client$$set_global("__LUNA_SCAN__", kazuph$blog_admin$client$$create_scan_wrapper(kazuph$blog_admin$client$$scan));
    kazuph$blog_admin$client$$set_global("__LUNA_UNLOAD__", kazuph$blog_admin$client$$create_unload_wrapper(kazuph$blog_admin$client$$unload));
    kazuph$blog_admin$client$$set_global("__LUNA_CLEAR_LOADED__", kazuph$blog_admin$client$$create_clear_wrapper(kazuph$blog_admin$client$$clear_loaded));
  }

  // static/_loader_entry.js
  kazuph$blog_admin$client$$start();
})();
//# sourceMappingURL=loader.js.map
