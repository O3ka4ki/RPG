/* ==========================================================================
   Real-Life RPG: Destiny Board & Progression System - JavaScript Engine
   ========================================================================== */

// --- WEEKLY ROUTINES DEFINITION ---
const WEEKLY_ROUTINES = {
  1: { id: 'routine_1', dayName: '月曜日', title: '【月曜】プランシェ ＋ 胸トレ', type: 'routine', difficulty: 'HARD', xp: 70, gold: 35, icon: '🤸' },
  2: { id: 'routine_2', dayName: '火曜日', title: '【火曜】懸垂セッション', type: 'routine', difficulty: 'NORMAL', xp: 50, gold: 25, icon: '🏋️' },
  3: { id: 'routine_3', dayName: '水曜日', title: '【水曜】足トレ (Leg Day)', type: 'routine', difficulty: 'HARD', xp: 70, gold: 35, icon: '🦵' },
  4: { id: 'routine_4', dayName: '木曜日', title: '【木曜】逆立ち ＋ 腹筋', type: 'routine', difficulty: 'NORMAL', xp: 50, gold: 25, icon: '🤸' },
  5: { id: 'routine_5', dayName: '金曜日', title: '【金曜】懸垂セッション', type: 'routine', difficulty: 'NORMAL', xp: 50, gold: 25, icon: '🏋️' },
  6: { id: 'routine_6', dayName: '土曜日', title: '【土曜】ランニング (メインラン)', type: 'routine', difficulty: 'BOSS', xp: 120, gold: 60, icon: '🏃' },
  0: { id: 'routine_0', dayName: '日曜日', title: '【日曜】ストレッチ ＆ コンディショニング (ラン予備日)', type: 'routine', difficulty: 'EASY', xp: 40, gold: 20, icon: '🧘' }
};

