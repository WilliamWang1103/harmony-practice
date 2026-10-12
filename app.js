// ==================== 数据定义 ====================
const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function getGroupNameForOctave(octave) {
    const groupMap = {
        0: '大字二组',
        1: '大字一组',
        2: '大字组',
        3: '小字组',
        4: '小字一组',
        5: '小字二组',
        6: '小字三组',
        7: '小字四组',
        8: '小字五组'
    };
    return groupMap[octave] || '小字五组';
}

function buildPianoNoteList() {
    const notes = [];
    for (let octave = 0; octave <= 8; octave++) {
        const octaveNotes = octave === 0 ? ['A', 'A#', 'B'] : (octave === 8 ? ['C'] : noteNames);
        for (const noteName of octaveNotes) {
            const displayName = noteName + octave;
            const type = noteName.includes('#') ? 'black' : 'white';
            notes.push({ note: displayName, name: noteName, display: displayName, type, octave, position: notes.length, group: getGroupNameForOctave(octave) });
        }
    }
    return notes;
}

const allNotes = buildPianoNoteList();

const textbookChapters = [
    {
        id: 1, phase: 'basic',
        title: '01 大小三和弦',
        summary: '学习大三和弦与小三和弦的构成、音程结构与音响色彩，建立三和弦的基础概念。',
        excerpt: '重点内容：大三度+纯五度构成大三和弦（色彩明亮）；小三度+纯五度构成小三和弦（色彩柔和）。',
        practiceFocus: '辨认大小三和弦的音程构成与音响色彩'
    },
    {
        id: 2, phase: 'basic',
        title: '02 四部和声',
        summary: '掌握四部和声（女高、女低、男高、男低）的声部排列、音域与基本写作规范。',
        excerpt: '重点内容：四个声部的音域范围、开放与密集排列、声部间距原则。',
        practiceFocus: '四部和声的声部排列与间距规范'
    },
    {
        id: 3, phase: 'basic',
        title: '03 功能体系',
        summary: '理解主（T）、下属（S）、属（D）三种功能和弦的倾向关系与和声进行的基本逻辑。',
        excerpt: '重点内容：T 稳定、S 倾向 D、D 倾向 T；功能进行 T–S–D–T 的基本逻辑。',
        practiceFocus: '在调中识别并写出 T/S/D 正三和弦'
    },
    {
        id: 4, phase: 'basic',
        title: '04 原位三和弦连接',
        summary: '学习原位正三和弦的两种连接方法——和声连接法与旋律连接法。',
        excerpt: '重点内容：共同音保持（和声连接法）与各声部平稳进行（旋律连接法），避免平行五八度。',
        practiceFocus: '原位正三和弦的连接方法与声部进行'
    },
    {
        id: 5, phase: 'advanced',
        title: '05 用原位正三和弦为旋律配和声',
        summary: '学习根据旋律音选择合适的原位正三和弦，完成简单旋律的和声配置。',
        excerpt: '重点内容：旋律音与和弦的对应关系、和弦选择的基本原则、避免不良声部进行。',
        practiceFocus: '为旋律选择并配置原位正三和弦'
    },
    {
        id: 6, phase: 'advanced',
        title: '06 同和弦转换',
        summary: '掌握同一和弦在不改变功能前提下的转换与换位，丰富声部线条。',
        excerpt: '重点内容：同和弦转换的方式、旋律线条的流畅性、转换中的声部进行。',
        practiceFocus: '同和弦的转换与排列变化'
    },
    {
        id: 7, phase: 'advanced',
        title: '07 为低音配和声',
        summary: '学习根据低音进行选择和弦，掌握低音与和弦功能之间的关系。',
        excerpt: '重点内容：低音决定和弦的根音与功能、低音线条的连贯性、终止式低音的处理。',
        practiceFocus: '根据低音进行配置和声'
    },
    {
        id: 8, phase: 'advanced',
        title: '08 三音跳进',
        summary: '学习三音跳进的运用条件与声部处理规则。',
        excerpt: '重点内容：三音跳进的方向与距离、跳进后的反向进行、避免不良跳进。',
        practiceFocus: '三音跳进的规则与声部处理'
    },
    {
        id: 9, phase: 'advanced',
        title: '09 终止、乐段、乐句',
        summary: '理解终止式的类型、乐段与乐句的结构划分。',
        excerpt: '重点内容：正格终止、变格终止、半终止、完全终止；乐句与乐段的结构。',
        practiceFocus: '辨认与写作各类终止式'
    },
    {
        id: 10, phase: 'advanced',
        title: '10 终止四六和弦',
        summary: '学习终止四六和弦（K₄⁶）的构成、解决与在终止中的应用。',
        excerpt: '重点内容：K₄⁶ 的双重功能、延迟解决、到属和弦的进行方式。',
        practiceFocus: '终止四六和弦的使用与解决'
    },
    {
        id: 11, phase: 'improve',
        title: '11 正三和弦的六和弦',
        summary: '学习正三和弦第一转位（六和弦）的构成、连接与声部处理。',
        excerpt: '重点内容：六和弦的重复音原则、避免平行五八度、六和弦使低音线条流畅。',
        practiceFocus: '正三和弦六和弦的配置与连接'
    },
    {
        id: 12, phase: 'improve',
        title: '12 三和弦与六和弦连接时的跳进',
        summary: '学习三和弦与六和弦连接时跳进的处理规则。',
        excerpt: '重点内容：根音与五音跳进的许可条件、跳进声部的反向补偿、声部平衡。',
        practiceFocus: '三和弦与六和弦连接中的跳进处理'
    },
    {
        id: 13, phase: 'improve',
        title: '13 两个六和弦的连接',
        summary: '学习两个六和弦连接时的声部进行与避免不良进行的方法。',
        excerpt: '重点内容：六和弦连接的平稳进行、避免平行五八度、低音线条的处理。',
        practiceFocus: '两个六和弦的连接规则'
    },
    {
        id: 14, phase: 'improve',
        title: '14 经过的与辅助的四六和弦',
        summary: '学习经过四六和弦与辅助四六和弦的构成与装饰性用法。',
        excerpt: '重点内容：经过四六和弦（T–D₄⁶–T₆）与辅助四六和弦（T–S₄⁶–T）的声部进行。',
        practiceFocus: '经过与辅助四六和弦的写作'
    }
];

