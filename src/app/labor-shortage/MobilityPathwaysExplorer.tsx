"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, ChevronDown, ExternalLink, Globe2, GraduationCap, Plane, Search, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import rawRoutes from "@/data/mobility-pathways.json";
import styles from "./mobility.module.css";

type PathKind = "study" | "visitor" | "work" | "youth" | "alternative";
type Source = { title: string; url: string };
type MobilityRoute = {
  kind: PathKind;
  name_zh: string;
  name_en: string;
  summary_zh: string;
  summary_en: string;
  threshold_zh: string;
  threshold_en: string;
  cost_zh: string;
  cost_en: string;
  work_zh: string;
  work_en: string;
  tactic_zh: string;
  tactic_en: string;
  sources: Source[];
};
type Experience = { title: string; date: string; url: string; summary_zh: string; summary_en: string };
type BudgetHighlight = {
  route_en: string;
  route_zh: string;
  passport_scope_en: string;
  passport_scope_zh: string;
  fee_en: string;
  fee_zh: string;
  funds_en: string;
  funds_zh: string;
  eligibility_en: string;
  eligibility_zh: string;
  caveat_en: string;
  caveat_zh: string;
  tuition_en?: string;
  tuition_zh?: string;
  sources: Source[];
};
type MobilityDestination = {
  id: string;
  destination_en: string;
  destination_zh: string;
  routes: MobilityRoute[];
  experiences: Experience[];
  notes_zh: string;
  notes_en: string;
  budget_visit: BudgetHighlight;
  budget_work: BudgetHighlight;
  budget_study: BudgetHighlight;
};

const destinations = rawRoutes as MobilityDestination[];
const kindLabels: Record<PathKind, { zh: string; en: string }> = {
  visitor: { zh: "旅游 / 访问", en: "Visitor" },
  study: { zh: "留学", en: "Study" },
  work: { zh: "工作 / 技术人才", en: "Work" },
  youth: { zh: "青年流动 / 打工度假", en: "Youth mobility" },
  alternative: { zh: "其他合法路径", en: "Other routes" }
};
const kindIcons: Record<PathKind, LucideIcon> = {
  visitor: Plane,
  study: GraduationCap,
  work: BriefcaseBusiness,
  youth: Globe2,
  alternative: Sparkles
};

const copy = {
  zh: {
    eyebrow: "不止工作签证", title: "旅游、留学、工作，还有哪些合法路径？", subtitle: "按目的地筛选常见入境和长期停留方法。每条路径都分开写清语言、资金、费用、工作权限和实际切入点。", destinations: "个目的地", options: "条路径", search: "搜索国家、签证、语言、学历、资金或关键词", allCountries: "所有目的地", allKinds: "所有路径", shown: "个目的地显示", openHint: "点开国家，再展开具体路径看门槛与来源", noMatch: "没有符合条件的路径。", clear: "清除筛选", routeCount: "种路径", gate: "核心门槛（语言 / 学历 / 年龄 / 资格）", cost: "费用与资金证明", work: "能否工作及限制", tactic: "合法切入点 / 省力策略", official: "官方规则来源", experiences: "申请者公开经验帖", anecdote: "个人分享只作参考，不代表获批概率或官方规则。", noExperiences: "本次未找到与所列签证路径直接相关、且日期和原帖链接可核实的公开申请经验。", note: "先看护照与国籍", noteText: "年龄、免签范围、工作假期名额和居留资格都可能取决于护照。访问签证通常不能工作；不要靠逾期停留、假入学或虚假材料“转身份”。", checked: "官方门槛与费用按各来源页面核对；金额和政策会变。申请前请点开官方链接复核。", people: "则公开分享", source: "查看来源"
  },
  en: {
    eyebrow: "MORE THAN WORK VISAS", title: "Visit, study, work: what are the lawful routes?", subtitle: "Filter common entry and longer-stay options by destination. Each route separates language, funds, fees, work rights and a practical legal angle.", destinations: "destinations", options: "route options", search: "Search countries, visas, language, education, funds or keywords", allCountries: "All destinations", allKinds: "All routes", shown: "destinations shown", openHint: "Open a country, then expand a route for requirements and sources", noMatch: "No routes match those filters.", clear: "Clear filters", routeCount: "routes", gate: "Main gate (language / education / age / eligibility)", cost: "Fees and proof of funds", work: "Work rights and limits", tactic: "Lawful entry angle / practical tip", official: "Official rules", experiences: "Public applicant accounts", anecdote: "Personal reports are for context only; they do not establish rules or approval odds.", noExperiences: "No dated public first-person post directly matching the listed visa pathways was verifiable in this collection.", note: "Check passport and nationality first", noteText: "Age, visa-free access, working-holiday places and residence eligibility can depend on passport. Visitor status usually does not permit work. Do not rely on overstaying, sham study or false documents to change status.", checked: "Requirements and fees were checked against linked authority pages; amounts and policies can change. Recheck official sources before applying.", people: "public reports", source: "Open source"
  }
} as const;