// --- INITIAL DEFAULT STATE WITH CALISTHENICS & DETAILED MARATHON TREES ---
const DEFAULT_STATE = {
  player: {
    name: '冒険者',
    title: '【ハーフマラソンランナー】',
    level: 1,
    xp: 0,
    nextXp: 100,
    gold: 50,
    streak: { current: 0, max: 0, lastDate: '' }
  },
  categories: {
    calisthenics: { name: '🤸 カリステニクス (自重技)', icon: '🤸' },
    running: { name: '🏃 ランニング (マラソン・有酸素)', icon: '🏃' },
    knowledge: { name: '🧠 知識・学習', icon: '🧠' },
    spirit: { name: '🧘 精神・日課', icon: '🧘' },
    creative: { name: '🎨 創作・スキル', icon: '🎨' },
    lifestyle: { name: '💰 生活・環境', icon: '💰' }
  },
  nodes: [
    // --- ROOT NODE ---
    {
      id: 'cal_root',
      title: '基礎体力・運動習慣',
      category: 'calisthenics',
      icon: '💪',
      stage: 'Step 0',
      desc: '自重トレーニングやランニングのスタート地点！',
      level: 1,
      maxLevel: 1,
      parentId: null,
      x: 1500,
      y: 1500
    },

    // --- RUNNING: Multi-Branch Full Marathon Route (Post-Half Marathon) ---
    {
      id: 'run_half',
      title: 'ハーフマラソン完走 (21.0975km)',
      category: 'running',
      icon: '🏅',
      stage: 'Step 1 (基準達成)',
      desc: '21kmを持続して走り切る基本スタミナが完成。ここからフルマラソン完走へ！',
      level: 1,
      maxLevel: 1,
      parentId: 'cal_root',
      x: 1500,
      y: 1300
    },

    // Branch A: Distance & Long Run (距離・ロング走)
    {
      id: 'run_25k',
      title: '25km LSD走',
      category: 'running',
      icon: '👟',
      stage: 'A-1 (距離)',
      desc: 'ゆっくりペースで25km持続走。長時間走る基礎体力と脂肪燃焼脚を作る。',
      level: 0,
      maxLevel: 3,
      parentId: 'run_half',
      x: 1150,
      y: 1080
    },
    {
      id: 'run_30k',
      title: '30km走 達成 (30kmの壁攻略)',
      category: 'running',
      icon: '⛰️',
      stage: 'A-2 (最重要難所)',
      desc: 'マラソン最大の難関「30kmの壁」を突破する実戦ロング走。',
      level: 0,
      maxLevel: 5,
      parentId: 'run_25k',
      x: 1150,
      y: 860
    },
    {
      id: 'run_35k',
      title: '35km ロング走',
      category: 'running',
      icon: '🔥',
      stage: 'A-3 (最終ロング)',
      desc: '30km以降の疲れに打ち勝ち、ラストまで走力を維持する。',
      level: 0,
      maxLevel: 5,
      parentId: 'run_30k',
      x: 1150,
      y: 640
    },

    // Branch B: Pacing & Speed (ペース・心肺強化)
    {
      id: 'run_pace10k',
      title: '10km Mペース走',
      category: 'running',
      icon: '⏱️',
      stage: 'B-1 (ペース定着)',
      desc: '目標レースペース（Mペース）で10kmを持続して走る感覚を掴む。',
      level: 0,
      maxLevel: 3,
      parentId: 'run_half',
      x: 1500,
      y: 1080
    },
    {
      id: 'run_bu15k',
      title: '15km ビルドアップ走',
      category: 'running',
      icon: '⚡',
      stage: 'B-2 (粘り強化)',
      desc: '5kmごとに段階的にペースを上げ、後半スパートの粘り強さを養う。',
      level: 0,
      maxLevel: 3,
      parentId: 'run_pace10k',
      x: 1500,
      y: 860
    },
    {
      id: 'run_pace20k',
      title: '20km Mペース持続走',
      category: 'running',
      icon: '🎯',
      stage: 'B-3 (本番想定)',
      desc: '目標レースペースでハーフ相当の20kmを余裕を持って走り切る。',
      level: 0,
      maxLevel: 4,
      parentId: 'run_bu15k',
      x: 1500,
      y: 640
    },

    // Branch C: Conditioning & Strength (コンディショニング・体幹補強)
    {
      id: 'run_stretch',
      title: '股関節 ＆ ハムストリング・ストレッチ',
      category: 'running',
      icon: '🧘',
      stage: 'C-1 (可動域)',
      desc: '股関節と腿裏をケアし、ストライドの伸びと怪我防止を徹底。',
      level: 0,
      maxLevel: 3,
      parentId: 'run_half',
      x: 1850,
      y: 1080
    },
    {
      id: 'run_core',
      title: '下半身 ＆ 体幹補強筋トレ',
      category: 'running',
      icon: '🏋️',
      stage: 'C-2 (フォーム安定)',
      desc: 'お尻と体幹を鍛え、長距離でもブレないフォームの体幹軸を作る。',
      level: 0,
      maxLevel: 3,
      parentId: 'run_stretch',
      x: 1850,
      y: 860
    },

    // Master Node (D): Full Marathon Completion
    {
      id: 'run_full',
      title: 'フルマラソン完走 (42.195km)',
      category: 'running',
      icon: '👑',
      stage: 'MASTER',
      desc: 'すべての準備を完遂し、42.195kmの感動的なゴールラインを完走！',
      level: 0,
      maxLevel: 5,
      parentId: 'run_35k',
      x: 1500,
      y: 420
    },

    // --- CALISTHENICS: Handstand Push-Up Route ---
    {
      id: 'hspu_1',
      title: '壁寄り倒立 30秒ホールド',
      category: 'calisthenics',
      icon: '🧱',
      stage: 'Step 1',
      desc: '壁を使って倒立姿勢を維持。肩の接地感覚と倒立姿勢に慣れる。',
      level: 0,
      maxLevel: 3,
      parentId: 'cal_root',
      x: 1320,
      y: 1350
    },
    {
      id: 'hspu_2',
      title: 'パイクプッシュアップ 10回',
      category: 'calisthenics',
      icon: '📐',
      stage: 'Step 2',
      desc: '腰を高く上げて斜め前に身体を沈め、肩で押し上げる。',
      level: 0,
      maxLevel: 3,
      parentId: 'hspu_1',
      x: 1160,
      y: 1220
    },
    {
      id: 'hspu_3',
      title: '壁サポート倒立腕立て伏せ',
      category: 'calisthenics',
      icon: '🤸',
      stage: 'Step 3',
      desc: '壁倒立の状態で頭が床に触れるまで下ろし、力強く押し上げる。',
      level: 0,
      maxLevel: 5,
      parentId: 'hspu_2',
      x: 1000,
      y: 1100
    },
    {
      id: 'hspu_4',
      title: 'フリーハンドスタンド 10秒',
      category: 'calisthenics',
      icon: '⚖️',
      stage: 'Step 4',
      desc: '壁を使わず自立して倒立バランスを保つ（手首と指のコントロール）。',
      level: 0,
      maxLevel: 5,
      parentId: 'hspu_3',
      x: 840,
      y: 980
    },
    {
      id: 'hspu_5',
      title: '倒立腕立て伏せ (完成形)',
      category: 'calisthenics',
      icon: '👑',
      stage: 'Step 5 (MASTER)',
      desc: '壁なしで自立倒立からクリーンなフォームで倒立腕立て伏せを達成！',
      level: 0,
      maxLevel: 5,
      parentId: 'hspu_4',
      x: 680,
      y: 860
    },

    // --- CALISTHENICS: Muscle-Up Route ---
    {
      id: 'mu_1',
      title: 'ハイスピード懸垂 10回',
      category: 'calisthenics',
      icon: '🏋️',
      stage: 'Step 1',
      desc: '胸またはみぞおちがバーに触れるほど爆発的な力で引き上げる。',
      level: 0,
      maxLevel: 3,
      parentId: 'cal_root',
      x: 1680,
      y: 1350
    },
    {
      id: 'mu_2',
      title: 'ストレートバー・ディップス',
      category: 'calisthenics',
      icon: '➖',
      stage: 'Step 2',
      desc: 'バーの上に体を乗せた状態からしっかり押し下げる。',
      level: 0,
      maxLevel: 3,
      parentId: 'mu_1',
      x: 1840,
      y: 1220
    },
    {
      id: 'mu_3',
      title: 'マッスルアップ・トランジション',
      category: 'calisthenics',
      icon: '🔄',
      stage: 'Step 3',
      desc: '引き上げから押し出しへの切り替え（乗り越え）を練習。',
      level: 0,
      maxLevel: 5,
      parentId: 'mu_2',
      x: 2000,
      y: 1100
    },
    {
      id: 'mu_4',
      title: 'クリーン・マッスルアップ',
      category: 'calisthenics',
      icon: '🔥',
      stage: 'Step 4 (MASTER)',
      desc: 'キッキングを使わず綺麗なフォームでマッスルアップを達成！',
      level: 0,
      maxLevel: 5,
      parentId: 'mu_3',
      x: 2160,
      y: 980
    },

    // --- KNOWLEDGE ROUTE ---
    {
      id: 'know_root',
      title: '毎日15分 読書・学習',
      category: 'knowledge',
      icon: '📖',
      stage: 'Step 1',
      desc: '知識を深める習慣を確立する。',
      level: 0,
      maxLevel: 5,
      parentId: 'cal_root',
      x: 1350,
      y: 1680
    },

    // --- SPIRIT ROUTE ---
    {
      id: 'spi_root',
      title: 'マインドフルネス・瞑想5分',
      category: 'spirit',
      icon: '🧘',
      stage: 'Step 1',
      desc: '心を静め、集中力と意志力を高める。',
      level: 0,
      maxLevel: 5,
      parentId: 'cal_root',
      x: 1650,
      y: 1680
    },

    // --- LEG TRAINING ROUTE ---
    {
      id: 'leg_step1',
      title: 'ノーマルスクワット ＆ ランジ',
      category: 'calisthenics',
      icon: '🦵',
      stage: 'Step 1 (基礎脚力)',
      desc: 'Lvl.1: 深さ太もも平行スクワット15回×2 / Lvl.2: ランジ左右各15回×2 / Lvl.3: 連続スクワット30回＋ランジ左右各20回(休憩なし完遂)',
      level: 0,
      maxLevel: 3,
      parentId: 'cal_root',
      x: 1100,
      y: 1650
    },
    {
      id: 'leg_step2',
      title: 'ブルガリアンスクワット ＆ カーフレイズ',
      category: 'calisthenics',
      icon: '🦵',
      stage: 'Step 2 (片脚軸力)',
      desc: 'Lvl.1: ブルガリアン左右各10回×2 / Lvl.2: 左右各15回×3 / Lvl.3: 片脚カーフレイズ左右各20回×3',
      level: 0,
      maxLevel: 3,
      parentId: 'leg_step1',
      x: 900,
      y: 1800
    },
    {
      id: 'leg_step3',
      title: 'アシストピストル ＆ ジャンプスクワット',
      category: 'calisthenics',
      icon: '⚡',
      stage: 'Step 3 (爆発力)',
      desc: 'Lvl.1: アシスト片脚スクワット各5回×3 / Lvl.2: ジャンプスクワット15回×3 / Lvl.3: 40cm椅子片脚立ち上がり各8回×3',
      level: 0,
      maxLevel: 3,
      parentId: 'leg_step2',
      x: 700,
      y: 1950
    },
    {
      id: 'leg_step4',
      title: 'ピストルスクワット (完全片脚フルスクワット)',
      category: 'calisthenics',
      icon: '👑',
      stage: 'Step 4 (MASTER)',
      desc: 'Lvl.1: 片脚フルスクワット1回成功 / Lvl.2: 各3回×2 / Lvl.3: 各5回×3 / Lvl.4: 各8回×3 / Lvl.5: 各10回×3完全マスター！',
      level: 0,
      maxLevel: 5,
      parentId: 'leg_step3',
      x: 500,
      y: 2100
    },

    // --- CORE TRAINING ROUTE ---
    {
      id: 'core_step1',
      title: 'フロントプランク ＆ サイドプランク',
      category: 'calisthenics',
      icon: '🧘‍♂️',
      stage: 'Step 1 (静的体幹)',
      desc: 'Lvl.1: プランク30秒×3 / Lvl.2: サイドプランク左右各45秒×2 / Lvl.3: プランク60秒＋サイド各60秒(30秒休憩完遂)',
      level: 0,
      maxLevel: 3,
      parentId: 'cal_root',
      x: 1500,
      y: 1750
    },
    {
      id: 'core_step2',
      title: 'レッグレイズ ＆ タックホローボディ',
      category: 'calisthenics',
      icon: '🧘‍♂️',
      stage: 'Step 2 (腹筋・骨盤)',
      desc: 'Lvl.1: 膝曲げレッグレイズ15回×3 / Lvl.2: 伸ばしたレッグレイズ15回×3 / Lvl.3: タックホローボディ30秒×3',
      level: 0,
      maxLevel: 3,
      parentId: 'core_step1',
      x: 1500,
      y: 1950
    },
    {
      id: 'core_step3',
      title: 'ハンギングレッグレイズ (鉄棒吊り下げ)',
      category: 'calisthenics',
      icon: '🤸',
      stage: 'Step 3 (下腹・腸腰筋)',
      desc: 'Lvl.1: ぶら下がり膝上げ15回×3 / Lvl.2: 太もも90度レッグレイズ10回×3 / Lvl.3: つま先鉄棒タッチ(Toe to Bar) 8回×3',
      level: 0,
      maxLevel: 3,
      parentId: 'core_step2',
      x: 1500,
      y: 2150
    },
    {
      id: 'core_step4',
      title: 'L-Sit (Lシット)',
      category: 'calisthenics',
      icon: '👑',
      stage: 'Step 4 (MASTER)',
      desc: 'Lvl.1: タックL-Sit 10秒×3 / Lvl.2: 片脚L-Sit 左右各10秒×3 / Lvl.3: 両脚L-Sit 10秒×3 / Lvl.4: 20秒×3 / Lvl.5: 30秒×3完全マスター！',
      level: 0,
      maxLevel: 5,
      parentId: 'core_step3',
      x: 1500,
      y: 2350
    },

    // --- FLEXIBILITY ROUTE ---
    {
      id: 'flex_step1',
      title: '全身基礎柔軟性 (硬さ解消)',
      category: 'spirit',
      icon: '🧘',
      stage: 'Step 1 (基礎柔軟)',
      desc: 'Lvl.1: 風呂上がり全身ストレッチ各30秒×2(週4日以上) / Lvl.2: 前屈で中指がつま先に触れる(30秒) / Lvl.3: ローランジ左右各45秒',
      level: 0,
      maxLevel: 3,
      parentId: 'cal_root',
      x: 1900,
      y: 1650
    },
    {
      id: 'flex_step2',
      title: '可動域の拡大 (中級レベル)',
      category: 'spirit',
      icon: '🧘',
      stage: 'Step 2 (可動域向上)',
      desc: 'Lvl.1: 前屈で第2関節がつま先に触れる(30秒) / Lvl.2: 90/90股関節膝倒し左右各10回 / Lvl.3: パピーポーズで胸が床につく(30秒)',
      level: 0,
      maxLevel: 3,
      parentId: 'flex_step1',
      x: 2100,
      y: 1800
    },
    {
      id: 'flex_step3',
      title: '高度な柔軟性 (上級レベル)',
      category: 'spirit',
      icon: '🧘',
      stage: 'Step 3 (上級可動域)',
      desc: 'Lvl.1: 前屈で両手のひら全体が床につく(30秒) / Lvl.2: 90度以上開脚前傾で両肘が床につく(30秒) / Lvl.3: ブリッジ肘伸ばし15秒',
      level: 0,
      maxLevel: 3,
      parentId: 'flex_step2',
      x: 2300,
      y: 1950
    },
    {
      id: 'flex_step4',
      title: '全身可動域マスター (MASTER)',
      category: 'spirit',
      icon: '👑',
      stage: 'Step 4 (MASTER)',
      desc: 'Lvl.1: 開脚前屈でおでこが床につく(30秒) / Lvl.2: ブリッジ胸開き30秒 / Lvl.3〜5: 開脚前屈でお腹・胸・顎が完全に床ベタ付け(30秒)',
      level: 0,
      maxLevel: 5,
      parentId: 'flex_step3',
      x: 2500,
      y: 2100
    }
  ],

  // Quests List
  quests: [
    { id: 'q_1', title: '25km LSD走（またはロングラン）を実施する', type: 'custom', difficulty: 'HARD', xp: 120, gold: 60, completed: false },
    { id: 'q_2', title: '補給ジェルを摂りながらの長距離走練習', type: 'custom', difficulty: 'NORMAL', xp: 50, gold: 25, completed: false },
    { id: 'q_3', title: '30km走を攻略し「30kmの壁」を突破する', type: 'custom', difficulty: 'BOSS', xp: 300, gold: 150, completed: false }
  ],

  // Routine Completion Log
  routineCompletions: {},

  // Reward Shop Items
  rewards: [
    { id: 'r_1', name: 'お気に入りのカフェで贅沢ドリンク', icon: '☕', cost: 100, usedCount: 0 },
    { id: 'r_2', name: '長距離ラン後の至福の銭湯・水風呂・サウナ', icon: '♨️', cost: 200, usedCount: 0 },
    { id: 'r_3', name: 'エナジージェル詰め合わせ ＆ レースギア購入', icon: '👟', cost: 600, usedCount: 0 }
  ]
};