const keyRanges = {
    1: { name: "1 级 - 无升降号", keys: ['C_major', 'a_minor'], unlocked: true, progress: { correct: 0, total: 0, completed: false } },
    2: { name: "2 级 - 1 个升号", keys: ['G_major', 'e_minor'], unlocked: false, progress: { correct: 0, total: 0, completed: false } },
    3: { name: "3 级 - 2 个升号", keys: ['D_major', 'b_minor'], unlocked: false, progress: { correct: 0, total: 0, completed: false } },
    4: { name: "4 级 - 1 个降号", keys: ['F_major', 'd_minor'], unlocked: false, progress: { correct: 0, total: 0, completed: false } },
    5: { name: "5 级 - 2 个降号", keys: ['Bb_major', 'g_minor'], unlocked: false, progress: { correct: 0, total: 0, completed: false } }
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

const courses = {
    basic: [
        { id: 1, title: "01 大小三和弦", desc: "掌握大三与小三和弦的构成与听辨", content: "大三和弦：大三度+纯五度，色彩明亮；小三和弦：小三度+纯五度，色彩柔和", examples: ["C 大三：C-E-G", "a 小三：A-C-E"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true },
        { id: 2, title: "02 四部和声", desc: "四部和声的声部排列与规范", content: "女高、女低、男高、男低四个声部的音域与排列", examples: ["密集排列", "开放排列"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true },
        { id: 3, title: "03 功能体系", desc: "主、下属、属三种功能", content: "主和弦(T/t)稳定；下属(S/s)倾向属；属(D)倾向主", examples: ["C大调：T=C, S=F, D=G"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true },
        { id: 4, title: "04 原位三和弦连接", desc: "和声连接法与旋律连接法", content: "共同音保持与平稳进行", examples: ["T-S保持共同音"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true }
    ],
    advanced: [
        { id: 5, title: "05 用原位正三和弦为旋律配和声", desc: "选择和弦的基本原则", content: "旋律音决定和弦，避免平行五八度", examples: ["C大调旋律：C-D-E → T-T-S"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true },
        { id: 6, title: "06 同和弦转换", desc: "同和弦的不同排列", content: "和弦转换与换位", examples: ["T → T6"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true },
        { id: 7, title: "07 为低音配和声", desc: "低音与和弦的关系", content: "低音决定和弦性质", examples: ["低音C → 主和弦"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true },
        { id: 8, title: "08 三音跳进", desc: "三音跳进的规则", content: "允许同和弦三音跳进", examples: ["T-S三音跳进"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true },
        { id: 9, title: "09 终止、乐段、乐句", desc: "终止式的类型", content: "完全终止、变格终止、半终止", examples: ["G-C完全终止"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true },
        { id: 10, title: "10 终止四六和弦", desc: "K46和弦的应用", content: "终止四六和弦用于终止处", examples: ["C/G → G → C"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true }
    ],
    improve: [
        { id: 11, title: "11 正三和弦的六和弦", desc: "六和弦的构成与使用", content: "第一转位，避免平行五八度", examples: ["T6, S6, D6"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true },
        { id: 12, title: "12 三和弦与六和弦连接时的跳进", desc: "跳进的处理规则", content: "允许根音与五音的跳进", examples: ["T-T6根音跳进"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true },
        { id: 13, title: "13 两个六和弦的连接", desc: "六和弦的连接规则", content: "声部平稳进行", examples: ["T6-S6"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true },
        { id: 14, title: "14 经过的与辅助的四六和弦", desc: "四六和弦的装饰用法", content: "经过四六和弦与辅助四六和弦", examples: ["T - D46 - T6"], progress: 0, bestAccuracy: 0, passed75: false, status: 'not-started', unlocked: true }
    ]
};

// ==================== 乐谱渲染辅助（生成 MusicXML） ====================
// ==================== VexFlow 静态谱例渲染 ====================
// 音名转换：app 格式 'C4'/'C#4'/'Bb4' -> VexFlow 格式 'c/4'/'c#/4'/'bb/4'
function toVexKey(note) {
    if (!note) return null;
    const m = note.match(/^([A-G])([#b]*)(-?\d+)$/);
    if (!m) return null;
    return m[1].toLowerCase() + (m[2] || '') + '/' + m[3];
}
// 为 VexFlow 音符添加升降号（VexFlow 不会为 key 字符串自动绘制变音记号）
// 注意：VexFlow 构造和弦时会对 keyProps 按音高（line 升序，从低到高）重新排序，
// 因此必须遍历排序后的 keyProps 及其索引来添加变音记号，否则升降号会错位（跑到别的音符上）。
function addVexAccidentals(note, keys) {
    const VF = Vex.Flow;
    note.keyProps.forEach((kp, i) => {
        if (kp.accidental) note.addAccidental(i, new VF.Accidental(kp.accidental));
    });
}
// 时值 → 拍数（静态谱例用）
function durToBeats(dur) { return { w: 4, h: 2, q: 1, '8': 0.5, '16': 0.25 }[dur] || 4; }
function vexFlowReady() { return typeof Vex !== 'undefined' && !!Vex.Flow; }
function vexFallback(container, text) {
    container.innerHTML = `<div class="ch-score-fallback">${text || ''}</div>`;
}
// 单和弦（默认全音符，可用 duration 指定：w/h/q/8/16），单行高音谱表
function renderTriadScore(container, notes, duration) {
    const keys = (notes || []).map(toVexKey).filter(Boolean);
    if (!vexFlowReady() || !keys.length) { vexFallback(container, (notes || []).join(' – ')); return; }
    const VF = Vex.Flow;
    const dur = duration || 'w';
    const beats = durToBeats(dur);
    container.innerHTML = '';
    const w = Math.max(container.clientWidth - 12, 180);
    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(w, 150);
    const ctx = renderer.getContext();
    const stave = new VF.Stave(10, 40, w - 24);
    stave.addClef('treble').setContext(ctx).draw();
    const note = new VF.StaveNote({ keys: keys, duration: dur });
    addVexAccidentals(note, keys);
    const voice = new VF.Voice({ num_beats: beats, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
    voice.addTickables([note]);
    const justify = stave.getNoteEndX() - stave.getNoteStartX() - 10;
    new VF.Formatter().joinVoices([voice]).format([voice], justify);
    voice.draw(ctx, stave);
}
// 和弦进行（多小节，单行高音谱表），measures = [[note,...], ...]；可用 duration 指定时值
function renderProgressionScore(container, measures, duration) {
    if (!vexFlowReady()) { vexFallback(container, measures.map(m => m.join('–')).join('  |  ')); return; }
    const VF = Vex.Flow;
    const dur = duration || 'w';
    const beats = durToBeats(dur);
    container.innerHTML = '';
    const mW = 150;
    const width = measures.length * mW + 30;
    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(Math.max(width, 150), 150);
    const ctx = renderer.getContext();
    measures.forEach((chord, mi) => {
        const x = 10 + mi * mW;
        const stave = new VF.Stave(x, 40, mW);
        if (mi === 0) stave.addClef('treble');
        // 相邻小节间只保留一条小节线（避免双竖线），末小节用终止线
        if (mi > 0) stave.setBegBarType(VF.Barline.type.NONE);
        if (mi === measures.length - 1) stave.setEndBarType(VF.Barline.type.END);
        stave.setContext(ctx).draw();
        const keys = (chord || []).map(toVexKey).filter(Boolean);
        if (keys.length) {
            const note = new VF.StaveNote({ keys: keys, duration: dur });
            addVexAccidentals(note, keys);
            const voice = new VF.Voice({ num_beats: beats, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
            voice.addTickables([note]);
            const justify = stave.getNoteEndX() - stave.getNoteStartX() - 10;
            new VF.Formatter().joinVoices([voice]).format([voice], justify);
            voice.draw(ctx, stave);
        }
    });
}
// 四部和声（大谱表 SATB），measures = [{s:[note],a:[note],t:[note],b:[note]}, ...]
function renderFourPartScore(container, measures, annotations, duration) {
    if (!vexFlowReady()) {
        vexFallback(container, measures.map(m => [m.s, m.a, m.t, m.b].filter(Boolean).join(' / ')).join('  |  '));
        return;
    }
    const VF = Vex.Flow;
    container.innerHTML = '';
    const mW = 170;
    const width = measures.length * mW + 30;
    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(Math.max(width, 160), annotations ? 330 : 290);
    const ctx = renderer.getContext();
    const dur = duration || 'w';
    const beats = durToBeats(dur);

    const trebles = [], basses = [];
    measures.forEach((m, mi) => {
        const x = 10 + mi * mW;
        const treble = new VF.Stave(x, 45, mW);
        const bass = new VF.Stave(x, 155, mW);
        treble.setBegBarType(VF.Barline.type.NONE).setEndBarType(VF.Barline.type.NONE);
        bass.setBegBarType(VF.Barline.type.NONE).setEndBarType(VF.Barline.type.NONE);
        if (mi === 0) { treble.addClef('treble'); bass.addClef('bass'); }
        treble.setContext(ctx).draw();
        bass.setContext(ctx).draw();
        if (mi === 0) {
            new VF.StaveConnector(treble, bass).setType('brace').setContext(ctx).draw();
            new VF.StaveConnector(treble, bass).setType('singleLeft').setContext(ctx).draw();
        }
        new VF.StaveConnector(treble, bass).setType('singleRight').setContext(ctx).draw();
        trebles.push(treble); basses.push(bass);
    });

    function makeNote(key, clef, dir) {
        const n = new VF.StaveNote({ keys: [key], duration: dur, clef: clef });
        n.setStemDirection(dir);
        addVexAccidentals(n, [key]);
        return n;
    }
    function makeVoice(list) {
        const v = new VF.Voice({ num_beats: beats, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
        list.forEach(t => v.addTickable(t));
        return v;
    }

    measures.forEach((m, mi) => {
        const treble = trebles[mi], bass = basses[mi];
        const sNotes = m.s && m.s[0] ? [makeNote(toVexKey(m.s[0]), 'treble', VF.Stem.UP)] : [];
        const aNotes = m.a && m.a[0] ? [makeNote(toVexKey(m.a[0]), 'treble', VF.Stem.DOWN)] : [];
        const tNotes = m.t && m.t[0] ? [makeNote(toVexKey(m.t[0]), 'bass', VF.Stem.UP)] : [];
        const bNotes = m.b && m.b[0] ? [makeNote(toVexKey(m.b[0]), 'bass', VF.Stem.DOWN)] : [];
        const voiceS = makeVoice(sNotes), voiceA = makeVoice(aNotes);
        const voiceT = makeVoice(tNotes), voiceB = makeVoice(bNotes);
        const jT = treble.getNoteEndX() - treble.getNoteStartX() - 10;
        const jB = bass.getNoteEndX() - bass.getNoteStartX() - 10;
        if (sNotes.length || aNotes.length) new VF.Formatter().joinVoices([voiceS, voiceA]).format([voiceS, voiceA], jT);
        if (tNotes.length || bNotes.length) new VF.Formatter().joinVoices([voiceT, voiceB]).format([voiceT, voiceB], jB);
        voiceS.draw(ctx, treble); voiceA.draw(ctx, treble);
        voiceT.draw(ctx, bass); voiceB.draw(ctx, bass);
    });

    // 和声分析标注区：在每小节下方标注调、和弦标记与功能（SVG 文本，与各小节对齐）
    if (annotations) {
        const svg = container.querySelector('svg');
        if (svg) {
            const NS = 'http://www.w3.org/2000/svg';
            const yFunc = 265, yName = 281;
            if (annotations.key) {
                const t = document.createElementNS(NS, 'text');
                t.setAttribute('x', 10);
                t.setAttribute('y', yFunc);
                t.setAttribute('font-size', '12');
                t.setAttribute('font-weight', 'bold');
                t.setAttribute('fill', '#6a1b9a');
                t.textContent = '调：' + annotations.key;
                svg.appendChild(t);
            }
            (annotations.chords || []).forEach((c, i) => {
                const cx = 10 + i * mW + mW / 2;
                const t = document.createElementNS(NS, 'text');
                t.setAttribute('x', cx);
                t.setAttribute('y', yFunc);
                t.setAttribute('text-anchor', 'middle');
                t.setAttribute('font-size', '14');
                t.setAttribute('font-weight', 'bold');
                t.setAttribute('fill', '#5e35b1');
                t.textContent = c.func;
                svg.appendChild(t);
                if (c.name) {
                    const n = document.createElementNS(NS, 'text');
                    n.setAttribute('x', cx);
                    n.setAttribute('y', yName);
                    n.setAttribute('text-anchor', 'middle');
                    n.setAttribute('font-size', '10');
                    n.setAttribute('fill', '#888');
                    n.textContent = c.name;
                    svg.appendChild(n);
                }
            });
        }
    }
}

// ==================== 各章节教学内容（基于斯波索宾《和声学教程》） ====================
const chapterContent = {
    1: {
        teaching: [
            { type: 'heading', text: '一、三和弦的概念' },
            { type: 'text', content: '由三个音组成的和音称为三和弦，它的相邻的两音之间相距三度，两端的音之间相距五度。' },
            { type: 'heading', text: '二、大三和弦与小三和弦' },
            { type: 'text', content: '大三和弦是以根音为低音，向上构建大三度和纯五度构成，色彩明亮。' },
            { type: 'example', title: '例 1：C 大三和弦（C–E–G）', notes: ['C4', 'E4', 'G4'] },
            { type: 'text', content: '小三和弦是以根音为低音，向上构建小三度和纯五度构成，色彩柔和。' },
            { type: 'example', title: '例 2：C 小三和弦（C–Eb–G）', notes: ['C4', 'Eb4', 'G4'] },
            { type: 'text', content: '增三和弦是以根音为低音，向上构建大三度和增五度构成，色彩漂浮不安。' },
            { type: 'example', title: '例 3：C 增三和弦（C–E–G#，外围增五度）', notes: ['C4', 'E4', 'G#4'] },
            { type: 'text', content: '减三和弦是以根音为低音，向上构建小三度和减五度构成，色彩神秘紧张。' },
            { type: 'example', title: '例 4：C 减三和弦（C–Eb–Gb，外围减五度）', notes: ['C4', 'Eb4', 'Gb4'] },
            { type: 'practice', label: '集中练习：辨认构建大、小三和弦' }
        ]
    },
    2: {
        teaching: [
            { type: 'heading', text: '一、四部和声的声部划分' },
            { type: 'text', content: '四部和声是古典和声写作的基本形式，由女高音（Soprano，S）、女低音（Alto，A）、男高音（Tenor，T）、男低音（Bass，B）四个声部组成。这些名称源自人声分类，在一定条件下也使用于器乐中。最高的声部也称做"旋律"。' },
            { type: 'text', content: '各声部的常用音域：女高音 c¹–c³，女低音 g–g²，男高音 c–c²，男低音 C–c。实际写作中各声部音域可略有扩展。' },
            { type: 'text', content: '小提示：可以点击页面最右下方钢琴按钮，点按弹出的钢琴琴键的相应音区来感受各声部的音域。' },
            { type: 'heading', text: '二、三和弦的重复音' },
            { type: 'text', content: '三和弦的三个音，要写入（排列）四个声部，必然要有一个音写两遍，即重复某一个音，一般情况下是重复根音。' },
            {
                type: 'example', title: '例 1-30：C 大调 T–S–D（均重复根音）', measures: [
                    ['C4', 'E4', 'G4', 'C5'],
                    ['F4', 'A4', 'C5', 'F5'],
                    ['G4', 'B4', 'D5', 'G5']
                ]
            },
            { type: 'heading', text: '三、三和弦的旋律位置' },
            { type: 'text', content: '和弦中的哪一个音在最高声部（旋律的位置），这个和弦就是什么旋律位置。三和弦有三种旋律位置，即根音的旋律位置、三音的旋律位置与五音的旋律位置。' },
            {
                type: 'example', title: '例 1-31：C 大三和弦的三种旋律位置（根音→三音→五音）', fourPart: [
                    { s: ['C5'], a: ['G4'], t: ['E4'], b: ['C3'] },
                    { s: ['E5'], a: ['G4'], t: ['C4'], b: ['C3'] },
                    { s: ['G5'], a: ['C5'], t: ['E4'], b: ['C3'] }
                ]
            },
            { type: 'heading', text: '四、三和弦的排列法' },
            { type: 'text', content: '三和弦有密集的与开放的两种排列法。' },
            { type: 'text', content: '密集排列时，上方三个声部中每一对相邻声部（高音部与中音部、中音部与次中音部）之间的距离是三度或四度（和弦音挨着排列）。' },
            { type: 'text', content: '开放排列时，这种距离是五度、六度或八度（和弦音隔着排列）。' },
            { type: 'text', content: '不论是哪一种排列法，低音部与次中音部之间的距离都不受限制，可以从同度一直到两个八度（有时可以更远）。' },
            { type: 'example', title: '例 1：C 大三和弦——五音旋律位置，密集排列（上方三声部，和弦音挨着排列）', fourPart: [{ s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] }] },
            { type: 'example', title: '例 2：C 大三和弦——五音旋律位置，开放排列（上方三声部，和弦音隔着排列）', fourPart: [{ s: ['G4'], a: ['C4'], t: ['E3'], b: ['C3'] }] },
            { type: 'text', content: '为了使各声部看得更清晰，应在每一行谱表上写两个声部，其中较高声部的符干向上，较低声部的符干向下。' },
            { type: 'example', title: '注意：看好符干方向。', duration: 'h', fourPart: [{ s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] }] },
            { type: 'practice', label: '集中练习：四部和声排列法' },
            { type: 'heading', text: '五、声部交叉' },
            { type: 'text', content: '在实践中，无论是密集排列还是开放排列的三和弦都不允许出现声部交叉（也叫声部超越）。声部交叉是指高声部的音高低于低声部。' },
            { type: 'example', title: '注意：三声部的E4高于二声部的C4，声部交叉/超越了', duration: 'h', fourPart: [{ s: ['G4'], a: ['C4'], t: ['E4'], b: ['C3'] }] }
        ],
        exercises: [
            '书面习题：在不同调的任何一个音上构成重复根音的大三和弦与小三和弦，采用三种不同的旋律位置以及密集的和开放的排列法。',
            '键盘习题：构成同样的三和弦。'
        ]
    },
    3: {
        teaching: [
            { type: 'heading', text: '一、调式与调式功能' },
            { type: 'text', content: '从调式和声的观点来看，和弦之间存在着一个由倾向于主三和弦的倾向性统一起来的相互关联体系。这种关联体系既确定了一个旋律声部中的各音之间的旋律—音程关系，也确定了各和弦之间的总的关系。' },
            { type: 'text', content: '调式功能简称功能，是指音或和弦在调式中的作用，也可以说是指它（音、和弦）与别的音或别的和弦在同一调式中的相互关系。这种关系不仅表现在各音或和弦之间的音程关系上，还表现在当这些音或和弦连接时显示出来的紧张与稳定（解决）的变化上。' },
            { type: 'heading', text: '二、正三和弦的功能体系' },
            { type: 'text', content: '建立在音阶的 I 级（主音）上的三和弦叫做主三和弦或主和弦。在多声部音乐中，这个三和弦是调式的主要支持，因为在适宜的旋律、节奏和节拍条件下，它可以表现出结束所必须的稳定性与乐思的完整性。' },
            { type: 'text', content: '音阶的 IV 级上构成的三和弦称为下属三和弦或下属和弦。' },
            { type: 'text', content: '音阶的 V 级上构成的三和弦称属三和弦或属和弦。' },
            { type: 'practice', label: '集中练习：识别调内正三和弦' },
            {
                type: 'html',
                html: `<svg class="fn-diagram" viewBox="0 0 520 500" width="460" role="img" aria-label="正三和弦功能体系示意图" xmlns="http://www.w3.org/2000/svg">
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<line x1="260" y1="110" x2="170" y2="270" stroke="#b39ddb" stroke-width="1.5" stroke-dasharray="4 4"/>
<line x1="260" y1="110" x2="350" y2="270" stroke="#b39ddb" stroke-width="1.5" stroke-dasharray="4 4"/>
<line x1="260" y1="110" x2="80" y2="430" stroke="#6a1b9a" stroke-width="2"/>
<line x1="260" y1="110" x2="440" y2="430" stroke="#6a1b9a" stroke-width="2"/>
<line x1="80" y1="430" x2="440" y2="430" stroke="#6a1b9a" stroke-width="2"/>
</g>
<g font-family="-apple-system,PingFang SC,Microsoft YaHei,sans-serif">
<circle cx="260" cy="110" r="17" fill="#7b1fa2"/>
<circle cx="80" cy="430" r="17" fill="#7b1fa2"/>
<circle cx="440" cy="430" r="17" fill="#7b1fa2"/>
<circle cx="170" cy="270" r="16" fill="#fff" stroke="#7b1fa2" stroke-width="2"/>
<circle cx="350" cy="270" r="16" fill="#fff" stroke="#7b1fa2" stroke-width="2"/>
<circle cx="230" cy="163" r="16" fill="#fff" stroke="#7b1fa2" stroke-width="2"/>
<circle cx="305" cy="190" r="16" fill="#fff" stroke="#7b1fa2" stroke-width="2"/>
<g font-size="14" font-weight="700">
<text x="260" y="110" text-anchor="middle" dominant-baseline="central" fill="#fff">I</text>
<text x="80" y="430" text-anchor="middle" dominant-baseline="central" fill="#fff">IV</text>
<text x="440" y="430" text-anchor="middle" dominant-baseline="central" fill="#fff">V</text>
<text x="170" y="270" text-anchor="middle" dominant-baseline="central" fill="#7b1fa2">VI</text>
<text x="350" y="270" text-anchor="middle" dominant-baseline="central" fill="#7b1fa2">III</text>
<text x="230" y="163" text-anchor="middle" dominant-baseline="central" fill="#7b1fa2">VII</text>
<text x="305" y="190" text-anchor="middle" dominant-baseline="central" fill="#7b1fa2">II</text>
</g>
<g font-size="13" fill="#555">
<text x="260" y="80" text-anchor="middle">主</text>
<text x="80" y="466" text-anchor="middle">下属</text>
<text x="440" y="466" text-anchor="middle">属</text>
<text x="132" y="274" text-anchor="end">下中</text>
<text x="388" y="274" text-anchor="start">中</text>
<text x="200" y="167" text-anchor="end">导</text>
<text x="343" y="194" text-anchor="start">上主</text>
</g>
</g>
</svg>`
            },
            { type: 'heading', text: '三、功能标记' },
            { type: 'text', content: '在自然大调中，正三和弦标记为 T、S、D（均为大三和弦）；在和声小调中，标记为 t、s、D（主和弦与下属和弦为小三和弦，属和弦为大三和弦）。' },
            { type: 'text', content: '属三和弦与下属三和弦是最常见和最重要的在调式上不稳定的和弦。主和弦、属和弦与下属和弦称为正三和弦，因为它们反映了音响的调式特征。' },
            { type: 'heading', text: '四、和声进行的基本公式' },
            { type: 'text', content: '最简单的和声进行及其逻辑基础就是：在主和弦之后引入一个或几个不稳定和弦，形成紧张，并在进行到或回到主和弦时得到解决。' },
            { type: 'text', content: 'a. 主和弦后接属和弦再回到主和弦：T — D — T。' },
            {
                type: 'example', title: '例 2-37：T — D — T 正格进行（共同音 G 保持）', fourPart: [
                    { s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] },
                    { s: ['G4'], a: ['D4'], t: ['B3'], b: ['G3'] },
                    { s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] }
                ]
            },
            { type: 'text', content: 'c. 下属和弦也可直接进入主和弦：T — S — T（变格进行）。' },
            {
                type: 'example', title: '例 2-40：T — S — T 变格进行', fourPart: [
                    { s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] },
                    { s: ['A4'], a: ['F4'], t: ['C4'], b: ['F3'] },
                    { s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] }
                ]
            },
            { type: 'text', content: 'b. 主和弦后接下属和弦，再接属和弦，然后回到主和弦：T — S — D — T。这是完全进行，揭示了调式的所有基本功能。' },
            { type: 'example', title: '例 1：C 大调完全进行 T — S — D — T', fourPart: [{ s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] }, { s: ['A4'], a: ['F4'], t: ['C4'], b: ['F3'] }, { s: ['F4'], a: ['D4'], t: ['B3'], b: ['G3'] }, { s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] }] },
            { type: 'text', content: '注意：属和弦之后一般不接下属和弦（D — S 的进行不自然，不利于和声学初期学习时的音响建立），在最初的作业中不要使用。' },
            { type: 'heading', text: '五、和声进行的名称' },
            { type: 'text', content: '包括所有三种功能的进行称为完全进行（如 T—S—D—T）。根据功能顺序，和声进行又可分为正格（D—T、S—D—T）、半正格（T—D、S—D）、变格（S—T）和半变格（T—S）。' }
        ],
        analysisItems: [
            { title: '吴式锴《和声分析351例》谱例1', musicxml: '03_功能体系/351_01.musicxml' },
            { title: '吴式锴《和声分析351例》谱例2', musicxml: '03_功能体系/351_02.musicxml' }
        ],
        exercises: [
            '书面习题：在各个调上用四声部写出单独的 T、S 与 D 三和弦。',
            '键盘习题：弹奏同上的和弦。',
            '口答习题：分析乐曲片断中 T、S、D 的功能进行。'
        ]
    },
    4: {
        teaching: [
            { type: 'heading', text: '一、绪论' },
            { type: 'text', content: '和弦的连续进行（和声进行）就形成了和弦之间的连接。和弦的连接是按照在艺术实践中形成的一定的原则和规律进行的。和声连接的基础是声部进行，这是由各种形式的声部运动综合而成的。' },
            { type: 'heading', text: '二、各声部的进行' },
            { type: 'text', content: '单独一个声部的进行可以是平稳的，也可以是跳进的。声部作一度、二度（级进）或三度进行叫做平稳进行。它们在艺术作品中占有主要地位，因此也是在初学和声时必须遵守的规则。声部作四度、五度、六度或更大音程的进行称为跳进。在最初阶段的学习中，在各个声部中作跳进是不允许的，但低音部是例外——由于 T—D 与 T—S 的根音相距四度或五度，因此低音作这种距离的跳进是很自然的。' },
            { type: 'heading', text: '三、几个声部的同时进行' },
            { type: 'text', content: '两个声部的同时进行有三种类型，即同向进行、反向进行和斜向进行。' },
            { type: 'text', content: '同向进行：两个声部向同一个方向（上行或下行）进行。其中一种重要形式是平行进行——两个声部以同样的音程（如平行三度、六度或十度）作同方向进行。' },
            { type: 'text', content: '反向进行：两个声部向相反方向进行。' },
            { type: 'text', content: '斜向进行：两个声部中，一个作向上或向下进行，而另一个保持不动。' },
            { type: 'practice', label: '集中练习：原位三和弦连接' },
            { type: 'heading', text: '四、和弦之间的关系' },
            { type: 'text', content: '和弦之间的关系按根音之间的距离可分为四五度关系、三度关系和二度关系。四五度关系的三和弦之间有一个共同音（如 T—D、T—S）；二度关系的三和弦之间没有共同音（如 S—D）。' },
            {
                type: 'example', title: '例 3-50a：T — D（共同音 G 保持）', fourPart: [
                    { s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] },
                    { s: ['G4'], a: ['D4'], t: ['B3'], b: ['G3'] }
                ]
            },
            {
                type: 'example', title: '例 3-50b：T — S（共同音 C 保持）', fourPart: [
                    { s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] },
                    { s: ['A4'], a: ['F4'], t: ['C4'], b: ['F3'] }
                ]
            },
            { type: 'heading', text: '五、三和弦的连接法' },
            { type: 'text', content: '和弦有和声的与旋律的两种连接方法。' },
            { type: 'text', content: '和声连接法：连接时将共同音保持在同一声部中。四五度关系的三和弦用和声连接法时，先确定第二个和弦的低音，让共同音保持不动，另外两个声部作平行级进（T→S 时上行，T→D 时下行）。连接后排列法不变。' },
            { type: 'example', title: '例 1：T — D 和声连接法（共同音 G 保持）', fourPart: [{ s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] }, { s: ['G4'], a: ['D4'], t: ['B3'], b: ['G3'] }] },
            { type: 'text', content: '旋律连接法：低音作不超过四度的进行（T—D、D—T、T—S、S—T 中低音作四度；S—D 中低音作二度），上方三个声部与低音部作反向进行到后面和弦中离自己最近的音，没有跳进。排列法不变。' },
            { type: 'example', title: '例 2：S — D 旋律连接法（低音上行，上方声部下行）', fourPart: [{ s: ['A4'], a: ['F4'], t: ['C4'], b: ['F3'] }, { s: ['F4'], a: ['D4'], t: ['B3'], b: ['G3'] }] }
        ],
        analysis: '原位三和弦连接分和声连接法（有共同音且保持）与旋律连接法（无共同音或不保持）。声部进行分平稳（一二三度）与跳进（四度以上，初学仅低音可跳）。两声部同时进行分同向、反向、斜向。核心原则是避免平行五八度与隐伏五八度，上方声部级进平稳。',
        analysisExamples: [
            {
                key: 'C 大调',
                fourPart: [
                    { s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] },
                    { s: ['G4'], a: ['D4'], t: ['B3'], b: ['G3'] }
                ],
                chords: [
                    { func: 'T', name: '主和弦' },
                    { func: 'D', name: '属和弦（共同音 G 保持）' }
                ]
            }
        ],
        exercises: [
            '书面习题：在不同的大调与和声小调上连接 T—D、D—T、T—S、S—T（先用和声连接法，再用旋律连接法）和 S—D（用旋律连接法）。',
            '键盘习题：在不同大小调上弹奏 T—D、D—T、T—S、S—T 连接，先用和声连接法，再用旋律连接法，再弹奏 S—D 连接。'
        ]
    },
    5: {
        teaching: [
            { type: 'heading', text: '一、为旋律配和声的基本原则' },
            { type: 'text', content: '为旋律配和声时，必须注意前后和弦的正确连接，从第一个到第二个，从第二个到第三个，直到最后。和弦的选择要符合功能进行的逻辑。' },
            { type: 'text', content: '低音应当在一定的音域内（一至一个半八度，最多两个八度的范围内）作波浪型进行，通过交替使用上行与下行来做到，但不允许向同一方向作两次连续的五度（尽可能也不用四度）进行，因为这种进行旋律化不够明显。低音除了作四度与五度的跳进外，在同和弦重复时，还可作八度跳进。' },
            { type: 'heading', text: '二、和弦选择的方法' },
            { type: 'text', content: '旋律中的每个音可能属于不同的和弦。例如 C 大调中，g 音可能是主和弦的五音，也可能是属和弦的根音。选择时要考虑前后的连接是否正确，以及和声节奏是否合理。' },
            { type: 'text', content: '应当尽量避免 D—S 的进行（功能倒置）。当两个二度关系的和弦（如 S—D）连接时，低音应与上方三个声部成反向进行。' },
            { type: 'example', title: '例 1：为旋律配和声（T — S — D — T）', fourPart: [{ s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] }, { s: ['A4'], a: ['F4'], t: ['C4'], b: ['F3'] }, { s: ['F4'], a: ['D4'], t: ['B3'], b: ['G3'] }, { s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] }] },
            { type: 'practice', label: '集中练习：为旋律配和声' },
            { type: 'heading', text: '三、和声连接的应用' },
            { type: 'text', content: 'S 与 D 连接时应使用旋律连接法：低音级进上行，三个上方声部下行。D—T 连接时使用和声连接法，让共同音在高音部保持不动。' },
            { type: 'heading', text: '四、结尾的不完全主三和弦' },
            { type: 'text', content: '在结尾中，主三和弦可以是不完全的——没有五音，根音出现三次。省略五音对主三和弦在功能上的明确性并没有损害，对和弦在音响上的丰满也没有明显的影响。采用不完全主三和弦的基本目的是将中声部的导音按倾向性解决到主和弦的根音。在结尾的 D—T 进行中，当属三和弦的五音下行时，采用不完全的主三和弦是典型的做法。' }
        ],
        analysis: '为旋律配和声的核心是根据旋律音选择合适的和弦并正确连接。要点包括：低音作波浪型进行、避免连续同向五度跳进、避免 D—S 功能倒置、S—D 用旋律连接法（低音上行，上方声部下行）、D—T 用和声连接法（共同音保持）。结尾可用不完全主三和弦（省五音、根音三次）使导音解决到根音。',
        exercises: [
            '书面习题：为给定的旋律配和声，写出四部和声。',
            '键盘习题：为下列旋律片断配和声。'
        ]
    },
    6: {
        teaching: [
            { type: 'heading', text: '一、和弦的转换及其作用' },
            { type: 'text', content: '和弦在反复时改换另一种形式叫做和弦的转换。这种改换可以是旋律位置的改变，也可以是排列法的改变，或者是二者同时改变。' },
            { type: 'text', content: '旋律从一个和弦音换到另一个和弦音称为和弦的旋律位置的转换，这对旋律的发展具有重要的意义，使得可以在不变换和弦的情况下保持旋律与节奏的运动，从而避免由于过多地变换和弦而形成和声的杂乱。' },
            { type: 'text', content: '排列法的转换（从密集的换成开放的，或从开放的换成密集的）经常伴有旋律位置的变换。排列法的转换有时还有技术上的作用，如连接方便、符合规律、声部进行平稳等。' },
            { type: 'example', title: '例 1：T 和弦转换——根音→五音旋律位置（密集→开放）', fourPart: [{ s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] }, { s: ['E5'], a: ['C5'], t: ['G4'], b: ['C3'] }] },
            { type: 'heading', text: '二、和弦转换的方法' },
            { type: 'text', content: '当并列的是两个同级和弦时，运用和弦转换就可以在作旋律跳进的同时又改变排列法。' },
            { type: 'practice', label: '集中练习：同和弦转换' },
            { type: 'heading', text: '三、习题分析要点' },
            { type: 'text', content: '在为旋律配和声之前，先要对旋律的结构进行分析：' },
            { type: 'text', content: 'a. 确定哪些三度进行是同和弦的转换，哪些三度进行是用旋律连接法连接了不同和弦的结果。' },
            { type: 'text', content: 'b. 确定旋律中所有以四度跳进形式表现出来的和弦转换。' },
            { type: 'text', content: 'c. 凡上行五、六度的跳进都要求从密集排列转换为开放排列，而下行的则要从开放排列转换为密集排列。因此凡出现这类情况时，都需要提前为大跳所需要的排列法做好准备。' }
        ],
        analysis: '和弦转换是指同一和弦反复时改变旋律位置或排列法（或二者同时改变）。其作用是在不变换和弦的情况下保持旋律与节奏的运动，避免和声杂乱。排列法转换中，上行五、六度跳进需从密集转开放，下行则从开放转密集，需提前做好排列法准备。',
        exercises: [
            '键盘习题：在不同调上演奏单个三和弦 T、S、D 的转换——旋律上行从主音到三音、从三音到五音、再从五音到主音，分别用不改变排列法和改变排列法两种方式。',
            '书面习题：分析给定旋律中哪些进行属于同和弦转换。'
        ]
    },
    7: {
        teaching: [
            { type: 'heading', text: '一、为低音配和声的方法' },
            { type: 'text', content: '当两个和弦之间有共同音时，最简单的办法是用和声连接法。但如果在 T—S 与 T—D 的连接中只采用和声连接法，旋律就会几乎停滞不动，只在两个音之间来回踏步。' },
            { type: 'heading', text: '二、旋律连接法的应用' },
            { type: 'text', content: '如果在采用和声连接法的同时还采用旋律连接法，结果就会好得多。一个在和声连接法中保持不动的音，在旋律连接法中就会进行到别的音去，这样旋律就比较活跃了。' },
            { type: 'example', title: '例 1：为低音 C — F — G — C 配和声（T — S — D — T）', fourPart: [{ s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] }, { s: ['A4'], a: ['F4'], t: ['C4'], b: ['F3'] }, { s: ['F4'], a: ['D4'], t: ['B3'], b: ['G3'] }, { s: ['G4'], a: ['E4'], t: ['C4'], b: ['C3'] }] },
            { type: 'practice', label: '集中练习：为低音配和声' },
            { type: 'heading', text: '三、和弦转换的应用' },
            { type: 'text', content: '采用和弦的转换作为一种补充手段，可使旋律的变化更为丰富。在为同一个低音配和声时试用和弦的转换，就可以看出这种方法对丰富旋律的意义。' },
            { type: 'heading', text: '四、写作要点' },
            { type: 'text', content: '为低音配和声时，要根据低音确定和弦根音与功能，合理交替使用和声连接法与旋律连接法，并适当运用和弦转换，使上方声部（尤其是高音部）的旋律线条流畅而不呆滞。' }
        ],
        analysis: '为低音配和声时，仅用和声连接法会使旋律停滞。应交替使用和声连接法与旋律连接法，并辅以和弦转换，使高音部旋律线条活跃流畅。核心是在正确的功能连接基础上追求声部的旋律化。',
        exercises: [
            '书面习题：为下面的低音配和声，要使用和弦转换。',
            '键盘习题：为给定低音配和声，分别用和声连接法、旋律连接法及和弦转换三种方式。'
        ]
    },
    8: {
        teaching: [
            { type: 'heading', text: '一、高音部的三音跳进' },
            { type: 'text', content: '当四、五度关系的三和弦（如 T—D、D—T、T—S、S—T）作和声连接时，在高音部可以由一个和弦的三音跳进到另一个和弦的三音。这样形成的向上或向下的四度或五度跳进称之为三音跳进。' },
            { type: 'text', content: '这样跳进时排列法会发生变化：跳进中较高的音所在的和弦应该是开放排列，较低的音所在的和弦应是密集排列。' },
            { type: 'example', title: '例 1：T — D 高音部三音跳进（E→B，上行四度，密集→开放）', fourPart: [{ s: ['E4'], a: ['C4'], t: ['G3'], b: ['C3'] }, { s: ['B4'], a: ['G4'], t: ['D4'], b: ['G3'] }] },
            { type: 'practice', label: '集中练习：三音跳进' },
            { type: 'heading', text: '二、次中音部的三音跳进' },
            { type: 'text', content: '三音跳进也可以出现在次中音部，其排列法变化的原则与高音部相同。' },
            { type: 'heading', text: '三、习题分析' },
            { type: 'text', content: '对习题除了要像前面所讲的那样进行分析外，还应找出哪些跳进是三音跳进以及与此相联系的排列法的改变。' }
        ],
        analysis: '三音跳进是指四、五度关系三和弦作和声连接时，某一声部由一个和弦的三音跳到另一和弦的三音（形成四度或五度跳进）。跳进时排列法发生变化：较高音所在和弦为开放排列，较低音所在和弦为密集排列。可出现在高音部或次中音部。',
        exercises: [
            '键盘习题：在不同的调上弹奏 T—D、D—T、T—S、S—T 的和声连接法连接，在高音部和次中音部作向上与向下的三音跳进。',
            '书面习题：为给定片断配和声，分析其中的三音跳进及排列法变化。'
        ]
    },
    9: {
        teaching: [
            { type: 'heading', text: '一、音乐作品中的结构' },
            { type: 'text', content: '音乐作品是在时间中展开的，因而是一种时间艺术。音乐作品一方面在乐思上和形式上是一个整体；另一方面它又可以划分为一些段落，我们称之为结构。结构之间由句读分隔，句读把一个结构的结尾与另一个结构的开始分开。' },
            { type: 'heading', text: '二、乐段与乐句' },
            { type: 'text', content: '只用一个主题陈述、只包含一个单一乐思的最简单的完整音乐结构就是乐段。它一般又划分为两个等长的（4 小节的）结构，叫做乐句。这两个乐句用句读分开，并用两个不同的、在功能上相互联系的终止作为结束。' },
            { type: 'text', content: '由等长的两个乐句组成的 8 小节乐段一般称为方正结构，它在节拍上极为稳定。' },
            { type: 'heading', text: '三、终止的类型' },
            { type: 'text', content: '从和声的观点看，所有的终止可以分为两个基本功能类型：（1）以稳定和弦 T 作结束的终止；（2）以不稳定和弦 D 或 S 作结束的终止。' },
            { type: 'text', content: '稳定的终止又有三种类型：正格终止（乐句或乐段结尾处的 D—T 进行）、变格终止（S—T 进行）、完全终止（含有两种不稳定功能和弦的 S—D—T 进行）。' },
            { type: 'example', title: '例 1：正格终止 D — T', fourPart: [{ s: ['D5'], a: ['B4'], t: ['G4'], b: ['G3'] }, { s: ['C5'], a: ['G4'], t: ['E4'], b: ['C3'] }] },
            { type: 'example', title: '例 2：变格终止 S — T', fourPart: [{ s: ['C5'], a: ['A4'], t: ['F4'], b: ['F3'] }, { s: ['C5'], a: ['G4'], t: ['E4'], b: ['C3'] }] },
            { type: 'text', content: '用不稳定功能和弦（D 或 S）结尾的终止叫做半终止。正格半终止（结束在 D）明显地使用得比变格半终止多。' },
            { type: 'practice', label: '集中练习：终止式辨认' },
            { type: 'heading', text: '四、完满终止与不完满终止' },
            { type: 'text', content: '正格终止与变格终止根据其终止感的完满程度而分为完满终止与不完满终止。结尾的主和弦出现在小节的弱拍，或者是三音、五音处于旋律位置，或者是 D 或 S 在连接时采用转位的形式（低音不是终止型的四、五度进行），这样的终止称为不完满终止。' }
        ],
        analysis: '乐段是包含单一乐思的完整结构，通常分为两个等长乐句。终止分两大类：稳定终止（正格 D—T、变格 S—T、完全 S—D—T）与半终止（结束在 D 或 S）。根据完满程度又分为完满终止与不完满终止（主和弦在弱拍、三音或五音旋律位置、或用转位和弦）。',
        exercises: [
            '口答习题：判断给定乐曲片断的终止类型，以及第一和第二乐句的旋律在节奏上的关系。',
            '书面习题：为给定旋律和低音配和声，注意终止式的运用。'
        ]
    },
    10: {
        teaching: [
            { type: 'heading', text: '一、终止四六和弦的结构' },
            { type: 'text', content: '终止的四六和弦虽然在外表上与主三和弦的第二转位相似，但从其功能特点来看，它不是主和声。这个和弦在功能上的特点就是它含有两种功能的音：低音是 D（属功能），上面是 T（主功能），而 D 作为和声的基础，占有优势。' },
            { type: 'text', content: '一个和弦包含着两种功能的因素，叫做复功能，它使终止四六和弦具有自己特有的紧张性与不稳定性，而不是主功能（T）所固有的稳定性。终止四六和弦使 D 延迟出现，但又必须进行到 D，这种进行叫做解决。' },
            { type: 'example', title: '例 1：K₄⁶ — D — T（C 大调终止）', fourPart: [{ s: ['E5'], a: ['C5'], t: ['G4'], b: ['G3'] }, { s: ['D5'], a: ['B4'], t: ['G4'], b: ['G3'] }, { s: ['C5'], a: ['G4'], t: ['E4'], b: ['C3'] }] },
            { type: 'practice', label: '集中练习：终止四六和弦' },
            { type: 'heading', text: '二、声部进行' },
            { type: 'text', content: '为了强调终止四六和弦中属功能的优势，它一般重复 D 的根音。当终止四六和弦解决到 D 时，属和弦的根音以及它的重复音一般都保持不动，而主和弦的音则作级进下行到后面的 D 的音。' },
            { type: 'heading', text: '三、节拍条件' },
            { type: 'text', content: '终止四六和弦的应用有一定的节拍条件。在单拍子时它应该在强拍；在四拍子与六拍子中，它可出现在次强拍；在三拍子中，它有时出现在第二拍，而后面的 D 就放到更弱的第三拍上。' },
            { type: 'heading', text: '四、终止四六和弦的预备' },
            { type: 'text', content: '终止四六和弦用下属和声做预备最自然。下属和弦与它有共同音（S 的五音），使二者可以用和声连接法连接，并为不协和音（四度音）做正常的预备。但在终止中，它也常在没有下属和弦的情况下直接放在主和弦的后面，这种进行对于半终止来说最为典型。' }
        ],
        analysis: '终止四六和弦（K₄⁶）是主三和弦的第二转位形式，但具有复功能——低音为属功能音，上方为主功能音，属功能占优势。它必须解决到属和弦。一般重复属音（D 的根音），解决时属音保持、主功能音级进下行。节拍上须在强拍或次强拍。常用下属和弦作预备，也可直接接在主和弦之后。',
        exercises: [
            '口答习题：分析乐曲中应用终止四六和弦的条件。',
            '书面习题：为给定旋律和低音配和声，在终止处正确使用终止四六和弦。',
            '键盘习题：弹奏两拍子的、在中间和结尾的终止中带有终止四六和弦的最简单的乐段。'
        ]
    },
    11: {
        teaching: [
            { type: 'heading', text: '一、六和弦的结构与标记' },
            { type: 'text', content: '三和弦的第一转位叫做六和弦。六和弦的标记是在功能标记下面加一个数字 6，如 T₆、S₆、D₆。' },
            { type: 'heading', text: '二、六和弦的重复音及排列法' },
            { type: 'text', content: '正三和弦的六和弦重复根音或五音。最好不重复三音，即使要用也是在一定条件下。六和弦有更多的重复法与排列法，因此它与三和弦或六和弦的连接也更为多样。' },
            { type: 'example', title: '例 1：T₆ 与 D₆（C 大调，重复五音）', fourPart: [{ s: ['G4'], a: ['E4'], t: ['E3'], b: ['C3'] }, { s: ['F4'], a: ['D4'], t: ['B3'], b: ['B2'] }] },
            { type: 'practice', label: '集中练习：正三和弦的六和弦' },
            { type: 'heading', text: '三、六和弦的应用' },
            { type: 'text', content: '六和弦由于自己音响上的特点，它没有原位三和弦那样稳定，因此它主要应用在结构的中间，使陈述更为流畅。一般来说，任何用来结束一个乐句或乐段的终止都不用六和弦作为结束和弦，因为这会使终止变成不完满终止，因此它最好用在开始的结构（如第一乐句）中。' },
            { type: 'heading', text: '四、声部进行与连接' },
            { type: 'text', content: '在声部进行中，平行八度（一度）以及反方向的八度进行（无论是从一度到八度还是从八度到一度）都是不允许的。' },
            { type: 'text', content: '六和弦与四、五度关系三和弦的连接用和声的连接法，声部平稳进行，不用跳进。' },
            { type: 'text', content: 'S—D₆ 连接时，低音应作减五度下行而不作增四度上行。为了避免平行五度，属和弦的六和弦（D₆）必须重复五音。' },
            { type: 'heading', text: '五、配和声要点' },
            { type: 'text', content: 'a. 为了终止的需要，应减少原位三和弦的使用；b. 避免在旋律与低音两个声部中同时出现跳进；c. 在第二乐句中，原位的主三和弦应尽可能只用在乐句的开头和结尾。' }
        ],
        analysis: '六和弦是三和弦的第一转位，标记为功能符号下加数字 6。正三和弦的六和弦重复根音或五音（一般不重复三音）。它不如原位三和弦稳定，主要用于结构中间使陈述流畅，终止处不宜用六和弦结束。连接时避免平行八度和反向八度；与四五度关系三和弦用和声连接法；S—D₆ 连接时低音作减五度下行，D₆ 须重复五音以避免平行五度。',
        exercises: [
            '键盘习题：在不同的大小调上构成 T、S、D 的六和弦，使用不同的重复音；弹奏 T—D₆—T、T—S₆—T、T—S₆—D 等进行。',
            '书面习题：为给定低音和旋律配和声，使用六和弦。'
        ]
    },
    12: {
        teaching: [
            { type: 'heading', text: '一、根音跳进与五音跳进' },
            { type: 'text', content: '三和弦与六和弦连接时，可以在根音或五音之间形成跳进。为了保证声部进行的正确（避免平行八度或平行五度），两个和弦中必须有一个是六和弦。' },
            { type: 'text', content: '当这种跳进是下行时，第一个和弦应该是开放排列的原位三和弦，第二个和弦是六和弦，低音下行（与跳进成同向进行）。' },
            { type: 'example', title: '例 1：T — D₆ 下行根音跳进（G→D，开放→六和弦）', fourPart: [{ s: ['G4'], a: ['C4'], t: ['E3'], b: ['C3'] }, { s: ['D4'], a: ['B3'], t: ['G3'], b: ['B2'] }] },
            { type: 'text', content: '当这种跳进是上行时，第一个和弦用混合排列，第二个和弦用密集排列，低音上行（与跳进成反向进行）。' },
            { type: 'heading', text: '二、混合跳进' },
            { type: 'text', content: '六和弦与不同功能的三和弦连接时，可以在它们的不同类的和弦音（根音与三音、五音与三音等）之间形成六度、减五度，偶尔还有七度的跳进。' },
            { type: 'practice', label: '集中练习：三和弦与六和弦连接的跳进' },
            { type: 'heading', text: '三、隐伏五八度' },
            { type: 'text', content: '同向进行到八度或五度就突出了它们空洞的音响。但只有出现在两个外声部并在高音部有上跳进的隐伏五度才是禁止的，因为这时听起来最明显。前面介绍的有关三和弦与六和弦连接的顺序、排列法、声部进行等方面的要求正是为了避免出现这种情况。' },
            { type: 'heading', text: '四、跳进的作用' },
            { type: 'text', content: '采用各种跳进（三音、根音、五音以及混合的）大大地扩展了声部进行的手段。大多数情况下，声部的跳进应与平稳进行交替出现。比之同一和弦的转换，不同和弦间的跳进更强调声部在跳进之后一定要作反向进行。中间声部的跳进主要是作为一种辅助性的技术手段，在声部进行有困难的时候使用。' }
        ],
        analysis: '三和弦与六和弦连接时可出现根音跳进、五音跳进和混合跳进。下行跳进时第一和弦为开放排列原位三和弦、第二为六和弦（低音下行）；上行跳进时第一为混合排列、第二为密集排列（低音上行）。只有两个外声部同向且高音部上跳进形成的隐伏五度才被禁止。跳进后应作反向进行，与平稳进行交替使用。',
        exercises: [
            '键盘习题：在不同的调上弹奏 T—S₆—D、T—D₆—D—T（高音部上行跳进）以及 T—T₆—S、T—S₆—D（高音部下行跳进）等连接。',
            '书面习题：为给定片断配和声，使用三和弦与六和弦连接时的跳进。'
        ]
    },
    13: {
        teaching: [
            { type: 'heading', text: '一、四、五度关系的两个六和弦' },
            { type: 'text', content: '四、五度关系的两个六和弦连接时，使用和声连接法，使共同音保持不动。如果共同音只在一个声部保持不动，那另一个声部（一般是高音部）就与低音部作平行或反行的跳进。当两个六和弦的重复音相同时，这种跳进是可能的；而当两个六和弦的重复音不同时，这种跳进更是必须的。' },
            { type: 'practice', label: '集中练习：两个六和弦的连接' },
            { type: 'heading', text: '二、二度关系的两个六和弦' },
            { type: 'text', content: '二度关系的六和弦（如 S₆—D₆）连接时，声部进行要按照以下方法：' },
            { type: 'text', content: 'a. S₆ 要重复根音，D₆ 要重复五音。' },
            { type: 'text', content: 'b. 在三个声部中构成平行六和弦进行，另一个声部作反向进行，使和弦形成正确的重复音。' },
            { type: 'text', content: 'c. 各声部都作平稳进行时，S₆ 必须用根音旋律位置（否则必然要形成平行八度或平行五度）。' },
            { type: 'example', title: '例 1：S₆ — D₆ 连接（平行六和弦进行）', fourPart: [{ s: ['F4'], a: ['A3'], t: ['F3'], b: ['F2'] }, { s: ['E4'], a: ['B3'], t: ['G3'], b: ['B2'] }] }
        ],
        analysis: '两个六和弦连接分两种情况：四、五度关系时用和声连接法，共同音保持，另一声部与低音作平行或反行跳进（重复音不同时跳进必须）；二度关系（S₆—D₆）时，S₆ 重复根音、D₆ 重复五音，三个声部作平行六和弦进行、另一声部反向，各声部平稳时 S₆ 须用根音旋律位置以避免平行五八度。',
        exercises: [
            '书面习题：为给定旋律和低音配和声，使用两个六和弦的连接。',
            '键盘习题：弹奏 T—S₆—D—T、t—s₆—K₄⁶—D—t、T₆—S₆—D—T、D₆—T₆—S₆—K₄⁶—D—T 等进行。'
        ]
    },
    14: {
        teaching: [
            { type: 'heading', text: '一、经过的四六和弦' },
            { type: 'text', content: '经过的四六和弦典型的声部进行是平稳进行。在低音向上或向下级进的同时，上方声部之一（经常是高音部）以相同的音向相反的方向作同样的进行，另一个声部保持不动，第四个声部作级进下行再返回。' },
            { type: 'example', title: '例 1：经过的四六和弦 T — D₄⁶ — T₆', fourPart: [{ s: ['E5'], a: ['E5'], t: ['C4'], b: ['C3'] }, { s: ['F5'], a: ['D5'], t: ['G4'], b: ['G3'] }, { s: ['G5'], a: ['C5'], t: ['E4'], b: ['E3'] }] },
            { type: 'practice', label: '集中练习：经过与辅助四六和弦' },
            { type: 'heading', text: '二、辅助的四六和弦' },
            { type: 'text', content: '辅助的四六和弦要求声部进行非常平稳，低音与它的重复音保持不动，另两个声部平行地（相距三度或六度）级进上行，然后返回。辅助的四六和弦和经过的四六和弦以及终止的四六和弦一样，一般都重复自己的低音。' },
            { type: 'text', content: '作为特殊情况，辅助的四六和弦也可以采用更为自由的声部进行，包括在一个声部中跳进。' },
            { type: 'heading', text: '三、辅助四六和弦的应用' },
            { type: 'text', content: '在补充的变格终止中经常采用辅助的下属四六和弦，形成这种终止的另一种形式。如果辅助的 S₄⁶ 出现在不完全终止的主和弦之后，那么其中的一个声部从 T 到 S₄⁶。' }
        ],
        analysis: '经过的四六和弦：低音级进上行或下行，上方一声部反向同音进行，一声部保持，第四声部级进下行再返回。辅助的四六和弦：低音与重复音保持不动，另两个声部平行三度或六度级进上行后返回，一般重复低音。两者均为装饰性和弦，不改变功能进行。辅助的下属四六和弦常用于补充变格终止。',
        exercises: [
            '键盘习题：在不同的调上弹奏用经过的四六和弦的进行（如 T—D₄⁶—T₆、T₆—D₄⁶—T、S—T₄⁶—S₆ 等）以及用辅助的四六和弦的进行。',
            '书面习题：为给定旋律和低音配和声，使用经过与辅助的四六和弦。'
        ]
    }
};

const appState = {
    currentPhase: 'basic',
    currentCourse: null,
    currentMode: 'learn',
    currentLevel: 1,
    currentChapter: null,
    levelSession: { level: 1, questions: [], currentIndex: 0, correct: 0, wrong: 0, score: 0, currentQuestion: null, selectedNotes: [] },
    triadSession: null,
    fourPartSession: null,
    userInfo: { school: '', majorClass: '', name: '', teacher: '', saved: false },
    audioInitialized: false,
    startTime: Date.now(),
    activityMs: 0,
    returnTargetPage: null,
    chapterProgress: {},
    staffNotes: []
};

function initializeChapterProgress() {
    appState.chapterProgress = {};
    textbookChapters.forEach(chapter => {
        appState.chapterProgress[chapter.id] = {
            unlocked: true,
            completed: false,
            mastery: 0
        };
    });
}

let audioCtx = null;

// 辅助函数
function getCoursesInOrder() {
    const arr = [];
    ['basic', 'advanced', 'improve'].forEach(phase => courses[phase].forEach(course => arr.push({ phase, course })));
    arr.sort((a, b) => a.course.id - b.course.id);
    return arr;
}
function syncCourseUnlockChain() {
    // 测试阶段：取消闯关模式，所有关卡均开放
    const list = getCoursesInOrder();
    list.forEach(item => {
        const c = item.course;
        c.unlocked = true;
        if (c.status === 'locked') c.status = 'not-started';
    });
}
// 按用户隔离存储：每个用户名一个独立的 localStorage key，避免切换用户数据混淆
function currentUserKey() {
    // 用「学校 + 班级 + 姓名」组合作为唯一标识，避免不同学校/班级同名混淆
    const ui = appState.userInfo || {};
    const parts = [ui.school, ui.majorClass, ui.name].map(s => (s || '').trim());
    return parts.every(p => p) ? parts.join('|') : '';
}
function storageKeyForUser(key) {
    return 'harmonyProgress_' + key;
}
// 恢复最后一次登录的用户信息（刷新/重开页面时回显该用户，免重复输入）
function restoreLastUserInfo() {
    const lastKey = localStorage.getItem('harmony_last_user');
    if (!lastKey) return;
    const raw = localStorage.getItem(storageKeyForUser(lastKey));
    if (!raw) return;
    try {
        const progress = JSON.parse(raw);
        if (progress.userInfo) appState.userInfo = { ...appState.userInfo, ...progress.userInfo };
    } catch (e) { }
}
// 新用户：全部学习数据归零（进度、成绩、习题答案、学习时长）
function resetAllLearningData() {
    initializeChapterProgress();
    for (let phase in courses) courses[phase].forEach(c => { c.progress = 0; c.bestAccuracy = 0; c.passed75 = false; c.status = 'not-started'; });
    for (let i = 1; i <= 5; i++) { keyRanges[i].progress = { correct: 0, total: 0, completed: false }; keyRanges[i].completed = false; keyRanges[i].unlocked = (i === 1); }
    appState.activityMs = 0;
    appState.startTime = Date.now();
    if (hwState) hwResetState();
    hwCurrentQuestion = '';
    syncCourseUnlockChain();
}
function loadProgress() {
    const key = currentUserKey();
    const saved = key ? localStorage.getItem(storageKeyForUser(key)) : null;
    if (saved) {
        try {
            const progress = JSON.parse(saved);
            for (let phase in courses) courses[phase].forEach(c => { if (progress[`${phase}_${c.id}`]) Object.assign(c, progress[`${phase}_${c.id}`]); });
            if (progress.keyRanges) for (let i = 1; i <= 5; i++) if (progress.keyRanges[i]) keyRanges[i] = { ...keyRanges[i], ...progress.keyRanges[i] };
            if (progress.chapterProgress) appState.chapterProgress = { ...appState.chapterProgress, ...progress.chapterProgress };
            if (progress.userInfo) appState.userInfo = { ...appState.userInfo, ...progress.userInfo };
            if (progress.startTime) appState.startTime = progress.startTime;
            if (progress.activityMs) appState.activityMs = progress.activityMs;
        } catch (e) { }
    }
    if (!appState.chapterProgress || Object.keys(appState.chapterProgress).length === 0) initializeChapterProgress();
    // 测试阶段：确保所有章节均解锁，并补齐新增章节的进度记录
    textbookChapters.forEach(ch => {
        if (!appState.chapterProgress[ch.id]) appState.chapterProgress[ch.id] = { unlocked: true, completed: false, mastery: 0 };
        appState.chapterProgress[ch.id].unlocked = true;
    });
    keyRanges[1].unlocked = true;
    syncCourseUnlockChain();
    // 用最新权重公式重新计算各章节掌握度（避免旧版本保存的 mastery 过期）
    textbookChapters.forEach(ch => refreshChapterMastery(ch.id));
    saveProgress();
}
function saveProgress() {
    const progress = {};
    for (let phase in courses) courses[phase].forEach(c => { progress[`${phase}_${c.id}`] = { unlocked: c.unlocked, progress: c.progress, status: c.status, passed75: c.passed75, bestAccuracy: c.bestAccuracy || 0 }; });
    progress.keyRanges = {}; for (let i = 1; i <= 5; i++) progress.keyRanges[i] = { unlocked: keyRanges[i].unlocked, progress: keyRanges[i].progress, completed: keyRanges[i].completed };
    progress.chapterProgress = appState.chapterProgress;
    progress.userInfo = appState.userInfo;
    progress.startTime = appState.startTime;
    progress.activityMs = appState.activityMs || 0;
    const key = currentUserKey();
    if (key) {
        localStorage.setItem(storageKeyForUser(key), JSON.stringify(progress));
        localStorage.setItem('harmony_last_user', key); // 记录最后登录用户，刷新后回显
    }
}
function updateStats() {
    // 总进度：所有章节掌握度（mastery）的平均值
    // 平均正确率：所有练习答题的「答对数 / 总题数」
    // 已通关关卡：completed 的章节数
    // 学习时长：页面活动时长（静止不计入）
    const PRACTICE_TOTAL = { listen: 10, build: 10, arrange: 10, upper: 10, fourpart: 10 };
    let masterySum = 0, mastered = 0;
    let totalCorrect = 0, totalQuestions = 0;
    textbookChapters.forEach(ch => {
        const prog = appState.chapterProgress[ch.id];
        if (!prog) return;
        masterySum += computeChapterMastery(ch.id);
        if (prog.completed) mastered++;
        const scores = prog.scores || {};
        Object.keys(scores).forEach(type => {
            const arr = scores[type] || [];
            if (!Array.isArray(arr)) return; // homework 等对象数据不参与「平均正确率」统计
            const perTotal = PRACTICE_TOTAL[type] || 10;
            arr.forEach(c => { totalCorrect += (c || 0); totalQuestions += perTotal; });
        });
    });
    const totalProgress = textbookChapters.length ? Math.round(masterySum / textbookChapters.length) : 0;
    const accuracy = totalQuestions ? Math.round(totalCorrect / totalQuestions * 100) : 0;
    const learningMinutes = Math.floor((appState.activityMs || 0) / 60000);
    const zsTotal = document.getElementById('zs-total-progress');
    const zsAvg = document.getElementById('zs-avg-score');
    const zsMastered = document.getElementById('zs-mastered-count');
    const zsTime = document.getElementById('zs-learning-time');
    if (zsTotal) zsTotal.textContent = totalProgress + '%';
    if (zsAvg) zsAvg.textContent = accuracy + '%';
    if (zsMastered) zsMastered.textContent = mastered;
    if (zsTime) zsTime.textContent = learningMinutes;
}

// ==================== 页面活动时长追踪（登录后活动时长总和，静止不计入） ====================
const ACTIVITY_IDLE_MS = 60 * 1000; // 超过 60 秒无任何交互视为静止
const activityTracker = { lastActiveAt: 0, lastTickAt: 0, timer: null, started: false };
function activityMark() { activityTracker.lastActiveAt = Date.now(); }
function activityTick() {
    const now = Date.now();
    if (activityTracker.lastActiveAt && (now - activityTracker.lastActiveAt < ACTIVITY_IDLE_MS)) {
        appState.activityMs = (appState.activityMs || 0) + (now - activityTracker.lastTickAt);
    }
    activityTracker.lastTickAt = now;
    const zsTime = document.getElementById('zs-learning-time');
    if (zsTime) zsTime.textContent = Math.floor((appState.activityMs || 0) / 60000);
}
function activityStart() {
    if (activityTracker.started) return;
    activityTracker.started = true;
    activityTracker.lastActiveAt = 0; // 初始视为未活动：登录后保持静止不计时
    activityTracker.lastTickAt = Date.now();
    activityTracker.timer = setInterval(activityTick, 1000);
    ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll', 'wheel', 'click', 'pointerdown'].forEach(evt => {
        document.addEventListener(evt, activityMark, { passive: true });
    });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) { activityTick(); saveProgress(); }
        else { activityTracker.lastTickAt = Date.now(); }
    });
    window.addEventListener('beforeunload', () => { activityTick(); saveProgress(); });
}
function renderZhengSanHub() {
    const container = document.getElementById('zheng-san-course-list');
    if (!container) return;
    container.innerHTML = '';

    const phaseChapters = textbookChapters.filter(ch => ch.phase === appState.currentPhase);
    phaseChapters.forEach(chapter => {
        const progress = appState.chapterProgress[chapter.id] || { unlocked: true, completed: false, mastery: 0 };
        const locked = !progress.unlocked;
        const card = document.createElement('div');
        card.className = `zs-level-card${locked ? ' locked' : ''}`;

        const statusText = locked ? '未解锁' : (progress.completed ? '已完成' : '学习中');
        const statusClass = locked ? 'locked' : (progress.completed ? 'cleared' : 'learning');

        card.innerHTML = `
            <div class="zs-level-info">
                <div class="zs-level-title">${chapter.title}</div>
                <div class="zs-level-desc">${chapter.summary}</div>
            </div>
            <div class="zs-level-side">
                <div class="zs-mastery">
                    <span class="zs-mastery-num">${locked ? '—' : progress.mastery + '%'}</span>
                    <span class="zs-mastery-label">掌握度</span>
                </div>
                <span class="zs-pill ${statusClass}">${statusText}</span>
            </div>
        `;

        if (!locked) card.addEventListener('click', () => openChapterFromHub(chapter));
        container.appendChild(card);
    });
}

function openChapterFromHub(chapter) {
    if (!appState.userInfo.saved) { alert('请先填写并保存学生信息'); return; }
    appState.returnTargetPage = 'zheng-san-page';
    appState.currentChapter = chapter;
    document.getElementById('learn-title').textContent = `📘 ${chapter.title}`;
    pageManager.switchToPage('learn-page');
    loadChapterContent(chapter);
    setTimeout(() => { if (window.refreshPianoLayout) window.refreshPianoLayout(); }, 80);
}

// 获取和声分析题目列表（兼容旧 analysisExamples 数据）
function getAnalysisItems(content) {
    if (content.analysisItems && content.analysisItems.length) return content.analysisItems;
    return (content.analysisExamples || []).map(ex => ({ title: ex.key || '谱例', fourPart: ex.fourPart, chords: ex.chords }));
}
// 用 OpenSheetMusicDisplay 渲染 MusicXML 谱例
function renderMusicXml(container, url) {
    if (window.opensheetmusicdisplay && window.opensheetmusicdisplay.OpenSheetMusicDisplay) {
        const OSMD = window.opensheetmusicdisplay.OpenSheetMusicDisplay;
        const osmd = new OSMD(container, { autoResize: true, backend: 'svg' });
        fetch(url)
            .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
            .then(xml => osmd.load(xml).then(() => osmd.render()))
            .catch(() => { container.innerHTML = '<p class="ch-text">谱例加载失败（请检查 MusicXML 文件）</p>'; });
    } else {
        container.innerHTML = '<p class="ch-text">谱例渲染库未加载</p>';
    }
}
// 打开和声分析练习：渲染谱例 + 调标记/和弦标记留白
function openAnalysisExercise(chapter, item) {
    const modal = document.getElementById('analysis-modal');
    const titleEl = document.getElementById('analysis-modal-title');
    const scoreEl = document.getElementById('analysis-modal-score');
    if (!modal || !titleEl || !scoreEl) return;
    titleEl.textContent = (chapter.title || '') + ' · ' + (item.title || '和声分析');
    scoreEl.innerHTML = '';
    if (item.musicxml) {
        renderMusicXml(scoreEl, item.musicxml);
    } else if (item.fourPart) {
        renderFourPartScore(scoreEl, item.fourPart, item);
    } else {
        scoreEl.innerHTML = '<p class="ch-text">谱例数据待提供</p>';
    }
    document.getElementById('analysis-key-input').value = '';
    document.getElementById('analysis-chord-input').value = '';
    modal.style.display = 'flex';
}
function loadChapterContent(chapter) {
    const container = document.getElementById('learn-content');
    if (!container) return;

    const content = chapterContent[chapter.id] || { teaching: [], analysis: '', exercises: [] };
    const exampleData = []; // 存储谱例完整数据，供渲染与播放使用

    // 构建教学内容区块
    const teachingHtml = content.teaching.map(block => {
        if (block.type === 'heading') {
            return `<h3 class="ch-subheading">${block.text}</h3>`;
        }
        if (block.type === 'text') {
            return `<p class="ch-text">${block.content}</p>`;
        }
        if (block.type === 'example') {
            const idx = exampleData.length;
            exampleData.push(block);
            return `
                <div class="ch-example">
                    <div class="ch-example-title">${block.title}</div>
                    <div class="ch-score" data-example-idx="${idx}"></div>
                    <button class="btn btn-small ch-play-btn" data-example-idx="${idx}">
                        <i class="fas fa-play"></i> 播放
                    </button>
                </div>`;
        }
        if (block.type === 'practice') {
            return `<button class="btn ch-inline-practice" data-chapter-id="${chapter.id}"><i class="fas fa-dumbbell"></i> ${block.label}</button>`;
        }
        if (block.type === 'html') {
            return `<div class="ch-html-block">${block.html}</div>`;
        }
        return '';
    }).join('');

    const analysisItems = getAnalysisItems(content);
    const hasAnalysis = content.analysis || analysisItems.length;
    const analysisHtml = hasAnalysis ? `
        <div class="ch-section">
            <h2 class="ch-section-title"><i class="fas fa-search"></i> 和声分析</h2>
            ${content.analysis ? `<p class="ch-text">${content.analysis}</p>` : ''}
            <ol class="ch-analysis-list">
                ${analysisItems.map((item, i) => `
                    <li>
                        <span>${item.title || ('谱例' + (i + 1))}</span>
                        <button class="btn btn-small ch-analysis-btn" data-chapter-id="${chapter.id}" data-analysis-idx="${i}"><i class="fas fa-edit"></i> 去练习</button>
                    </li>`).join('')}
            </ol>
        </div>` : '';

    const exercisesHtml = content.exercises && content.exercises.length ? `
        <div class="ch-section">
            <h2 class="ch-section-title"><i class="fas fa-pen-to-square"></i> 课后习题</h2>
            <ol class="ch-exercises">
                ${content.exercises.map((ex, i) => `
                    <li>
                        ${ex}
                        <button class="btn btn-small hw-ex-btn" data-exercise-index="${i}" style="margin-top:6px;"><i class="fas fa-edit"></i> 去练习</button>
                    </li>`).join('')}
            </ol>
        </div>` : '';

    container.innerHTML = `
        <div class="chapter-detail">
            <div class="ch-section">
                <h2 class="ch-section-title"><i class="fas fa-book-open"></i> 教学内容</h2>
                <div class="ch-teaching">${teachingHtml}</div>
            </div>
            ${analysisHtml}
            ${exercisesHtml}
            <div class="note"><strong>💡 提示：</strong> 点击谱例旁的"播放"按钮可聆听和弦音响；点击"集中练习"按钮进入针对本内容的键盘练习。</div>
        </div>
    `;

    // 渲染所有谱例（VexFlow 静态渲染）
    document.querySelectorAll('.ch-score').forEach(el => {
        const idx = parseInt(el.dataset.exampleIdx);
        const block = exampleData[idx];
        if (!block) return;
        if (block.fourPart) renderFourPartScore(el, block.fourPart, null, block.duration);
        else if (block.measures) renderProgressionScore(el, block.measures, block.duration);
        else renderTriadScore(el, block.notes, block.duration);
    });

    // 绑定和声分析「去练习」按钮
    document.querySelectorAll('.ch-analysis-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.analysisIdx, 10);
            const item = analysisItems[idx];
            if (item) openAnalysisExercise(chapter, item);
        });
    });

    // 绑定谱例播放按钮（支持进行：依次播放每个和弦）
    document.querySelectorAll('.ch-play-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.exampleIdx);
            const block = exampleData[idx];
            if (!block) return;
            let chords = [];
            if (block.fourPart) {
                chords = block.fourPart.map(m => [...(m.s || []), ...(m.a || []), ...(m.t || []), ...(m.b || [])]);
            } else if (block.measures) {
                chords = block.measures;
            } else {
                chords = [block.notes];
            }
            chords.forEach((chord, i) => {
                setTimeout(() => playChord(chord), i * 1200);
            });
        });
    });

    // 绑定内联练习按钮
    document.querySelectorAll('.ch-inline-practice').forEach(btn => {
        btn.addEventListener('click', () => {
            const chapterId = Number(btn.dataset.chapterId);
            const ch = textbookChapters.find(item => item.id === chapterId);
            if (ch) startChapterPractice(ch);
        });
    });

    // 绑定每道课后习题的「去练习」按钮（打开可写五线谱编辑器并显示题干）
    document.querySelectorAll('.hw-ex-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.exerciseIndex, 10);
            const ex = content.exercises[idx];
            if (ex) hwOpenHomeworkEditor(ex, idx);
        });
    });

    // 教学观看追踪：滚动到内容底部时，标记「看完教学」（占掌握度 10%）
    const endMarker = container.querySelector('.note');
    if (endMarker && window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const prog = appState.chapterProgress[chapter.id];
                if (prog && !prog.teachingWatched) {
                    prog.teachingWatched = 100;
                    refreshChapterMastery(chapter.id);
                    saveProgress();
                }
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        observer.observe(endMarker);
    }
}