const budgetCopy = {
  zh: {
    heading: "最低成本合法路径（按用途）",
    intro: "只比较政府申请费；机票、保险、学费和日常开销另计。需证明的存款不是已花费用，护照与资格会改变结果。官方核对：2026-11-12。",
    visit: "短期访问｜不能工作",
    work: "可合法工作｜有条件",
    studyLabel: "留学｜低成本切入点",
    studyNote: "学费取决于学校与课程，不能用签证费代替总预算；优先查公立院校和奖学金。",
    fee: "签证／许可申请费",
    funds: "需证明或预存的资金（非费用）",
    tuition: "学费（另计）",
    eligibility: "主要资格条件",
    caveat: "限制与未计入项",
    more: "展开门槛、限制与官方来源",
    source: "官方依据"
  },
  en: {
    heading: "Lowest-cost lawful routes, by purpose",
    intro: "Compares government application fees only; flights, insurance, tuition and living expenses are separate. Proof of funds is money you must show, not a fee. Passport and eligibility matter. Checked: 2026-11-12.",
    visit: "Short visit | no work",
    work: "Legal work | conditional",
    studyLabel: "Study | lower-cost starting point",
    studyNote: "Tuition varies by school and course; a visa fee is not the total budget. Check public institutions and scholarships first.",
    fee: "Visa / permit application fee",
    funds: "Funds to show or hold (not a fee)",
    tuition: "Tuition (separate)",
    eligibility: "Main eligibility gates",
    caveat: "Limits and excluded costs",
    more: "Show eligibility, limits and official sources",
    source: "Official basis"
  }
} as const;