// --- APP STATE ---
let state = loadData();
let radarChartInstance = null;
let currentQuestFilter = 'all';
let selectedWeekday = new Date().getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

// Viewport Pan & Zoom State
let panX = 0;
let panY = 0;
let zoom = 1;
let isDraggingViewport = false;
let startX, startY;

// Node Drag State
let draggingNodeId = null;
let nodeStartX = 0, nodeStartY = 0;
let isNodeMoved = false;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  setupNavigation();
  setupViewportPanZoom();
  renderApp();
  setupEventListeners();

  setTimeout(() => {
    centerBoardOnRoot();
  }, 100);
});

function initLucideIcons() {
  if (window.lucide) {
    try {
      window.lucide.createIcons();
    } catch (e) {
      console.warn('Lucide icon error:', e);
    }
  }
}

// --- DATA PERSISTENCE & MIGRATION ---
function loadData() {
  const saved = localStorage.getItem('rpg_progression_data_v8');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.nodes && Array.isArray(parsed.nodes) && parsed.nodes.length > 0) {
        if (!parsed.routineCompletions) parsed.routineCompletions = {};
        if (!parsed.player.streak) parsed.player.streak = { current: 0, max: 0, lastDate: '' };
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved state:', e);
    }
  }
  const v7Saved = localStorage.getItem('rpg_progression_data_v7');
  if (v7Saved) {
    try {
      const parsed = JSON.parse(v7Saved);
      if (parsed && parsed.nodes) {
        parsed.nodes = JSON.parse(JSON.stringify(DEFAULT_STATE.nodes));
        if (!parsed.routineCompletions) parsed.routineCompletions = {};
        if (!parsed.player.streak) parsed.player.streak = { current: 0, max: 0, lastDate: '' };
        return parsed;
      }
    } catch (e) {}
  }
  localStorage.removeItem('rpg_life_data');
  localStorage.removeItem('rpg_progression_data_v2');
  localStorage.removeItem('rpg_progression_data_v3');
  localStorage.removeItem('rpg_progression_data_v4');
  localStorage.removeItem('rpg_progression_data_v5');
  localStorage.removeItem('rpg_progression_data_v6');
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function saveData() {
  localStorage.setItem('rpg_progression_data_v8', JSON.stringify(state));
  renderApp();
}

// --- NAVIGATION TABS ---
function setupNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById(`tab-${targetTab}`);
      if (panel) panel.classList.add('active');

      if (targetTab === 'status') {
        renderCategoryScores();
        renderRadarChart();
      } else if (targetTab === 'destiny') {
        renderDestinyBoard();
      }
    });
  });
}

// --- RENDER ENGINE ---
function renderApp() {
  updatePlayerHeader();
  renderQuestsList();
  renderRewardsList();
  renderDestinyBoard();
  calculatePlayerTitle();
}

// --- CATEGORY AVERAGE SCORE CALCULATOR ---
function getCategoryScores() {
  const catScores = {};
  const catCounts = {};

  if (!state.categories) state.categories = DEFAULT_STATE.categories;

  Object.keys(state.categories).forEach(catKey => {
    catScores[catKey] = 0;
    catCounts[catKey] = 0;
  });

  (state.nodes || []).forEach(node => {
    const cat = node.category || 'calisthenics';
    if (catScores[cat] === undefined) {
      catScores[cat] = 0;
      catCounts[cat] = 0;
    }
    const maxLvl = node.maxLevel || 1;
    const lvl = node.level || 0;
    const ratio = (lvl / maxLvl) * 100;
    catScores[cat] += ratio;
    catCounts[cat] += 1;
  });

  const averages = {};
  let totalSum = 0;
  let totalCatCount = 0;

  Object.keys(catScores).forEach(catKey => {
    const count = catCounts[catKey];
    const avg = count > 0 ? catScores[catKey] / count : 0;
    averages[catKey] = Math.round(avg * 10) / 10;
    totalSum += averages[catKey];
    totalCatCount += 1;
  });

  const overallAvg = totalCatCount > 0 ? Math.round((totalSum / totalCatCount) * 10) / 10 : 0;
  return { averages, overallAvg };
}

