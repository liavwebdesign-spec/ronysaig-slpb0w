/* רוני סאיג · עמוד הבית. כל ההתנהגות כאן, בלי ספריות. בלי JS התוכן מוצג במצב הסופי שלו. */
(function () {
  "use strict";
  var doc = document.documentElement;
  var RM = matchMedia("(prefers-reduced-motion: reduce)").matches || doc.classList.contains("a11y-still");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var WA = "972503355173";

  /* ---------- קהלים לרימרקטינג: כל בחירה באתר נשלחת כאירוע לפיקסל (מטא וגוגל), כשהם מותקנים ---------- */
  function track(name, data) {
    try {
      (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, data || {}));
      if (window.fbq) window.fbq("trackCustom", name, data || {});
    } catch (e) {}
  }
  function wa(text) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text); }

  /* ---------- מגירת הטלפון (MV:b66) ---------- */
  function drawer(root, burger) {
    var panel = root.querySelector(".md-panel"), scrim = root.querySelector(".md-scrim"), closeBtn = root.querySelector(".md-close"), last = null;
    root.querySelectorAll(".md-item").forEach(function (el, i) { el.style.setProperty("--i", i); });
    panel.inert = true;
    function set(open) {
      root.classList.toggle("open", open);
      panel.inert = !open;
      burger.setAttribute("aria-expanded", String(open));
      $("#hd").classList.toggle("menu-open", open);
      doc.style.scrollbarGutter = open ? "stable" : "";
      doc.style.overflow = open ? "hidden" : "";
      if (open) { last = document.activeElement; setTimeout(function () { closeBtn.focus(); }, 180); }
      else { var to = (last && last !== document.body) ? last : burger; to.focus({ preventScroll: true }); }
    }
    burger.addEventListener("click", function () { set(!root.classList.contains("open")); });
    closeBtn.addEventListener("click", function () { set(false); });
    scrim.addEventListener("click", function () { set(false); });
    root.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
    addEventListener("keydown", function (e) {
      if (!root.classList.contains("open")) return;
      if (e.key === "Escape") { set(false); return; }
      if (e.key !== "Tab") return;
      var f = Array.prototype.filter.call(panel.querySelectorAll("a,button"), function (x) { return x.offsetParent !== null; });
      var i = f.indexOf(document.activeElement);
      var n = e.shiftKey ? (i <= 0 ? f.length - 1 : i - 1) : (i === f.length - 1 ? 0 : i + 1);
      e.preventDefault(); f[n].focus();
    });
  }

  /* ---------- headroom (library/headers.md): נעלם בגלילה מטה, חוזר בתנועה הראשונה מעלה ---------- */
  function headroom(el) {
    var tol = 6, last = scrollY, raf = 0;
    function upd() {
      raf = 0;
      var y = scrollY, d = y - last, top = el.offsetHeight + 24;
      el.classList.toggle("is-scrolled", y > 8);
      var hold = el.classList.contains("menu-open") || !!el.querySelector(":focus-visible");
      if (y <= top || hold) { el.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(d) < tol) return;
      el.classList.toggle("is-hidden", d > 0);
      last = y;
    }
    addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
    el.addEventListener("focusin", upd);
    upd();
  }

  drawer($("#md"), $(".burger"));
  headroom($("#hd"));
  $(".skip").addEventListener("click", function (e) { e.preventDefault(); var m = $("#main"); m.focus({ preventScroll: true }); m.scrollIntoView(); });
  // קישורים בתוך העמוד גוללים בעדינות. לא ב-CSS על ה-html, כדי שגלילה מתוכנתת (וכלי הבדיקה) תישאר מיידית
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a || a.classList.contains("skip")) return;
    var id = a.getAttribute("href").slice(1), t = id && document.getElementById(id); if (!t) return;
    e.preventDefault(); t.scrollIntoView({ behavior: RM ? "auto" : "smooth" });
    if (history.replaceState) history.replaceState(null, "", "#" + id);
  });

  /* ---------- פתיחת העמוד: ההדר, ואז אריחי לוח ההירו נכנסים בדירוג (MV:g13) ---------- */
  function opening() {
    if (!doc.classList.contains("open-anim")) return;
    var E = "cubic-bezier(.2,.6,.2,1)";
    $("#hd").animate([{ opacity: 0, translate: "0 -18px" }, { opacity: 1, translate: "0 0" }], { duration: 600, easing: E, fill: "backwards" });
    $$(".board-hero .tile").forEach(function (t, i) {
      t.animate([{ opacity: 0, translate: "0 28px", scale: ".97" }, { opacity: 1, translate: "0 0", scale: "1" }], { delay: 140 + i * 90, duration: 700, easing: E, fill: "backwards" });
    });
    doc.classList.remove("open-anim");
  }
  opening();

  /* ---------- reveal (engine/motion.md 2): קסקדה בתוך כל סקשן ---------- */
  $$("section").forEach(function (sec) { $$(".reveal", sec).forEach(function (el, i) { el.style.setProperty("--i", Math.min(i, 5)); }); });
  var reveals = $$(".reveal");
  if (!RM && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else reveals.forEach(function (el) { el.classList.add("is-in"); });

  /* ---------- ?notes: שורות שמחכות לאישור רוני מקבלות קו מקווקו (לליאב; בכתובת הרגילה לא רואים) ---------- */
  if (/[?&]notes(=|&|$)/.test(location.search)) document.documentElement.classList.add("show-notes");

  /* ---------- 01: רגע החתימה של V3. הדלת שבוחרים מתהפכת ומראה בגב שלה מה רלוונטי ---------- */
  var doors = $$(".door");
  // ההיפוך: חצי סיבוב עד שהאריח עומד על הצד, החלפת הפנים, וחצי סיבוב חזרה. במנוחה תמיד פנים אחד בלבד
  function turn(tile, on) {
    var flip = tile.querySelector(".flip"), front = tile.querySelector(".front"), back = tile.querySelector(".back");
    var swap = function () { front.hidden = on; back.hidden = !on; tile.classList.toggle("is-on", on); if (on) back.removeAttribute("inert"); else back.setAttribute("inert", ""); };
    if (RM || tile.classList.contains("is-on") === on) { swap(); return; }
    var dir = on ? 1 : -1, E = "cubic-bezier(.76,0,.24,1)";
    flip.animate([{ transform: "perspective(1000px) rotateY(0deg)" }, { transform: "perspective(1000px) rotateY(" + (90 * dir) + "deg)" }], { duration: 260, easing: E }).onfinish = function () {
      swap();
      flip.animate([{ transform: "perspective(1000px) rotateY(" + (-90 * dir) + "deg)" }, { transform: "perspective(1000px) rotateY(0deg)" }], { duration: 320, easing: "cubic-bezier(.2,.6,.2,1)" });
    };
  }
  function choose(k, quiet) {
    doors.forEach(function (b) { var on = b.dataset.side === k; b.setAttribute("aria-pressed", String(on)); turn(b.closest(".t-door"), on); });
    $$(".gate").forEach(function (g) { g.classList.toggle("is-mine", g.dataset.gate === k); });
    if (k) try { localStorage.setItem("rony-side", k); } catch (e) {}
    if (!quiet && k) { track(k === "biz" ? "side_business" : "side_private"); var fb = $("#back-" + k + " .btn"); if (fb) setTimeout(function () { fb.focus({ preventScroll: true }); }, RM ? 0 : 650); }
  }
  doors.forEach(function (b) { b.addEventListener("click", function () { choose(b.dataset.side); }); });
  // "חזרה" בגב הדלת: שתי הדלתות חוזרות לפנים, והפוקוס חוזר לדלת שנבחרה
  $$(".d-back").forEach(function (x) {
    x.addEventListener("click", function () {
      var d = x.closest(".t-door").querySelector(".door");
      choose(null, true);
      try { localStorage.removeItem("rony-side"); } catch (e) {}
      setTimeout(function () { d.focus({ preventScroll: true }); }, RM ? 0 : 650);
    });
  });
  $$(".face.back").forEach(function (x) { x.setAttribute("inert", ""); });

  /* ---------- פנס הסמן על האריחים ---------- */
  if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
    $$(".tile").forEach(function (t) {
      t.addEventListener("pointermove", function (e) { var r = t.getBoundingClientRect(); t.style.setProperty("--mx", (e.clientX - r.left) + "px"); t.style.setProperty("--my", (e.clientY - r.top) + "px"); });
    });
  }

  /* ---------- מונים (MV:b02): הערך הסופי כתוב ב-HTML ---------- */
  var counters = $$("[data-count]");
  if (!RM && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return; cio.unobserve(e.target);
        var el = e.target, to = +el.getAttribute("data-count"), t0 = performance.now();
        (function f(now) { var k = Math.min(1, (now - t0) / 1100), v = 1 - Math.pow(1 - k, 3); el.textContent = String(Math.round(to * v)); if (k < 1) requestAnimationFrame(f); })(t0);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- מחשבון חלון 90 הימים ---------- */
  var cd = $("#calc-d");
  if (cd) {
    var out = $("#calc-out"), fill = $("#calc-fill");
    var fmt = function (d) { return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear(); };
    cd.max = new Date().toISOString().slice(0, 10);
    cd.addEventListener("change", function () {
      if (!cd.value) return;
      var end = new Date(cd.value + "T00:00:00"), last = new Date(end); last.setDate(last.getDate() + 90);
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var left = Math.round((last - today) / 864e5), used = Math.min(90, Math.max(0, 90 - left));
      out.textContent = left > 0 ? "נשארו " + left + " ימים. החלון נסגר ב-" + fmt(last) + "." : "החלון של 90 יום נסגר ב-" + fmt(last) + ". שווה לבדוק מה עוד אפשר לעשות.";
      fill.style.setProperty("--k", (used / 90).toFixed(3));
      track("calc_90", { left: left });
    });
  }

  /* ---------- 05: בדיקת מצב. שאלה אחת בכל מסך, ובסוף רשימה וואטסאפ עם הודעה ממולאת ---------- */
  var quiz = $("#quiz");
  if (quiz) {
    var panel = $("#q-panel"), count = $("#q-count"), back = $(".q-back", quiz), prog = $$(".q-prog i", quiz);
    var Q = [
      { k: "stage", t: "איפה אתם עומדים?", o: [["hearing", "קיבלתי זימון לשימוע"], ["fired", "כבר פוטרתי"], ["offer", "הציעו לי הסכם פרישה"]] },
      { k: "equity", t: "יש לכם אופציות, RSU או ESPP?", o: [["yes", "כן"], ["no", "לא"], ["unsure", "צריך לבדוק"]] },
      { k: "when", t: "מתי זה קרה?", o: [["days", "בימים האחרונים"], ["weeks", "לפני כמה שבועות"], ["month", "לפני יותר מחודש"]] }
    ];
    var LINES = {
      hearing: "<b>לפני השימוע:</b> לרוב יש רק ימים ספורים להשיב לטענות שבזימון. מותר לכם להגיע לשימוע עם עורך דין, וכדאי להתחיל להתכונן עכשיו.",
      fired: "<b>אחרי הפיטורים:</b> לפני שמסכמים תנאי סיום, כדאי לבדוק את תקופת ההודעה המוקדמת, את הפיצויים ואת מה שמגיע לכם לפי ההסכם.",
      offer: "<b>הסכם פרישה:</b> לא חותמים על Separation Agreement לפני ייעוץ. ניסוח לא נכון יכול לפגוע בדמי האבטלה או לכבול אתכם בסעיף אי-תחרות.",
      yes: "<b>אופציות ו-RSU:</b> אופציות שהבשילו צריך בדרך כלל לממש תוך 90 יום מסיום ההעסקה, אחרת הן עלולות לפקוע. ומכירת מניות לפני שעברו 24 חודשים ממועד ההקצאה יכולה להעלות מאוד את המס (סעיף 102).",
      unsure: "<b>תוכנית התגמול:</b> שווה להוציא את מסמכי האופציות או ה-RSU עוד לפני השיחה, כי שם כתובים המועדים.",
      month: "<b>הזמן עובר:</b> עבר יותר מחודש, וחלק מהמועדים אולי כבר מתקרבים לסיום. כדאי לבדוק אותם השבוע."
    };
    var SAY = {
      hearing: "קיבלתי זימון לשימוע", fired: "פוטרתי", offer: "הציעו לי הסכם פרישה",
      yes: "יש לי אופציות או RSU", no: "אין לי אופציות", unsure: "צריך לבדוק אם יש לי אופציות",
      days: "וזה קרה בימים האחרונים", weeks: "וזה קרה לפני כמה שבועות", month: "וזה קרה לפני יותר מחודש"
    };
    var ans = {}, step = 0;
    function swapTo(html, after) {
      panel.classList.add("swapping");
      setTimeout(function () { panel.innerHTML = html; panel.classList.remove("swapping"); if (after) after(); }, RM ? 0 : 220);
    }
    function head(i) {
      count.textContent = i < 3 ? "שאלה " + (i + 1) + " מתוך 3" : "התוצאה";
      prog.forEach(function (d, j) { d.classList.toggle("on", j <= Math.min(i, 2)); });
      back.hidden = i === 0;
    }
    function render(i, focus) {
      step = i; head(i);
      if (i >= 3) return result();
      var q = Q[i];
      swapTo('<p class="q-title" id="q-title" tabindex="-1">' + q.t + '</p><div class="q-opts" role="group" aria-labelledby="q-title">' +
        q.o.map(function (o) { return '<button class="q-opt" type="button" aria-pressed="' + (ans[q.k] === o[0]) + '" data-v="' + o[0] + '">' + o[1] + "</button>"; }).join("") + "</div>",
        function () { if (focus) $("#q-title", panel).focus({ preventScroll: true }); });
    }
    function result() {
      var lines = [LINES[ans.stage]];
      if (ans.equity === "yes" || ans.equity === "unsure") lines.push(LINES[ans.equity]);
      if (ans.when === "month") lines.push(LINES.month);
      var msg = "היי רוני, " + SAY[ans.stage] + ", " + SAY[ans.equity] + ", " + SAY[ans.when] + ". אשמח לדבר.";
      swapTo('<div class="result"><h3 id="q-res" tabindex="-1">מה חשוב לבדוק אצלכם</h3><ul>' + lines.map(function (l) { return "<li><span>" + l + "</span></li>"; }).join("") + "</ul>" +
        '<a class="btn btn-lg" data-wa-done href="' + wa(msg) + '" target="_blank" rel="noopener"><svg class="ic" aria-hidden="true"><use href="#i-whatsapp"/></svg>לשלוח לי את המצב בוואטסאפ</a>' +
        '<p class="fine">ההודעה כבר כוללת את התשובות, אז לא צריך להסביר מההתחלה.</p>' +
        '<p class="fine">המידע כאן כללי ואינו ייעוץ משפטי. כל מקרה נבדק לגופו.</p></div>',
        function () {
          $("#q-res", panel).focus({ preventScroll: true });
          $("[data-wa-done]", panel).addEventListener("click", function () { track("check_whatsapp", ans); });
        });
      track("check_done", ans);
    }
    panel.addEventListener("click", function (e) {
      var b = e.target.closest(".q-opt"); if (!b) return;
      var q = Q[step]; ans[q.k] = b.dataset.v;
      $$(".q-opt", panel).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      track("check_answer", { q: q.k, a: b.dataset.v });
      setTimeout(function () { render(step + 1, true); }, RM ? 0 : 180);
    });
    back.addEventListener("click", function () { render(Math.max(0, step - 1), true); });
  }

  /* ---------- וואטסאפ: הודעה מוכנה בכל כפתור, ואירוע לפיקסל ---------- */
  function bindWa(scope) {
    $$("[data-wa]", scope).forEach(function (a) {
      if (a.dataset.bound) return; a.dataset.bound = "1";
      if (a.getAttribute("href").indexOf("?text=") < 0) a.href = wa("היי רוני, הגעתי מהאתר ואשמח לדבר.");
      a.target = "_blank"; a.rel = "noopener";
      a.addEventListener("click", function () { track("whatsapp_click"); });
    });
  }
  bindWa(document);

  /* ---------- 07: הטופס. בסקיצה הוא לא שולח; בבנייה הוא נשמר במסד ושולח מייל ---------- */
  var form = $("#lead");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = $("#f-msg"), bad = null;
    $$("[required]", form).forEach(function (f) {
      var ok = f.type === "checkbox" ? f.checked : f.value.trim().length > 1;
      f.setAttribute("aria-invalid", String(!ok)); if (!ok && !bad) bad = f;
    });
    if (bad) { msg.dataset.state = "err"; msg.textContent = bad.type === "checkbox" ? "צריך לאשר את מדיניות הפרטיות כדי שאוכל לחזור אליכם." : "חסר שם או טלפון."; bad.focus(); return; }
    msg.dataset.state = "ok"; msg.textContent = "שולח…";
    track("lead_business");
    // בסקיצה אין שרת: עוברים לעמוד התודה, שבו נורית ההמרה. בבנייה הפנייה נשמרת במסד ושולחת מייל לפני המעבר
    location.href = form.getAttribute("action");
  });

  /* ---------- כשחוזרים לאתר: הצד שנבחר בפעם הקודמת כבר מסומן ---------- */
  try { var prev = localStorage.getItem("rony-side"); if (prev) { var pb = $('.door[data-side="' + prev + '"]'); if (pb) choose(prev, true); } } catch (e) {}

  /* ---------- פס הפעולה בטלפון: אחרי ההירו, ולא ליד הסוגר שיש בו את אותם כפתורים ---------- */
  var bar = $("#mbar");
  if (bar && "IntersectionObserver" in window) {
    var past = false, near = {};
    var seen = new Set();
    var bset = function () { bar.classList.toggle("is-on", past && !near.talk && !near.ft && !seen.size); };
    new IntersectionObserver(function (en) { past = !en[0].isIntersecting; bset(); }).observe($(".hero"));
    // יורד כשהסוגר (אותן פעולות) או הפוטר על המסך
    [["talk", "#talk"], ["ft", ".ft"]].forEach(function (x) {
      new IntersectionObserver(function (en) { near[x[0]] = en[0].isIntersecting; bset(); }, { rootMargin: "0px 0px -10% 0px" }).observe($(x[1]));
    });
    // וגם כשכפתור עם אותה פעולה (פגישת ייעוץ או וואטסאפ) נמצא על המסך בתוך העמוד
    var dup = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target); }); bset();
    });
    $$('main a.btn[href="#talk"], main [data-wa]').forEach(function (b) { if (!b.closest(".hero")) dup.observe(b); });
  }

  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
