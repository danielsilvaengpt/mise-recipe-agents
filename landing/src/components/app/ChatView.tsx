import React, { useState, useEffect, useRef } from 'react';
import { Utensils, Send, AlertTriangle, ChefHat, FileText, ShieldCheck, RefreshCw } from 'lucide-react';
import { api } from '../../api/client';
import { useApp } from '../../context/AppContext';
import { RecipeTicket } from './RecipeTicket';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const ChatView: React.FC = () => {
  const { apiOnline, fetchReceitas, showToast } = useApp();
  const [input, setInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [agentStep, setAgentStep] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('mise_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    localStorage.setItem('mise_chat_messages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages, isAsking]);

  // Progressive step animation while waiting for CrewAI
  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;

    if (isAsking) {
      setAgentStep(1);
      timer1 = setTimeout(() => {
        setAgentStep(2);
      }, 5000);
      timer2 = setTimeout(() => {
        setAgentStep(3);
      }, 12000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isAsking]);

  const suggestions = [
    'Jantar rápido para duas pessoas com o que tenho no frigorífico',
    'Refeição reconfortante de aproveitamento sem carne',
    'Almoço ligeiro e saciante em menos de 20 minutos',
    'Ideia simples e saudável para aproveitar legumes esquecidos',
  ];

  const handleSubmit = async (textToSend?: string) => {
    const question = (textToSend || input).trim();
    if (!question || isAsking) return;

    setErrorMessage(null);
    setInput('');

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsAsking(true);

    try {
      const answerMarkdown = await api.ask(question);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: answerMarkdown,
        timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      showToast('Nova comanda de receita criada pela brigada!');
      // Sync with history
      fetchReceitas();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Falha na comunicação com o backend';
      setErrorMessage(msg);
    } finally {
      setIsAsking(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('mise_chat_messages');
  };

  return (
    <div className="flex-grow flex flex-col max-w-4xl w-full mx-auto pb-12">
      {/* View Header */}
      <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-line">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-paper-2 border border-line text-ink-soft mb-2">
            <Utensils className="w-3.5 h-3.5 text-tomato" />
            O Fogão da Brigada
          </span>
          <h1 className="font-fraunces text-2xl sm:text-3xl font-bold text-ink">
            Pede o que te apetece cozinhar
          </h1>
          <p className="text-ink-soft text-xs sm:text-sm mt-1">
            A brigada consulta a tua despensa e cria a receita ideal sem desperdício.
          </p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="text-xs font-mono text-ink-soft hover:text-tomato px-3 py-1.5 rounded-full border border-line hover:border-tomato/30 transition-colors"
          >
            Limpar conversa
          </button>
        )}
      </div>

      {/* Backend Offline Warning if applicable */}
      {apiOnline === false && (
        <div className="mb-6 p-4 rounded-card bg-saffron/15 border border-saffron/40 flex items-start gap-3 text-xs font-mono text-ink">
          <AlertTriangle className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
          <div>
            <strong>O backend FastAPI está offline.</strong> Para a brigada CrewAI orquestrar e gerar receitas com IA, inicia o servidor:
            <code className="block mt-1 p-2 rounded bg-paper border border-line text-tomato">
              cd backend &amp;&amp; uvicorn src.api.api:app --reload
            </code>
          </div>
        </div>
      )}

      {/* Chat Messages Area */}
      <div className="flex-grow space-y-6 mb-6">
        {messages.length === 0 ? (
          /* Empty State with Suggestions */
          <div className="space-y-6">
            <div className="bg-paper-2/40 border border-dashed border-line rounded-card p-8 sm:p-12 text-center flex flex-col items-center justify-center">
              <span className="text-4xl mb-3">🍳</span>
              <h3 className="font-fraunces text-xl font-bold text-ink mb-2">
                A bancada está pronta. O que vamos preparar?
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft max-w-lg mb-6 leading-relaxed">
                Diz o tempo que tens, quantas pessoas vão comer ou uma ideia solta. A brigada de três especialistas (Chef, Redator e Revisor) trata do resto.
              </p>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-2xl text-left">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSubmit(suggestion)}
                    className="p-3.5 rounded-card bg-paper border border-line hover:border-tomato hover:shadow-xs transition-all text-xs font-jakarta text-ink-soft hover:text-ink flex items-start gap-2 group"
                  >
                    <span className="text-tomato font-mono text-sm leading-none shrink-0 group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                    <span>"{suggestion}"</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Message List */
          messages.map((msg, index) => (
            <div key={msg.id} className="space-y-2">
              {msg.role === 'user' ? (
                /* User Message Bubble */
                <div className="flex justify-end">
                  <div className="max-w-2xl bg-paper-2 border border-line rounded-2xl rounded-tr-xs px-5 py-3.5 shadow-xs">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-tomato font-bold">
                        O Teu Pedido
                      </span>
                      <span className="text-[10px] font-mono text-ink-soft/60">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm font-jakarta text-ink leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ) : (
                /* Assistant Recipe Ticket */
                <div className="flex flex-col items-center animate-fade-in">
                  <RecipeTicket recipeMarkdown={msg.content} ticketNumber={String(index + 1).padStart(3, '0')} />
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading Progressive Brigade State */}
        {isAsking && (
          <div className="my-6 bg-paper border-1.5 border-line rounded-card p-6 shadow-warm animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="w-5 h-5 text-tomato animate-spin" />
              <h4 className="font-fraunces font-bold text-base text-ink">
                A Brigada de Cozinha está a trabalhar no teu pedido...
              </h4>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* Step 1: Chef */}
              <div
                className={`flex items-center gap-2.5 p-2 rounded-lg transition-colors ${
                  agentStep >= 1 ? 'bg-paper-2 text-ink' : 'text-ink-soft/40'
                }`}
              >
                <ChefHat className={`w-4 h-4 ${agentStep >= 1 ? 'text-tomato' : ''}`} />
                <span>
                  1. O Chef Criativo está a analisar a despensa e a propor duas ideias de pratos...
                </span>
              </div>

              {/* Step 2: Redator */}
              <div
                className={`flex items-center gap-2.5 p-2 rounded-lg transition-colors ${
                  agentStep >= 2 ? 'bg-paper-2 text-ink' : 'text-ink-soft/40'
                }`}
              >
                <FileText className={`w-4 h-4 ${agentStep >= 2 ? 'text-saffron' : ''}`} />
                <span>
                  2. O Redator de Receitas está a estruturar os passos de confeção e quantidades exatas...
                </span>
              </div>

              {/* Step 3: Revisor */}
              <div
                className={`flex items-center gap-2.5 p-2 rounded-lg transition-colors ${
                  agentStep >= 3 ? 'bg-paper-2 text-ink' : 'text-ink-soft/40'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${agentStep >= 3 ? 'text-olive' : ''}`} />
                <span>
                  3. O Revisor de Segurança está a inspecionar temperaturas e restrições alimentares...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Error notification if ask failed */}
        {errorMessage && (
          <div className="p-4 rounded-card bg-tomato/10 border border-tomato/30 text-xs font-mono text-tomato flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong>Não foi possível gerar a receita:</strong> {errorMessage}
              <p className="mt-1 text-ink-soft">
                Verifica se o servidor FastAPI está a correr e se a variável <code className="bg-paper px-1 rounded">GROQ_API_KEY</code> está configurada no ambiente do backend.
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Sticky Input Bar */}
      <div className="sticky bottom-4 z-20 mt-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex gap-2 p-2 rounded-full bg-paper/95 backdrop-blur-md border border-line shadow-warm"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isAsking}
            placeholder="Diz o que te apetece cozinhar ou o tempo que tens..."
            className="flex-grow px-5 py-2.5 text-sm bg-transparent focus:outline-none text-ink placeholder:text-ink-soft/60 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!input.trim() || isAsking}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-tomato text-paper text-sm font-medium hover:bg-tomato/90 disabled:opacity-40 transition-colors shadow-xs"
          >
            <span>{isAsking ? 'A cozinhar...' : 'Pedir'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatView;