// --- PLAYER HEADER ---
function checkStreakResetOnLoad() {
  if (!state.player.streak) {
    state.player.streak = { current: 0, max: 0, lastDate: '' };
    return;
  }
  const todayStr = getTodayKey();
  const lastDate = state.player.streak.lastDate;
  if (!lastDate) return;

  if (lastDate === todayStr) return;

  const d = new Date();
  d.setDate(d.getDate() - 1);
  const yesterdayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  if (lastDate !== yesterdayStr && lastDate !== todayStr) {
    state.player.streak.current = 0;
  }
}

function updatePlayerHeader() {
  const { overallAvg } = getCategoryScores();
  checkStreakResetOnLoad();

  const nameEl = document.getElementById('playerName');
  if (nameEl) nameEl.textContent = state.player.name || '冒険者';
  
  const titleEl = document.getElementById('playerTitle');
  if (titleEl) titleEl.textContent = state.player.title || '【未熟な冒険者】';
  
  const lvlBadge = document.getElementById('playerLevelBadge');
  if (lvlBadge) lvlBadge.textContent = `Lv.${state.player.level || 1}`;
  
  const avgScoreEl = document.getElementById('overallAvgScore');
  if (avgScoreEl) avgScoreEl.textContent = overallAvg.toFixed(1);
  
  const goldEl = document.getElementById('playerGold');
  if (goldEl) goldEl.textContent = state.player.gold || 0;

  const streakObj = state.player.streak || { current: 0, max: 0 };
  const streakEl = document.getElementById('playerStreak');
  if (streakEl) streakEl.textContent = streakObj.current || 0;
  
  const streakBox = document.getElementById('streakBadgeBox');
  if (streakBox) {
    streakBox.title = `連続クリア日数: ${streakObj.current || 0}日 (最高記録: ${streakObj.max || 0}日)`;
    if ((streakObj.current || 0) > 0) {
      streakBox.classList.add('active-streak');
    } else {
      streakBox.classList.remove('active-streak');
    }
  }

  const nextXp = state.player.nextXp || 100;
  const currentXp = state.player.xp || 0;
  const xpPercent = Math.min(100, Math.floor((currentXp / nextXp) * 100));
  
  const xpFill = document.getElementById('xpBarFill');
  if (xpFill) xpFill.style.width = `${xpPercent}%`;
  
  const xpText = document.getElementById('xpText');
  if (xpText) xpText.textContent = `${currentXp} / ${nextXp} XP`;
}

function gainXP(amount) {
  state.player.xp = (state.player.xp || 0) + amount;
  while (state.player.xp >= state.player.nextXp) {
    state.player.xp -= state.player.nextXp;
    state.player.level = (state.player.level || 1) + 1;
    state.player.nextXp = Math.floor(state.player.nextXp * 1.3);

    triggerConfetti();
    alert(`🎉 LEVEL UP! レベル ${state.player.level} に上がりました！`);
  }
  saveData();
}

function gainRewards(gold) {
  state.player.gold = (state.player.gold || 0) + gold;
}

// --- TITLE CALCULATOR ---
function calculatePlayerTitle() {
  const { overallAvg, averages } = getCategoryScores();
  const calScore = averages.calisthenics || 0;
  const runScore = averages.running || 0;

  let newTitle = '【ハーフマラソンランナー】';
  let desc = '25km走や30kmの壁を乗り越え、フルマラソン完走を目指そう。';

  if (runScore >= 95) {
    newTitle = '【フルマラソン完走者】';
    desc = '42.195kmを駆け抜けた不屈のSub4/完走ランナー！';
  } else if (runScore >= 70) {
    newTitle = '【30km突破ランナー】';
    desc = 'マラソン最大の難所「30kmの壁」を打ち破った猛者。';
  } else if (runScore >= 40) {
    newTitle = '【25kmロング走実践者】';
    desc = '2時間半以上の持続走でフルへの足ができつつあるランナー。';
  } else if (calScore >= 60) {
    newTitle = '【超人アスリート】';
    desc = '高度な自重技と走力を兼ね備えたオールラウンダー。';
  }

  state.player.title = newTitle;
  const titleEl = document.getElementById('playerTitle');
  if (titleEl) titleEl.textContent = newTitle;
  const titleDescEl = document.getElementById('titleDescription');
  if (titleDescEl) titleDescEl.textContent = desc;
}

// --- DESTINY BOARD PAN & ZOOM ENGINE ---
function setupViewportPanZoom() {
  const viewport = document.getElementById('boardViewport');
  if (!viewport) return;

  viewport.addEventListener('mousedown', (e) => {
    if (e.target.closest('.board-node')) return;
    isDraggingViewport = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
  });

  viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      if (e.target.closest('.board-node')) return;
      isDraggingViewport = true;
      startX = e.touches[0].clientX - panX;
      startY = e.touches[0].clientY - panY;
    }
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    if (isDraggingViewport) {
      panX = e.clientX - startX;
      panY = e.clientY - startY;
      applyTransform();
    } else if (draggingNodeId) {
      const node = state.nodes.find(n => n.id === draggingNodeId);
      if (node) {
        isNodeMoved = true;
        node.x = Math.round(nodeStartX + (e.clientX - startX) / zoom);
        node.y = Math.round(nodeStartY + (e.clientY - startY) / zoom);
        renderDestinyBoard();
      }
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (isDraggingViewport && e.touches.length === 1) {
      panX = e.touches[0].clientX - startX;
      panY = e.touches[0].clientY - startY;
      applyTransform();
    } else if (draggingNodeId && e.touches.length === 1) {
      const node = state.nodes.find(n => n.id === draggingNodeId);
      if (node) {
        isNodeMoved = true;
        node.x = Math.round(nodeStartX + (e.touches[0].clientX - startX) / zoom);
        node.y = Math.round(nodeStartY + (e.touches[0].clientY - startY) / zoom);
        renderDestinyBoard();
      }
    }
  }, { passive: true });

  window.addEventListener('mouseup', () => {
    if (draggingNodeId && isNodeMoved) {
      saveData();
    }
    isDraggingViewport = false;
    draggingNodeId = null;
    isNodeMoved = false;
  });

  window.addEventListener('touchend', () => {
    if (draggingNodeId && isNodeMoved) {
      saveData();
    }
    isDraggingViewport = false;
    draggingNodeId = null;
    isNodeMoved = false;
  });

  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    zoom = Math.min(Math.max(0.4, zoom * zoomFactor), 2.2);
    applyTransform();
  }, { passive: false });

  const resetBtn = document.getElementById('resetViewBtn');
  if (resetBtn) resetBtn.addEventListener('click', centerBoardOnRoot);
}

function centerBoardOnRoot() {
  const viewport = document.getElementById('boardViewport');
  const rootNode = (state.nodes || []).find(n => n.id === 'cal_root') || state.nodes[0];
  if (!rootNode || !viewport) return;

  const rect = viewport.getBoundingClientRect();
  zoom = 1;
  panX = (rect.width / 2) - rootNode.x;
  panY = (rect.height / 2) - rootNode.y;
  applyTransform();
}

function applyTransform() {
  const container = document.getElementById('boardCanvasContainer');
  if (container) {
    container.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
  }
}

