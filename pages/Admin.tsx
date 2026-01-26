import React, { useState, useEffect, useContext } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, Upload, Lock, LogOut, Plus, Trash2 } from 'lucide-react';

// Simple Login Component with Server Verification
const Login: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('admin_token', password); // In a real app, use a returned token. Here pass is the token.
                onLogin(password);
            } else {
                setError(data.message || 'Senha incorreta');
            }
        } catch (err) {
            // Fallback for Localhost Dev (UI Testing only)
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                if (password === 'admin123') {
                    alert("⚠️ MODO DE DESENVOLVIMENTO: PHP não detectado.\n\nVocê entrou em modo de visualização. O salvamento real não funcionará aqui, apenas na Hostinger.");
                    localStorage.setItem('admin_token', password);
                    onLogin(password);
                    return;
                }
            }

            console.error(err);
            setError('Erro ao conectar com servidor. Verifique se o PHP está rodando.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="bg-zinc-900 p-8 rounded-lg max-w-sm w-full border border-zinc-800">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-zinc-800 rounded-full">
                        <Lock size={24} />
                    </div>
                </div>
                <h2 className="text-xl font-bold text-center mb-6">Área Administrativa</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-zinc-400">Senha de Acesso</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-zinc-700 rounded px-3 py-2 focus:border-white outline-none transition-colors"
                            placeholder="Digite a senha"
                            disabled={loading}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-bold py-2 rounded hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Verificando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};



// Theme Context for Admin Components to avoid prop drilling
const AdminThemeContext = React.createContext<any>(null);

const useAdminTheme = () => useContext(AdminThemeContext);

// Extracted Components (Stable Reference)
const TextInput = ({ label, value, onChange }: any) => {
    const themeClasses = useAdminTheme();
    return (
        <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${themeClasses?.textLabel}`}>{label}</label>
            <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full rounded px-3 py-2 outline-none transition-colors border ${themeClasses?.input}`}
            />
        </div>
    );
};

