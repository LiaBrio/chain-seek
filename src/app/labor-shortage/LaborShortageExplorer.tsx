"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, ExternalLink, FileCheck2, Globe2, Search, ShieldCheck } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SimpleFooter } from "@/components/SimpleFooter";
import { useLanguage } from "@/hooks/useLanguage";
import rawEntries from "@/data/labor-shortage.json";
import styles from "./shortage.module.css";

type SignalType = "official_shortage_list" | "official_shortage_analysis" | "immigration_program_list" | "official_proxy" | "not_found";
type Occupation = { name_en: string; local_name: string; sector: string; source_url: string; basis: string };
type CountryEntry = {
  id: string;
  country_en: string;
  country_zh: string;
  signal_type: SignalType;
  signal_label: string;
  list_title: string;
  authority: string;
  source_title: string;
  source_url: string;
  published_date: string;
  effective_period: string;
  methodology: string;
  caveat: string;
  occupations: Occupation[];
};
const entries = rawEntries as CountryEntry[];

const copy = {
  en: {
    top: "GLOBAL LABOUR-MARKET SOURCES", title: "Where skills are in demand", subtitle: "A source-led guide to official shortage lists and labour-market signals from 12 major destinations. Check what each source actually measures before treating a role as a hiring or visa opportunity.", home: "Back to ChainSeek", badge: "CURATED · GOVERNMENT SOURCES", countries: "destinations", examples: "occupation examples", sources: "source types", search: "Search occupations, sectors, or source titles", allCountries: "All destinations", allTypes: "All source types", list: "Official shortage list", analysis: "Official shortage analysis", immigration: "Immigration occupation list", proxy: "Official labour-market data", noList: "No national list found", results: "destinations shown", examplesLabel: "Representative examples — not the complete list", noExamples: "No occupation examples are listed for this source.", source: "Open official source", authority: "Publishing authority", published: "Published", effective: "Period / validity", methodology: "What the source measures", caveat: "Read this before comparing", checked: "Source checked 9 Nov 2026", noMatches: "No destinations match those filters.", reset: "Clear filters", notFound: "No verified national shortage occupation list was located for this destination in this curated snapshot.", trustTitle: "Shortage lists are not all the same", trustBody: "Some governments publish labour-market shortage assessments. Others publish occupation lists for immigration eligibility, which are not proof of a nationwide hiring shortage. We label the source type and link to the original publication so you can judge the scope yourself.", disclaimer: "This is a research starting point, not a job offer, visa decision, or guarantee of current vacancies. Lists can change; always confirm details with the linked authority.", footer: "ChainSeek provides sourced information for exploration. Verify details with the issuing authority before making employment or immigration decisions."
  },
  zh: {
    top: "全球劳动力市场官方来源", title: "哪些职业需求较高？", subtitle: "汇集 12 个主要目的地的官方短缺职业清单与劳动力市场信号。先看清每个来源实际衡量什么，不要把职业名单直接等同于招聘机会或签证资格。", home: "返回 ChainSeek", badge: "精选 · 政府来源", countries: "个目的地", examples: "条职业示例", sources: "种来源类型", search: "搜索职业、行业或来源名称", allCountries: "所有目的地", allTypes: "所有来源类型", list: "官方短缺清单", analysis: "官方短缺分析", immigration: "移民职业名单", proxy: "官方劳动力数据", noList: "未找到全国名单", results: "个目的地", examplesLabel: "代表性示例 · 并非完整名单", noExamples: "此来源暂无已核实的职业示例。", source: "查看官方原文", authority: "发布机构", published: "发布日期", effective: "适用期间 / 有效期", methodology: "来源衡量内容", caveat: "比较前请留意", checked: "来源核验于 2026 年 11 月 9 日", noMatches: "没有符合筛选条件的目的地。", reset: "清除筛选", notFound: "本精选快照中未找到该目的地经核实的全国性短缺职业名单。", trustTitle: "不同国家的“短缺名单”并不相同", trustBody: "部分政府发布劳动力市场短缺评估；另一些发布的是移民资格职业名单，它们并不能证明全国招聘普遍短缺。我们标明来源类型并链接官方原文，方便你自行判断范围。", disclaimer: "本页仅供研究参考，不构成工作邀约、签证决定或当前职位空缺保证。名单可能更新；就业或移民决定前，请以发布机构原文为准。", footer: "ChainSeek 提供有来源依据的信息以供查阅。就业或移民决定前，请向发布机构核实详情。"
  }
} as const;

function getTypeLabel(type: SignalType, lang: "en" | "zh") {
  const labels = {
    en: { official_shortage_list: "Official shortage list", official_shortage_analysis: "Official shortage analysis", immigration_program_list: "Immigration occupation list", official_proxy: "Official labour-market data", not_found: "No national list found" },
    zh: { official_shortage_list: "官方短缺清单", official_shortage_analysis: "官方短缺分析", immigration_program_list: "移民职业名单", official_proxy: "官方劳动力数据", not_found: "未找到全国名单" }
  };
  return labels[lang][type];
}

