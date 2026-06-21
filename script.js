const ROUND_SIZE = 10;

// 42 个知识点 × 3 种出题表述 = 126 道随机题库。
const facts = [
  ['基础跑酷', '入门', '跨越普通的两格宽缺口前，最重要的准备动作是？', '先进入疾跑状态', ['原地潜行', '先进入疾跑状态', '关闭跳跃键', '把视角完全朝下'], '疾跑能提供跨越两格缺口所需的水平速度。'],
  ['基础跑酷', '入门', '跑酷时按住潜行键靠近边缘，主要有什么作用？', '避免直接从方块边缘掉下去', ['增加跳跃高度', '避免直接从方块边缘掉下去', '自动疾跑', '消除摔落伤害'], '潜行会让角色在方块边缘停住，是观察和对齐落点的好习惯。'],
  ['基础跑酷', '入门', '想要在跳跃中保持较远的水平距离，通常应使用？', '疾跑跳', ['原地跳', '疾跑跳', '潜行跳', '倒退跳'], '疾跑跳会保留更高的水平速度。'],
  ['基础跑酷', '入门', '跑酷中看到头顶很低的方块时，通常要注意什么？', '它会限制跳跃高度', ['它会自动加速', '它会限制跳跃高度', '它会提供夜视', '它会抵消惯性'], '顶头方块会形成“压头”效果，影响角色上升高度。'],
  ['基础跑酷', '入门', '从高处落下时，哪种落点最能避免摔落伤害？', '水面', ['仙人掌', '水面', '岩浆', '营火'], '落入水中可以消除这次摔落伤害。'],
  ['基础跑酷', '入门', '梯子在跑酷地图中常见的用途之一是？', '在下落时接住玩家', ['让玩家永久加速', '在下落时接住玩家', '自动完成关卡', '增加饥饿值'], '只要成功贴到梯子上，就能停止下落并攀爬。'],
  ['基础跑酷', '入门', '藤蔓在跑酷中和梯子相似的特性是？', '可以攀爬并接住下落', ['会反弹玩家', '可以攀爬并接住下落', '会发出红石信号', '能恢复生命'], '藤蔓能攀爬，也常被用作空中落点。'],
  ['基础跑酷', '入门', '落到黏液块上时通常会发生什么？', '玩家会向上弹起', ['玩家会立即死亡', '玩家会向上弹起', '玩家会被传送', '玩家会永久减速'], '黏液块能把落下的玩家弹起，是弹跳关的核心方块。'],
  ['基础跑酷', '入门', '蜂蜜块最显著的跑酷特性是什么？', '会让角色移动变慢', ['会让角色移动变慢', '会让角色持续加速', '会自动弹跳', '会点燃角色'], '蜂蜜块表面和侧面都会显著减慢移动，是精细控制关常用的材料。'],
  ['基础跑酷', '入门', '灵魂沙地面在跑酷中会怎样影响移动？', '降低移动速度', ['降低移动速度', '增加跳跃高度', '让玩家隐身', '自动补充饥饿值'], '灵魂沙会减速，因此要更早规划起跳点。'],
  ['基础跑酷', '入门', '冰面跑酷最需要留意的手感是？', '移动惯性更大、更难立刻停下', ['没有任何摩擦', '移动惯性更大、更难立刻停下', '会持续扣血', '无法跳跃'], '冰块很滑，方向和刹车都要预留空间。'],
  ['基础跑酷', '入门', '跳跃提升效果最直接改变的是？', '跳跃高度', ['挖掘速度', '跳跃高度', '视野亮度', '游泳速度'], '跳跃提升会让角色达到更高的高度。'],
  ['基础跑酷', '入门', '缓降效果在高空跑酷中最主要的作用是？', '减慢下落速度', ['把玩家推向上方', '减慢下落速度', '完全禁止移动', '自动回到出生点'], '缓降能大幅降低下落速度，便于空中调整。'],
  ['基础跑酷', '入门', '摔落保护附魔最适合应对哪类风险？', '摔落伤害', ['火焰伤害', '摔落伤害', '溺水伤害', '饥饿消耗'], '摔落保护能降低鞋子穿戴者受到的摔落伤害。'],
  ['路线判断', '进阶', '面对连续方块时，稳定通关更依赖什么？', '提前观察下一到两个落点', ['只盯着脚下', '提前观察下一到两个落点', '不停切换背包', '把视角固定在天空'], '提前读路线可以避免落地后才临时转向。'],
  ['路线判断', '进阶', '跑酷失败后，最有效的复盘方式通常是？', '判断自己起跳点或转向时机的问题', ['立刻更换所有按键', '判断自己起跳点或转向时机的问题', '随机选择另一条路', '关闭声音'], '把失败定位到起跳、空中调整或落点，更容易稳定进步。'],
  ['路线判断', '进阶', '狭窄落点前使用潜行，通常是为了？', '精确调整站位', ['让方块变大', '精确调整站位', '恢复耐久', '获得额外分数'], '潜行能减少误踩边缘的风险，适合微调位置。'],
  ['路线判断', '进阶', '一段路线的落点看不清时，先做什么更稳妥？', '停在安全处观察路线', ['闭眼跳过去', '停在安全处观察路线', '立刻退出游戏', '向后连续跳'], '先确认落点高度和方向，是稳定通关比拼速度前的必要步骤。'],
  ['技术跑酷', '进阶', '技术跑酷里，“动量”通常指什么？', '角色移动时积累并保留的速度', ['装备的耐久', '角色移动时积累并保留的速度', '地图的加载进度', '饥饿值上限'], '许多远跳和连续跳都依赖对移动速度与方向的控制。'],
  ['技术跑酷', '进阶', '连续跳跃中，为什么落地时机很重要？', '它影响下一次起跳的节奏和速度', ['它会改变天气', '它影响下一次起跳的节奏和速度', '它会删除检查点', '它能增加生命值'], '稳定的落地节奏是连续动作保持流畅的关键。'],
  ['技术跑酷', '进阶', '进行远距离跳跃时，视角与移动方向应怎样配合？', '尽量对准目标并保持平稳输入', ['始终快速甩动', '尽量对准目标并保持平稳输入', '只看人物背后', '持续按潜行'], '平稳、可重复的方向控制比慌乱甩视角更可靠。'],
  ['技术跑酷', '进阶', '练习高难跳跃时，最合理的训练顺序是？', '先拆成单个动作重复练习', ['直接挑战整张地图', '先拆成单个动作重复练习', '每次都换灵敏度', '只练最后一跳'], '先把单项动作练成肌肉记忆，再连成路线，学习效率更高。'],
  ['技术跑酷', '进阶', '技术跑酷中“稳定性”更接近下面哪种能力？', '多次复现同一个成功动作', ['偶然完成一次极限跳跃', '多次复现同一个成功动作', '使用更多特效', '更快重生'], '可复现的动作才是可靠的技术。'],
  ['方块机制', '进阶', '脚手架最适合作为哪类跑酷路线的辅助？', '需要快速上下移动的垂直路线', ['完全封闭的水下路线', '需要快速上下移动的垂直路线', '只能横向移动的冰道', '红石计分板'], '脚手架可快速攀爬和下降，经常用于垂直移动。'],
  ['方块机制', '进阶', '栅栏的碰撞高度相比普通完整方块如何？', '看起来更高，不能按普通一格高度判断', ['完全没有碰撞', '看起来更高，不能按普通一格高度判断', '比地毯更低', '会使玩家漂浮'], '栅栏碰撞高度较高，路线设计和通过时需要特别注意。'],
  ['方块机制', '进阶', '蜘蛛网在跑酷地图中常被用来制造什么效果？', '大幅减速并延长空中停留', ['瞬间加速', '大幅减速并延长空中停留', '传送至终点', '自动补血'], '蜘蛛网会显著减慢移动和下落，可做精细节奏关。'],
  ['方块机制', '进阶', '细雪中移动时，穿戴皮革靴的一个优势是？', '可以站在细雪上而不陷入', ['可以获得疾跑二段跳', '可以站在细雪上而不陷入', '免疫所有伤害', '让冰块不再打滑'], '皮革靴让玩家可以站在细雪表面。'],
  ['方块机制', '进阶', '岩浆旁边的跑酷路线最应优先设置什么？', '清晰的安全落点或检查点', ['更多火焰粒子', '清晰的安全落点或检查点', '更暗的光线', '完全隐藏终点'], '高惩罚区域应保证玩家能读懂路线，并合理设置回退点。'],
  ['红石与地图', '进阶', '压力板在跑酷地图中最常见的功能是？', '触发机关或记录到达', ['让玩家获得钻石', '触发机关或记录到达', '改变角色皮肤', '自动保存截图'], '压力板可作为机关触发器，也常用于检测玩家是否到达指定位置。'],
  ['红石与地图', '进阶', '红石中继器能为信号带来什么？', '延迟', ['永久隐身', '延迟', '跳跃加成', '无限距离'], '中继器可延迟红石信号，适合控制机关节奏。'],
  ['红石与地图', '进阶', '观察者方块的核心能力是？', '检测前方方块状态变化并输出信号', ['复制玩家物品', '检测前方方块状态变化并输出信号', '抵消摔落伤害', '显示小地图'], '观察者检测到方块变化后会短暂输出红石信号。'],
  ['红石与地图', '进阶', '活塞机关在跑酷图中可以用来做什么？', '推动方块改变路线', ['让玩家飞行', '推动方块改变路线', '直接生成终点', '隐藏所有方块'], '活塞能推动许多方块，是动态平台和限时路线的常用组件。'],
  ['红石与地图', '进阶', '红石灯常被用来向跑酷玩家传达什么？', '机关状态或路线提示', ['角色等级', '机关状态或路线提示', '聊天消息', '附魔属性'], '用灯光表达开关状态，能让地图反馈更直观。'],
  ['红石与地图', '进阶', '命令方块在跑酷地图开发中常可用于？', '执行传送、计时或提示等命令', ['提高显示器亮度', '执行传送、计时或提示等命令', '改变电脑密码', '修理鼠标'], '命令方块能自动执行命令，是玩法地图常用的制作工具。'],
  ['红石与地图', '进阶', '计分板系统在闯关地图中适合显示什么？', '用时、分数或关卡进度', ['玩家真实地址', '用时、分数或关卡进度', '电脑硬件温度', '浏览器历史'], '计分板可将计时、分数等信息显示给玩家。'],
  ['地图设计', '挑战', '跑酷地图中的检查点最重要的价值是？', '失败后从合理位置继续', ['强制清空背包', '失败后从合理位置继续', '降低画面帧率', '自动跳过所有关卡'], '检查点能减少重复跑过已掌握路线的挫败感。'],
  ['地图设计', '挑战', '好的跑酷路线提示应该怎样设计？', '让玩家能通过方块、光线或视线理解目标', ['把所有线索完全藏起来', '让玩家能通过方块、光线或视线理解目标', '只用文字塞满屏幕', '把起点和终点放在一起'], '环境提示能让玩家自然读懂路线，减少无意义试错。'],
  ['地图设计', '挑战', '为新手设计第一关时，更推荐哪种难度安排？', '先让玩家熟悉基础动作', ['开局就连续极限跳', '先让玩家熟悉基础动作', '不放任何落点', '随机传送玩家'], '第一关应教学与热身，让玩家理解地图规则和手感。'],
  ['地图设计', '挑战', '限时机关关最需要向玩家清楚传达什么？', '触发条件与可用时间', ['作者的真实姓名', '触发条件与可用时间', '全部命令代码', '服务器地址'], '玩家必须知道何时开始、多久结束，挑战才显得公平。'],
  ['地图设计', '挑战', '多人跑酷竞速的公平性主要依赖什么？', '相同的起点、规则和计时标准', ['谁先选择皮肤', '相同的起点、规则和计时标准', '谁的显示器更大', '谁的名字更长'], '统一起点、路线与计时方式，才能比较成绩。'],
  ['网易版玩法', '挑战', '在网易版《我的世界》中，玩法地图和组件通常可以从哪里获取？', '组件中心', ['末地城', '组件中心', '熔炉', '附魔台'], '组件中心汇集了丰富的玩法组件、地图与外观内容。'],
  ['网易版玩法', '挑战', '分享一张跑酷地图前，最值得优先测试的是什么？', '出生点、检查点与终点是否都能正常到达', ['背景音乐是否最大声', '出生点、检查点与终点是否都能正常到达', '方块名称是否很长', '天气是否永远下雨'], '完整试玩一遍核心流程，能发现大多数阻断通关的问题。']
];