function renderDestinyBoard() {
  const container = document.getElementById('nodesContainer');
  const svg = document.getElementById('connectionsSvg');
  if (!container || !svg) return;

  container.innerHTML = '';
  const defs = svg.querySelector('defs');
  svg.innerHTML = '';
  if (defs) svg.appendChild(defs);

  // SVG Connector Lines
  (state.nodes || []).forEach(node => {
    if (node.parentId) {
      const parentNode = state.nodes.find(n => n.id === node.parentId);
      if (parentNode) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', parentNode.x);
        line.setAttribute('y1', parentNode.y);
        line.setAttribute('x2', node.x);
        line.setAttribute('y2', node.y);

        const isParentMastered = parentNode.level > 0;
        const isNodeMastered = node.level > 0;

        if (isParentMastered && isNodeMastered) {
          line.setAttribute('stroke', '#f59e0b');
          line.setAttribute('stroke-width', '4');
          line.setAttribute('marker-end', 'url(#arrow)');
        } else if (isParentMastered) {
          line.setAttribute('stroke', '#3b82f6');
          line.setAttribute('stroke-width', '3');
          line.setAttribute('stroke-dasharray', '6 6');
          line.setAttribute('marker-end', 'url(#arrow)');
        } else {
          line.setAttribute('stroke', 'rgba(255, 255, 255, 0.15)');
          line.setAttribute('stroke-width', '2');
          line.setAttribute('marker-end', 'url(#arrow-locked)');
        }
        svg.appendChild(line);
      }
    }
  });

  // Render Nodes
  (state.nodes || []).forEach(node => {
    const el = document.createElement('div');
    el.className = 'board-node';
    if (node.id === draggingNodeId) {
      el.classList.add('dragging');
    }
    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;

    const parentNode = node.parentId ? state.nodes.find(n => n.id === node.parentId) : null;
    const isParentUnlocked = !parentNode || parentNode.level > 0;

    const maxLvl = node.maxLevel || 1;
    const curLvl = node.level || 0;

    if (curLvl >= maxLvl) {
      el.classList.add('mastered');
    } else if (curLvl > 0) {
      el.classList.add('mastered');
    } else if (isParentUnlocked) {
      el.classList.add('unlockable');
    } else {
      el.classList.add('locked');
    }

    el.innerHTML = `
      ${node.stage ? `<span class="stage-tag">${node.stage}</span>` : ''}
      <span class="node-icon">${node.icon || '⭐'}</span>
      <span class="node-label">${node.title || 'ノード'}</span>
      <span class="node-level-tag">${curLvl}/${maxLvl}</span>
    `;

    el.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      draggingNodeId = node.id;
      nodeStartX = node.x;
      nodeStartY = node.y;
      startX = e.clientX;
      startY = e.clientY;
      isNodeMoved = false;
    });

    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        e.stopPropagation();
        draggingNodeId = node.id;
        nodeStartX = node.x;
        nodeStartY = node.y;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isNodeMoved = false;
      }
    }, { passive: true });

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isNodeMoved) {
        openNodeModal(node);
      }
    });

    container.appendChild(el);
  });
}

// --- MODAL ENGINE ---
let selectedNode = null;

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
}

function openNodeModal(node) {
  closeAllModals();
  selectedNode = node;
  
  const iconEl = document.getElementById('modalNodeIcon');
  if (iconEl) iconEl.textContent = node.icon || '⭐';
  
  const titleEl = document.getElementById('modalNodeTitle');
  if (titleEl) titleEl.textContent = node.title || 'ノード名';
  
  const catEl = document.getElementById('modalNodeCategory');
  if (catEl) catEl.textContent = (node.category || 'RUNNING').toUpperCase();
  
  const descEl = document.getElementById('modalNodeDesc');
  if (descEl) descEl.textContent = node.desc || '説明なし';
  
  const curLvl = node.level || 0;
  const maxLvl = node.maxLevel || 1;
  const lvlEl = document.getElementById('modalNodeLevel');
  if (lvlEl) lvlEl.textContent = `${curLvl} / ${maxLvl}`;

  const progressPercent = (curLvl / maxLvl) * 100;
  const fillEl = document.getElementById('modalNodeProgressFill');
  if (fillEl) fillEl.style.width = `${progressPercent}%`;

  const parentNode = node.parentId ? state.nodes.find(n => n.id === node.parentId) : null;
  const isParentUnlocked = !parentNode || parentNode.level > 0;
  const btn = document.getElementById('upgradeNodeBtn');

  if (btn) {
    if (curLvl >= maxLvl) {
      btn.disabled = true;
      btn.textContent = '✨ MASTERED (最高ステップ達成)';
    } else if (!isParentUnlocked) {
      btn.disabled = true;
      btn.textContent = '🔒 前提ステップを未達成です';
    } else {
      btn.disabled = false;
      btn.innerHTML = `✨ クリア / ステップアップ (${curLvl + 1} / ${maxLvl})`;
    }
  }

  const modal = document.getElementById('nodeModal');
  if (modal) modal.classList.add('active');
}

function upgradeSelectedNode() {
  if (!selectedNode) return;
  
  const curLvl = selectedNode.level || 0;
  const maxLvl = selectedNode.maxLevel || 1;

  if (curLvl >= maxLvl) return;

  selectedNode.level = curLvl + 1;
  gainRewards(20);
  gainXP(30);

  triggerConfetti();
  saveData();
  openNodeModal(selectedNode);
}

// --- NODE EDIT & DELETE ENGINE ---
function openEditNodeModal(node = null) {
  closeAllModals();
  populateParentNodeDropdown();

  const titleModal = document.getElementById('editNodeModalTitle');
  const editId = document.getElementById('editNodeId');
  const nameInput = document.getElementById('nodeNameInput');
  const stageInput = document.getElementById('nodeStageInput');
  const catInput = document.getElementById('nodeCategoryInput');
  const iconInput = document.getElementById('nodeIconInput');
  const descInput = document.getElementById('nodeDescInput');
  const maxLvlInput = document.getElementById('nodeMaxLevelInput');
  const parentInput = document.getElementById('nodeParentInput');

  if (node) {
    titleModal.textContent = 'ノード（ステップ）の編集';
    editId.value = node.id;
    nameInput.value = node.title || '';
    stageInput.value = node.stage || '';
    catInput.value = node.category || 'running';
    iconInput.value = node.icon || '🏃';
    descInput.value = node.desc || '';
    maxLvlInput.value = node.maxLevel || 5;
    parentInput.value = node.parentId || '';
  } else {
    titleModal.textContent = 'ステップ（ノード）の追加';
    editId.value = '';
    nameInput.value = '';
    stageInput.value = 'Step';
    catInput.value = 'running';
    iconInput.value = '🏃';
    descInput.value = '';
    maxLvlInput.value = 5;
    parentInput.value = '';
  }

  document.getElementById('editNodeModal').classList.add('active');
}

function saveNodeFromForm() {
  const id = document.getElementById('editNodeId').value;
  const title = document.getElementById('nodeNameInput').value;
  const stage = document.getElementById('nodeStageInput').value || 'Step';
  const category = document.getElementById('nodeCategoryInput').value;
  const icon = document.getElementById('nodeIconInput').value || '⭐';
  const desc = document.getElementById('nodeDescInput').value;
  const maxLevel = parseInt(document.getElementById('nodeMaxLevelInput').value, 10) || 5;
  const parentId = document.getElementById('nodeParentInput').value || null;

  if (id) {
    const existingNode = state.nodes.find(n => n.id === id);
    if (existingNode) {
      existingNode.title = title;
      existingNode.stage = stage;
      existingNode.category = category;
      existingNode.icon = icon;
      existingNode.desc = desc;
      existingNode.maxLevel = maxLevel;
      existingNode.parentId = parentId !== id ? parentId : null;
    }
  } else {
    let posX = 1500, posY = 1500;
    if (parentId) {
      const parentNode = state.nodes.find(n => n.id === parentId);
      if (parentNode) {
        const angle = Math.random() * Math.PI * 2;
        posX = parentNode.x + Math.cos(angle) * 180;
        posY = parentNode.y + Math.sin(angle) * 180;
      }
    }
    state.nodes.push({
      id: `custom_${Date.now()}`,
      title, stage, category, icon, desc,
      level: 0, maxLevel, parentId,
      x: Math.round(posX), y: Math.round(posY)
    });
  }

  saveData();
  closeAllModals();
}

