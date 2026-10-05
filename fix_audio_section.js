// ==================== 音频系统 ====================
let synth = null;
let reverb = null;
let audioInitialized = false;

function initAudio() {
    if (audioInitialized) return;
    
    try {
        // 先启动音频上下文
        Tone.start().then(() => {
            console.log('Tone.js音频上下文已启动');
        }).catch(e => {
            console.warn('启动音频上下文失败:', e);
        });
        
        // 创建混响效果
        reverb = new Tone.Reverb({
            decay: 1.2,
            wet: 0.1
        }).toDestination();
        
        // 使用简单的合成器模拟GM钢琴音色
        // 使用FM合成器可以产生更丰富的音色
        synth = new Tone.PolySynth(Tone.FMSynth, {
            harmonicity: 2.5,
            modulationIndex: 10,
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.001,  // 非常短的起音时间
                decay: 0.2,
                sustain: 0.3,
                release: 0.3    // 较短的释放时间
            },
            modulation: {
                type: "square"
            },
            modulationEnvelope: {
                attack: 0.002,
                decay: 0.2,
                sustain: 0.3,
                release: 0.3
            }
        }).connect(reverb);
        
        synth.volume.value = -8;
        
        // 预触发一个非常短的音符来预热音频系统
        setTimeout(() => {
            try {
                synth.triggerAttackRelease("C4", 0.01);
            } catch (e) {
                // 忽略预加载错误
            }
        }, 100);
        
        audioInitialized = true;
        appState.audioInitialized = true;
        console.log('✅ GM钢琴音色初始化完成');
        
    } catch (e) {
        console.warn('音频初始化失败，尝试备用方案:', e);
        initFallbackAudio();
    }
}

function initFallbackAudio() {
    try {
        // 备用方案：更简单的合成器
        synth = new Tone.Synth({
            oscillator: {
                type: 'triangle'
            },
            envelope: {
                attack: 0.001,
                decay: 0.1,
                sustain: 0.3,
                release: 0.2
            }
        }).toDestination();
        
        synth.volume.value = -6;
        audioInitialized = true;
        appState.audioInitialized = true;
        console.log('✅ 备用音频初始化完成');
    } catch (e) {
        console.error('所有音频初始化都失败:', e);
    }
}

function playChord(notes) {
    if (!synth) {
        initAudio();
        // 给一点时间初始化
        setTimeout(() => playChordNow(notes), 50);
        return;
    }
    playChordNow(notes);
}

function playChordNow(notes) {
    if (!notes || notes.length === 0) return;
    
    try {
        // 确保音频上下文已启动
        if (Tone.context.state !== 'running') {
            Tone.context.resume().then(() => {
                synth.triggerAttackRelease(notes, 1.0);
            }).catch(e => {
                console.warn('恢复音频上下文失败:', e);
            });
        } else {
            synth.triggerAttackRelease(notes, 1.0);
        }
    } catch (e) {
        console.warn('播放和弦失败:', e);
    }
}

function playSingleNote(note) {
    if (!synth) {
        initAudio();
        // 给一点时间初始化
        setTimeout(() => playSingleNoteNow(note), 50);
        return;
    }
    playSingleNoteNow(note);
}

function playSingleNoteNow(note) {
    try {
        // 确保音频上下文已启动
        if (Tone.context.state !== 'running') {
            Tone.context.resume().then(() => {
                synth.triggerAttackRelease(note, "8n");
            }).catch(e => {
                console.warn('恢复音频上下文失败:', e);
            });
        } else {
            synth.triggerAttackRelease(note, "8n");
        }
    } catch (e) {
        console.warn('播放单音失败:', e);
    }
}
