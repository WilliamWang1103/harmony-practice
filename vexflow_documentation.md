# VexFlow 五线谱渲染原理与实现方法

> 本文档基于 `vexflow_practice_demo.html`（约 2778 行）的真实代码，梳理其**静态**与**动态**五线谱的完整实现流程。该页面是一个可交互的「四部和声写作练习」工具：大谱表（高音谱 + 低音谱）、S/A/T/B 四声部、可点击写入音符、支持连线/三连音/等音/和弦标记/自动检查/播放/导出。

## 1. 概述

`vexflow_practice_demo.html` 使用**本地经典直连 API**（`lib/vexflow-min.js`，即 `new VF.Renderer` / `new VF.Stave` / `new VF.StaveNote` / `new VF.Voice` 等），**而非** `Vex.Flow.Factory` 便捷 API。渲染后端为 **SVG**（`VF.Renderer.Backends.SVG`）。

核心特性一览：

- **静态渲染**：大谱表、调号、拍号、四声部音符、临时升降号、符杠（Beam）、三连音（Tuplet）、延音线（StaveTie）、小节线样式、和弦功能标记、调号标签。
- **动态交互**：点击拍位写入/删除音符、橡皮/连线/标记/选择四种编辑模式、三连音写入、等音切换、小节增删/折行、小节线样式、钢琴键盘输入、Web Audio 播放 + 光标动画、撤销、用户门禁、导出 PNG/PDF。

## 2. 技术栈与依赖

| 项目 | 说明 |
| --- | --- |
| VexFlow | 本地 `lib/vexflow-min.js`（经典直连 API，SVG 后端） |
| 框架 | 纯原生 JavaScript，无第三方框架 |
| 音频 | Web Audio API（`AudioContext` / `OscillatorNode` / `GainNode` / `BiquadFilterNode`） |
| 存储 | `localStorage`（保存用户信息） |
| 导出 | Canvas 合成 PNG；`window.print()` 导出 PDF |

## 3. 核心数据结构

### 3.1 全局常量（第 738–787 行）

```javascript
const VOICES = ['S', 'A', 'T', 'B'];                              // 四声部
const VOICE_NAMES = { S:'女高', A:'女低', T:'男高', B:'男低' };
const VOICE_COLORS = { S:'#d32f2f', A:'#1976d2', T:'#388e3c', B:'#f57c00' };
const DUR_BEATS = { w:4, hd:3, h:2, qd:1.5, q:1, '8d':0.75, '8':0.5, '16':0.25 };
```

布局常量：

```javascript
const STAVE_X = 40;        // 每行谱表起始 x
const TREBLE_Y = 30;       // 高音谱表 y
const BASS_Y = 130;        // 低音谱表 y
const SYSTEM_HEIGHT = 250; // 每「行」（系统）高度
const CHORD_LABEL_OFFSET = 240; // 和弦标记基线 y 偏移
```

`KEY_OPTIONS`（第 754–781 行）定义了 14 个大小调，每项含 `letter`（调号主音）、`acc`（♯/♭）、`major`、`spec`（VexFlow 调号字符串）、`sig`（中文标签）。

### 3.2 小节与音符数据模型

```javascript
function newMeasure() { return { voices: { S:[], A:[], T:[], B:[] }, chordLabels: [] }; }
```

- **小节**：`{ voices: {S:[],A:[],T:[],B:[]}, chordLabels: [] }`
- **音符**：`{ beat, dur, pitch, rest, tuplet? }`（`pitch` 形如 `"c#/4"`；`tuplet` 为 `{ id, index }`）
- **和弦标记**：`{ beat, func, inv }`（`func` ∈ T/S/D/K，`inv` ∈ none/6/64/7/56/34/2）

### 3.3 全局状态 `state`（第 791–816 行）