function deleteNode(nodeId) {
  if (!nodeId) return;
  const targetNode = state.nodes.find(n => n.id === nodeId);
  if (!targetNode) return;

  if (confirm(`ノード "${targetNode.title}" を削除してもよろしいですか？`)) {
    state.nodes.forEach(n => {
      if (n.parentId === nodeId) {
        n.parentId = targetNode.parentId || null;
      }
    });

    state.nodes = state.nodes.filter(n => n.id !== nodeId);
    saveData();
    closeAllModals();
  }
}

// --- RENDER CATEGORY SCORES & RADAR CHART ---
function renderCategoryScores() {
  const container = document.getElementById('categoryScoresList');
  if (!container) return;

  container.innerHTML = '';
  const { averages } = getCategoryScores();

  Object.keys(state.categories).forEach(catKey => {
    const catInfo = state.categories[catKey];
    const score = averages[catKey] || 0;

    const card = document.createElement('div');
    card.className = 'category-score-card';
    card.innerHTML = `
      <div class="score-card-header">
        <div class="category-title-group">
          <span>${catInfo.name}</span>
        </div>
        <span class="score-val">${score} %</span>
      </div>
      <div class="score-progress-bar">
        <div class="score-progress-fill" style="width: ${score}%;"></div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderRadarChart() {
  const ctx = document.getElementById('radarChart');
  if (!ctx) return;

  const { averages } = getCategoryScores();
  const labels = Object.keys(state.categories).map(k => state.categories[k].name);
  const dataVals = Object.keys(state.categories).map(k => averages[k] || 0);

  if (radarChartInstance) radarChartInstance.destroy();

  try {
    radarChartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: '平均達成度 (%)',
          data: dataVals,
          backgroundColor: 'rgba(16, 185, 129, 0.25)',
          borderColor: '#10b981',
          borderWidth: 2,
          pointBackgroundColor: '#34d399',
          pointBorderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: 'rgba(255, 255, 255, 0.15)' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            pointLabels: { color: '#fbbf24', font: { family: 'Plus Jakarta Sans', size: 11, weight: 'bold' } },
            ticks: { color: '#64748b', backdropColor: 'transparent' },
            min: 0,
            max: 100
          }
        },
        plugins: { legend: { display: false } }
      }
    });
  } catch (e) {
    console.warn('Chart.js render error:', e);
  }
}

function getTodayKey() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// --- QUEST LOG ---
function renderQuestsList() {
  const container = document.getElementById('questsContainer');
  if (!container) return;
  container.innerHTML = '';

  const todayKey = getTodayKey();
  const routineKey = `${todayKey}_day_${selectedWeekday}`;
  const currentRoutine = WEEKLY_ROUTINES[selectedWeekday];
  const isRoutineCompleted = !!(state.routineCompletions && state.routineCompletions[routineKey]);

  let itemsToRender = [];

  // 1. Routine Quest for selected day
  if (currentRoutine && (currentQuestFilter === 'all' || currentQuestFilter === 'routine')) {
    itemsToRender.push({
      id: currentRoutine.id,
      title: currentRoutine.title,
      type: 'routine',
      difficulty: currentRoutine.difficulty,
      xp: currentRoutine.xp,
      gold: currentRoutine.gold,
      completed: isRoutineCompleted,
      isRoutine: true,
      dayName: currentRoutine.dayName,
      icon: currentRoutine.icon
    });
  }

  // 2. Custom Quests
  (state.quests || []).forEach(q => {
    if (currentQuestFilter === 'all' || currentQuestFilter === 'custom' || currentQuestFilter === q.type) {
      itemsToRender.push({
        ...q,
        isRoutine: false
      });
    }
  });

  if (itemsToRender.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 2rem;">表示対象のクエストはありません。</p>`;
    return;
  }

  itemsToRender.forEach(quest => {
    const card = document.createElement('div');
    card.className = `quest-card ${quest.isRoutine ? 'routine' : (quest.type || 'custom')}${quest.completed ? ' completed' : ''}`;
    
    const badgeLabel = quest.isRoutine ? `ルーティーン (${quest.dayName})` : (quest.type || 'CUSTOM').toUpperCase();
    const badgeClass = quest.isRoutine ? 'routine' : (quest.type || 'custom');

    card.innerHTML = `
      <div class="quest-left">
        <span class="quest-badge ${badgeClass}">${badgeLabel}</span>
        <div>
          <div class="quest-title" style="${quest.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
            ${quest.icon ? quest.icon + ' ' : ''}${quest.title}
          </div>
          <div class="quest-rewards">
            獲得: <span>+${quest.xp} XP</span> | <span>+${quest.gold} G</span>
          </div>
        </div>
      </div>
      <div class="quest-right">
        ${quest.completed 
          ? `<span style="color: var(--accent-gold); font-weight: bold; padding: 0.5rem 1rem;">✅ 完了済み</span>`
          : `<button class="complete-btn" data-id="${quest.id}" data-is-routine="${quest.isRoutine ? 'true' : 'false'}">完了！</button>`
        }
      </div>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll('.complete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isRoutine = btn.dataset.isRoutine === 'true';
      if (isRoutine) {
        completeRoutineQuest(selectedWeekday);
      } else {
        completeQuest(btn.dataset.id);
      }
    });
  });
}

function updateStreak() {
  if (!state.player.streak) {
    state.player.streak = { current: 0, max: 0, lastDate: '' };
  }

  const todayStr = getTodayKey();
  const lastDate = state.player.streak.lastDate;

  if (lastDate === todayStr) {
    return;
  }

  const d = new Date();
  d.setDate(d.getDate() - 1);
  const yesterdayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  if (lastDate === yesterdayStr) {
    state.player.streak.current = (state.player.streak.current || 0) + 1;
  } else {
    state.player.streak.current = 1;
  }

  state.player.streak.max = Math.max(state.player.streak.max || 0, state.player.streak.current);
  state.player.streak.lastDate = todayStr;

  const count = state.player.streak.current;
  let bonusXp = count * 5;
  let bonusGold = Math.floor(count * 2.5);
  let milestoneMsg = '';

  if (count === 3) {
    bonusXp += 50; bonusGold += 20;
    milestoneMsg = '🔥 3日連続達成！【継続の第一歩】ボーナス +50 XP / +20 G ゲット！';
  } else if (count === 7) {
    bonusXp += 150; bonusGold += 70;
    milestoneMsg = '👑 1週間連続達成！【不屈の鉄人】ボーナス +150 XP / +70 G ゲット！';
  } else if (count === 14) {
    bonusXp += 300; bonusGold += 150;
    milestoneMsg = '⚡ 2週間連続達成！【二週間の覇者】ボーナス +300 XP / +150 G ゲット！';
  } else if (count === 30) {
    bonusXp += 800; bonusGold += 400;
    milestoneMsg = '🌟 1ヶ月連続達成！【伝説の冒険者】ボーナス +800 XP / +400 G ゲット！';
  }

  gainRewards(bonusGold);
  gainXP(bonusXp);

  if (milestoneMsg) {
    setTimeout(() => {
      alert(`🎉 連続達成ストリーク！\n${count}日連続クリア！\n${milestoneMsg}`);
    }, 150);
  }
}

function completeRoutineQuest(dayIndex) {
  const todayKey = getTodayKey();
  const routineKey = `${todayKey}_day_${dayIndex}`;
  const routine = WEEKLY_ROUTINES[dayIndex];
  if (!routine) return;

  if (!state.routineCompletions) state.routineCompletions = {};
  if (state.routineCompletions[routineKey]) return;

  state.routineCompletions[routineKey] = true;
  gainRewards(routine.gold);
  gainXP(routine.xp);
  updateStreak();
  triggerConfetti();
  saveData();
}

function completeQuest(questId) {
  const index = state.quests.findIndex(q => q.id === questId);
  if (index === -1) return;

  const quest = state.quests[index];
  gainRewards(quest.gold);
  gainXP(quest.xp);
  updateStreak();
  triggerConfetti();

  if (quest.type !== 'daily') {
    state.quests.splice(index, 1);
  }
  saveData();
}

// --- REWARD SHOP ---
function renderRewardsList() {
  const grid = document.getElementById('rewardsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  (state.rewards || []).forEach(reward => {
    const card = document.createElement('div');
    card.className = 'reward-card';
    card.innerHTML = `
      <div class="reward-icon">${reward.icon}</div>
      <div class="reward-name">${reward.name}</div>
      <div class="reward-cost">🪙 ${reward.cost} G</div>
      <button class="btn btn-gold buy-btn" data-id="${reward.id}" ${(state.player.gold || 0) < reward.cost ? 'disabled' : ''}>
        交換する
      </button>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => buyReward(btn.dataset.id));
  });
}