export default function MobilityPathwaysExplorer() {
  const { language } = useLanguage();
  const lang = language === "zh" ? "zh" : "en";
  const c = copy[lang];
  const [query, setQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [kindFilter, setKindFilter] = useState("all");
  const routeTotal = destinations.reduce((sum, destination) => sum + destination.routes.length, 0);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return destinations.map((destination) => {
      const countryMatch = countryFilter === "all" || destination.id === countryFilter;
      const routes = destination.routes.filter((route) => {
        const kindMatch = kindFilter === "all" || route.kind === kindFilter;
        const routeText = [route.name_zh, route.name_en, route.summary_zh, route.summary_en, route.threshold_zh, route.threshold_en, route.cost_zh, route.cost_en, route.work_zh, route.work_en, route.tactic_zh, route.tactic_en].join(" ").toLowerCase();
        return kindMatch && (!term || routeText.includes(term) || destination.destination_zh.toLowerCase().includes(term) || destination.destination_en.toLowerCase().includes(term));
      });
      const experiences = destination.experiences.filter((item) => !term || [item.title, item.summary_zh, item.summary_en].join(" ").toLowerCase().includes(term));
      const notesMatch = [destination.notes_zh, destination.notes_en].join(" ").toLowerCase().includes(term);
      return { destination, routes, experiences, countryMatch, notesMatch };
    }).filter((item) => item.countryMatch && (item.routes.length > 0 || (item.experiences.length > 0 && kindFilter === "all") || item.notesMatch));
  }, [query, countryFilter, kindFilter]);

  return <section className={styles.section} id="mobility-pathways">
    <div className={styles.heading}>
      <div className={styles.eyebrow}><Globe2 size={15} />{c.eyebrow}</div>
      <div className={styles.headingRow}>
        <div><h2>{c.title}</h2><p>{c.subtitle}</p></div>
        <div className={styles.stats} aria-label={`${destinations.length} ${c.destinations}, ${routeTotal} ${c.options}`}>
          <strong>{destinations.length}<span>{c.destinations}</span></strong><strong>{routeTotal}<span>{c.options}</span></strong>
        </div>
      </div>
    </div>

    <div className={styles.controls}>
      <label className={styles.search}><Search size={17} /><span className={styles.srOnly}>{c.search}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={c.search} /></label>
      <label><span className={styles.srOnly}>{c.allCountries}</span><select value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)}><option value="all">{c.allCountries}</option>{destinations.map((destination) => <option key={destination.id} value={destination.id}>{lang === "zh" ? destination.destination_zh : destination.destination_en}</option>)}</select></label>
      <label><span className={styles.srOnly}>{c.allKinds}</span><select value={kindFilter} onChange={(event) => setKindFilter(event.target.value)}><option value="all">{c.allKinds}</option>{(Object.keys(kindLabels) as PathKind[]).map((kind) => <option key={kind} value={kind}>{kindLabels[kind][lang]}</option>)}</select></label>
    </div>
    <div className={styles.meta}><span>{filtered.length} {c.shown}</span><span>{c.openHint}</span></div>

    {!filtered.length ? <div className={styles.empty}>{c.noMatch}<button type="button" onClick={() => { setQuery(""); setCountryFilter("all"); setKindFilter("all"); }}>{c.clear}</button></div> : <div className={styles.countryGrid}>
      {filtered.map(({ destination, routes, experiences }) => <article className={styles.countryCard} key={destination.id}>
        <details className={styles.country}>
          <summary className={styles.countrySummary}>
            <span className={styles.countryName}>{lang === "zh" ? destination.destination_zh : destination.destination_en}</span>
            <span className={styles.count}>{routes.length} {c.routeCount}</span>
            <span className={styles.routePreview}>{routes.map((route) => <span className={`${styles.pill} ${styles[`pill_${route.kind}`]}`} key={`${route.kind}-${route.name_en}`}>{kindLabels[route.kind][lang]}</span>)}</span>
            <ChevronDown size={18} className={styles.countryChevron} />
          </summary>
          <div className={styles.countryBody}>
            <section className={styles.budgetPanel} aria-label={budgetCopy[lang].heading}>
              <div className={styles.budgetHeading}><strong>{budgetCopy[lang].heading}</strong><p>{budgetCopy[lang].intro}</p></div>
              <div className={styles.budgetGrid}>
                {[
                  { label: budgetCopy[lang].visit, data: destination.budget_visit },
                  { label: budgetCopy[lang].work, data: destination.budget_work },
                  { label: budgetCopy[lang].studyLabel, data: destination.budget_study }
                ].map((pick) => <article className={styles.budgetCard} key={pick.label}>
                  <span className={styles.budgetLabel}>{pick.label}</span>
                  <h4>{lang === "zh" ? pick.data.route_zh : pick.data.route_en}</h4>
                  <p className={styles.budgetPassport}>{lang === "zh" ? pick.data.passport_scope_zh : pick.data.passport_scope_en}</p>
                  <div className={styles.budgetFacts}>
                    <div><strong>{budgetCopy[lang].fee}</strong><p>{lang === "zh" ? pick.data.fee_zh : pick.data.fee_en}</p></div>
                    <div><strong>{budgetCopy[lang].funds}</strong><p>{lang === "zh" ? pick.data.funds_zh : pick.data.funds_en}</p></div>
                    {(pick.data.tuition_zh || pick.data.tuition_en) && <div><strong>{budgetCopy[lang].tuition}</strong><p>{lang === "zh" ? pick.data.tuition_zh : pick.data.tuition_en}</p></div>}
                  </div>
                  <details className={styles.budgetMore}>
                    <summary>{budgetCopy[lang].more}</summary>
                    <div className={styles.budgetFacts}>
                      <div><strong>{budgetCopy[lang].eligibility}</strong><p>{lang === "zh" ? pick.data.eligibility_zh : pick.data.eligibility_en}</p></div>
                      <div><strong>{budgetCopy[lang].caveat}</strong><p>{lang === "zh" ? pick.data.caveat_zh : pick.data.caveat_en}</p></div>
                    </div>
                    {!!pick.data.sources.length && <div>{pick.data.sources.map((source, sourceIndex) => <a className={styles.budgetSource} href={source.url} target="_blank" rel="noopener noreferrer" key={`${source.url}-${sourceIndex}`}>{budgetCopy[lang].source}: {source.title}<ExternalLink size={13} /></a>)}</div>}
                  </details>
                </article>)}
              </div>
              <p className={styles.budgetStudyNote}>{budgetCopy[lang].studyNote}</p>
            </section>
            {routes.length > 0 && <div className={styles.routeList}>{routes.map((route, index) => {
              const Icon = kindIcons[route.kind];
              return <details className={styles.route} key={`${route.name_en}-${index}`}>
                <summary className={styles.routeSummary}>
                  <span className={`${styles.routeIcon} ${styles[`icon_${route.kind}`]}`}><Icon size={17} /></span>
                  <span className={styles.routeTitle}>{lang === "zh" ? route.name_zh : route.name_en}<small>{kindLabels[route.kind][lang]}</small></span>
                  <ChevronDown size={17} className={styles.routeChevron} />
                </summary>
                <div className={styles.routeBody}>
                  <p className={styles.routeIntro}>{lang === "zh" ? route.summary_zh : route.summary_en}</p>
                  <div className={styles.facts}>
                    <div><strong>{c.gate}</strong><p>{lang === "zh" ? route.threshold_zh : route.threshold_en}</p></div>
                    <div><strong>{c.cost}</strong><p>{lang === "zh" ? route.cost_zh : route.cost_en}</p></div>
                    <div><strong>{c.work}</strong><p>{lang === "zh" ? route.work_zh : route.work_en}</p></div>
                    <div className={styles.tactic}><strong>{c.tactic}</strong><p>{lang === "zh" ? route.tactic_zh : route.tactic_en}</p></div>
                  </div>
                  <div className={styles.sources}><strong>{c.official}</strong>{route.sources.map((source, sourceIndex) => <a href={source.url} target="_blank" rel="noopener noreferrer" key={`${source.url}-${sourceIndex}`}>{source.title}<ArrowUpRight size={14} /><ExternalLink size={12} /></a>)}</div>
                </div>
              </details>;
            })}</div>}

            {experiences.length > 0 && <details className={styles.experiences}>
              <summary><span>{c.experiences}</span><span className={styles.experienceCount}>{experiences.length} {c.people}</span><ChevronDown size={17} /></summary>
              <p className={styles.disclaimer}>{c.anecdote}</p>
              <ul>{experiences.map((experience, index) => <li key={`${experience.url}-${index}`}>
                <div><strong>{experience.title}</strong><time>{experience.date}</time></div>
                <p>{lang === "zh" ? experience.summary_zh : experience.summary_en}</p>
                <a href={experience.url} target="_blank" rel="noopener noreferrer">{c.source}<ExternalLink size={13} /></a>
              </li>)}</ul>
            </details>}
            {!experiences.length && <p className={styles.noExperience}>{c.noExperiences}</p>}
            <p className={styles.notes}><ShieldCheck size={16} />{lang === "zh" ? destination.notes_zh : destination.notes_en}</p>
          </div>
        </details>
      </article>)}
    </div>}
    <aside className={styles.caution}><ShieldCheck size={18} /><div><strong>{c.note}</strong><p>{c.noteText}</p></div></aside>
    <p className={styles.updated}>{c.checked}</p>
  </section>;
}