```javascript
const state = {
  currentVoice: 'S', currentDuration: 'q', mode: 'note',
  timbre: 'piano', playSpeed: 100, keyIndex: 0, timeSig: '4/4',
  endBarType: 'boldDoubleRight', measureBarTypes: {},
  caret: null,          // { m, beat } 写入光标
  tieStart: null,       // { voice, m, beat } 连线起点
  tripletArmed: false, tripletPending: null,
  chordFunc: 'T', chordInv: 'none', checkResults: null,
  selectedBarline: null, selNote: null,
  measures: [ /* 默认 4 个空白小节 */ ],
  ties: [], manualBreaks: new Set(), undoStack: [],
  user: { name:'', klass:'', teacher:'', lastEdit:null },
  ui: { svg:null, systems:[], measureGeom:[] }   // 渲染后缓存的几何信息
};
```

`state.ui` 是**渲染结果缓存**，供后续交互（命中检测、光标/选区/和弦标记/播放光标绘制）复用：

- `ui.systems`：每行的纵向范围 `{ y1, y2, measures:[] }`
- `ui.measureGeom[mi]`：每小节的 `{ x1, x2, beatXs, sysTop, sysBottom, chordY }`

## 4. 静态五线谱渲染（`render()` 内部流程）

`render()`（第 927–1157 行）是唯一的绘制入口。**任何状态变更都通过调用 `render()` 全量重绘**（`container.innerHTML = ''` 后重建 SVG），无增量更新，逻辑简单可靠。完整流程：

### 4.1 折行计算 `computeSystems()`（第 859–871 行）

```javascript
function computeSystems() {
  // 默认每 4 小节自动折一行；也可通过 manualBreaks 手动指定
  if ((i + 1) % 4 === 0 || state.manualBreaks.has(i)) { /* 断行 */ }
}
```

每「行」（system）是若干小节的横向排列，行与行之间纵向堆叠。

### 4.2 画布尺寸自适应（第 939–956 行）

```javascript
const width  = Math.max(container.clientWidth - 16, 760);
const height = systems.length * SYSTEM_HEIGHT + 50;
```

- **按内容密度分配宽度**：`naturalMeasureWidth(mi) = 60 + 20 * measureNoteCount(mi)`，音符越多的小节越宽。
- 计算总宽 `effWidth = STAVE_X + clefOffset + effNoteArea + 30`，超出容器时横向滚动。
- `renderer.resize(effWidth, height)` 后取得 SVG 上下文 `ctx`。

### 4.3 逐行构建谱表（第 965–1012 行）

```javascript
const treble = new VF.Stave(x, sysTrebleY, mWidth);
const bass   = new VF.Stave(x, sysBassY,   mWidth);
if (mi === sys.start) {   // 仅行首小节
  treble.addClef('treble').addKeySignature(keySpec).addTimeSignature(state.timeSig);
  bass  .addClef('bass')  .addKeySignature(keySpec).addTimeSignature(state.timeSig);
}
treble.setBegBarType(VF.Barline.type.NONE).setEndBarType(VF.Barline.type.NONE);
bass  .setBegBarType(VF.Barline.type.NONE).setEndBarType(VF.Barline.type.NONE);
```

**绘制顺序（关键）**：

1. **先画谱线与谱表连接线**（第 995–1012 行）：`treble/bass.setContext(ctx).draw()`；行首用 `StaveConnector(...).setType('brace')`（花括号）与 `setType('singleLeft')`（左竖线）；每小节末尾用 `StaveConnector(...).setType(rightType)` 画右小节线（`singleRight`/`double`/`boldDoubleRight`）。

### 4.4 构建「幽灵音符网格」定位拍位（第 1017–1022 行）

```javascript
const gridTreble = new VF.Voice({ num_beats: beats, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
const gridBass   = new VF.Voice({ num_beats: beats, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
for (let i = 0; i < gridCount; i++) {          // gridCount = beats * 4
  gridTreble.addTickable(new VF.GhostNote('16'));
  gridBass  .addTickable(new VF.GhostNote('16'));
}
```

`GhostNote`（幽灵音符）是**不可见但参与排版**的占位符。每个四分音符位放 4 个十六分幽灵音符，从而获得**每个十六分音符的精确 x 坐标**，用于光标定位、命中检测、和弦标记对齐。渲染后：