function buyReward(rewardId) {
  const reward = state.rewards.find(r => r.id === rewardId);
  if (!reward || (state.player.gold || 0) < reward.cost) return;

  state.player.gold -= reward.cost;
  reward.usedCount = (reward.usedCount || 0) + 1;

  triggerConfetti();
  alert(`🎁 【ご褒美】 "${reward.name}" を交換しました！`);
  saveData();
}

// --- EVENT LISTENERS SETUP ---
function setupEventListeners() {
  // Global Modal Close Listeners (x buttons & cancel buttons)
  document.querySelectorAll('.close-modal-btn, .cancel-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllModals();
    });
  });

  // Modal Overlay Background Click to Close
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });

  // Keyboard ESC Key to Close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  const upgradeBtn = document.getElementById('upgradeNodeBtn');
  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', upgradeSelectedNode);
  }

  const editNodeBtn = document.getElementById('editNodeBtn');
  if (editNodeBtn) {
    editNodeBtn.addEventListener('click', () => {
      openEditNodeModal(selectedNode);
    });
  }

  const deleteNodeBtn = document.getElementById('deleteNodeBtn');
  if (deleteNodeBtn) {
    deleteNodeBtn.addEventListener('click', () => {
      if (selectedNode) {
        deleteNode(selectedNode.id);
      }
    });
  }

  // Profile Edit
  const editProfileBtn = document.getElementById('editProfileBtn');
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      document.getElementById('profileNameInput').value = state.player.name || '';
      document.getElementById('profileModal').classList.add('active');
    });
  }
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      state.player.name = document.getElementById('profileNameInput').value;
      saveData();
      closeAllModals();
    });
  }

  // Preset Tree Modal
  const addPresetTreeBtn = document.getElementById('addPresetTreeBtn');
  if (addPresetTreeBtn) {
    addPresetTreeBtn.addEventListener('click', () => {
      document.getElementById('presetModal').classList.add('active');
    });
  }
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      addPresetTree(btn.dataset.preset);
      closeAllModals();
    });
  });

  // Add / Edit Node Form Events
  const addNodeBtn = document.getElementById('addNodeBtn');
  if (addNodeBtn) {
    addNodeBtn.addEventListener('click', () => {
      openEditNodeModal(null);
    });
  }
  const nodeForm = document.getElementById('nodeForm');
  if (nodeForm) {
    nodeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveNodeFromForm();
    });
  }

  // Add Quest Modal
  const addQuestBtn = document.getElementById('addQuestBtn');
  if (addQuestBtn) {
    addQuestBtn.addEventListener('click', () => {
      document.getElementById('questModal').classList.add('active');
    });
  }
  const questForm = document.getElementById('questForm');
  if (questForm) {
    questForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addNewQuestFromForm();
      closeAllModals();
    });
  }

  // Weekday Routine Selector
  const weekdaySelect = document.getElementById('weekdaySelect');
  if (weekdaySelect) {
    weekdaySelect.value = selectedWeekday.toString();
    weekdaySelect.addEventListener('change', (e) => {
      selectedWeekday = parseInt(e.target.value, 10);
      renderQuestsList();
    });
  }

  // Quest Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentQuestFilter = btn.dataset.filter;
      renderQuestsList();
    });
  });

  // Add Reward Modal
  const addRewardBtn = document.getElementById('addRewardBtn');
  if (addRewardBtn) {
    addRewardBtn.addEventListener('click', () => {
      document.getElementById('rewardModal').classList.add('active');
    });
  }
  const rewardForm = document.getElementById('rewardForm');
  if (rewardForm) {
    rewardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addNewRewardFromForm();
      closeAllModals();
    });
  }

  // Data Actions
  const exportBtn = document.getElementById('exportDataBtn');
  if (exportBtn) exportBtn.addEventListener('click', exportJSON);

  const importInput = document.getElementById('importDataInput');
  if (importInput) importInput.addEventListener('change', importJSON);

  const resetBtn = document.getElementById('resetAllDataBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('ハーフマラソン挑戦仕様の初期状態に戻しますか？')) {
        localStorage.removeItem('rpg_progression_data_v6');
        localStorage.removeItem('rpg_progression_data_v5');
        localStorage.removeItem('rpg_progression_data_v4');
        localStorage.removeItem('rpg_progression_data_v3');
        localStorage.removeItem('rpg_progression_data_v2');
        localStorage.removeItem('rpg_life_data');
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        saveData();
        alert('データを初期化しました。');
      }
    });
  }
}

