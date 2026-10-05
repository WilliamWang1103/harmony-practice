// ============================================================================
// 第一部分：数据定义区
// ============================================================================

// ==================== 音符数据库 (C2 - B5) ====================
const allNotes = [];
const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const octaves = [2, 3, 4, 5];

// 生成所有音符
for (let octave of octaves) {
    for (let i = 0; i < noteNames.length; i++) {
        const noteName = noteNames[i];
        const displayName = noteName + octave;
        const type = noteName.includes('#') ? 'black' : 'white';
        const group = octave === 2 ? 'group1' : (octave === 3 ? 'group2' : (octave === 4 ? 'group3' : 'group1'));

        allNotes.push({
            note: displayName,
            name: noteName,
            display: displayName,
            type: type,
            octave: octave,
            position: i,
            group: group
        });
    }
}

// ==================== 调性系统 ====================
const keyRanges = {
    1: {
        name: "1 级 - 无升降号",
        keys: ['C_major', 'a_minor'],
        unlocked: true,
        progress: { correct: 0, total: 0, completed: false }
    },
    2: {
        name: "2 级 - 1 个升号",
        keys: ['G_major', 'e_minor'],
        unlocked: false,
        progress: { correct: 0, total: 0, completed: false }
    },
    3: {
        name: "3 级 - 2 个升号",
        keys: ['D_major', 'b_minor'],
        unlocked: false,
        progress: { correct: 0, total: 0, completed: false }
    },
    4: {
        name: "4 级 - 1 个降号",
        keys: ['F_major', 'd_minor'],
        unlocked: false,
        progress: { correct: 0, total: 0, completed: false }
    },
    5: {
        name: "5 级 - 2 个降号",
        keys: ['Bb_major', 'g_minor'],
        unlocked: false,
        progress: { correct: 0, total: 0, completed: false }
    }
};

const keys = {
    'C_major': { name: 'C 大调', tonic: 'C', mode: 'major', scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], chords: { T: 'C', S: 'F', D: 'G' } },
    'G_major': { name: 'G 大调', tonic: 'G', mode: 'major', scale: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'], chords: { T: 'G', S: 'C', D: 'D' } },
    'D_major': { name: 'D 大调', tonic: 'D', mode: 'major', scale: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'], chords: { T: 'D', S: 'G', D: 'A' } },
    'F_major': { name: 'F 大调', tonic: 'F', mode: 'major', scale: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'], chords: { T: 'F', S: 'Bb', D: 'C' } },
    'Bb_major': { name: 'Bb 大调', tonic: 'Bb', mode: 'major', scale: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'], chords: { T: 'Bb', S: 'Eb', D: 'F' } },
    'a_minor': { name: 'a 小调', tonic: 'A', mode: 'minor', scale: ['A', 'B', 'C', 'D', 'E', 'F', 'G#'], chords: { t: 'A', s: 'D', D: 'E' } },
    'e_minor': { name: 'e 小调', tonic: 'E', mode: 'minor', scale: ['E', 'F#', 'G', 'A', 'B', 'C', 'D#'], chords: { t: 'E', s: 'A', D: 'B' } },
    'b_minor': { name: 'b 小调', tonic: 'B', mode: 'minor', scale: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A#'], chords: { t: 'B', s: 'E', D: 'F#' } },
    'd_minor': { name: 'd 小调', tonic: 'D', mode: 'minor', scale: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C#'], chords: { t: 'D', s: 'G', D: 'A' } },
    'g_minor': { name: 'g 小调', tonic: 'G', mode: 'minor', scale: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F#'], chords: { t: 'G', s: 'C', D: 'D' } }
};

// ==================== 课程数据结构 ====================
const courses = {
    basic: [
        { id: 1, title: "第 1 关：大小三和弦", desc: "掌握大三和弦与小三和弦的构成与听辨", content: "大三和弦：以根音为低音，大三度 + 纯五度，色彩明亮；小三和弦：以根音为低音，小三度 + 纯五度，色彩柔和", examples: ["C 大三和弦：C-E-G。C-E为大三度，C-G为纯五度，", "a 小三和弦：A-C-E。A-C为小三度，A-E为纯五度。"] },
        { id: 2, title: "第 2 关：正三和弦的功能体系", desc: "主和弦 (T/t)、下属和弦 (S/s)、属和弦 (D)", content: "主和弦 (T/t)：稳定中心；下属和弦 (S/s)：不稳定，倾向属；属和弦 (D)：强烈倾向主", examples: ["C 大调：T=C, S=F, D=G", "a 小调：t=A, s=D, D=E"] },
        { id: 3, title: "第 3 关：原位三和弦的连接", desc: "和声连接法与旋律连接法", content: "和声连接法：共同音保持；旋律连接法：各声部平稳进行", examples: ["T-S：保持共同音", "T-D：三度进行"] },
        { id: 4, title: "第 4 关：用正三和弦为旋律配和声", desc: "选择和弦的基本原则", content: "旋律音决定和弦选择；避免平行五八度；声部进行要平稳", examples: ["C 大调旋律：C-D-E → T-T-S"] }
    ],
    advanced: [
