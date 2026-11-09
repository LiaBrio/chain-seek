"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Globe, Loader2, Search, ShieldCheck, Star } from "lucide-react";
import { useDataList, DataListItem } from "@/hooks/useDataList";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SimpleFooter } from "@/components/SimpleFooter";
import AdSlot from "@/components/ads/AdSlot";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryColorMap, categoryIconMap } from "@/lib/icons";
import styles from "./home.module.css";

const copy = {
  zh: {
    strip: "ChainSeek 安全与运营中心", navSafety: "安全检查", navDecode: "交易解读", navDirectory: "工具目录", explore: "探索工具", start: "开始核对",
    eyebrow: "WEB3 TRANSACTION SAFETY", titleA: "先看懂风险，", titleB: "再签下每一笔。", lead: "在地址、代币、授权和待签交易之间，找到一个清晰的检查起点。重要操作之前，先确认你正在查看什么。",
    noWallet: "无需连接钱包 · 此处不会发起交易", checkTitle: "操作前，逐项确认", checklist: ["核对地址与网络是否正确", "检查授权对象和额度；不再需要时及时撤销", "读懂交易将调用什么、可能影响哪些资产"], panelNote: "这是操作指引，不是实时风险检测结果。",
    safetyTitle: "从你想确认的事项开始", safetyDesc: "使用现有区块浏览器查看地址、代币或交易；授权管理、代币分析和交易输入解码会转到相应的外部服务。", queryLabel: "区块浏览器查询", chainLabel: "选择网络", queryPlaceholder: "输入钱包地址、代币地址或交易哈希", submit: "在浏览器中查询", empty: "请输入地址、代币或交易哈希。", review: "复核授权", revokeDesc: "在 Revoke.cash 查看与管理代币授权。撤销需在外部服务确认钱包交易并支付网络 Gas。", openRevoke: "打开 Revoke.cash", decode: "解读交易输入", decodeDesc: "在 Etherscan 的 Input Data Decoder 查看交易调用数据；本页不会替你判定安全性。", openTenderly: "打开 Etherscan 解码器", tokenCheck: "查看代币线索", tokenDesc: "Token Sniffer 提供外部自动化合约分析；结果仅供参考，不构成安全保证。", openToken: "打开 Token Sniffer", directoryTitle: "常用工具，继续好找。", directoryDesc: "安全操作入口优先呈现，完整 Web3 资源目录仍保留在首页下方。", directoryDisclaimer: "目录链接来自第三方，部分链接可能含推广参数；收录不代表安全背书，访问前请核对域名。", all: "全部分类", searchTools: "搜索工具名称或描述", favorites: "只看收藏", total: "项工具", loading: "目录加载中…", loadError: "工具目录暂时无法加载；以上安全指引和查询入口仍可使用。", noResults: "没有匹配的工具。", reset: "重置筛选", visit: "访问", favorite: "收藏", listed: "目录工具", detail: "当前目录资源持续更新", demoTitle: "使用边界 · 不提供安全保证", demo: "ChainSeek 提供查询与第三方工具入口，不生成自有风险评分。外部工具也不能保证安全，请独立核验链上数据并谨慎操作。", lookupNote: "查询将在所选网络的第三方区块浏览器中打开；本页不生成安全评分。", selectType: "查询类型", addressType: "地址 / 代币", txType: "交易哈希"
  },
  en: {
    strip: "ChainSeek Safety & Operations", navSafety: "Safety checks", navDecode: "Understand a transaction", navDirectory: "Tool directory", explore: "Explore tools", start: "Start reviewing",
    eyebrow: "WEB3 TRANSACTION SAFETY", titleA: "Understand first,", titleB: "then sign with care.", lead: "A clear starting point for reviewing addresses, tokens, approvals, and pending transactions. Know what you are looking at before taking an important action.",
    noWallet: "No wallet connection · No transactions are initiated here", checkTitle: "A checklist before you act", checklist: ["Verify the address and selected network", "Review spender and allowance; revoke what you no longer need", "Understand what a transaction calls and which assets it may affect"], panelNote: "Operational guidance only—not live risk detection.",
    safetyTitle: "Start with what you want to verify", safetyDesc: "Use an existing block explorer to look up an address, token, or transaction. Approval review, token analysis, and transaction input decoding open external services.", queryLabel: "Block explorer lookup", chainLabel: "Network", queryPlaceholder: "Wallet address, token address, or transaction hash", submit: "Search explorer", empty: "Enter an address, token, or transaction hash.", review: "Review approvals", revokeDesc: "Review and manage token approvals on Revoke.cash. Revoking requires an external wallet-confirmed transaction and network gas.", openRevoke: "Open Revoke.cash", decode: "Decode transaction input", decodeDesc: "View call data with Etherscan's Input Data Decoder; this site does not assess its safety for you.", openTenderly: "Open Etherscan Decoder", tokenCheck: "Review token signals", tokenDesc: "Token Sniffer offers external automated contract analysis. Results are informational, not a safety guarantee.", openToken: "Open Token Sniffer", directoryTitle: "Your Web3 toolbox, still here.", directoryDesc: "Safety entry points come first; the broader Web3 directory remains available below.", directoryDisclaimer: "Directory links lead to third parties and may include referral parameters. Listing is not an endorsement; verify the domain before visiting.", all: "All categories", searchTools: "Search tool names or descriptions", favorites: "Favorites only", total: "tools", loading: "Loading directory…", loadError: "The directory is temporarily unavailable; the safety guidance and explorer lookup above remain usable.", noResults: "No matching tools.", reset: "Reset filters", visit: "Visit", favorite: "Favorite", listed: "Directory tools", detail: "Directory resources are updated over time", demoTitle: "Know the limits · No safety guarantee", demo: "ChainSeek provides lookups and third-party tool links, not its own risk scores. External tools cannot guarantee safety; verify on-chain information and use caution.", lookupNote: "Queries open the selected network’s external explorer. This page does not produce a safety score.", selectType: "Lookup type", addressType: "Address / token", txType: "Transaction hash"
  }
};

