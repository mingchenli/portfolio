(function () {
  "use strict";
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Tiny DOM builder: el("a", { href: "#", class: "x" }, "text", childNode)
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === undefined || v === null || v === false) continue;
      if (k === "class") n.className = v;
      else n.setAttribute(k, v);
    }
    for (const kid of kids.flat()) {
      if (kid === undefined || kid === null || kid === false) continue;
      n.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
    }
    return n;
  }
  const ext = (url) => (/^https?:/.test(url) ? { href: url, target: "_blank", rel: "noopener noreferrer" } : { href: url });

  // Hero
  $("handle").textContent = S.handle;
  $("role").textContent = [S.role, ...S.focus].join(" · ");
  $("tagline").textContent = S.tagline;
  const meta = $("meta");
  if (S.fingerprint) meta.append(el("span", {}, S.fingerprint));
  if (S.location) meta.append(el("span", {}, "loc " + S.location));
  if (S.status) meta.append(el("span", { class: "ok" }, "● " + S.status));
  $("about-text").append(...S.about.map((p) => el("p", {}, p)));

  // Email is assembled at runtime only, so it never sits in the HTML source
  const addr = S.contact.emailUser + "@" + S.contact.emailDomain;
  $("hero-links").append(
    el("a", { href: "mailto:" + addr }, addr),
    ...S.contact.links.map((l) => el("a", ext(l.url), l.label)));

  // Focus areas, each pointing at the case files that show it
  $("focus-list").append(...S.focus_areas.map((f) =>
    el("div", { class: "focus-card" },
      el("h3", {}, f.title),
      el("p", {}, f.text),
      el("p", { class: "focus-refs" }, "see ", f.cases.flatMap((id, i) => [i ? ", " : "", el("a", { href: "#" + id }, id)])))));

  // Name: scramble-to-reveal once, unless the visitor prefers reduced motion
  const nameEl = $("name");
  nameEl.setAttribute("aria-label", S.name);
  if (reduceMotion) {
    nameEl.textContent = S.name;
  } else {
    const glyphs = "█▓▒░#$%&@01";
    let i = 0;
    nameEl.classList.add("cursor");
    (function tick() {
      nameEl.textContent = S.name.split("").map((c, j) =>
        j < i || c === " " ? c : glyphs[Math.floor(Math.random() * glyphs.length)]).join("");
      if (i <= S.name.length) { i += 0.35; setTimeout(tick, 40); }
      else setTimeout(() => nameEl.classList.remove("cursor"), 1800);
    })();
  }

  // Case files
  $("case-list").append(...S.cases.map((c) =>
    el("details", { class: "case", id: c.id },
      el("summary", {},
        el("div", { class: "case-head" },
          el("span", { class: "case-id" }, c.id, el("span", { class: "dim" }, "  " + c.period)),
          el("span", { class: "badge " + c.status }, c.status)),
        el("h3", { class: "case-title" }, c.title),
        el("div", { class: "case-row" }, "threat: ", el("b", {}, c.threat)),
        el("div", { class: "case-row" }, "result: ", el("b", {}, c.result)),
        el("div", { class: "case-more" }, "> open file")),
      el("div", { class: "case-body" },
        c.context ? el("p", { class: "case-context" }, c.context) : null,
        c.metrics && c.metrics.length ? el("dl", { class: "metrics" }, c.metrics.map((m) =>
          el("div", {}, el("dt", {}, m.v), el("dd", {}, m.l)))) : null,
        el("h4", { class: "case-sub" }, "what I built"),
        el("ul", {}, c.details.map((d) => el("li", {}, d))),
        c.deep && c.deep.length ? [el("h4", { class: "case-sub" }, "more detail"),
          el("ul", {}, c.deep.map((d) => el("li", {}, d)))] : null,
        el("ul", { class: "tags", "aria-label": "Tools and topics" }, c.tags.map((t) => el("li", {}, t))),
        c.links.length ? el("div", { class: "case-links" }, c.links.map((l) => el("a", ext(l.url), l.label))) : null))));

  // Log
  $("log-list").append(...S.log.map((p) =>
    el("li", {},
      el("span", { class: "date" }, p.date),
      el("span", {},
        p.url ? el("a", Object.assign({ class: "title" }, ext(p.url)), p.title) : el("span", { class: "title" }, p.title),
        el("span", { class: "venue" }, p.venue)),
      el("span", { class: "type" }, p.type))));

  // stack.yaml
  const yaml = $("stack-yaml");
  for (const [key, items] of Object.entries(S.stack)) {
    yaml.append(el("span", { class: "k" }, key + ":"), " ", el("span", { class: "p" }, "["),
      items.join(", "), el("span", { class: "p" }, "]"), "\n");
  }

  // Education
  $("edu-list").append(...S.education.map((e) =>
    el("li", {}, el("span", { class: "deg" }, e.degree), el("span", { class: "sch" }, e.school + " · " + e.year))));

  // Contact
  const rows = [["email", el("a", { href: "mailto:" + addr }, addr)],
    ...S.contact.links.map((l) => [l.label.toLowerCase(), el("a", ext(l.url), l.url.replace(/^https?:\/\/(www\.)?/, "").replace(/[?#].*$/, ""))])];
  $("contact-grid").append(...rows.map(([k, v]) => el("div", {}, el("dt", {}, k), el("dd", {}, v))));

  // Opening a case from a link (focus cards, #CASE-xxx) expands it
  function openFromHash() {
    const d = location.hash && document.getElementById(location.hash.slice(1));
    if (d && d.tagName === "DETAILS") { d.open = true; d.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); }
  }
  window.addEventListener("hashchange", openFromHash);
  openFromHash();

  // Keyboard: 1–6 jump to sections (ignored while typing or with modifiers)
  const order = ["about", "focus", "cases", "log", "stack", "contact"];
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || /input|textarea/i.test(e.target.tagName)) return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= order.length) $(order[n - 1]).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });

  // Highlight the nav item for the section in view
  const navLinks = [...document.querySelectorAll(".top nav a")];
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) {
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    }
  }, { rootMargin: "-40% 0px -55% 0px" });
  order.forEach((id) => io.observe($(id)));
})();