```javascript
const beatXs = gridTreble.getTickables().map(t => t.getAbsoluteX());
state.ui.measureGeom[mi] = { x1, x2, beatXs, sysTop, sysBottom, chordY };
```

### 4.5 四声部真实音符构建（第 1027–1098 行）

```javascript
const voice = new VF.Voice({ num_beats: beats, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
// 按 beat 升序、三连音 index 排序
notes.forEach(nt => {
  if (nt.rest) {
    note = new VF.StaveNote({ keys:[restKey], duration: restDuration(nt.dur), clef });
  } else {
    note = new VF.StaveNote({ keys:[nt.pitch], duration: nt.dur, clef });
    if (symbol) note.addAccidental(0, new VF.Accidental(symbol));   // 临时升降号
    note.setStemDirection(v==='S'||v==='T' ? VF.Stem.UP : VF.Stem.DOWN); // 符干方向
    note.setStyle({ fillStyle: VOICE_COLORS[v], strokeStyle: VOICE_COLORS[v] }); // 声部着色
    if (!nt.tuplet) beamNotes[v].push(note);
  }
  voice.addTickable(note);
});
```

- **符干方向**：S、T 向上，A、B 向下，符合四声部记谱规范。
- **声部着色**：`setStyle` 让四声部以红/蓝/绿/橙区分。
- **临时升降号**：由调号与同小节前后变音规则预先算好（见 4.6）。

### 4.6 临时升降号预处理（第 1027–1051 行）

```javascript
const keyAccMap = keySignatureAccidentals();  // 调号内 letter → 期望变音数
// 遍历本谱表（高音:S,A / 低音:T,B）按时间排序的事件
// 若某音与调号不一致、且与「本小节已出现过的同音名」变音不同，则记入 accNeeded[staff][v+':'+beat]
```

`accNeeded` 决定每个音符是否显示 `♯`/`♭`/`♮`（`accValueToSymbol`：0→`n`，正→`#`，负→`b`）。

### 4.7 排版与绘制（第 1093–1113 行）

```javascript
const justify = s.treble.getNoteEndX() - s.treble.getNoteStartX() - 6;
const formatter = new VF.Formatter();
formatter.joinVoices([realVoices.S, realVoices.A])     // 高音谱两声部对齐
       .joinVoices([realVoices.T, realVoices.B]);      // 低音谱两声部对齐
formatter.format([realVoices.S, realVoices.A, realVoices.T, realVoices.B, gridTreble, gridBass], justify);

realVoices.S.draw(ctx, s.treble);
realVoices.A.draw(ctx, s.treble);
realVoices.T.draw(ctx, s.bass);
realVoices.B.draw(ctx, s.bass);
gridTreble.draw(ctx, s.treble);
gridBass.draw(ctx, s.bass);
```

`joinVoices` 让同一谱表两声部共享对齐；`format` 把幽灵音符一并纳入排版，保证拍位坐标与真实音符一致。

### 4.8 延音线、三连音、符杠（第 1127–1137 行）

```javascript
new VF.StaveTie({ first_note:a, last_note:b, first_indices:[0], last_indices:[0] }).setContext(ctx).draw();
tupletsToDraw.forEach(t => t.setContext(ctx).draw());
beamsToDraw.forEach(b => b.setContext(ctx).draw());
```

三连音由 `new VF.Tuplet(group, { ratioed:true, num_notes:3, notes_occupied:2 })` 生成；符杠由 `VF.Beam.generateBeams(beamNotes[v], { stem_direction: dir })` 生成。

### 4.9 渲染后叠加层（第 1142–1152 行）

VexFlow 画完乐谱本体后，用**原生 SVG DOM API** 在同一 `<svg>` 上追加交互叠加层：

```javascript
state.ui.svg = container.querySelector('svg');
state.ui.noteObjs = noteObjs;   // 缓存 note 对象供连线/选区使用
drawCaret();                    // 光标（粉色虚线竖线）
drawSelection();                // 选中小节线（橙色）/选中音符（紫色框）
drawChordBaselines(svg, n);     // 和弦标记基线（虚线）
drawKeyLabel(svg);              // 调号标签（左上角白框字母）
drawChordLabels(svg);           // T/S/D 功能标记 + 转位数字
drawCheckResults(svg);          // ✓/✗ 检查结果
updateStatus();
scrollToCaret();
```

