/* EDIT HERE: all site content lives in this object. Replace placeholders with verified information.
   To let parish members update it without code, move it into a headless CMS (see notes). */
const SITE = {
   email: "parish-email@example.org", social: {}, /* e.g. {Facebook:"https://…"} */
   leaders: ["Parish Priest / Spiritual Director", "President", "Vice-President", "Secretary", "Joint Secretary", "Treasurer", "Executive Committee Member"],
   activities: [["Holy Mass and worship", "Gathering for the Church’s worship and sacraments."], ["Prayer meetings", "Time set apart for shared prayer."], ["Youth fellowship", "Regular meetings to build friendships and faith."], ["Bible study", "Reading and discussing Scripture together."], ["Retreats and spiritual formation", "Days away for reflection and renewal."], ["Choir and music", "Leading the congregation in song."], ["Charity and social service", "Practical help for those in need."], ["Community outreach", "Reaching out to neighbours and families."], ["Cultural programmes", "Celebrating faith through arts and culture."], ["Youth conventions", "Joining young people from across the diocese."]],
   events: [["Event title (placeholder)", "Youth fellowship gathering", "A sample description of what happens at this event."], ["Event title (placeholder)", "Prayer and Bible study evening", "A sample description of what happens at this event."], ["Event title (placeholder)", "Community service day", "A sample description of what happens at this event."], ["Event title (placeholder)", "Youth retreat", "A sample description of what happens at this event."]],
   gallery: [["Parish celebrations", "Parish celebration"], ["Youth gatherings", "Youth gathering"], ["Retreats", "Retreat"], ["Church festivals", "Church festival"], ["Charity activities", "Charity activity"], ["Group photographs", "Group photograph"], ["Youth gatherings", "Youth gathering"], ["Parish celebrations", "Parish celebration"]],
   notices: [["Parish announcement", "Short summary of the announcement goes here."], ["Meeting schedule", "Short summary of the next meeting goes here."], ["Registration notice", "Short summary of the registration details goes here."]]
};
const $ = s => document.querySelector(s);
$("#yr").textContent = new Date().getFullYear();
$("#menuBtn").onclick = e => { const o = $("#nav").classList.toggle("open"); e.currentTarget.setAttribute("aria-expanded", o) };
$("#nav").addEventListener("click", e => { if (e.target.tagName === "A") { $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false") } });
const mail = `<a href="mailto:${SITE.email}">${SITE.email}</a> (placeholder)`;
$("#cEmail").innerHTML = mail; $("#fEmail").innerHTML = mail;
const soc = Object.entries(SITE.social).map(([k, v]) => `<a href="${v}" rel="noopener">${k}</a>`).join(" · ") || "Links will appear here once provided.";
$("#cSocial").innerHTML = soc; $("#fSocial").innerHTML = soc;
$("#leaders").innerHTML = SITE.leaders.map(r => `<div class="card person"><span class="ph">Placeholder</span><div class="avatar">Photo</div><h3>Name to be added</h3><b>${r}</b><p>Short description to be added.</p></div>`).join("");
$("#acts").innerHTML = SITE.activities.map(a => `<div class="card act"><h3>${a[0]}</h3><p>${a[1]}</p></div>`).join("");
let all = false;
function evs() {
   const l = all ? SITE.events : SITE.events.slice(0, 3);
   $("#evs").innerHTML = l.length ? l.map(e => `<article class="card ev"><span class="ph">Placeholder</span><h3>${e[1]}</h3><p class="meta">Date and time to be announced<span>Venue to be announced</span></p><p style="margin-top:10px">${e[2]}</p><p style="margin-top:12px"><a href="#contact"><b>Contact us to register</b></a></p></article>`).join("") : `<p>No events are scheduled right now. Please check back soon.</p>`;
   $("#evMore").textContent = all ? "Show fewer events" : "View All Events"; $("#evMore").hidden = SITE.events.length <= 3
}
$("#evMore").onclick = () => { all = !all; evs() }; evs();
const cats = ["All", ...new Set(SITE.gallery.map(g => g[0]))]; let cur = "All", vis = [], idx = 0;
function gal() {
   $("#filters").innerHTML = cats.map(c => `<button type="button" aria-pressed="${c === cur}">${c}</button>`).join("");
   vis = SITE.gallery.filter(g => cur === "All" || g[0] === cur);
   $("#gal").innerHTML = vis.length ? vis.map((g, i) => `<button class="tile" type="button" data-i="${i}" aria-label="Enlarge photo: ${g[1]} (placeholder)">${g[1]}<small>Placeholder photo</small></button>`).join("") : "<p>No photographs in this category yet.</p>"
}
$("#filters").onclick = e => { if (e.target.tagName === "BUTTON") { cur = e.target.textContent; gal() } };
const lb = $("#lb");
function show() { const g = vis[idx]; $("#lbImg").innerHTML = `<div><b style="font-size:22px">${g[1]}</b><br>Placeholder photo. Replace with a real parish photograph.</div>`; $("#lbCap").textContent = `${g[0]} · ${idx + 1} of ${vis.length}` }
$("#gal").onclick = e => { const t = e.target.closest(".tile"); if (t) { idx = +t.dataset.i; show(); lb.showModal() } };
$("#lbPrev").onclick = () => { idx = (idx - 1 + vis.length) % vis.length; show() };
$("#lbNext").onclick = () => { idx = (idx + 1) % vis.length; show() };
$("#lbClose").onclick = () => lb.close();
lb.addEventListener("click", e => { if (e.target === lb) lb.close() });
lb.addEventListener("keydown", e => { if (e.key === "ArrowLeft") $("#lbPrev").click(); if (e.key === "ArrowRight") $("#lbNext").click() });
gal();
$("#notes").innerHTML = SITE.notices.map(n => `<details class="card"><summary><span class="ph">Placeholder</span><h3>${n[0]}</h3><small>Publication date to be added</small><p style="margin:6px 0 8px">${n[1]}</p><u>Read more</u></summary><p>Full notice text goes here once the parish provides it.</p></details>`).join("") || "<p>No notices at the moment.</p>";
$("#form").addEventListener("submit", e => {
   e.preventDefault(); const f = e.target, v = k => f[k].value.trim();
   const er = { name: v("name") ? "" : "Please enter your name.", email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email")) ? "" : "Please enter a valid email address.", subject: v("subject") ? "" : "Please enter a subject.", msg: v("message").length >= 10 ? "" : "Please write a message of at least 10 characters." };
   let bad = null; for (const k in er) { $("#e-" + k).textContent = er[k]; if (er[k] && !bad) bad = k }
   if (bad) { $("#ok").textContent = ""; f[bad === "msg" ? "message" : bad].focus(); return }
   /* Integration point: no server is connected. Replace this with a POST to a form service
      (Formspree, Netlify Forms, or your own API) once the parish chooses one. Until then the message opens in the visitor’s email app. */
   location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(v("subject"))}&body=${encodeURIComponent(v("message") + "\n\n" + v("name") + " (" + v("email") + ")")}`;
   $("#ok").textContent = "Your email app should open with the message ready to send."
});
/* ---- motion and interaction ---- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); setTimeout(() => e.target.style.removeProperty("--d"), 1500) } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
function reveal() { document.querySelectorAll(".hd,.two>div,.card,.tile,.filters,.map,#form,.contact dl").forEach(el => { if (el.dataset.r) return; el.dataset.r = 1; el.classList.add("rv"); el.style.setProperty("--d", Math.min([...el.parentElement.children].indexOf(el), 6) * 80 + "ms"); io.observe(el) }) }
reveal(); new MutationObserver(reveal).observe(document.body, { childList: true, subtree: true });
const bar = $("#prog"), hdr = $("header"), toTop = $("#toTop"); let tick = false;
function onS() { const y = scrollY, h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`; hdr.classList.toggle("scrolled", y > 20); toTop.classList.toggle("show", y > 700); tick = false }
addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(onS) } }, { passive: true }); onS();
toTop.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
const links = [...document.querySelectorAll("#nav a")];
const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => { const on = a.getAttribute("href") === "#" + e.target.id; a.classList.toggle("active", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current") }) }), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => so.observe(s));
const mb = $("#menuBtn"), sync = () => { mb.textContent = mb.getAttribute("aria-expanded") === "true" ? "Close" : "Menu" };
mb.addEventListener("click", sync); $("#nav").addEventListener("click", sync);
addEventListener("keydown", e => { if (e.key === "Escape" && $("#nav").classList.contains("open")) { $("#nav").classList.remove("open"); mb.setAttribute("aria-expanded", "false"); sync(); mb.focus() } });
const bq = $(".verse blockquote"), tn = bq.firstChild;
if (tn && tn.nodeType === 3) {
   const f = document.createDocumentFragment(); tn.textContent.trim().split(/\s+/).forEach((w, i) => { const s = document.createElement("span"); s.className = "w"; s.textContent = w; s.style.transitionDelay = i * 70 + "ms"; f.appendChild(s) }); bq.replaceChild(f, tn);
   const vo = new IntersectionObserver(es => { if (es[0].isIntersecting) { $(".verse").classList.add("in"); vo.disconnect() } }, { threshold: .4 }); vo.observe(bq)
}
const hi = $(".hero img"), hs = $(".hero");
if (matchMedia("(hover:hover)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
   hi.style.transition = "transform .15s ease-out";
   hs.addEventListener("pointermove", e => { const r = hi.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; hi.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)` });
   hs.addEventListener("pointerleave", () => { hi.style.transform = "" })
}
$("#form").addEventListener("submit", () => { ["name", "email", "subject", "msg"].forEach(k => { const i = $("#f-" + k), bad = $("#e-" + k).textContent; i.setAttribute("aria-invalid", bad ? "true" : "false"); if (bad) { i.classList.remove("shake"); void i.offsetWidth; i.classList.add("shake") } }) });
