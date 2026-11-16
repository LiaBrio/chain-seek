"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ExternalLink, Search, RotateCcw, BookOpen } from "lucide-react";
import rawItems from "@/data/run-community.json";
import styles from "./run-community.module.css";

type Destination = "all" | "jp" | "au" | "nl" | "us";
type Category = "planning" | "work" | "study" | "budget" | "settling";
type BilingualText = { zh: string; en: string };
type CommunityItem = {
  id: string;
  destination: Destination;
  category: Category;
  source_path: string;
  title_zh: string;
  title_en: string;
  source_type: "first_person" | "community_guide";
  author: string | null;
  publication_date: string | null;
  date_note_zh: string;
  date_note_en: string;
  summary_zh: string;
  summary_en: string;
  lessons: BilingualText[];
  cautions: BilingualText[];
  suitable: boolean;
  source_url: string;
  official_sources?: { title: string; url: string }[];
};
const items = rawItems as CommunityItem[];
const copy = {
  zh: {
    title: "社区经验与出发准备",
    intro: "整理自社区成员的经历与准备指南，适合用于发现问题和规划准备；它们不同于已核实的官方规定，不代表获批概率，也不代表当前要求。",
    warning: "版本提醒：原始仓库最新快照为 2024-01-01。原文日期可能未注明；仓库快照日期不等于经历发生日期，也不代表政策已在该日核实。",
    search: "搜索标题、摘要、作者或关键词",
    allDestinations: "所有目的地",
    destinations: { all: "所有目的地", jp: "日本", au: "澳大利亚", nl: "荷兰", us: "美国" } as Record<Destination, string>,
    categories: { planning: "出发规划", work: "工作", study: "留学", budget: "预算", settling: "落地生活" } as Record<Category, string>,
    allCategories: "所有主题", count: "条资源", shown: "显示", none: "没有符合条件的资源。", reset: "清除筛选",
    firstPerson: "个人经历", guide: "社区指南", lessons: "可借鉴的经验", cautions: "阅读提醒", date: "原文日期", author: "作者", suitable: "适用性提示", official: "复核现行规则",
    source: "查看原文", back: "查看当前官方路径与规则 →", attribution: "来源与许可",
    attributionText: "资料来自 The-Run-Philosophy-Organization/run 及其贡献者（仓库快照：2024-01-01）。ChainSeek 对本区摘要作了删节、翻译与编辑，改编摘要依 CC BY-SA 4.0 许可分享；不代表原作者背书。该许可不延伸至本网站其他独立内容；外链第三方作品可能适用各自许可。"
  },
  en: {
    title: "Community experience & preparation",
    intro: "A curated set of community experiences and preparation guides for issue-spotting and planning. These are distinct from verified official rules, do not indicate approval odds, and are not current requirements.",
    warning: "Version note: the source repository’s latest snapshot is 2024-01-01. Original dates may be unstated; the snapshot date is neither an event date nor a policy-verification date.",
    search: "Search titles, summaries, authors or keywords",
    allDestinations: "All destinations",
    destinations: { all: "All destinations", jp: "Japan", au: "Australia", nl: "Netherlands", us: "United States" } as Record<Destination, string>,
    categories: { planning: "Planning", work: "Work", study: "Study", budget: "Budget", settling: "Settling in" } as Record<Category, string>,
    allCategories: "All topics", count: "resources", shown: "Showing", none: "No resources match these filters.", reset: "Reset filters",
    firstPerson: "First-person account", guide: "Community guide", lessons: "Takeaways", cautions: "Cautions", date: "Original date", author: "Author", suitable: "Suitability note", official: "Recheck current rules",
    source: "Read original", back: "See current official pathways and rules →", attribution: "Sources & license",
    attributionText: "Source: The-Run-Philosophy-Organization/run and its contributors (snapshot: 2024-01-01). ChainSeek condensed, translated and edited these summaries; adapted summaries are shared under CC BY-SA 4.0, without implying author endorsement. This license does not relicense the site's other independent content; externally linked third-party works may have their own licenses."
  }
};