const promptStyles = ['实战判断：', '路线复盘：', '技巧挑战：'];
let questions = [];
let index = 0, score = 0, locked = false;
const $ = (id) => document.getElementById(id);
const els = { question: $('question'), answers: $('answers'), category: $('category'), difficulty: $('difficulty'), number: $('questionNumber'), total: $('questionTotal'), score: $('score'), feedback: $('feedback'), feedbackIcon: $('feedbackIcon'), feedbackTitle: $('feedbackTitle'), feedbackText: $('feedbackText'), progress: $('progressFill'), progressText: $('progressText'), modal: $('resultModal') };

function shuffle(items) { return [...items].sort(() => Math.random() - 0.5); }
function buildRound() {
  return shuffle(facts).slice(0, ROUND_SIZE).map((fact) => {
    const [category, level, prompt, correctAnswer, options, note] = fact;
    const answers = shuffle(options);
    return { category, level, q: `${promptStyles[Math.floor(Math.random() * promptStyles.length)]}${prompt}`, a: answers, correct: answers.indexOf(correctAnswer), note };
  });
}
function render() {
  const item = questions[index];
  locked = false; els.feedback.hidden = true;
  els.question.textContent = item.q; els.category.textContent = item.category; els.difficulty.textContent = item.level;
  els.number.textContent = String(index + 1).padStart(2, '0');
  const progress = Math.round(index / questions.length * 100);
  els.progress.style.width = `${progress}%`; els.progressText.textContent = `${progress}%`;
  els.answers.innerHTML = '';
  item.a.forEach((optionText, optionIndex) => { const button = document.createElement('button'); button.className = 'answer'; button.type = 'button'; button.innerHTML = `<span class="answer-key">${String.fromCharCode(65 + optionIndex)}</span>${optionText}`; button.addEventListener('click', () => answer(optionIndex)); els.answers.appendChild(button); });
}
function answer(choice) {
  if (locked) return; locked = true;
  const item = questions[index], buttons = [...els.answers.children], right = choice === item.correct;
  buttons.forEach((button, i) => { button.disabled = true; if (i === item.correct) button.classList.add('correct'); if (i === choice && !right) button.classList.add('wrong'); });
  if (right) score += 10; els.score.textContent = score;
  els.feedback.hidden = false; els.feedbackIcon.textContent = right ? '✓' : '×'; els.feedbackIcon.className = `feedback-icon${right ? '' : ' bad'}`;
  els.feedbackTitle.textContent = right ? '答对了！+10 绿宝石' : '差一点，再记住这条！'; els.feedbackText.textContent = item.note;
}
function next() { if (index < questions.length - 1) { index++; render(); } else finish(); }
function finish() { els.progress.style.width = '100%'; els.progressText.textContent = '100%'; $('finalScore').textContent = score; $('finalTotal').textContent = questions.length * 10; $('resultMessage').textContent = score >= 80 ? '很强！你已经是跑酷世界的资深探索者。' : score >= 50 ? '不错的冒险记录，再挑战一次冲击满分吧。' : '每一次失败都在帮你读懂路线，继续探索吧！'; els.modal.hidden = false; }
function restart() { questions = buildRound(); index = 0; score = 0; els.score.textContent = 0; els.modal.hidden = true; render(); }
async function share() { const text = '来挑战「方块知识局」：网易版《我的世界》跑酷知识问答！'; try { if (navigator.share) await navigator.share({ title: '方块知识局', text, url: location.href }); else { await navigator.clipboard.writeText(location.href); toast('链接已复制，快分享给朋友吧！'); } } catch (e) { if (e.name !== 'AbortError') { try { await navigator.clipboard.writeText(location.href); toast('链接已复制，快分享给朋友吧！'); } catch { toast('请复制浏览器地址栏链接分享。'); } } } }
function toast(message) { const el = $('toast'); el.textContent = message; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2600); }

$('nextButton').addEventListener('click', next); $('restartButton').addEventListener('click', restart); $('shareButton').addEventListener('click', share); $('modalShare').addEventListener('click', share);
questions = buildRound(); els.total.textContent = ROUND_SIZE; render();
