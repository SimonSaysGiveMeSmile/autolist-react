import { useState } from "react";
import type { Lang, PostStatus, GeneratedListing } from "../lib/types";
import type { Platform } from "../lib/platforms";
import type { Dict } from "../lib/i18n";

interface Props {
  platform: Platform;
  listing: GeneratedListing | undefined;
  lang: Lang;
  status: PostStatus;
  dict: Dict;
  onCopy: (text: string) => void;
  onStatus: (status: PostStatus) => void;
}

export default function PlatformCard({
  platform,
  listing,
  status,
  dict,
  onCopy,
  onStatus,
}: Props) {
  const [justCopied, setJustCopied] = useState(false);

  const hasListing = !!listing && (listing.title || listing.body);
  const fullText = listing
    ? [listing.title, "", listing.body].filter(Boolean).join("\n")
    : "";

  const copy = () => {
    if (!fullText) return;
    onCopy(fullText);
    setJustCopied(true);
    window.setTimeout(() => setJustCopied(false), 1500);
  };

  const statusLabel =
    status === "posted"
      ? dict.statusPosted
      : status === "draft"
      ? dict.statusDraft
      : dict.statusNone;

  return (
    <div className="platform">
      <div className="platform-head">
        <div className="platform-title">
          <span
            className="platform-logo"
            style={{ background: platform.color }}
            aria-hidden
          >
            {platform.initials}
          </span>
          <span>
            {platform.name}
            <div className="platform-region">{platform.region}</div>
          </span>
        </div>
        <span className="pill active" data-status={status === "none" ? "" : status}>
          {statusLabel}
        </span>
      </div>

      {hasListing ? (
        <>
          <div className="platform-body">
            <div className="gen-text">
              {listing!.title ? <strong>{listing!.title}</strong> : null}
              {listing!.title ? "\n\n" : ""}
              {listing!.body}
            </div>
          </div>

          <div className="platform-actions">
            <button className="btn btn-ghost btn-sm" onClick={copy}>
              {justCopied ? dict.copied : dict.copy}
            </button>
            <a
              className="btn btn-primary btn-sm"
              href={platform.postUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.openSite} ↗
            </a>
          </div>

          <div className="status-row">
            <span>{dict.statusLabel}:</span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => onStatus(status === "draft" ? "none" : "draft")}
              aria-pressed={status === "draft"}
            >
              {dict.markDraft}
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => onStatus(status === "posted" ? "none" : "posted")}
              aria-pressed={status === "posted"}
            >
              {dict.markPosted}
            </button>
          </div>
        </>
      ) : (
        <div className="platform-body">
          <div className="gen-text" style={{ color: "var(--text-faint)" }}>
            —
          </div>
        </div>
      )}
    </div>
  );
}
