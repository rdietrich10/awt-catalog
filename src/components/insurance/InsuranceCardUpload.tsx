"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png"]);
const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface InsuranceCardUploadProps {
  label: string;
  id: string;
  file: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

export function InsuranceCardUpload({
  label,
  id,
  file,
  onChange,
  disabled,
}: InsuranceCardUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const validateAndSet = useCallback(
    (f: File) => {
      setError(null);
      if (!ALLOWED_TYPES.has(f.type)) {
        setError("Only JPEG and PNG images are accepted.");
        return;
      }
      if (f.size > MAX_FILE_SIZE) {
        setError("File must be under 10 MB.");
        return;
      }
      const url = URL.createObjectURL(f);
      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      onChange(f);
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) validateAndSet(f);
    },
    [validateAndSet],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) validateAndSet(f);
    },
    [validateAndSet],
  );

  const handleRemove = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    onChange(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, [preview, onChange]);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
      >
        {label} <span className="text-brand-gold">*</span>
      </label>

      {file && preview ? (
        <div className="relative border border-brand-border p-2 group">
          <img
            src={preview}
            alt={`${label} preview`}
            className="w-full h-32 object-contain bg-brand-black"
          />
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-caption text-brand-silver truncate">
              {file.name}
            </span>
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled}
              className="shrink-0 p-1 text-brand-silver-dark hover:text-red-400 transition-colors"
              aria-label={`Remove ${label}`}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          className={`flex flex-col items-center justify-center gap-2 border border-dashed p-6 cursor-pointer transition-colors ${
            dragOver
              ? "border-brand-gold bg-brand-gold/5"
              : "border-brand-border hover:border-brand-silver-dark"
          } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
        >
          {dragOver ? (
            <ImageIcon size={24} className="text-brand-gold" />
          ) : (
            <Upload size={24} className="text-brand-silver-dark" />
          )}
          <span className="text-body-sm text-brand-silver text-center">
            Drop image here or click to browse
          </span>
          <span className="text-caption text-brand-silver-dim">
            JPEG or PNG, max 10 MB
          </span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        id={id}
        accept="image/jpeg,image/png"
        className="sr-only"
        onChange={handleFileChange}
        disabled={disabled}
      />

      {error && (
        <p className="mt-1 text-caption text-red-400">{error}</p>
      )}
    </div>
  );
}
