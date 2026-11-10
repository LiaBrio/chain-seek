"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, ChevronDown, ExternalLink, FileCheck2, Globe2, Search, ShieldCheck } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SimpleFooter } from "@/components/SimpleFooter";
import { useLanguage } from "@/hooks/useLanguage";
import rawEntries from "@/data/labor-shortage.json";
import styles from "./shortage.module.css";
import MobilityPathwaysExplorer from "./MobilityPathwaysExplorer";

type RouteKind = "official_occupation_list" | "program_specific_list" | "employer_sponsored" | "sector_limited" | "qualified_worker" | "talent_list_not_authorization" | "working_holiday";
type Occupation = { name_en: string; local_name: string; basis_en: string; basis_zh: string };
type WorkPathway = {
  kind: RouteKind;
  name_en: string;
  name_zh: string;
  scope_en: string;
  scope_zh: string;
  conditions_en: string;
  conditions_zh: string;
  source_name: string;
  source_url: string;
  occupations: Occupation[];
};
type OfficialSource = { name: string; url: string };
type ApplicantExperience = {
  topic_en: string;
  topic_zh: string;
  summary_en: string;
  summary_zh: string;
  source_name: string;
  source_url: string;
  post_date: string;
};
type Destination = {
  id: string;
  country_en: string;
  country_zh: string;
  authority: string;
  summary_en: string;
  summary_zh: string;
  published_date: string;
  effective_period: string;
  work_permit_thresholds_en: string;
  work_permit_thresholds_zh: string;
  immigration_thresholds_en: string;
  immigration_thresholds_zh: string;
  official_sources: OfficialSource[];
  experiences: ApplicantExperience[];
  caveat_en: string;
  caveat_zh: string;
  pathways: WorkPathway[];
};
const entries = rawEntries as Destination[];

function compactPreview(text: string, lang: "en" | "zh") {
  const limit = lang === "zh" ? 82 : 210;
  if (text.length <= limit) return text;
  const snippet = text.slice(0, limit);
  if (lang === "en") {
    const wordBoundary = snippet.lastIndexOf(" ");
    return `${snippet.slice(0, wordBoundary > limit - 28 ? wordBoundary : limit).trimEnd()}…`;
  }
  return `${snippet.trimEnd()}…`;
}

