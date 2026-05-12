import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Section = 'chats' | 'profile' | 'bots' | 'admin' | 'library' | 'notifications' | 'search' | 'settings';

const NAV_ITEMS: { id: Section; label: string; icon: string; badge?: number }[] = [
  { id: 'chats', label: 'Чаты', icon: 'MessageCircle', badge: 3 },
  { id: 'profile', label: 'Профиль', icon: 'User' },
  { id: 'bots', label: 'Боты', icon: 'Bot' },
  { id: 'admin', label: 'Администрирование', icon: 'Shield' },
  { id: 'library', label: 'Библиотека', icon: 'FolderOpen' },
  { id: 'notifications', label: 'Уведомления', icon: 'Bell', badge: 7 },
  { id: 'search', label: 'Поиск', icon: 'Search' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
];

const CHATS = [
  { id: 1, name: 'Алексей Петров', msg: 'Увидимся завтра в 10:00', time: '14:32', unread: 2, online: true, encrypted: true },
  { id: 2, name: 'Команда разработки', msg: 'Релиз назначен на пятницу 🚀', time: '13:10', unread: 1, online: false, group: true },
  { id: 3, name: 'Мария Соколова', msg: 'Отправила документы', time: '11:55', unread: 0, online: true, encrypted: true },
  { id: 4, name: 'Дизайн канал', msg: 'Новые макеты готовы', time: 'вчера', unread: 0, online: false, group: true },
  { id: 5, name: 'Николай Иванов', msg: 'Всё принял, спасибо!', time: 'вчера', unread: 0, online: false, encrypted: true },
];

const MESSAGES = [
  { id: 1, out: false, text: 'Привет! Как дела с проектом?', time: '13:55' },
  { id: 2, out: true, text: 'Всё идёт по плану. Завтра закончу основной модуль.', time: '13:57' },
  { id: 3, out: false, text: 'Отлично! Когда можем обсудить детали?', time: '14:01' },
  { id: 4, out: true, text: 'Давай сегодня в 17:00? Созвонимся.', time: '14:03' },
  { id: 5, out: false, text: 'Договорились. Жду звонка!', time: '14:05' },
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
  { id: 2, name: 'FileBot', desc: 'Управление и обработка файлов', icon: '📁', active: true, calls: 340 },
  { id: 3, name: 'NotifyBot', desc: 'Система уведомлений и напоминаний', icon: '🔔', active: false, calls: 89 },
];

const FILES = [
  { id: 1, name: 'Презентация Q1.pdf', size: '4.2 МБ', type: 'pdf', date: '10 мая' },
  { id: 2, name: 'Дизайн макет v3.fig', size: '18.7 МБ', type: 'fig', date: '9 мая' },
  { id: 3, name: 'Фото команды.jpg', size: '2.1 МБ', type: 'img', date: '8 мая' },
  { id: 4, name: 'Отчёт апрель.xlsx', size: '1.4 МБ', type: 'xls', date: '1 мая' },
  { id: 5, name: 'Лого финал.png', size: '540 КБ', type: 'img', date: '28 апр' },
  { id: 6, name: 'Контракт.docx', size: '890 КБ', type: 'doc', date: '25 апр' },
];

const USERS_SEARCH = [
  { id: 1, name: 'Алексей Петров', role: 'Разработчик', online: true },
  { id: 2, name: 'Мария Соколова', role: 'Дизайнер', online: true },
  { id: 3, name: 'Николай Иванов', role: 'Менеджер', online: false },
  { id: 4, name: 'Анна Кузнецова', role: 'Аналитик', online: false },
];

const fileIcon = (type: string) => {
  switch (type) {
    case 'pdf': return '📄';
    case 'fig': return '🎨';
    case 'img': return '🖼️';
    case 'xls': return '📊';
    case 'doc': return '📝';
    default: return '📁';
  }
};

function Avatar({ name, size = 40, online }: { name: string; size?: number; online?: boolean }) {
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];
  const color = colors[name.charCodeAt(0) % colors.length];
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('');
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: `linear-gradient(135deg, ${color}99, ${color})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.38, fontWeight: 700, color: '#fff',
        border: '2px solid rgba(255,255,255,0.08)',
      }}>
        {initials}
      </div>
      {online && <div className="online-dot" style={{ position: 'absolute', bottom: 1, right: 1 }} />}
    </div>
  );
}

function ChatsSection() {
  const [selected, setSelected] = useState(1);
  const [message, setMessage] = useState('');
  const chat = CHATS.find(c => c.id === selected);

  return (
    <div style={{ display: 'flex', height: '100%', gap: 0 }}>
      <div style={{ width: 280, borderRight: '1px solid var(--nex-border)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '16px 16px 12px' }}>
          <div style={{ position: 'relative' }}>
            <Icon name="Search" size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
            <input placeholder="Поиск чатов..." style={{ width: '100%', padding: '8px 12px 8px 34px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--nex-border)', borderRadius: 10, color: '#fff', fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 8px' }}>
          {CHATS.map((c, i) => (
            <div key={c.id} onClick={() => setSelected(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px', borderRadius: 12, cursor: 'pointer', background: selected === c.id ? 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.12))' : 'transparent', border: selected === c.id ? '1px solid rgba(59,130,246,0.25)' : '1px solid transparent', marginBottom: 2, transition: 'all 0.18s', animation: `fade-in-up 0.3s ease ${i * 0.05}s both` }}>
              <Avatar name={c.name} size={42} online={c.online} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: selected === c.id ? '#fff' : 'rgba(255,255,255,0.85)' }}>
                    {c.group ? '👥 ' : ''}{c.name}
                  </span>
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
          <button className="btn-gradient" style={{ width: '100%', padding: '9px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>+ Новый чат</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--nex-border)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <Avatar name={chat?.name || ''} size={38} online={chat?.online} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{chat?.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{chat?.online ? 'онлайн' : 'был недавно'}</div>
          </div>
          <span className="encrypt-badge"><Icon name="Lock" size={10} /> E2E шифрование</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}><Icon name="Phone" size={16} /></button>
            <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}><Icon name="Video" size={16} /></button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)', padding: '3px 10px', borderRadius: 99 }}>Сегодня • Сообщения защищены шифрованием</span>
          </div>
          {MESSAGES.map((m, i) => (
            <div key={m.id} style={{ display: 'flex', justifyContent: m.out ? 'flex-end' : 'flex-start', animation: `fade-in-up 0.25s ease ${i * 0.06}s both` }}>
              <div className={m.out ? 'msg-out' : 'msg-in'} style={{ maxWidth: '68%', padding: '10px 14px' }}>
                <div style={{ fontSize: 14, lineHeight: 1.5 }}>{m.text}</div>
                <div style={{ fontSize: 11, color: m.out ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)', marginTop: 4, textAlign: 'right' }}>
                  {m.time} {m.out && <Icon name="CheckCheck" size={12} style={{ display: 'inline-block', verticalAlign: 'middle', color: '#60a5fa' }} />}
                </div>
              </div>
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
          <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 10, padding: '10px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><Icon name="Paperclip" size={18} /></button>
          <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Зашифрованное сообщение..." style={{ flex: 1, padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--nex-border)', borderRadius: 12, color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
          <button className="btn-gradient" style={{ borderRadius: 10, padding: '10px 14px', cursor: 'pointer', fontFamily: 'inherit' }}><Icon name="Send" size={18} /></button>
        </div>
      </div>
    </div>
  );
}

function ProfileSection() {
  return (
    <div style={{ padding: '32px', maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Мой профиль</h2>
      <div className="glass" style={{ borderRadius: 20, padding: 28, marginBottom: 16, animation: 'fade-in-up 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <div style={{ position: 'relative' }}>
            <Avatar name="Иван Сидоров" size={72} online />
            <button style={{ position: 'absolute', bottom: 0, right: 0, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="Camera" size={12} style={{ color: '#fff' }} />
            </button>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>Иван Сидоров</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>@ivan_sidorov</div>
            <span className="encrypt-badge" style={{ marginTop: 6, display: 'inline-flex' }}><Icon name="ShieldCheck" size={10} /> Аккаунт защищён</span>
          </div>
        </div>
        {[
          { label: 'Имя', value: 'Иван', icon: 'User' },
          { label: 'Фамилия', value: 'Сидоров', icon: 'User' },
          { label: 'Телефон', value: '+7 (999) 123-45-67', icon: 'Phone' },
          { label: 'Email', value: 'ivan@nexchat.app', icon: 'Mail' },
          { label: 'О себе', value: 'Разработчик • Москва 🌍', icon: 'Info' },
        ].map((field, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--nex-border)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={field.icon} size={16} style={{ color: 'var(--nex-blue)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>{field.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{field.value}</div>
            </div>
            <Icon name="ChevronRight" size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
          </div>
        ))}
      </div>
      <button className="btn-gradient" style={{ width: '100%', padding: '12px', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Редактировать профиль</button>
    </div>
  );
}

function BotsSection() {
  return (
    <div style={{ padding: '32px', maxWidth: 720, margin: '0 auto', width: '100%' }}>
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
              <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: bot.active ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)', color: bot.active ? 'var(--nex-green)' : 'rgba(255,255,255,0.35)', border: `1px solid ${bot.active ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.1)'}` }}>
                {bot.active ? '● Активен' : '○ Неактивен'}
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'inherit' }}>Настройки</button>
                <button style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 12, color: 'var(--nex-blue)', fontFamily: 'inherit' }}>Логи</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSection() {
  const stats = [
    { label: 'Пользователей', value: '1 482', icon: 'Users', color: 'var(--nex-blue)' },
    { label: 'Активных чатов', value: '342', icon: 'MessageCircle', color: 'var(--nex-violet)' },
    { label: 'Заблокировано', value: '23', icon: 'Ban', color: '#ef4444' },
    { label: 'Жалоб сегодня', value: '7', icon: 'AlertTriangle', color: '#f59e0b' },
  ];
  const users = [
    { name: 'Антон Морозов', email: 'a.morozov@mail.ru', status: 'blocked', joined: '05.03.2024' },
    { name: 'Светлана Попова', email: 's.popova@ya.ru', status: 'active', joined: '12.01.2024' },
    { name: 'Дмитрий Козлов', email: 'd.kozlov@g.com', status: 'warned', joined: '28.11.2023' },
  ];
  return (
    <div style={{ padding: '32px', maxWidth: 820, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Панель администратора</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
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
      <div className="glass" style={{ borderRadius: 16, padding: 20, animation: 'fade-in-up 0.35s ease 0.2s both' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontWeight: 600, fontSize: 15 }}>Управление пользователями</h3>
          <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: 'inherit' }}>
            <Icon name="Filter" size={13} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} /> Фильтр
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>{['Пользователь', 'Email', 'Статус', 'Регистрация', 'Действия'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 600, borderBottom: '1px solid var(--nex-border)' }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '12px', fontSize: 14, fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Avatar name={u.name} size={30} />{u.name}</div>
                </td>
                <td style={{ padding: '12px', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{u.email}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: u.status === 'active' ? 'rgba(16,185,129,0.12)' : u.status === 'blocked' ? 'rgba(239,68,68,0.12)' : 'rgba(245,158,11,0.12)', color: u.status === 'active' ? '#10b981' : u.status === 'blocked' ? '#ef4444' : '#f59e0b' }}>
                    {u.status === 'active' ? 'Активен' : u.status === 'blocked' ? 'Заблокирован' : 'Предупреждён'}
                  </span>
                </td>
                <td style={{ padding: '12px', fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{u.joined}</td>
                <td style={{ padding: '12px' }}>
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
    </div>
  );
}

function LibrarySection() {
  return (
    <div style={{ padding: '32px', maxWidth: 720, margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Библиотека файлов</h2>
        <button className="btn-gradient" style={{ padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          <Icon name="Upload" size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6 }} /> Загрузить
        </button>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {['Все файлы', 'Изображения', 'Документы', 'Видео'].map((tab, i) => (
          <button key={i} style={{ padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', background: i === 0 ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : 'rgba(255,255,255,0.06)', color: '#fff', border: i === 0 ? 'none' : '1px solid var(--nex-border)' }}>{tab}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {FILES.map((f, i) => (
          <div key={f.id} className="glass glass-hover" style={{ borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, animation: `fade-in-up 0.3s ease ${i * 0.06}s both` }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{fileIcon(f.type)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{f.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{f.size} • {f.date}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 8, padding: '7px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><Icon name="Download" size={15} /></button>
              <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 8, padding: '7px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><Icon name="Share2" size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsSection() {
  return (
    <div style={{ padding: '32px', maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Уведомления</h2>
        <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--nex-border)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: 'inherit' }}>Прочитать все</button>
      </div>
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

function SearchSection() {
  const [query, setQuery] = useState('');
  return (
    <div style={{ padding: '32px', maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Поиск</h2>
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <Icon name="Search" size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Поиск по пользователям, чатам, файлам..." style={{ width: '100%', padding: '13px 16px 13px 44px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--nex-border)', borderRadius: 14, color: '#fff', fontSize: 15, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
      </div>
      <div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Пользователи</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {USERS_SEARCH.map((u, i) => (
            <div key={u.id} className="glass glass-hover" style={{ borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', animation: `fade-in-up 0.3s ease ${i * 0.07}s both` }}>
              <Avatar name={u.name} size={40} online={u.online} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{u.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>{u.role}</div>
              </div>
              <button className="btn-gradient" style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Написать</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsSection() {
  const groups = [
    {
      title: 'Безопасность',
      items: [
        { icon: 'Lock', label: 'Сквозное шифрование (E2E)', desc: 'Только вы и получатель видят сообщения', on: true },
        { icon: 'Smartphone', label: 'Двухфакторная аутентификация', desc: 'Дополнительная защита аккаунта', on: true },
        { icon: 'Eye', label: 'Скрыть онлайн-статус', desc: 'Никто не увидит, когда вы онлайн', on: false },
      ],
    },
    {
      title: 'Приватность',
      items: [
        { icon: 'UserX', label: 'Кто может писать мне', desc: 'Только контакты', on: false },
        { icon: 'Phone', label: 'Скрыть номер телефона', desc: 'Телефон не виден другим пользователям', on: true },
        { icon: 'MessageSquare', label: 'Подтверждение прочтения', desc: 'Показывать галочки прочтения', on: false },
      ],
    },
  ];
  return (
    <div style={{ padding: '32px', maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Настройки безопасности</h2>
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
                <div style={{ width: 44, height: 24, borderRadius: 99, background: item.on ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : 'rgba(255,255,255,0.1)', border: '1px solid var(--nex-border)', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                  <div style={{ position: 'absolute', top: 2, left: item.on ? 22 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="glass" style={{ borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="Trash2" size={17} style={{ color: '#ef4444' }} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#ef4444' }}>Удалить аккаунт</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Все данные будут удалены безвозвратно</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState<Section>('chats');

  const renderSection = () => {
    switch (active) {
      case 'chats': return <ChatsSection />;
      case 'profile': return <ProfileSection />;
      case 'bots': return <BotsSection />;
      case 'admin': return <AdminSection />;
      case 'library': return <LibrarySection />;
      case 'notifications': return <NotificationsSection />;
      case 'search': return <SearchSection />;
      case 'settings': return <SettingsSection />;
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', overflow: 'hidden', fontFamily: 'Golos Text, sans-serif' }}>
      <div className="nex-bg">
        <div className="nex-blob3" />
      </div>

      {/* Sidebar */}
      <div className="glass" style={{ position: 'relative', zIndex: 10, width: 230, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--nex-border)', borderRadius: 0 }}>
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

        <nav style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
          {NAV_ITEMS.map((item, i) => (
            <div key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => setActive(item.id)} style={{ marginBottom: 2 }}>
              <div className="nav-icon"><Icon name={item.icon} size={18} /></div>
              <span style={{ flex: 1, fontSize: 13.5 }}>{item.label}</span>
              {item.badge && (
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', borderRadius: 99, padding: '1px 6px', minWidth: 18, textAlign: 'center' }}>{item.badge}</span>
              )}
            </div>
          ))}
        </nav>

        <div style={{ padding: '12px 14px', borderTop: '1px solid var(--nex-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name="Иван Сидоров" size={34} online />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Иван Сидоров</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>@ivan_sidorov</div>
          </div>
          <Icon name="LogOut" size={15} style={{ color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }} />
        </div>
      </div>

      {/* Main */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', overflow: active === 'chats' ? 'hidden' : 'auto' }}>
        {renderSection()}
      </div>
    </div>
  );
}
