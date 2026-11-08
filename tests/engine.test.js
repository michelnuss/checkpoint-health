// Offline tests for Checkpoint's fixed rules. No API key needed.
// Run: node tests/engine.test.js
const assert = require("assert");
const loadEngine = require("./load-engine");

let passed = 0;
function test(name, fn) {
  const { run } = loadEngine();
  try { fn(run); passed++; console.log("  ok   " + name); }
  catch (e) { console.log("  FAIL " + name + "\n       " + e.message); process.exitCode = 1; }
}

console.log("Checkpoint engine tests");

test("clean answers fit the text-visit protocol", run => {
  run(`S = freshState("maria"); Engine.screenNext();`);
  for (const a of ["Female", "18 to 64", "None of these", "Less than 2 days", "None", "None of these"]) run(`Engine.screenNext(${JSON.stringify(a)})`);
  assert.strictEqual(run("S.disposition"), "async");
  assert.strictEqual(run("S.phase"), "result");
});

test("fever and back pain stop screening at once and send her in person", run => {
  run(`S = freshState("ana"); Engine.screenNext(); Engine.screenNext("Female"); Engine.screenNext("18 to 64");`);
  const r = run(`Engine.screenNext("Fever of 100.4°F or chills, Pain in your back or side")`);
  assert.strictEqual(r.disposition, "in_person");
  assert.deepStrictEqual([...r.red_flags], ["Fever or chills", "Flank pain"]);
  assert.strictEqual(run("Engine.listClinicians().type"), "error", "no clinicians after a red flag");
});

test("every single red flag on its own routes in person", run => {
  const flags = ["Fever of 100.4°F or chills", "Pain in your back or side", "Vomiting", "Could be pregnant", "Blood in your urine"];
  for (const f of flags) {
    run(`S = freshState("maria"); Engine.screenNext(); Engine.screenNext("Female"); Engine.screenNext("18 to 64");`);
    assert.strictEqual(run(`Engine.screenNext(${JSON.stringify(f)}).disposition`), "in_person", f);
  }
});

test("free-text answers are matched, not guessed", run => {
  run(`S = freshState("maria"); Engine.screenNext();`);
  assert.strictEqual(run(`Engine.screenNext("I'm a woman").type`), "question");
  assert.deepStrictEqual([...run(`S.answers.sex.vals`)], ["Female"]);
  assert.strictEqual(run(`Engine.screenNext("34").type`), "question");
  assert.deepStrictEqual([...run(`S.answers.age.vals`)], ["18 to 64"]);
  const r = run(`Engine.screenNext("I really don't know")`);
  assert.ok(r.error, "unclear answer must return an error, not a guess");
  assert.strictEqual(r.question_id, "red", "stays on the same question");
});

// Regression tests for the parser fixes after the first held-out eval (S33, S17, S04, S11, S06).
// Written as new phrasings, not copies of the eval cases, so the eval stays a fair test.
const read = (run, qid, text) => {
  const v = run(`Engine.parse(DATA.questions.find(q => q.id === ${JSON.stringify(qid)}), ${JSON.stringify(text)})`);
  return v ? [...v] : null;
};

test("a 'no, but' answer with a temperature is a fever, never 'None of these'", run => {
  assert.deepStrictEqual(read(run, "red", "nah, though I had 100.9 this morning"), ["Fever of 100.4°F or chills"]);
  assert.deepStrictEqual(read(run, "red", "no but my temp was 38.5 C"), ["Fever of 100.4°F or chills"]);
  assert.strictEqual(read(run, "red", "no, but something else is going on"), null, "unexplained content means ask again");
  assert.strictEqual(read(run, "red", "100"), null, "below 100.4 is not a fever, and not a 'none' either");
});

test("negations clear only the symptoms they cover", run => {
  assert.deepStrictEqual(read(run, "red", "no vomiting, no fever"), ["None of these"]);
  assert.deepStrictEqual(read(run, "red", "I don't have any fever or chills"), ["None of these"]);
  assert.deepStrictEqual(read(run, "red", "I don't have a fever but my side hurts"), ["Pain in your back or side"]);
  assert.deepStrictEqual(read(run, "red", "no fever and my back aches"), ["Pain in your back or side"], "'and' ends the negation");
  assert.deepStrictEqual(read(run, "other", "not diabetic, no kidney problems"), ["None of these"]);
});