const copy = {
  en: {
    top: "WORK VISAS FOR FOREIGN WORKERS", title: "Explore work-visa routes and eligibility", subtitle: "Compare official occupation lists where they exist and verified work-permit routes, including working-holiday and youth-mobility programs. A listed role or visa route is not a guarantee; eligibility can depend on nationality and individual conditions.", home: "Back to ChainSeek", badge: "GOVERNMENT SOURCES · BILINGUAL GUIDE", destinations: "destinations", pathways: "official pathways", examples: "sample listed roles", search: "Search destinations, visa routes, occupations, or requirements", allCountries: "All destinations", allTypes: "All pathway types", list: "Occupation list", program: "Program-specific list", employer: "Employer-sponsored route", sector: "Sector-limited route", qualified: "Qualified-worker route", talent: "Talent list (not work authorization)", workingHoliday: "Working holiday / youth mobility", results: "destinations shown", routeLabel: "Official work-permit routes", scope: "Who / what the route covers", conditions: "Main conditions and limits", roles: "Examples explicitly named by the source", noRoles: "No general eligible-occupation list is established by this route. See its conditions and official guidance.", source: "Open official source", authority: "Government authority", published: "Source date", effective: "Validity / application period", caveat: "Important limits", checked: "Official sources checked 9 Nov 2026", noMatches: "No destinations match those filters.", reset: "Clear filters", trustTitle: "A job title alone does not secure a visa", trustBody: "Some governments publish occupation lists for a particular permit, stream, or points benefit. Others assess a specific job offer, employer, qualifications, salary, licensing, or sector instead. Working-holiday and youth-mobility programs are shown separately because they often have passport, age, and stay limits. We link to official rules; confirm current eligibility with the issuing authority before applying.", disclaimer: "This guide is for research only. It is not legal advice, a job offer, a visa decision, or a guarantee that a role or employer will qualify. Immigration rules and lists can change.", footer: "ChainSeek shares source-linked information for exploration. Verify employment and immigration requirements with the issuing authority." , noRoute: "No destinations match this route type.",
    thresholdTitle: "Key eligibility thresholds", thresholdCase: "Requirements vary by route; confirm before applying", workThreshold: "Work visa / permit", immigrationThreshold: "Long-term residence / immigration", officialRules: "Official eligibility sources", experiences: "Applicant experiences (public discussions)", experienceCount: "reported accounts", anecdoteDisclaimer: "Personal accounts from public discussions; not representative or legal advice. Rules and outcomes vary.", noExperience: "No credible first-person public discussion found for this destination in this collection."
  },
  zh: {
    top: "外国人工作签证与工作许可", title: "外国人有哪些工作签证途径？", subtitle: "查看官方职业名单（如有）及经核实的工作许可途径，包括工作假期与青年流动计划。职业或签证路径并不保证获批；资格可能取决于国籍和个人条件。", home: "返回 ChainSeek", badge: "政府来源 · 中英双语指南", destinations: "个目的地", pathways: "条官方许可路径", examples: "个官方列明岗位示例", search: "搜索目的地、签证路径、职业或申请条件", allCountries: "所有目的地", allTypes: "所有路径类型", list: "官方职业名单", program: "特定项目名单", employer: "雇主担保路径", sector: "行业限制路径", qualified: "技术人才路径", talent: "人才名单（本身不授予工签）", workingHoliday: "工作假期 / 青年流动签证", results: "个目的地", routeLabel: "官方工作许可路径", scope: "适用岗位 / 范围", conditions: "主要条件与限制", roles: "官方来源明确列举的岗位示例", noRoles: "此路径没有设立通用的合资格职业名单；请查看路径条件及官方说明。", source: "查看官方来源", authority: "政府主管机构", published: "来源日期", effective: "有效期 / 申请期间", caveat: "重要限制", checked: "官方来源核验于 2026 年 11 月 9 日", noMatches: "没有符合筛选条件的目的地。", reset: "清除筛选", trustTitle: "仅有岗位名称，不足以确保获批工签", trustBody: "部分政府名单只适用于特定许可、项目或加分项；其他路径会审核具体职位、雇主、学历、薪资、执业资格或行业条件。工作假期与青年流动计划通常另有国籍、年龄和停留期限限制，因此单独标示。我们链接官方规则；申请前请向主管机构确认最新资格。", disclaimer: "本指南仅供研究参考，不构成法律意见、工作邀约、签证决定或对岗位/雇主资格的保证。移民规则和名单可能变更。", footer: "ChainSeek 提供带来源链接的信息供查阅。就业与移民决定前，请向主管机构核实要求。", noRoute: "没有符合此路径类型的目的地。",
    thresholdTitle: "主要申请门槛", thresholdCase: "条件依签证路径和个案而异，申请前请核实", workThreshold: "工作签证 / 许可", immigrationThreshold: "长期居留 / 移民", officialRules: "官方资格规则来源", experiences: "申请者网上经验（公开讨论）", experienceCount: "则个人分享", anecdoteDisclaimer: "以下为公开讨论中的个人经历，不具代表性，也不是法律意见；规则与结果因人而异。", noExperience: "本次整理未找到可信的该目的地第一手公开讨论。"
  }
} as const;

const routeLabels: Record<RouteKind, { en: string; zh: string }> = {
  official_occupation_list: { en: "Occupation list", zh: "官方职业名单" },
  program_specific_list: { en: "Program-specific list", zh: "特定项目名单" },
  employer_sponsored: { en: "Employer-sponsored route", zh: "雇主担保路径" },
  sector_limited: { en: "Sector-limited route", zh: "行业限制路径" },
  qualified_worker: { en: "Qualified-worker route", zh: "技术人才路径" },
  talent_list_not_authorization: { en: "Talent list — not work authorization", zh: "人才名单（本身不授予工签）" },
  working_holiday: { en: "Working holiday / youth mobility", zh: "工作假期 / 青年流动签证" }
};

