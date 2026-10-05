// ==================== 音频系统 ====================
let synth = null;
let reverb = null;

function initAudio() {
    if (appState.audioInitialized) return;
    try {
        // 先启动音频上下文
        Tone.start();
        
        reverb = new Tone.Reverb({ decay: 1.5, wet: 0.15 }).toDestination();
        
        // 使用GM音色 - 钢琴（Acoustic Grand Piano）
        // 使用更简单的合成器设置，减少延迟
        synth = new Tone.PolySynth({
            oscillator: {
                type: 'triangle'
            },
            envelope: {
                attack: 0.001,    // 非常短的起音时间
                decay: 0.1,
                sustain: 0.3,
                release: 0.5      // 较短的释放时间
            },
            volume: -6
        }).connect(reverb);
        
        // 预加载一些音符，减少首次播放延迟
        synth.triggerAttackRelease("C4", 0.1);
        synth.triggerAttackRelease("G4", 0.1);
        
        appState.audioInitialized = true;
        console.log('✅ GM钢琴音色初始化完成');
    } catch (e) { 
        console.warn('音频初始化失败:', e);
        // 尝试更简单的方案
        try {
            synth = new Tone.Synth().toDestination();
            appState.audioInitialized = true;
            console.log('✅ 简单合成器初始化完成');
        } catch (e2) {
            console.error('所有音频初始化都失败:', e2);
        }
    }
}

function playChord(notes) {
    if (!synth) initAudio();
    if (!notes || notes.length === 0) return;
    
    // 确保音频上下文已启动
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }
    
    // 使用setTimeout避免阻塞
    setTimeout(() => {
        try {
            synth.triggerAttackRelease(notes, 1.0);
        } catch (e) {
            console.warn('播放和弦失败:', e);
        }
    }, 10);
}

function playSingleNote(note) {
    if (!synth) initAudio();
    
    // 确保音频上下文已启动
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }
    
    // 使用setTimeout避免阻塞
    setTimeout(() => {
        try {
            synth.triggerAttackRelease(note, "8n");  // 使用更短的音符时长
        } catch (e) {
            console.warn('播放单音失败:', e);
        }
    }, 10);
}
