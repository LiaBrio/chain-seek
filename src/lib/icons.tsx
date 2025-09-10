import { 
  Coins,
  BookOpen,
  Newspaper,
  Globe,
  Settings,
  TrendingUp,
  Banknote,
  Shield,
  Zap,
  Palette,
  Rocket,
  Cpu
} from "lucide-react";

// 分类图标映射 - 更个性化的图标选择
export const categoryIconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  "行情数据": TrendingUp,
  "中心化交易所": Banknote,
  "去中心化交易所": Coins,
  "钱包": Shield,
  "DeFi": Zap,
  "NFT": Palette,
  "工具": Cpu,
  "学习": BookOpen,
  "新闻": Newspaper,
  "空投": Rocket,
  "其他": Globe
};

// 分类颜色映射 - 更丰富的颜色搭配
export const categoryColorMap: { [key: string]: string } = {
  "行情数据": "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800",
  "中心化交易所": "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800",
  "去中心化交易所": "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800",
  "钱包": "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800",
  "DeFi": "bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800",
  "NFT": "bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800",
  "工具": "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800",
  "学习": "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800",
  "新闻": "bg-gradient-to-r from-red-100 to-pink-100 text-red-800",
  "空投": "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800",
  "其他": "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800"
};

// 其他图标映射
export const otherIcons = {
  Settings
};
