// ==================== 题库与考试模块（学生端只答题，老师端导入/编辑） ====================
// 1. 题库使用全局 localStorage（key: harmony_question_bank），不分学生、老师端共享；
// 2. 学生答题结果按用户隔离（key: harmony_quiz_records_学校|班级|姓名）；
// 3. 依赖 app.js 的全局 pageManager / appState / textbookChapters。

const Quiz = (function () {
    const BANK_KEY = 'harmony_question_bank';
    const RECORD_PREFIX = 'harmony_quiz_records_';
    const TYPES = { choice: '选择题', judge: '判断题', link: '连接题', analysis: '分析题', harmonize: '配和声' };

    let bank = [];            // 题库数组
    let manageChapter = 4;    // 管理页当前章节
    let session = null;       // 答题会话 { chapterId, questions, index, answers, submitted }
    let editState = null;     // 编辑弹窗状态 { id, imageDataUrl, judgeAnswer }

    // ==================== 工具 ====================
    function escapeHtml(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    function genId() {
        return 'q' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    }
    function chapters() {
        return (typeof textbookChapters !== 'undefined') ? textbookChapters : [];
    }
    function chapterTitle(id) {
        const ch = chapters().find(c => Number(c.id) === Number(id));
        return ch ? ch.title : ('第' + id + '章');
    }
    function $(id) { return document.getElementById(id); }
    function recordKey() {
        const ui = (typeof appState !== 'undefined' && appState.userInfo) ? appState.userInfo : {};
        const parts = [ui.school, ui.majorClass, ui.name].map(s => (s || '').trim());
        return parts.every(p => p) ? (RECORD_PREFIX + parts.join('|')) : '';
    }

    // ==================== 存储 ====================
    function loadBank() {
        try {
            const raw = localStorage.getItem(BANK_KEY);
            if (raw) {
                bank = JSON.parse(raw);
            } else if (typeof window.__BANK_DATA__ !== 'undefined' && Array.isArray(window.__BANK_DATA__)) {
                bank = window.__BANK_DATA__.slice(); // 学生端无本地数据时，加载内置题库
            } else {
                bank = [];
            }
        } catch (e) { bank = []; }
        if (!Array.isArray(bank)) bank = [];
    }
    function saveBank() {
        localStorage.setItem(BANK_KEY, JSON.stringify(bank));
    }

    // 导出题库为 bank-data.js（老师提交到代码库后，学生端即可加载到最新题库）
    function exportBankFile() {
        if (!bank.length) { alert('题库为空，无法导出'); return; }
        const data = 'window.__BANK_DATA__ = ' + JSON.stringify(bank) + ';\n';
        downloadText(data, 'bank-data.js', 'text/javascript');
        setHint('✅ 已导出 bank-data.js，请用它覆盖项目根目录的同名文件并提交推送，学生端即可看到最新题库');
    }

    // ==================== docx 解析 ====================
    // 把 docx 解析为段落块：[{ text, images: [dataUrl] }]
    async function parseDocxToBlocks(file) {
        if (typeof JSZip === 'undefined') throw new Error('JSZip 未加载');
        const zip = await JSZip.loadAsync(file);
        const docXml = await zip.file('word/document.xml').async('string');

        // 解析 relationships：rId -> media 路径
        let ridMap = {};
        try {
            const relsXml = await zip.file('word/_rels/document.xml.rels').async('string');
            const rdoc = new DOMParser().parseFromString(relsXml, 'application/xml');
            Array.from(rdoc.getElementsByTagName('Relationship')).forEach(rel => {
                ridMap[rel.getAttribute('Id')] = rel.getAttribute('Target');
            });
        } catch (e) { }

        const doc = new DOMParser().parseFromString(docXml, 'application/xml');
        const ps = doc.getElementsByTagName('w:p');
        const blocks = [];
        for (const p of ps) {
            let text = '';
            Array.from(p.getElementsByTagName('w:t')).forEach(t => { text += (t.textContent || ''); });
            text = text.replace(/\u00a0/g, ' ').trim();

            const imgDefs = [];
            Array.from(p.getElementsByTagName('a:blip')).forEach(b => {
                const rid = b.getAttribute('r:embed');
                const target = ridMap[rid];
                if (!target) return;
                const relPath = target.replace(/^\//, '').replace(/^word\//, '');
                const path = 'word/' + relPath;
                const ext = (relPath.split('.').pop() || 'png').toLowerCase();
                const mime = ext === 'png' ? 'image/png' : (ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/gif');
                const f = zip.file(path);
                if (f) imgDefs.push({ mime, file: f });
            });
            const imgUrls = [];
            for (const im of imgDefs) {
                try {
                    const base64 = await im.file.async('base64');
                    imgUrls.push('data:' + im.mime + ';base64,' + base64);
                } catch (e) { }
            }

            if (text || imgUrls.length) blocks.push({ text, images: imgUrls });
        }
        return blocks;
    }

    // 解析题型标题中的"每题分值"（如"每小题2分/每题10分/40分"）
    function parseSectionScore(text) {
        const m1 = text.match(/(?:每小题|每题|每[小题])\s*(\d+(?:\.\d+)?)\s*分/);
        if (m1) return parseFloat(m1[1]);
        const m2 = text.match(/(\d+(?:\.\d+)?)\s*分/);
        if (m2) return parseFloat(m2[1]);
        return null;
    }

    function makeQuestion(chapterId, type, score, text) {
        let answer;
        if (type === 'judge') answer = true;
        else if (type === 'analysis') answer = { key: '', measures: ['', '', '', ''] };
        else answer = '';
        return {
            id: genId(), chapter: Number(chapterId), type, score: score || 2,
            text: text || '', image: '', options: [], answer, answerImage: ''
        };
    }

    // 解析试题：识别题型标题 + 题干 + 选项 + 图片
    function parseQuestions(blocks, chapterId) {
        const questions = [];
        let section = null;
        let sectionScore = 2;
        let current = null;

        for (const b of blocks) {
            const text = b.text;

            // 题型标题行：一、选择题 / 二、判断题 ...
            if (/^[一二三四五六七八九十]+[、.．]\s*/.test(text) && /(选择题|判断题|连接题|分析题|配和声|填空)/.test(text)) {
                if (text.includes('选择题')) section = 'choice';
                else if (text.includes('判断题')) section = 'judge';
                else if (text.includes('连接题')) section = 'link';
                else if (text.includes('分析题')) section = 'analysis';
                else if (text.includes('配和声')) section = 'harmonize';
                else section = null;
                sectionScore = parseSectionScore(text) || 2;

                // 配和声题通常无独立题干行，标题即题干
                if (section === 'harmonize') {
                    if (current) questions.push(current);
                    const title = text.replace(/^[一二三四五六七八九十]+[、.．]\s*/, '').replace(/（[^）]*）/g, '').trim();
                    current = makeQuestion(chapterId, 'harmonize', sectionScore, title);
                }
                continue;
            }
            if (!section) continue;

            // 配和声题：后续文本行（如"要求：1、…"）追加到题干
            if (section === 'harmonize' && current && text) {
                current.text += '；' + text.trim();
                continue;
            }

            // 题干：1、xxx / 2.xxx / 1．xxx
            const qm = text.match(/^(\d+)[、.．\s]+(.+)$/);
            if (qm && section !== 'harmonize') {
                if (current) questions.push(current);
                current = makeQuestion(chapterId, section, sectionScore, qm[2].trim());
                continue;
            }

            if (!current) continue;

            // 图片段落：题干谱例
            if (!text && b.images.length) {
                if (!current.image) current.image = b.images[0];
                continue;
            }

            // 选择题选项：A.xxx / B.xxx
            if (current.type === 'choice') {
                const om = text.match(/^([A-Z])[.．、\)]\s*(.+)$/);
                if (om) { current.options.push({ label: om[1], text: om[2].trim() }); continue; }
            }
        }
        if (current) questions.push(current);
        return questions;
    }

    // 解析答案：返回 { choice:[字母], judge:[bool], link:[图], analysis:[图], harmonize:[图] }
    function parseAnswers(blocks) {
        const result = { choice: [], judge: [], link: [], analysis: [], harmonize: [] };
        let section = null;
        for (const b of blocks) {
            const text = b.text;
            if (/^[一二三四五六七八九十]+[、.．]\s*/.test(text)) {
                if (text.includes('选择题')) section = 'choice';
                else if (text.includes('判断题')) section = 'judge';
                else if (text.includes('连接题')) section = 'link';
                else if (text.includes('分析题')) section = 'analysis';
                else if (text.includes('配和声')) section = 'harmonize';
                else section = null;
                continue;
            }
            if (!section) continue;

            if (section === 'choice') {
                if (!text) continue;
                const letters = text.replace(/[^A-Za-z]/g, '');
                if (letters) result.choice = letters.split('').map(c => c.toUpperCase());
            } else if (section === 'judge') {
                if (!text) continue;
                const tokens = text.split(/[\s,，、;；]+/).filter(Boolean);
                result.judge = result.judge.concat(tokens.map(t => {
                    if (/^(对|正确|√|✓|T|t|true|是)$/.test(t)) return true;
                    if (/^(错|错误|×|X|F|f|false|否)$/.test(t)) return false;
                    return true;
                }));
            } else {
                // 主观题（连接/分析/配和声）：答案以图片（参考谱例）形式给出
                if (b.images.length) result[section].push(b.images[0]);
            }
        }
        return result;
    }

    function applyAnswers(questions, answers) {
        const counters = { choice: 0, judge: 0, link: 0, analysis: 0, harmonize: 0 };
        questions.forEach(q => {
            const idx = counters[q.type]++;
            if (q.type === 'choice') q.answer = (answers.choice && answers.choice[idx]) || '';
            else if (q.type === 'judge') q.answer = !!(answers.judge && answers.judge[idx] === true);
            else q.answerImage = (answers[q.type] && answers[q.type][idx]) || '';
        });
        return questions;
    }

    // 单文件（试题+答案合并）：识别「答案」标记，拆分为试题部分与答案部分
    function splitCombinedDocx(blocks) {
        const mark = ['答案', '参考答案', '答案与解析', '试题答案', '答案及解析', '参考答案及评分标准'];
        let answerStart = -1;
        for (let i = 0; i < blocks.length; i++) {
            const t = blocks[i].text.replace(/[\s【】]/g, '').replace(/[:：]$/, '');
            if (mark.includes(t)) { answerStart = i; break; }
        }
        if (answerStart < 0) return { timuBlocks: blocks, daanBlocks: [] };
        return { timuBlocks: blocks.slice(0, answerStart), daanBlocks: blocks.slice(answerStart + 1) };
    }

    // 导入入口：兼容「试题+答案分开的两个文件」和「合并的单个文件」
    async function importFromFiles(files) {
        setHint('⏳ 正在解析 Word 文档，请稍候…');
        try {
            let timuBlocks, daanBlocks;

            if (files.length >= 2) {
                let timuFile = null, daanFile = null;
                for (const f of files) {
                    const n = f.name;
                    if (/答案/.test(n)) daanFile = f;
                    else if (/试题|题目|试卷|习题/.test(n)) timuFile = f;
                }
                if (!timuFile || !daanFile) {
                    setHint('⚠️ 请选择「试题」和「答案」两个文档，或只选一个合并文档');
                    return;
                }
                timuBlocks = await parseDocxToBlocks(timuFile);
                daanBlocks = await parseDocxToBlocks(daanFile);
            } else {
                const split = splitCombinedDocx(await parseDocxToBlocks(files[0]));
                timuBlocks = split.timuBlocks;
                daanBlocks = split.daanBlocks;
                if (!daanBlocks.length) {
                    setHint('⚠️ 未在文档中识别到「答案」部分（需有「答案/参考答案」标题），或改为分别上传试题、答案两个文件');
                    return;
                }
            }

            const answers = parseAnswers(daanBlocks);
            let questions = parseQuestions(timuBlocks, manageChapter);
            questions = applyAnswers(questions, answers);

            if (!questions.length) {
                setHint('⚠️ 未解析到题目，请确认文档格式或章节选择是否正确');
                return;
            }

            // 重复检测：同一章节内、题干相同的题视为重复
            const dupes = [];
            const fresh = [];
            questions.forEach(q => {
                const dup = bank.some(b => Number(b.chapter) === Number(q.chapter) && (b.text || '').trim() === (q.text || '').trim());
                (dup ? dupes : fresh).push(q);
            });
            if (dupes.length) {
                if (!fresh.length) {
                    setHint('⚠️ 这批题与本章已有题库完全重复（' + dupes.length + ' 题），未导入');
                    return;
                }
                if (!confirm('检测到 ' + dupes.length + ' 道题与本章已有题库重复（题干相同）。\n\n点「确定」只导入 ' + fresh.length + ' 道新题（跳过重复）；\n点「取消」则本次不导入。')) {
                    setHint('已取消导入');
                    return;
                }
                questions = fresh;
            }

            bank = bank.concat(questions);
            saveBank();
            renderQuestionList();
            updateBankScoreBar();
            const stat = {};
            questions.forEach(q => { stat[q.type] = (stat[q.type] || 0) + 1; });
            const desc = Object.keys(stat).map(k => TYPES[k] + ' ' + stat[k] + ' 题').join('、');
            setHint('✅ 成功导入 ' + questions.length + ' 道题（' + desc + '）到「' + chapterTitle(manageChapter) + '」');
        } catch (e) {
            console.error(e);
            setHint('❌ 解析失败：' + (e && e.message ? e.message : '请确认是 .docx 格式'));
        }
    }

    function setHint(html) {
        const el = $('bank-import-hint');
        if (el) el.innerHTML = html;
    }

    // ==================== 管理页渲染 ====================
    function renderChapterSelect() {
        const sel = $('bank-chapter-select');
        if (!sel) return;
        sel.innerHTML = chapters().map(c =>
            `<option value="${c.id}" ${Number(c.id) === Number(manageChapter) ? 'selected' : ''}>${c.title}</option>`
        ).join('');
    }

    function renderQuestionList() {
        const list = $('bank-question-list');
        if (!list) return;
        const qs = bank.filter(q => Number(q.chapter) === Number(manageChapter));
        if (!qs.length) {
            list.innerHTML = '<div class="bank-empty">本章暂无题目。<br>点击「📥 导入 Word 题库」或「＋ 新增题目」。</div>';
            return;
        }
        list.innerHTML = qs.map(q => {
            const typeLabel = TYPES[q.type] || q.type;
            const optText = q.type === 'choice' ? q.options.map(o => o.label + '.' + o.text).join('　') : '';
            const ansText = q.type === 'choice' ? q.answer
                : q.type === 'judge' ? (q.answer ? '对' : '错')
                : q.type === 'analysis' ? (q.answer || '（未设置文本答案）')
                : (q.answerImage ? '主观题（含参考图）' : '主观题（五线谱作答）');
            return `<div class="bank-item" data-id="${q.id}">
                <div class="bank-item-head">
                    <span class="bank-item-type">${typeLabel}</span>
                    <span class="bank-item-score">${q.score} 分</span>
                </div>
                <div class="bank-item-text">${escapeHtml(q.text)}</div>
                ${q.image ? `<img class="bank-item-img" src="${q.image}" alt="题目图片">` : ''}
                ${q.type === 'choice' ? `<div class="bank-item-opt">选项：${escapeHtml(optText)}</div>` : ''}
                <div class="bank-item-ans">答案：${escapeHtml(ansText)}</div>
                <div class="bank-item-actions">
                    <button class="btn btn-small" data-act="edit">编辑</button>
                    <button class="btn btn-small warning" data-act="del">删除</button>
                </div>
            </div>`;
        }).join('');
        updateBankScoreBar();
    }

    // 计算并显示当前章节总分（目标 100 分）
    function updateBankScoreBar() {
        const el = $('bank-total-score');
        if (!el) return;
        const qs = bank.filter(q => Number(q.chapter) === Number(manageChapter));
        const total = qs.reduce((s, q) => s + (Number(q.score) || 0), 0);
        el.textContent = Math.round(total * 10) / 10;
        const bar = $('bank-score-bar');
        if (bar) bar.classList.toggle('over', total > 100);
    }

    // 自动按当前分值比例缩放到总分 100（保持各题型权重）
    function autoScoreTo100() {
        const qs = bank.filter(q => Number(q.chapter) === Number(manageChapter));
        if (!qs.length) { alert('本章暂无题目'); return; }
        const total = qs.reduce((s, q) => s + (Number(q.score) || 0), 0);
        if (total <= 0) { alert('本章题目分值总和为 0，请先为题目设置分值'); return; }
        const factor = 100 / total;
        let assigned = 0;
        qs.forEach((q, i) => {
            if (i === qs.length - 1) q.score = Math.round((100 - assigned) * 10) / 10;
            else { q.score = Math.round(Number(q.score) * factor * 10) / 10; assigned += q.score; }
        });
        saveBank();
        renderQuestionList();
        setHint('✅ 已按比例调整，本章总分 = 100 分');
    }

    // ==================== 题目编辑 ====================
    function openEditModal(q) {
        editState = q ? { id: q.id, imageDataUrl: q.image || '', judgeAnswer: (q.type === 'judge' ? !!q.answer : true) }
                      : { id: null, imageDataUrl: '', judgeAnswer: true };

        $('quiz-edit-title').textContent = q ? '编辑题目' : '新增题目';
        $('quiz-edit-type').value = q ? q.type : 'choice';
        $('quiz-edit-score').value = q ? q.score : 2;
        $('quiz-edit-text').value = q ? q.text : '';
        $('quiz-edit-options').value = q && q.options ? q.options.map(o => o.label + '.' + o.text).join('\n') : '';
        $('quiz-edit-img-file').value = '';
        $('quiz-edit-img-preview').innerHTML = editState.imageDataUrl
            ? `<img src="${editState.imageDataUrl}" alt="预览"><button type="button" class="btn btn-small" id="quiz-edit-img-clear">移除图片</button>`
            : '';

        const ansObj = (q && q.type === 'analysis' && q.answer && typeof q.answer === 'object') ? q.answer : { key: '', measures: ['', '', '', ''] };
        $('quiz-edit-answer-key').value = ansObj.key || '';
        ['quiz-edit-answer-m1', 'quiz-edit-answer-m2', 'quiz-edit-answer-m3', 'quiz-edit-answer-m4'].forEach((id, i) => {
            $(id).value = (ansObj.measures && ansObj.measures[i]) || '';
        });
        syncEditTypeUI();
        renderAnswerOptions(q ? q.answer : '');
        $('quiz-edit-modal').style.display = 'flex';
    }

    function closeEditModal() {
        $('quiz-edit-modal').style.display = 'none';
        editState = null;
    }

    function syncEditTypeUI() {
        const type = $('quiz-edit-type').value;
        $('quiz-edit-options-row').style.display = (type === 'choice') ? '' : 'none';
        $('quiz-edit-answer-choice-row').style.display = (type === 'choice') ? '' : 'none';
        $('quiz-edit-answer-judge-row').style.display = (type === 'judge') ? '' : 'none';
        $('quiz-edit-analysis-row').style.display = (type === 'analysis') ? '' : 'none';
        updateJudgeButtons();
    }

    function updateJudgeButtons() {
        const t = $('quiz-edit-answer-true'), f = $('quiz-edit-answer-false');
        if (!t || !f) return;
        t.classList.toggle('selected', editState.judgeAnswer === true);
        f.classList.toggle('selected', editState.judgeAnswer === false);
    }

    function renderAnswerOptions(currentAnswer) {
        const sel = $('quiz-edit-answer-choice');
        const optText = $('quiz-edit-options').value;
        const lines = optText.split('\n').map(s => s.trim()).filter(Boolean);
        const opts = lines.map(line => {
            const m = line.match(/^([A-Z])[.．、\)]\s*(.+)$/);
            return m ? { label: m[1], text: m[2].trim() } : { label: line.charAt(0).toUpperCase(), text: line };
        });
        sel.innerHTML = opts.map(o => `<option value="${o.label}">${o.label}. ${escapeHtml(o.text)}</option>`).join('');
        if (currentAnswer && opts.some(o => o.label === currentAnswer)) sel.value = currentAnswer;
    }

    function saveEdit() {
        const type = $('quiz-edit-type').value;
        const score = parseFloat($('quiz-edit-score').value) || 0;
        const text = $('quiz-edit-text').value.trim();
        if (!text) { alert('请填写题干'); return; }

        const obj = {
            chapter: Number(manageChapter),
            type, score, text,
            image: editState.imageDataUrl || '',
            options: [],
            answer: type === 'judge' ? (editState.judgeAnswer === true) : ''
        };
        if (type === 'choice') {
            const optText = $('quiz-edit-options').value;
            obj.options = optText.split('\n').map(s => s.trim()).filter(Boolean).map(line => {
                const m = line.match(/^([A-Z])[.．、\)]\s*(.+)$/);
                return m ? { label: m[1], text: m[2].trim() } : { label: line.charAt(0).toUpperCase(), text: line };
            });
            if (obj.options.length < 2) { alert('选择题至少需要 2 个选项'); return; }
            obj.answer = $('quiz-edit-answer-choice').value;
        } else if (type === 'analysis') {
            obj.answer = {
                key: $('quiz-edit-answer-key').value.trim(),
                measures: ['m1', 'm2', 'm3', 'm4'].map(s => $('quiz-edit-answer-' + s).value.trim())
            };
        }

        if (editState.id) {
            const idx = bank.findIndex(b => b.id === editState.id);
            if (idx >= 0) bank[idx] = Object.assign({}, bank[idx], obj);
        } else {
            bank.push(Object.assign({ id: genId() }, obj));
        }
        saveBank();
        renderQuestionList();
        closeEditModal();
    }

    // ==================== 答题流程 ====================
    function quizStart(chapterId) {
        const qs = bank.filter(q => Number(q.chapter) === Number(chapterId));
        if (!qs.length) { alert('该章节暂无题目'); return; }
        const shuffled = qs.slice().sort(() => Math.random() - 0.5);
        session = {
            chapterId: Number(chapterId),
            questions: shuffled,
            index: 0,
            answers: {},       // 题 id -> 作答值（字母/bool/数字得分/文本）
            submitted: false
        };
        $('quiz-chapter-select-wrap').style.display = 'none';
        $('quiz-question-wrap').style.display = '';
        $('quiz-title').textContent = '📝 ' + chapterTitle(chapterId);
        quizRenderQuestion();
    }

    function quizRenderQuestion() {
        if (!session) return;
        const q = session.questions[session.index];
        $('quiz-meta').textContent = '第 ' + (session.index + 1) + ' / ' + session.questions.length + ' 题 · ' + TYPES[q.type] + ' · ' + q.score + ' 分';
        $('quiz-progress').textContent = (session.index + 1) + '/' + session.questions.length;

        const cur = session.answers[q.id];
        let body = '';
        if (q.image) body += `<img class="quiz-q-img" src="${q.image}" alt="题目图片">`;
        body += `<div class="quiz-q-text">${escapeHtml(q.text)}</div>`;

        if (q.type === 'choice') {
            body += '<div class="quiz-options">' + q.options.map(o => {
                const sel = (cur === o.label) ? ' selected' : '';
                return `<button class="quiz-option${sel}" data-label="${o.label}"><span class="quiz-option-label">${o.label}</span><span>${escapeHtml(o.text)}</span></button>`;
            }).join('') + '</div>';
        } else if (q.type === 'judge') {
            body += '<div class="quiz-options quiz-judge-options">' +
                `<button class="quiz-option${cur === true ? ' selected' : ''}" data-judge="true">✓ 对</button>` +
                `<button class="quiz-option${cur === false ? ' selected' : ''}" data-judge="false">✗ 错</button>` +
                '</div>';
        } else if (q.type === 'link' || q.type === 'harmonize') {
            const got = (typeof cur === 'number') ? cur : null;
            body += `<div class="quiz-subj-score">${got != null ? '当前得分：<b>' + got + '</b> / ' + q.score + ' 分' : '尚未作答'}</div>` +
                `<button class="quiz-subj-btn" data-act="open-subj">🎹 去作答（五线谱）</button>`;
        } else if (q.type === 'analysis') {
            const curObj = (cur && typeof cur === 'object') ? cur : { key: '', measures: ['', '', '', ''] };
            body += `<div class="quiz-analysis-row"><label>调式调性</label><input id="quiz-analysis-key" class="quiz-analysis-input" placeholder="如：C大调 / a小调" value="${escapeHtml(curObj.key || '')}"></div>`;
            for (let i = 0; i < 4; i++) {
                body += `<div class="quiz-analysis-row"><label>小节${i + 1} 和弦标记</label><input id="quiz-analysis-m${i + 1}" class="quiz-analysis-input" placeholder="如：T，T，D" value="${escapeHtml((curObj.measures && curObj.measures[i]) || '')}"></div>`;
            }
        }

        $('quiz-question-card').innerHTML = body;

        if (q.type === 'analysis') {
            const keyInp = $('quiz-analysis-key');
            const setAns = () => {
                const a = session.answers[q.id] || { key: '', measures: ['', '', '', ''] };
                if (keyInp) a.key = keyInp.value;
                for (let i = 0; i < 4; i++) {
                    const m = $('quiz-analysis-m' + (i + 1));
                    if (m) a.measures[i] = m.value;
                }
                session.answers[q.id] = a;
            };
            if (keyInp) keyInp.oninput = setAns;
            for (let i = 0; i < 4; i++) {
                const m = $('quiz-analysis-m' + (i + 1));
                if (m) m.oninput = setAns;
            }
        }

        $('quiz-prev-btn').style.display = (session.index === 0) ? 'none' : '';
        const last = session.index >= session.questions.length - 1;
        $('quiz-next-btn').style.display = last ? 'none' : '';
        $('quiz-submit-btn').style.display = last ? '' : 'none';
    }

    function quizSelect(btn) {
        if (!session) return;
        const q = session.questions[session.index];
        if (btn.dataset.act === 'open-subj') { quizOpenSubjective(); return; }
        if (q.type === 'choice') session.answers[q.id] = btn.dataset.label;
        else if (q.type === 'judge') session.answers[q.id] = (btn.dataset.judge === 'true');
        quizRenderQuestion();
    }

    // 主观题作答：跳转到作业编辑器（五线谱写音符 + 标和弦），完成后得分回传
    let quizPrevChapter = null;
    function quizOpenSubjective() {
        if (!session) return;
        const q = session.questions[session.index];
        quizPrevChapter = (typeof appState !== 'undefined') ? appState.currentChapter : null;
        if (typeof appState !== 'undefined') appState.currentChapter = null; // 避免 hwRunCheck 计入章节掌握度

        const questionEl = document.getElementById('hw-question');
        if (questionEl) { questionEl.style.display = 'block'; questionEl.innerHTML = '<strong>📝 ' + TYPES[q.type] + '：</strong>' + escapeHtml(q.text); }
        const imgEl = document.getElementById('hw-quiz-img');
        if (imgEl) { imgEl.style.display = q.image ? 'block' : 'none'; imgEl.innerHTML = q.image ? `<img src="${q.image}" alt="题目图片">` : ''; }

        hwResetState();
        hwBuildKeySelect();
        hwBuildFuncButtons();
        hwBuildInvButtons();
        const checkSummary = document.getElementById('hw-check-summary');
        if (checkSummary) checkSummary.innerHTML = '';
        const hwStatus = document.getElementById('hw-status');
        if (hwStatus) hwStatus.textContent = '';

        document.getElementById('learn-content').style.display = 'none';
        document.getElementById('practice-content').style.display = 'none';
        document.getElementById('homework-content').style.display = 'block';
        document.getElementById('hw-submit-quiz-btn').style.display = '';
        document.getElementById('hw-back-btn').style.display = 'none';
        if (typeof appState !== 'undefined') appState.currentMode = 'homework';
        pageManager.switchToPage('learn-page');

        // 分析题：加载 MusicXML 谱例（音符已填好，学生只需标调性/和弦标记）
        if (q.type === 'analysis' && q.musicxml) {
            fetch(q.musicxml)
                .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
                .then(xml => {
                    const parsed = parseMusicXmlToMeasures(xml);
                    hwState.measures = parsed.measures;
                    hwState.keyIndex = parsed.keyIndex;
                    hwState.timeSig = parsed.timeSig;
                    hwBuildKeySelect(); hwBuildFuncButtons(); hwBuildInvButtons();
                    hwRender();
                })
                .catch(err => {
                    hwResetState(); hwBuildKeySelect(); hwBuildFuncButtons(); hwBuildInvButtons();
                    hwRender();
                    alert('谱例加载失败：' + (err && err.message ? err.message : err) + '\n请确认 MusicXML 路径是否正确');
                });
        } else {
            setTimeout(() => hwRender(), 50);
        }
    }

    function quizFinishSubjective() {
        if (!session) return;
        const q = session.questions[session.index];

        if (!hwState.checkResults) hwRunCheck();
        const results = hwState.checkResults || [];
        const total = results.reduce((s, r) => s + (Number(r.score) || 0), 0);
        const full = results.length * 5;
        const percent = full ? (total / full) : 0;
        session.answers[q.id] = Math.round(percent * Number(q.score) * 10) / 10;

        if (typeof appState !== 'undefined') appState.currentChapter = quizPrevChapter;
        document.getElementById('hw-submit-quiz-btn').style.display = 'none';
        document.getElementById('hw-back-btn').style.display = '';
        document.getElementById('homework-content').style.display = 'none';
        pageManager.switchToPage('quiz-page');
        quizRenderQuestion();
    }

    function quizAnalysisMatch(student, answer) {
        const norm = s => String(s == null ? '' : s).replace(/[\s\u3000]/g, '').replace(/[、，,；;：:]/g, '-').replace(/[—\-]+/g, '-').toLowerCase();
        const a = norm(student), b = norm(answer);
        return a.length > 0 && a === b;
    }

    // 归一化标记序列（分析题逐小节对比用）
    function quizNormSeq(s) {
        return String(s || '').replace(/\s+/g, '').replace(/[，,、;；]/g, ',').replace(/64/g, '46').toLowerCase();
    }
    function quizIsEmpty(ans) {
        if (ans === undefined || ans === null) return true;
        if (typeof ans === 'string') return ans.trim() === '';
        if (typeof ans === 'object') return !((ans.key || '').trim() || (ans.measures || []).some(x => (x || '').trim()));
        return false;
    }

    function quizPrev() { if (session && session.index > 0) { session.index--; quizRenderQuestion(); } }
    function quizNext() { if (session && session.index < session.questions.length - 1) { session.index++; quizRenderQuestion(); } }

    // ==================== 答题卡（交卷前核对/修改） ====================
    function quizOpenSheet() {
        if (!session) return;
        const order = ['choice', 'judge', 'link', 'analysis', 'harmonize'];
        const groups = order.filter(t => session.questions.some(q => q.type === t));
        const CN_NUM = ['一', '二', '三', '四', '五'];

        let html = '';
        groups.forEach((type, gi) => {
            const qs = session.questions.filter(q => q.type === type);
            html += `<div class="quiz-sheet-group">
                <div class="quiz-sheet-group-title">${CN_NUM[gi]}、${TYPES[type]}（${qs.length} 题）</div>
                <div class="quiz-sheet-group-items">` +
                qs.map(q => {
                    const idx = session.questions.indexOf(q);
                    const ans = session.answers[q.id];
                    let status;
                    if (q.type === 'link' || q.type === 'harmonize') status = (typeof ans === 'number') ? (ans + ' 分') : '未答';
                    else if (q.type === 'analysis') status = quizIsEmpty(ans) ? '未答' : '已答';
                    else status = (ans === undefined || ans === '') ? '未答' : '已答';
                    const empty = quizIsEmpty(ans);
                    const text = (q.text || '').replace(/\s+/g, ' ').trim();
                    return `<button class="quiz-sheet-item ${empty ? 'empty' : 'done'}" data-index="${idx}">
                        <span class="quiz-sheet-no">${qs.indexOf(q) + 1}.</span>
                        <span class="quiz-sheet-text">${escapeHtml(text)}</span>
                        <span class="quiz-sheet-status">${status}</span>
                    </button>`;
                }).join('') +
                `</div></div>`;
        });
        $('quiz-sheet-list').innerHTML = html;
        $('quiz-sheet-modal').style.display = 'flex';
    }

    function quizSheetJump(index) {
        if (!session) return;
        session.index = Number(index);
        $('quiz-sheet-modal').style.display = 'none';
        quizRenderQuestion();
    }

    function quizDoSubmit() {
        if (!session) return;
        $('quiz-sheet-modal').style.display = 'none';
        const unanswered = session.questions.filter(q => quizIsEmpty(session.answers[q.id])).length;
        if (unanswered > 0) {
            if (!confirm('还有 ' + unanswered + ' 题未作答，确定交卷吗？')) return;
        }
        session.submitted = true;
        quizShowResult();
    }

    // ==================== 评分与结果 ====================
    function quizComputeResult() {
        const typeScores = {};
        let totalScore = 0, correct = 0;
        session.questions.forEach(q => {
            const ans = session.answers[q.id];
            if (!typeScores[q.type]) typeScores[q.type] = { total: 0, got: 0, correct: 0, cnt: 0 };
            const ts = typeScores[q.type];
            ts.total += q.score;
            ts.cnt += 1;

            let got = 0, isCorrect = false;
            if (q.type === 'choice' || q.type === 'judge') {
                isCorrect = (ans === q.answer);
                got = isCorrect ? q.score : 0;
            } else if (q.type === 'link' || q.type === 'harmonize') {
                got = (typeof ans === 'number') ? Math.max(0, Math.min(ans, q.score)) : 0;
                isCorrect = got >= q.score * 0.6; // 主观题 ≥60% 记为达标
            } else if (q.type === 'analysis') {
                const stu = (ans && typeof ans === 'object') ? ans : { key: '', measures: ['', '', '', ''] };
                const std = (q.answer && typeof q.answer === 'object') ? q.answer : { key: '', measures: ['', '', '', ''] };

                // 5 框均分：调性 1 框 + 小节1~4 各 1 框，每框 = q.score / 5
                const boxScore = q.score / 5;
                let got = 0, full = 0;

                // 调性框
                if (std.key && std.key.trim()) {
                    full += boxScore;
                    if (quizAnalysisMatch(stu.key, std.key)) got += boxScore;
                }

                // 每小节框：小节内按和弦数均摊该小节总分
                (std.measures || []).forEach((s, i) => {
                    if (!s || !s.trim()) return;
                    const stdChords = s.split(/[，,、;；]/).map(x => x.trim()).filter(Boolean);
                    if (!stdChords.length) return;
                    full += boxScore;
                    const stuChords = ((stu.measures && stu.measures[i]) || '').split(/[，,、;；]/).map(x => x.trim()).filter(Boolean);
                    const perChord = boxScore / stdChords.length;
                    stdChords.forEach((sc, ci) => {
                        if (quizNormSeq(stuChords[ci] || '') === quizNormSeq(sc)) got += perChord;
                    });
                });

                got = Math.round(got * 10) / 10;
                isCorrect = full > 0 && got >= full * 0.999;
            }
            ts.got += got;
            if (isCorrect) { ts.correct += 1; correct++; }
        });
        Object.keys(typeScores).forEach(k => { totalScore += typeScores[k].got; });
        return { typeScores, totalScore, correct, total: session.questions.length };
    }

    function recordResult(r) {
        const key = recordKey();
        if (!key) return;
        try {
            let arr = [];
            const raw = localStorage.getItem(key);
            if (raw) arr = JSON.parse(raw);
            if (!Array.isArray(arr)) arr = [];
            arr.push({
                time: new Date().toISOString(),
                chapterId: session.chapterId,
                chapterTitle: chapterTitle(session.chapterId),
                totalScore: r.totalScore,
                correct: r.correct,
                total: r.total,
                typeScores: r.typeScores
            });
            localStorage.setItem(key, JSON.stringify(arr));
        } catch (e) { }
    }

    function quizShowResult() {
        const r = quizComputeResult();
        recordResult(r);
        const ui = (typeof appState !== 'undefined' && appState.userInfo) ? appState.userInfo : {};
        $('quiz-end-school').textContent = ui.school || '—';
        $('quiz-end-major-class').textContent = ui.majorClass || '—';
        $('quiz-end-name').textContent = ui.name || '—';
        $('quiz-end-teacher').textContent = ui.teacher || '—';
        $('quiz-complete-name').textContent = chapterTitle(session.chapterId) + ' · 测试完成';
        $('quiz-total-score').textContent = r.totalScore;
        $('quiz-total-correct').textContent = r.correct + ' / ' + r.total;

        const lines = Object.keys(r.typeScores).map(k => {
            const ts = r.typeScores[k];
            return `<p>${TYPES[k] || k}：<strong>${ts.got}</strong> / ${ts.total} 分（答对 ${ts.correct}/${ts.cnt} 题）</p>`;
        });
        $('quiz-type-scores').innerHTML = lines.join('') || '<p>无题目</p>';
        pageManager.switchToPage('quiz-complete-page');
    }

    function csvCell(v) {
        const s = String(v == null ? '' : v);
        return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }
    function downloadText(content, filename, mime) {
        const blob = new Blob([content], { type: mime + ';charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename; a.click();
        setTimeout(() => URL.revokeObjectURL(url), 3000);
    }
    function fileTimestamp() {
        const d = new Date();
        const p = n => String(n).padStart(2, '0');
        return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '_' + p(d.getHours()) + p(d.getMinutes());
    }

    function quizExportCsv() {
        const r = quizComputeResult();
        const ui = (typeof appState !== 'undefined' && appState.userInfo) ? appState.userInfo : {};
        const header = ['姓名', '学校', '班级', '指导教师', '章节', '总分', '选择题得分', '判断题得分', '正确题数', '总题数', '交卷时间'];
        const row = [
            ui.name || '', ui.school || '', ui.majorClass || '', ui.teacher || '',
            chapterTitle(session.chapterId),
            r.totalScore,
            (r.typeScores.choice ? r.typeScores.choice.got : ''),
            (r.typeScores.judge ? r.typeScores.judge.got : ''),
            r.correct, r.total,
            new Date().toLocaleString('zh-CN')
        ];
        const csv = '\uFEFF' + header.map(csvCell).join(',') + '\n' + row.map(csvCell).join(',') + '\n';
        downloadText(csv, '题库成绩_' + (ui.name || '学生') + '_' + fileTimestamp() + '.csv', 'text/csv');
    }

    // 导出成绩为图片（复用 app.js 的 downloadCanvasPng / wrapLines / addExportWatermark）
    function quizExportImage() {
        const r = quizComputeResult();
        const ui = (typeof appState !== 'undefined' && appState.userInfo) ? appState.userInfo : {};
        const pad = 24, scale = 2, contentW = 720;
        const maxTextW = contentW - pad * 2;
        const probe = document.createElement('canvas').getContext('2d');
        const F = '-apple-system,PingFang SC,Microsoft YaHei,sans-serif';

        const blocks = [];
        blocks.push({ text: '🎼 题库测试成绩单', font: 'bold 22px ' + F, lineH: 34, color: '#6a1b9a' });
        blocks.push({ text: '姓名：' + (ui.name || '—') + '    班级：' + (ui.majorClass || '—') + '    学校：' + (ui.school || '—'), font: '13px ' + F, lineH: 20, color: '#555' });
        blocks.push({ text: '指导教师：' + (ui.teacher || '—') + '    章节：' + chapterTitle(session.chapterId), font: '13px ' + F, lineH: 20, color: '#555' });
        blocks.push({ text: '总分：' + r.totalScore + ' 分    正确题数：' + r.correct + ' / ' + r.total, font: 'bold 16px ' + F, lineH: 24, color: '#c62828' });
        Object.keys(r.typeScores).forEach(k => {
            const ts = r.typeScores[k];
            blocks.push({ text: (TYPES[k] || k) + '：' + ts.got + ' / ' + ts.total + ' 分（答对 ' + ts.correct + '/' + ts.cnt + ' 题）', font: '13px ' + F, lineH: 20, color: '#333' });
        });
        blocks.push({ text: '导出时间：' + new Date().toLocaleString('zh-CN'), font: '12px ' + F, lineH: 18, color: '#999' });

        let totalH = pad;
        blocks.forEach((b, i) => {
            probe.font = b.font;
            b.lines = (typeof wrapLines === 'function') ? wrapLines(probe, b.text, maxTextW) : [b.text];
            totalH += b.lines.length * b.lineH;
            totalH += (i === 0 ? 18 : 6);
        });
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
        blocks.forEach((b, i) => {
            ctx.fillStyle = b.color;
            ctx.font = b.font;
            b.lines.forEach(line => { ctx.fillText(line, pad, ly); ly += b.lineH; });
            ly += (i === 0 ? 18 : 6);
        });

        downloadCanvasPng(canvas, '题库成绩_' + (ui.name || '学生') + '_' + fileTimestamp());
    }

    // ==================== 页面入口 ====================
    function openManage() {
        renderChapterSelect();
        renderQuestionList();
        setHint('');
        pageManager.switchToPage('bank-manage-page');
    }

    function openStudentQuiz() {
        const chaptersWithQs = chapters().filter(c => bank.some(q => Number(q.chapter) === Number(c.id)));
        const wrap = $('quiz-chapter-select-wrap');
        const list = $('quiz-chapter-list');
        $('quiz-question-wrap').style.display = 'none';
        wrap.style.display = '';
        if (!chaptersWithQs.length) {
            list.innerHTML = '<div class="bank-empty">题库暂无题目，请联系老师导入。</div>';
        } else {
            list.innerHTML = chaptersWithQs.map(c => {
                const cnt = bank.filter(q => Number(q.chapter) === Number(c.id)).length;
                return `<button class="quiz-chapter-btn" data-chapter="${c.id}">${c.title}<span class="quiz-chapter-cnt">${cnt} 题</span></button>`;
            }).join('');
        }
        const composeBtn = $('quiz-compose-entry');
        if (composeBtn) {
            const majorClass = (typeof appState !== 'undefined' && appState.userInfo) ? (appState.userInfo.majorClass || '') : '';
            composeBtn.style.display = (majorClass === '任课教师') ? '' : 'none';
        }
        pageManager.switchToPage('quiz-page');
    }

    // 根据「专业班级」栏是否为「任课教师」控制教师入口可见性
    function refreshEntryVisibility() {
        const teacherBtn = $('quiz-teacher-entry');
        if (!teacherBtn) return;
        const majorClass = (typeof appState !== 'undefined' && appState.userInfo) ? (appState.userInfo.majorClass || '') : '';
        teacherBtn.style.display = (majorClass === '任课教师') ? '' : 'none';
    }

    // ==================== 组卷 ====================
    const COMPOSE_TYPES = ['choice', 'judge', 'link', 'analysis', 'harmonize'];
    let composeConfig = {};
    function initComposeConfig() {
        const defaults = {
            choice: { count: 5, score: 2 },
            judge: { count: 0, score: 0 },
            link: { count: 2, score: 10 },
            analysis: { count: 2, score: 15 },
            harmonize: { count: 1, score: 40 }
        };
        composeConfig = {};
        COMPOSE_TYPES.forEach(t => { composeConfig[t] = { ...defaults[t] }; });
    }
    function renderComposeRows() {
        const wrap = $('quiz-compose-rows');
        if (!wrap) return;
        wrap.innerHTML = COMPOSE_TYPES.map(t => {
            const c = composeConfig[t] || { count: 0, score: 0 };
            return `<div class="compose-row">
                <span class="compose-type">${TYPES[t]}</span>
                <label>数量<input type="number" class="compose-count" data-type="${t}" value="${c.count}" min="0"></label>
                <label>每题分值<input type="number" class="compose-score" data-type="${t}" value="${c.score}" min="0" step="0.5"></label>
            </div>`;
        }).join('');
        updateComposeTotal();
    }
    function updateComposeTotal() {
        let total = 0;
        COMPOSE_TYPES.forEach(t => { total += (composeConfig[t].count || 0) * (composeConfig[t].score || 0); });
        const el = $('quiz-compose-total');
        if (!el) return;
        el.textContent = Math.round(total * 10) / 10;
        el.style.color = (Math.abs(total - 100) < 0.01) ? '#2e7d32' : '#c62828';
    }
    function openComposeModal() {
        initComposeConfig();
        renderComposeRows();
        $('quiz-compose-modal').style.display = 'flex';
    }
    async function generateCompose() {
        const total = COMPOSE_TYPES.reduce((s, t) => s + (composeConfig[t].count || 0) * (composeConfig[t].score || 0), 0);
        if (Math.abs(total - 100) > 0.01) { alert('总分需为 100 分（当前 ' + Math.round(total * 10) / 10 + ' 分）'); return; }

        const pools = {};
        for (const t of COMPOSE_TYPES) {
            const need = (composeConfig[t].count || 0) * 3;
            if (need === 0) { pools[t] = []; continue; }
            const all = bank.filter(q => q.type === t);
            if (all.length < need) { alert(TYPES[t] + ' 题库不足：需要 ' + need + ' 道（每套 ' + composeConfig[t].count + ' 道 × 3 套），现有 ' + all.length + ' 道'); return; }
            pools[t] = all.slice().sort(() => Math.random() - 0.5).slice(0, need);
        }

        const papers = [[], [], []];
        for (const t of COMPOSE_TYPES) {
            const per = composeConfig[t].count || 0;
            for (let p = 0; p < 3; p++) papers[p] = papers[p].concat(pools[t].slice(p * per, (p + 1) * per));
        }
        for (let i = 0; i < 3; i++) await downloadPaper(papers[i], i + 1);

        $('quiz-compose-modal').style.display = 'none';
        alert('已生成 3 套 Word 试卷，请查看浏览器下载');
    }

    async function downloadPaper(qs, index) {
        const order = COMPOSE_TYPES.filter(t => (composeConfig[t].count || 0) > 0);
        let html = '\ufeff<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View></w:WordDocument></xml><![endif]--><style>body{font-family:SimSun,serif;font-size:14px;}img{height:auto;}.q{margin:10px 0;}h2{color:#333;}table{border-collapse:collapse;}</style></head><body>';
        html += `<h1 style="text-align:center;">和声学综合考试 · 第 ${index} 套</h1>`;
        html += '<p>姓名：__________　班级：__________　学号：__________</p>';
        order.forEach((t, gi) => {
            const typeQs = qs.filter(q => q.type === t);
            if (!typeQs.length) return;
            const perScore = composeConfig[t].score;
            html += `<h2>${'一二三四五'[gi]}、${TYPES[t]}（每题 ${perScore} 分，共 ${typeQs.length} 题，${Math.round(perScore * typeQs.length * 10) / 10} 分）</h2>`;
            typeQs.forEach((q, qi) => {
                html += `<div class="q"><p><b>${qi + 1}.</b> ${escapeHtml(q.text)}</p>`;
                if (q.image) html += `<img src="${q.image}" width="${q.type === 'link' ? 302 : 567}">`;
                if (q.type === 'choice' && q.options.length) html += '<p>' + q.options.map(o => o.label + '. ' + escapeHtml(o.text)).join('　') + '</p>';
                else if (q.type === 'judge') html += '<p>（　）　对 / 错</p>';
                else if (q.type === 'link' || q.type === 'harmonize') html += '<p>（在五线谱上作答）</p>';
                else if (q.type === 'analysis') html += '<p>调式调性：____________　和弦级数：____________________</p>';
                html += '</div>';
            });
        });
        html += await buildAnswerSheet(qs);
        html += '</body></html>';
        downloadText(html, '和声学试卷_第' + index + '套.doc', 'application/msword');
    }

    async function buildAnswerSheet(qs) {
        let sheet = '<h2 style="page-break-before:always; text-align:center;">答　题　卡</h2>';
        sheet += '<p>姓名：__________　班级：__________　学号：__________</p>';

        const order = COMPOSE_TYPES.filter(t => (composeConfig[t].count || 0) > 0);
        for (let gi = 0; gi < order.length; gi++) {
            const t = order[gi];
            const typeQs = qs.filter(q => q.type === t);
            if (!typeQs.length) continue;
            const cn = '一二三四五'[gi];

            if (t === 'choice') {
                sheet += `<h3>${cn}、选择题（在选项上打√）</h3><table>`;
                typeQs.forEach((q, i) => { sheet += `<tr><td style="padding:4px 8px;">${i + 1}.</td><td style="padding:4px 8px;">A（　）　B（　）　C（　）　D（　）</td></tr>`; });
                sheet += '</table>';
            } else if (t === 'judge') {
                sheet += `<h3>${cn}、判断题（在对/错上打√）</h3><table>`;
                typeQs.forEach((q, i) => { sheet += `<tr><td style="padding:4px 8px;">${i + 1}.</td><td style="padding:4px 8px;">对（　）　错（　）</td></tr>`; });
                sheet += '</table>';
            } else if (t === 'analysis') {
                sheet += `<h3>${cn}、分析题（填空）</h3>`;
                typeQs.forEach((q, i) => {
                    sheet += `<p>${i + 1}. 调式调性：__________</p>`;
                    sheet += `<p>　小节1：__________　小节2：__________</p>`;
                    sheet += `<p>　小节3：__________　小节4：__________</p>`;
                });
            } else if (t === 'link') {
                sheet += `<h3>${cn}、连接题（在大谱表上作答）</h3>`;
                const staffImg = await generateBlankStaffBase64(1, true);
                typeQs.forEach((q, i) => { sheet += `<p>第 ${i + 1} 题：</p><img src="${staffImg}" width="302">`; });
            } else if (t === 'harmonize') {
                sheet += `<h3>${cn}、配和声题（在大谱表上作答）</h3>`;
                const staffImg = await generateBlankStaffBase64(2);
                typeQs.forEach((q, i) => { sheet += `<p>第 ${i + 1} 题：</p><img src="${staffImg}" width="567">`; });
            }
        }
        return sheet;
    }

    // 生成空白大谱表（VexFlow：连续谱表，仅右端终止线）→ PNG base64
    function generateBlankStaffBase64(lines = 1, compact = false) {
        return new Promise((resolve) => {
            try {
                const container = document.createElement('div');
                const leftPad = 50;
                const staveW = compact ? 222 : 660;
                const systemH = compact ? 189 : 265;
                const W = leftPad + staveW + 30;
                const H = systemH * lines + 20;
                const renderer = new Vex.Flow.Renderer(container, Vex.Flow.Renderer.Backends.SVG);
                renderer.resize(W, H);
                const context = renderer.getContext();

                for (let li = 0; li < lines; li++) {
                    const top = li * systemH;
                    const trebleY = top + (compact ? 7 : 40);
                    const bassY = top + (compact ? 122 : 165);
                    const treble = new Vex.Flow.Stave(leftPad, trebleY, staveW, { space_between_lines: 15 });
                    const bass = new Vex.Flow.Stave(leftPad, bassY, staveW, { space_between_lines: 15 });
                    treble.addClef('treble');
                    bass.addClef('bass');
                    treble.setBegBarType(Vex.Flow.Barline.type.NONE).setEndBarType(Vex.Flow.Barline.type.NONE);
                    bass.setBegBarType(Vex.Flow.Barline.type.NONE).setEndBarType(Vex.Flow.Barline.type.NONE);
                    treble.setContext(context).draw();
                    bass.setContext(context).draw();
                    new Vex.Flow.StaveConnector(treble, bass).setType('brace').setContext(context).draw();
                    new Vex.Flow.StaveConnector(treble, bass).setType('singleLeft').setContext(context).draw();
                    new Vex.Flow.StaveConnector(treble, bass).setType('boldDoubleRight').setContext(context).draw();
                }

                const svg = container.querySelector('svg');
                const xml = new XMLSerializer().serializeToString(svg);
                const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = W * 2; canvas.height = H * 2;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    URL.revokeObjectURL(url);
                    resolve(canvas.toDataURL('image/png'));
                };
                img.onerror = () => { URL.revokeObjectURL(url); resolve(''); };
                img.src = url;
            } catch (e) { resolve(''); }
        });
    }

    // ==================== 事件绑定 ====================
    function bindEvents() {
        // 首页入口
        $('save-user')?.addEventListener('click', () => setTimeout(refreshEntryVisibility, 0));
        $('quiz-student-entry')?.addEventListener('click', () => {
            if (!appState.userInfo.saved) { alert('请先填写并保存学生信息'); return; }
            openStudentQuiz();
        });
        $('quiz-teacher-entry')?.addEventListener('click', () => openManage());

        // 管理页
        $('bank-manage-back')?.addEventListener('click', () => pageManager.switchToPage('home-page'));
        $('bank-chapter-select')?.addEventListener('change', e => { manageChapter = e.target.value; setHint(''); renderQuestionList(); });
        $('bank-import-btn')?.addEventListener('click', () => $('bank-file-input').click());
        $('bank-file-input')?.addEventListener('change', e => {
            if (e.target.files && e.target.files.length) importFromFiles(e.target.files);
            e.target.value = '';
        });
        $('bank-add-question-btn')?.addEventListener('click', () => openEditModal(null));
        $('bank-auto-score-btn')?.addEventListener('click', autoScoreTo100);
        $('bank-export-file-btn')?.addEventListener('click', exportBankFile);
        $('bank-question-list')?.addEventListener('click', e => {
            const btn = e.target.closest('button[data-act]');
            const item = e.target.closest('.bank-item');
            if (!btn || !item) return;
            const id = item.dataset.id;
            if (btn.dataset.act === 'edit') {
                const q = bank.find(b => b.id === id);
                if (q) openEditModal(q);
            } else if (btn.dataset.act === 'del') {
                if (confirm('确定删除这道题？')) { bank = bank.filter(b => b.id !== id); saveBank(); renderQuestionList(); }
            }
        });

        // 编辑弹窗
        $('quiz-edit-cancel')?.addEventListener('click', closeEditModal);
        $('quiz-edit-save')?.addEventListener('click', saveEdit);
        $('quiz-edit-type')?.addEventListener('change', syncEditTypeUI);
        $('quiz-edit-options')?.addEventListener('input', () => renderAnswerOptions($('quiz-edit-answer-choice').value));
        $('quiz-edit-img-file')?.addEventListener('change', e => {
            const f = e.target.files && e.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = ev => {
                if (!editState) return;
                editState.imageDataUrl = ev.target.result;
                $('quiz-edit-img-preview').innerHTML = `<img src="${ev.target.result}" alt="预览"><button type="button" class="btn btn-small" id="quiz-edit-img-clear">移除图片</button>`;
            };
            reader.readAsDataURL(f);
        });
        $('quiz-edit-img-preview')?.addEventListener('click', e => {
            if (e.target.id === 'quiz-edit-img-clear') {
                if (editState) editState.imageDataUrl = '';
                $('quiz-edit-img-preview').innerHTML = '';
            }
        });
        $('quiz-edit-answer-true')?.addEventListener('click', () => { if (editState) editState.judgeAnswer = true; updateJudgeButtons(); });
        $('quiz-edit-answer-false')?.addEventListener('click', () => { if (editState) editState.judgeAnswer = false; updateJudgeButtons(); });

        // 答题页
        $('quiz-back')?.addEventListener('click', () => {
            if (session && !session.submitted && !confirm('退出将丢失本次作答，确定退出？')) return;
            pageManager.switchToPage('home-page');
        });
        $('quiz-prev-btn')?.addEventListener('click', quizPrev);
        $('quiz-next-btn')?.addEventListener('click', quizNext);
        $('quiz-submit-btn')?.addEventListener('click', quizOpenSheet);
        $('quiz-sheet-btn')?.addEventListener('click', quizOpenSheet);
        $('quiz-sheet-close')?.addEventListener('click', () => { $('quiz-sheet-modal').style.display = 'none'; });
        $('quiz-sheet-submit')?.addEventListener('click', quizDoSubmit);
        $('quiz-sheet-list')?.addEventListener('click', e => {
            const item = e.target.closest('.quiz-sheet-item');
            if (item) quizSheetJump(item.dataset.index);
        });
        document.getElementById('hw-submit-quiz-btn')?.addEventListener('click', quizFinishSubjective);
        $('quiz-question-card')?.addEventListener('click', e => {
            const btn = e.target.closest('.quiz-option, .quiz-subj-btn');
            if (btn) quizSelect(btn);
        });
        $('quiz-chapter-list')?.addEventListener('click', e => {
            const btn = e.target.closest('.quiz-chapter-btn');
            if (btn) quizStart(btn.dataset.chapter);
        });
        $('quiz-compose-entry')?.addEventListener('click', openComposeModal);
        $('quiz-compose-cancel')?.addEventListener('click', () => { $('quiz-compose-modal').style.display = 'none'; });
        $('quiz-compose-generate')?.addEventListener('click', generateCompose);
        $('quiz-compose-rows')?.addEventListener('input', e => {
            const t = e.target.dataset.type;
            if (!t || !composeConfig[t]) return;
            const field = e.target.classList.contains('compose-count') ? 'count' : 'score';
            composeConfig[t][field] = parseFloat(e.target.value) || 0;
            updateComposeTotal();
        });

        // 结束页
        $('quiz-complete-back')?.addEventListener('click', () => pageManager.switchToPage('home-page'));
        $('quiz-complete-home')?.addEventListener('click', () => pageManager.switchToPage('home-page'));
        $('quiz-retry-btn')?.addEventListener('click', () => openStudentQuiz());
        $('quiz-export-csv-btn')?.addEventListener('click', quizExportCsv);
        $('quiz-export-img-btn')?.addEventListener('click', quizExportImage);
    }

    function startClock() {
        setInterval(() => {
            const d = new Date();
            const p = n => String(n).padStart(2, '0');
            const str = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
            ['quizClock', 'quizCompleteClock'].forEach(id => { const el = $(id); if (el) el.textContent = str; });
        }, 1000);
    }

    function init() {
        loadBank();
        bindEvents();
        startClock();
        refreshEntryVisibility();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    return {
        loadBank, importFromFiles, openManage, openStudentQuiz,
        bank: () => bank
    };
})();

