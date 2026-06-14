# Before / after examples

Concrete specificity gain, not just buzzword substitution.

---

## Fake humanized — job hunt post (still slop)

Passes buzzword scan. Fails shape scan. This is what "de-slopped" AI often looks like.

**Before (fake humanized):**
> I got let go last month. No big scene, just a short call and suddenly I didn't have access to my files anymore.
>
> I'm job hunting now. So far I've sent about 47 applications and heard back from 11. Not amazing, but at least I know where I stand.
>
> The annoying part isn't the rejection emails (got one yesterday while I was stuck at self-checkout, which felt on brand). It's the in-between weeks where you're updating your CV again and pretending you're "excited about new opportunities" when mostly you're just tired.
>
> Two things that actually helped:
>
> I stopped sending generic "I'd love to connect" messages and only write to people when I have a real question about a role or team.
> I took "Open to work" off my profile headline. Kept the badge, lost the pep talk.

**After (actually de-slopped):**
> I got laid off last month on a 12-minute call. IT locked my laptop before I finished saying goodbye.
>
> Since then: 47 applications, 11 replies. One rejection pinged my phone at an Albertsons self-checkout.
>
> I'm rewriting my CV again this week. Took "Open to work" out of my headline because it was embarrassing. I only DM people when I have a question about the team or stack, not the usual connect message.

**Changelog:**
- Removed isn't-it's pivot ("The annoying part isn't… It's…")
- Removed lesson-list framing ("Two things that actually helped")
- Removed kept/lost aphorism and "felt on brand" wit
- Removed staccato setup ("No big scene, just…") and manufactured balance ("Not amazing, but at least…")
- Kept the real numbers (47, 11) and the self-checkout detail

---

## Em dashes (hard ban)

**Before:**
> AI tools — including writing assistants — generate outputs that require — at minimum — human review before you publish.

**After:**
> AI writing assistants need a human review before you publish. That includes first drafts, not just final copy.

**Changelog:** Removed four em dashes; split into two plain sentences.

---

## Delvish cluster + hedging verbs

**Before:**
> Let's delve into the robust landscape of content marketing. This approach ensures quality while fostering engagement and highlights the intricate tapestry of modern workflows.

**After:**
> Content marketing here means one editor, a shared Notion board, and a 48-hour review window before anything goes live.

**Changelog:** Cut delve/robust/landscape/tapestry cluster; replaced ensures/highlights with a concrete process.

---

## Prose — email (opener + closer slop)

**Before:**
> In today's fast-paced world, staying on top of project updates can feel overwhelming. I wanted to reach out and share some thoughts on how we might streamline communication going forward. At the end of the day, clear channels matter. Thoughts?

**After:**
> Quick ask: can we move standup notes into the `#eng-updates` channel by Monday? Right now status lives in three threads and I missed the deploy window twice this month.

**Changelog:** Removed fast-paced opener and "Thoughts?" bait; replaced vague "streamline communication" with one channel and a concrete failure mode.

---

## Prose — essay (aphoristic cadence)

**Before:**
> Not a failure. A lesson. We tried the rebrand in Q2. Just timing. No budget. Wrong audience. The team learned. Character gets built in the cleanup.

**After:**
> We killed the rebrand in Q2 after signups dropped 12% in the test market. The logo work was fine; we were selling to agencies that already had a vendor locked in for the year.

**Changelog:** Broke manufactured contrast pairs; added quarter, metric, and actual reason.

---

## Docs — README (throat-clearing intro)

**Before:**
> # LoopCheck
>
> Welcome to LoopCheck! In this README, we will explore how LoopCheck empowers musicians to streamline their practice workflow and unlock their full potential.
>
> ## Installation
> Let's dive into installation...

**After:**
> # LoopCheck
>
> CLI that scores timing drift on a guitar loop (WAV in, JSON report out).
>
> ## Installation
> ```bash
> npm install -g loopcheck
> ```

**Changelog:** H1 no longer repeated in intro; "Let's dive into" removed; install command added.

---

## Docs — API (hedge stack)

**Before:**
> It's important to note that the `/export` endpoint returns CSV. Furthermore, rate limits apply. Additionally, you should use pagination for large datasets.

