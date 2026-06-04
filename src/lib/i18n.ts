import type { Lang } from "./types";

// UI string dictionary for the three supported languages.

export interface Dict {
  brand: string;
  tagline: string;
  heroTitle: string;
  heroSub: string;
  tosNotice: string;

  // form
  carDetails: string;
  carDetailsSub: string;
  make: string;
  model: string;
  year: string;
  price: string;
  currency: string;
  mileage: string;
  transmission: string;
  fuel: string;
  color: string;
  condition: string;
  vin: string;
  location: string;
  sellerName: string;
  contact: string;
  notes: string;
  notesPlaceholder: string;
  optional: string;
  photos: string;
  addPhotos: string;

  // selects
  selectPlaceholder: string;
  automatic: string;
  manual: string;
  gas: string;
  diesel: string;
  hybrid: string;
  electric: string;
  excellent: string;
  good: string;
  fair: string;

  // actions
  generate: string;
  generating: string;
  regenerate: string;
  copy: string;
  copied: string;
  openSite: string;
  markPosted: string;
  markDraft: string;
  clearAll: string;

  // listings panel
  listings: string;
  listingsSub: string;
  emptyListings: string;

  // status
  statusNone: string;
  statusDraft: string;
  statusPosted: string;
  statusLabel: string;

  // errors
  errRequired: string;
  errGenerateFailed: string;
  errNoKey: string;

  footer: string;
}

const en: Dict = {
  brand: "AutoList",
  tagline: "Sell your car everywhere, manage it in one place.",
  heroTitle: "List your car once. Post it everywhere.",
  heroSub:
    "Fill in your car's details, let AI write a polished listing for each marketplace in your language, then post and track them all from one screen.",
  tosNotice:
    "These marketplaces don't allow automatic posting, so we generate a ready-to-paste listing for each one and open its post page for you. You stay in control.",
  carDetails: "Your car",
  carDetailsSub: "Enter the details once. We'll tailor a listing for each site.",
  make: "Make",
  model: "Model",
  year: "Year",
  price: "Price",
  currency: "Currency",
  mileage: "Mileage",
  transmission: "Transmission",
  fuel: "Fuel type",
  color: "Color",
  condition: "Condition",
  vin: "VIN",
  location: "Location",
  sellerName: "Your name",
  contact: "Contact (phone or email)",
  notes: "Anything else?",
  notesPlaceholder:
    "New tires, recent service, single owner, reason for selling...",
  optional: "optional",
  photos: "Photos",
  addPhotos: "Add photos",
  selectPlaceholder: "Select...",
  automatic: "Automatic",
  manual: "Manual",
  gas: "Gasoline",
  diesel: "Diesel",
  hybrid: "Hybrid",
  electric: "Electric",
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
  generate: "Generate listings",
  generating: "Writing your listings...",
  regenerate: "Regenerate",
  copy: "Copy",
  copied: "Copied!",
  openSite: "Open post page",
  markPosted: "Mark posted",
  markDraft: "Mark draft",
  clearAll: "Clear everything",
  listings: "Your marketplace listings",
  listingsSub: "Copy each one, open the site, and paste. Track status here.",
  emptyListings:
    "Fill in your car details and hit Generate to see a tailored listing for each marketplace.",
  statusNone: "Not started",
  statusDraft: "Draft saved",
  statusPosted: "Posted",
  statusLabel: "Status",
  errRequired: "Required",
  errGenerateFailed: "Couldn't generate listings. Please try again.",
  errNoKey:
    "The AI key isn't configured on the server. Add ANTHROPIC_API_KEY in your environment.",
  footer:
    "AutoList helps you prepare and track listings. You post them yourself on each marketplace, following their rules.",
};