## 5. 动态/交互实现

### 5.1 写入模式（`mode`）

`setMode()` 统一设置模式并高亮按钮。`mode` 取值与行为：

| mode | 含义 | 点击谱面行为 |
| --- | --- | --- |
| `note` | 音符 | 设定光标拍位；三连音武装时收集音高 |
| `rest` | 休止 | `insertRestAt(m, beat)` |
| `erase` | 橡皮 | `deleteAt(m, beat)` 删除该拍覆盖的音符/标记 |
| `tie` | 连线 | `handleTieClick(m, beat)` 连点两音形成延音线 |
| `label` | 标记 | `placeChordLabel(m, beat)` 放置和弦功能标记 |
| `select` | 选择 | 点击音符选中（紫色框），供等音切换 |

### 5.2 命中检测与坐标换算（第 2266–2304 行）

```javascript
function locate(x, y) {
  // 1) 找到 y 所属的「行」sys
  // 2) 若 x 接近某小节线 ±10px → 判定为选中小节线
  // 3) 否则找到所属小节 mi，用 nearestIdx(g.beatXs, x) 得到最近拍位 idx
  return { type:'beat', measure: mi, beat: idx * 0.25 };  // 精确到十六分音符
}
```

`beat` 以四分音符为单位（`0.25` = 十六分），是整个交互系统的坐标基石。

### 5.3 音符写入 `insertNote(pitch)`（第 1428–1456 行）

1. `splitDuration(caret.m, caret.beat, currentDuration)` 将时值按小节边界自动拆分（跨小节自动用延音线连接）。
2. 删除与新音符重叠的旧音符（`noteOverlaps`）。
3. 写入音符、自动补 `addTie` 延音线。
4. 光标推进到下一拍；本小节写满则提示「加小节」。

### 5.4 时值拆分 `splitDuration()`（第 876–900 行）

以「单元时值」`UNIT_DURS`（`[['w',16],['hd',12],...]`）为最小单位，把任意时值拆成跨小节若干段，返回 `{ m, beat, dur }[]`。

### 5.5 三连音（第 1529–1560 行）

- 点「三连音」按钮 → `tripletArmed = true`
- 点谱面选定起始拍 → `tripletPending = { m, beat, notes:[] }`
- 点 3 个琴键/音高 → `commitTriplet()` 以 `{ id, index }` 写入
- 渲染时 `noteSpan` 对 tuplet 音符按 `beat + dur*2` 计算跨度；`VF.Tuplet` 以 `notes_occupied:2` 表示「3 音占 2 个单位时值」

### 5.6 等音切换（第 2026–2038 行）

选中音符后按 `↑`/`↓` 或点「♯升号/♭降号」，`cycleEnharmonic()` 在 `enharmonicCandidates(midi)`（同一音高的候选拼写，升号优先排序）间循环，实现 `c#/4 ↔ db/4` 等拼写切换。

### 5.7 小节管理 / 折行 / 小节线

- `addMeasure()` / `deleteMeasure()`：增减末尾小节（`trimTrailingEmptyMeasures` 自动清理空小节，至少保留 4 小节）。
- `toggleLineBreak()`：在选中小节线处强制折行（`manualBreaks` Set）。
- 小节线样式：先点小节线选中（橙色），再点「单竖线/双竖线/终止线」→ 写 `measureBarTypes[mi]` 或末小节 `endBarType`。

### 5.8 和弦标记（第 1562–1570、1307–1360 行）

- 「标记」模式点拍位放置 `T/S/D/K`（大调 T/S/D，小调 t/s/D）+ 转位数字。
- 渲染时 `drawChordLabelText()` 用 SVG `<text>` 在 `chordY` 画功能字母 + 转位数字（上标/下标）。
- `K`（终止四六和弦）固定转位 `64`。

### 5.9 和弦自动检查（第 2144–2264 行）