const TextArea = ({ label, value, onChange, rows = 3 }: any) => {
    const themeClasses = useAdminTheme();
    return (
        <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${themeClasses?.textLabel}`}>{label}</label>
            <textarea
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                className={`w-full rounded px-3 py-2 outline-none transition-colors border ${themeClasses?.input}`}
            />
        </div>
    );
};

const ImageInput = ({ label, value, onChange, token }: any) => {
    const themeClasses = useAdminTheme();
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await fetch('/upload_image.php', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (data.success) onChange(data.url);
            else alert('Erro: ' + data.message);
        } catch (err) { alert('Erro de rede'); } finally { setUploading(false); }
    };
    return (
        <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${themeClasses?.textLabel}`}>{label}</label>
            <div className="flex items-start gap-4">
                {value && (
                    <div className={`w-24 h-24 rounded overflow-hidden flex-shrink-0 border ${themeClasses?.header}`}>
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="flex-1">
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className={`flex-1 rounded px-3 py-2 text-sm outline-none border ${themeClasses?.input}`}
                            placeholder="URL da imagem"
                        />
                    </div>
                    <label className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors border ${themeClasses?.header} ${themeClasses?.buttonSecondary}`}>
                        <Upload size={16} />
                        {uploading ? 'Enviando...' : 'Fazer Upload'}
                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                    </label>
                </div>
            </div>
        </div>
    );
};

export const Admin: React.FC = () => {
    const { content, loading, updateContent, saveContent } = useContent();
    const [activeTab, setActiveTab] = useState('home');
    const [token, setToken] = useState<string | null>(null);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const handleSave = async () => {
        setSaving(true);
        setStatusMsg('');
        try {
            const result = await saveContent(token || '');
            if (result.success) {
                setStatusMsg('Salvo com sucesso!');
                setTimeout(() => setStatusMsg(''), 3000);
            } else {
                if (result.message === 'Unauthorized') {
                    alert('Sessão expirada. Faça login novamente.');
                    handleLogout();
                } else {
                    alert('Erro ao salvar: ' + result.message);
                }
            }
        } catch (error) {
            alert('Erro ao salvar');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        setToken(null);
    };

    const updateField = (path: string, value: any) => {
        const newContent = JSON.parse(JSON.stringify(content));
        const parts = path.split('.');
        let current = newContent;
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) current[parts[i]] = {};
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
        updateContent(newContent);
    };

    const addItem = (path: string, template: any) => {
        const newContent = JSON.parse(JSON.stringify(content));
        const parts = path.split('.');
        let current: any = newContent;
        for (let i = 0; i < parts.length - 1; i++) {
            current = current[parts[i]];
        }
        const targetArray = current[parts[parts.length - 1]];
        if (Array.isArray(targetArray)) {
            targetArray.push(template);
            updateContent(newContent);
        }
    };

    const removeItem = (path: string, index: number) => {
        const newContent = JSON.parse(JSON.stringify(content));
        const parts = path.split('.');
        let current: any = newContent;
        for (let i = 0; i < parts.length - 1; i++) {
            current = current[parts[i]];
        }
        const targetArray = current[parts[parts.length - 1]];
        if (Array.isArray(targetArray)) {
            targetArray.splice(index, 1);
            updateContent(newContent);
        }
    };

    // Restore missing state for saving
    const [saving, setSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    useEffect(() => {
        const savedToken = localStorage.getItem('admin_token');
        if (savedToken) setToken(savedToken);
    }, []);

    if (!token) return <Login onLogin={(t) => setToken(t)} />;
    if (loading || !content) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Carregando...</div>;
    const themeClasses = {
        bg: theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-gray-100 text-gray-900',
        sidebar: theme === 'dark' ? 'bg-black border-zinc-800' : 'bg-white border-gray-200',
        input: theme === 'dark' ? 'bg-black border-zinc-700 focus:border-white' : 'bg-white border-gray-300 focus:border-blue-500',
        card: theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200 shadow-sm',
        header: theme === 'dark' ? 'bg-black border-zinc-800' : 'bg-white border-gray-200 shadow-sm',
        textMuted: theme === 'dark' ? 'text-zinc-500' : 'text-gray-500',
        textLabel: theme === 'dark' ? 'text-zinc-400' : 'text-gray-600',
        buttonSecondary: theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-200 hover:bg-gray-300',
        tabActive: theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-blue-50 text-blue-600',
        tabInactive: theme === 'dark' ? 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
    };

    return (
        <AdminThemeContext.Provider value={themeClasses}>

            <div className={`min-h-screen transition-colors duration-300 ${themeClasses.bg}`}>
                {/* Top Bar */}
                <div className={`fixed top-0 left-0 right-0 border-b z-50 px-6 py-4 flex justify-between items-center ${themeClasses.header}`}>
                    <h1 className="text-xl font-bold uppercase tracking-wider">Painel Administrativo</h1>
                    <div className="flex items-center gap-4">
                        {statusMsg && <span className="text-green-500 font-bold animate-pulse">{statusMsg}</span>}

                        <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            <Save size={18} />
                            {saving ? 'Salvando...' : 'Salvar'}
                        </button>
                        <button onClick={handleLogout} className={`${themeClasses.textMuted} hover:text-red-500 transition-colors`}>
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                <div className="pt-20 flex">
                    {/* Sidebar */}
                    <div className={`w-64 fixed h-full border-r p-4 overflow-y-auto pb-20 ${themeClasses.sidebar}`}>
                        <nav className="space-y-2">
                            {[
                                { id: 'home', label: 'Home Page' },
                                { id: 'about', label: 'Sobre Nós' },
                                { id: 'leadership', label: 'Liderança (Pág.)' },
                                { id: 'locations', label: 'Localizações' },
                                { id: 'ministries', label: 'Ministérios' },
                                { id: 'groups', label: 'Grupos' },
                                { id: 'events', label: 'Eventos' },
                                { id: 'missions', label: 'Missões' },
                                { id: 'impulse', label: 'Impulse' },
                                { id: 'unicas', label: 'Únicas' },
                                { id: 'sunday', label: 'Cultos Domingo' },
                                { id: 'contact', label: 'Contato' },
                                { id: 'give', label: 'Contribuição' },
                                { id: 'give_cnh', label: 'CNH (Projeto)' },
                                { id: 'give_adopt', label: 'Adote Aluno' },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left px-4 py-3 rounded transition-colors font-medium ${activeTab === tab.id ? themeClasses.tabActive : themeClasses.tabInactive}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="ml-64 flex-1 p-8 max-w-4xl pb-32">
                        {activeTab === 'home' && (
                            <div className="space-y-8">
                                <section className={`p-6 rounded-lg border ${themeClasses.card}`}>
                                    <h3 className="text-xl font-bold mb-6 border-b border-gray-700/20 pb-2">Hero Section Home</h3>
                                    <TextInput label="Título" value={content.home.hero.title} onChange={(v: string) => updateField('home.hero.title', v)} />
                                    <TextInput label="Subtítulo" value={content.home.hero.subtitle} onChange={(v: string) => updateField('home.hero.subtitle', v)} />
                                    <div className="mt-4 pt-4 border-t border-gray-700/20">
                                        <h4 className={`font-bold mb-2 ${themeClasses.textLabel}`}>Background</h4>
                                        <ImageInput token={token || ''} label="Imagem de Fundo (Padrão)" value={content.home.hero.backgroundImage} onChange={(v: string) => updateField('home.hero.backgroundImage', v)} />
                                        <p className={`text-xs mb-2 mt-4 ${themeClasses.textMuted}`}>Opcional: Se preenchido, o vídeo substituirá a imagem.</p>
                                        <ImageInput token={token || ''} label="Vídeo de Fundo (MP4)" value={content.home.hero.backgroundVideo} onChange={(v: string) => updateField('home.hero.backgroundVideo', v)} />
                                    </div>
                                </section>

                                <section className={`p-6 rounded-lg border ${themeClasses.card}`}>
                                    <h3 className="text-xl font-bold mb-6 border-b border-gray-700/20 pb-2">Identidade</h3>
                                    <TextInput label="Título" value={content.home.identity.title} onChange={(v: string) => updateField('home.identity.title', v)} />
                                    <TextArea label="Descrição" value={content.home.identity.description} onChange={(v: string) => updateField('home.identity.description', v)} />
                                </section>

                                <section className={`p-6 rounded-lg border ${themeClasses.card}`}>
                                    <div className="flex justify-between items-center mb-6 border-b border-gray-700/20 pb-2">
                                        <h3 className="text-xl font-bold">Últimos Vídeos (Youtube)</h3>
                                        <button onClick={() => addItem('home.latest_videos', { title: 'Novo Vídeo', date: 'há 1 dia', link: '', thumbnail: '' })} className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-bold ${themeClasses.buttonSecondary}`}>
                                            <Plus size={14} /> Adicionar
                                        </button>
                                    </div>
                                    {(content.home.latest_videos || []).map((video: any, idx: number) => (
                                        <div key={idx} className={`mb-4 p-4 rounded border relative ${themeClasses.bg} ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-zinc-950 border-zinc-800'}`}>
                                            <button onClick={() => removeItem('home.latest_videos', idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                                            <TextInput label="Título" value={video.title} onChange={(v: string) => updateField(`home.latest_videos.${idx}.title`, v)} />
                                            <TextInput label="Data" value={video.date} onChange={(v: string) => updateField(`home.latest_videos.${idx}.date`, v)} />
                                            <TextInput label="Link do Vídeo" value={video.link} onChange={(v: string) => updateField(`home.latest_videos.${idx}.link`, v)} />
                                            <div className={`p-3 rounded mb-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                                                <p className={`text-xs mb-2 ${themeClasses.textMuted}`}>Dica: A thumbnail geralmente é <code>https://img.youtube.com/vi/ID_DO_VIDEO/maxresdefault.jpg</code></p>
                                                <TextInput label="Link da Thumbnail" value={video.thumbnail} onChange={(v: string) => updateField(`home.latest_videos.${idx}.thumbnail`, v)} />
                                                {video.thumbnail && <img src={video.thumbnail} className="w-32 mt-2 rounded" alt="Thumb" />}
                                            </div>
                                        </div>
                                    ))}
                                </section>

                                <section className={`p-6 rounded-lg border ${themeClasses.card}`}>
                                    <h3 className="text-xl font-bold mb-6 border-b border-gray-700/20 pb-2">CTA Final</h3>
                                    <TextInput label="Título" value={content.home.cta.title} onChange={(v: string) => updateField('home.cta.title', v)} />
                                    <TextArea label="Descrição" value={content.home.cta.description} onChange={(v: string) => updateField('home.cta.description', v)} />
                                </section>
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="space-y-8">
                                <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                    <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Hero & Header</h3>
                                    <TextInput label="Título Header" value={content.about.header.title} onChange={(v) => updateField('about.header.title', v)} />
                                    <TextArea label="Descrição Header" value={content.about.header.description} onChange={(v) => updateField('about.header.description', v)} />
                                    <ImageInput token={token || ''} label="Imagem de Fundo" value={content.about.header.heroImage} onChange={(v) => updateField('about.header.heroImage', v)} />
                                </section>

                                <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                    <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">DNA</h3>
                                    <TextArea label="Visão" value={content.about.dna.vision} onChange={(v) => updateField('about.dna.vision', v)} />
                                    <TextArea label="Missão" value={content.about.dna.mission} onChange={(v) => updateField('about.dna.mission', v)} />
                                </section>
                            </div>
                        )
                        }

                        {
                            activeTab === 'ministries' && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Lista de Ministérios</h3>
                                        {content.ministries.list.map((min: any, idx: number) => (
                                            <div key={idx} className="mb-8 p-4 bg-zinc-950 rounded border border-zinc-800">
                                                <h4 className="font-bold text-zinc-300 mb-4">#{idx + 1} - {min.title}</h4>
                                                <TextInput label="Título" value={min.title} onChange={(v) => updateField(`ministries.list.${idx}.title`, v)} />
                                                <TextInput label="Subtítulo" value={min.subtitle} onChange={(v) => updateField(`ministries.list.${idx}.subtitle`, v)} />
                                                <TextArea label="Descrição" value={min.description} onChange={(v) => updateField(`ministries.list.${idx}.description`, v)} />
                                                <ImageInput token={token || ''} label="Imagem" value={min.image} onChange={(v) => updateField(`ministries.list.${idx}.image`, v)} />
                                            </div>
                                        ))}
                                    </section>
                                </div>
                            )
                        }

                        {
                            activeTab === 'groups' && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Página de Grupos</h3>
                                        <TextInput label="Título Card" value={content.groups.card.title} onChange={(v) => updateField('groups.card.title', v)} />
                                        <TextArea label="Descrição" value={content.groups.card.description} onChange={(v) => updateField('groups.card.description', v)} />
                                    </section>
                                </div>
                            )
                        }

                        {
                            activeTab === 'leadership' && content.leadership_page && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Header</h3>
                                        <TextInput label="Título" value={content.leadership_page.header.title} onChange={(v) => updateField('leadership_page.header.title', v)} />
                                        <TextArea label="Descrição" value={content.leadership_page.header.description} onChange={(v) => updateField('leadership_page.header.description', v)} />
                                    </section>
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Liderança Sênior</h3>
                                        <TextInput label="Nomes" value={content.leadership_page.senior.names} onChange={(v) => updateField('leadership_page.senior.names', v)} />
                                        <TextArea label="Bio" value={content.leadership_page.senior.bio} onChange={(v) => updateField('leadership_page.senior.bio', v)} />
                                        <ImageInput token={token || ''} label="Imagem" value={content.leadership_page.senior.image} onChange={(v) => updateField('leadership_page.senior.image', v)} />
                                    </section>
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <div className="flex justify-between items-center mb-6 border-b border-zinc-700 pb-2">
                                            <h3 className="text-xl font-bold">Corpo Pastoral</h3>
                                            <button onClick={() => addItem('leadership_page.team', { name: 'Novo Pastor', role: 'Pastor', image: '' })} className="flex items-center gap-2 bg-white text-black text-xs font-bold px-3 py-1 rounded hover:bg-zinc-200">
                                                <Plus size={14} /> Adicionar
                                            </button>
                                        </div>
                                        {content.leadership_page.team.map((pastor: any, idx: number) => (
                                            <div key={idx} className="mb-4 p-4 bg-zinc-950 rounded border border-zinc-800 relative">
                                                <button onClick={() => removeItem('leadership_page.team', idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                                                <TextInput label="Nome" value={pastor.name} onChange={(v) => updateField(`leadership_page.team.${idx}.name`, v)} />
                                                <TextInput label="Cargo" value={pastor.role} onChange={(v) => updateField(`leadership_page.team.${idx}.role`, v)} />
                                                <ImageInput token={token || ''} label="Foto" value={pastor.image} onChange={(v) => updateField(`leadership_page.team.${idx}.image`, v)} />
                                            </div>
                                        ))}
                                    </section>
                                </div>
                            )
                        }

                        {
                            activeTab === 'locations' && content.locations_page && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Header</h3>
                                        <TextInput label="Título" value={content.locations_page.header.title} onChange={(v) => updateField('locations_page.header.title', v)} />
                                        <TextArea label="Descrição" value={content.locations_page.header.description} onChange={(v) => updateField('locations_page.header.description', v)} />
                                    </section>
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <div className="flex justify-between items-center mb-6 border-b border-zinc-700 pb-2">
                                            <h3 className="text-xl font-bold">Campi e Horários</h3>
                                            <button onClick={() => addItem('locations_page.campuses', { name: 'Novo Campus', address: 'Endereço', times: [], image: '' })} className="flex items-center gap-2 bg-white text-black text-xs font-bold px-3 py-1 rounded hover:bg-zinc-200">
                                                <Plus size={14} /> Adicionar
                                            </button>
                                        </div>
                                        {content.locations_page.campuses.map((campus: any, idx: number) => (
                                            <div key={idx} className="mb-8 p-4 bg-zinc-950 rounded border border-zinc-800 relative">
                                                <button onClick={() => removeItem('locations_page.campuses', idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                                                <TextInput label="Nome" value={campus.name} onChange={(v) => updateField(`locations_page.campuses.${idx}.name`, v)} />
                                                <TextInput label="Endereço" value={campus.address} onChange={(v) => updateField(`locations_page.campuses.${idx}.address`, v)} />
                                                <TextArea label="Detalhes" value={campus.details} onChange={(v) => updateField(`locations_page.campuses.${idx}.details`, v)} />
                                                <ImageInput token={token || ''} label="Foto" value={campus.image} onChange={(v) => updateField(`locations_page.campuses.${idx}.image`, v)} />

                                                <div className="bg-black p-3 rounded mt-4">
                                                    <label className="text-sm text-zinc-400">Horários (separados por vírgula)</label>
                                                    <input
                                                        className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-white"
                                                        value={campus.times.join(', ')}
                                                        onChange={(e) => updateField(`locations_page.campuses.${idx}.times`, e.target.value.split(',').map(s => s.trim()))}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </section>
                                </div>
                            )
                        }

                        {
                            activeTab === 'events' && content.events_page && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Header</h3>
                                        <TextInput label="Título" value={content.events_page.header.title} onChange={(v) => updateField('events_page.header.title', v)} />
                                    </section>
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <div className="flex justify-between items-center mb-6 border-b border-zinc-700 pb-2">
                                            <h3 className="text-xl font-bold">Lista de Eventos</h3>
                                            <button onClick={() => addItem('events_page.list', { title: 'Novo Evento', day: '01', month: 'JAN', category: 'Geral' })} className="flex items-center gap-2 bg-white text-black text-xs font-bold px-3 py-1 rounded hover:bg-zinc-200">
                                                <Plus size={14} /> Adicionar
                                            </button>
                                        </div>
                                        <div className="grid gap-4">
                                            {content.events_page.list.map((evt: any, idx: number) => (
                                                <div key={idx} className="p-4 bg-zinc-950 rounded border border-zinc-800 relative grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <button onClick={() => removeItem('events_page.list', idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-400 z-10"><Trash2 size={16} /></button>
                                                    <div className="col-span-2 md:col-span-1">
                                                        <TextInput label="Dia" value={evt.day} onChange={(v) => updateField(`events_page.list.${idx}.day`, v)} />
                                                        <TextInput label="Mês" value={evt.month} onChange={(v) => updateField(`events_page.list.${idx}.month`, v)} />
                                                    </div>
                                                    <div className="col-span-2 md:col-span-3">
                                                        <TextInput label="Título" value={evt.title} onChange={(v) => updateField(`events_page.list.${idx}.title`, v)} />
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <TextInput label="Local" value={evt.location} onChange={(v) => updateField(`events_page.list.${idx}.location`, v)} />
                                                            <TextInput label="Categoria" value={evt.category} onChange={(v) => updateField(`events_page.list.${idx}.category`, v)} />
                                                            <TextInput label="Horário" value={evt.time} onChange={(v) => updateField(`events_page.list.${idx}.time`, v)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )
                        }

                        {
                            activeTab === 'missions' && content.missions_page && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Topo</h3>
                                        <TextInput label="Título" value={content.missions_page.header.title} onChange={(v) => updateField('missions_page.header.title', v)} />
                                        <TextInput label="Subtítulo" value={content.missions_page.header.subtitle} onChange={(v) => updateField('missions_page.header.subtitle', v)} />
                                        <TextArea label="Descrição" value={content.missions_page.header.description} onChange={(v) => updateField('missions_page.header.description', v)} />
                                    </section>
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Filosofia</h3>
                                        <TextInput label="Título" value={content.missions_page.philosophy.title} onChange={(v) => updateField('missions_page.philosophy.title', v)} />
                                        <TextArea label="Descrição" value={content.missions_page.philosophy.description} onChange={(v) => updateField('missions_page.philosophy.description', v)} />
                                        <ImageInput token={token || ''} label="Imagem" value={content.missions_page.philosophy.image} onChange={(v) => updateField('missions_page.philosophy.image', v)} />
                                    </section>
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <div className="flex justify-between items-center mb-6 border-b border-zinc-700 pb-2">
                                            <h3 className="text-xl font-bold">Projetos de Missões</h3>
                                            <button onClick={() => addItem('missions_page.projects', { title: 'Novo Projeto', focus: 'Foco', description: 'Desc', image: '' })} className="flex items-center gap-2 bg-white text-black text-xs font-bold px-3 py-1 rounded hover:bg-zinc-200">
                                                <Plus size={14} /> Adicionar
                                            </button>
                                        </div>
                                        {content.missions_page.projects.map((proj: any, idx: number) => (
                                            <div key={idx} className="mb-4 p-4 bg-zinc-950 rounded border border-zinc-800 relative">
                                                <button onClick={() => removeItem('missions_page.projects', idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                                                <TextInput label="Título" value={proj.title} onChange={(v) => updateField(`missions_page.projects.${idx}.title`, v)} />
                                                <TextInput label="Foco" value={proj.focus} onChange={(v) => updateField(`missions_page.projects.${idx}.focus`, v)} />
                                                <TextArea label="Descrição" value={proj.description} onChange={(v) => updateField(`missions_page.projects.${idx}.description`, v)} />
                                                <ImageInput token={token || ''} label="Imagem" value={proj.image} onChange={(v) => updateField(`missions_page.projects.${idx}.image`, v)} />
                                            </div>
                                        ))}
                                    </section>
                                </div>
                            )
                        }

                        {
                            activeTab === 'impulse' && content.impulse_page && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Impulse</h3>
                                        <TextInput label="Título" value={content.impulse_page.title} onChange={(v) => updateField('impulse_page.title', v)} />
                                        <TextInput label="Subtítulo" value={content.impulse_page.subtitle} onChange={(v) => updateField('impulse_page.subtitle', v)} />
                                        <TextInput label="Agenda" value={content.impulse_page.schedule} onChange={(v) => updateField('impulse_page.schedule', v)} />
                                        <TextArea label="Descrição" value={content.impulse_page.description} onChange={(v) => updateField('impulse_page.description', v)} />
                                        <ImageInput token={token || ''} label="Imagem Hero" value={content.impulse_page.image} onChange={(v) => updateField('impulse_page.image', v)} />
                                    </section>
                                </div>
                            )
                        }

                        {
                            activeTab === 'unicas' && content.unicas_page && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Únicas</h3>
                                        <TextInput label="Título" value={content.unicas_page.title} onChange={(v) => updateField('unicas_page.title', v)} />
                                        <TextInput label="Subtítulo" value={content.unicas_page.subtitle} onChange={(v) => updateField('unicas_page.subtitle', v)} />
                                        <TextInput label="Próximo Encontro" value={content.unicas_page.next_meeting} onChange={(v) => updateField('unicas_page.next_meeting', v)} />
                                        <TextArea label="Descrição" value={content.unicas_page.description} onChange={(v) => updateField('unicas_page.description', v)} />
                                        <ImageInput token={token || ''} label="Imagem" value={content.unicas_page.image} onChange={(v) => updateField('unicas_page.image', v)} />
                                    </section>
                                </div>
                            )
                        }

                        {
                            activeTab === 'sunday' && content.sunday_service_page && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Culto de Domingo</h3>
                                        <TextInput label="Título" value={content.sunday_service_page.header.title} onChange={(v) => updateField('sunday_service_page.header.title', v)} />
                                        <TextInput label="Horário Sessão 1" value={content.sunday_service_page.session1} onChange={(v) => updateField('sunday_service_page.session1', v)} />
                                        <TextInput label="Horário Sessão 2" value={content.sunday_service_page.session2} onChange={(v) => updateField('sunday_service_page.session2', v)} />
                                        <ImageInput token={token || ''} label="Imagem" value={content.sunday_service_page.hero_image} onChange={(v) => updateField('sunday_service_page.hero_image', v)} />
                                    </section>
                                </div>
                            )
                        }

                        {
                            activeTab === 'contact' && content.contact_page && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Contato</h3>
                                        <TextArea label="Descrição" value={content.contact_page.header.description} onChange={(v) => updateField('contact_page.header.description', v)} />
                                        <TextArea label="Endereço" value={content.contact_page.info.address} onChange={(v) => updateField('contact_page.info.address', v)} />
                                        <TextInput label="Email" value={content.contact_page.info.email} onChange={(v) => updateField('contact_page.info.email', v)} />
                                        <TextInput label="Telefone" value={content.contact_page.info.phone} onChange={(v) => updateField('contact_page.info.phone', v)} />
                                    </section>
                                </div>
                            )
                        }

                        {
                            activeTab === 'give' && content.give_page && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Contribuição Geral</h3>
                                        <TextInput label="Título" value={content.give_page.header.title} onChange={(v) => updateField('give_page.header.title', v)} />
                                        <TextInput label="Chave PIX" value={content.give_page.pix} onChange={(v) => updateField('give_page.pix', v)} />
                                        <h4 className="font-bold border-b border-zinc-800 mt-4 mb-2">Dados Bancários</h4>
                                        <TextInput label="Banco" value={content.give_page.bank.bank} onChange={(v) => updateField('give_page.bank.bank', v)} />
                                        <TextInput label="Agência" value={content.give_page.bank.agency} onChange={(v) => updateField('give_page.bank.agency', v)} />
                                        <TextInput label="Conta" value={content.give_page.bank.cc} onChange={(v) => updateField('give_page.bank.cc', v)} />
                                    </section>
                                </div>
                            )
                        }

                        {
                            activeTab === 'give_cnh' && content.give_cnh_page && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">CNH - Construindo Nossa História</h3>
                                        <TextInput label="Título" value={content.give_cnh_page.header.title} onChange={(v) => updateField('give_cnh_page.header.title', v)} />
                                        <TextInput label="PIX CNH" value={content.give_cnh_page.pix} onChange={(v) => updateField('give_cnh_page.pix', v)} />

                                        <h4 className="font-bold border-b border-zinc-800 mt-4 mb-2">Progresso do Alvo</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="text-sm text-zinc-400">Total Arrecadado (R$)</label>
                                                <input className="w-full bg-black border border-zinc-700 px-3 py-2 text-white" type="number"
                                                    value={content.give_cnh_page.progress.raised}
                                                    onChange={(e) => updateField('give_cnh_page.progress.raised', parseInt(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )
                        }

                        {
                            activeTab === 'give_adopt' && content.give_adopt_page && (
                                <div className="space-y-8">
                                    <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                                        <h3 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">Adote um Aluno</h3>
                                        <TextArea label="Objetivo" value={content.give_adopt_page.letter.objective} onChange={(v) => updateField('give_adopt_page.letter.objective', v)} />
                                    </section>
                                </div>
                            )
                        }

                    </div >
                </div >
            </div >
        </AdminThemeContext.Provider>
    );
};