const zh: Dict = {
  brand: "AutoList",
  tagline: "一处管理，多平台卖车。",
  heroTitle: "一次填写，处处发布。",
  heroSub:
    "填写车辆信息，让 AI 用你的语言为每个平台撰写精美的出售文案，然后在一个页面发布并跟踪所有平台。",
  tosNotice:
    "这些平台不允许自动发布，因此我们为每个平台生成可直接粘贴的文案，并为你打开发布页面。一切由你掌控。",
  carDetails: "你的车辆",
  carDetailsSub: "只需填写一次，我们会为每个平台量身定制文案。",
  make: "品牌",
  model: "型号",
  year: "年份",
  price: "价格",
  currency: "货币",
  mileage: "里程",
  transmission: "变速箱",
  fuel: "燃料类型",
  color: "颜色",
  condition: "车况",
  vin: "车架号 (VIN)",
  location: "所在地",
  sellerName: "你的姓名",
  contact: "联系方式（电话或邮箱）",
  notes: "其他补充？",
  notesPlaceholder: "新轮胎、近期保养、一手车、出售原因……",
  optional: "选填",
  photos: "照片",
  addPhotos: "添加照片",
  selectPlaceholder: "请选择……",
  automatic: "自动挡",
  manual: "手动挡",
  gas: "汽油",
  diesel: "柴油",
  hybrid: "混合动力",
  electric: "纯电动",
  excellent: "极佳",
  good: "良好",
  fair: "一般",
  generate: "生成文案",
  generating: "正在撰写文案……",
  regenerate: "重新生成",
  copy: "复制",
  copied: "已复制！",
  openSite: "打开发布页面",
  markPosted: "标记为已发布",
  markDraft: "标记为草稿",
  clearAll: "清空全部",
  listings: "各平台文案",
  listingsSub: "复制文案，打开网站，粘贴即可。在此跟踪状态。",
  emptyListings: "填写车辆信息并点击「生成文案」，即可为每个平台查看定制文案。",
  statusNone: "未开始",
  statusDraft: "已存草稿",
  statusPosted: "已发布",
  statusLabel: "状态",
  errRequired: "必填",
  errGenerateFailed: "无法生成文案，请重试。",
  errNoKey: "服务器未配置 AI 密钥。请设置 ANTHROPIC_API_KEY 环境变量。",
  footer:
    "AutoList 帮你准备并跟踪文案。你需自行在各平台按其规则发布。",
};

const fr: Dict = {
  brand: "AutoList",
  tagline: "Vendez votre voiture partout, gérez tout au même endroit.",
  heroTitle: "Décrivez votre voiture une fois. Publiez-la partout.",
  heroSub:
    "Renseignez les détails de votre voiture, laissez l'IA rédiger une annonce soignée pour chaque plateforme dans votre langue, puis publiez et suivez le tout depuis un seul écran.",
  tosNotice:
    "Ces plateformes n'autorisent pas la publication automatique. Nous générons donc une annonce prête à coller pour chacune et ouvrons sa page de publication. Vous gardez le contrôle.",
  carDetails: "Votre voiture",
  carDetailsSub:
    "Saisissez les détails une seule fois. Nous adaptons l'annonce à chaque site.",
  make: "Marque",
  model: "Modèle",
  year: "Année",
  price: "Prix",
  currency: "Devise",
  mileage: "Kilométrage",
  transmission: "Boîte de vitesses",
  fuel: "Carburant",
  color: "Couleur",
  condition: "État",
  vin: "Numéro de série (VIN)",
  location: "Localisation",
  sellerName: "Votre nom",
  contact: "Contact (téléphone ou e-mail)",
  notes: "Autre chose ?",
  notesPlaceholder:
    "Pneus neufs, entretien récent, premier propriétaire, raison de la vente...",
  optional: "facultatif",
  photos: "Photos",
  addPhotos: "Ajouter des photos",
  selectPlaceholder: "Sélectionner...",
  automatic: "Automatique",
  manual: "Manuelle",
  gas: "Essence",
  diesel: "Diesel",
  hybrid: "Hybride",
  electric: "Électrique",
  excellent: "Excellent",
  good: "Bon",
  fair: "Correct",
  generate: "Générer les annonces",
  generating: "Rédaction de vos annonces...",
  regenerate: "Régénérer",
  copy: "Copier",
  copied: "Copié !",
  openSite: "Ouvrir la page de publication",
  markPosted: "Marquer publié",
  markDraft: "Marquer brouillon",
  clearAll: "Tout effacer",
  listings: "Vos annonces par plateforme",
  listingsSub:
    "Copiez chaque annonce, ouvrez le site et collez. Suivez le statut ici.",
  emptyListings:
    "Renseignez les détails de votre voiture et cliquez sur Générer pour voir une annonce adaptée à chaque plateforme.",
  statusNone: "Pas commencé",
  statusDraft: "Brouillon enregistré",
  statusPosted: "Publié",
  statusLabel: "Statut",
  errRequired: "Requis",
  errGenerateFailed: "Impossible de générer les annonces. Veuillez réessayer.",
  errNoKey:
    "La clé IA n'est pas configurée sur le serveur. Ajoutez ANTHROPIC_API_KEY.",
  footer:
    "AutoList vous aide à préparer et suivre vos annonces. Vous les publiez vous-même sur chaque plateforme, selon leurs règles.",
};

export const DICTS: Record<Lang, Dict> = { en, zh, fr };

export const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  zh: "中文",
  fr: "FR",
};

export function getDict(lang: Lang): Dict {
  return DICTS[lang] ?? en;
}