const explorers: Record<string, string> = {
  ethereum: "https://etherscan.io", bitcoin: "https://blockstream.info", bsc: "https://bscscan.com", polygon: "https://polygonscan.com", solana: "https://solscan.io", avalanche: "https://snowtrace.io", arbitrum: "https://arbiscan.io", optimism: "https://optimistic.etherscan.io", base: "https://basescan.org", fantom: "https://ftmscan.com"
};
const chains = ["ethereum", "bitcoin", "bsc", "polygon", "solana", "avalanche", "arbitrum", "optimism", "base", "fantom"];

function WebsiteCard({ website, favorite, toggle, t }: { website: DataListItem; favorite: boolean; toggle: () => void; t: (key: string) => string }) {
  const Icon = categoryIconMap[website.category] || Globe;
  return <Card className={`${styles.toolCard} group`}>
    <CardHeader className="pb-3"><div className="flex items-start gap-3">
      <Avatar className="h-10 w-10 shrink-0"><AvatarImage src={website.icon} alt="" /><AvatarFallback>{website.name.charAt(0)}</AvatarFallback></Avatar>
      <div className="min-w-0 flex-1"><CardTitle className="text-base leading-snug">{website.name}</CardTitle><CardDescription className="mt-1 line-clamp-3">{website.description}</CardDescription></div>
      <Button type="button" variant="ghost" size="icon" aria-label={`${t("common.favorite")} ${website.name}`} aria-pressed={favorite} onClick={toggle}><Star className={`h-4 w-4 ${favorite ? "fill-amber-400 text-amber-500" : "text-gray-400"}`} /></Button>
    </div></CardHeader>
    <CardContent className="mt-auto flex items-center justify-between gap-2"><Badge className={`${categoryColorMap[website.category] || "bg-slate-100 text-slate-800"} text-xs`}><Icon className="mr-1 h-3 w-3" />{website.category}</Badge><Button asChild variant="outline" size="sm"><a href={website.url} target="_blank" rel="noopener noreferrer">{t("common.visit")}<ExternalLink className="ml-1 h-3 w-3" /></a></Button></CardContent>
  </Card>;
}