export default function LaborShortageExplorer() {
  const { language, changeLanguage, availableLanguages, t } = useLanguage();
  const lang = language === "zh" ? "zh" : "en";
  const c = copy[lang];
  const [query, setQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const totalPathways = entries.reduce((sum, entry) => sum + entry.pathways.length, 0);
  const totalRoles = entries.reduce((sum, entry) => sum + entry.pathways.reduce((n, path) => n + path.occupations.length, 0), 0);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return entries.map((entry) => {
      const countryMatch = countryFilter === "all" || entry.id === countryFilter;
      const entryText = [entry.country_en, entry.country_zh, entry.authority, entry.summary_en, entry.summary_zh, entry.work_permit_thresholds_en, entry.work_permit_thresholds_zh, entry.immigration_thresholds_en, entry.immigration_thresholds_zh, entry.caveat_en, entry.caveat_zh, ...entry.experiences.flatMap((item) => [item.topic_en, item.topic_zh, item.summary_en, item.summary_zh, item.source_name])].join(" ").toLowerCase();
      const entryMatch = !term || entryText.includes(term);
      const pathways = entry.pathways.filter((path) => {
        const typeMatch = typeFilter === "all" || path.kind === typeFilter;
        const text = [path.name_en, path.name_zh, path.scope_en, path.scope_zh, path.conditions_en, path.conditions_zh, path.source_name, ...path.occupations.flatMap((job) => [job.name_en, job.local_name, job.basis_en, job.basis_zh])].join(" ").toLowerCase();
        return typeMatch && (!term || entryMatch || text.includes(term));
      });
      return { entry, pathways, countryMatch, entryMatch };
    }).filter((item) => item.countryMatch && item.pathways.length > 0);
  }, [query, countryFilter, typeFilter]);

  return <div className={styles.page}>
    <header className={styles.nav}>
      <Link className={styles.brand} href="/" aria-label="ChainSeek home"><span className={styles.brandMark}><ShieldCheck size={19} /></span><span>ChainSeek<small>WEB3 SAFETY · SOURCED DATA</small></span></Link>
      <div className={styles.navRight}><Link className={styles.homeLink} href="/"><ArrowLeft size={15} />{c.home}</Link><LanguageSwitcher currentLanguage={language} onLanguageChange={changeLanguage} availableLanguages={availableLanguages} /></div>
    </header>

    <main>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}><Globe2 size={15} />{lang === "zh" ? "出国路径速查" : "WAYS TO MOVE ABROAD"}</div>
          <h1>{lang === "zh" ? "去其他国家，有哪些办法？" : "How can you move, study, work or visit abroad?"}</h1>
          <p>{lang === "zh" ? "不只工签：比较 13 个目的地的旅游、留学、工作及其他合法路径，快速看语言、资金、费用和能否工作。" : "More than work visas: compare visitor, study, work and other lawful routes across 13 destinations, including language, funds, fees and work rights."}</p>
          <span className={styles.curated}><FileCheck2 size={14} />{c.badge}</span>
          <div className={styles.stats}>
            <div><strong>{entries.length}</strong><span>{c.destinations}</span></div>
            <div><strong>{totalPathways}</strong><span>{lang === "zh" ? "条工作许可路径" : "work-permit routes"}</span></div>
            <div><strong>{totalRoles}</strong><span>{c.examples}</span></div>
          </div>
        </div>
      </section>
      <MobilityPathwaysExplorer />

      <section className={styles.content}>
        <h2 className={styles.sectionTitle}>{lang === "zh" ? "深挖工作许可：雇主条件、职业名单与长期居留" : "Detailed work-permit rules, occupation lists and residence routes"}</h2>
        <p className={styles.destinationIntro}>{lang === "zh" ? "下方保留原有官方工作许可数据库：按目的地查看雇主担保、特定项目和工作假期规则，并对照官方职业示例与申请者经验。" : "The original official work-permit database remains below. Browse employer-sponsored, programme-specific and working-holiday rules by destination, with cited role examples and applicant accounts."}</p>
        <div className={styles.filters}>
          <label className={styles.search}><Search size={17} /><span className={styles.srOnly}>{c.search}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={c.search} /></label>
          <label><span className={styles.srOnly}>{c.allCountries}</span><select value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)}><option value="all">{c.allCountries}</option>{entries.map((entry) => <option key={entry.id} value={entry.id}>{lang === "zh" ? entry.country_zh : entry.country_en}</option>)}</select></label>
          <label><span className={styles.srOnly}>{c.allTypes}</span><select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><option value="all">{c.allTypes}</option>{(Object.keys(routeLabels) as RouteKind[]).map((kind) => <option key={kind} value={kind}>{routeLabels[kind][lang]}</option>)}</select></label>
        </div>
        <div className={styles.resultsMeta}>
          <span>{filtered.length} {c.results}</span>
          <span className={styles.browseHint}>{lang === "zh" ? "先看签证、门槛和永居机会；点击卡片查看官方细则" : "Scan visa options, entry gates and residence prospects; open a card for official details"}</span>
        </div>

        {filtered.length === 0 ? <div className={styles.empty}>{c.noMatches}<button type="button" onClick={() => { setQuery(""); setCountryFilter("all"); setTypeFilter("all"); }}>{c.reset}</button></div> : <div className={styles.grid}>
          {filtered.map(({ entry, pathways }) => <article className={styles.card} key={entry.id}>
            <details className={styles.destination}>
              <summary className={styles.destinationSummary}>
                <div className={styles.destinationMain}>
                  <div className={styles.countryTitleRow}>
                    <span className={styles.countryName}>{lang === "zh" ? entry.country_zh : entry.country_en}</span>
                    <span className={styles.routeCount}><BriefcaseBusiness size={14} />{pathways.length} {lang === "zh" ? "条路径" : pathways.length === 1 ? "route" : "routes"}</span>
                  </div>
                  <span className={styles.quickFacts}>
                    <span className={styles.quickSection}>
                      <span className={styles.quickLabel}>{lang === "zh" ? "对外国人开放的签证 / 路径" : "Work visas and routes for foreigners"}</span>
                      <span className={styles.routePreview}>{pathways.map((path, index) => <span className={styles.previewTag} key={`${path.name_en}-${index}`}>{lang === "zh" ? path.name_zh : path.name_en}</span>)}</span>
                    </span>
                    <span className={styles.quickSection}>
                      <span className={styles.quickLabel}>{lang === "zh" ? "主要申请条件" : "Main application requirements"}</span>
                      <span className={styles.quickText}>{compactPreview(lang === "zh" ? entry.work_permit_thresholds_zh : entry.work_permit_thresholds_en, lang)}</span>
                    </span>
                    <span className={styles.quickSection}>
                      <span className={styles.quickLabel}>{lang === "zh" ? "长期居留 / 永居机会" : "Long-term / permanent residence"}</span>
                      <span className={styles.quickText}>{compactPreview(lang === "zh" ? entry.immigration_thresholds_zh : entry.immigration_thresholds_en, lang)}</span>
                    </span>
                  </span>
                </div>
                <span className={styles.expandIcon} aria-hidden="true"><ChevronDown size={20} /></span>
              </summary>

              <div className={styles.destinationBody}>
                <div className={styles.facts}>
                  <div><span>{c.authority}</span><strong>{entry.authority}</strong></div>
                  <div><span>{c.published}</span><strong>{entry.published_date}</strong></div>
                  <div><span>{c.effective}</span><strong>{entry.effective_period}</strong></div>
                </div>

                <details className={styles.overview}>
                  <summary><span>{lang === "zh" ? "该国工作签证体系说明" : "How the work-visa system works"}</span><ChevronDown size={17} /></summary>
                  <p>{lang === "zh" ? entry.summary_zh : entry.summary_en}</p>
                </details>

                <details className={styles.thresholds}>
                  <summary className={styles.sectionTrigger}><span><strong>{c.thresholdTitle}</strong><small>{c.thresholdCase}</small></span><ChevronDown size={18} /></summary>
                  <div className={styles.thresholdBody}>
                    <div className={styles.thresholdGrid}>
                      <div className={styles.thresholdBox}><strong>{c.workThreshold}</strong><p>{lang === "zh" ? entry.work_permit_thresholds_zh : entry.work_permit_thresholds_en}</p></div>
                      <div className={styles.thresholdBox}><strong>{c.immigrationThreshold}</strong><p>{lang === "zh" ? entry.immigration_thresholds_zh : entry.immigration_thresholds_en}</p></div>
                    </div>
                    {!!entry.official_sources.length && <div className={styles.officialSources}><strong>{lang === "zh" ? "摘要、门槛与日期的官方来源" : "Official sources for summary, thresholds and dates"}</strong>{entry.official_sources.map((source, index) => <a key={`${source.url}-${index}`} href={source.url} target="_blank" rel="noopener noreferrer">{source.name}<ExternalLink size={13} /></a>)}</div>}
                  </div>
                </details>

                <h2 className={styles.sectionTitle}>{lang === "zh" ? "官方许可路径" : "Official permit pathways"}<span>{pathways.length}</span></h2>
                <div className={styles.pathways}>
                  {pathways.map((path, index) => <details className={styles.pathway} key={`${path.name_en}-${index}`}>
                    <summary className={styles.pathwayHead}>
                      <span className={styles.pathwayTitle}>{lang === "zh" ? path.name_zh : path.name_en}</span>
                      <span className={styles.pathKind}>{routeLabels[path.kind][lang]}</span>
                      <ChevronDown className={styles.pathChevron} size={17} />
                    </summary>
                    <div className={styles.pathwayBody}>
                      <div className={styles.note}><strong>{c.scope}</strong><p>{lang === "zh" ? path.scope_zh : path.scope_en}</p></div>
                      <div className={styles.note}><strong>{c.conditions}</strong><p>{lang === "zh" ? path.conditions_zh : path.conditions_en}</p></div>
                      {!!path.occupations.length ? <div className={styles.jobsBlock}>
                        <div className={styles.jobsTitle}><BriefcaseBusiness size={16} />{c.roles}</div>
                        <ul className={styles.jobs}>{path.occupations.map((job, roleIndex) => <li key={`${job.name_en}-${roleIndex}`}><div><strong>{lang === "zh" && job.local_name ? job.local_name : job.name_en}</strong>{job.local_name && job.local_name !== job.name_en && <span>{lang === "zh" ? job.name_en : job.local_name}</span>}<details className={styles.jobBasis}><summary>{lang === "zh" ? "入选依据" : "Why this role appears"}</summary><p>{lang === "zh" ? job.basis_zh : job.basis_en}</p></details></div></li>)}</ul>
                      </div> : <p className={styles.noExamples}>{c.noRoles}</p>}
                      <a className={styles.sourceLink} href={path.source_url} target="_blank" rel="noopener noreferrer">{c.source}<ArrowUpRight size={15} /><ExternalLink size={13} /><small>{path.source_name}</small></a>
                    </div>
                  </details>)}
                </div>

                <details className={styles.experiences}>
                  <summary><span>{c.experiences}</span><span className={styles.experienceCount}>{entry.experiences.length} {c.experienceCount}</span><ChevronDown size={18} /></summary>
                  <p className={styles.anecdoteDisclaimer}>{c.anecdoteDisclaimer}</p>
                  {entry.experiences.length ? <ul className={styles.experienceList}>{entry.experiences.map((item, index) => <li key={`${item.source_url}-${index}`}>
                    <div className={styles.experienceHead}><strong>{lang === "zh" ? item.topic_zh : item.topic_en}</strong><time>{item.post_date}</time></div>
                    <p>{lang === "zh" ? item.summary_zh : item.summary_en}</p>
                    <a href={item.source_url} target="_blank" rel="noopener noreferrer">{item.source_name}<ExternalLink size={13} /></a>
                  </li>)}</ul> : <p className={styles.noExperience}>{c.noExperience}</p>}
                </details>

                <details className={styles.caveat}>
                  <summary><ShieldCheck size={16} /><strong>{c.caveat}</strong><ChevronDown className={styles.caveatChevron} size={17} /></summary>
                  <p>{lang === "zh" ? entry.caveat_zh : entry.caveat_en}</p>
                </details>
                <div className={styles.checked}>{c.checked}</div>
              </div>
            </details>
          </article>)}
        </div>}

        <aside className={styles.trust}><div className={styles.trustIcon}><ShieldCheck size={18} /></div><div><h2>{c.trustTitle}</h2><p>{c.trustBody}</p></div></aside>
        <p className={styles.disclaimer}>{c.disclaimer}</p>
      </section>
    </main>
    <div className={styles.footer}><SimpleFooter t={t} /></div>
  </div>;
}