`runCheck()` 对每个和弦标记调用 `checkChord()`，检查项：

1. **四声部完整性**、能否识别为和弦（`identifyChord`：三/七和弦 + 性质）。
2. **声部交叉/间距**：`S<A || A<T || T<B` → 交叉；`S-A>12`、`A-T>12`、`T-B>24` → 间距超标。
3. **低音**：与 `expectedBassPc(func, inv)` 不符 → 低音错。
4. **标记匹配**：`checkLabelMatch` 校验功能 + 转位一致。
5. **重复音规则**：六和弦不重复三音、四六和弦应重复五音、原位不重复导音。
6. **连接**：相邻和弦间平行五度/平行八度。

结果以 `✓`/`✗` 画在谱面，并汇总到 `#check-summary`。

### 5.10 播放（Web Audio，第 2417–2541 行）

```javascript
const TIMBRES = {
  piano:   { wave:'triangle', attack:0.01, level:0.25, decay:1.1 },
  strings: { wave:'sawtooth', attack:0.12, level:0.14, sustain:true, release:0.15, filter:2400, vibrato:{rate:5, depth:7} },
  horn:    { wave:'sawtooth', attack:0.06, level:0.15, sustain:true, release:0.12, filter:950,  vibrato:{rate:4.5, depth:6} },
  voice:   { wave:'sawtooth', attack:0.08, level:0.14, sustain:true, release:0.12, formants:[700,1150], vibrato:{rate:5, depth:6} }
};
```

- `playTone()`：Oscillator + Gain + 可选低通滤波/共振峰/颤音（LFO 调制 `osc.detune`），用 `exponentialRamp` 做包络。
- `playScore()`：按 `measure * beats + beat` 计算起始时间，用 `requestAnimationFrame` 驱动蓝色播放光标（`updatePlaybackCursor`）。

### 5.11 撤销 / 重置（第 1363–1371、1572–1605 行）

- 写操作前 `snapshot()` 把 `measures/ties/timeSig` 深拷贝进 `undoStack`（上限 50 步）。
- `undo()` 弹出栈顶恢复；`resetPractice()` 恢复到 4 小节空白谱。

### 5.12 用户门禁（第 1622–1710 行）

- 首次进入弹出必填「姓名/学号」模态框（`openUserModal(true)`）。
- `requireUser()` 在所有谱面/琴键操作前校验，未填写则弹框拒绝。
- 用户信息存 `localStorage`（键 `harmony_practice_user`），含 `lastEdit` 写作时间。

### 5.13 导出（第 1731–1832 行）

- **PNG**：`XMLSerializer` 序列化谱面 SVG → `Image` → 离屏 Canvas 绘制表头 + 谱面 → `canvas.toBlob` 下载。
- **PDF**：`buildPrintStage()` 把表头 + SVG 填进 `#export-stage`，`window.print()` 走「另存为 PDF」。

## 6. 音高拼写与等音算法

音高内部统一表示为 VexFlow 字符串 `"c#/4"`（音名 + `#`/`b` + 八度）。相关函数：

| 函数 | 作用 |
| --- | --- |
| `parsePitch(p)` | 字符串 → `{ pc, midi }` |
| `spellFrom(midi, letter, acc)` | MIDI → 指定音名的 `{ letter, acc, octave, pitch }` |
| `enharmonicCandidates(midi)` | 同一 midi 的候选拼写（±2 变音内），升号优先 |
| `keySignatureAccidentals()` | 当前调号 → `letter → 期望变音数` 映射 |
| `spellDefault(midi)` | 黑键默认拼写：优先与调号一致，否则升号优先 |
| `cycleEnharmonic(pitch, dir)` | 候选拼写间循环切换（等音） |

## 7. 关键设计要点与注意事项