test("doubt counts as yes for a red flag", run => {
  assert.deepStrictEqual(read(run, "red", "not sure if I'm pregnant"), ["Could be pregnant"]);
  assert.strictEqual(read(run, "red", "I don't know"), null);
});

test("sex and age are read from typed answers", run => {
  assert.deepStrictEqual(read(run, "sex", "I'm male"), ["Male"]);
  assert.deepStrictEqual(read(run, "sex", "woman"), ["Female"]);
  assert.deepStrictEqual(read(run, "sex", "mujer"), ["Female"]);
  assert.strictEqual(read(run, "sex", "yes"), null, "a yes doesn't answer this question");
  assert.deepStrictEqual(read(run, "age", "70"), ["65 or older"]);
  assert.deepStrictEqual(read(run, "age", "I'm 17"), ["Under 18"]);
  assert.deepStrictEqual(read(run, "age", "41"), ["18 to 64"]);
  assert.deepStrictEqual(read(run, "age", "tengo 30 años"), ["18 to 64"]);
  assert.strictEqual(read(run, "age", "between 30 and 40"), null, "two numbers: ask again");
});

test("male or outside 18 to 64 needs video", run => {
  for (const [sex, age] of [["Male", "18 to 64"], ["Female", "65 or older"], ["Female", "Under 18"]]) {
    run(`S = freshState("maria"); Engine.screenNext();`);
    for (const a of [sex, age, "None of these", "Less than 2 days", "None", "None of these"]) run(`Engine.screenNext(${JSON.stringify(a)})`);
    assert.strictEqual(run("S.disposition"), "video", sex + ", " + age);
  }
});

// Draft safety check (server.js), after the first held-out eval (D08 to D11). New phrasings, not eval copies.
const { checkDraft } = require("../server");
const NITRO = { plan: { patient_rx: "nitrofurantoin 100 mg, twice a day for 5 days", required_drug: "nitrofurantoin" } };
const FOSFO = { plan: { patient_rx: "fosfomycin 3 g, one dose", required_drug: "fosfomycin" } };
const hi = "Hi [PATIENT_NAME], I'm Dr. Elena Marquez. ";
const ok = (text, c) => checkDraft(text, c).length === 0;

test("draft check: the whole regimen must match, in any common wording", () => {
  assert.ok(ok(hi + "I'm sending nitrofurantoin 100 mg twice daily for five days to [PHARMACY].", NITRO));
  assert.ok(ok(hi + "I'm sending nitrofurantoin 100mg, 2 times a day for 5 days, to [PHARMACY].", NITRO));
  assert.ok(ok(hi + "I'm sending fosfomycin 3 grams, a single dose, to [PHARMACY].", FOSFO));
  assert.ok(!ok(hi + "I'm sending nitrofurantoin 100 mg, twice a day for 7 days, to [PHARMACY].", NITRO), "duration changed");
  assert.ok(!ok(hi + "I'm sending nitrofurantoin 100 mg, three times a day for 5 days, to [PHARMACY].", NITRO), "frequency changed");
  assert.ok(!ok(hi + "I'm sending nitrofurantoin 100 mg, twice a day for 15 days, to [PHARMACY].", NITRO), "5 days is not 15 days");
  assert.ok(!ok(hi + "I'm sending fosfomycin 3 g, two doses, to [PHARMACY].", FOSFO));
});

test("draft check: no other medicine, brand, or dose", () => {
  assert.ok(!ok(hi + "I'm sending fosfomycin 3 g, one dose, to [PHARMACY]. Macrobid also works.", FOSFO), "allergy drug by brand");
  assert.ok(!ok(hi + "I'm sending nitrofurantoin 100 mg, twice a day for 5 days, to [PHARMACY]. Fosfomycin is a backup.", NITRO), "other protocol drug");
  assert.ok(!ok(hi + "I'm sending nitrofurantoin 100 mg, twice a day for 5 days, to [PHARMACY]. Take Advil for pain.", NITRO), "OTC brand");
  assert.ok(!ok(hi + "I'm sending nitrofurantoin 100 mg, twice a day for 5 days, to [PHARMACY]. Add cefalexin if needed.", NITRO), "spelling variant");
  assert.ok(!ok(hi + "I'm sending nitrofurantoin 100 mg, twice a day for 5 days, to [PHARMACY]. Add clarithromycin if needed.", NITRO), "unlisted antibiotic, caught by its name ending");
  assert.ok(!ok(hi + "I'm sending nitrofurantoin 100 mg, twice a day for 5 days, to [PHARMACY], and 200 mg if it gets worse.", NITRO), "second dose");
  assert.ok(ok(hi + "I'm sending Macrobid (nitrofurantoin 100 mg), twice a day for 5 days, to [PHARMACY]. Back in April? Call us.", NITRO), "brand of the same drug and ordinary words are fine");
});

