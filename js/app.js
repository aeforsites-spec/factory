/* =====================================================================
   كود الموقع — لا تحتاج لتعديل هذا الملف
   Site logic — you normally don't need to edit this file
   ===================================================================== */
(function () {
  "use strict";

  var C = window.SITE_CONFIG || {};
  var PRODUCTS = window.PRODUCTS || [];
  var CATS = window.CATEGORIES || [];
  var params = new URLSearchParams(location.search);
  var PAGE = document.body.getAttribute("data-page");
  var PLACEHOLDER = "images/placeholder.svg";

  /* ---------------- language ---------------- */
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var lang = params.get("lang") || store("lang") || "ar";
  if (!window.I18N[lang]) lang = "ar";
  if (params.get("lang")) store("lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  function t(k) { var v = window.I18N[lang][k]; return v === undefined ? k : v; }
  function L(o) { if (!o) return ""; if (typeof o === "string") return o; return o[lang] || o.ar || ""; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------------- icons ---------------- */
  var ICON = {
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/><path fill="currentColor" d="M16.6 14.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3z"/></svg>',
    ms: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.4 2 2 6.1 2 11.6c0 2.9 1.2 5.4 3.1 7.1V22l2.9-1.6c1.2.3 2.5.5 4 .5 5.6 0 10-4.1 10-9.6S17.6 2 12 2zm1 12.9-2.5-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 8V6.5c0-.7.2-1.2 1.2-1.2H17V2.2A24 24 0 0 0 14.5 2C12 2 10.5 3.5 10.5 6.2V8H8v3.2h2.5V22H14V11.2h2.7L17 8z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4 7.3V17h16V7.3z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.4 3.5 2.1-.8 1.3L11 13V7h2z"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10.6 13.4a1 1 0 0 1 0-1.4l3.5-3.5a1 1 0 1 1 1.4 1.4L12 13.4a1 1 0 0 1-1.4 0zM8.5 19a4.5 4.5 0 0 1-3.2-7.7l2.1-2.1 1.4 1.4-2.1 2.1a2.5 2.5 0 0 0 3.5 3.5l2.1-2.1 1.4 1.4-2.1 2.1A4.5 4.5 0 0 1 8.5 19zm8.1-4.2-1.4-1.4 2.1-2.1a2.5 2.5 0 0 0-3.5-3.5l-2.1 2.1-1.4-1.4 2.1-2.1a4.5 4.5 0 0 1 6.4 6.4z"/></svg>',
    chev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9.3 5.3 10.7 4l8 8-8 8-1.4-1.3 6.6-6.7z"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 9h-3a15.6 15.6 0 0 0-1.3-5.6A8 8 0 0 1 18.9 11zM12 4.1c.9 1.2 1.8 3.5 2 6.9h-4c.2-3.4 1.1-5.7 2-6.9zM9.4 5.4A15.6 15.6 0 0 0 8.1 11h-3a8 8 0 0 1 4.3-5.6zM5.1 13h3a15.6 15.6 0 0 0 1.3 5.6A8 8 0 0 1 5.1 13zm6.9 6.9c-.9-1.2-1.8-3.5-2-6.9h4c-.2 3.4-1.1 5.7-2 6.9zm2.6-1.3a15.6 15.6 0 0 0 1.3-5.6h3a8 8 0 0 1-4.3 5.6z"/></svg>',
    tool: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.7 18.6 13 9.9a6 6 0 0 0-7.7-7.6l3.9 3.9-2.8 2.8-4-3.9A6 6 0 0 0 10 12.9l8.7 8.7a1 1 0 0 0 1.4 0l1.6-1.6a1 1 0 0 0 0-1.4z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4z"/></svg>',
    factory: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M2 21V10l6 3.5V10l6 3.5V4h3l1 9.5V4h2v17zm4-3h2v-2H6zm5 0h2v-2h-2zm5 0h2v-2h-2z"/></svg>',
    users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.3 0-7 1.7-7 4v2h14v-2c0-2.3-3.7-4-7-4zm7.5-2a3.5 3.5 0 1 0-1-6.9 6 6 0 0 1 0 6.8l1 .1zm1.2 2.2A5.4 5.4 0 0 1 18 18v2h4v-2c0-1.9-2.4-3.3-4.3-3.8z"/></svg>'
  };

  /* ---------------- links ---------------- */
  function absUrl(rel) { try { return new URL(rel, location.href).href; } catch (e) { return rel; } }
  function productHref(code, img) { return "product.html?id=" + encodeURIComponent(code) + (img > 1 ? "&img=" + img : ""); }
  function waHref(text) { return "https://wa.me/" + String(C.whatsappNumber || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(text); }
  function productMessage(p, img) {
    return t("wa_product")
      .replace("{name}", L(p.name))
      .replace("{code}", p.code)
      .replace("{photo}", p.code + "-" + img)
      .replace("{url}", absUrl(productHref(p.code, img)));
  }
  var msHref = "https://m.me/" + encodeURIComponent(C.messengerUsername || "");
  // Messenger fills the text in where it supports it; the message is also copied as a fallback
  function msHrefWith(text) { return msHref + "?text=" + encodeURIComponent(text); }
  // hide Messenger / Facebook buttons until real links are filled in config.js
  var HAS_MS = !!C.messengerUsername && C.messengerUsername !== "YourPageName";
  var HAS_FB = !!C.facebookUrl && C.facebookUrl.indexOf("YourPageName") === -1;
  var PHONES = String(C.phone || "").split(/\s*[—,،\/]\s*/).filter(function (x) { return x.trim(); });

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).catch(fallback);
    fallback(); return Promise.resolve();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) { /* ignore */ }
      ta.remove();
    }
  }
  var toastTimer;
  function toast(msg) {
    var el = $("#toast");
    if (!el) { el = document.createElement("div"); el.id = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove("show"); }, 3500);
  }

  function catName(id) { var c = CATS.filter(function (x) { return x.id === id; })[0]; return c ? L(c) : ""; }
  function firstImg(p) { return (p.images && p.images[0]) || PLACEHOLDER; }
  var IMG_FALLBACK = ' onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'"';

  /* ---------------- layout: header / footer / floating ---------------- */
  function renderHeader() {
    var nav = [["index.html", "nav_home", "home"], ["products.html", "nav_products", "products"], ["about.html", "nav_about", "about"], ["contact.html", "nav_contact", "contact"]];
    var active = PAGE === "product" ? "products" : PAGE;
    var links = nav.map(function (n) {
      return '<a href="' + n[0] + '"' + (active === n[2] ? ' class="active" aria-current="page"' : "") + ">" + t(n[1]) + "</a>";
    }).join("");
    $("#site-header").innerHTML =
      '<div class="container header-inner">' +
        '<a class="brand" href="index.html"><img src="images/logo.svg" alt="" width="40" height="40"><span>' + esc(L(C.companyName)) + "</span></a>" +
        '<nav class="main-nav" id="main-nav">' + links + "</nav>" +
        '<div class="header-tools">' +
          '<button class="lang-btn" id="lang-btn" type="button">' + ICON.globe + "<span>" + t("lang_switch") + "</span></button>" +
          '<button class="menu-btn" id="menu-btn" type="button" aria-label="menu" aria-expanded="false">' + ICON.menu + "</button>" +
        "</div>" +
      "</div>";
    $("#lang-btn").addEventListener("click", function () {
      store("lang", lang === "ar" ? "en" : "ar");
      params.delete("lang");
      var q = params.toString();
      location.href = location.pathname + (q ? "?" + q : "") + location.hash;
    });
    $("#menu-btn").addEventListener("click", function () {
      var open = $("#main-nav").classList.toggle("open");
      this.setAttribute("aria-expanded", open);
    });
  }

  function renderFooter() {
    var year = new Date().getFullYear();
    $("#site-footer").innerHTML =
      '<div class="container footer-grid">' +
        '<div><div class="brand brand-footer"><img src="images/logo.svg" alt="" width="36" height="36"><span>' + esc(L(C.companyName)) + "</span></div>" +
          "<p>" + esc(L(C.tagline)) + "</p></div>" +
        "<div><h4>" + t("footer_links") + "</h4>" +
          '<a href="index.html">' + t("nav_home") + '</a><a href="products.html">' + t("nav_products") + "</a>" +
          '<a href="about.html">' + t("nav_about") + '</a><a href="contact.html">' + t("nav_contact") + "</a></div>" +
        "<div><h4>" + t("footer_follow") + "</h4>" +
          '<div class="social">' +
            '<a href="' + waHref(t("wa_general")) + '" target="_blank" rel="noopener" aria-label="WhatsApp" class="s-wa">' + ICON.wa + "</a>" +
            (HAS_MS ? '<a href="' + msHref + '" target="_blank" rel="noopener" aria-label="Messenger" class="s-ms">' + ICON.ms + "</a>" : "") +
            (HAS_FB ? '<a href="' + esc(C.facebookUrl) + '" target="_blank" rel="noopener" aria-label="Facebook" class="s-fb">' + ICON.fb + "</a>" : "") +
          "</div>" +
          (C.phone ? '<p class="ltr-num">' + esc(C.phone) + "</p>" : "") +
          (C.mapUrl ? '<a class="footer-map" target="_blank" rel="noopener" href="' + esc(C.mapUrl) + '">' + ICON.pin + "<span>" + esc(L(C.address)) + "</span></a>" : "") +
        "</div>" +
      "</div>" +
      '<div class="footer-bottom">© ' + year + " " + esc(L(C.companyName)) + " — " + t("rights") + "</div>";
  }

  function renderFloating(href) {
    var a = $("#wa-float");
    if (!a) {
      a = document.createElement("a");
      a.id = "wa-float"; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", "WhatsApp");
      a.innerHTML = ICON.wa;
      document.body.appendChild(a);
    }
    a.href = href;
  }

  /* ---------------- shared pieces ---------------- */
  function card(p) {
    var href = productHref(p.code, 1);
    var desc = L(p.description);
    return '<article class="card">' +
      '<a class="card-img" href="' + href + '"><img src="' + esc(firstImg(p)) + '" alt="' + esc(L(p.name)) + '" loading="lazy"' + IMG_FALLBACK + '><span class="code-badge">' + esc(p.code) + "</span></a>" +
      '<div class="card-body">' +
        '<span class="card-cat">' + esc(catName(p.category)) + "</span>" +
        '<h3><a href="' + href + '">' + esc(L(p.name)) + "</a></h3>" +
        '<p class="card-desc">' + esc(desc) + "</p>" +
        '<div class="card-actions">' +
          '<a class="btn btn-outline btn-sm" href="' + href + '">' + t("details") + "</a>" +
          '<a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + waHref(productMessage(p, 1)) + '">' + ICON.wa + "<span>" + t("c_whatsapp") + "</span></a>" +
        "</div>" +
      "</div></article>";
  }

  function whyBlock() {
    var items = [["factory", 1], ["shield", 2], ["users", 3], ["tool", 4]];
    return '<section class="section"><div class="container"><h2 class="section-title">' + t("section_why") + "</h2>" +
      '<div class="why-grid">' + items.map(function (i) {
        return '<div class="why-item"><div class="why-icon">' + ICON[i[0]] + "</div><h3>" + t("why_" + i[1] + "_t") + "</h3><p>" + t("why_" + i[1] + "_d") + "</p></div>";
      }).join("") + "</div></div></section>";
  }

  function statsBlock() {
    if (!C.stats || !C.stats.length) return "";
    return '<div class="stats">' + C.stats.map(function (s) {
      return '<div class="stat"><strong>' + esc(s.value) + "</strong><span>" + esc(L(s)) + "</span></div>";
    }).join("") + "</div>";
  }

  function ctaBand() {
    return '<section class="cta-band"><div class="container cta-inner"><div><h2>' + t("cta_band_t") + "</h2><p>" + t("cta_band_d") + "</p></div>" +
      '<a class="btn btn-wa btn-lg" target="_blank" rel="noopener" href="' + waHref(t("wa_general")) + '">' + ICON.wa + "<span>" + t("hero_cta_whatsapp") + "</span></a></div></section>";
  }

  function pageHead(title) {
    return '<section class="page-head"><div class="container"><h1>' + esc(title) + "</h1></div></section>";
  }

  /* ---------------- pages ---------------- */
  var pages = {};

  pages.home = function (main) {
    document.title = L(C.companyName);
    var featured = PRODUCTS.filter(function (p) { return p.featured; });
    if (!featured.length) featured = PRODUCTS.slice(0, 6);
    main.innerHTML =
      '<section class="hero"><div class="container hero-inner">' +
        "<h1>" + esc(L(C.companyName)) + "</h1>" +
        '<p class="hero-sub">' + esc(L(C.tagline)) + "</p>" +
        '<div class="hero-ctas">' +
          '<a class="btn btn-primary btn-lg" href="products.html">' + t("hero_cta_products") + "</a>" +
          '<a class="btn btn-wa btn-lg" target="_blank" rel="noopener" href="' + waHref(t("wa_general")) + '">' + ICON.wa + "<span>" + t("hero_cta_whatsapp") + "</span></a>" +
        "</div>" + statsBlock() +
      "</div></section>" +

      '<section class="section"><div class="container"><h2 class="section-title">' + t("section_categories") + "</h2>" +
        '<div class="cat-grid">' + CATS.map(function (c) {
          var items = PRODUCTS.filter(function (p) { return p.category === c.id; });
          var img = items.length ? firstImg(items[0]) : PLACEHOLDER;
          return '<a class="cat-card" href="products.html?cat=' + encodeURIComponent(c.id) + '">' +
            '<img src="' + esc(img) + '" alt="" loading="lazy"' + IMG_FALLBACK + '>' +
            '<div class="cat-label"><strong>' + esc(L(c)) + "</strong><span>" + items.length + "</span></div></a>";
        }).join("") + "</div></div></section>" +

      '<section class="section section-alt"><div class="container"><h2 class="section-title">' + t("section_featured") + "</h2>" +
        '<div class="grid">' + featured.map(card).join("") + "</div>" +
        '<div class="center"><a class="btn btn-outline" href="products.html">' + t("view_all") + "</a></div>" +
      "</div></section>" +
      whyBlock() + ctaBand();
  };

  pages.products = function (main) {
    document.title = t("products_title") + " | " + L(C.companyName);
    var state = { cat: params.get("cat") || "", q: params.get("q") || "" };
    main.innerHTML = pageHead(t("products_title")) +
      '<section class="section"><div class="container">' +
        '<div class="toolbar"><input type="search" id="search" placeholder="' + esc(t("search_placeholder")) + '" value="' + esc(state.q) + '"></div>' +
        '<div class="chips" id="chips"></div>' +
        '<div class="grid" id="grid"></div>' +
        '<p class="empty" id="empty" hidden>' + t("no_results") + "</p>" +
      "</div></section>" + ctaBand();

    function draw() {
      var chips = [{ id: "", name: t("filter_all") }].concat(CATS.map(function (c) { return { id: c.id, name: L(c) }; }));
      $("#chips").innerHTML = chips.map(function (c) {
        return '<button type="button" class="chip' + (state.cat === c.id ? " active" : "") + '" data-cat="' + esc(c.id) + '">' + esc(c.name) + "</button>";
      }).join("");
      var q = state.q.trim().toLowerCase();
      var list = PRODUCTS.filter(function (p) {
        if (state.cat && p.category !== state.cat) return false;
        if (!q) return true;
        var hay = [p.code, p.name && p.name.ar, p.name && p.name.en, p.description && p.description.ar, p.description && p.description.en].join(" ").toLowerCase();
        return hay.indexOf(q) !== -1;
      });
      $("#grid").innerHTML = list.map(card).join("");
      $("#empty").hidden = list.length > 0;
      var u = new URLSearchParams();
      if (state.cat) u.set("cat", state.cat);
      if (state.q) u.set("q", state.q);
      history.replaceState(null, "", location.pathname + (u.toString() ? "?" + u : ""));
    }
    $("#chips").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.cat = b.getAttribute("data-cat"); draw();
    });
    $("#search").addEventListener("input", function () { state.q = this.value; draw(); });
    draw();
  };

  pages.product = function (main) {
    var id = (params.get("id") || "").toLowerCase();
    var p = PRODUCTS.filter(function (x) { return x.code.toLowerCase() === id; })[0];
    if (!p) {
      main.innerHTML = pageHead(t("not_found")) + '<section class="section"><div class="container center"><a class="btn btn-primary" href="products.html">' + t("back_to_products") + "</a></div></section>";
      return;
    }
    document.title = L(p.name) + " (" + p.code + ") | " + L(C.companyName);
    var imgs = p.images && p.images.length ? p.images : [PLACEHOLDER];
    var cur = Math.min(Math.max(parseInt(params.get("img"), 10) || 1, 1), imgs.length);
    var specs = (p.specs && (p.specs[lang] || p.specs.ar)) || [];
    var related = PRODUCTS.filter(function (x) { return x.category === p.category && x.code !== p.code; }).slice(0, 3);

    main.innerHTML =
      '<section class="section product-section"><div class="container">' +
        '<a class="back-link" href="products.html">' + ICON.chev + "<span>" + t("back_to_products") + "</span></a>" +
        '<div class="product-layout">' +
          '<div class="gallery">' +
            '<div class="gallery-main">' +
              '<img id="main-img" src="" alt="' + esc(L(p.name)) + '"' + IMG_FALLBACK + ">" +
              '<span class="code-badge big" id="photo-code"></span>' +
              (imgs.length > 1 ? '<button type="button" class="g-nav g-prev" id="g-prev" aria-label="prev">' + ICON.chev + '</button><button type="button" class="g-nav g-next" id="g-next" aria-label="next">' + ICON.chev + "</button>" : "") +
              '<span class="g-count" id="g-count"></span>' +
            "</div>" +
            (imgs.length > 1 ? '<div class="thumbs" id="thumbs">' + imgs.map(function (src, i) {
              return '<button type="button" data-i="' + (i + 1) + '" aria-label="' + t("photo_of") + " " + (i + 1) + '"><img src="' + esc(src) + '" alt="" loading="lazy"' + IMG_FALLBACK + "></button>";
            }).join("") + "</div>" : "") +
          "</div>" +
          '<div class="product-info">' +
            '<span class="card-cat">' + esc(catName(p.category)) + "</span>" +
            "<h1>" + esc(L(p.name)) + "</h1>" +
            '<div class="code-line">' + t("code") + ": <strong>" + esc(p.code) + "</strong></div>" +
            '<p class="product-desc">' + esc(L(p.description)) + "</p>" +
            '<div class="product-actions">' +
              '<a class="btn btn-wa btn-lg btn-block" id="wa-btn" target="_blank" rel="noopener" href="#">' + ICON.wa + "<span>" + t("want_this") + "</span></a>" +
              '<div class="row-btns' + (HAS_MS ? "" : " single") + '">' +
                (HAS_MS ? '<a class="btn btn-ms" id="ms-btn" target="_blank" rel="noopener" href="' + msHref + '">' + ICON.ms + "<span>" + t("ask_messenger") + "</span></a>" : "") +
                '<button type="button" class="btn btn-outline" id="copy-btn">' + ICON.link + "<span>" + t("copy_link") + "</span></button>" +
              "</div>" +
            "</div>" +
            (specs.length ? "<h2>" + t("specs") + '</h2><table class="specs">' + specs.map(function (r) {
              return "<tr><th>" + esc(r[0]) + "</th><td>" + esc(r[1]) + "</td></tr>";
            }).join("") + "</table>" : "") +
          "</div>" +
        "</div>" +
      "</div></section>" +
      (related.length ? '<section class="section section-alt"><div class="container"><h2 class="section-title">' + t("related") + '</h2><div class="grid">' + related.map(card).join("") + "</div></div></section>" : "");

    function show(i) {
      cur = (i - 1 + imgs.length) % imgs.length + 1;
      $("#main-img").src = imgs[cur - 1];
      $("#photo-code").innerHTML = esc(t("photo_code")) + ": <bdi>" + esc(p.code + "-" + cur) + "</bdi>";
      $("#g-count").textContent = cur + " / " + imgs.length;
      $("#g-count").hidden = imgs.length < 2;
      $all("#thumbs button").forEach(function (b) { b.classList.toggle("active", +b.getAttribute("data-i") === cur); });
      var msg = productMessage(p, cur);
      $("#wa-btn").href = waHref(msg);
      if ($("#ms-btn")) $("#ms-btn").href = msHrefWith(msg);
      renderFloating(waHref(msg));
      // every "contact us" link on this page carries the product being viewed
      $all('a[href^="contact.html"]').forEach(function (a) {
        a.setAttribute("href", "contact.html?id=" + encodeURIComponent(p.code) + "&img=" + cur);
      });
      history.replaceState(null, "", productHref(p.code, cur));
    }
    if ($("#g-prev")) {
      $("#g-prev").addEventListener("click", function () { show(cur - 1); });
      $("#g-next").addEventListener("click", function () { show(cur + 1); });
      $("#thumbs").addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (b) show(+b.getAttribute("data-i"));
      });
    }
    $("#main-img").addEventListener("click", function () { openLightbox(imgs, cur, function (i) { show(i); }); });
    if (HAS_MS) $("#ms-btn").addEventListener("click", function () { copyText(productMessage(p, cur)); toast(t("messenger_copied")); });
    $("#copy-btn").addEventListener("click", function () {
      var btn = this;
      copyText(absUrl(productHref(p.code, cur)));
      btn.querySelector("span").textContent = t("copied");
      setTimeout(function () { btn.querySelector("span").textContent = t("copy_link"); }, 2000);
    });
    show(cur);
  };

  pages.about = function (main) {
    document.title = t("about_title") + " | " + L(C.companyName);
    var paras = (C.about && (C.about[lang] || C.about.ar)) || [];
    main.innerHTML = pageHead(t("about_title")) +
      '<section class="section"><div class="container narrow about-text">' +
        paras.map(function (x) { return "<p>" + esc(x) + "</p>"; }).join("") +
        statsBlock() +
      "</div></section>" + whyBlock() + ctaBand();
  };

  pages.contact = function (main) {
    document.title = t("contact_title") + " | " + L(C.companyName);
    // opened from a product page? then every button carries that product
    var fromId = (params.get("id") || "").toLowerCase();
    var fromP = PRODUCTS.filter(function (x) { return x.code.toLowerCase() === fromId; })[0];
    var fromImg = Math.max(parseInt(params.get("img"), 10) || 1, 1);
    var msg = fromP ? productMessage(fromP, fromImg) : t("wa_general");
    if (fromP) renderFloating(waHref(msg));
    var items = [
      { cls: "c-wa", icon: "wa", title: t("c_whatsapp"), val: "", href: waHref(msg), ext: true }
    ];
    if (HAS_MS) items.push({ cls: "c-ms", icon: "ms", title: t("c_messenger"), val: "", href: msHrefWith(msg), ext: true, copy: true });
    if (HAS_FB) items.push({ cls: "c-fb", icon: "fb", title: t("c_facebook"), val: "", href: C.facebookUrl, ext: true });
    PHONES.forEach(function (ph) { items.push({ icon: "phone", title: t("c_phone"), val: ph, href: "tel:" + ph.replace(/[^\d+]/g, ""), ltr: true }); });
    if (C.email) items.push({ icon: "mail", title: t("c_email"), val: C.email, href: "mailto:" + C.email, ltr: true });
    if (L(C.address)) items.push({ icon: "pin", title: t("c_address"), val: L(C.address), href: C.mapUrl || "", ext: true, extra: C.mapUrl ? t("c_map") : "" });
    if (L(C.workingHours)) items.push({ icon: "clock", title: t("c_hours"), val: L(C.workingHours) });

    main.innerHTML = pageHead(t("contact_title")) +
      '<section class="section"><div class="container"><p class="lead center">' + t("contact_intro") + "</p>" +
        (fromP ? '<a class="from-product" href="' + productHref(fromP.code, fromImg) + '">' +
          '<img src="' + esc(fromP.images[fromImg - 1] || firstImg(fromP)) + '" alt=""' + IMG_FALLBACK + ">" +
          "<div><small>" + t("contact_product") + "</small><strong>" + esc(L(fromP.name)) + '</strong><span class="ltr-num">' + esc(fromP.code + "-" + fromImg) + "</span></div></a>" : "") +
        '<div class="contact-grid">' + items.map(function (it) {
          var inner = '<div class="c-icon">' + ICON[it.icon] + "</div><div><h3>" + esc(it.title) + "</h3>" +
            (it.val ? '<p class="' + (it.ltr ? "ltr-num" : "") + '">' + esc(it.val) + "</p>" : "") +
            (it.extra ? '<p class="c-extra">' + esc(it.extra) + "</p>" : "") + "</div>";
          var cls = "contact-card " + (it.cls || "");
          return it.href
            ? '<a class="' + cls + '" href="' + esc(it.href) + '"' + (it.ext ? ' target="_blank" rel="noopener"' : "") + ">" + inner + "</a>"
            : '<div class="' + cls + '">' + inner + "</div>";
        }).join("") + "</div>" +
      "</div></section>" +
      (C.mapLat && C.mapLng ?
        '<section class="section section-alt map-section"><div class="container"><h2 class="section-title">' + t("map_title") + "</h2>" +
          '<div class="map-frame"><iframe title="map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=' +
            C.mapLat + "," + C.mapLng + "&z=16&hl=" + lang + '&output=embed"></iframe></div>' +
          '<div class="map-actions">' +
            '<a class="btn btn-primary" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=' + C.mapLat + "," + C.mapLng + '">' + ICON.pin + "<span>" + t("map_directions") + "</span></a>" +
            (C.mapUrl ? '<a class="btn btn-outline" target="_blank" rel="noopener" href="' + esc(C.mapUrl) + '">' + t("c_map") + "</a>" : "") +
          "</div></div></section>" : "");
    var ms = $(".contact-card.c-ms");
    if (ms) ms.addEventListener("click", function () { copyText(msg); toast(t("messenger_copied")); });
  };

  /* ---------------- lightbox ---------------- */
  function openLightbox(imgs, start, onChange) {
    var i = start;
    var box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = '<button type="button" class="lb-close" aria-label="close">' + ICON.close + "</button>" +
      (imgs.length > 1 ? '<button type="button" class="g-nav g-prev" aria-label="prev">' + ICON.chev + '</button><button type="button" class="g-nav g-next" aria-label="next">' + ICON.chev + "</button>" : "") +
      '<img alt=""' + IMG_FALLBACK + ">";
    document.body.appendChild(box);
    document.body.style.overflow = "hidden";
    function set(n) { i = (n - 1 + imgs.length) % imgs.length + 1; $("img", box).src = imgs[i - 1]; onChange(i); }
    function close() { box.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", key); }
    function key(e) {
      var rtl = lang === "ar";
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") set(rtl ? i - 1 : i + 1);
      else if (e.key === "ArrowLeft") set(rtl ? i + 1 : i - 1);
    }
    box.addEventListener("click", function (e) {
      if (e.target.closest(".g-prev")) set(i - 1);
      else if (e.target.closest(".g-next")) set(i + 1);
      else if (e.target === box || e.target.closest(".lb-close")) close();
    });
    document.addEventListener("keydown", key);
    set(i);
  }

  /* ---------------- photo protection ----------------
     Blocks right-click "Save image", drag-to-desktop and long-press download on phones.
     (Screenshots can't be blocked by any website — the watermark on every photo covers that.) */
  function isPhoto(el) { return el && el.closest && el.closest("img, .gallery-main, .card-img, .cat-card, .lightbox, .thumbs"); }
  document.addEventListener("contextmenu", function (e) {
    if (isPhoto(e.target)) { e.preventDefault(); toast(t("photo_protected")); }
  });
  document.addEventListener("dragstart", function (e) { if (isPhoto(e.target)) e.preventDefault(); });

  /* ---------------- boot ---------------- */
  renderHeader();
  renderFooter();
  renderFloating(waHref(t("wa_general")));
  var main = $("#main");
  if (pages[PAGE]) pages[PAGE](main);
})();