1. **全量重绘模型**：所有变更都触发 `render()` 重建整个 SVG，无增量更新，代码简洁；对教学场景谱面规模完全可接受。
2. **幽灵音符网格**：用 `GhostNote` 精确定位到十六分音符，是光标、命中检测、和弦标记对齐的统一坐标来源。
3. **两遍绘制**：先画谱线/连接线，再画音符，最后叠加原生 SVG 交互层——分层清晰。
4. **`joinVoices` 作用域**：仅同谱表两声部 `joinVoices`（S+A、T+B），不跨谱表合并。
5. **`setMode(VF.Voice.Mode.SOFT)`**：让不足拍数的 Voice 也能正常排版。
6. **错误处理**：`render()` 整体 `try/catch`，出错时 `setStatus('❌ 渲染出错：' + e.message, true)`。
7. **依赖检查**：先判断 `window.Vex && window.Vex.Flow`，未加载则提示「未找到 lib/vexflow-min.js」。
8. **响应式**：`window.addEventListener('resize', render)`。

## 8. 函数索引速查表

### 渲染相关

| 函数 | 行号 | 说明 |
| --- | --- | --- |
| `computeSystems()` | 859 | 折行计算（4 小节/行 + 手动折行） |
| `render()` | 927 | 唯一渲染入口，全量重绘 |
| `drawCaret()` | 1159 | 写入光标 |
| `scrollToCaret()` | 1198 | 光标滚动到可视区 |
| `drawSelection()` | 1210 | 小节线/音符选中态 |
| `drawChordBaselines()` | 1254 | 和弦标记虚线基线 |
| `drawKeyLabel()` | 1270 | 调号标签 |
| `drawChordLabels()` / `drawCheckResults()` | 1337 / 1349 | 和弦标记 / 检查结果 |

### 数据操作

| 函数 | 行号 | 说明 |
| --- | --- | --- |
| `snapshot()` | 1363 | 撤销快照 |
| `insertNote()` / `insertRestAt()` / `deleteAt()` | 1428 / 1458 / 1481 | 音符/休止写入/删除 |
| `handleTieClick()` / `toggleTie()` | 1492 / 1420 | 延音线 |
| `commitTriplet()` | 1529 | 三连音提交 |
| `placeChordLabel()` | 1562 | 放置和弦标记 |
| `undo()` / `resetPractice()` / `clearAll()` | 1572 / 1586 / 1608 | 撤销/重置/清空 |
| `addMeasure()` / `deleteMeasure()` / `toggleLineBreak()` | 1834 / 1840 / 1878 | 小节与折行 |

### 算法相关

| 函数 | 行号 | 说明 |
| --- | --- | --- |
| `splitDuration()` | 876 | 时值跨小节拆分 |
| `locate()` / `nearestIdx()` | 2273 / 2267 | 点击坐标 → 拍位 |
| `parsePitch()` | 1895 | 音高解析 |
| `spellFrom()` / `enharmonicCandidates()` / `spellDefault()` | 1914 / 1932 / 1988 | 音名拼写/等音 |
| `cycleEnharmonic()` | 2009 | 等音循环切换 |
| `identifyChord()` | 2058 | 和弦识别 |
| `checkChord()` / `runCheck()` | 2144 / 2215 | 和弦检查 |

### 音频 / 钢琴 / 导出

| 函数 | 行号 | 说明 |
| --- | --- | --- |
| `buildPiano()` / `onPianoKey()` | 2350 / 2398 | 钢琴键盘 |
| `pitchFromMidiKey()` | 2376 | 琴键 → 音名（调号感知拼写） |
| `getAudioContext()` / `freqOf()` / `playTone()` | 2427 / 2432 / 2441 | 音频引擎 |
| `playScore()` / `updatePlaybackCursor()` | 2516 / 2497 | 播放 + 光标动画 |
| `exportAsImage()` / `exportAsPdf()` | 1733 / 1804 | 导出 |

## 总结

`vexflow_practice_demo.html` 采用**经典直连 API + SVG 后端 + 全量重绘**架构，通过「幽灵音符网格」统一了静态排版与动态交互的坐标体系，配合原生 SVG 叠加层实现光标、选区、和弦标记、检查结果、播放光标等丰富动态效果，再结合 Web Audio API 完成播放、Canvas 完成导出，构建出一个完整的四部和声写作练习工具。