export default function Home() {
  const { language, changeLanguage, t, availableLanguages } = useLanguage();
  const lang = language === "zh" ? "zh" : "en";
  const c = copy[lang];
  const { data, loading, error } = useDataList(language);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("__ALL__");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedBlockchain, setSelectedBlockchain] = useState("ethereum");
  const [searchQuery, setSearchQuery] = useState("");
  const [queryError, setQueryError] = useState("");

  const filteredWebsites = useMemo(() => (data?.data || []).filter((website) => {
    const term = searchTerm.trim().toLowerCase();
    return (!term || website.name.toLowerCase().includes(term) || (website.description || "").toLowerCase().includes(term)) &&
      (selectedCategory === "__ALL__" || website.category === selectedCategory) && (!showFavoritesOnly || favorites.has(website.id));
  }), [data, searchTerm, selectedCategory, showFavoritesOnly, favorites]);
  const categories = data?.categories || [];

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) { setQueryError(c.empty); return; }
    setQueryError("");
    const base = explorers[selectedBlockchain];
    if (base) window.open(`${base}/search?q=${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
  };
  const toggleFavorite = (id: string) => setFavorites((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });

  return <div className={styles.home} id="top">
    <div className={styles.topline}><span className={styles.statusDot} />{c.strip}</div>
    <header className={styles.nav}><div className={styles.wrap + " " + styles.navInner}>
      <a className={styles.brand} href="#top" aria-label="ChainSeek home"><span className={styles.brandMark}><ShieldCheck size={20} /></span><span>ChainSeek<small>WEB3 SAFETY</small></span></a>
      <nav className={styles.navLinks} aria-label="Main navigation"><a href="#safety">{c.navSafety}</a><a href="#decode">{c.navDecode}</a><a href="#directory">{c.navDirectory}</a><a href="/tools/">{c.explore}</a><a href="/labor-shortage/">{language === "zh" ? "国际用工数据" : "Global jobs data"}</a></nav>
      <div className={styles.navActions}><LanguageSwitcher currentLanguage={language} onLanguageChange={(next) => { changeLanguage(next); setSelectedCategory("__ALL__"); }} availableLanguages={availableLanguages} /><a className={styles.navCta} href="#quick-check">{c.start}<ArrowRight size={15} /></a></div>
    </div></header>

    <main>
      <section className={styles.hero}><div className={`${styles.wrap} ${styles.heroInner}`}>
        <div className={styles.heroCopy}><div className={styles.eyebrow}><span />{c.eyebrow}</div><h1>{c.titleA}<br /><em>{c.titleB}</em></h1><p className={styles.lead}>{c.lead}</p>
          <div className={styles.heroActions}><a className={styles.limeButton} href="#quick-check">{c.start}<ArrowRight size={16} /></a><a className={styles.outlineButton} href="#directory">{c.explore}</a><a className={styles.outlineButton} href="/labor-shortage/">{language === "zh" ? "全球职业短缺" : "Global shortage data"}</a></div>
          <p className={styles.heroNote}><ShieldCheck size={15} />{c.noWallet}</p>
        </div>
        <aside className={styles.checklist} aria-label={c.checkTitle}><div className={styles.checklistHead}><span className={styles.checkIcon}><ShieldCheck size={17} /></span><strong>{c.checkTitle}</strong><span className={styles.label}>CHECKLIST</span></div><ol>{c.checklist.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, "0")}</span>{item}</li>)}</ol><p>{c.panelNote}</p><div className={styles.demoNotice}><b>{c.demoTitle}</b><span>{c.demo}</span></div></aside>
      </div></section>

      <section className={styles.safety} id="safety"><div className={styles.wrap}><div className={styles.sectionIntro}><div><span className={styles.kicker}>A CLEARER STARTING POINT</span><h2>{c.safetyTitle}</h2><p>{c.safetyDesc}</p></div></div>
        <div className={styles.lookup} id="quick-check"><div className={styles.lookupTitle}><span className={styles.lookupIcon}><Search size={17} /></span><div><strong>{c.queryLabel}</strong><small>{c.lookupNote}</small></div></div>
          <form className={styles.queryForm} onSubmit={handleSearch} noValidate><label className={styles.fieldLabel} htmlFor="chain-select">{c.chainLabel}</label><select id="chain-select" value={selectedBlockchain} onChange={(e) => setSelectedBlockchain(e.target.value)}>{chains.map((chain) => <option key={chain} value={chain}>{chain === "bsc" ? "BNB Smart Chain (BSC)" : chain.charAt(0).toUpperCase() + chain.slice(1)}</option>)}</select>
            <label className={styles.srOnly} htmlFor="explorer-query">{c.queryPlaceholder}</label><input id="explorer-query" type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); if (queryError) setQueryError(""); }} placeholder={c.queryPlaceholder} autoComplete="off" aria-describedby={queryError ? "query-error" : undefined} />
            <button type="submit" className={styles.darkButton}>{c.submit}<ArrowRight size={16} /></button></form>
          {queryError && <p id="query-error" className={styles.queryError} role="alert">{queryError}</p>}
          <div className={styles.externalTools}><article><span className={styles.toolGlyph}>↗</span><div><h3>{c.review}</h3><p>{c.revokeDesc}</p><a href="https://revoke.cash/" target="_blank" rel="noopener noreferrer">{c.openRevoke}<ExternalLink size={13} /></a></div></article><article><span className={styles.toolGlyph}>◇</span><div><h3>{c.tokenCheck}</h3><p>{c.tokenDesc}</p><a href="https://tokensniffer.com/" target="_blank" rel="noopener noreferrer">{c.openToken}<ExternalLink size={13} /></a></div></article><article id="decode"><span className={styles.toolGlyph}>⌁</span><div><h3>{c.decode}</h3><p>{c.decodeDesc}</p><a href="https://etherscan.io/inputdatadecoder" target="_blank" rel="noopener noreferrer">{c.openTenderly}<ExternalLink size={13} /></a></div></article></div>
        </div>
      </div></section>

      <section className={styles.directory} id="directory"><div className={styles.wrap}><div className={styles.directoryHead}><div><span className={styles.kicker}>YOUR WEB3 TOOLBOX, STILL HERE</span><h2>{c.directoryTitle}</h2><p>{c.directoryDesc}</p></div><a href="/tools/" className={styles.directoryLink}>{c.explore}<ArrowRight size={15} /></a></div>
        <p className={styles.directoryDisclaimer}>{c.directoryDisclaimer}</p><div className={styles.filters}><label className={styles.searchBox}><Search size={16} /><span className={styles.srOnly}>{c.searchTools}</span><input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={c.searchTools} /></label><label className={styles.selectWrap}><span className={styles.srOnly}>{c.all}</span><select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}><option value="__ALL__">{c.all}</option>{categories.map((category) => <option key={category.id} value={category.name}>{category.name} ({category.count})</option>)}</select></label><Button variant={showFavoritesOnly ? "default" : "outline"} size="sm" aria-pressed={showFavoritesOnly} onClick={() => setShowFavoritesOnly((v) => !v)}><Star className={`mr-1 h-4 w-4 ${showFavoritesOnly ? "fill-current" : ""}`} />{c.favorites} ({favorites.size})</Button></div>
        {loading && <p className={styles.directoryMessage}><Loader2 className="mr-2 inline h-4 w-4 animate-spin" />{c.loading}</p>}
        {error && <p className={styles.directoryMessage} role="status">{c.loadError}</p>}
        {!loading && !error && filteredWebsites.length === 0 && <div className={styles.directoryMessage}>{c.noResults} <button type="button" onClick={() => { setSearchTerm(""); setSelectedCategory("__ALL__"); setShowFavoritesOnly(false); }}>{c.reset}</button></div>}
        {filteredWebsites.length > 0 && <><div className={styles.resultMeta}>{filteredWebsites.length} {c.total}</div><div className={styles.toolGrid}>{filteredWebsites.map((website) => <WebsiteCard key={website.id} website={website} favorite={favorites.has(website.id)} toggle={() => toggleFavorite(website.id)} t={t} />)}</div>
          <div className={styles.ads}><AdSlot client="ca-pub-4044602309325996" slot="1501082954" className="w-full" style={{ display: "block" }} format="auto" fullWidthResponsive /><AdSlot client="ca-pub-4044602309325996" slot="6561837942" className="w-full" style={{ display: "block" }} format="auto" fullWidthResponsive /><AdSlot client="ca-pub-4044602309325996" slot="2462810831" className="w-full" style={{ display: "block" }} format="auto" fullWidthResponsive /></div></>}
      </div></section>
    </main>
    <div className={styles.footer}><SimpleFooter t={t} /></div>
  </div>;
}