test("complicating factors require video, not a text visit", run => {
  run(`S = freshState("maria"); Engine.screenNext();`);
  for (const a of ["Female", "18 to 64", "None of these", "Less than 2 days", "3 or more", "Diabetes"]) run(`Engine.screenNext(${JSON.stringify(a)})`);
  assert.strictEqual(run("S.disposition"), "video");
  const list = run("Engine.listClinicians()");
  assert.strictEqual(list.visit, "video");
  assert.ok(list.clinicians.every(c => !c.online || c.price_usd >= 69), "video prices apply");
});

test("outside the protocol's age or sex needs video", run => {
  run(`S = freshState("maria"); Engine.screenNext();`);
  for (const a of ["Male", "18 to 64", "None of these", "Less than 2 days", "None", "None of these"]) run(`Engine.screenNext(${JSON.stringify(a)})`);
  assert.strictEqual(run("S.disposition"), "video");
});

test("clinicians are online first, then cheapest first; offline ones can't be picked", run => {
  run(`S = freshState("maria"); S.phase = "result"; S.disposition = "async";`);
  const list = run("Engine.listClinicians()").clinicians;
  const online = list.filter(c => c.online).map(c => c.price_usd);
  assert.strictEqual(JSON.stringify(online), JSON.stringify([...online].sort((a, b) => a - b)));
  assert.strictEqual(list[list.length - 1].online, false);
  assert.strictEqual(run(`Engine.selectClinician("clin_webb").type`), "error");
  assert.strictEqual(run(`Engine.selectClinician("clin_marquez").type`), "selected");
});

test("after choosing a clinician, the patient picks text now or a video time", run => {
  run(`S = freshState("maria"); S.phase = "result"; S.disposition = "async"; Engine.listClinicians(); Engine.selectClinician("clin_marquez");`);
  const v = run("Engine.intakeNext()");
  assert.strictEqual(v.type, "visit");
  assert.strictEqual(v.options.length, 2);
  assert.strictEqual(run(`Engine.chooseVisit("video", "Next week").type`), "error", "only offered times");
  assert.strictEqual(run(`Engine.chooseVisit("video", "Tonight 10:30 PM").type`), "visit_chosen");
  assert.strictEqual(run("Engine.price()"), 79, "video price");
  assert.strictEqual(run("Engine.serviceFee()"), 3.95, "Checkpoint's 5% service fee, paid by the patient");
  assert.strictEqual(run("Engine.total()"), 82.95, "the clinician keeps the full $79");
  assert.strictEqual(run("Engine.intakeNext().type"), "field");
});

test("a patient who asks for video sees video prices and can start right away", run => {
  run(`S = freshState("maria"); Engine.screenNext();`);
  for (const a of ["Female", "18 to 64", "None of these", "Less than 2 days", "None", "None of these"]) run(`Engine.screenNext(${JSON.stringify(a)})`);
  assert.strictEqual(run("S.disposition"), "async", "rules still say a text visit is enough");
  const list = run(`Engine.listClinicians("video")`);
  assert.strictEqual(list.visit, "video");
  assert.strictEqual(list.clinicians.find(c => c.id === "clin_marquez").price_usd, 79);
  run(`Engine.selectClinician("clin_marquez")`);
  const v = run("Engine.intakeNext()");
  assert.strictEqual(v.video_reason, "patient_asked");
  assert.deepStrictEqual([...v.options.map(o => o.visit)], ["video"], "only video options when they asked for video");
  assert.strictEqual(v.options[0].now, true);
  const r = run(`Engine.chooseVisit("video", "now")`);
  assert.strictEqual(r.type, "visit_chosen");
  assert.ok(r.now && /^Tonight \d/.test(r.slot), "now becomes the current time: " + r.slot);
  assert.strictEqual(run("Engine.price()"), 79);
});