function addPresetTree(type) {
  const rootNode = state.nodes.find(n => n.id === 'cal_root') || state.nodes[0];
  const rootX = rootNode ? rootNode.x : 1500;
  const rootY = rootNode ? rootNode.y : 1500;

  if (type === 'marathon') {
    const timestamp = Date.now();
    const mNodes = [
      { id: `m_1_${timestamp}`, title: 'ハーフマラソン完走 (21.0975km)', category: 'running', icon: '🏅', stage: 'Step 1 (基準達成)', desc: 'ハーフ完走の基本スタミナ。', level: 1, maxLevel: 1, parentId: 'cal_root', x: rootX, y: rootY - 180 },
      { id: `m_2_${timestamp}`, title: '25km LSD走', category: 'running', icon: '👟', stage: 'A-1 (距離)', desc: 'ゆっくりペースで25km持続走。', level: 0, maxLevel: 3, parentId: `m_1_${timestamp}`, x: rootX - 350, y: rootY - 360 },
      { id: `m_3_${timestamp}`, title: '30km走 達成 (30kmの壁攻略)', category: 'running', icon: '⛰️', stage: 'A-2 (最重要難所)', desc: '30km地点の壁を突破。', level: 0, maxLevel: 5, parentId: `m_2_${timestamp}`, x: rootX - 350, y: rootY - 540 },
      { id: `m_4_${timestamp}`, title: '35km ロング走', category: 'running', icon: '🔥', stage: 'A-3 (最終ロング)', desc: '30km以降の疲れに打ち勝つ。', level: 0, maxLevel: 5, parentId: `m_3_${timestamp}`, x: rootX - 350, y: rootY - 720 },
      { id: `m_5_${timestamp}`, title: '10km Mペース走', category: 'running', icon: '⏱️', stage: 'B-1 (ペース定着)', desc: '目標ペースで10km走る。', level: 0, maxLevel: 3, parentId: `m_1_${timestamp}`, x: rootX, y: rootY - 360 },
      { id: `m_6_${timestamp}`, title: '15km ビルドアップ走', category: 'running', icon: '⚡', stage: 'B-2 (粘り強化)', desc: '後半スパートの粘りを養う。', level: 0, maxLevel: 3, parentId: `m_5_${timestamp}`, x: rootX, y: rootY - 540 },
      { id: `m_7_${timestamp}`, title: '20km Mペース持続走', category: 'running', icon: '🎯', stage: 'B-3 (本番想定)', desc: '本番ペースで20km走破。', level: 0, maxLevel: 4, parentId: `m_6_${timestamp}`, x: rootX, y: rootY - 720 },
      { id: `m_8_${timestamp}`, title: '股関節 ＆ ハムストリング・ストレッチ', category: 'running', icon: '🧘', stage: 'C-1 (可動域)', desc: '股関節・腿裏の柔軟性ケア。', level: 0, maxLevel: 3, parentId: `m_1_${timestamp}`, x: rootX + 350, y: rootY - 360 },
      { id: `m_9_${timestamp}`, title: '下半身 ＆ 体幹補強筋トレ', category: 'running', icon: '🏋️', stage: 'C-2 (フォーム安定)', desc: 'お尻と体幹軸の強化。', level: 0, maxLevel: 3, parentId: `m_8_${timestamp}`, x: rootX + 350, y: rootY - 540 },
      { id: `m_10_${timestamp}`, title: 'フルマラソン完走 (42.195km)', category: 'running', icon: '👑', stage: 'MASTER', desc: '42.195kmを完走！', level: 0, maxLevel: 5, parentId: `m_4_${timestamp}`, x: rootX, y: rootY - 960 }
    ];
    state.nodes.push(...mNodes);
    alert('🏃 フルマラソン挑戦ロードマップ（距離・ペース・ケア3系統）を追加しました！');
  } else if (type === 'leg') {
    const timestamp = Date.now();
    const lNodes = [
      { id: `l_1_${timestamp}`, title: 'ノーマルスクワット ＆ ランジ', category: 'calisthenics', icon: '🦵', stage: 'Step 1', desc: '基礎脚力。', level: 0, maxLevel: 3, parentId: 'cal_root', x: rootX - 400, y: rootY + 150 },
      { id: `l_2_${timestamp}`, title: 'ブルガリアンスクワット ＆ カーフレイズ', category: 'calisthenics', icon: '🦵', stage: 'Step 2', desc: '片脚軸力。', level: 0, maxLevel: 3, parentId: `l_1_${timestamp}`, x: rootX - 600, y: rootY + 300 },
      { id: `l_3_${timestamp}`, title: 'アシストピストル ＆ ジャンプスクワット', category: 'calisthenics', icon: '⚡', stage: 'Step 3', desc: '爆発力。', level: 0, maxLevel: 3, parentId: `l_2_${timestamp}`, x: rootX - 800, y: rootY + 450 },
      { id: `l_4_${timestamp}`, title: 'ピストルスクワット (完全片脚フルスクワット)', category: 'calisthenics', icon: '👑', stage: 'Step 4 (MASTER)', desc: '片脚スクワットマスター！', level: 0, maxLevel: 5, parentId: `l_3_${timestamp}`, x: rootX - 1000, y: rootY + 600 }
    ];
    state.nodes.push(...lNodes);
    alert('🦵 脚力・ピストルスクワット4段階ルートを追加しました！');
  } else if (type === 'core') {
    const timestamp = Date.now();
    const cNodes = [
      { id: `c_1_${timestamp}`, title: 'フロントプランク ＆ サイドプランク', category: 'calisthenics', icon: '🧘‍♂️', stage: 'Step 1', desc: '静的体幹。', level: 0, maxLevel: 3, parentId: 'cal_root', x: rootX, y: rootY + 250 },
      { id: `c_2_${timestamp}`, title: 'レッグレイズ ＆ タックホローボディ', category: 'calisthenics', icon: '🧘‍♂️', stage: 'Step 2', desc: '腹筋・骨盤。', level: 0, maxLevel: 3, parentId: `c_1_${timestamp}`, x: rootX, y: rootY + 450 },
      { id: `c_3_${timestamp}`, title: 'ハンギングレッグレイズ (鉄棒吊り下げ)', category: 'calisthenics', icon: '🤸', stage: 'Step 3', desc: '下腹・腸腰筋。', level: 0, maxLevel: 3, parentId: `c_2_${timestamp}`, x: rootX, y: rootY + 650 },
      { id: `c_4_${timestamp}`, title: 'L-Sit (Lシット)', category: 'calisthenics', icon: '👑', stage: 'Step 4 (MASTER)', desc: 'L-Sitマスター！', level: 0, maxLevel: 5, parentId: `c_3_${timestamp}`, x: rootX, y: rootY + 850 }
    ];
    state.nodes.push(...cNodes);
    alert('🧘‍♂️ 体幹・L-Sit4段階ルートを追加しました！');
  } else if (type === 'flexibility') {
    const timestamp = Date.now();
    const fNodes = [
      { id: `f_1_${timestamp}`, title: '全身基礎柔軟性 (硬さ解消)', category: 'spirit', icon: '🧘', stage: 'Step 1', desc: '基礎柔軟。', level: 0, maxLevel: 3, parentId: 'cal_root', x: rootX + 400, y: rootY + 150 },
      { id: `f_2_${timestamp}`, title: '可動域の拡大 (中級レベル)', category: 'spirit', icon: '🧘', stage: 'Step 2', desc: '可動域向上。', level: 0, maxLevel: 3, parentId: `f_1_${timestamp}`, x: rootX + 600, y: rootY + 300 },
      { id: `f_3_${timestamp}`, title: '高度な柔軟性 (上級レベル)', category: 'spirit', icon: '🧘', stage: 'Step 3', desc: '上級可動域。', level: 0, maxLevel: 3, parentId: `f_2_${timestamp}`, x: rootX + 800, y: rootY + 450 },
      { id: `f_4_${timestamp}`, title: '全身可動域マスター (MASTER)', category: 'spirit', icon: '👑', stage: 'Step 4 (MASTER)', desc: '全身可動域マスター！', level: 0, maxLevel: 5, parentId: `f_3_${timestamp}`, x: rootX + 1000, y: rootY + 600 }
    ];
    state.nodes.push(...fNodes);
    alert('🧘 全身柔軟性4段階ルートを追加しました！');
  } else {
    alert('該当のツリーを追加しました。');
  }
  saveData();
}

function populateParentNodeDropdown() {
  const select = document.getElementById('nodeParentInput');
  if (!select) return;
  const currentEditId = document.getElementById('editNodeId').value;

  select.innerHTML = '<option value="">(なし: スタートノード)</option>';
  (state.nodes || []).forEach(node => {
    if (node.id === currentEditId) return;
    const opt = document.createElement('option');
    opt.value = node.id;
    opt.textContent = `${node.icon || '⭐'} ${node.title || 'ノード'} (${node.stage || ''})`;
    select.appendChild(opt);
  });
}

function addNewQuestFromForm() {
  const title = document.getElementById('questTitleInput').value;
  const type = document.getElementById('questTypeInput').value;
  const difficulty = document.getElementById('questDifficultyInput').value;

  let xp = 50, gold = 25;
  if (difficulty === 'EASY') { xp = 20; gold = 10; }
  else if (difficulty === 'NORMAL') { xp = 50; gold = 25; }
  else if (difficulty === 'HARD') { xp = 120; gold = 60; }
  else if (difficulty === 'BOSS') { xp = 300; gold = 150; }

  state.quests.push({
    id: `q_${Date.now()}`,
    title, type, difficulty, xp, gold, completed: false
  });
  saveData();
}

function addNewRewardFromForm() {
  const name = document.getElementById('rewardNameInput').value;
  const icon = document.getElementById('rewardIconInput').value || '🎁';
  const cost = parseInt(document.getElementById('rewardCostInput').value, 10);

  state.rewards.push({ id: `r_${Date.now()}`, name, icon, cost, usedCount: 0 });
  saveData();
}

// --- EXPORT & IMPORT ---
function exportJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `rpg_progression_backup_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
}

function importJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const importedData = JSON.parse(event.target.result);
      if (importedData.player && importedData.nodes) {
        state = importedData;
        saveData();
        alert('データを正常に読み込みました！');
      } else {
        alert('無効なデータファイルです。');
      }
    } catch (err) {
      alert('ファイルの解析に失敗しました。');
    }
  };
  reader.readAsText(file);
}

function triggerConfetti() {
  if (window.confetti) {
    try {
      window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch(e) {}
  }
}
