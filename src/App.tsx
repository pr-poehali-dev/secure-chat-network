import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Section = 'chats' | 'profile' | 'bots' | 'admin' | 'library' | 'notifications' | 'search' | 'settings';
type Role = 'user' | 'admin';

interface User {
  phone: string;
  userId: string;
  name: string;
  role: Role;
  phoneHidden: boolean;
}

const CHATS = [
  { id: 1, name: 'Алексей Петров', userId: '@alex_p', msg: 'Увидимся завтра в 10:00', time: '14:32', unread: 2, online: true, encrypted: true },
  { id: 2, name: 'Команда разработки', userId: '@dev_team', msg: 'Релиз назначен на пятницу 🚀', time: '13:10', unread: 1, online: false, group: true },
  { id: 3, name: 'Мария Соколова', userId: '@maria_s', msg: 'Отправила документы', time: '11:55', unread: 0, online: true, encrypted: true },
  { id: 4, name: 'Дизайн канал', userId: '@design_ch', msg: 'Новые макеты готовы', time: 'вчера', unread: 0, online: false, group: true },
  { id: 5, name: 'Николай Иванов', userId: '@nikolay_i', msg: 'Всё принял, спасибо!', time: 'вчера', unread: 0, online: false, encrypted: true },
];

const MESSAGES = [
  { id: 1, out: false, text: 'Привет! Как дела с проектом?', time: '13:55' },
  { id: 2, out: true, text: 'Всё идёт по плану. Завтра закончу основной модуль.', time: '13:57' },
  { id: 3, out: false, text: 'Отлично! Когда можем обсудить детали?', time: '14:01' },
  { id: 4, out: true, text: 'Давай сегодня в 17:00? Созвонимся.', time: '14:03' },
  { id: 5, out: false, isPhoto: true, nsfw: true, time: '14:04', caption: 'Глянь фото 😏' },
  { id: 6, out: false, text: 'Договорились. Жду звонка!', time: '14:05' },
];

const NOTIFICATIONS = [
  { id: 1, icon: 'MessageCircle', color: 'var(--nex-blue)', text: 'Алексей Петров написал вам сообщение', time: '2 мин назад', read: false },
  { id: 2, icon: 'Users', color: 'var(--nex-violet)', text: 'Вы добавлены в группу «Команда разработки»', time: '1 час назад', read: false },
  { id: 3, icon: 'Bot', color: 'var(--nex-cyan)', text: 'Бот NexAssist выполнил задачу', time: '3 часа назад', read: true },
  { id: 4, icon: 'Shield', color: 'var(--nex-green)', text: 'Вход с нового устройства подтверждён', time: 'вчера', read: true },
  { id: 5, icon: 'Bell', color: 'var(--nex-pink)', text: 'Мария Соколова упомянула вас в чате', time: 'вчера', read: true },
];

const BOTS = [
  { id: 1, name: 'NexAssist', desc: 'Умный помощник для автоматизации задач', icon: '🤖', active: true, calls: 1240 },
  { id: 2, name: 'NSFW Detector', desc: 'Распознаёт 18+ фото и отправляет администрации', icon: '🛡️', active: true, calls: 87 },
  { id: 3, name: 'FileBot', desc: 'Управление и обработка файлов', icon: '📁', active: true, calls: 340 },
  { id: 4, name: 'NotifyBot', desc: 'Система уведомлений и напоминаний', icon: '🔔', active: false, calls: 89 },
];

const FILES = [
  { id: 1, name: 'Презентация Q1.pdf', size: '4.2 МБ', type: 'pdf', date: '10 мая' },
  { id: 2, name: 'Дизайн макет v3.fig', size: '18.7 МБ', type: 'fig', date: '9 мая' },
  { id: 3, name: 'Фото команды.jpg', size: '2.1 МБ', type: 'img', date: '8 мая' },
  { id: 4, name: 'Отчёт апрель.xlsx', size: '1.4 МБ', type: 'xls', date: '1 мая' },
  { id: 5, name: 'Лого финал.png', size: '540 КБ', type: 'img', date: '28 апр' },
  { id: 6, name: 'Контракт.docx', size: '890 КБ', type: 'doc', date: '25 апр' },
];