test("the result names what it likely is, only when a clinician can see them", run => {
  run(`S = freshState("maria"); Engine.screenNext();`);
  for (const a of ["Female", "18 to 64", "None of these", "Less than 2 days", "None", "None of these"]) run(`Engine.screenNext(${JSON.stringify(a)})`);
  assert.strictEqual(run("S.disposition"), "async");
  assert.match(run(`Engine.finish().likely`), /bladder infection/);
  run(`S = freshState("ana"); Engine.screenNext(); Engine.screenNext("Female"); Engine.screenNext("18 to 64");`);
  assert.strictEqual(run(`Engine.screenNext("Vomiting").likely`), undefined, "no label after a red flag");
});

test("a case that needs video can't book a text visit", run => {
  run(`S = freshState("maria"); S.phase = "result"; S.disposition = "video"; Engine.listClinicians(); Engine.selectClinician("clin_marquez");`);
  assert.strictEqual(run("Engine.intakeNext().options.length"), 1);
  assert.strictEqual(run(`Engine.chooseVisit("text").type`), "error");
});

test("intake asks every field once, then consent", run => {
  run(`S = freshState("maria"); S.phase = "result"; S.disposition = "async"; Engine.listClinicians(); Engine.selectClinician("clin_marquez"); Engine.chooseVisit("text");`);
  const seen = [];
  for (let i = 0; i < 20; i++) {
    const step = run("Engine.intakeNext()");
    if (step.type === "consent") break;
    assert.strictEqual(step.type, "field");
    assert.ok(!seen.includes(step.field_id), "no field asked twice");
    seen.push(step.field_id);
    run(`Engine.recordIntake(${JSON.stringify(step.field_id)}, "x")`);
  }
  assert.deepStrictEqual([...seen], ["name", "dob", "address", "phone", "pharmacy", "allergies", "meds"]);
  assert.strictEqual(run("Engine.intakeNext().type"), "consent");
});

test("intake results never contain the patient's values", run => {
  run(`S = freshState("maria"); S.phase = "result"; S.disposition = "async"; Engine.listClinicians(); Engine.selectClinician("clin_marquez"); Engine.chooseVisit("text");`);
  run(`Engine.recordIntake("name", "Maria Alvarez"); Engine.recordIntake("dob", "05/02/1992");`);
  const step = JSON.stringify(run("Engine.intakeNext()"));
  assert.ok(!step.includes("Maria Alvarez") && !step.includes("05/02/1992"));
});

test("protocol medicine respects a nitrofurantoin allergy", run => {
  run(`S = freshState("maria"); S.intake.allergies = { value: "Nitrofurantoin" };`);
  assert.strictEqual(run("planLines().drug"), "fosfomycin");
  run(`S.intake.allergies = { value: "No known allergies" };`);
  assert.strictEqual(run("planLines().drug"), "nitrofurantoin");
});

test("age and Florida checks", run => {
  assert.strictEqual(run(`inFlorida("2140 SW 8th St, Miami, FL 33135")`), true);
  assert.strictEqual(run(`inFlorida("10 Main St, Atlanta, GA")`), false);
  assert.strictEqual(run(`inFlorida("18911 Collins Ave")`), true, "no other state named: counts as Florida");
  assert.strictEqual(run(`inFlorida("500 5th Ave, New York, NY 10036")`), false);
  assert.strictEqual(run(`inFlorida("1 Main St 30301")`), false, "Atlanta ZIP");
  assert.strictEqual(run(`inFlorida("1 Main St 33139")`), true, "Miami Beach ZIP");
  assert.strictEqual(run(`inFlorida("1200 Washington Ave")`), true, "a street named after a state is not another state");
  assert.strictEqual(run(`inFlorida("12 Oak St, Austin, Texas")`), false);
  assert.ok(run(`age("05/02/1992")`) >= 34);
  assert.strictEqual(run(`age("not a date")`), null);
  for (const typed of ["12232004", "12/23/2004", "12-23-2004", "2004-12-23", "12.23.2004"])
    assert.strictEqual(run(`normalizeDob(${JSON.stringify(typed)})`), "12/23/2004", typed);
  assert.strictEqual(run(`normalizeDob("13232004")`), null, "no month 13");
  assert.strictEqual(run(`normalizeDob("02302004")`), null, "no Feb 30");
});

console.log(`\n${passed} passed${process.exitCode ? ", some FAILED" : ""}`);
