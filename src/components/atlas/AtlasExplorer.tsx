'use client';

/**
 * Lớp giao diện của Atlas Giải Phẫu 3D.
 *
 * Cảnh three.js (AtlasScene) chỉ nhận vào một `SceneState` bất biến và bắn ra
 * sự kiện chọn; toàn bộ bảng điều khiển, tìm kiếm và bảng chi tiết nằm ở đây,
 * dùng đúng bảng màu tối + Tailwind + framer-motion của CoThe.Info.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Focus,
  Info,
  Layers3,
  Pause,
  RotateCcw,
  RotateCw,
  Search,
  X,
} from 'lucide-react';
import LanguageToggle from '@/components/shared/LanguageToggle';
import { useLanguageStore } from '@/stores/useLanguageStore';
import {
  DEFAULT_VISIBLE,
  PRESET_ORGANS,
  SYSTEMS,
  explanation,
  hasSpecificExplanation,
  systemName,
  type Atlas,
  type Concept,
  type SceneState,
  type SystemId,
  type View,
} from '@/lib/atlas/anatomy';
import { atlasText } from '@/lib/atlas/atlas-text';
import { AtlasError, errorCode, type AtlasErrorCode } from '@/lib/atlas/model-download';
import { conceptLabel, searchConcepts } from '@/lib/atlas/vi-anatomy';

// Cảnh 3D chỉ chạy trên trình duyệt (WebGL, DecompressionStream) nên tắt SSR.
const AtlasScene = dynamic(() => import('./AtlasScene'), { ssr: false });

const INITIAL: SceneState = {
  explode: 0,
  visible: DEFAULT_VISIBLE,
  selected: [],
  isolate: false,
  view: 'three-quarter',
  rotate: false,
  reset: 0,
};

export default function AtlasExplorer() {
  const language = useLanguageStore((s) => s.language);
  const text = atlasText(language);

  const [atlas, setAtlas] = useState<Atlas | null>(null);
  const [state, setState] = useState<SceneState>(INITIAL);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<AtlasErrorCode | null>(null);
  const [panel, setPanel] = useState<'layers' | 'search' | null>(null);
  const [details, setDetails] = useState(false);
  const [about, setAbout] = useState(false);
  const [query, setQuery] = useState('');
  const [chosen, setChosen] = useState<Concept | null>(null);
  const detailTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const abort = new AbortController();
    fetch('/models/atlas.json', { signal: abort.signal })
      .then((r) => {
        if (!r.ok) throw new AtlasError('catalogue');
        return r.json();
      })
      .then((data: Atlas) => setAtlas(data))
      .catch((e: unknown) => {
        if ((e as Error)?.name !== 'AbortError') setError(errorCode(e));
      });
    return () => abort.abort();
  }, []);

  // Phím "/" mở ô tìm kiếm, "Esc" đóng lớp phủ đang mở.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (e.key === '/' && !typing) {
        e.preventDefault();
        setPanel('search');
        setDetails(false);
      }
      if (e.key === 'Escape') {
        setPanel(null);
        setAbout(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const parts = useMemo(() => new Map((atlas?.parts ?? []).map((p) => [p.id, p])), [atlas]);
  const counts = useMemo(
    () =>
      Object.fromEntries(
        SYSTEMS.map((s) => [s.id, atlas?.parts.filter((p) => p.system === s.id).length ?? 0])
      ) as Record<SystemId, number>,
    [atlas]
  );
  const activeSystems = SYSTEMS.filter((s) => counts[s.id] > 0);
  const results = useMemo(
    () => (atlas ? searchConcepts(atlas.concepts, query) : []),
    [atlas, query]
  );

  const selectedParts = state.selected.map((id) => parts.get(id)).filter((p) => !!p);
  const selected = selectedParts[0];
  const system = SYSTEMS.find((s) => s.id === selected?.system);
  const visibleCount =
    atlas?.parts.filter((p) =>
      state.isolate
        ? state.selected.includes(p.id)
        : state.visible.includes(p.system) || state.selected.includes(p.id)
    ).length ?? 0;

  const choose = useCallback((concept: Concept) => {
    setChosen(concept);
    setState((s) => ({ ...s, selected: concept.elements, isolate: false, rotate: false }));
    setDetails(true);
    setPanel(null);
  }, []);

  const choosePart = useCallback(
    (id: string) => {
      const part = parts.get(id);
      if (!part) return;
      setChosen({ id: part.conceptId, name: part.name, elements: [id] });
      setState((s) => ({ ...s, selected: [id], isolate: false, rotate: false }));
      setDetails(true);
      setPanel(null);
    },
    [parts]
  );

  const toggleSystem = (id: SystemId) => {
    setDetails(false);
    setState((s) => ({
      ...s,
      selected: [],
      isolate: false,
      visible: s.visible.includes(id) ? s.visible.filter((x) => x !== id) : [...s.visible, id],
    }));
  };

  const showOnly = (visible: SystemId[]) =>
    setState((s) => ({ ...s, visible, selected: [], isolate: false }));

  const reset = () => {
    setState((s) => ({ ...INITIAL, visible: DEFAULT_VISIBLE, reset: s.reset + 1 }));
    setChosen(null);
    setDetails(false);
    setPanel(null);
  };

  const openPanel = (next: 'layers' | 'search') => {
    setDetails(false);
    setPanel((p) => (p === next ? null : next));
  };

  const label = chosen ? conceptLabel(chosen.name, language) : null;
  const caption = state.isolate
    ? (label?.primary ?? text.captionSelected)
    : state.explode > 0.95
      ? text.captionInventory
      : state.explode > 0.05
        ? text.captionSeparated
        : text.captionBody;

  const views: { id: View; short: string; label: string }[] = [
    { id: 'three-quarter', short: '¾', label: text.viewThreeQuarter },
    { id: 'front', short: language === 'vi' ? 'T' : 'F', label: text.viewFront },
    { id: 'side', short: language === 'vi' ? 'B' : 'S', label: text.viewSide },
    { id: 'back', short: language === 'vi' ? 'S' : 'B', label: text.viewBack },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950 text-slate-200">
      {atlas && (
        <AtlasScene
          atlas={atlas}
          state={{ ...state, inspectorOpen: details && selectedParts.length > 0 }}
          canvasLabel={text.canvasAria}
          onSelect={choosePart}
          onProgress={(n) => {
            setProgress(n);
            if (n === 100) setError(null);
          }}
          onError={setError}
        />
      )}

      {/* Làm tối bốn góc để giao diện phủ luôn đọc được trên nền 3D. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(2,6,23,0.75)_100%)]" />

      {/* ── Thanh tiêu đề ─────────────────────────────────────────────── */}
      <header className="atlas-identity pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-3 sm:p-4">
        <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-slate-700/50 bg-slate-900/80 px-3 py-2 backdrop-blur-xl">
          <Link
            href="/"
            aria-label={text.back}
            title={text.back}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 transition-transform hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </Link>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {text.eyebrow}
            </p>
            <h1 className="truncate font-heading text-base font-bold text-white sm:text-lg">
              {text.title}
            </h1>
            <p className="hidden text-[11px] text-slate-400 sm:block">
              {(atlas?.parts.length ?? 2234).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}{' '}
              {text.pieces} · {text.source}
            </p>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => openPanel('search')}
            aria-label={text.search}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium backdrop-blur-xl transition-colors ${
              panel === 'search'
                ? 'border-blue-400/60 bg-blue-500/20 text-white'
                : 'border-slate-700/50 bg-slate-900/80 text-slate-300 hover:text-white'
            }`}
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">{text.search}</span>
            <kbd className="ml-1 hidden rounded border border-slate-600/60 px-1.5 text-[10px] text-slate-400 lg:inline">
              /
            </kbd>
          </button>
          <button
            type="button"
            onClick={() => {
              setDetails(false);
              setPanel(null);
              setAbout(true);
            }}
            aria-label={text.aboutOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-900/80 text-slate-300 backdrop-blur-xl transition-colors hover:text-white"
          >
            <Info className="h-4 w-4" />
          </button>
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* ── Bảng hệ cơ quan ───────────────────────────────────────────── */}
      <section
        aria-label={text.systems}
        className={`absolute z-30 flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/85 backdrop-blur-xl lg:left-4 lg:top-28 lg:bottom-40 lg:flex lg:w-64 ${
          panel === 'layers' ? 'inset-x-3 bottom-3 top-24 flex' : 'hidden'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700/50 px-4 py-3">
          <span className="font-heading text-sm font-semibold text-white">{text.systems}</span>
          <button
            type="button"
            onClick={() => setPanel(null)}
            aria-label={text.systemsClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
          <span className="hidden rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-400 lg:inline">
            {activeSystems.length}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 border-b border-slate-700/50 p-3">
          {[
            { label: text.presetAll, value: activeSystems.map((s) => s.id) },
            { label: text.presetSkeleton, value: ['skeletal' as SystemId] },
            { label: text.presetOrgans, value: PRESET_ORGANS },
          ].map((preset) => {
            const active =
              preset.value.length === state.visible.length &&
              preset.value.every((id) => state.visible.includes(id));
            return (
              <button
                key={preset.label}
                type="button"
                aria-pressed={active}
                onClick={() => showOnly(preset.value)}
                className={`rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2">
          {activeSystems.map((s) => {
            const on = state.visible.includes(s.id);
            const name = systemName(s, language);
            return (
              <div
                key={s.id}
                className={`flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors ${
                  on ? 'bg-slate-800/40' : ''
                }`}
              >
                <button
                  type="button"
                  title={text.showOnly(name)}
                  onClick={() => showOnly([s.id])}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: s.color }}
                  />
                  <span
                    className={`truncate text-sm ${on ? 'text-white' : 'text-slate-400'}`}
                  >
                    {name}
                  </span>
                  <span className="ml-auto shrink-0 text-[11px] tabular-nums text-slate-500">
                    {counts[s.id]}
                  </span>
                </button>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label={text.toggleSystem(name)}
                  onClick={() => toggleSystem(s.id)}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                    on ? 'bg-blue-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all"
                    style={{ left: on ? '1.125rem' : '0.125rem' }}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-slate-700/50 px-4 py-2.5 text-[11px] text-slate-400">
          <span>
            {text.visiblePieces(
              visibleCount.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')
            )}
          </span>
          <button
            type="button"
            onClick={() => showOnly([])}
            className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            {text.hideAll}
          </button>
        </div>
      </section>

      {/* ── Tìm kiếm ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {panel === 'search' && (
          <motion.section
            key="search"
            aria-label={text.search}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-3 top-24 z-40 flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/95 backdrop-blur-xl sm:left-auto sm:right-4 sm:w-96"
          >
            <div className="flex items-center gap-2 border-b border-slate-700/50 px-3 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={text.searchPlaceholder}
                aria-label={text.searchAria}
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setPanel(null)}
                aria-label={text.searchClose}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-1.5">
              {results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-slate-400">{text.searchEmpty}</p>
              )}
              {results.map((c) => {
                const l = conceptLabel(c.name, language);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => choose(c)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-800"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-white">{l.primary}</span>
                      {l.secondary && (
                        <span className="block truncate text-[11px] text-slate-500">
                          {l.secondary}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 text-[11px] tabular-nums text-slate-500">
                      {c.elements.length} {text.piecesShort}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="border-t border-slate-700/50 px-3 py-2 text-[11px] text-slate-500">
              {query ? text.searchHintResults : text.searchHintIdle}
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Điều khiển góc nhìn ───────────────────────────────────────── */}
      <nav
        aria-label={text.views}
        className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-1 rounded-2xl border border-slate-700/50 bg-slate-900/80 p-1.5 backdrop-blur-xl"
      >
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            title={v.label}
            aria-label={v.label}
            aria-pressed={state.view === v.id}
            disabled={state.explode > 0.8 && v.id !== 'front'}
            onClick={() =>
              setState((s) => ({ ...s, view: v.id, reset: s.reset + 1, rotate: false }))
            }
            className={`h-9 w-9 rounded-xl text-sm font-semibold transition-colors disabled:opacity-30 ${
              state.view === v.id
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {v.short}
          </button>
        ))}
        <span className="my-0.5 h-px bg-slate-700/60" />
        <button
          type="button"
          disabled={state.explode >= 0.4}
          title={state.rotate ? text.pauseRotate : text.rotate}
          aria-label={state.rotate ? text.pauseRotate : text.rotate}
          onClick={() => setState((s) => ({ ...s, rotate: !s.rotate }))}
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors disabled:opacity-30 ${
            state.rotate ? 'bg-blue-500/20 text-blue-300' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          {state.rotate ? <Pause className="h-4 w-4" /> : <RotateCw className="h-4 w-4" />}
        </button>
        <button
          type="button"
          title={text.reset}
          aria-label={text.resetAria}
          onClick={reset}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </nav>

      {/* ── Chú thích + gợi ý thao tác (nằm ngay trên thanh điều khiển) ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[8.75rem] z-10 flex flex-col items-center gap-1 px-4">
        <div className="flex w-full items-center justify-center gap-3">
          <span className="hidden h-px w-8 shrink-0 bg-slate-600/60 sm:block" />
          <span className="truncate text-center text-[11px] uppercase tracking-[0.15em] text-slate-400 sm:tracking-[0.2em]">
            {caption}
          </span>
          <span className="hidden h-px w-8 shrink-0 bg-slate-600/60 sm:block" />
        </div>
        <p className="hidden text-center text-[11px] text-slate-500 sm:block">
          {state.explode > 0.8 ? text.hintPan : text.hintOrbit} · {text.hintZoom} · {text.hintTap}
        </p>
      </div>

      {/* ── Thanh điều khiển dưới ─────────────────────────────────────── */}
      <div className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-3 rounded-2xl border border-slate-700/50 bg-slate-900/85 p-3 backdrop-blur-xl sm:inset-x-auto sm:left-1/2 sm:w-[32rem] sm:-translate-x-1/2">
        <button
          type="button"
          onClick={() => openPanel('layers')}
          aria-label={text.systemsOpen}
          className="flex shrink-0 flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white lg:hidden"
        >
          <Layers3 className="h-5 w-5" />
          <span className="text-[10px]">{text.systems}</span>
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-baseline justify-between gap-2">
            <label htmlFor="atlas-explode" className="text-xs font-medium text-slate-300">
              {text.explode}
            </label>
            <output
              htmlFor="atlas-explode"
              className="font-heading text-sm font-semibold tabular-nums text-white"
            >
              {Math.round(state.explode * 100)}
              <span className="text-[11px] text-slate-400">%</span>
            </output>
          </div>
          <input
            id="atlas-explode"
            className="atlas-range"
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(state.explode * 100)}
            onChange={(e) => {
              const value = Number(e.target.value);
              setState((s) => ({
                ...s,
                explode: value / 100,
                view: value > 80 ? 'front' : s.view,
                rotate: false,
              }));
            }}
          />
          <div className="mt-0.5 flex justify-between text-[10px] text-slate-500">
            <span>{text.explodeStart}</span>
            <span>{text.explodeEnd}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={reset}
          aria-label={text.resetAria}
          className="flex shrink-0 flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <RotateCcw className="h-5 w-5" />
          <span className="text-[10px]">{text.reset}</span>
        </button>
      </div>

      {/* ── Tiến trình tải / lỗi ──────────────────────────────────────── */}
      <AnimatePresence>
        {!error && progress < 100 && (
          <motion.div
            key="loading"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="absolute left-1/2 top-1/2 z-40 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-700/50 bg-slate-900/90 p-4 backdrop-blur-xl"
          >
            <div className="flex items-start gap-3">
              <Activity className="mt-0.5 h-5 w-5 shrink-0 animate-pulse text-blue-400" />
              <div className="min-w-0 flex-1">
                <p className="font-heading text-sm font-semibold text-white">{text.loadingTitle}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {text.loadingDetail(
                    progress,
                    (atlas?.parts.length ?? 2234).toLocaleString(
                      language === 'vi' ? 'vi-VN' : 'en-US'
                    )
                  )}
                </p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-[width] duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-500">{text.loadingNote}</p>
              </div>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            key="error"
            role="alert"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="absolute left-1/2 top-1/2 z-40 w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-red-500/40 bg-slate-900/95 p-4 text-center backdrop-blur-xl"
          >
            <p className="text-sm text-slate-200">{text.errors[error]}</p>
            <button
              type="button"
              onClick={() => location.reload()}
              className="mt-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white"
            >
              {text.reload}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bảng chi tiết cấu trúc ────────────────────────────────────── */}
      <AnimatePresence>
        {details && selectedParts.length > 0 && chosen && label && (
          <motion.aside
            key="detail"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="atlas-detail absolute inset-x-3 bottom-3 z-40 flex max-h-[58vh] flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/95 backdrop-blur-xl sm:inset-x-auto sm:right-4 sm:top-28 sm:bottom-24 sm:w-80 sm:max-h-none"
          >
            <div className="relative border-b border-slate-700/50 p-4">
              <span
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: system?.color }}
              />
              <p className="text-[10px] uppercase tracking-widest text-slate-400">
                {systemName(system, language)}
              </p>
              <h2
                ref={detailTitle}
                tabIndex={-1}
                className="mt-1 pr-8 font-heading text-lg font-bold leading-tight text-white"
              >
                {label.primary}
              </h2>
              {label.secondary && (
                <p className="text-xs italic text-slate-500">{label.secondary}</p>
              )}
              <button
                type="button"
                onClick={() => setDetails(false)}
                aria-label={text.closeDetail}
                className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <p className="text-sm leading-relaxed text-slate-300">
                {selected ? explanation(chosen.name, selected.system, language) : ''}
              </p>
              {!hasSpecificExplanation(chosen.name) && (
                <p className="text-[11px] text-slate-500">{text.detailContextNote}</p>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-slate-800/60 p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    {text.detailReference}
                  </p>
                  <p className="font-heading text-sm font-semibold text-white">{chosen.id}</p>
                </div>
                <div className="rounded-xl bg-slate-800/60 p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    {text.detailSelected}
                  </p>
                  <p className="font-heading text-sm font-semibold text-white tabular-nums">
                    {state.selected.length.toLocaleString(
                      language === 'vi' ? 'vi-VN' : 'en-US'
                    )}
                  </p>
                </div>
              </div>

              {selectedParts.length > 1 && (
                <div>
                  <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {text.detailMembers}
                  </h3>
                  <div className="space-y-0.5">
                    {selectedParts.slice(0, 50).map((p) => {
                      const l = conceptLabel(p.name, language);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => choosePart(p.id)}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                        >
                          <span className="min-w-0 flex-1 truncate">{l.primary}</span>
                          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                        </button>
                      );
                    })}
                  </div>
                  {selectedParts.length > 50 && (
                    <p className="mt-1 text-[11px] text-slate-500">
                      {text.detailMore(selectedParts.length - 50)}
                    </p>
                  )}
                </div>
              )}

              <a
                href="https://lifesciencedb.jp/bp3d/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
              >
                {text.sourceLink}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="space-y-2 border-t border-slate-700/50 p-3">
              <button
                type="button"
                onClick={() => setState((s) => ({ ...s, isolate: !s.isolate, explode: 0 }))}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  state.isolate
                    ? 'bg-blue-500/20 text-blue-300 ring-1 ring-blue-400/40'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                }`}
              >
                <Focus className="h-4 w-4" />
                {state.isolate ? text.unisolate : text.isolate}
              </button>
              <button
                type="button"
                onClick={() => {
                  setState((s) => ({ ...s, selected: [], isolate: false }));
                  setDetails(false);
                }}
                className="w-full rounded-xl px-4 py-2 text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                {text.clearSelection}
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Giới thiệu nguồn dữ liệu ──────────────────────────────────── */}
      <AnimatePresence>
        {about && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
            onClick={() => setAbout(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={text.aboutTitle}
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-700/50 bg-slate-900 p-5"
            >
              <p className="text-[10px] uppercase tracking-widest text-slate-400">
                {text.aboutEyebrow}
              </p>
              <h2 className="mt-1 font-heading text-xl font-bold text-white">{text.aboutTitle}</h2>
              <p className="mt-1 text-sm text-slate-400">{text.aboutLead}</p>

              <div className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-300">
                {text.aboutBody.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>

              <h3 className="mt-5 font-heading text-sm font-semibold text-white">
                {text.aboutSourceHeading}
              </h3>
              <p className="mt-1 text-sm text-slate-400">{text.aboutSourceBody}</p>

              <div className="mt-3 flex flex-col gap-1.5">
                {[
                  {
                    href: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
                    label: text.aboutLicense,
                  },
                  {
                    href: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html',
                    label: text.aboutGeometry,
                  },
                  {
                    href: 'https://academic.oup.com/nar/article/37/suppl_1/D782/1000752',
                    label: text.aboutPaper,
                  },
                  {
                    href: 'https://github.com/ashemag/human-atlas',
                    label: text.aboutViewer,
                  },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setAbout(false)}
                className="mt-5 w-full rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
              >
                {text.aboutClose}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