**After:**
> `GET /export` returns CSV. Rate limit: 60 requests/minute. Use `?cursor=` when the response includes `next_cursor`.

**After changelog:** Three hedge phrases → three facts with numbers and a parameter name.

---

## Marketing — hero (buzzword stack)

**Before:**
> **Streamline your workflow. Empower your team.**
> LoopCheck is a next-generation, cutting-edge platform built for the modern musician. Seamlessly integrate practice into your daily routine.

**After:**
> **See which bars rush before you record.**
> Upload a 30-second loop; get bar-by-bar timing drift in under 5 seconds. Works offline after the first run.

**Changelog:** Replaced verb stack with one benefit and two falsifiable claims.

---

## Marketing — features (uniform triplets)

**Before:**
> - We help you practice smarter every day
> - We help you track your progress effortlessly
> - We help you achieve your musical goals

**After:**
> - Marks bars that land more than 15ms early
> - Saves your last 20 loops locally
> - Exports a PDF summary for your teacher

**Changelog:** Parallel "We help you" grammar broken; each bullet names a different capability.

---

## Social — LinkedIn (engagement bait)

**Before:**
> Here's the thing: leadership isn't about titles. It's about impact. Let me be clear — the best leaders listen. At the end of the day, culture wins. Agree?

**After:**
> We stopped doing consensus meetings for reversals. If a lead owns the metric, they can ship a rollback in an hour without a quorum. Escalations dropped from 4/month to 1.

**Changelog:** Removed LinkedIn slop phrases; swapped abstraction for one policy and a number.

---

## Meta AI voice (gate blocker)

**Before:**
> Great question! I'd be happy to walk you through the setup. Certainly! I hope this helps.

**After:**
> Run `npm install`, then copy `.env.example` to `.env` and set `API_KEY`.

**Changelog:** Deleted assistant-voice filler; kept only steps.

---

## Social — linktwerk output (scanner upgrade target)

**Before (linktwerk; scan used to score 4/4):**
> Screen share froze mid-interview on a tab I'd forgotten to close.
> A 2024 Stack Overflow survey found most devs spend more search time proving they can code than actually coding.
> Signals I ignored:
> - LeetCode without a target stack is anxiety with badges
> I mean that literally.
> Tag someone who needs to hear they're still employable.
> #SoftwareDeveloper #OpenToWork #DevJobs #TechCareers #JobSearch #BuildInPublic #CodingLife #Engineering #HiringDevelopers

**After (de-slopped with social register):**
> I'm looking for a software developer role. Left my last job in March after three years of backend work.
> Job search so far: lots of applications, not many replies. One interview went sideways when screen share opened the wrong tab and my resume PDF wouldn't load.
> If you're hiring (backend, full-stack, platform), my DMs are open.

**Changelog:**
- Removed fake Stack Overflow stat and hashtag wall
- Collapsed arrow/takeaway list into plain sentences
- Cut punch-pause and tag-someone engagement bait
- Kept screen-share and PDF details (real specificity)

---

## Czech email — outreach (email-cs register)

**Before:**
> Dobrý den, Jane,
> už delší dobu sleduji CZEXPERIMENT a moc se mi líbí, co budujete.
> Rád bych se zeptal, jestli by byla možnost se nějak zapojit…
> Je mi 18 let, zajímám se o technologie, AI a tvorbu obsahu a rád se učím nové věci.
> Děkuji za váš čas a přeji hodně úspěchů s CZEXPERIMENTEM.

**After:**
> Dobrý den, Jane,
> CZEXPERIMENT sleduju delší dobu a baví mě, jak děláte obsah. Chtěl bych se zeptat, jestli by u vás šlo pomoct kolem natáčení, klidně nejdřív jen občas.
> Je mi 18 let. Baví mě technologie, AI a tvorba obsahu. Dejte mi prosím vědět, jestli je to u vás reálné.
> Díky, Vít

**Changelog:**
- Odstraněna šablona na závěr a prázdné „rád se učím nové věci"
- Zkráceno vysvětlování; jeden konkrétní ask (natáčení)
- Pochvala bez detailu → konkrétní oblast (obsah / natáčení)