const NSFW_REPORTS = [
  { id: 1, sender: 'Анонимный пользователь #4823', userId: '@user_4823', receiver: '@maria_s', confidence: 98, time: '12 мин назад', status: 'new' },
  { id: 2, sender: 'Антон М.', userId: '@anton_m', receiver: '@alex_p', confidence: 94, time: '1 час назад', status: 'new' },
  { id: 3, sender: 'Гость #1290', userId: '@guest_1290', receiver: '@nikolay_i', confidence: 87, time: '3 часа назад', status: 'reviewed' },
  { id: 4, sender: 'Дмитрий К.', userId: '@dkoz', receiver: '@ivan_dev', confidence: 99, time: 'вчера', status: 'reviewed' },
];

const fileIcon = (type: string) => {
  switch (type) {
    case 'pdf': return '📄'; case 'fig': return '🎨'; case 'img': return '🖼️';
    case 'xls': return '📊'; case 'doc': return '📝'; default: return '📁';
  }
};

function Avatar({ name, size = 40, online }: { name: string; size?: number; online?: boolean }) {
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];
  const color = colors[name.charCodeAt(0) % colors.length];
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('');
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div style={{ width: size, height: size, borderRadius: '50%', background: `linear-gradient(135deg, ${color}99, ${color})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.38, fontWeight: 700, color: '#fff', border: '2px solid rgba(255,255,255,0.08)' }}>{initials}</div>
      {online && <div className="online-dot" style={{ position: 'absolute', bottom: 1, right: 1 }} />}
    </div>
  );
}

/* ============ AUTH SCREENS ============ */

function AuthScreen({ onLogin }: { onLogin: (u: User) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [adminMode, setAdminMode] = useState(false);

  const submit = () => {
    if (mode === 'register' && step === 1) { setStep(2); return; }
    onLogin({
      phone: phone || '+7 (000) 000-00-00',
      userId: userId || '@new_user',
      name: name || 'Новый пользователь',
      role: adminMode ? 'admin' : 'user',
      phoneHidden: false,
    });
  };

  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div className="nex-bg"><div className="nex-blob3" /></div>
      <div className="glass animate-fade-in-up" style={{ position: 'relative', zIndex: 10, width: 420, maxWidth: '90vw', padding: 36, borderRadius: 24 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="pulse-glow" style={{ width: 60, height: 60, borderRadius: 18, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Icon name="Zap" size={30} style={{ color: '#fff' }} />
          </div>
          <div className="gradient-text" style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>NexChat</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>
            {mode === 'register' ? (step === 1 ? 'Создание аккаунта' : 'Придумай свой User ID') : 'Вход в защищённый чат'}
          </div>
        </div>

        {mode === 'register' && step === 2 ? (
          <>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6, display: 'block' }}>Ваше имя</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Например: Иван Сидоров" className="auth-input" />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6, display: 'block' }}>User ID (по нему вас будут находить)</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>@</span>
                <input value={userId.replace('@', '')} onChange={e => setUserId('@' + e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))} placeholder="my_unique_id" className="auth-input" style={{ paddingLeft: 28 }} />
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>Только латиница, цифры и _. Изменить нельзя.</div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 18, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              <input type="checkbox" checked={adminMode} onChange={e => setAdminMode(e.target.checked)} style={{ accentColor: '#3b82f6' }} />
              Войти как администратор (демо-режим)
            </label>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6, display: 'block' }}>Номер телефона</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" className="auth-input" />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6, display: 'block' }}>Пароль</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Минимум 8 символов" className="auth-input" />
            </div>
          </>
        )}

        <button onClick={submit} className="btn-gradient" style={{ width: '100%', padding: '13px', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 14 }}>
          {mode === 'register' ? (step === 1 ? 'Продолжить →' : 'Создать аккаунт') : 'Войти'}
        </button>

        <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
          {mode === 'register' ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
          <span onClick={() => { setMode(mode === 'register' ? 'login' : 'register'); setStep(1); }} style={{ color: 'var(--nex-blue)', cursor: 'pointer', fontWeight: 600 }}>
            {mode === 'register' ? 'Войти' : 'Зарегистрироваться'}
          </span>
        </div>

        <div style={{ marginTop: 20, padding: 12, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon name="ShieldCheck" size={16} style={{ color: 'var(--nex-green)', flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
            Все чаты защищены сквозным шифрованием (E2E). Пароль хешируется локально.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ CHATS ============ */

function NSFWPhoto({ caption }: { caption?: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div style={{ position: 'relative', width: 220, height: 240, borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(135deg, #1e293b, #334155)' }}>
      <div style={{ position: 'absolute', inset: 0, background: revealed ? 'linear-gradient(135deg, #ec4899, #f59e0b, #ef4444)' : 'linear-gradient(135deg, #475569, #1e293b)', filter: revealed ? 'none' : 'blur(28px) saturate(0.6)', transition: 'filter 0.4s' }} />
      {!revealed && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 16, gap: 10 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="EyeOff" size={22} style={{ color: '#fca5a5' }} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Фото 18+ контент</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
            Бот NSFW Detector обнаружил откровенный контент
          </div>
          <button onClick={() => setRevealed(true)} style={{ marginTop: 4, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)', padding: '7px 16px', borderRadius: 99, fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="Eye" size={13} /> Открыть
          </button>
        </div>
      )}
      {revealed && (
        <>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>📸</div>
          <button onClick={() => setRevealed(false)} style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: 99, width: 26, height: 26, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Icon name="EyeOff" size={13} />
          </button>
        </>
      )}
      {caption && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 12px', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', fontSize: 12, color: '#fff' }}>{caption}</div>}
    </div>
  );
}

function ChatsSection() {
  const [selected, setSelected] = useState(1);
  const [message, setMessage] = useState('');
  const chat = CHATS.find(c => c.id === selected);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: 280, borderRight: '1px solid var(--nex-border)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '16px 16px 12px' }}>
          <div style={{ position: 'relative' }}>
            <Icon name="Search" size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
            <input placeholder="Поиск чатов..." style={{ width: '100%', padding: '8px 12px 8px 34px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--nex-border)', borderRadius: 10, color: '#fff', fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 8px' }}>
          {CHATS.map((c, i) => (
            <div key={c.id} onClick={() => setSelected(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 12, cursor: 'pointer', background: selected === c.id ? 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.12))' : 'transparent', border: selected === c.id ? '1px solid rgba(59,130,246,0.25)' : '1px solid transparent', marginBottom: 2, animation: `fade-in-up 0.3s ease ${i * 0.05}s both` }}>
              <Avatar name={c.name} size={42} online={c.online} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: selected === c.id ? '#fff' : 'rgba(255,255,255,0.85)' }}>{c.group ? '👥 ' : ''}{c.name}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>{c.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 140 }}>{c.msg}</span>
                  {c.unread > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', borderRadius: 99, padding: '1px 6px', minWidth: 18, textAlign: 'center', flexShrink: 0 }}>{c.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--nex-border)' }}>
          <button className="btn-gradient" style={{ width: '100%', padding: 9, borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>+ Новый чат</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--nex-border)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <Avatar name={chat?.name || ''} size={38} online={chat?.online} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{chat?.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{chat?.userId} • {chat?.online ? 'онлайн' : 'был недавно'}</div>
          </div>
          <span className="encrypt-badge"><Icon name="Lock" size={10} /> E2E шифрование</span>
          <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}><Icon name="Phone" size={16} /></button>
          <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}><Icon name="Video" size={16} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)', padding: '3px 10px', borderRadius: 99 }}>Сегодня • Сообщения защищены шифрованием</span>
          </div>
          {MESSAGES.map((m, i) => (
            <div key={m.id} style={{ display: 'flex', justifyContent: m.out ? 'flex-end' : 'flex-start', animation: `fade-in-up 0.25s ease ${i * 0.06}s both` }}>
              {m.isPhoto ? (
                <div className="msg-in" style={{ padding: 6, maxWidth: '70%' }}>
                  <NSFWPhoto caption={m.caption} />
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, textAlign: 'right', paddingRight: 4 }}>{m.time}</div>
                </div>
              ) : (
                <div className={m.out ? 'msg-out' : 'msg-in'} style={{ maxWidth: '68%', padding: '10px 14px' }}>
                  <div style={{ fontSize: 14, lineHeight: 1.5 }}>{m.text}</div>
                  <div style={{ fontSize: 11, color: m.out ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)', marginTop: 4, textAlign: 'right' }}>
                    {m.time} {m.out && <Icon name="CheckCheck" size={12} style={{ display: 'inline-block', verticalAlign: 'middle', color: '#60a5fa' }} />}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar name="Алексей Петров" size={28} />
            <div className="msg-in" style={{ padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
              <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
            </div>
          </div>
        </div>

        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--nex-border)', display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
          <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 10, padding: 10, cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><Icon name="Paperclip" size={18} /></button>
          <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Зашифрованное сообщение..." style={{ flex: 1, padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--nex-border)', borderRadius: 12, color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
          <button className="btn-gradient" style={{ borderRadius: 10, padding: '10px 14px', cursor: 'pointer', fontFamily: 'inherit' }}><Icon name="Send" size={18} /></button>
        </div>
      </div>
    </div>
  );
}

/* ============ PROFILE ============ */

function ProfileSection({ user }: { user: User }) {
  const fields = [
    { label: 'Имя', value: user.name, icon: 'User' },
    { label: 'User ID (по нему вас находят)', value: user.userId, icon: 'AtSign' },
    { label: 'Телефон', value: user.phoneHidden ? '••• скрыт •••' : user.phone, icon: 'Phone' },
    { label: 'Роль', value: user.role === 'admin' ? 'Администратор' : 'Пользователь', icon: 'Shield' },
  ];
  return (
    <div style={{ padding: 32, maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Мой профиль</h2>
      <div className="glass" style={{ borderRadius: 20, padding: 28, marginBottom: 16, animation: 'fade-in-up 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <div style={{ position: 'relative' }}>
            <Avatar name={user.name} size={72} online />
            <button style={{ position: 'absolute', bottom: 0, right: 0, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="Camera" size={12} style={{ color: '#fff' }} />
            </button>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>{user.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>{user.userId}</div>
            <span className="encrypt-badge" style={{ marginTop: 6, display: 'inline-flex' }}><Icon name="ShieldCheck" size={10} /> Аккаунт защищён</span>
          </div>
        </div>
        {fields.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < fields.length - 1 ? '1px solid var(--nex-border)' : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={f.icon} size={16} style={{ color: 'var(--nex-blue)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>{f.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{f.value}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-gradient" style={{ width: '100%', padding: 12, borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Редактировать профиль</button>
    </div>
  );
}

/* ============ BOTS ============ */

function BotsSection() {
  return (
    <div style={{ padding: 32, maxWidth: 720, margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Управление ботами</h2>
        <button className="btn-gradient" style={{ padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>+ Создать бота</button>
      </div>
      <div style={{ display: 'grid', gap: 14 }}>
        {BOTS.map((bot, i) => (
          <div key={bot.id} className="glass glass-hover" style={{ borderRadius: 16, padding: 20, display: 'flex', alignItems: 'center', gap: 16, animation: `fade-in-up 0.3s ease ${i * 0.08}s both` }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{bot.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{bot.name}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{bot.desc}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>
                <Icon name="Activity" size={11} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />{bot.calls.toLocaleString()} вызовов
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: bot.active ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)', color: bot.active ? 'var(--nex-green)' : 'rgba(255,255,255,0.35)', border: `1px solid ${bot.active ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.1)'}` }}>{bot.active ? '● Активен' : '○ Неактивен'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ ADMIN ============ */

function AdminSection() {
  const [tab, setTab] = useState<'users' | 'nsfw'>('nsfw');
  const stats = [
    { label: 'Пользователей', value: '1 482', icon: 'Users', color: 'var(--nex-blue)' },
    { label: 'Активных чатов', value: '342', icon: 'MessageCircle', color: 'var(--nex-violet)' },
    { label: 'Заблокировано', value: '23', icon: 'Ban', color: '#ef4444' },
    { label: '18+ сегодня', value: '14', icon: 'AlertTriangle', color: '#f59e0b' },
  ];
  const users = [
    { name: 'Антон Морозов', userId: '@anton_m', status: 'blocked', joined: '05.03.2024' },
    { name: 'Светлана Попова', userId: '@svet_p', status: 'active', joined: '12.01.2024' },
    { name: 'Дмитрий Козлов', userId: '@dkoz', status: 'warned', joined: '28.11.2023' },
  ];

  return (
    <div style={{ padding: 32, maxWidth: 940, margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Панель администратора</h2>
        <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 99, background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)', fontWeight: 600 }}>
          <Icon name="ShieldAlert" size={11} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />Только для админов
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} className="glass" style={{ borderRadius: 16, padding: '18px 20px', animation: `fade-in-up 0.3s ease ${i * 0.06}s both` }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Icon name={s.icon} size={20} style={{ color: s.color }} />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          { id: 'nsfw' as const, label: '18+ контент', icon: 'AlertTriangle', count: NSFW_REPORTS.filter(r => r.status === 'new').length },
          { id: 'users' as const, label: 'Пользователи', icon: 'Users' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', background: tab === t.id ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : 'rgba(255,255,255,0.05)', color: '#fff', border: tab === t.id ? 'none' : '1px solid var(--nex-border)' }}>
            <Icon name={t.icon} size={14} />{t.label}
            {t.count ? <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 99, padding: '0 7px', fontSize: 11 }}>{t.count}</span> : null}
          </button>
        ))}
      </div>

      {tab === 'nsfw' ? (
        <div className="glass" style={{ borderRadius: 16, padding: 20, animation: 'fade-in-up 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <h3 style={{ fontWeight: 600, fontSize: 15 }}>Фото 18+ (отчёты бота NSFW Detector)</h3>
            <span className="encrypt-badge"><Icon name="Lock" size={10} /> E2E + админ-токен</span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16, lineHeight: 1.5 }}>
            Бот распознаёт откровенный контент и отправляет копию админам через защищённый канал. Получатель видит фото без модерации (с предупреждением и блюром). Отправитель получает уведомление о том, что фото помечено 18+.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {NSFW_REPORTS.map((r, i) => (
              <div key={r.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--nex-border)', borderRadius: 14, padding: 14, display: 'flex', gap: 14, animation: `fade-in-up 0.3s ease ${i * 0.07}s both` }}>
                <div style={{ position: 'relative', width: 90, height: 90, borderRadius: 12, overflow: 'hidden', background: 'linear-gradient(135deg, #475569, #1e293b)', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #ec4899aa, #f59e0baa)', filter: 'blur(14px)' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#fff' }}>
                    <Icon name="EyeOff" size={18} />
                    <span style={{ fontSize: 10, marginTop: 2, fontWeight: 600 }}>18+</span>
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{r.sender}</div>
                    <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 99, background: r.status === 'new' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.12)', color: r.status === 'new' ? '#fca5a5' : '#6ee7b7', fontWeight: 700, flexShrink: 0 }}>
                      {r.status === 'new' ? 'НОВОЕ' : 'Просмотрено'}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{r.userId} → {r.receiver}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ width: `${r.confidence}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #ef4444)' }} />
                    </div>
                    <span style={{ fontSize: 11, color: '#fca5a5', fontWeight: 700 }}>{r.confidence}%</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>{r.time}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    <button style={{ flex: 1, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 7, padding: '5px', cursor: 'pointer', fontSize: 11, color: 'var(--nex-blue)', fontFamily: 'inherit', fontWeight: 600 }}>Открыть</button>
                    <button style={{ flex: 1, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 7, padding: '5px', cursor: 'pointer', fontSize: 11, color: '#ef4444', fontFamily: 'inherit', fontWeight: 600 }}>Блок</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass" style={{ borderRadius: 16, padding: 20, animation: 'fade-in-up 0.3s ease' }}>
          <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Управление пользователями</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>{['Пользователь', 'User ID', 'Статус', 'Регистрация', 'Действия'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 600, borderBottom: '1px solid var(--nex-border)' }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: 12, fontSize: 14, fontWeight: 500 }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Avatar name={u.name} size={30} />{u.name}</div></td>
                  <td style={{ padding: 12, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{u.userId}</td>
                  <td style={{ padding: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: u.status === 'active' ? 'rgba(16,185,129,0.12)' : u.status === 'blocked' ? 'rgba(239,68,68,0.12)' : 'rgba(245,158,11,0.12)', color: u.status === 'active' ? '#10b981' : u.status === 'blocked' ? '#ef4444' : '#f59e0b' }}>
                      {u.status === 'active' ? 'Активен' : u.status === 'blocked' ? 'Заблокирован' : 'Предупреждён'}
                    </span>
                  </td>
                  <td style={{ padding: 12, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{u.joined}</td>
                  <td style={{ padding: 12 }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'inherit' }}>Профиль</button>
                      <button style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12, color: '#ef4444', fontFamily: 'inherit' }}>Блок</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ============ LIBRARY / NOTIFICATIONS ============ */

function LibrarySection() {
  return (
    <div style={{ padding: 32, maxWidth: 720, margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Библиотека файлов</h2>
        <button className="btn-gradient" style={{ padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}><Icon name="Upload" size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6 }} /> Загрузить</button>
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {FILES.map((f, i) => (
          <div key={f.id} className="glass glass-hover" style={{ borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, animation: `fade-in-up 0.3s ease ${i * 0.06}s both` }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{fileIcon(f.type)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{f.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{f.size} • {f.date}</div>
            </div>
            <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 8, padding: 7, cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><Icon name="Download" size={15} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsSection() {
  return (
    <div style={{ padding: 32, maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Уведомления</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {NOTIFICATIONS.map((n, i) => (
          <div key={n.id} className="glass glass-hover" style={{ borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, opacity: n.read ? 0.6 : 1, animation: `fade-in-up 0.3s ease ${i * 0.07}s both` }}>
            {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--nex-blue)', flexShrink: 0 }} />}
            <div style={{ width: 42, height: 42, borderRadius: 12, background: `${n.color}20`, border: `1px solid ${n.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={n.icon} size={18} style={{ color: n.color }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: n.read ? 400 : 500 }}>{n.text}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ SEARCH (by User ID / phone) ============ */

function SearchSection() {
  const [query, setQuery] = useState('');
  const isPhone = /^[+\d]/.test(query);
  const isUserId = query.startsWith('@');
  const found = query.length >= 3;

  return (
    <div style={{ padding: 32, maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Найти пользователя</h2>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 24 }}>
        Поиск работает только по точному <b style={{ color: 'var(--nex-blue)' }}>User ID</b> (@username) или <b style={{ color: 'var(--nex-blue)' }}>номеру телефона</b> — если пользователь не скрыл его в настройках.
      </p>
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <Icon name="Search" size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="@username или +7 999 123 45 67" style={{ width: '100%', padding: '13px 16px 13px 44px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--nex-border)', borderRadius: 14, color: '#fff', fontSize: 15, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
      </div>

      {!found && (
        <div className="glass" style={{ borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(59,130,246,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <Icon name="UserSearch" size={28} style={{ color: 'var(--nex-blue)' }} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Введите User ID или телефон</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
            Для приватности пользователи не появляются в общем списке.<br />
            Нужен их точный User ID или открытый номер.
          </div>
        </div>
      )}

      {found && (isPhone || isUserId) && (
        <div className="glass glass-hover animate-fade-in-up" style={{ borderRadius: 14, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar name="Найденный Пользователь" size={48} online />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Алексей Петров</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{isUserId ? query : '@alex_p'}</div>
          </div>
          <button className="btn-gradient" style={{ padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Написать</button>
        </div>
      )}

      {found && !isPhone && !isUserId && (
        <div className="glass" style={{ borderRadius: 14, padding: 20, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
          <Icon name="SearchX" size={28} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 8 }} />
          <div>Начните поиск с <b>@</b> для User ID или с <b>+</b> для телефона</div>
        </div>
      )}
    </div>
  );
}

/* ============ SETTINGS (security) ============ */

function SettingsSection({ user, setUser }: { user: User; setUser: (u: User) => void }) {
  const [toggles, setToggles] = useState({
    e2e: true, twofa: true, hideOnline: false, autoLock: true,
    phoneHidden: user.phoneHidden, biometric: true, readReceipts: false,
    autoDeleteMsg: false, blockScreenshots: true, sessionAlerts: true,
    selfDestruct: false, blockUnknown: true,
  });
  const flip = (k: keyof typeof toggles) => {
    const next = { ...toggles, [k]: !toggles[k] };
    setToggles(next);
    if (k === 'phoneHidden') setUser({ ...user, phoneHidden: next.phoneHidden });
  };

  const groups = [
    {
      title: 'Шифрование и пароли',
      items: [
        { key: 'e2e' as const, icon: 'Lock', label: 'Сквозное шифрование E2E', desc: 'Только вы и собеседник видите сообщения' },
        { key: 'twofa' as const, icon: 'KeyRound', label: 'Двухфакторная аутентификация', desc: 'Код подтверждения при входе' },
        { key: 'biometric' as const, icon: 'Fingerprint', label: 'Биометрия (Face ID / отпечаток)', desc: 'Дополнительная защита приложения' },
        { key: 'autoLock' as const, icon: 'Timer', label: 'Авто-блокировка через 1 минуту', desc: 'Защита от просмотра без вас' },
      ],
    },
    {
      title: 'Приватность',
      items: [
        { key: 'phoneHidden' as const, icon: 'PhoneOff', label: 'Скрыть номер телефона', desc: 'Вас можно найти только по User ID' },
        { key: 'hideOnline' as const, icon: 'EyeOff', label: 'Скрыть онлайн-статус', desc: 'Никто не увидит, когда вы в сети' },
        { key: 'blockUnknown' as const, icon: 'UserX', label: 'Блокировать незнакомых', desc: 'Писать могут только ваши контакты' },
        { key: 'readReceipts' as const, icon: 'CheckCheck', label: 'Подтверждение прочтения', desc: 'Двойные галочки прочтения' },
      ],
    },
    {
      title: 'Сообщения и медиа',
      items: [
        { key: 'autoDeleteMsg' as const, icon: 'Trash2', label: 'Авто-удаление сообщений', desc: 'Удаление через 24 часа после прочтения' },
        { key: 'selfDestruct' as const, icon: 'Flame', label: 'Самоуничтожающиеся сообщения', desc: 'Исчезают сразу после просмотра' },
        { key: 'blockScreenshots' as const, icon: 'ShieldX', label: 'Запретить скриншоты', desc: 'Невозможно сделать снимок экрана' },
        { key: 'sessionAlerts' as const, icon: 'BellRing', label: 'Уведомления о входе', desc: 'Алерт при входе с нового устройства' },
      ],
    },
  ];

  return (
    <div style={{ padding: 32, maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Безопасность и приватность</h2>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>Полный контроль над данными и кто может с вами связаться.</p>

      {groups.map((g, gi) => (
        <div key={gi} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{g.title}</div>
          <div className="glass" style={{ borderRadius: 16, overflow: 'hidden', animation: `fade-in-up 0.3s ease ${gi * 0.1}s both` }}>
            {g.items.map((item, ii) => (
              <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderBottom: ii < g.items.length - 1 ? '1px solid var(--nex-border)' : 'none' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={item.icon} size={17} style={{ color: 'var(--nex-blue)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{item.desc}</div>
                </div>
                <div onClick={() => flip(item.key)} style={{ width: 44, height: 24, borderRadius: 99, background: toggles[item.key] ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : 'rgba(255,255,255,0.1)', border: '1px solid var(--nex-border)', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                  <div style={{ position: 'absolute', top: 2, left: toggles[item.key] ? 22 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============ MAIN APP ============ */

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [active, setActive] = useState<Section>('chats');

  if (!user) return <AuthScreen onLogin={u => setUser(u)} />;

  const navItems: { id: Section; label: string; icon: string; badge?: number; adminOnly?: boolean }[] = [
    { id: 'chats', label: 'Чаты', icon: 'MessageCircle', badge: 3 },
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'search', label: 'Найти пользователя', icon: 'UserSearch' },
    { id: 'bots', label: 'Боты', icon: 'Bot' },
    { id: 'library', label: 'Библиотека', icon: 'FolderOpen' },
    { id: 'notifications', label: 'Уведомления', icon: 'Bell', badge: 7 },
    { id: 'settings', label: 'Безопасность', icon: 'Shield' },
    { id: 'admin', label: 'Администрирование', icon: 'ShieldAlert', adminOnly: true },
  ];
  const visibleNav = navItems.filter(n => !n.adminOnly || user.role === 'admin');

  const renderSection = () => {
    if (active === 'admin' && user.role !== 'admin') return <div style={{ padding: 32 }}>Доступ запрещён</div>;
    switch (active) {
      case 'chats': return <ChatsSection />;
      case 'profile': return <ProfileSection user={user} />;
      case 'bots': return <BotsSection />;
      case 'admin': return <AdminSection />;
      case 'library': return <LibrarySection />;
      case 'notifications': return <NotificationsSection />;
      case 'search': return <SearchSection />;
      case 'settings': return <SettingsSection user={user} setUser={setUser} />;
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', overflow: 'hidden', fontFamily: 'Golos Text, sans-serif' }}>
      <div className="nex-bg"><div className="nex-blob3" /></div>

      <div className="glass" style={{ position: 'relative', zIndex: 10, width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--nex-border)', borderRadius: 0 }}>
        <div style={{ padding: '22px 18px 16px', borderBottom: '1px solid var(--nex-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="pulse-glow" style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="Zap" size={18} style={{ color: '#fff' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.02em' }} className="gradient-text">NexChat</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: -1 }}>Secure messenger</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: 10, overflowY: 'auto' }}>
          {visibleNav.map(item => (
            <div key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => setActive(item.id)} style={{ marginBottom: 2 }}>
              <div className="nav-icon"><Icon name={item.icon} size={18} /></div>
              <span style={{ flex: 1, fontSize: 13.5 }}>{item.label}</span>
              {item.badge && <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', borderRadius: 99, padding: '1px 6px', minWidth: 18, textAlign: 'center' }}>{item.badge}</span>}
              {item.adminOnly && <Icon name="Lock" size={11} style={{ color: '#a78bfa' }} />}
            </div>
          ))}
        </nav>

        <div style={{ padding: '12px 14px', borderTop: '1px solid var(--nex-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name={user.name} size={34} online />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{user.userId}{user.role === 'admin' ? ' • admin' : ''}</div>
          </div>
          <Icon name="LogOut" size={15} style={{ color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }} onClick={() => setUser(null)} />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', overflow: active === 'chats' ? 'hidden' : 'auto' }}>
        {renderSection()}
      </div>
    </div>
  );
}