export default function LaborShortageExplorer() {
  const { language, changeLanguage, availableLanguages, t } = useLanguage();
  const lang = language === "zh" ? "zh" : "en";
  const c = copy[lang];
  const [query, setQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const totalExamples = entries.reduce((sum, entry) => sum + entry.occupations.length, 0);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const countryMatch = countryFilter === "all" || entry.id === countryFilter;
      const typeMatch = typeFilter === "all" || entry.signal_type === typeFilter;
      const text = [entry.country_en, entry.country_zh, entry.list_title, entry.authority, entry.methodology, ...entry.occupations.flatMap((job) => [job.name_en, job.local_name, job.sector, job.basis])].join(" ").toLowerCase();
      return countryMatch && typeMatch && (!term || text.includes(term));
    });
  }, [query, countryFilter, typeFilter]);

  return <div className={styles.page}>
    <header className={styles.nav}>
      <Link className={styles.brand} href="/" aria-label="ChainSeek home"><span className={styles.brandMark}><ShieldCheck size={19} /></span><span>ChainSeek<small>WEB3 SAFETY · SOURCED DATA</small></span></Link>
      <div className={styles.navRight}><Link className={styles.homeLink} href="/"><ArrowLeft size={15} />{c.home}</Link><LanguageSwitcher currentLanguage={language} onLanguageChange={changeLanguage} availableLanguages={availableLanguages} /></div>
    </header>

    <main>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}><Globe2 size={15} />{c.top}</div>
          <h1>{c.title}</h1>
          <p>{c.subtitle}</p>
          <span className={styles.curated}><FileCheck2 size={14} />{c.badge}</span>
          <div className={styles.stats}>
            <div><strong>{entries.length}</strong><span>{c.countries}</span></div>
            <div><strong>{totalExamples}</strong><span>{c.examples}</span></div>
            <div><strong>{new Set(entries.map((entry) => entry.signal_type)).size}</strong><span>{c.sources}</span></div>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.filters}>
          <label className={styles.search}><Search size={17} /><span className={styles.srOnly}>{c.search}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={c.search} /></label>
          <label><span className={styles.srOnly}>{c.allCountries}</span><select value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)}><option value="all">{c.allCountries}</option>{entries.map((entry) => <option key={entry.id} value={entry.id}>{lang === "zh" ? entry.country_zh : entry.country_en}</option>)}</select></label>
          <label><span className={styles.srOnly}>{c.allTypes}</span><select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><option value="all">{c.allTypes}</option>{(["official_shortage_list", "official_shortage_analysis", "immigration_program_list", "official_proxy", "not_found"] as SignalType[]).map((type) => <option key={type} value={type}>{getTypeLabel(type, lang)}</option>)}</select></label>
        </div>
        <div className={styles.resultsMeta}>{filtered.length} {c.results}</div>

        {filtered.length === 0 ? <div className={styles.empty}>{c.noMatches}<button type="button" onClick={() => { setQuery(""); setCountryFilter("all"); setTypeFilter("all"); }}>{c.reset}</button></div> : <div className={styles.grid}>
          {filtered.map((entry) => <article className={styles.card} key={entry.id}>
            <div className={styles.cardHead}>
              <div><div className={styles.countryName}>{lang === "zh" ? entry.country_zh : entry.country_en}</div><div className={styles.listTitle}>{entry.list_title}</div></div>
              <span className={`${styles.type} ${styles[entry.signal_type]}`}>{getTypeLabel(entry.signal_type, lang)}</span>
            </div>
            {entry.signal_type === "not_found" ? <p className={styles.notFound}>{c.notFound}</p> : <>
              <div className={styles.facts}>
                <div><span>{c.authority}</span><strong>{entry.authority}</strong></div>
                <div><span>{c.published}</span><strong>{entry.published_date}</strong></div>
                <div><span>{c.effective}</span><strong>{entry.effective_period}</strong></div>
              </div>
              <div className={styles.note}><strong>{c.methodology}</strong><p>{entry.methodology}</p></div>
              {!!entry.occupations.length && <div className={styles.jobsBlock}>
                <div className={styles.jobsTitle}><BriefcaseBusiness size={15} />{c.examplesLabel}</div>
                <ul className={styles.jobs}>{entry.occupations.map((job, index) => <li key={`${job.name_en}-${index}`}><div><strong><a className={styles.jobLink} href={job.source_url || entry.source_url} target="_blank" rel="noopener noreferrer">{job.name_en}</a></strong>{job.local_name && job.local_name !== job.name_en && !job.local_name.startsWith("Not stated") && <span>{job.local_name}</span>}<details className={styles.jobBasis}><summary>{lang === "zh" ? "入选依据" : "Why this appears"}</summary><p>{job.basis}</p></details></div><em>{job.sector}</em></li>)}</ul>
              </div>}
              {!entry.occupations.length && <p className={styles.noExamples}>{c.noExamples}</p>}
              <div className={styles.caveat}><strong>{c.caveat}</strong><p>{entry.caveat}</p></div>
              <a className={styles.sourceLink} href={entry.source_url} target="_blank" rel="noopener noreferrer">{c.source}<ArrowUpRight size={15} /><ExternalLink size={13} /></a>
              <div className={styles.checked}>{c.checked}</div>
            </>}
          </article>)}
        </div>}

        <aside className={styles.trust}><div className={styles.trustIcon}><ShieldCheck size={18} /></div><div><h2>{c.trustTitle}</h2><p>{c.trustBody}</p></div></aside>
        <p className={styles.disclaimer}>{c.disclaimer}</p>
      </section>
    </main>
    <div className={styles.footer}><SimpleFooter t={t} /></div>
  </div>;
}
