import { useEffect, useMemo, useState } from "react";
import type {
  CarDetails,
  GenerationResult,
  Lang,
  PostStatus,
  StatusMap,
} from "./lib/types";
import { EMPTY_CAR, LANGS } from "./lib/types";
import { PLATFORMS } from "./lib/platforms";
import { getDict, LANG_LABELS } from "./lib/i18n";
import {
  loadJSON,
  saveJSON,
  removeKey,
  STORAGE_KEYS,
} from "./lib/storage";
import { generateListings } from "./services/api";
import CarForm from "./components/CarForm";
import PlatformCard from "./components/PlatformCard";
import "./App.css";

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [car, setCar] = useState<CarDetails>(EMPTY_CAR);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [status, setStatus] = useState<StatusMap>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof CarDetails, boolean>>
  >({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const dict = useMemo(() => getDict(lang), [lang]);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    setLang(loadJSON<Lang>(STORAGE_KEYS.lang, "en"));
    setCar(loadJSON<CarDetails>(STORAGE_KEYS.car, EMPTY_CAR));
    setResult(loadJSON<GenerationResult | null>(STORAGE_KEYS.result, null));
    setStatus(loadJSON<StatusMap>(STORAGE_KEYS.status, {}));
    setHydrated(true);
  }, []);

  // Persist (after hydration, so we don't clobber stored data with defaults).
  useEffect(() => {
    if (hydrated) saveJSON(STORAGE_KEYS.lang, lang);
  }, [lang, hydrated]);
  useEffect(() => {
    if (hydrated) saveJSON(STORAGE_KEYS.car, car);
  }, [car, hydrated]);
  useEffect(() => {
    if (hydrated) saveJSON(STORAGE_KEYS.status, status);
  }, [status, hydrated]);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1600);
  };

  const updateCar = (patch: Partial<CarDetails>) => {
    setCar((prev) => ({ ...prev, ...patch }));
    // Clear errors for edited fields.
    setErrors((prev) => {
      const next = { ...prev };
      (Object.keys(patch) as (keyof CarDetails)[]).forEach((k) => delete next[k]);
      return next;
    });
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof CarDetails, boolean>> = {};
    if (!car.make.trim()) e.make = true;
    if (!car.model.trim()) e.model = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const generate = async () => {
    setApiError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await generateListings(car);
      setResult(data);
      saveJSON(STORAGE_KEYS.result, data);
      flash("✓");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate";
      setApiError(message.includes("not configured") ? dict.errNoKey : dict.errGenerateFailed);
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      flash(dict.copied);
    } catch {
      // Fallback for older browsers.
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      flash(dict.copied);
    }
  };

  const setPlatformStatus = (id: string, s: PostStatus) => {
    setStatus((prev) => ({ ...prev, [id]: s }));
  };

  const clearAll = () => {
    setCar(EMPTY_CAR);
    setResult(null);
    setStatus({});
    setErrors({});
    setApiError(null);
    removeKey(STORAGE_KEYS.car);
    removeKey(STORAGE_KEYS.result);
    removeKey(STORAGE_KEYS.status);
    flash("✓");
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon">🚗</span>
            <span>{dict.brand}</span>
          </div>
          <div className="lang-switch" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button
                key={l}
                className={`lang-btn ${l === lang ? "active" : ""}`}
                onClick={() => setLang(l)}
                aria-pressed={l === lang}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container">
        <div className="hero">
          <h1>{dict.heroTitle}</h1>
          <p>{dict.heroSub}</p>
        </div>

        <div className="grid">
          <div>
            <CarForm
              car={car}
              dict={dict}
              errors={errors}
              onChange={updateCar}
            />
            <div className="actions-row">
              <button
                className="btn btn-primary btn-block"
                onClick={generate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" /> {dict.generating}
                  </>
                ) : result ? (
                  dict.regenerate
                ) : (
                  dict.generate
                )}
              </button>
              <button
                className="btn btn-ghost"
                onClick={clearAll}
                disabled={loading}
              >
                {dict.clearAll}
              </button>
            </div>
            {apiError && (
              <div className="notice warn" style={{ marginTop: 14 }}>
                <span>⚠️</span>
                <span>{apiError}</span>
              </div>
            )}
          </div>

          <div>
            <div className="glass-card">
              <h2>{dict.listings}</h2>
              <p className="subtle">{dict.listingsSub}</p>

              <div className="notice">
                <span>ℹ️</span>
                <span>{dict.tosNotice}</span>
              </div>

              {result ? (
                <div className="platform-list">
                  {PLATFORMS.map((p) => (
                    <PlatformCard
                      key={p.id}
                      platform={p}
                      listing={result[p.id]?.[lang]}
                      lang={lang}
                      status={status[p.id] ?? "none"}
                      dict={dict}
                      onCopy={copy}
                      onStatus={(s) => setPlatformStatus(p.id, s)}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty">{dict.emptyListings}</div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">{dict.footer}</div>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