// 针对章节内容的集中练习（使用现有键盘答题系统）
function startChapterPractice(chapter) {
    if (!appState.userInfo.saved) { alert('请先保存学生信息'); return; }
    appState.currentChapter = chapter;
    // 第 1 章（大小三和弦）使用「听辨 + 构建」两种题型
    if (chapter.id === 1) { showTriadTypeSelector(); return; }
    // 第 2 章（四部和声）使用「判断排列法 + 构建上方三声部 + 四部和声排列」三种题型
    if (chapter.id === 2) { showFourPartTypeSelector(); return; }
    // 默认使用 1 级调范围（C大调/a小调）进行集中练习
    appState.currentLevel = 1;
    const questions = Array(20).fill().map(() => generateQuestionForLevel(appState.currentLevel));
    appState.levelSession = { level: appState.currentLevel, questions, currentIndex: 0, correct: 0, wrong: 0, score: 0, currentQuestion: questions[0], selectedNotes: [] };
    appState.triadSession = null;
    appState.fourPartSession = null;
    appState.currentMode = 'practice';
    document.getElementById('learn-content').style.display = 'none';
    document.getElementById('homework-content').style.display = 'none';
    document.getElementById('practice-content').style.display = 'block';
    updateBackBtnLabel();
    setStatsPanelVisible(true);
    loadPracticeQuestion();
}