export default function RunCommunityLibrary({ lang }: { lang: "zh" | "en" }) {
  const zh = lang === "zh";
  const t = zh ? copy.zh : copy.en;
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState<Destination>("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return items.filter((item) => {
      const text = [item.title_zh, item.title_en, item.summary_zh, item.summary_en, item.author ?? "", copy.zh.destinations[item.destination], copy.en.destinations[item.destination], copy.zh.categories[item.category], copy.en.categories[item.category], ...item.lessons.flatMap((x) => [x.zh, x.en]), ...item.cautions.flatMap((x) => [x.zh, x.en])].join(" ").toLocaleLowerCase();
      return (destination === "all" || item.destination === destination) && (category === "all" || item.category === category) && (!q || text.includes(q));
    });
  }, [query, destination, category]);
  const reset = () => { setQuery(""); setDestination("all"); setCategory("all"); };

  return <section id="run-community-library" className={styles.section} aria-labelledby="run-library-title">
    <header className={styles.heading}>
      <div className={styles.eyebrow}><BookOpen size={15} aria-hidden="true" /> {zh ? "「润」项目 · 社区资料库" : "THE RUN PROJECT · COMMUNITY LIBRARY"}</div>
      <div className={styles.headingRow}><div><h2 id="run-library-title">{t.title}</h2><p>{t.intro}</p></div></div>
    </header>
    <aside className={styles.warning}>{t.warning}</aside>
    <div className={styles.controls}>
      <label className={styles.search}><Search size={17} aria-hidden="true"/><span className={styles.srOnly}>{t.search}</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search}/></label>
      <label><span className={styles.srOnly}>{t.allDestinations}</span><select value={destination} onChange={(e) => setDestination(e.target.value as Destination)}>{Object.entries(t.destinations).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      <label><span className={styles.srOnly}>{t.allCategories}</span><select value={category} onChange={(e) => setCategory(e.target.value as Category | "all")}><option value="all">{t.allCategories}</option>{Object.entries(t.categories).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
    </div>
    <div className={styles.meta} aria-live="polite">{t.shown} <strong>{filtered.length}</strong> / {items.length} {t.count}</div>
    {filtered.length ? <div className={styles.grid}>{filtered.map((item) => <article className={styles.card} key={item.id}>
      <details className={styles.details}><summary className={styles.summary}><span className={styles.summaryMain}><span className={styles.tags}><span className={styles.pill}>{item.destination === "all" ? (zh ? "通用准备" : "General preparation") : t.destinations[item.destination]}</span><span className={styles.pill}>{item.source_type === "first_person" ? t.firstPerson : t.guide}</span><span className={styles.pill}>{t.categories[item.category]}</span></span><strong>{zh ? item.title_zh : item.title_en}</strong><span className={styles.preview}>{zh ? item.summary_zh : item.summary_en}</span></span><ChevronDown className={styles.chevron} size={19} aria-hidden="true"/></summary>
        <div className={styles.body}><div className={styles.detailBlock}><strong>{t.lessons}</strong><ul>{item.lessons.slice(0, 3).map((lesson, i) => <li key={i}>{zh ? lesson.zh : lesson.en}</li>)}</ul></div>
          {item.cautions.length > 0 && <div className={styles.caution}><strong>{t.cautions}</strong><ul>{item.cautions.map((note, i) => <li key={i}>{zh ? note.zh : note.en}</li>)}</ul></div>}
          {item.date_note_zh || item.date_note_en ? <p className={styles.dateNote}><strong>{t.date}: </strong>{zh ? item.date_note_zh : item.date_note_en}{item.publication_date ? ` (${item.publication_date})` : ""}</p> : null}
          {item.author && <p className={styles.byline}><strong>{t.author}: </strong>{item.author}</p>}
          {!item.suitable && <p className={styles.caution}><strong>{t.suitable}: </strong>{zh ? "此条目可能不适用于出行准备，请结合原文主题谨慎阅读。" : "This item may not be suitable for travel preparation; consider its original context."}</p>}
          {!!item.official_sources?.length && <div className={styles.official}><strong>{t.official}</strong><ul>{item.official_sources.slice(0, 2).map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ExternalLink size={13}/></a></li>)}</ul></div>}
          <a className={styles.source} href={item.source_url} target="_blank" rel="noopener noreferrer">{t.source}<ExternalLink size={14}/></a>
        </div>
      </details>
    </article>)}</div> : <div className={styles.empty}><p>{t.none}</p><button type="button" onClick={reset}><RotateCcw size={15}/>{t.reset}</button></div>}
    <a className={styles.backLink} href="#mobility-pathways">{t.back}</a>
    <details className={styles.attribution}><summary>{t.attribution}<ChevronDown size={16}/></summary><p>{t.attributionText} <a href="https://github.com/The-Run-Philosophy-Organization/run/tree/87f325210ffea9e16ac4c7cde39f4451bdc10bb5/%E6%B6%A6%E5%AD%A6%E6%96%B9%E6%B3%95%E8%AE%BA" target="_blank" rel="noopener noreferrer">{zh ? "原始方法论目录" : "Original methodology"}</a> · <a href="https://github.com/The-Run-Philosophy-Organization/run/tree/87f325210ffea9e16ac4c7cde39f4451bdc10bb5/%E6%B6%A6%E5%AD%A6%E5%AE%9E%E4%BE%8B" target="_blank" rel="noopener noreferrer">{zh ? "案例目录" : "Cases directory"}</a> · <a href="https://github.com/The-Run-Philosophy-Organization/run/tree/87f325210ffea9e16ac4c7cde39f4451bdc10bb5" target="_blank" rel="noopener noreferrer">{zh ? "原始仓库快照" : "Repository snapshot"}</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></p></details>
  </section>;
}