// ==================== 三和弦练习（听辨 + 构建） ====================
const TRIAD_QUALITIES = [
    { id: 'major', label: '大三和弦', semis: [0, 4, 7] },
    { id: 'minor', label: '小三和弦', semis: [0, 3, 7] },
    { id: 'dim', label: '减三和弦', semis: [0, 3, 6] },
    { id: 'aug', label: '增三和弦', semis: [0, 4, 8] }
];
function triadQualityLabel(id) { const q = TRIAD_QUALITIES.find(t => t.id === id); return q ? q.label : id; }
function triadNoteAtOffset(rootNote, semis) {
    const idx = allNotes.findIndex(n => n.note === rootNote);
    return idx >= 0 ? allNotes[idx + semis]?.note : null;
}
function triadBuildNotes(rootNote, qualityId) {
    const q = TRIAD_QUALITIES.find(t => t.id === qualityId);
    return q.semis.map(s => triadNoteAtOffset(rootNote, s)).filter(Boolean);
}
function triadRandomRoot() {
    const low = allNotes.findIndex(n => n.note === 'C3');
    const high = allNotes.findIndex(n => n.note === 'B4');
    return allNotes[low + Math.floor(Math.random() * (high - low + 1))].note;
}
// 构建题型的根音范围（C4–B4，适配高音谱表，避免过低音加线过多）
function triadRandomBuildRoot() {
    const low = allNotes.findIndex(n => n.note === 'C4');
    const high = allNotes.findIndex(n => n.note === 'B4');
    return allNotes[low + Math.floor(Math.random() * (high - low + 1))].note;
}
// 四部和声排列题型的根音范围（F3–B3）：使密集排列的五音旋律位置（最高声部）落在小字一组 C4–B4
function fourPartRandomRoot() {
    const low = allNotes.findIndex(n => n.note === 'F3');
    const high = allNotes.findIndex(n => n.note === 'B3');
    return allNotes[low + Math.floor(Math.random() * (high - low + 1))].note;
}
function triadPitchClass(note) {
    const m = /^([A-G])([#b]*)(-?\d+)$/.exec(note);
    if (!m) return null;
    const semis = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    let alt = 0;
    (m[2] || '').split('').forEach(c => alt += (c === '#' ? 1 : -1));
    return ((semis[m[1]] + alt) % 12 + 12) % 12;
}
// 根据根音与音程，按和弦性质正确拼写三音/五音（等音处理）
// rootNote: 'G#4'；semis: 音程半音数；letterOffset: 字母偏移（三音=2，五音=4）
function spellChordTone(rootNote, semis, letterOffset) {
    const rm = /^([A-G])([#b]*)(-?\d+)$/.exec(rootNote);
    if (!rm) return null;
    const SEMIS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    const LETTERS = 'CDEFGAB';
    let rootAcc = 0;
    (rm[2] || '').split('').forEach(c => rootAcc += (c === '#' ? 1 : -1));
    const rootMidi = (parseInt(rm[3], 10) + 1) * 12 + SEMIS[rm[1]] + rootAcc;
    const targetMidi = rootMidi + semis;
    const targetLetter = LETTERS[(LETTERS.indexOf(rm[1]) + letterOffset) % 7];
    const targetPc = ((targetMidi % 12) + 12) % 12;
    let acc = targetPc - SEMIS[targetLetter];
    if (acc > 6) acc -= 12;
    if (acc < -6) acc += 12;
    const octave = Math.round((targetMidi - SEMIS[targetLetter] - acc) / 12) - 1;
    const accStr = acc > 0 ? '#'.repeat(acc) : (acc < 0 ? 'b'.repeat(-acc) : '');
    return targetLetter + accStr + octave;
}
// 等音拼写归一化：保留原音的实际音高，只把音名替换为目标音名（等音处理）
// 例：note='F4', target='F5' → 'F4'；note='B#4', target='C5' → 'C5'（音高不变，仅改等音拼写）
function respellKeepOctave(note, target) {
    const nm = /^([A-G])([#b]*)(-?\d+)$/.exec(note);
    const tm = /^([A-G])([#b]*)(-?\d+)$/.exec(target);
    if (!nm || !tm) return note;
    const SEMIS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    let noteAcc = 0;
    (nm[2] || '').split('').forEach(c => noteAcc += (c === '#' ? 1 : -1));
    let targetAcc = 0;
    (tm[2] || '').split('').forEach(c => targetAcc += (c === '#' ? 1 : -1));
    const noteMidi = (parseInt(nm[3], 10) + 1) * 12 + SEMIS[nm[1]] + noteAcc;
    const targetOctave = Math.round((noteMidi - SEMIS[tm[1]] - targetAcc) / 12) - 1;
    return tm[1] + tm[2] + targetOctave;
}
// 将钢琴点击的音（等音）映射到题目和弦的正确拼写（保留点击的八度）
function spellBuildNote(note, q) {
    const pc = triadPitchClass(note);
    if (pc == null) return note;
    const list = q.chordNotes || q.answerNotes;
    if (!list) return note;
    const target = list.find(cn => triadPitchClass(cn) === pc);
    return target ? respellKeepOctave(note, target) : note;
}
function generateTriadListenQuestion() {
    const q = TRIAD_QUALITIES[Math.floor(Math.random() * TRIAD_QUALITIES.length)];
    const notes = triadBuildNotes(triadRandomRoot(), q.id);
    return { type: 'listen', quality: q.id, qualityLabel: q.label, notes, answer: q.id };
}
function generateTriadBuildQuestion() {
    const q = TRIAD_QUALITIES[Math.floor(Math.random() * TRIAD_QUALITIES.length)];
    const root = triadRandomBuildRoot();
    // 按和弦性质正确拼写三音、五音（等音处理），如 G#大三和弦 → G#4-B#4-D#5
    const third = spellChordTone(root, q.semis[1], 2);
    const fifth = spellChordTone(root, q.semis[2], 4);
    const notes = [root, third, fifth];
    const giveRoot = Math.random() < 0.5;
    return {
        type: 'build', quality: q.id, qualityLabel: q.label,
        givenNote: giveRoot ? notes[0] : notes[2],
        givenWhich: giveRoot ? '根音' : '五音',
        chordNotes: notes
    };
}
function setPracticeTip(html) {
    const tip = document.querySelector('#practice-content .practice-tip');
    if (tip) tip.innerHTML = html;
}
// 显示/隐藏练习记分板（题型选择页隐藏，具体练习页显示）
function setStatsPanelVisible(visible) {
    const el = document.querySelector('#practice-content .stats-panel-mini');
    if (el) el.style.display = visible ? 'flex' : 'none';
}
function renderTypeButtons(buttons) {
    const wrap = document.getElementById('practice-type-btns');
    if (!wrap) return;
    wrap.innerHTML = buttons.map(b => `
        <button class="btn ${b.cls} triad-type-btn" data-type="${b.type}">${b.label}</button>
        <div class="triad-score-line" id="triad-scores-${b.type}">暂无成绩</div>
    `).join('');
}
function showTriadTypeSelector() {
    appState.currentMode = 'triad-select';
    appState.triadSession = null;
    appState.fourPartSession = null;
    setPracticeTip('<i class="fas fa-lightbulb"></i> 请选择练习题型（听辨 / 构建三和弦）');
    document.getElementById('learn-content').style.display = 'none';
    document.getElementById('homework-content').style.display = 'none';
    document.getElementById('practice-content').style.display = 'block';
    document.getElementById('triad-type-selector').style.display = 'block';
    document.getElementById('practice-question').style.display = 'none';
    document.getElementById('triad-options').style.display = 'none';
    document.getElementById('triad-build-staff').style.display = 'none';
    document.getElementById('fourpart-voice').style.display = 'none';
    document.getElementById('fourpart-staff').style.display = 'none';
    document.getElementById('play-controls').style.display = 'none';
    document.getElementById('practice-feedback').innerHTML = '';
    document.getElementById('practice-feedback').className = 'feedback-message';
    renderTypeButtons([
        { type: 'listen', cls: 'primary', label: '🎧 听辨三和弦' },
        { type: 'build', cls: 'success', label: '🎹 构建三和弦' }
    ]);
    renderTriadScores();
    updateBackBtnLabel();
    setStatsPanelVisible(false);
}
function startTriadPractice(type) {
    if (type === 'listen') { startTriadListenPractice(); return; }
    appState.currentMode = 'triad-build';
    const questions = Array(10).fill().map(() => generateTriadBuildQuestion());
    appState.triadSession = { type: 'build', questions, currentIndex: 0, currentQuestion: questions[0], correct: 0, wrong: 0, score: 0, selectedOption: null, selectedNotes: [] };
    document.getElementById('triad-type-selector').style.display = 'none';
    document.getElementById('practice-question').style.display = 'block';
    document.getElementById('fourpart-voice').style.display = 'none';
    document.getElementById('fourpart-staff').style.display = 'none';
    document.getElementById('play-controls').style.display = 'flex';
    document.getElementById('submit-practice-btn').style.display = 'block';
    document.getElementById('next-practice-btn').style.display = 'none';
    updateBackBtnLabel();
    setStatsPanelVisible(true);
    loadTriadQuestion();
}
function startTriadListenPractice() {
    appState.currentMode = 'triad-listen';
    appState.triadSession = { type: 'listen', currentChord: null, selectedOption: null, correct: 0, wrong: 0, score: 0, totalQuestions: 0 };
    document.getElementById('triad-type-selector').style.display = 'none';
    document.getElementById('practice-question').style.display = 'block';
    document.getElementById('practice-question').innerHTML = '<div>🎧 听辨：请点击「随机播放」，然后选择三和弦性质</div>';
    document.getElementById('triad-options').innerHTML = '<button class="triad-option-btn" data-quality="major">大三和弦</button><button class="triad-option-btn" data-quality="minor">小三和弦</button><button class="triad-option-btn" data-quality="dim">减三和弦</button><button class="triad-option-btn" data-quality="aug">增三和弦</button>';
    document.getElementById('triad-options').style.display = 'flex';
    document.getElementById('triad-build-staff').style.display = 'none';
    document.getElementById('fourpart-voice').style.display = 'none';
    document.getElementById('fourpart-staff').style.display = 'none';
    document.getElementById('play-controls').style.display = 'flex';
    setPracticeTip('<i class="fas fa-headphones"></i> 点击「随机播放」听和弦，选择性质后提交');
    document.getElementById('play-question-btn').style.display = 'inline-block';
    document.getElementById('triad-random-btn').style.display = 'inline-block';
    document.getElementById('triad-random-btn').textContent = '🎲 随机播放';
    document.getElementById('triad-melodic-btn').style.display = 'inline-block';
    document.getElementById('show-answer-btn').style.display = 'inline-block';
    document.getElementById('submit-practice-btn').style.display = 'block';
    document.getElementById('next-practice-btn').style.display = 'none';
    document.getElementById('reset-practice-btn').style.display = 'none';
    document.querySelectorAll('.triad-option-btn').forEach(b => b.classList.remove('active'));
    updateTriadListenStats();
    document.getElementById('practice-feedback').innerHTML = '';
    document.getElementById('practice-feedback').className = 'feedback-message';
    updateBackBtnLabel();
    setStatsPanelVisible(true);
}
function updateTriadListenStats() {
    const s = appState.triadSession;
    if (!s || s.type !== 'listen') return;
    document.getElementById('practice-correct').textContent = s.correct;
    document.getElementById('practice-wrong').textContent = s.wrong;
    document.getElementById('practice-score').textContent = s.score;
    document.getElementById('practice-progress').textContent = s.totalQuestions + '/10';
}
function loadTriadQuestion() {
    const s = appState.triadSession;
    if (!s || s.type !== 'build' || !s.questions) return;
    if (s.currentIndex >= s.questions.length) return completeTriadPractice();
    s.currentQuestion = s.questions[s.currentIndex];
    const q = s.currentQuestion;
    s.selectedNotes = [];
    document.getElementById('practice-correct').textContent = s.correct;
    document.getElementById('practice-wrong').textContent = s.wrong;
    document.getElementById('practice-score').textContent = s.score;
    document.getElementById('practice-progress').textContent = (s.currentIndex + 1) + '/10';
    document.getElementById('submit-practice-btn').style.display = 'block';
    document.getElementById('next-practice-btn').style.display = 'none';
    document.getElementById('reset-practice-btn').style.display = 'inline-block';
    document.getElementById('practice-feedback').innerHTML = '';
    document.getElementById('practice-feedback').className = 'feedback-message';
    document.getElementById('triad-random-btn').style.display = 'none';
    document.getElementById('triad-melodic-btn').style.display = 'none';
    document.getElementById('show-answer-btn').style.display = 'none';
    setPracticeTip('<i class="fas fa-lightbulb"></i> 请点击钢琴琴键补全另外两个音');
    document.getElementById('practice-question').innerHTML = '<div>🎹 构建' + q.qualityLabel + '：已给出' + q.givenWhich + ' <b>' + q.givenNote + '</b>，请点击钢琴再选 2 个音完成和弦</div>';
    document.getElementById('triad-options').style.display = 'none';
    document.getElementById('triad-build-staff').style.display = 'block';
    document.getElementById('play-question-btn').style.display = 'none';
    renderTriadBuildStaff();
}
function selectTriadOption(qualityId) {
    if (!appState.triadSession) return;
    appState.triadSession.selectedOption = qualityId;
    document.querySelectorAll('.triad-option-btn').forEach(b => b.classList.toggle('active', b.dataset.quality === qualityId));
}
// 重新作答：保留当前题目，仅清空已选答案，让用户重新输入
function resetTriadAnswer() {
    const s = appState.triadSession;
    if (!s) return;
    document.getElementById('practice-feedback').innerHTML = '';
    document.getElementById('practice-feedback').className = 'feedback-message';
    if (s.type === 'listen') {
        s.selectedOption = null;
        document.querySelectorAll('.triad-option-btn').forEach(b => b.classList.remove('active'));
    } else {
        s.selectedNotes = [];
        renderTriadBuildStaff();
    }
}
function triadListenRandomPlay() {
    const s = appState.triadSession;
    if (!s || s.type !== 'listen') return;
    s.currentChord = generateTriadListenQuestion();
    s.selectedOption = null;
    document.querySelectorAll('.triad-option-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('practice-feedback').innerHTML = '';
    document.getElementById('practice-feedback').className = 'feedback-message';
    setPracticeTip('<i class="fas fa-headphones"></i> 请听辨音响，选择三和弦性质');
    playChord(s.currentChord.notes);
}
function triadListenRepeatPlay() {
    const s = appState.triadSession;
    if (!s || !s.currentChord) { document.getElementById('practice-feedback').innerHTML = '请先点击「随机播放」出题'; return; }
    playChord(s.currentChord.notes);
}
function triadListenMelodicPlay() {
    const s = appState.triadSession;
    if (!s || !s.currentChord) { document.getElementById('practice-feedback').innerHTML = '请先点击「随机播放」出题'; return; }
    s.currentChord.notes.forEach((n, i) => setTimeout(() => playSingleNote(n), i * 500));
}
function triadListenShowAnswer() {
    const s = appState.triadSession;
    if (!s || !s.currentChord) { document.getElementById('practice-feedback').innerHTML = '请先点击「随机播放」出题'; return; }
    document.querySelectorAll('.triad-option-btn').forEach(b => b.classList.remove('active'));
    const correctBtn = document.querySelector('.triad-option-btn[data-quality="' + s.currentChord.answer + '"]');
    if (correctBtn) correctBtn.classList.add('active');
    playChord(s.currentChord.notes);
    document.getElementById('practice-feedback').innerHTML = '正确答案是：' + s.currentChord.qualityLabel;
    document.getElementById('practice-feedback').className = 'feedback-message';
}
function renderTriadBuildStaff() {
    const container = document.getElementById('triad-build-staff');
    const s = appState.triadSession;
    if (!container || !s || !s.currentQuestion || s.currentQuestion.type !== 'build') return;
    const q = s.currentQuestion;
    const all = [q.givenNote, ...s.selectedNotes].filter(Boolean);
    if (!vexFlowReady()) return;
    const VF = Vex.Flow;
    // 记录练习内容滚动位置，渲染后恢复，避免 SVG 重建导致页面“跳动”
    const pc = document.getElementById('practice-content');
    const savedScrollTop = pc ? pc.scrollTop : 0;
    container.innerHTML = '';
    const w = Math.max(container.clientWidth - 12, 200);
    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(w, 200);
    const ctx = renderer.getContext();
    // 将五线谱于画布垂直居中（谱表高 40px，画布 200px → 谱表顶部 y=80），上下留白充足
    const stave = new VF.Stave(10, 40, w - 24);
    stave.addClef('treble').setContext(ctx).draw();
    if (all.length) {
        const keys = all.map(toVexKey).filter(Boolean);
        const note = new VF.StaveNote({ keys, duration: 'w' });
        addVexAccidentals(note, keys);
        const voice = new VF.Voice({ num_beats: 4, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
        voice.addTickables([note]);
        const justify = stave.getNoteEndX() - stave.getNoteStartX() - 10;
        new VF.Formatter().joinVoices([voice]).format([voice], justify);
        voice.draw(ctx, stave);
    }
    if (pc) pc.scrollTop = savedScrollTop;
}
function checkTriadBuild(q, selected) {
    const pcs = [q.givenNote, ...selected].map(triadPitchClass);
    const expected = q.chordNotes.map(triadPitchClass);
    const u1 = [...new Set(pcs)].sort((a, b) => a - b);
    const u2 = [...new Set(expected)].sort((a, b) => a - b);
    return u1.length === 3 && u2.length === u1.length && u1.every((v, i) => v === u2[i]);
}
function submitTriadAnswer() {
    const s = appState.triadSession;
    if (!s) return;
    if (s.type === 'listen') submitTriadListenAnswer();
    else submitTriadBuildAnswer();
}
function submitTriadListenAnswer() {
    const s = appState.triadSession;
    if (!s.currentChord) { document.getElementById('practice-feedback').innerHTML = '请先点击「随机播放」出题'; return; }
    if (!s.selectedOption) { document.getElementById('practice-feedback').innerHTML = '请先选择一个和弦性质'; return; }
    const correct = s.selectedOption === s.currentChord.answer;
    if (correct) { s.correct++; s.score += 10; }
    else { s.wrong++; }
    s.totalQuestions++;
    updateTriadListenStats();
    document.getElementById('practice-feedback').innerHTML = correct ? '✅ 正确！+10分' : ('❌ 错误！正确答案是 ' + s.currentChord.qualityLabel);
    document.getElementById('practice-feedback').className = 'feedback-message ' + (correct ? 'correct' : 'wrong');
    if (s.totalQuestions >= 10) {
        setTimeout(() => completeTriadPractice(), 1200);
    } else {
        setPracticeTip('<i class="fas fa-headphones"></i> 请点击「随机播放」继续下一题');
    }
}
function submitTriadBuildAnswer() {
    const s = appState.triadSession;
    const q = s.currentQuestion;
    if (!q) return;
    let correct = false, feedback = '';
    if (s.selectedNotes.length < 2) { document.getElementById('practice-feedback').innerHTML = '请点击钢琴选择 2 个音'; return; }
    correct = checkTriadBuild(q, s.selectedNotes);
    feedback = correct ? '✅ 正确！' : ('❌ 错误！正确答案是 ' + q.chordNotes.join('、'));
    if (correct) { s.correct++; s.score += 10; }
    else { s.wrong++; }
    document.getElementById('practice-correct').textContent = s.correct;
    document.getElementById('practice-wrong').textContent = s.wrong;
    document.getElementById('practice-score').textContent = s.score;
    document.getElementById('practice-feedback').innerHTML = feedback;
    document.getElementById('practice-feedback').className = 'feedback-message ' + (correct ? 'correct' : 'wrong');
    document.getElementById('submit-practice-btn').style.display = 'none';
    if (s.currentIndex >= s.questions.length - 1) {
        // 最后一题：答完自动完成并保存成绩（延迟，让用户先看到反馈）
        setTimeout(() => completeTriadPractice(), 1200);
    } else {
        document.getElementById('next-practice-btn').style.display = 'block';
    }
}
function completeTriadPractice() {
    const s = appState.triadSession;
    const passed = s.correct >= 7;
    recordTriadScore(s.type, s.correct);
    // 答完不自动退出：保留当前练习界面，让用户先导出结果，再点「返回上层」
    document.getElementById('practice-question').style.display = 'none';
    document.getElementById('triad-options').style.display = 'none';
    document.getElementById('triad-build-staff').style.display = 'none';
    // 保留「导出」按钮：隐藏答题相关按钮，让用户答完后仍可导出结果
    document.getElementById('play-controls').style.display = 'flex';
    ['play-question-btn', 'triad-random-btn', 'triad-melodic-btn', 'submit-practice-btn', 'show-answer-btn', 'next-practice-btn', 'reset-practice-btn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const emoji = passed ? '🎉' : '⚠️';
    document.getElementById('practice-feedback').innerHTML = emoji + (passed ? ' 闯关成功！' : ' 未通过（需答对 7 题以上）') + ' 本次答对 ' + s.correct + '/10 题。可点「⬇ 导出」保存结果，再点「返回上层」退出。';
    document.getElementById('practice-feedback').className = 'feedback-message ' + (passed ? 'correct' : 'wrong');
    renderTriadScores();
}
// 各练习题型每题满分（10 题，每题 10 分 = 100）
const PRACTICE_PER_QUESTION = { listen: 10, build: 10, arrange: 10, upper: 10, fourpart: 10 };
// 练习得分：各练习题型（百分制取最高）的平均值
function computePracticeScore(prog) {
    const scores = [];
    const s = prog.scores || {};
    for (const type in PRACTICE_PER_QUESTION) {
        const arr = s[type] || [];
        if (arr.length) scores.push(Math.max(...arr) * PRACTICE_PER_QUESTION[type]);
    }
    return scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
}
// 习题得分：各习题小题（百分制取最高）的平均值（兼容旧数组数据：取最高）
function computeHomeworkScore(prog) {
    const hw = (prog.scores || {}).homework;
    if (!hw) return 0;
    if (Array.isArray(hw)) {
        const arr = hw.filter(v => typeof v === 'number');
        return arr.length ? Math.round(Math.max(...arr)) : 0;
    }
    const values = Object.values(hw).filter(v => typeof v === 'number' && !isNaN(v));
    return values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
}
// 章节掌握度 = 教学观看 10% + 练习 40% + 习题 50%
function computeChapterMastery(chapterId) {
    const prog = appState.chapterProgress[chapterId];
    if (!prog) return 0;
    const teaching = prog.teachingWatched || 0;
    const practice = computePracticeScore(prog);
    const homework = computeHomeworkScore(prog);
    // 无习题章节：习题 50% 权重并入练习（避免习题空占权重拉低掌握度）
    const content = chapterContent[chapterId];
    const hasExercises = !!(content && content.exercises && content.exercises.length);
    if (hasExercises) {
        return Math.round(teaching * 0.1 + practice * 0.4 + homework * 0.5);
    }
    return Math.round(teaching * 0.1 + practice * 0.9);
}
// 刷新章节掌握度与通关状态：掌握度 ≥ 70% 视为通关
function refreshChapterMastery(chapterId) {
    const prog = appState.chapterProgress[chapterId];
    if (!prog) return;
    prog.mastery = computeChapterMastery(chapterId);
    prog.completed = prog.mastery >= 70;
}
function recordTriadScore(type, correct) {
    let prog = appState.chapterProgress[1];
    if (!prog) prog = appState.chapterProgress[1] = { unlocked: true, completed: false, mastery: 0 };
    if (!prog.scores) prog.scores = { listen: [], build: [] };
    prog.scores[type] = prog.scores[type] || [];
    prog.scores[type].push(correct);
    prog.scores[type].sort((a, b) => b - a);
    prog.scores[type] = prog.scores[type].slice(0, 5);
    refreshChapterMastery(1);
    saveProgress();
}
function renderTriadScores() {
    const prog = appState.chapterProgress[1];
    const scores = (prog && prog.scores) ? prog.scores : { listen: [], build: [] };
    ['listen', 'build'].forEach(type => {
        const el = document.getElementById('triad-scores-' + type);
        if (!el) return;
        const arr = scores[type] || [];
        const best = arr.length ? Math.max(...arr) : null;
        el.textContent = best == null ? '未练习' : (best >= 7 ? '✅ 已通关（' + best + '/10）' : '❌ 未通关（' + best + '/10）');
    });
}

// ==================== 四部和声排列练习（第 2 章） ====================
function shiftOctave(note, delta) {
    const m = /^([A-G])([#b]*)(-?\d+)$/.exec(note);
    if (!m) return note;
    return m[1] + m[2] + (parseInt(m[3], 10) + delta);
}
function noteLetter(note) {
    const m = /^([A-G][#b]*)/.exec(note);
    return m ? m[1] : note;
}
// 生成三和弦的四部和声（密集/开放 × 根音/三音/五音旋律位置），返回 { S, A, T, B }
// melodyPos: 'root'（根音旋律位置）| 'third'（三音旋律位置）| 'fifth'（五音旋律位置）
function buildFourPartVoicing(rootNote, qualityId, isClose, melodyPos) {
    const q = TRIAD_QUALITIES.find(t => t.id === qualityId);
    const root = rootNote;
    const third = spellChordTone(root, q.semis[1], 2);
    const fifth = spellChordTone(root, q.semis[2], 4);
    const rootUp = shiftOctave(root, 1);
    const thirdUp = shiftOctave(third, 1);
    const thirdDown = shiftOctave(third, -1);
    const fifthDown = shiftOctave(fifth, -1);
    const B = shiftOctave(root, -1); // 低音重复根音
    const pos = melodyPos || 'fifth';
    if (isClose) {
        if (pos === 'root') return { S: rootUp, A: fifth, T: third, B: B };
        if (pos === 'third') return { S: thirdUp, A: rootUp, T: fifth, B: B };
        return { S: fifth, A: third, T: root, B: B };
    }
    if (pos === 'root') return { S: rootUp, A: third, T: fifthDown, B: B };
    if (pos === 'third') return { S: thirdUp, A: fifth, T: root, B: B };
    return { S: fifth, A: root, T: thirdDown, B: B };
}
function randomMelodyPos() {
    return ['root', 'third', 'fifth'][Math.floor(Math.random() * 3)];
}
function melodyPosLabel(pos) {
    return { root: '根音旋律位置', third: '三音旋律位置', fifth: '五音旋律位置' }[pos] || '五音旋律位置';
}
function generateArrangeQuestion() {
    const q = TRIAD_QUALITIES[Math.floor(Math.random() * TRIAD_QUALITIES.length)];
    const root = triadRandomBuildRoot();
    const isClose = Math.random() < 0.5;
    const v = buildFourPartVoicing(root, q.id, isClose, randomMelodyPos());
    return { type: 'arrange', qualityLabel: q.label, rootName: root, upperNotes: [v.S, v.A, v.T], answer: isClose ? 'close' : 'open' };
}
function generateUpperQuestion() {
    const q = TRIAD_QUALITIES[Math.floor(Math.random() * TRIAD_QUALITIES.length)];
    const root = triadRandomBuildRoot();
    const isClose = Math.random() < 0.5;
    const v = buildFourPartVoicing(root, q.id, isClose, randomMelodyPos());
    return {
        type: 'upper',
        qualityLabel: q.label,
        rootName: root,
        melodyNote: v.S,
        answerNotes: [v.S, v.A, v.T],
        positionLabel: isClose ? '密集排列' : '开放排列',
        topDown: Math.random() < 0.5
    };
}
function generateFourPartQuestion() {
    const q = TRIAD_QUALITIES[Math.floor(Math.random() * TRIAD_QUALITIES.length)];
    const root = fourPartRandomRoot();
    const isClose = Math.random() < 0.5;
    const melodyPos = randomMelodyPos();
    const v = buildFourPartVoicing(root, q.id, isClose, melodyPos);
    return {
        type: 'fourpart',
        qualityLabel: q.label,
        rootName: root,
        positionLabel: isClose ? '密集排列' : '开放排列',
        melodyLabel: melodyPosLabel(melodyPos),
        answer: { S: v.S, A: v.A, T: v.T, B: v.B }
    };
}
function showFourPartTypeSelector() {
    appState.currentMode = 'fourpart-select';
    appState.triadSession = null;
    appState.fourPartSession = null;
    setPracticeTip('<i class="fas fa-lightbulb"></i> 请选择练习题型');
    document.getElementById('learn-content').style.display = 'none';
    document.getElementById('homework-content').style.display = 'none';
    document.getElementById('practice-content').style.display = 'block';
    document.getElementById('triad-type-selector').style.display = 'block';
    document.getElementById('practice-question').style.display = 'none';
    document.getElementById('triad-options').style.display = 'none';
    document.getElementById('triad-build-staff').style.display = 'none';
    document.getElementById('fourpart-voice').style.display = 'none';
    document.getElementById('fourpart-staff').style.display = 'none';
    document.getElementById('play-controls').style.display = 'none';
    document.getElementById('practice-feedback').innerHTML = '';
    document.getElementById('practice-feedback').className = 'feedback-message';
    renderTypeButtons([
        { type: 'arrange', cls: 'primary', label: '📋 判断排列法' },
        { type: 'upper', cls: 'success', label: '🎹 构建上方三声部' },
        { type: 'fourpart', cls: 'warning', label: '🎼 四部和声排列' }
    ]);
    renderFourPartScores();
    updateBackBtnLabel();
    setStatsPanelVisible(false);
}
function startFourPartPractice(type) {
    const gen = type === 'arrange' ? generateArrangeQuestion : (type === 'upper' ? generateUpperQuestion : generateFourPartQuestion);
    const questions = Array(10).fill().map(() => gen());
    appState.fourPartSession = { type, questions, currentIndex: 0, currentQuestion: questions[0], correct: 0, wrong: 0, score: 0, totalQuestions: 0, selectedOption: null, selectedNotes: [], voices: { S: null, A: null, T: null, B: null }, currentVoice: 'S' };
    appState.currentMode = type === 'arrange' ? 'fourpart-arrange' : (type === 'upper' ? 'fourpart-upper' : 'fourpart-build');
    document.getElementById('triad-type-selector').style.display = 'none';
    document.getElementById('practice-question').style.display = 'block';
    document.getElementById('play-controls').style.display = 'flex';
    document.getElementById('submit-practice-btn').style.display = 'block';
    document.getElementById('next-practice-btn').style.display = 'none';
    updateBackBtnLabel();
    setStatsPanelVisible(true);
    loadFourPartQuestion();
}
function loadFourPartQuestion() {
    const s = appState.fourPartSession;
    if (!s || s.currentIndex >= s.questions.length) return completeFourPartPractice();
    s.currentQuestion = s.questions[s.currentIndex];
    s.selectedOption = null;
    s.selectedNotes = [];
    s.voices = { S: null, A: null, T: null, B: null };
    s.currentVoice = 'S';
    document.getElementById('practice-correct').textContent = s.correct;
    document.getElementById('practice-wrong').textContent = s.wrong;
    document.getElementById('practice-score').textContent = s.score;
    document.getElementById('practice-progress').textContent = (s.currentIndex + 1) + '/10';
    document.getElementById('submit-practice-btn').style.display = 'block';
    document.getElementById('next-practice-btn').style.display = 'none';
    document.getElementById('practice-feedback').innerHTML = '';
    document.getElementById('practice-feedback').className = 'feedback-message';
    document.getElementById('triad-options').style.display = 'none';
    document.getElementById('triad-build-staff').style.display = 'none';
    document.getElementById('fourpart-voice').style.display = 'none';
    document.getElementById('fourpart-staff').style.display = 'none';
    document.getElementById('play-question-btn').style.display = 'none';
    document.getElementById('triad-random-btn').style.display = 'none';
    document.getElementById('triad-melodic-btn').style.display = 'none';
    document.getElementById('show-answer-btn').style.display = 'none';
    document.getElementById('reset-practice-btn').style.display = 'inline-block';
    const q = s.currentQuestion;
    if (q.type === 'arrange') {
        setPracticeTip('<i class="fas fa-lightbulb"></i> 请判断和弦排列法');
        document.getElementById('practice-question').innerHTML = '<div>📋 上方三声部的音高分别为 <b>' + q.upperNotes.join('、') + '</b>，此时的和弦排列法为：</div>';
        document.getElementById('triad-options').style.display = 'flex';
        document.getElementById('triad-options').innerHTML = '<button class="triad-option-btn" data-arrange="close">密集排列</button><button class="triad-option-btn" data-arrange="open">开放排列</button>';
        document.getElementById('play-question-btn').style.display = 'inline-block';
        document.getElementById('play-question-btn').textContent = '▶ 播放题目';
        setTimeout(() => playChord(q.upperNotes), 400);
    } else if (q.type === 'upper') {
        setPracticeTip('<i class="fas fa-lightbulb"></i> 请点击钢琴依次输入上方三个声部');
        const direction = q.topDown ? '从高到低' : '从低到高';
        document.getElementById('practice-question').innerHTML = '<div>🎹 请' + direction + '依次点击 <b>' + noteLetter(q.rootName) + q.qualityLabel + '</b> 的上方三个声部（共 3 个音）<br>旋律位置（最高音）：<b>' + q.melodyNote + '</b>　排列法：<b>' + q.positionLabel + '</b></div>';
        document.getElementById('triad-build-staff').style.display = 'block';
        renderUpperPracticeStaff();
    } else {
        setPracticeTip('<i class="fas fa-lightbulb"></i> 请选择声部后点击钢琴输入该声部的音');
        document.getElementById('practice-question').innerHTML = '<div>🎼 请写出 <b>' + noteLetter(q.rootName) + q.qualityLabel + '</b> 的' + q.positionLabel + '（' + q.melodyLabel + '，四个声部）</div>';
        document.getElementById('fourpart-voice').style.display = 'block';
        document.getElementById('fourpart-staff').style.display = 'block';
        document.querySelectorAll('#fourpart-voice .voice-btn').forEach(b => b.classList.toggle('active', b.dataset.voice === 'S'));
        renderFourPartPracticeStaff();
    }
}
function selectArrangeOption(opt) {
    if (!appState.fourPartSession) return;
    appState.fourPartSession.selectedOption = opt;
    document.querySelectorAll('#triad-options .triad-option-btn').forEach(b => b.classList.toggle('active', b.dataset.arrange === opt));
}
function selectFourPartVoice(voice) {
    if (!appState.fourPartSession) return;
    appState.fourPartSession.currentVoice = voice;
    document.querySelectorAll('#fourpart-voice .voice-btn').forEach(b => b.classList.toggle('active', b.dataset.voice === voice));
}
function renderUpperPracticeStaff() {
    const container = document.getElementById('triad-build-staff');
    const s = appState.fourPartSession;
    if (!container || !s || !s.currentQuestion || s.currentQuestion.type !== 'upper') return;
    if (!vexFlowReady()) return;
    const VF = Vex.Flow;
    // 记录练习内容滚动位置，渲染后恢复，避免 SVG 重建导致页面“跳动”
    const pc = document.getElementById('practice-content');
    const savedScrollTop = pc ? pc.scrollTop : 0;
    container.innerHTML = '';
    const w = Math.max(container.clientWidth - 12, 200);
    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(w, 200);
    const ctx = renderer.getContext();
    const stave = new VF.Stave(10, 40, w - 24);
    stave.addClef('treble').setContext(ctx).draw();
    const keys = s.selectedNotes.map(toVexKey).filter(Boolean);
    if (keys.length) {
        const note = new VF.StaveNote({ keys, duration: 'w' });
        addVexAccidentals(note, keys);
        const voice = new VF.Voice({ num_beats: 4, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
        voice.addTickables([note]);
        const justify = stave.getNoteEndX() - stave.getNoteStartX() - 10;
        new VF.Formatter().joinVoices([voice]).format([voice], justify);
        voice.draw(ctx, stave);
    }
    if (pc) pc.scrollTop = savedScrollTop;
}
function renderFourPartPracticeStaff() {
    const container = document.getElementById('fourpart-staff');
    const s = appState.fourPartSession;
    if (!container || !s || !s.currentQuestion || s.currentQuestion.type !== 'fourpart') return;
    if (!vexFlowReady()) return;
    const VF = Vex.Flow;
    // 记录练习内容滚动位置，渲染后恢复，避免 SVG 重建导致页面“跳动”
    const pc = document.getElementById('practice-content');
    const savedScrollTop = pc ? pc.scrollTop : 0;
    container.innerHTML = '';
    const w = Math.max(container.clientWidth - 12, 200);
    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(w, 250);
    const ctx = renderer.getContext();
    const treble = new VF.Stave(20, 20, w - 20);
    const bass = new VF.Stave(20, 120, w - 20);
    treble.addClef('treble'); bass.addClef('bass');
    treble.setContext(ctx).draw(); bass.setContext(ctx).draw();
    new VF.StaveConnector(treble, bass).setType('brace').setContext(ctx).draw();
    new VF.StaveConnector(treble, bass).setType('singleLeft').setContext(ctx).draw();
    new VF.StaveConnector(treble, bass).setType('singleRight').setContext(ctx).draw();
    function makeNote(key, clef, dir) {
        const n = new VF.StaveNote({ keys: [key], duration: 'w', clef: clef });
        n.setStemDirection(dir);
        addVexAccidentals(n, [key]);
        return n;
    }
    function makeVoice(list) {
        const v = new VF.Voice({ num_beats: 4, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
        list.forEach(t => v.addTickable(t));
        return v;
    }
    const vo = s.voices || {};
    const sNotes = vo.S ? [makeNote(toVexKey(vo.S), 'treble', VF.Stem.UP)] : [];
    const aNotes = vo.A ? [makeNote(toVexKey(vo.A), 'treble', VF.Stem.DOWN)] : [];
    const tNotes = vo.T ? [makeNote(toVexKey(vo.T), 'bass', VF.Stem.UP)] : [];
    const bNotes = vo.B ? [makeNote(toVexKey(vo.B), 'bass', VF.Stem.DOWN)] : [];
    const voiceS = makeVoice(sNotes), voiceA = makeVoice(aNotes);
    const voiceT = makeVoice(tNotes), voiceB = makeVoice(bNotes);
    const jT = treble.getNoteEndX() - treble.getNoteStartX() - 10;
    const jB = bass.getNoteEndX() - bass.getNoteStartX() - 10;
    if (sNotes.length || aNotes.length) new VF.Formatter().joinVoices([voiceS, voiceA]).format([voiceS, voiceA], jT);
    if (tNotes.length || bNotes.length) new VF.Formatter().joinVoices([voiceT, voiceB]).format([voiceT, voiceB], jB);
    voiceS.draw(ctx, treble); voiceA.draw(ctx, treble);
    voiceT.draw(ctx, bass); voiceB.draw(ctx, bass);
    if (pc) pc.scrollTop = savedScrollTop;
}
function checkUpperAnswer(q, selected) {
    const pcs = selected.map(triadPitchClass).sort((a, b) => a - b);
    const expected = q.answerNotes.map(triadPitchClass).sort((a, b) => a - b);
    return pcs.length === 3 && pcs.every((v, i) => v === expected[i]);
}
function checkFourPartAnswer(q, voices) {
    for (const v of ['S', 'A', 'T', 'B']) {
        if (!voices[v]) return false;
        if (triadPitchClass(voices[v]) !== triadPitchClass(q.answer[v])) return false;
    }
    return true;
}
function submitFourPartAnswer() {
    const s = appState.fourPartSession;
    const q = s.currentQuestion;
    if (!q) return;
    let correct = false, feedback = '';
    if (q.type === 'arrange') {
        if (!s.selectedOption) { document.getElementById('practice-feedback').innerHTML = '请先选择一个答案'; return; }
        correct = s.selectedOption === q.answer;
        feedback = correct ? '✅ 正确！' : ('❌ 错误！正确答案是 ' + (q.answer === 'close' ? '密集排列' : '开放排列'));
    } else if (q.type === 'upper') {
        if (s.selectedNotes.length < 3) { document.getElementById('practice-feedback').innerHTML = '请点击钢琴选择 3 个音'; return; }
        correct = checkUpperAnswer(q, s.selectedNotes);
        feedback = correct ? '✅ 正确！' : ('❌ 错误！正确答案是 ' + q.answerNotes.join('、'));
    } else {
        if (Object.values(s.voices).some(v => !v)) { document.getElementById('practice-feedback').innerHTML = '请完成四个声部的输入'; return; }
        correct = checkFourPartAnswer(q, s.voices);
        feedback = correct ? '✅ 正确！' : ('❌ 错误！正确答案是 S:' + q.answer.S + ' A:' + q.answer.A + ' T:' + q.answer.T + ' B:' + q.answer.B);
    }
    if (correct) { s.correct++; s.score += 10; }
    else { s.wrong++; }
    s.totalQuestions++;
    document.getElementById('practice-correct').textContent = s.correct;
    document.getElementById('practice-wrong').textContent = s.wrong;
    document.getElementById('practice-score').textContent = s.score;
    document.getElementById('practice-feedback').innerHTML = feedback;
    document.getElementById('practice-feedback').className = 'feedback-message ' + (correct ? 'correct' : 'wrong');
    document.getElementById('submit-practice-btn').style.display = 'none';
    if (s.currentIndex >= s.questions.length - 1) {
        // 最后一题：答完自动完成并保存成绩（延迟，让用户先看到反馈）
        setTimeout(() => completeFourPartPractice(), 1200);
    } else {
        document.getElementById('next-practice-btn').style.display = 'block';
    }
}
function resetFourPartAnswer() {
    const s = appState.fourPartSession;
    if (!s) return;
    s.selectedOption = null;
    s.selectedNotes = [];
    s.voices = { S: null, A: null, T: null, B: null };
    s.currentVoice = 'S';
    document.getElementById('practice-feedback').innerHTML = '';
    document.getElementById('practice-feedback').className = 'feedback-message';
    if (s.currentQuestion.type === 'arrange') {
        document.querySelectorAll('#triad-options .triad-option-btn').forEach(b => b.classList.remove('active'));
    } else if (s.currentQuestion.type === 'upper') {
        renderUpperPracticeStaff();
    } else {
        document.querySelectorAll('#fourpart-voice .voice-btn').forEach(b => b.classList.toggle('active', b.dataset.voice === 'S'));
        renderFourPartPracticeStaff();
    }
}
function completeFourPartPractice() {
    const s = appState.fourPartSession;
    const passed = s.correct >= 7;
    recordFourPartScore(s.type, s.correct);
    // 答完不自动退出：保留当前练习界面，让用户先导出结果，再点「返回上层」
    document.getElementById('practice-question').style.display = 'none';
    document.getElementById('triad-options').style.display = 'none';
    document.getElementById('triad-build-staff').style.display = 'none';
    document.getElementById('fourpart-voice').style.display = 'none';
    document.getElementById('fourpart-staff').style.display = 'none';
    // 保留「导出」按钮：隐藏答题相关按钮，让用户答完后仍可导出结果
    document.getElementById('play-controls').style.display = 'flex';
    ['play-question-btn', 'triad-random-btn', 'triad-melodic-btn', 'submit-practice-btn', 'show-answer-btn', 'next-practice-btn', 'reset-practice-btn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    document.getElementById('practice-feedback').innerHTML = (passed ? '🎉 闯关成功！' : '⚠️ 未通过（需答对 7 题以上）') + ' 本次答对 ' + s.correct + '/10 题。可点「⬇ 导出」保存结果，再点「返回上层」退出。';
    document.getElementById('practice-feedback').className = 'feedback-message ' + (passed ? 'correct' : 'wrong');
    renderFourPartScores();
}
function recordFourPartScore(type, correct) {
    let prog = appState.chapterProgress[2];
    if (!prog) prog = appState.chapterProgress[2] = { unlocked: true, completed: false, mastery: 0 };
    if (!prog.scores) prog.scores = { arrange: [], upper: [], fourpart: [] };
    prog.scores[type] = prog.scores[type] || [];
    prog.scores[type].push(correct);
    prog.scores[type].sort((a, b) => b - a);
    prog.scores[type] = prog.scores[type].slice(0, 5);
    refreshChapterMastery(2);
    saveProgress();
}
function renderFourPartScores() {
    const prog = appState.chapterProgress[2];
    const scores = (prog && prog.scores) ? prog.scores : { arrange: [], upper: [], fourpart: [] };
    ['arrange', 'upper', 'fourpart'].forEach(type => {
        const el = document.getElementById('triad-scores-' + type);
        if (!el) return;
        const arr = scores[type] || [];
        const best = arr.length ? Math.max(...arr) : null;
        el.textContent = best == null ? '未练习' : (best >= 7 ? '✅ 已通关（' + best + '/10）' : '❌ 未通关（' + best + '/10）');
    });
}

// 更新练习页返回按钮文字：题型选择页显示「返回教学」，具体练习页显示「返回上层」
function updateBackBtnLabel() {
    const btn = document.getElementById('back-to-teach-btn');
    if (!btn) return;
    const mode = appState.currentMode;
    btn.innerHTML = '<i class="fas fa-arrow-left"></i> ' + ((mode === 'triad-select' || mode === 'fourpart-select') ? '返回教学' : '返回上层');
}
// 从具体练习页返回上一层的练习题型选择页
function backToPracticeTypeSelector() {
    const mode = appState.currentMode;
    if (mode === 'triad-listen' || mode === 'triad-build') showTriadTypeSelector();
    else if (mode === 'fourpart-arrange' || mode === 'fourpart-upper' || mode === 'fourpart-build') showFourPartTypeSelector();
    else backToTeaching(); // 无题型选择页的练习（如等级练习）直接返回教学
}
function backToTeaching() {
    appState.currentMode = 'learn';
    appState.triadSession = null;
    appState.fourPartSession = null;
    document.getElementById('practice-content').style.display = 'none';
    document.getElementById('homework-content').style.display = 'none';
    document.getElementById('learn-content').style.display = 'block';
    hwClearPlaybackCursor();
}

function openTextbookPractice(chapter) {
    appState.currentChapter = chapter;
    const practiceTitle = document.getElementById('chapter-practice-title');
    const practiceMeta = document.getElementById('chapter-practice-meta');
    if (practiceTitle) practiceTitle.textContent = chapter.title;
    if (practiceMeta) practiceMeta.textContent = chapter.practiceFocus;

    appState.staffNotes = [];
    renderBlankStaff();
    pageManager.switchToPage('chapter-practice-page');
}

function addStaffNote(x, y, label = '♪') {
    appState.staffNotes.push({ x, y, label });
    renderBlankStaff();
}

function clearStaffNotes() {
    appState.staffNotes = [];
    renderBlankStaff();
}

function renderBlankStaff() {
    const canvas = document.getElementById('blank-staff-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(rect.width, 320);
    const height = Math.max(rect.height, 180);
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const leftPadding = 18;
    const top = 30;
    const lineSpacing = 12;
    const lines = 5;

    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < lines; i++) {
        const y = top + i * lineSpacing;
        ctx.beginPath();
        ctx.moveTo(leftPadding, y);
        ctx.lineTo(width - 18, y);
        ctx.stroke();
    }

    ctx.strokeStyle = '#bdbdbd';
    ctx.beginPath();
    ctx.moveTo(leftPadding, 0);
    ctx.lineTo(leftPadding, height);
    ctx.stroke();

    ctx.fillStyle = '#5c5c5c';
    ctx.font = '12px sans-serif';
    ctx.fillText('空白五线谱练习', leftPadding + 8, 18);

    appState.staffNotes.forEach(note => {
        ctx.fillStyle = '#7b1fa2';
        ctx.beginPath();
        ctx.arc(note.x, note.y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#333';
        ctx.font = '11px sans-serif';
        ctx.fillText(note.label, note.x + 8, note.y - 8);
    });
}
// 音名（如 'C#4'）→ MIDI 编号（C4=60）
function noteToMidi(note) {
    const m = /^([A-G])([#b]*)(-?\d+)$/.exec(note);
    if (!m) return null;
    const SEMIS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    let acc = 0;
    (m[2] || '').split('').forEach(c => acc += (c === '#' ? 1 : -1));
    return (parseInt(m[3], 10) + 1) * 12 + SEMIS[m[1]] + acc;
}
// 将音移入小字一组（C4–B4，MIDI 60–71）：超界则整八度移位（转位无所谓）
function shiftIntoC4B4(note) {
    let n = note, guard = 0;
    while (guard++ < 4) {
        const midi = noteToMidi(n);
        if (midi == null) break;
        if (midi < 60) n = shiftOctave(n, 1);
        else if (midi > 71) n = shiftOctave(n, -1);
        else break;
    }
    return n;
}
function generateQuestionForLevel(level) {
    const keyRange = keyRanges[level];
    const randomKeyName = keyRange.keys[Math.floor(Math.random() * keyRange.keys.length)];
    const keyInfo = keys[randomKeyName];
    const chordTypes = keyInfo.mode === 'major' ? ['T', 'S', 'D'] : ['t', 's', 'D'];
    const randomChord = chordTypes[Math.floor(Math.random() * chordTypes.length)];
    const chordNote = keyInfo.chords[randomChord];
    const chordDisplay = randomChord === 'T' || randomChord === 't' ? '主和弦' : (randomChord === 'S' || randomChord === 's' ? '下属和弦' : '属和弦');
    // 和弦性质：大调全为大三和弦；和声小调中 t、s 为小三和弦、D 为大三和弦
    const isMajor = keyInfo.mode === 'major' || randomChord === 'D';
    const rootNote = chordNote + '4';
    const third = spellChordTone(rootNote, isMajor ? 4 : 3, 2);
    const fifth = spellChordTone(rootNote, 7, 4);
    // 三个答案音统一移入小字一组（C4–B4），原位/转位均可
    const answerNotes = [rootNote, third, fifth].filter(Boolean).map(shiftIntoC4B4);
    // 判分只看音级集合（忽略八度与转位）
    const answerPcs = answerNotes.map(triadPitchClass).filter(pc => pc != null).sort((a, b) => a - b);
    return { question: `在${keyInfo.name}中，请点击钢琴键盘上的${chordDisplay}的三个和弦音，小字一组范围内（C4-B4）`, answerPcs, answerNotes, keyName: keyInfo.name, chordDisplay, chordNotes: [rootNote, third, fifth].filter(Boolean) };
}
function getChordThird(root, oct) { const idx = allNotes.findIndex(n => n.note === root + oct); return idx >= 0 ? allNotes[idx + 4]?.note : null; }
function getChordFifth(root, oct) { const idx = allNotes.findIndex(n => n.note === root + oct); return idx >= 0 ? allNotes[idx + 7]?.note : null; }
function startPracticeMode() {
    if (!appState.userInfo.saved) { alert('请先保存学生信息'); return; }
    const questions = Array(20).fill().map(() => generateQuestionForLevel(appState.currentLevel));
    appState.levelSession = { level: appState.currentLevel, questions, currentIndex: 0, correct: 0, wrong: 0, score: 0, currentQuestion: questions[0], selectedNotes: [] };
    appState.triadSession = null;
    appState.currentMode = 'practice';
    document.getElementById('learn-content').style.display = 'none';
    document.getElementById('practice-content').style.display = 'block';
    updateBackBtnLabel();
    setStatsPanelVisible(true);
    loadPracticeQuestion();
}
function loadPracticeQuestion() {
    const session = appState.levelSession;
    if (session.currentIndex >= session.questions.length) return completeLevel();
    session.currentQuestion = session.questions[session.currentIndex];
    session.selectedNotes = [];
    // 复位三和弦练习的 UI 元素，确保普通题型正常显示
    setPracticeTip('<i class="fas fa-lightbulb"></i> 请根据题目要求，点击钢琴键盘上的正确音高');
    document.getElementById('triad-type-selector').style.display = 'none';
    document.getElementById('triad-options').style.display = 'none';
    document.getElementById('triad-build-staff').style.display = 'none';
    document.getElementById('triad-random-btn').style.display = 'none';
    document.getElementById('triad-melodic-btn').style.display = 'none';
    document.getElementById('show-answer-btn').style.display = 'none';
    document.getElementById('play-controls').style.display = 'flex';
    const q = session.currentQuestion;
    document.getElementById('practice-question').innerHTML = `<div>${q.question}</div><div style="margin-top:8px;font-size:0.85rem;">🎹 请点击琴键选择三个和弦音（小字一组 C4-B4）</div>`;
    document.getElementById('practice-correct').textContent = session.correct;
    document.getElementById('practice-wrong').textContent = session.wrong;
    document.getElementById('practice-score').textContent = session.score;
    document.getElementById('practice-progress').textContent = `${session.currentIndex + 1}/20`;
    document.getElementById('next-practice-btn').style.display = 'none';
    document.getElementById('submit-practice-btn').style.display = 'block';
    document.getElementById('practice-feedback').innerHTML = '';
    if (q.chordNotes) setTimeout(() => playChord(q.chordNotes), 500);
}
function submitPracticeAnswer() {
    const session = appState.levelSession;
    const q = session.currentQuestion;
    const selected = session.selectedNotes || [];
    if (selected.length < 3) { document.getElementById('practice-feedback').innerHTML = '请点击钢琴键盘选择三个和弦音（小字一组 C4-B4）！'; return; }
    // 判分：比较音级集合（忽略八度与转位，原位/转位均可）
    const selPcs = selected.map(triadPitchClass).filter(pc => pc != null).sort((a, b) => a - b);
    const isCorrect = selPcs.length === q.answerPcs.length && selPcs.every((pc, i) => pc === q.answerPcs[i]);
    if (isCorrect) { session.correct++; session.score += 5; document.getElementById('practice-feedback').innerHTML = `✅ 正确！正确答案是 ${q.answerNotes.join('、')}`; document.getElementById('practice-feedback').className = 'feedback-message correct'; }
    else { session.wrong++; document.getElementById('practice-feedback').innerHTML = `❌ 错误！您点击了 ${selected.join('、')}，正确答案是 ${q.answerNotes.join('、')}`; document.getElementById('practice-feedback').className = 'feedback-message wrong'; }
    document.getElementById('practice-correct').textContent = session.correct;
    document.getElementById('practice-wrong').textContent = session.wrong;
    document.getElementById('practice-score').textContent = session.score;
    document.getElementById('submit-practice-btn').style.display = 'none';
    document.getElementById('next-practice-btn').style.display = 'block';
}
function nextPracticeQuestion() { appState.levelSession.currentIndex++; loadPracticeQuestion(); }
function resetPractice() { if (confirm('重置练习？')) startPracticeMode(); }
function completeLevel() {
    const session = appState.levelSession;
    const accuracy = session.correct / 20 * 100;
    const passed = accuracy >= 75;
    keyRanges[appState.currentLevel].progress = { correct: session.correct, total: 20 };
    keyRanges[appState.currentLevel].completed = passed;
    if (passed && appState.currentLevel < 5) keyRanges[appState.currentLevel + 1].unlocked = true;
    saveProgress(); updateRangeLevelsUI();
    document.getElementById('level-score').textContent = session.score;
    document.getElementById('level-correct').textContent = session.correct;
    document.getElementById('level-percent').textContent = Math.floor(accuracy) + '%';
    const analysis = passed ? `<p>✅ 通过！正确率 ${Math.floor(accuracy)}%</p><p>得分 ${session.score}</p><p>${accuracy === 100 ? '🌟 满分！' : ''}${appState.currentLevel < 5 ? '🔓 下一等级已解锁' : ''}</p>` : `<p>⚠️ 未通过，正确率 ${Math.floor(accuracy)}% (需≥75%)</p><p>请重新挑战</p>`;
    document.getElementById('level-analysis').innerHTML = analysis;
    if (appState.currentCourse) {
        const c = appState.currentCourse;
        c.bestAccuracy = Math.max(c.bestAccuracy || 0, Math.floor(accuracy));
        if (passed) { c.passed75 = true; c.progress = Math.max(c.progress || 0, Math.floor(accuracy)); c.status = 'mastered'; }
        else if (c.status !== 'locked') c.status = 'learning';
        syncCourseUnlockChain(); saveProgress(); updateStats(); renderZhengSanHub();
    }
    pageManager.switchToPage('level-complete-page');
}
function nextLevel() { if (appState.currentLevel < 5) { appState.currentLevel++; pageManager.switchToPage('learn-page'); document.getElementById('learn-content').style.display = 'block'; document.getElementById('practice-content').style.display = 'none'; document.getElementById('homework-content').style.display = 'none'; appState.currentMode = 'learn'; setTimeout(() => { if (window.refreshPianoLayout) window.refreshPianoLayout(); }, 50); } else alert('恭喜完成所有等级！'); }
function retryLevel() { startPracticeMode(); }
function updateRangeLevelsUI() {
    document.querySelectorAll('.range-level').forEach((btn, idx) => { const lvl = idx + 1; if (!keyRanges[lvl].unlocked) btn.classList.add('locked'); else btn.classList.remove('locked'); if (lvl === appState.currentLevel) btn.classList.add('active'); else btn.classList.remove('active'); });
    const range = keyRanges[appState.currentLevel];
    const total = range.progress.total || 20, correct = range.progress.correct || 0, percent = total > 0 ? correct / total * 100 : 0;
    const fill = document.getElementById('range-progress-fill');
    const text = document.getElementById('range-progress-text');
    if (fill) fill.style.width = percent + '%';
    if (text) text.textContent = `${correct}/${total} (${Math.floor(percent)}%)`;
}
// ==================== 音频系统（Web Audio 钢琴音色，参考 APP_WebPiano） ====================
const NOTE_SEMIS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function initAudio() {
    if (audioCtx) {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { console.warn('当前环境不支持 Web Audio'); return; }
    audioCtx = new AC();
    appState.audioInitialized = true;
}

// 'C4' / 'C#4' / 'Bb4' -> 频率（Hz）
function freqOfNote(note) {
    if (!note) return null;
    const m = note.match(/^([A-G])([#b]?)(-?\d+)$/);
    if (!m) return null;
    const midi = (parseInt(m[3], 10) + 1) * 12 + NOTE_SEMIS[m[1]] + (m[2] === '#' ? 1 : (m[2] === 'b' ? -1 : 0));
    return 440 * Math.pow(2, (midi - 69) / 12);
}

// 钢琴音色（合成）：基频正弦 + 2次谐波三角 + 3/4次谐波正弦 + 击锤噪音
function playPianoNote(note, dur, volume) {
    initAudio();
    if (!audioCtx) return;
    const freq = freqOfNote(note);
    if (!freq) return;
    dur = dur || 1.2;
    volume = (volume != null ? volume : 1.0);
    const now = audioCtx.currentTime;
    const master = audioCtx.createGain();
    master.gain.value = volume;
    master.connect(audioCtx.destination);

    function addOsc(type, f, peak, peakAt, decayDur) {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = f;
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(peak, now + peakAt);
        g.gain.exponentialRampToValueAtTime(0.001, now + decayDur);
        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + decayDur + 0.05);
    }
    addOsc('sine', freq, 0.4, 0.02, dur);
    addOsc('triangle', freq * 2, 0.15, 0.015, dur * 0.7);
    addOsc('sine', freq * 3, 0.08, 0.01, dur * 0.5);
    addOsc('sine', freq * 4, 0.04, 0.008, dur * 0.4);

    // 击锤噪音
    const noiseDur = 0.05;
    const buf = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * noiseDur), audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
    const noise = audioCtx.createBufferSource();
    noise.buffer = buf;
    const nf = audioCtx.createBiquadFilter();
    nf.type = 'bandpass';
    nf.frequency.value = freq * 2;
    nf.Q.value = 1;
    const ng = audioCtx.createGain();
    ng.gain.setValueAtTime(0.15, now);
    ng.gain.exponentialRampToValueAtTime(0.001, now + noiseDur);
    noise.connect(nf); nf.connect(ng); ng.connect(master);
    noise.start(now); noise.stop(now + noiseDur);
}

function playChord(notes) {
    initAudio();
    if (!notes || notes.length === 0) return;
    notes.forEach(n => playPianoNote(n, 1.0, 0.85));
}

function playSingleNote(note) {
    playPianoNote(note, 0.9, 1.0);
}

// ==================== 新钢琴（滑动演奏、黑键紫色） ====================
let pianoKeyMap = new Map();
let whiteKeyList = [];

function buildPianoSequence() {
    const sequence = [];
    for (let octave = 0; octave <= 8; octave++) {
        const octaveNotes = octave === 0 ? ['A', 'A#', 'B'] : (octave === 8 ? ['C'] : noteNames);
        for (const noteName of octaveNotes) {
            sequence.push(noteName + octave);
        }
    }
    return sequence;
}

function centerPianoOnNote(targetNote) {
    const wrapper = document.getElementById('pianoScrollWrapper');
    const pianoArea = document.getElementById('pianoKeyboard');
    if (!wrapper || !pianoArea) return;

    const targetKey = pianoKeyMap.get(targetNote) || pianoArea.querySelector(`[data-note="${targetNote}"]`);
    if (!targetKey) return;

    const targetCenter = targetKey.offsetLeft + targetKey.offsetWidth / 2;
    const wrapperCenter = wrapper.clientWidth / 2;
    wrapper.scrollLeft = Math.max(0, targetCenter - wrapperCenter);
}

function buildNewPiano() {
    const pianoDiv = document.getElementById('pianoKeyboard');
    if (!pianoDiv) return;
    pianoDiv.innerHTML = '';
    whiteKeyList = [];
    pianoKeyMap.clear();

    const notesOrder = buildPianoSequence();
    const whiteNotes = notesOrder.filter(n => !n.includes('#'));
    whiteNotes.forEach(note => {
        const oct = parseInt(note.slice(-1), 10);
        const groupName = getGroupNameForOctave(oct);
        const keyDiv = document.createElement('div');
        keyDiv.className = 'white-key';
        const topDiv = document.createElement('div');
        topDiv.className = 'white-key-top';
        topDiv.innerText = groupName;
        const bottomDiv = document.createElement('div');
        bottomDiv.className = 'white-key-bottom';
        bottomDiv.innerText = note;
        keyDiv.appendChild(topDiv);
        keyDiv.appendChild(bottomDiv);
        keyDiv.setAttribute('data-note', note);
        pianoDiv.appendChild(keyDiv);
        whiteKeyList.push(keyDiv);
        pianoKeyMap.set(note, keyDiv);
    });

    setTimeout(() => {
        const blackNotes = notesOrder.filter(n => n.includes('#'));
        blackNotes.forEach(black => {
            const base = black.slice(0, -1);
            const oct = black.slice(-1);
            let leftNote = '';
            let rightNote = '';
            if (base === 'C#') { leftNote = 'C' + oct; rightNote = 'D' + oct; }
            else if (base === 'D#') { leftNote = 'D' + oct; rightNote = 'E' + oct; }
            else if (base === 'F#') { leftNote = 'F' + oct; rightNote = 'G' + oct; }
            else if (base === 'G#') { leftNote = 'G' + oct; rightNote = 'A' + oct; }
            else if (base === 'A#') { leftNote = 'A' + oct; rightNote = 'B' + oct; }
            const leftDom = pianoKeyMap.get(leftNote);
            const rightDom = pianoKeyMap.get(rightNote);
            if (leftDom && rightDom) {
                // 注意：.app-wrapper 设有 zoom，getBoundingClientRect() 返回的是
                // 缩放后的视口坐标，直接赋给 style.left 会产生逐键累积的偏差。
                // 必须使用本地布局坐标 offsetLeft / offsetWidth（不受 zoom 影响）。
                const leftEdge = leftDom.offsetLeft + leftDom.offsetWidth;
                const rightEdge = rightDom.offsetLeft;
                const center = (leftEdge + rightEdge) / 2;
                const bk = document.createElement('div');
                bk.className = 'black-key';
                const sharpSpan = document.createElement('div');
                sharpSpan.className = 'black-note-sharp';
                sharpSpan.innerText = black;
                const flatMap = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb' };
                const flatSpan = document.createElement('div');
                flatSpan.className = 'black-note-flat';
                flatSpan.innerText = flatMap[base] + oct;
                bk.appendChild(sharpSpan);
                bk.appendChild(flatSpan);
                bk.setAttribute('data-note', black);
                pianoDiv.appendChild(bk);
                // 先加入 DOM 再读取实际宽度（响应式媒体查询下为 30px 或 26px）
                const bw = bk.offsetWidth || 30;
                bk.style.left = (center - bw / 2) + 'px';
                pianoKeyMap.set(black, bk);
            }
        });

        requestAnimationFrame(() => centerPianoOnNote('F4'));
    }, 20);
}
function onPianoKeyPress(note, domElement) {
    playSingleNote(note);
    domElement.classList.add('active');
    setTimeout(() => domElement.classList.remove('active'), 180);
    if (appState.currentMode === 'homework' && hwState) {
        const m = /^([A-G])([#b]?)(-?\d+)$/.exec(note);
        if (m) {
            const midi = (parseInt(m[3], 10) + 1) * 12 + NOTE_SEMIS[m[1]] + (m[2] === '#' ? 1 : (m[2] === 'b' ? -1 : 0));
            hwInsertNote(hwSpellDefault(midi));
        }
        return;
    }
    if (appState.currentMode === 'triad-build' && appState.triadSession) {
        const s = appState.triadSession;
        const q = s.currentQuestion;
        // 将钢琴点击的音按和弦性质做等音拼写（如 C5 → B#4）
        const spelled = spellBuildNote(note, q);
        if (s.selectedNotes.length < 2 && spelled !== q.givenNote && !s.selectedNotes.includes(spelled)) {
            s.selectedNotes.push(spelled);
            renderTriadBuildStaff();
        }
        return;
    }
    if (appState.currentMode === 'fourpart-upper' && appState.fourPartSession) {
        const s = appState.fourPartSession;
        const q = s.currentQuestion;
        const spelled = spellBuildNote(note, q);
        if (s.selectedNotes.length < 3 && !s.selectedNotes.includes(spelled)) {
            s.selectedNotes.push(spelled);
            renderUpperPracticeStaff();
        }
        return;
    }
    if (appState.currentMode === 'fourpart-build' && appState.fourPartSession) {
        const s = appState.fourPartSession;
        const q = s.currentQuestion;
        const voice = s.currentVoice;
        const target = q.answer && q.answer[voice];
        const spelled = (target && triadPitchClass(note) === triadPitchClass(target)) ? respellKeepOctave(note, target) : note;
        s.voices[voice] = spelled;
        renderFourPartPracticeStaff();
        return;
    }
    if (appState.currentMode === 'practice' && appState.levelSession) {
        const session = appState.levelSession;
        if (!session.selectedNotes) session.selectedNotes = [];
        const pc = triadPitchClass(note);
        const midi = noteToMidi(note);
        const feedbackEl = document.getElementById('practice-feedback');
        // 题目限定小字一组（C4–B4）：范围外的音仅提示，不计入选择
        if (midi == null || midi < 60 || midi > 71) {
            if (feedbackEl) { feedbackEl.innerHTML = '请在「小字一组」范围内（C4-B4）点击'; feedbackEl.className = 'feedback-message'; }
            return;
        }
        if (session.selectedNotes.length < 3 && !session.selectedNotes.some(n => triadPitchClass(n) === pc)) {
            session.selectedNotes.push(note);
        }
        if (feedbackEl) {
            feedbackEl.innerHTML = `已选择：${session.selectedNotes.join('、')}（${session.selectedNotes.length}/3），请点击"提交答案"`;
            feedbackEl.className = 'feedback-message';
        }
    }
}
let pianoSlidePlayBound = false; // 防止重复绑定累积监听器（每次切换页面都会调用 initSlidePlay）
function initSlidePlay() {
    const pianoArea = document.getElementById('pianoKeyboard');
    if (!pianoArea || pianoSlidePlayBound) return;
    pianoSlidePlayBound = true;
    // —— 触摸：区分「点击」（静止抬起发音）与「滑动」（移动不发音，仅滚动） ——
    let touchStartX = 0, touchStartY = 0, touchStartNote = null, isSwiping = false;
    let suppressMouseUntil = 0; // 触摸抬起后短时间内忽略浏览器合成的 mouse 事件，避免重复触发
    pianoArea.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        isSwiping = false;
        touchStartNote = null;
        const el = document.elementsFromPoint(touch.clientX, touch.clientY);
        for (let elem of el) {
            if (elem.getAttribute && elem.getAttribute('data-note')) {
                touchStartNote = elem.getAttribute('data-note');
                break;
            }
        }
    }, { passive: true });
    pianoArea.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        if (Math.abs(touch.clientX - touchStartX) > 10 || Math.abs(touch.clientY - touchStartY) > 10) {
            isSwiping = true;
        }
    }, { passive: true });
    pianoArea.addEventListener('touchend', (e) => {
        if (!isSwiping && touchStartNote) {
            const key = pianoKeyMap.get(touchStartNote) || pianoArea.querySelector(`[data-note="${touchStartNote}"]`);
            onPianoKeyPress(touchStartNote, key || pianoArea);
            suppressMouseUntil = Date.now() + 500; // 阻止随后由触摸合成的 mousedown 再次触发
        }
        touchStartNote = null;
        isSwiping = false;
    });
    // —— 鼠标：点击发音 + 按住滑动连续发音 ——
    let mouseDown = false;
    let lastNote = null;
    pianoArea.addEventListener('mousedown', (e) => {
        if (Date.now() < suppressMouseUntil) return; // 忽略触摸合成的 mouse 事件
        mouseDown = true;
        let target = e.target.closest('[data-note]');
        if (target) {
            let note = target.getAttribute('data-note');
            onPianoKeyPress(note, target);
            lastNote = note;
        }
    });
    window.addEventListener('mousemove', (e) => {
        if (mouseDown && Date.now() >= suppressMouseUntil) {
            let els = document.elementsFromPoint(e.clientX, e.clientY);
            for (let el of els) {
                if (el.getAttribute && el.getAttribute('data-note')) {
                    let note = el.getAttribute('data-note');
                    if (note !== lastNote) {
                        onPianoKeyPress(note, el);
                        lastNote = note;
                    }
                    break;
                }
            }
        }
    });
    window.addEventListener('mouseup', () => { mouseDown = false; lastNote = null; });
}
// 时钟更新
function updateAllClocks() {
    const now = new Date();
    const str = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    ['homeClock', 'hubClock', 'learnClock', 'endClock'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = str;
    });
}
setInterval(updateAllClocks, 1000);
const pageManager = {
    switchToPage(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const target = document.getElementById(pageId);
        if (target) target.classList.add('active');
        if (pageId === 'learn-page') {
            setTimeout(() => { buildNewPiano(); initSlidePlay(); }, 50);
        }
        if (pageId === 'chapter-practice-page') {
            setTimeout(() => renderBlankStaff(), 50);
        }
        if (pageId === 'zheng-san-page') {
            updateStats(); renderZhengSanHub();
        }
    }
};
function handleModeSelection(mode) {
    if (!appState.userInfo.saved) { alert('请先填写并保存学生信息'); return; }
    if (mode === 'zheng-san') {
        appState.currentPhase = 'basic';
        document.querySelectorAll('.zs-phase-tab').forEach(t => t.classList.toggle('active', t.dataset.phase === 'basic'));
        pageManager.switchToPage('zheng-san-page');
        updateStats(); renderZhengSanHub();
    } else {
        alert(`“${mode}”模块正在开发中，敬请期待！`);
    }
}
// ==================== 课后习题编辑器（移植自 vexflow_practice_demo.html） ====================
const HW_VOICES = ['S', 'A', 'T', 'B'];
const HW_VOICE_NAMES = { S: '女高', A: '女低', T: '男高', B: '男低' };
const HW_VOICE_COLORS = { S: '#d32f2f', A: '#1976d2', T: '#388e3c', B: '#f57c00' };
const HW_DUR_BEATS = { w: 4, hd: 3, h: 2, qd: 1.5, q: 1, '8d': 0.75, '8': 0.5, '16': 0.25 };
const HW_DUR_LABEL = { w: '全音符', hd: '附点二分', h: '二分音符', qd: '附点四分', q: '四分音符', '8d': '附点八分', '8': '八分音符', '16': '十六分音符' };
const HW_UNIT_DURS = [['w', 16], ['hd', 12], ['h', 8], ['qd', 6], ['q', 4], ['8d', 3], ['8', 2], ['16', 1]];
const HW_INV_OPTIONS = [
    { id: 'none', label: '原位', figures: [] },
    { id: '6', label: '6', figures: [['6', 'sub']] },
    { id: '64', label: '4/6', figures: [['4', 'sub'], ['6', 'sup']] },
    { id: '7', label: '7', figures: [['7', 'sub']] },
    { id: '56', label: '5/6', figures: [['5', 'sub'], ['6', 'sup']] },
    { id: '34', label: '3/4', figures: [['3', 'sub'], ['4', 'sup']] },
    { id: '2', label: '2', figures: [['2', 'sub']] }
];
const HW_KEY_OPTIONS = [
    { letter: 'C', acc: '', major: true, spec: 'C' }, { letter: 'G', acc: '', major: true, spec: 'G' },
    { letter: 'D', acc: '', major: true, spec: 'D' }, { letter: 'A', acc: '', major: true, spec: 'A' },
    { letter: 'E', acc: '', major: true, spec: 'E' }, { letter: 'B', acc: '', major: true, spec: 'B' },
    { letter: 'F', acc: '♯', major: true, spec: 'F#' }, { letter: 'F', acc: '', major: true, spec: 'F' },
    { letter: 'B', acc: '♭', major: true, spec: 'Bb' }, { letter: 'E', acc: '♭', major: true, spec: 'Eb' },
    { letter: 'A', acc: '♭', major: true, spec: 'Ab' }, { letter: 'D', acc: '♭', major: true, spec: 'Db' },
    { letter: 'G', acc: '♭', major: true, spec: 'Gb' },
    { letter: 'a', acc: '', major: false, spec: 'C' }, { letter: 'e', acc: '', major: false, spec: 'G' },
    { letter: 'b', acc: '', major: false, spec: 'D' }, { letter: 'f', acc: '♯', major: false, spec: 'A' },
    { letter: 'c', acc: '♯', major: false, spec: 'E' }, { letter: 'g', acc: '♯', major: false, spec: 'B' },
    { letter: 'd', acc: '♯', major: false, spec: 'F#' }, { letter: 'd', acc: '', major: false, spec: 'F' },
    { letter: 'g', acc: '', major: false, spec: 'Bb' }, { letter: 'c', acc: '', major: false, spec: 'Eb' },
    { letter: 'f', acc: '', major: false, spec: 'Ab' }, { letter: 'b', acc: '♭', major: false, spec: 'Db' },
    { letter: 'e', acc: '♭', major: false, spec: 'Gb' }
];
const HW_STAVE_X = 40, HW_TREBLE_Y = 30, HW_BASS_Y = 130, HW_SYSTEM_HEIGHT = 250, HW_CHORD_LABEL_OFFSET = 240;

let hwState = null;
function hwNewMeasure() { return { voices: { S: [], A: [], T: [], B: [] }, chordLabels: [] }; }
function hwResetState() {
    hwState = {
        currentVoice: 'S', currentDuration: 'q', mode: 'note', keyIndex: 0, timeSig: '4/4',
        endBarType: 'boldDoubleRight', measureBarTypes: {}, caret: null, tieStart: null,
        chordFunc: 'T', chordInv: 'none', checkResults: null, selectedBarline: null, selNote: null,
        measures: [hwNewMeasure(), hwNewMeasure(), hwNewMeasure(), hwNewMeasure()],
        ties: [], manualBreaks: new Set(), undoStack: [],
        ui: { svg: null, systems: [], measureGeom: [], noteObjs: { S: {}, A: {}, T: {}, B: {} } }
    };
}
function hwMeasureBeats() { return parseInt(hwState.timeSig.split('/')[0], 10); }
function hwEnsureMeasure(i) { while (hwState.measures.length <= i) hwState.measures.push(hwNewMeasure()); }
function hwSetStatus(msg, isError) { const el = document.getElementById('hw-status'); if (el) { el.textContent = msg; el.className = isError ? 'hw-status error' : 'hw-status'; } }
function hwNoteSpan(nt) { const d = HW_DUR_BEATS[nt.dur]; if (nt.tuplet) return [nt.beat, nt.beat + d * 2]; return [nt.beat, nt.beat + d]; }
function hwNoteOverlaps(nt, start, durBeats) { const s = hwNoteSpan(nt); return s[0] < start + durBeats && start < s[1]; }
function hwFindNoteAt(m, beat) { const v = hwState.currentVoice; return hwState.measures[m].voices[v].find(nt => { const s = hwNoteSpan(nt); return s[0] <= beat && beat < s[1]; }) || null; }
function hwSnapshot() { hwState.checkResults = null; hwState.undoStack.push({ measures: JSON.parse(JSON.stringify(hwState.measures)), ties: JSON.parse(JSON.stringify(hwState.ties)), timeSig: hwState.timeSig }); if (hwState.undoStack.length > 50) hwState.undoStack.shift(); }
function hwUnitsOfDur(d) { return Math.round(HW_DUR_BEATS[d] * 4); }
function hwSplitDuration(startM, startBeat, dur) {
    const beats = hwMeasureBeats(); const segs = []; let m = startM, b = startBeat, left = hwUnitsOfDur(dur);
    while (left > 0) {
        const cap = Math.round((beats - b) * 4);
        if (cap <= 0) { m++; b = 0; continue; }
        const take = Math.min(cap, left); let rem = take;
        while (rem > 0) { for (const [d, u] of HW_UNIT_DURS) { if (u <= rem) { segs.push({ m: m, beat: b, dur: d }); b += HW_DUR_BEATS[d]; rem -= u; break; } } }
        left -= take; if (b >= beats) { m++; b = 0; }
    }
    return segs;
}
function hwPitchLetterAcc(pitch) { const m = /^([a-g])([#b]*)\/(\d+)$/.exec(pitch || ''); if (!m) return null; let acc = 0; (m[2] || '').split('').forEach(c => acc += (c === '#' ? 1 : -1)); return { letter: m[1], acc: acc }; }
function hwAccValueToSymbol(v) { return v === 0 ? 'n' : (v > 0 ? '#' : 'b'); }
function hwVexToApp(vexKey) { const m = /^([a-g])([#b]*)\/(\d+)$/.exec(vexKey || ''); if (!m) return null; return m[1].toUpperCase() + (m[2] || '') + m[3]; }
// —— 调号感知的音名拼写 ——
const HW_SEMIS = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const HW_LETTERS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
function hwParsePitch(p) { const m = /^([a-g])([#b]*)\/(\d+)$/.exec(p); if (!m) return null; let alt = 0; (m[2] || '').split('').forEach(c => alt += (c === '#' ? 1 : -1)); const base = HW_SEMIS[m[1]] + alt; return { pc: ((base % 12) + 12) % 12, midi: (parseInt(m[3], 10) + 1) * 12 + base }; }
function hwAccStr(n) { if (n > 0) return '#'.repeat(n); if (n < 0) return 'b'.repeat(-n); return ''; }
function hwSpellFrom(midi, letter, acc) { const base = HW_SEMIS[letter]; const octave = Math.round((midi - base - acc) / 12) - 1; return { letter, acc, octave, pitch: letter + hwAccStr(acc) + '/' + octave }; }
function hwEnharmonicCandidates(midi) { const pc = ((midi % 12) + 12) % 12; const out = []; HW_LETTERS.forEach(letter => { const base = HW_SEMIS[letter]; let diff = pc - base; diff = ((diff % 12) + 12) % 12; if (diff > 6) diff -= 12; if (Math.abs(diff) <= 2) out.push({ letter, acc: diff }); }); const seen = new Set(); const uniq = out.filter(o => { const k = o.letter + ':' + o.acc; if (seen.has(k)) return false; seen.add(k); return true; }); uniq.sort((a, b) => { const rank = x => (x.acc > 0 ? 0 : (x.acc === 0 ? 1 : 2)); if (rank(a) !== rank(b)) return rank(a) - rank(b); return a.acc - b.acc; }); return uniq; }
function hwKeySignatureAccidentals() { const k = HW_KEY_OPTIONS[hwState.keyIndex]; const map = {}; const sharps = ['f', 'c', 'g', 'd', 'a', 'e', 'b']; const flats = ['b', 'e', 'a', 'd', 'g', 'c', 'f']; const sigCount = ['C', 'G', 'D', 'A', 'E', 'B', 'F#'].indexOf(k.spec); const flatCount = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'].indexOf(k.spec); if (sigCount >= 0) for (let i = 0; i < sigCount; i++) map[sharps[i]] = 1; if (flatCount >= 0) for (let i = 0; i <= flatCount; i++) map[flats[i]] = -1; return map; }
function hwSpellDefault(midi) { const cands = hwEnharmonicCandidates(midi); if (!cands.length) return hwSpellFrom(midi, 'c', 0).pitch; const keyAcc = hwKeySignatureAccidentals(); for (const c of cands) if ((keyAcc[c.letter] || 0) === c.acc) return hwSpellFrom(midi, c.letter, c.acc).pitch; const c0 = cands[0]; return hwSpellFrom(midi, c0.letter, c0.acc).pitch; }
function hwComputeSystems() {
    const n = hwState.measures.length; const systems = []; let start = 0;
    for (let i = 0; i < n - 1; i++) { if ((i + 1) % 4 === 0 || hwState.manualBreaks.has(i)) { systems.push({ start: start, end: i }); start = i + 1; } }
    systems.push({ start: start, end: n - 1 });
    return systems;
}
function hwMeasureNoteCount(mi) { let n = 0; HW_VOICES.forEach(v => { n = Math.max(n, (hwState.measures[mi].voices[v] || []).length); }); return n; }
function hwNaturalMeasureWidth(mi) { return 60 + 20 * hwMeasureNoteCount(mi); }
function hwRestDuration(dur) { return dur + 'r'; }

function hwRender() {
    const container = document.getElementById('hw-score');
    if (!container) return;
    container.innerHTML = '';
    hwPlaybackCursorEl = null;
    if (!vexFlowReady()) { hwSetStatus('❌ 未找到 lib/vexflow-min.js', true); return; }
    const VF = Vex.Flow;
    const beats = hwMeasureBeats();
    const gridCount = beats * 4;
    const keyOpt = HW_KEY_OPTIONS[hwState.keyIndex];
    const keySpec = keyOpt.spec;
    const systems = hwComputeSystems();
    const width = Math.max(container.clientWidth - 12, 340);
    const height = systems.length * HW_SYSTEM_HEIGHT + 50;
    const clefOffset = 72;
    const availW = width - HW_STAVE_X - 30;
    let maxNoteArea = 0;
    systems.forEach(sys => { let tot = 0; for (let mi = sys.start; mi <= sys.end; mi++) tot += hwNaturalMeasureWidth(mi); if (tot > maxNoteArea) maxNoteArea = tot; });
    const effNoteArea = Math.max(availW - clefOffset, maxNoteArea);
    const effWidth = HW_STAVE_X + clefOffset + effNoteArea + 30;

    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(effWidth, height);
    const ctx = renderer.getContext();
    hwState.ui.systems = []; hwState.ui.measureGeom = []; hwState.ui.width = effWidth;
    const noteObjs = { S: {}, A: {}, T: {}, B: {} };
    const beamsToDraw = [];

    systems.forEach((sys, r) => {
        const sysTop = r * HW_SYSTEM_HEIGHT + 15;
        const sysBottom = r * HW_SYSTEM_HEIGHT + 215;
        const sysTrebleY = r * HW_SYSTEM_HEIGHT + HW_TREBLE_Y;
        const sysBassY = r * HW_SYSTEM_HEIGHT + HW_BASS_Y;
        hwState.ui.systems.push({ y1: sysTop, y2: sysBottom + 40, measures: [] });

        const weights = [];
        for (let mi = sys.start; mi <= sys.end; mi++) weights.push(hwNaturalMeasureWidth(mi));
        const totalWeight = weights.reduce((a, b) => a + b, 0) || 1;
        const noteWidths = weights.map(w => effNoteArea * w / totalWeight);

        const staves = [];
        let x = HW_STAVE_X;
        for (let mi = sys.start; mi <= sys.end; mi++) {
            const mWidth = noteWidths[mi - sys.start] + (mi === sys.start ? clefOffset : 0);
            const treble = new VF.Stave(x, sysTrebleY, mWidth);
            const bass = new VF.Stave(x, sysBassY, mWidth);
            if (mi === sys.start) {
                treble.addClef('treble').addKeySignature(keySpec).addTimeSignature(hwState.timeSig);
                bass.addClef('bass').addKeySignature(keySpec).addTimeSignature(hwState.timeSig);
            }
            treble.setBegBarType(VF.Barline.type.NONE).setEndBarType(VF.Barline.type.NONE);
            bass.setBegBarType(VF.Barline.type.NONE).setEndBarType(VF.Barline.type.NONE);
            staves.push({ mi: mi, treble: treble, bass: bass });
            x += mWidth;
        }

        staves.forEach((s, idx) => {
            s.treble.setContext(ctx).draw();
            s.bass.setContext(ctx).draw();
            if (idx === 0) {
                new VF.StaveConnector(s.treble, s.bass).setType('brace').setContext(ctx).draw();
                new VF.StaveConnector(s.treble, s.bass).setType('singleLeft').setContext(ctx).draw();
            }
            const isLast = (s.mi === hwState.measures.length - 1);
            const rightType = isLast ? hwState.endBarType : (hwState.measureBarTypes[s.mi] || 'singleRight');
            new VF.StaveConnector(s.treble, s.bass).setType(rightType).setContext(ctx).draw();
        });
        staves.forEach(s => {
            const mi = s.mi;
            const gridTreble = new VF.Voice({ num_beats: beats, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
            const gridBass = new VF.Voice({ num_beats: beats, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
            for (let i = 0; i < gridCount; i++) { gridTreble.addTickable(new VF.GhostNote('16')); gridBass.addTickable(new VF.GhostNote('16')); }
            const realVoices = {};
            const beamNotes = { S: [], A: [], T: [], B: [] };
            const keyAccMap = hwKeySignatureAccidentals();
            const accNeeded = { treble: {}, bass: {} };
            ['treble', 'bass'].forEach(staff => {
                const vs = staff === 'treble' ? ['S', 'A'] : ['T', 'B'];
                const accState = {}; const events = [];
                vs.forEach(v => hwState.measures[mi].voices[v].forEach(nt => events.push({ v, nt })));
                events.sort((a, b) => (a.nt.beat - b.nt.beat) || (vs.indexOf(a.v) - vs.indexOf(b.v)));
                events.forEach(({ v, nt }) => {
                    if (nt.rest) return;
                    const la = hwPitchLetterAcc(nt.pitch); if (!la) return;
                    const expected = keyAccMap[la.letter] || 0;
                    const prev = accState[la.letter];
                    let symbol = null;
                    if (la.acc !== expected) symbol = (prev == null || prev !== la.acc) ? hwAccValueToSymbol(la.acc) : null;
                    else symbol = (prev != null && prev !== la.acc) ? hwAccValueToSymbol(la.acc) : null;
                    if (symbol) { accNeeded[staff][v + ':' + nt.beat] = symbol; accState[la.letter] = la.acc; }
                });
            });
            HW_VOICES.forEach(v => {
                const voice = new VF.Voice({ num_beats: beats, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
                const isTreble = (v === 'S' || v === 'A');
                const clef = isTreble ? 'treble' : 'bass';
                const staff = isTreble ? 'treble' : 'bass';
                const notes = hwState.measures[mi].voices[v].slice().sort((a, b) => (a.beat - b.beat) || ((a.tuplet ? a.tuplet.index : 0) - (b.tuplet ? b.tuplet.index : 0)));
                notes.forEach(nt => {
                    let note;
                    if (nt.rest) {
                        note = new VF.StaveNote({ keys: [clef === 'treble' ? 'b/4' : 'd/3'], duration: hwRestDuration(nt.dur), clef });
                    } else {
                        note = new VF.StaveNote({ keys: [nt.pitch], duration: nt.dur, clef });
                        const symbol = accNeeded[staff][v + ':' + nt.beat];
                        if (symbol) note.addAccidental(0, new VF.Accidental(symbol));
                        note.setStemDirection((v === 'S' || v === 'T') ? VF.Stem.UP : VF.Stem.DOWN);
                        note.setStyle({ fillStyle: HW_VOICE_COLORS[v], strokeStyle: HW_VOICE_COLORS[v] });
                        if (!nt.tuplet) beamNotes[v].push(note);
                    }
                    voice.addTickable(note);
                    if (!nt.rest && !nt.tuplet) noteObjs[v][mi + ':' + nt.beat] = note;
                });
                realVoices[v] = voice;
            });
            HW_VOICES.forEach(v => {
                if (beamNotes[v].length > 1) {
                    const dir = (v === 'S' || v === 'T') ? VF.Stem.UP : VF.Stem.DOWN;
                    beamsToDraw.push(...VF.Beam.generateBeams(beamNotes[v], { stem_direction: dir }));
                }
            });
            const justify = s.treble.getNoteEndX() - s.treble.getNoteStartX() - 6;
            const formatter = new VF.Formatter();
            formatter.joinVoices([realVoices.S, realVoices.A]).joinVoices([realVoices.T, realVoices.B]);
            formatter.format([realVoices.S, realVoices.A, realVoices.T, realVoices.B, gridTreble, gridBass], justify);
            realVoices.S.draw(ctx, s.treble); realVoices.A.draw(ctx, s.treble);
            realVoices.T.draw(ctx, s.bass); realVoices.B.draw(ctx, s.bass);
            gridTreble.draw(ctx, s.treble); gridBass.draw(ctx, s.bass);
            const beatXs = gridTreble.getTickables().map(t => t.getAbsoluteX());
            hwState.ui.measureGeom[mi] = { x1: s.treble.getX(), x2: s.treble.getX() + s.treble.getWidth(), beatXs: beatXs, sysTop: sysTop, sysBottom: sysBottom, chordY: sysBottom + 25 };
            hwState.ui.systems[r].measures.push(mi);
        });
    });

    hwState.ties = hwState.ties.filter(t => noteObjs[t.voice] && noteObjs[t.voice][t.m1 + ':' + t.b1] && noteObjs[t.voice][t.m2 + ':' + t.b2]);
    hwState.ties.forEach(t => {
        new VF.StaveTie({ first_note: noteObjs[t.voice][t.m1 + ':' + t.b1], last_note: noteObjs[t.voice][t.m2 + ':' + t.b2], first_indices: [0], last_indices: [0] }).setContext(ctx).draw();
    });
    beamsToDraw.forEach(b => b.setContext(ctx).draw());

    hwState.ui.svg = container.querySelector('svg');
    hwState.ui.noteObjs = noteObjs;
    hwDrawCaret();
    hwDrawKeyLabel();
    hwDrawChordLabels();
    hwDrawCheckResults();
    hwUpdateStatus();
    hwScrollScoreIntoView();
}
// 钢琴展开时，自动滚动习题内容，让五线谱（hw-score）保持在钢琴上方，避免被遮挡
function hwScrollScoreIntoView() {
    const wrapper = document.getElementById('pianoScrollWrapper');
    if (!wrapper || wrapper.classList.contains('piano-hidden')) return;
    const hw = document.getElementById('homework-content');
    const score = document.getElementById('hw-score');
    if (!hw || !score) return;
    const pianoTop = wrapper.getBoundingClientRect().top;
    const scoreRect = score.getBoundingClientRect();
    if (scoreRect.bottom > pianoTop) {
        hw.scrollTop += (scoreRect.bottom - pianoTop) + 12;
    }
}
function hwDrawCaret() {
    const svg = hwState.ui.svg; if (!svg || !hwState.caret) return;
    let line = svg.querySelector('.hw-caret'); if (line) line.remove();
    const g = hwState.ui.measureGeom[hwState.caret.m]; if (!g) return;
    const idx = Math.round(hwState.caret.beat * 4);
    const x = g.beatXs[Math.min(idx, g.beatXs.length - 1)];
    line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('class', 'hw-caret');
    line.setAttribute('x1', x); line.setAttribute('x2', x);
    line.setAttribute('y1', g.sysTop); line.setAttribute('y2', g.sysBottom);
    line.setAttribute('stroke', '#e91e63'); line.setAttribute('stroke-width', '3'); line.setAttribute('stroke-dasharray', '4 3');
    svg.appendChild(line);
}
// 调标记：在低音谱号下方空白处（与和弦标记同高度）用方框框住调字母
function hwDrawKeyLabel() {
    const svg = hwState.ui.svg; if (!svg) return;
    const NS = 'http://www.w3.org/2000/svg';
    const key = HW_KEY_OPTIONS[hwState.keyIndex];
    const g = hwState.ui.measureGeom[0]; if (!g) return;
    const y = g.chordY;                 // 第一个系统的和弦标记高度
    const x = HW_STAVE_X + 4;           // 低音谱号下方（系统最左侧）
    const w = 46, h = 30;
    const rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('x', x); rect.setAttribute('y', y - h / 2);
    rect.setAttribute('width', w); rect.setAttribute('height', h);
    rect.setAttribute('rx', '4');
    rect.setAttribute('fill', '#ffffff');
    rect.setAttribute('stroke', '#37474f');
    rect.setAttribute('stroke-width', '1.5');
    svg.appendChild(rect);
    const lx = x + w / 2 + 2;
    const ly = y + 6;
    const letter = document.createElementNS(NS, 'text');
    letter.setAttribute('x', lx); letter.setAttribute('y', ly);
    letter.setAttribute('text-anchor', 'middle');
    letter.setAttribute('font-size', '18');
    letter.setAttribute('font-weight', 'bold');
    letter.setAttribute('fill', '#1a1a1a');
    letter.textContent = key.letter;
    svg.appendChild(letter);
    if (key.acc) {
        const acc = document.createElementNS(NS, 'text');
        acc.setAttribute('x', lx - 9); acc.setAttribute('y', ly - 12);
        acc.setAttribute('text-anchor', 'middle');
        acc.setAttribute('font-size', '13');
        acc.setAttribute('fill', '#1a1a1a');
        acc.textContent = key.acc;
        svg.appendChild(acc);
    }
}
function hwDrawChordLabels() {
    const svg = hwState.ui.svg; if (!svg) return;
    const NS = 'http://www.w3.org/2000/svg';
    hwState.measures.forEach((measure, mi) => {
        measure.chordLabels.forEach(lbl => {
            const g = hwState.ui.measureGeom[mi]; if (!g) return;
            const idx = Math.round(lbl.beat * 4);
            const x = g.beatXs[Math.min(idx, g.beatXs.length - 1)];
            const spec = HW_INV_OPTIONS.find(o => o.id === lbl.inv) || HW_INV_OPTIONS[0];
            const hasDigit = spec.figures.length > 0;
            const lx = x - (hasDigit ? 5 : 0);
            const t = document.createElementNS(NS, 'text');
            t.setAttribute('x', lx); t.setAttribute('y', g.chordY + 5);
            t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '15'); t.setAttribute('font-weight', 'bold'); t.setAttribute('fill', '#111');
            t.textContent = lbl.func;
            svg.appendChild(t);
            if (hasDigit) {
                const dx = lx + 6;
                spec.figures.forEach(([num, pos]) => {
                    const n = document.createElementNS(NS, 'text');
                    n.setAttribute('x', dx); n.setAttribute('y', pos === 'sup' ? g.chordY - 6 : g.chordY + 9);
                    n.setAttribute('text-anchor', 'middle'); n.setAttribute('font-size', '11'); n.setAttribute('fill', '#111');
                    n.textContent = num;
                    svg.appendChild(n);
                });
            }
        });
    });
}
function hwDrawCheckResults() {
    const svg = hwState.ui.svg; if (!svg || !hwState.checkResults) return;
    const NS = 'http://www.w3.org/2000/svg';
    hwState.checkResults.forEach(r => {
        const g = hwState.ui.measureGeom[r.m]; if (!g) return;
        const idx = Math.round(r.beat * 4);
        const x = g.beatXs[Math.min(idx, g.beatXs.length - 1)];
        const t = document.createElementNS(NS, 'text');
        t.setAttribute('x', x); t.setAttribute('y', g.chordY + 22);
        t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '16'); t.setAttribute('font-weight', 'bold');
        t.setAttribute('fill', r.ok ? '#2e7d32' : '#c62828');
        t.textContent = r.ok ? '✓' : '✗';
        svg.appendChild(t);
    });
}
function hwNearestIdx(xs, x) { let idx = 0, min = Infinity; xs.forEach((v, i) => { const d = Math.abs(v - x); if (d < min) { min = d; idx = i; } }); return idx; }
function hwLocate(x, y) {
    const sys = hwState.ui.systems.find(s => y >= s.y1 && y <= s.y2);
    if (!sys) return null;
    let mi = null;
    for (const m of sys.measures) { const g = hwState.ui.measureGeom[m]; if (g && x >= g.x1 && x <= g.x2) { mi = m; break; } }
    if (mi == null) return null;
    const g = hwState.ui.measureGeom[mi];
    const idx = hwNearestIdx(g.beatXs, x);
    return { type: 'beat', measure: mi, beat: idx * 0.25 };
}
function hwUpdateStatus() {
    let caret = '未选择';
    if (hwState.caret) caret = '第' + (hwState.caret.m + 1) + '小节 第' + (Math.floor(hwState.caret.beat) + 1) + '拍';
    const tie = hwState.tieStart ? '（连线起点已选）' : '';
    hwSetStatus('声部：' + HW_VOICE_NAMES[hwState.currentVoice] + ' ｜ 时值：' + HW_DUR_LABEL[hwState.currentDuration] + ' ｜ 模式：' + hwState.mode + ' ｜ 光标：' + caret + tie);
}
function hwToggleTie(voice, m1, b1, m2, b2) {
    const idx = hwState.ties.findIndex(t => t.voice === voice && ((t.m1 === m1 && t.b1 === b1 && t.m2 === m2 && t.b2 === b2) || (t.m1 === m2 && t.b1 === b2 && t.m2 === m1 && t.b2 === b1)));
    if (idx >= 0) hwState.ties.splice(idx, 1);
    else hwState.ties.push({ voice: voice, m1: m1, b1: b1, m2: m2, b2: b2 });
}
function hwInsertNote(pitch) {
    if (!hwState.caret) { hwSetStatus('请先点击谱面选择拍位', true); return; }
    hwSnapshot();
    const v = hwState.currentVoice;
    const segs = hwSplitDuration(hwState.caret.m, hwState.caret.beat, hwState.currentDuration);
    segs.forEach(seg => {
        hwEnsureMeasure(seg.m);
        const db = HW_DUR_BEATS[seg.dur];
        hwState.measures[seg.m].voices[v] = hwState.measures[seg.m].voices[v].filter(nt => !hwNoteOverlaps(nt, seg.beat, db));
    });
    segs.forEach(seg => { hwState.measures[seg.m].voices[v].push({ beat: seg.beat, dur: seg.dur, pitch: pitch, rest: false }); });
    for (let i = 0; i < segs.length - 1; i++) hwToggleTie(v, segs[i].m, segs[i].beat, segs[i + 1].m, segs[i + 1].beat);
    const last = segs[segs.length - 1];
    let nm = last.m, nb = last.beat + HW_DUR_BEATS[last.dur];
    if (nb >= hwMeasureBeats()) { nm++; nb = 0; }
    if (nm >= hwState.measures.length) hwState.caret = null;
    else hwState.caret = { m: nm, beat: nb };
    hwRender();
}
function hwInsertRestAt(m, beat) {
    hwSnapshot();
    const v = hwState.currentVoice;
    const segs = hwSplitDuration(m, beat, hwState.currentDuration);
    segs.forEach(seg => {
        hwEnsureMeasure(seg.m);
        const db = HW_DUR_BEATS[seg.dur];
        hwState.measures[seg.m].voices[v] = hwState.measures[seg.m].voices[v].filter(nt => !hwNoteOverlaps(nt, seg.beat, db));
        hwState.measures[seg.m].voices[v].push({ beat: seg.beat, dur: seg.dur, rest: true });
    });
    const last = segs[segs.length - 1];
    let nm = last.m, nb = last.beat + HW_DUR_BEATS[last.dur];
    if (nb >= hwMeasureBeats()) { nm++; nb = 0; }
    if (nm >= hwState.measures.length) hwState.caret = null;
    else hwState.caret = { m: nm, beat: nb };
    hwRender();
}
function hwDeleteAt(m, beat) {
    hwSnapshot();
    const v = hwState.currentVoice;
    hwState.measures[m].voices[v] = hwState.measures[m].voices[v].filter(nt => { const s = hwNoteSpan(nt); return !(s[0] <= beat && beat < s[1]); });
    hwState.measures[m].chordLabels = hwState.measures[m].chordLabels.filter(l => l.beat !== beat);
    hwRender();
}
function hwHandleTieClick(m, beat) {
    const v = hwState.currentVoice;
    const nt = hwFindNoteAt(m, beat);
    if (!nt) { hwSetStatus('该拍位没有音符，无法连线', true); return; }
    if (!hwState.tieStart) { hwState.tieStart = { voice: v, m: m, beat: nt.beat }; hwSetStatus('连线起点已选，请再点一个同声部音符'); return; }
    if (hwState.tieStart.voice !== v) { hwSetStatus('连线两端必须在同一声部', true); hwState.tieStart = null; return; }
    const a = hwState.tieStart;
    const b = { voice: v, m: m, beat: nt.beat };
    let first = a, second = b;
    if (a.m > b.m || (a.m === b.m && a.beat > b.beat)) { first = b; second = a; }
    if (first.m === second.m && first.beat === second.beat) { hwState.tieStart = null; hwUpdateStatus(); return; }
    const nf = hwFindNoteAt(first.m, first.beat);
    const ns = hwFindNoteAt(second.m, second.beat);
    if (nf && ns && nf.pitch !== ns.pitch) { hwSetStatus('延音线两端需同音高', true); hwState.tieStart = null; return; }
    hwSnapshot();
    hwToggleTie(v, first.m, first.beat, second.m, second.beat);
    hwState.tieStart = null;
    hwRender();
}
function hwPlaceChordLabel(m, beat) {
    hwSnapshot();
    hwEnsureMeasure(m);
    const func = hwState.chordFunc;
    const inv = (func === 'K') ? '64' : hwState.chordInv;
    hwState.measures[m].chordLabels = hwState.measures[m].chordLabels.filter(l => l.beat !== beat);
    hwState.measures[m].chordLabels.push({ beat: beat, func: func, inv: inv });
    hwRender();
}
function hwUndo() {
    if (!hwState.undoStack.length) { hwSetStatus('没有可撤销的操作', true); return; }
    const snap = hwState.undoStack.pop();
    hwState.measures = snap.measures;
    hwState.ties = snap.ties;
    hwState.caret = null; hwState.tieStart = null;
    hwRender();
}
function hwClearAll() {
    if (!confirm('确定清空当前课后习题吗？')) return;
    hwResetState();
    hwBuildKeySelect();
    hwBuildFuncButtons();
    hwBuildInvButtons();
    hwRender();
}
function hwAddMeasure() { hwSnapshot(); hwState.measures.push(hwNewMeasure()); hwRender(); }
function hwDeleteMeasure() {
    if (hwState.measures.length <= 1) { hwSetStatus('至少保留一个小节', true); return; }
    hwSnapshot();
    const removed = hwState.measures.length - 1;
    hwState.measures.pop();
    hwState.ties = hwState.ties.filter(t => t.m1 !== removed && t.m2 !== removed);
    hwState.manualBreaks.delete(removed);
    if (hwState.caret && hwState.caret.m >= hwState.measures.length) hwState.caret = null;
    hwRender();
}
function hwKeyTonicPc() {
    const k = HW_KEY_OPTIONS[hwState.keyIndex];
    const semis = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
    const base = semis[k.letter.toLowerCase()];
    const alt = k.acc === '♯' ? 1 : (k.acc === '♭' ? -1 : 0);
    return ((base + alt) % 12 + 12) % 12;
}
function hwVoiceNoteAt(m, beat, voice) {
    const list = hwState.measures[m].voices[voice];
    return list.find(nt => { if (nt.rest) return false; const s = hwNoteSpan(nt); return s[0] <= beat && beat < s[1]; }) || null;
}
function hwChordFromBeat(m, beat) {
    const notes = HW_VOICES.map(v => hwVoiceNoteAt(m, beat, v));
    if (notes.some(n => !n)) return { missing: true };
    const parsed = notes.map(n => hwParsePitch(n.pitch));
    if (parsed.some(p => !p)) return { missing: true };
    return { missing: false, notes, parsed };
}
function hwIdentifyChord(parsed) {
    const unique = [...new Set(parsed.map(p => p.pc))].sort((a, b) => a - b);
    const has = pc => unique.includes(((pc % 12) + 12) % 12);
    if (unique.length === 3) {
        for (const r of unique) {
            if (has(r + 4) && has(r + 7)) return { kind: 'triad', root: ((r % 12) + 12) % 12, quality: 'major' };
            if (has(r + 3) && has(r + 7)) return { kind: 'triad', root: ((r % 12) + 12) % 12, quality: 'minor' };
            if (has(r + 3) && has(r + 6)) return { kind: 'triad', root: ((r % 12) + 12) % 12, quality: 'dim' };
        }
        return { kind: null, root: null, quality: null };
    }
    if (unique.length === 4) {
        const patterns = [
            { q: 'dom7', iv: [0, 4, 7, 10] }, { q: 'maj7', iv: [0, 4, 7, 11] },
            { q: 'min7', iv: [0, 3, 7, 10] }, { q: 'halfdim7', iv: [0, 3, 6, 10] }, { q: 'dim7', iv: [0, 3, 6, 9] }
        ];
        for (const r of unique) for (const p of patterns) if (p.iv.every(x => has(r + x))) return { kind: 'seventh', root: ((r % 12) + 12) % 12, quality: p.q };
        return { kind: null, root: null, quality: null };
    }
    return { kind: null, root: null, quality: null };
}
function hwFuncRootPc(func) { const tonic = hwKeyTonicPc(); if (func === 'S' || func === 's') return ((tonic + 5) % 12 + 12) % 12; if (func === 'D') return ((tonic + 7) % 12 + 12) % 12; return tonic; }
function hwFuncQuality(func) { if (func === 'D') return 'major'; return HW_KEY_OPTIONS[hwState.keyIndex].major ? 'major' : 'minor'; }
function hwExpectedBassPc(func, inv) {
    const root = hwFuncRootPc(func); const q = hwFuncQuality(func);
    const pc = x => ((x % 12) + 12) % 12;
    const third = root + (q === 'minor' ? 3 : 4); const fifth = root + 7; const seventh = root + 10;
    switch (inv) {
        case 'none': return pc(root);
        case '6': return pc(third);
        case '64': return pc(fifth);
        case '7': return pc(root);
        case '56': return pc(third);
        case '34': return pc(fifth);
        case '2': return pc(seventh);
        default: return null;
    }
}
function hwCheckLabelMatch(lbl, info) {
    if (!info.func) return false;
    if (lbl.func === 'K') return (info.func === 'T' || info.func === 't') && info.inv === '64';
    return lbl.func === info.func && lbl.inv === info.inv;
}
function hwDoubledPc(parsed) {
    const counts = {};
    parsed.forEach(p => { counts[p.pc] = (counts[p.pc] || 0) + 1; });
    for (const k of Object.keys(counts)) if (counts[k] >= 2) return parseInt(k, 10);
    return null;
}
function hwIntervalCategory(a, b) {
    const diff = Math.abs(a - b);
    if (diff === 0) return 'unison';
    const mod = ((diff % 12) + 12) % 12;
    if (mod === 7) return 'p5';
    if (mod === 0) return 'octave';
    return null;
}
function hwCheckChord(m, lbl) {
    const errors = [];
    let score = 0;
    const chord = hwChordFromBeat(m, lbl.beat);
    if (chord.missing) { errors.push('该拍位四声部不完整'); return { m, beat: lbl.beat, ok: false, errors, score: 0 }; }
    const parsed = chord.parsed;
    const ident = hwIdentifyChord(parsed);
    if (ident.root == null) { errors.push('无法识别为和弦'); return { m, beat: lbl.beat, ok: false, errors, score: 0 }; }
    score = 4; // 四声部完整且构成合法和弦：音部分 4 分
    const tonic = hwKeyTonicPc();
    const deg = ((ident.root - tonic) % 12 + 12) % 12;
    const majorKey = HW_KEY_OPTIONS[hwState.keyIndex].major;
    let actualFunc = null;
    if (deg === 0) actualFunc = majorKey ? 'T' : 't';
    else if (deg === 5) actualFunc = majorKey ? 'S' : 's';
    else if (deg === 7) actualFunc = 'D';
    const minorThird = ['minor', 'dim', 'min7', 'halfdim7', 'dim7'].includes(ident.quality);
    const dimFifth = ['dim', 'halfdim7', 'dim7'].includes(ident.quality);
    const third = ((ident.root + (minorThird ? 3 : 4)) % 12 + 12) % 12;
    const fifth = ((ident.root + (dimFifth ? 6 : 7)) % 12 + 12) % 12;
    let seventh = null;
    if (ident.kind === 'seventh') {
        if (ident.quality === 'maj7') seventh = ((ident.root + 11) % 12 + 12) % 12;
        else if (ident.quality === 'dim7') seventh = ((ident.root + 9) % 12 + 12) % 12;
        else seventh = ((ident.root + 10) % 12 + 12) % 12;
    }
    const bass = parsed.reduce((a, p) => (p.midi < a.midi ? p : a));
    let actualInv = null;
    if (ident.kind === 'triad') {
        if (bass.pc === ident.root) actualInv = 'none';
        else if (bass.pc === third) actualInv = '6';
        else if (bass.pc === fifth) actualInv = '64';
    } else {
        if (bass.pc === ident.root) actualInv = '7';
        else if (bass.pc === third) actualInv = '56';
        else if (bass.pc === fifth) actualInv = '34';
        else if (bass.pc === seventh) actualInv = '2';
    }
    const info = { func: actualFunc, inv: actualInv, third, fifth };
    const [S, A, T, B] = parsed.map(p => p.midi);
    if (S < A || A < T || T < B) { errors.push('声部交叉'); score -= 1; }
    if (S - A > 12) { errors.push('高音-中音＞八度'); score -= 1; }
    if (A - T > 12) { errors.push('中音-次中音＞八度'); score -= 1; }
    if (T - B > 24) { errors.push('次中音-低音＞两个八度'); score -= 1; }
    const expectedBass = hwExpectedBassPc(lbl.func, lbl.inv);
    if (expectedBass != null && bass.pc !== expectedBass) { errors.push('低音错'); score -= 1; }
    if (hwCheckLabelMatch(lbl, info)) { score += 1; } // 标记正确 +1 分
    else errors.push('标记与和弦不符');
    const doubled = hwDoubledPc(parsed);
    if (ident.kind === 'triad' && doubled != null) {
        const leading = ((tonic + 11) % 12 + 12) % 12;
        if (info.inv === '6' && doubled === info.third) { errors.push('六和弦重复了三音'); score -= 1; }
        if (info.inv === '64' && doubled !== info.fifth) { errors.push('四六和弦应重复五音'); score -= 1; }
        if (info.inv === 'none' && doubled === leading) { errors.push('重复了导音'); score -= 1; }
    }
    return { m, beat: lbl.beat, ok: errors.length === 0, errors, score: Math.max(0, score) };
}
function hwRunCheck() {
    const labeled = [];
    hwState.measures.forEach((measure, mi) => { measure.chordLabels.forEach(lbl => labeled.push({ m: mi, lbl })); });
    labeled.sort((a, b) => (a.m - b.m) || (a.lbl.beat - b.lbl.beat));
    const results = labeled.map(item => {
        try {
            return hwCheckChord(item.m, item.lbl);
        } catch (e) {
            return { m: item.m, beat: item.lbl.beat, ok: false, errors: ['检查出错：' + (e && e.message ? e.message : '')] };
        }
    });
    for (let i = 1; i < labeled.length; i++) {
        try {
            const pChord = hwChordFromBeat(labeled[i - 1].m, labeled[i - 1].lbl.beat);
            const cChord = hwChordFromBeat(labeled[i].m, labeled[i].lbl.beat);
            if (pChord.missing || cChord.missing) continue;
            const pv = pChord.parsed, cv = cChord.parsed;
            const pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
            let parallel = false;
            pairs.forEach(([x, y]) => {
                const c1 = hwIntervalCategory(pv[x].midi, pv[y].midi);
                const c2 = hwIntervalCategory(cv[x].midi, cv[y].midi);
                if (!c1 || !c2) return;
                const fifthPair = (c1 === 'p5' && c2 === 'p5');
                const octavePair = ((c1 === 'octave' || c1 === 'unison') && (c2 === 'octave' || c2 === 'unison'));
                if (!fifthPair && !octavePair) return;
                const d1 = cv[x].midi - pv[x].midi;
                const d2 = cv[y].midi - pv[y].midi;
                if (d1 !== 0 && d2 !== 0 && ((d1 > 0 && d2 > 0) || (d1 < 0 && d2 < 0))) parallel = true;
            });
            if (parallel && results[i] && results[i].errors) { results[i].errors.push('与前和弦平行五/八度'); results[i].ok = false; results[i].score = Math.max(0, (results[i].score || 0) - 1); }
        } catch (e) { /* 单个和弦的平行检测失败不影响整体 */ }
    }
    hwState.checkResults = results;
    hwRender();
    hwShowCheckSummary(results);
    // 习题得分计入章节掌握度（每个小题单独记录百分制得分，取最高）
    if (appState.currentChapter) {
        const chapterId = appState.currentChapter.id;
        const prog = appState.chapterProgress[chapterId];
        if (prog) {
            if (!prog.scores) prog.scores = {};
            if (!prog.scores.homework || Array.isArray(prog.scores.homework)) prog.scores.homework = {};
            const total = results.reduce((sum, r) => sum + (r && r.score ? r.score : 0), 0);
            const full = results.length * 5;
            const percent = full ? Math.round(total / full * 100) : 0;
            const key = (typeof hwCurrentExerciseIndex === 'number' && hwCurrentExerciseIndex >= 0) ? hwCurrentExerciseIndex : 'all';
            prog.scores.homework[key] = Math.max(prog.scores.homework[key] || 0, percent);
            refreshChapterMastery(chapterId);
            saveProgress();
        }
    }
}
function hwShowCheckSummary(results) {
    const el = document.getElementById('hw-check-summary');
    if (!el) return;
    if (!results.length) { el.innerHTML = '<div>尚未放置和弦标记，无法检查。请先用「标记」模式点拍位放置 T/S/D。</div>'; return; }
    const total = results.reduce((sum, r) => sum + (r && r.score ? r.score : 0), 0);
    const full = results.length * 5;
    const header = '<div class="hw-score-total">总分：' + total + ' / ' + full + ' 分</div>';
    el.innerHTML = header + results.map(r => {
        if (!r) return '';
        const loc = '第' + (r.m + 1) + '小节 第' + (Math.floor(r.beat) + 1) + '拍';
        const s = r.score != null ? r.score : 0;
        if (r.ok) return '<div class="hw-ok">✓ ' + loc + '：正确（' + s + '分）</div>';
        return '<div class="hw-bad">✗ ' + loc + '：' + (r.errors || []).join('；') + '（' + s + '分）</div>';
    }).join('');
}
let hwPlaybackAnimId = null;
let hwPlaybackCursorEl = null;
function hwPlayScore() {
    initAudio();
    const beatDur = 0.6;
    hwState.measures.forEach((measure, mi) => {
        HW_VOICES.forEach(v => {
            measure.voices[v].forEach(nt => {
                if (nt.rest) return;
                const app = hwVexToApp(nt.pitch);
                if (!app) return;
                const startMs = (mi * hwMeasureBeats() + nt.beat) * beatDur * 1000;
                const dur = Math.max(HW_DUR_BEATS[nt.dur] * beatDur * 0.9, 0.25);
                setTimeout(() => playPianoNote(app, dur, 0.9), startMs);
            });
        });
    });
    hwClearPlaybackCursor();
    const startTime = performance.now();
    const perMeasure = hwMeasureBeats();
    const tick = () => {
        const totalBeats = (performance.now() - startTime) / 1000 / beatDur;
        const m = Math.floor(totalBeats / perMeasure);
        const beat = totalBeats - m * perMeasure;
        if (m >= hwState.measures.length) { hwClearPlaybackCursor(); return; }
        hwUpdatePlaybackCursor(m, beat);
        hwPlaybackAnimId = requestAnimationFrame(tick);
    };
    hwPlaybackAnimId = requestAnimationFrame(tick);
}
function hwUpdatePlaybackCursor(m, beat) {
    const svg = hwState.ui.svg;
    const g = hwState.ui.measureGeom[m];
    if (!svg || !g) return;
    const idx = Math.min(Math.round(beat * 4), g.beatXs.length - 1);
    const x = g.beatXs[idx];
    if (!hwPlaybackCursorEl) {
        hwPlaybackCursorEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        hwPlaybackCursorEl.setAttribute('stroke', '#1565c0');
        hwPlaybackCursorEl.setAttribute('stroke-width', '2');
        svg.appendChild(hwPlaybackCursorEl);
    }
    hwPlaybackCursorEl.setAttribute('x1', x); hwPlaybackCursorEl.setAttribute('x2', x);
    hwPlaybackCursorEl.setAttribute('y1', g.sysTop); hwPlaybackCursorEl.setAttribute('y2', g.sysBottom);
}
function hwClearPlaybackCursor() {
    if (hwPlaybackAnimId) { cancelAnimationFrame(hwPlaybackAnimId); hwPlaybackAnimId = null; }
    if (hwPlaybackCursorEl && hwPlaybackCursorEl.parentNode) hwPlaybackCursorEl.parentNode.removeChild(hwPlaybackCursorEl);
    hwPlaybackCursorEl = null;
}
// canvas 文本自动折行（按像素宽度），返回绘制后的下一行 y
function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = String(text).split('');
    let line = '', ly = y;
    for (let i = 0; i < chars.length; i++) {
        const test = line + chars[i];
        if (ctx.measureText(test).width > maxWidth && line !== '') {
            ctx.fillText(line, x, ly);
            line = chars[i];
            ly += lineHeight;
        } else {
            line = test;
        }
    }
    if (line) ctx.fillText(line, x, ly);
    return ly + lineHeight;
}
// 当前练习题型名称
function practiceTypeLabel() {
    const s = appState.triadSession || appState.fourPartSession;
    if (!s) return '练习';
    const map = { listen: '听辨三和弦', build: '构建三和弦', arrange: '判断排列法', upper: '构建上方三声部', fourpart: '四部和声排列' };
    return map[s.type] || '练习';
}
function hwFormatDateTime(d) {
    const p = n => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
}
// 文件名用时间戳（年月日_时分），不含冒号等非法字符，方便在电脑/手机上识别与排序
function hwFileTimestamp(d) {
    const p = n => String(n).padStart(2, '0');
    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '_' + p(d.getHours()) + p(d.getMinutes());
}
// 当前章节标题（去空格），用于导出文件名，如「02四部和声」
function hwChapterShortTitle() {
    return (appState.currentChapter ? appState.currentChapter.title : '').replace(/\s+/g, '');
}
// 从习题文本提取类型前缀（如「书面习题」「键盘习题」「口答习题」）
function hwExerciseTypeLabel(questionText) {
    const m = /^([^：:]+)[：:]/.exec(questionText || '');
    return m ? m[1].trim() : '习题';
}
// 导出图片：表头（姓名/调性/拍号/时间）用 canvas 绘制，谱面 SVG 转图片，合成 PNG 下载
function hwExportImage() {
    const svg = hwState && hwState.ui.svg;
    if (!svg) { hwSetStatus('导出失败：未找到乐谱', true); return; }
    const svgW = svg.width.baseVal.value || hwState.ui.width || 800;
    const svgH = svg.height.baseVal.value || 300;
    const pad = 24, scale = 2;
    const key = HW_KEY_OPTIONS[hwState.keyIndex];
    const keyName = key.letter + key.acc + (key.major ? ' 大调' : ' 小调');
    const ui = appState.userInfo || {};
    const chTitle = appState.currentChapter ? appState.currentChapter.title : '和声作业';
    const maxTextW = svgW - pad * 2;
    const probe = document.createElement('canvas').getContext('2d');
    probe.font = '13px -apple-system,PingFang SC,Microsoft YaHei,sans-serif';
    const qText = hwCurrentQuestion ? hwCurrentQuestion.replace(/\s+/g, ' ').trim() : '';
    const qLines = qText ? Math.max(1, Math.ceil(probe.measureText('题目：' + qText).width / maxTextW)) : 0;

    // —— 计分信息（若已点击「检查」）：得分 + 逐拍评价 ——
    const checkResults = (hwState.checkResults || []).filter(Boolean);
    const scoreLines = [];
    if (checkResults.length) {
        const total = checkResults.reduce((s, r) => s + (r.score || 0), 0);
        const full = checkResults.length * 5;
        scoreLines.push('得分：' + total + ' / ' + full + ' 分');
        checkResults.forEach(r => {
            const loc = '第' + (r.m + 1) + '小节 第' + (Math.floor(r.beat) + 1) + '拍';
            const s = r.score != null ? r.score : 0;
            if (r.ok) scoreLines.push('✓ ' + loc + '：正确（' + s + '分）');
            else scoreLines.push('✗ ' + loc + '：' + (r.errors || []).join('；') + '（' + s + '分）');
        });
    }

    const headH = 90 + qLines * 20 + scoreLines.length * 18;
    const canvasW = svgW + pad * 2;
    const canvasH = headH + svgH + pad * 2;
    const canvas = document.createElement('canvas');
    canvas.width = canvasW * scale;
    canvas.height = canvasH * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.fillStyle = '#6a1b9a';
    ctx.font = 'bold 20px -apple-system,PingFang SC,Microsoft YaHei,sans-serif';
    ctx.fillText(chTitle + ' · 习题作业', pad, pad + 24);
    ctx.fillStyle = '#555';
    ctx.font = '13px -apple-system,PingFang SC,Microsoft YaHei,sans-serif';
    let ly = pad + 54;
    ctx.fillText('姓名：' + (ui.name || '—') + '    指导教师：' + (ui.teacher || '—') + '    班级：' + (ui.majorClass || '—'), pad, ly); ly += 20;
    if (qText) ly = wrapCanvasText(ctx, '题目：' + qText, pad, ly, maxTextW, 20);
    ctx.fillText('调式调性：' + keyName + '    拍号：' + hwState.timeSig + '    导出时间：' + hwFormatDateTime(new Date()), pad, ly); ly += 14;
    // 计分信息（得分 + 逐拍评价）
    if (scoreLines.length) {
        ctx.fillStyle = '#7b1fa2';
        scoreLines.forEach(line => { ctx.fillText(line, pad, ly); ly += 18; });
        ctx.fillStyle = '#555';
    }
    ctx.strokeStyle = '#7b1fa2'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad, ly); ctx.lineTo(canvasW - pad, ly); ctx.stroke();
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, pad, headH + 10, svgW, svgH);
        URL.revokeObjectURL(url);
        downloadCanvasPng(canvas, (hwChapterShortTitle() || '习题') + '_' + hwExerciseTypeLabel(hwCurrentQuestion) + '_' + hwFileTimestamp(new Date()), () => hwSetStatus('✅ 已导出图片'));
    };
    img.onerror = () => { hwSetStatus('导出图片失败', true); };
    img.src = url;
}
// 练习导出：把当前练习的谱面（高音谱表/大谱表）合成图片下载，供上传学习通
function practiceExportImage() {
    let svg = null;
    const fourpart = document.getElementById('fourpart-staff');
    const build = document.getElementById('triad-build-staff');
    if (fourpart && fourpart.style.display !== 'none') svg = fourpart.querySelector('svg');
    if (!svg && build && build.style.display !== 'none') svg = build.querySelector('svg');
    if (!svg) {
        // 无谱面题型（听辨三和弦 / 判断排列法等）：收集文字信息并导出文字卡片
        const _ui = appState.userInfo || {};
        const _chTitle = appState.currentChapter ? appState.currentChapter.title : '随堂练习';
        const _qEl = document.getElementById('practice-question');
        const _qText = _qEl ? (_qEl.textContent || '').replace(/\s+/g, ' ').trim() : '';
        const _scoreEl = document.getElementById('practice-score');
        const _correctEl = document.getElementById('practice-correct');
        const _wrongEl = document.getElementById('practice-wrong');
        const _progressEl = document.getElementById('practice-progress');
        const _statsLine = '得分：' + (_scoreEl ? _scoreEl.textContent : '0') + '    正确：' + (_correctEl ? _correctEl.textContent : '0') + '    错误：' + (_wrongEl ? _wrongEl.textContent : '0') + '    进度：' + (_progressEl ? _progressEl.textContent : '0');
        const _fbEl = document.getElementById('practice-feedback');
        const _fbText = _fbEl ? (_fbEl.textContent || '').replace(/\s+/g, ' ').trim() : '';
        exportPracticeTextCard(_chTitle, _ui, _statsLine, _qText, _fbText);
        return;
    }
    const svgW = svg.width.baseVal.value || 400;
    const svgH = svg.height.baseVal.value || 200;
    const pad = 24, scale = 2;
    const ui = appState.userInfo || {};
    const chTitle = appState.currentChapter ? appState.currentChapter.title : '随堂练习';
    const maxTextW = svgW - pad * 2;
    const probe = document.createElement('canvas').getContext('2d');
    probe.font = '13px -apple-system,PingFang SC,Microsoft YaHei,sans-serif';
    const qEl = document.getElementById('practice-question');
    const qText = qEl ? (qEl.textContent || '').replace(/\s+/g, ' ').trim() : '';
    const qLines = qText ? Math.max(1, Math.ceil(probe.measureText('最后一题：' + qText).width / maxTextW)) : 0;
    const headH = 130 + qLines * 20;
    const canvasW = svgW + pad * 2;
    const canvasH = headH + svgH + pad * 2;
    const canvas = document.createElement('canvas');
    canvas.width = canvasW * scale;
    canvas.height = canvasH * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.fillStyle = '#6a1b9a';
    ctx.font = 'bold 20px -apple-system,PingFang SC,Microsoft YaHei,sans-serif';
    ctx.fillText(chTitle + ' · ' + practiceTypeLabel(), pad, pad + 24);
    ctx.fillStyle = '#555';
    ctx.font = '13px -apple-system,PingFang SC,Microsoft YaHei,sans-serif';
    let ly = pad + 54;
    ctx.fillText('姓名：' + (ui.name || '—') + '    指导教师：' + (ui.teacher || '—') + '    班级：' + (ui.majorClass || '—'), pad, ly); ly += 20;
    // 记分板信息（得分/正确/错误/进度）
    const scoreEl = document.getElementById('practice-score');
    const correctEl = document.getElementById('practice-correct');
    const wrongEl = document.getElementById('practice-wrong');
    const progressEl = document.getElementById('practice-progress');
    ctx.fillText('得分：' + (scoreEl ? scoreEl.textContent : '0') + '    正确：' + (correctEl ? correctEl.textContent : '0') + '    错误：' + (wrongEl ? wrongEl.textContent : '0') + '    进度：' + (progressEl ? progressEl.textContent : '0'), pad, ly); ly += 20;
    ctx.fillText('导出时间：' + hwFormatDateTime(new Date()), pad, ly); ly += 20;
    if (qText) ly = wrapCanvasText(ctx, '最后一题：' + qText, pad, ly, maxTextW, 20);
    ctx.strokeStyle = '#7b1fa2'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad, ly); ctx.lineTo(canvasW - pad, ly); ctx.stroke();
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, pad, headH + 10, svgW, svgH);
        URL.revokeObjectURL(url);
        downloadCanvasPng(canvas, (hwChapterShortTitle() || '章节练习') + '_' + practiceTypeLabel() + '_' + hwFileTimestamp(new Date()));
    };
    img.onerror = () => { alert('导出图片失败'); };
    img.src = url;
}
// canvas 文本按像素折行，返回每一行（仅测量，不绘制）
function wrapLines(ctx, text, maxWidth) {
    const chars = String(text).split('');
    const lines = [];
    let line = '';
    for (let i = 0; i < chars.length; i++) {
        const test = line + chars[i];
        if (ctx.measureText(test).width > maxWidth && line !== '') {
            lines.push(line);
            line = chars[i];
        } else {
            line = test;
        }
    }
    if (line) lines.push(line);
    return lines;
}
// 导出图片右下角加水印（作者 + 时间），保护产权
function addExportWatermark(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const text = '王向辉 · 内蒙古民族大学音乐学院 · ' + hwFormatDateTime(new Date());
    const fontSize = Math.max(14, Math.round(h * 0.016));
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = 'rgba(123, 31, 162, 0.4)';
    ctx.font = 'bold ' + fontSize + 'px -apple-system, PingFang SC, Microsoft YaHei, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(text, w - 20, h - 16);
    ctx.restore();
}
// 检测是否处于内嵌浏览器（学习通/微信等 WebView）环境：这类环境对 a.download 支持不完整
function isWebViewEnv() {
    const ua = navigator.userAgent || '';
    if (/MicroMessenger/i.test(ua)) return true;        // 微信
    if (/chaoxing|SuperStar/i.test(ua)) return true;    // 学习通（超星）
    if (/wxwork|DingTalk/i.test(ua)) return true;       // 企业微信 / 钉钉
    if (/; wv\)/i.test(ua)) return true;                // Android WebView 通用标识
    return false;
}
// 内嵌浏览器环境：弹出图片预览，提示长按保存（正常浏览器仍走下载）
function showImagePreview(url) {
    const modal = document.getElementById('export-preview-modal');
    const img = document.getElementById('export-preview-img');
    if (!modal || !img) return;
    img.src = url;
    modal.style.display = 'flex';
}
// 把绘制好的 canvas 下载为 PNG（baseName 不含扩展名，如「习题_20261011_1530」）
function downloadCanvasPng(canvas, baseName, onDone) {
    addExportWatermark(canvas);
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        if (isWebViewEnv()) {
            // 内嵌浏览器：弹预览让用户长按保存，不弹下载框
            showImagePreview(url);
        } else {
            const a = document.createElement('a');
            a.href = url;
            a.download = baseName + '.png';
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 3000);
            if (onDone) onDone();
        }
    }, 'image/png');
}
// 无谱面题型导出：仅用文字信息（题目/作答结果/记分板）生成一张 PNG 卡片
function exportPracticeTextCard(chTitle, ui, statsLine, qText, fbText) {
    const pad = 24, scale = 2, contentW = 720;
    const maxTextW = contentW - pad * 2;
    const probe = document.createElement('canvas').getContext('2d');

    const titleText = chTitle + ' · ' + practiceTypeLabel();
    const infoText = '姓名：' + (ui.name || '—') + '    指导教师：' + (ui.teacher || '—') + '    班级：' + (ui.majorClass || '—');
    const timeText = '导出时间：' + hwFormatDateTime(new Date());
    const noteText = '说明：本题型为听力 / 判断题，无五线谱谱面，故导出文字作答信息。';

    const blocks = [];
    blocks.push({ text: titleText, font: 'bold 20px -apple-system,PingFang SC,Microsoft YaHei,sans-serif', lineH: 30, color: '#6a1b9a' });
    blocks.push({ text: infoText, font: '13px -apple-system,PingFang SC,Microsoft YaHei,sans-serif', lineH: 20, color: '#555' });
    blocks.push({ text: statsLine, font: '13px -apple-system,PingFang SC,Microsoft YaHei,sans-serif', lineH: 20, color: '#555' });
    blocks.push({ text: timeText, font: '13px -apple-system,PingFang SC,Microsoft YaHei,sans-serif', lineH: 20, color: '#555' });
    if (qText) blocks.push({ text: '题目：' + qText, font: '13px -apple-system,PingFang SC,Microsoft YaHei,sans-serif', lineH: 20, color: '#333' });
    if (fbText) blocks.push({ text: '作答结果：' + fbText, font: '13px -apple-system,PingFang SC,Microsoft YaHei,sans-serif', lineH: 20, color: '#333' });
    blocks.push({ text: noteText, font: '13px -apple-system,PingFang SC,Microsoft YaHei,sans-serif', lineH: 20, color: '#999' });

    let totalH = pad;
    for (let i = 0; i < blocks.length; i++) {
        probe.font = blocks[i].font;
        blocks[i].lines = wrapLines(probe, blocks[i].text, maxTextW);
        totalH += blocks[i].lines.length * blocks[i].lineH;
        totalH += (i === 0 ? 18 : 6);
    }
    totalH += pad;

    const canvas = document.createElement('canvas');
    canvas.width = contentW * scale;
    canvas.height = Math.ceil(totalH) * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, contentW, Math.ceil(totalH));
    ctx.textBaseline = 'top';
    let ly = pad;
    for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        ctx.fillStyle = b.color;
        ctx.font = b.font;
        for (let j = 0; j < b.lines.length; j++) {
            ctx.fillText(b.lines[j], pad, ly);
            ly += b.lineH;
        }
        ly += (i === 0 ? 18 : 6);
    }

    downloadCanvasPng(canvas, (hwChapterShortTitle() || '章节练习') + '_' + practiceTypeLabel() + '_' + hwFileTimestamp(new Date()));
}
function hwBuildKeySelect() {
    const sel = document.getElementById('hw-key-select');
    if (!sel) return;
    sel.innerHTML = '';
    HW_KEY_OPTIONS.forEach((k, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = k.letter + k.acc + ' ' + (k.major ? '大调' : '小调');
        sel.appendChild(opt);
    });
    sel.value = hwState.keyIndex;
}
function hwBuildFuncButtons() {
    const wrap = document.getElementById('hw-func-btns');
    if (!wrap) return;
    const majorKey = HW_KEY_OPTIONS[hwState.keyIndex].major;
    const funcs = majorKey ? ['T', 'S', 'D', 'K'] : ['t', 's', 'D', 'K'];
    if (!funcs.includes(hwState.chordFunc)) hwState.chordFunc = funcs[0];
    wrap.innerHTML = '';
    funcs.forEach(f => {
        const btn = document.createElement('button');
        btn.className = 'func-btn' + (f === hwState.chordFunc ? ' active' : '');
        btn.textContent = f;
        btn.dataset.func = f;
        btn.addEventListener('click', () => {
            hwState.chordFunc = f;
            if (f === 'K') hwState.chordInv = '64';
            hwBuildFuncButtons(); hwBuildInvButtons();
        });
        wrap.appendChild(btn);
    });
}
function hwBuildInvButtons() {
    const wrap = document.getElementById('hw-inv-btns');
    if (!wrap) return;
    wrap.innerHTML = '';
    HW_INV_OPTIONS.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'inv-btn' + (o.id === hwState.chordInv ? ' active' : '');
        btn.textContent = o.label;
        btn.dataset.inv = o.id;
        btn.addEventListener('click', () => {
            if (hwState.chordFunc === 'K') { hwSetStatus('终止四六和弦（K）固定为 4/6', true); return; }
            hwState.chordInv = o.id;
            hwBuildInvButtons();
        });
        wrap.appendChild(btn);
    });
}
function hwSvgPoint(svg, clientX, clientY) {
    const rect = svg.getBoundingClientRect();
    const w = (svg.width && svg.width.baseVal) ? svg.width.baseVal.value : rect.width;
    const scale = w ? rect.width / w : 1;
    return { x: (clientX - rect.left) / scale, y: (clientY - rect.top) / scale };
}
let hwCurrentQuestion = '';
let hwCurrentExerciseIndex = -1;
function hwRenderQuestion() {
    const el = document.getElementById('hw-question');
    if (!el) return;
    if (hwCurrentQuestion) {
        el.style.display = 'block';
        el.innerHTML = '<strong>📝 题目：</strong>' + hwCurrentQuestion;
    } else {
        el.style.display = 'none';
        el.innerHTML = '';
    }
}
function hwOpenHomeworkEditor(questionText, exerciseIndex) {
    if (!appState.userInfo.saved) { alert('请先保存学生信息'); return; }
    hwCurrentQuestion = questionText || '';
    hwCurrentExerciseIndex = (typeof exerciseIndex === 'number') ? exerciseIndex : -1;
    hwResetState();
    hwBuildKeySelect();
    hwBuildFuncButtons();
    hwBuildInvButtons();
    document.getElementById('learn-content').style.display = 'none';
    document.getElementById('practice-content').style.display = 'none';
    document.getElementById('homework-content').style.display = 'block';
    appState.currentMode = 'homework';
    hwRenderQuestion();
    hwRender();
}
function hwSetMode(mode) {
    if (!hwState) return;
    hwState.mode = mode;
    hwState.tieStart = null;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    hwUpdateStatus();
}
function hwSetupHomeworkEvents() {
    // 顶部标签切换
    document.querySelectorAll('#homework-content .tb-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('#homework-content .tb-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('#homework-content .tb-panel').forEach(p => p.classList.remove('active'));
            const panel = document.querySelector('#homework-content .tb-panel[data-panel="' + tab.dataset.tab + '"]');
            if (panel) panel.classList.add('active');
            const t = tab.dataset.tab;
            if (t === 'edit') hwSetMode('note');
            else if (t === 'chord') hwSetMode('label');
        });
    });
    // 声部
    document.querySelectorAll('.voice-btn').forEach(btn => btn.addEventListener('click', () => {
        hwState.currentVoice = btn.dataset.voice;
        hwState.tieStart = null;
        document.querySelectorAll('.voice-btn').forEach(b => b.classList.toggle('active', b.dataset.voice === hwState.currentVoice));
        hwUpdateStatus();
    }));
    // 时值
    document.querySelectorAll('.dur-btn').forEach(btn => btn.addEventListener('click', () => {
        hwState.currentDuration = btn.dataset.dur;
        document.querySelectorAll('.dur-btn').forEach(b => b.classList.toggle('active', b.dataset.dur === hwState.currentDuration));
        hwUpdateStatus();
    }));
    // 模式（音符/休止/橡皮/连线）
    document.querySelectorAll('.mode-btn').forEach(btn => btn.addEventListener('click', () => hwSetMode(btn.dataset.mode)));
    // 调号
    document.getElementById('hw-key-select')?.addEventListener('change', e => {
        hwState.keyIndex = parseInt(e.target.value, 10);
        hwState.checkResults = null;
        hwState.chordFunc = HW_KEY_OPTIONS[hwState.keyIndex].major ? 'T' : 't';
        hwState.chordInv = 'none';
        hwBuildFuncButtons(); hwBuildInvButtons();
        hwRender();
    });
    // 拍号
    document.getElementById('hw-time-select')?.addEventListener('change', e => {
        hwSnapshot();
        hwState.timeSig = e.target.value;
        hwState.caret = null;
        hwRender();
    });
    // 操作条与小节
    document.getElementById('hw-add-measure-btn')?.addEventListener('click', hwAddMeasure);
    document.getElementById('hw-del-measure-btn')?.addEventListener('click', hwDeleteMeasure);
    document.getElementById('hw-play-btn')?.addEventListener('click', hwPlayScore);
    document.getElementById('hw-check-btn')?.addEventListener('click', hwRunCheck);
    document.getElementById('hw-export-btn')?.addEventListener('click', hwExportImage);
    document.getElementById('hw-undo-btn')?.addEventListener('click', hwUndo);
    document.getElementById('hw-clear-btn')?.addEventListener('click', hwClearAll);
    document.getElementById('hw-back-btn')?.addEventListener('click', backToTeaching);

    const scoreEl = document.getElementById('hw-score');
    if (scoreEl) {
        scoreEl.addEventListener('click', e => {
            const svg = hwState.ui.svg;
            if (!svg) return;
            const pt = hwSvgPoint(svg, e.clientX, e.clientY);
            const loc = hwLocate(pt.x, pt.y);
            if (!loc) return;
            const m = loc.measure, beat = loc.beat;
            if (hwState.mode === 'label') { hwPlaceChordLabel(m, beat); return; }
            if (hwState.mode === 'tie') { hwHandleTieClick(m, beat); return; }
            if (hwState.mode === 'erase') { hwDeleteAt(m, beat); return; }
            if (hwState.mode === 'rest') { hwInsertRestAt(m, beat); return; }
            hwState.caret = { m: m, beat: beat };
            hwRender();
        });
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeChapterProgress();
    restoreLastUserInfo();
    loadProgress();
    activityStart();
    document.getElementById('school').value = appState.userInfo.school;
    document.getElementById('major-class').value = appState.userInfo.majorClass;
    document.getElementById('name').value = appState.userInfo.name;
    document.getElementById('teacher').value = appState.userInfo.teacher;
    document.getElementById('save-user').addEventListener('click', () => {
        const [school, majorClass, name, teacher] = ['school', 'major-class', 'name', 'teacher'].map(id => document.getElementById(id).value.trim());
        if (!school || !majorClass || !name || !teacher) { alert('请填写所有信息'); return; }
        const newKey = [school, majorClass, name].join('|');
        const oldKey = currentUserKey();
        const switched = !!(oldKey && oldKey !== newKey);
        if (switched) saveProgress(); // 先把旧用户的数据保存到旧用户的存储
        appState.userInfo = { school, majorClass, name, teacher, saved: true };
        if (switched) {
            const raw = localStorage.getItem(storageKeyForUser(newKey));
            if (raw) loadProgress(); // 已有该用户的数据：加载
            else resetAllLearningData(); // 新用户：全部归零
        }
        saveProgress();
        updateStats();
        renderZhengSanHub();
        alert(switched ? '已切换到用户：' + name : '信息已保存');
    });
    document.querySelectorAll('.practice-mode-btn').forEach(btn => btn.addEventListener('click', () => handleModeSelection(btn.dataset.mode)));
    document.getElementById('back-from-zheng-san')?.addEventListener('click', () => pageManager.switchToPage('home-page'));
    document.getElementById('back-home-learn')?.addEventListener('click', () => { if (appState.returnTargetPage) pageManager.switchToPage(appState.returnTargetPage); else pageManager.switchToPage('home-page'); });
    document.getElementById('back-to-chapter-list')?.addEventListener('click', () => { pageManager.switchToPage('learn-page'); });
    document.getElementById('back-to-teach-btn')?.addEventListener('click', () => {
        const mode = appState.currentMode;
        if (mode === 'triad-select' || mode === 'fourpart-select') backToTeaching();
        else backToPracticeTypeSelector();
    });
    document.getElementById('submit-practice-btn')?.addEventListener('click', () => {
        if (appState.fourPartSession) { submitFourPartAnswer(); return; }
        if (appState.triadSession) submitTriadAnswer();
        else submitPracticeAnswer();
    });
    document.getElementById('next-practice-btn')?.addEventListener('click', () => {
        const fp = appState.fourPartSession;
        if (fp) { fp.currentIndex++; loadFourPartQuestion(); return; }
        const ts = appState.triadSession;
        if (ts && ts.type === 'build') { ts.currentIndex++; loadTriadQuestion(); }
        else nextPracticeQuestion();
    });
    document.getElementById('reset-practice-btn')?.addEventListener('click', () => {
        if (appState.fourPartSession) { resetFourPartAnswer(); return; }
        if (appState.triadSession) resetTriadAnswer();
        else resetPractice();
    });
    document.getElementById('practice-export-btn')?.addEventListener('click', practiceExportImage);
    document.getElementById('export-preview-close')?.addEventListener('click', () => {
        const modal = document.getElementById('export-preview-modal');
        const img = document.getElementById('export-preview-img');
        if (modal) modal.style.display = 'none';
        if (img) { URL.revokeObjectURL(img.src); img.removeAttribute('src'); }
    });
    document.getElementById('analysis-close-btn')?.addEventListener('click', () => {
        const modal = document.getElementById('analysis-modal');
        if (modal) modal.style.display = 'none';
    });
    document.getElementById('play-question-btn')?.addEventListener('click', () => {
        const fp = appState.fourPartSession;
        if (fp && fp.currentQuestion) {
            const notes = fp.currentQuestion.upperNotes || fp.currentQuestion.answerNotes || [];
            if (notes.length) playChord(notes);
            return;
        }
        const ts = appState.triadSession;
        if (ts && ts.type === 'listen') { triadListenRepeatPlay(); return; }
        if (ts && ts.currentQuestion) playChord(ts.currentQuestion.notes);
        else if (appState.levelSession.currentQuestion) playChord(appState.levelSession.currentQuestion.chordNotes);
    });
    document.getElementById('triad-type-selector')?.addEventListener('click', e => {
        const btn = e.target.closest('.triad-type-btn');
        if (!btn) return;
        const type = btn.dataset.type;
        if (type === 'listen' || type === 'build') startTriadPractice(type);
        else startFourPartPractice(type);
    });
    document.getElementById('triad-options')?.addEventListener('click', e => {
        const btn = e.target.closest('.triad-option-btn');
        if (!btn) return;
        if (btn.dataset.arrange) selectArrangeOption(btn.dataset.arrange);
        else if (btn.dataset.quality) selectTriadOption(btn.dataset.quality);
    });
    document.getElementById('fourpart-voice')?.addEventListener('click', e => {
        const btn = e.target.closest('.voice-btn');
        if (btn) selectFourPartVoice(btn.dataset.voice);
    });
    document.getElementById('triad-random-btn')?.addEventListener('click', () => {
        const ts = appState.triadSession;
        if (ts && ts.type === 'listen') triadListenRandomPlay();
    });
    document.getElementById('triad-melodic-btn')?.addEventListener('click', triadListenMelodicPlay);
    document.getElementById('show-answer-btn')?.addEventListener('click', triadListenShowAnswer);
    document.getElementById('next-level-btn')?.addEventListener('click', nextLevel);
    document.getElementById('retry-level-btn')?.addEventListener('click', retryLevel);
    document.getElementById('back-to-course-btn')?.addEventListener('click', () => pageManager.switchToPage(appState.returnTargetPage || 'learn-page'));
    document.querySelectorAll('.range-level').forEach(btn => btn.addEventListener('click', () => { const lvl = parseInt(btn.dataset.level); if (keyRanges[lvl].unlocked) { appState.currentLevel = lvl; updateRangeLevelsUI(); } }));
    document.querySelectorAll('.zs-phase-tab').forEach(tab => tab.addEventListener('click', () => { document.querySelectorAll('.zs-phase-tab').forEach(t => t.classList.remove('active')); tab.classList.add('active'); appState.currentPhase = tab.dataset.phase; renderZhengSanHub(); }));
    const addNoteBtn = document.getElementById('staff-add-note-btn');
    const clearBtn = document.getElementById('staff-clear-btn');
    const staffCanvas = document.getElementById('blank-staff-canvas');
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', () => {
            const noteLabels = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
            const x = 50 + (appState.staffNotes.length % 6) * 36 + (Math.random() * 8);
            const y = 34 + (Math.random() * 60);
            addStaffNote(Math.min(x, 250), Math.min(y, 120), noteLabels[Math.floor(Math.random() * noteLabels.length)]);
        });
    }
    if (clearBtn) clearBtn.addEventListener('click', clearStaffNotes);
    if (staffCanvas) {
        staffCanvas.addEventListener('click', (event) => {
            const rect = staffCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            addStaffNote(x, y, '♪');
        });
    }
    initAudio();
    updateStats();
    renderZhengSanHub();
    updateAllClocks();
    hwSetupHomeworkEvents();
    if (document.getElementById('pianoKeyboard')) buildNewPiano();
    window.refreshPianoLayout = () => { buildNewPiano(); initSlidePlay(); };

    // 钢琴显示/隐藏切换（底部滑出，展开时教学内容画布同步收缩）
    const pianoToggleBtn = document.getElementById('pianoToggleBtn');
    const pianoWrapper = document.getElementById('pianoScrollWrapper');
    const learnExercisePage = document.querySelector('#learn-page .exercise-page');
    if (pianoToggleBtn && pianoWrapper) {
        pianoToggleBtn.addEventListener('click', () => {
            const isHidden = pianoWrapper.classList.contains('piano-hidden');
            if (isHidden) {
                pianoWrapper.classList.remove('piano-hidden');
                pianoToggleBtn.textContent = '收起';
                if (learnExercisePage) learnExercisePage.classList.add('piano-open');
            } else {
                pianoWrapper.classList.add('piano-hidden');
                pianoToggleBtn.textContent = '钢琴';
                if (learnExercisePage) learnExercisePage.classList.remove('piano-open');
            }
        });
    }
});