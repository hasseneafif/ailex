'use client';

import { useState, ChangeEvent, useCallback } from 'react';
import Link from 'next/link';
import { ApiError, pdfService } from '../../lib/api';
import { useToken } from '../hooks/useToken';
import { useLanguage } from '@/lib/language-context';
import { LanguageToggle } from '../components/LanguageToggle';
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  Loader2,
  AlertCircle,
  Upload,
  Shield,
  Trash2,
  Eye,
  Bot,
  AlertTriangle,
} from 'lucide-react';

type Severity = 'low' | 'medium' | 'high';
type Issue = { issue: string; severity: Severity; law_reference: string; explanation: string; clause?: string };

export default function PdfAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const { t } = useLanguage();

  const { token, isLoading: tokenLoading, error: tokenError } = useToken();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setError(null);
      } else {
        setError(t.pdf.upload.errorInvalidFile);
      }
    }
  }, [t.pdf.upload.errorInvalidFile]);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError(t.pdf.upload.errorSelectValid);
      setFile(null);
    }
  };

  const analyzePdf = async () => {
    if (!file || !token) {
      setError(!token ? t.pdf.errors.tokenUnavailable : t.pdf.errors.noFile);
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setIssues([]);
    setProgress(null);
    try {
      for await (const event of pdfService.streamAnalyzePdf(file, token)) {
        if (event.type === 'progress') {
          setProgress({ current: event.current, total: event.total });
        } else if (event.type === 'issues') {
          setIssues((prev) => [...prev, ...(event.issues as Issue[])]);
        } else if (event.type === 'error') {
          setError(t.pdf.errors.analysisFailed);
        }
        // 'complete' — no action needed, isAnalyzing will be cleared in finally
      }
    } catch (err) {
      console.error('PDF analysis error:', err);
      if (err instanceof ApiError && err.status === 429) {
        setError(t.pdf.errors.limitExceeded);
      } else {
        setError(t.pdf.errors.analysisFailed);
      }
    } finally {
      setIsAnalyzing(false);
      setProgress(null);
    }
  };

  const getSeverityBadge = (severity: Severity) => {
    const badges = {
      low: 'bg-green-900/30 text-green-400 border border-green-500/30',
      medium: 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30',
      high: 'bg-red-900/30 text-red-400 border border-red-500/30',
    };
    return badges[severity];
  };

  const getSeverityIcon = (severity: Severity) => ({
    low: <CheckCircle size={12} />,
    medium: <AlertTriangle size={12} />,
    high: <AlertCircle size={12} />,
  }[severity]);

  if (tokenLoading) {
    return (
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-black to-pink-900/10" />
        <div className="text-center space-y-6 relative z-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
              <Bot size={32} className="text-purple-400 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">{t.pdf.loading}</h2>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-black to-pink-900/10" />

      {/* Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl backdrop-blur-md transition-all duration-300 group"
        >
          <ArrowLeft size={16} className="text-slate-400 group-hover:text-purple-400 transition-colors" />
          <span className="text-sm font-medium text-white">{t.back}</span>
        </Link>
      </div>

      <div className="fixed top-6 right-6 z-50">
        <LanguageToggle isDark={true} />
      </div>

      <div className="min-h-screen flex flex-col items-center pt-24 pb-8 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl w-full">
          {/* Service Error Banner */}
          {tokenError && (
            <div className="mb-6 p-4 rounded-xl bg-amber-900/20 border border-amber-500/30 flex items-center gap-3 text-amber-400 animate-fade-in">
              <AlertTriangle size={20} className="shrink-0" />
              <span>{tokenError.status === 429 ? t.limitExceededError : t.serviceError}</span>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
              <Shield className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-sm font-medium text-white">{t.pdf.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              <span className="text-white">{t.pdf.title}</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">{t.pdf.subtitle}</p>
          </div>

          {/* Main Container */}
          <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md p-6 space-y-6">
            {/* Upload Area */}
            {!file ? (
              <div
                className={`relative border-2 border-dashed rounded-xl transition-all duration-300 p-8 ${
                  dragActive
                    ? 'border-purple-400 bg-purple-500/10'
                    : 'border-white/20 hover:border-white/30 bg-white/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-white/10 border border-purple-400/50 flex items-center justify-center">
                    <Upload className="text-purple-400" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{t.pdf.upload.title}</h3>
                    <p className="text-sm text-slate-400">{t.pdf.upload.description}</p>
                  </div>
                  <div>
                    <input type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" id="file-upload" />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium cursor-pointer bg-white text-black hover:bg-slate-100 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    >
                      <FileText size={20} />
                      {t.pdf.upload.button}
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-red-900/30 border border-red-500/30 flex items-center justify-center shrink-0">
                      <FileText className="text-red-400" size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-white truncate max-w-[200px] sm:max-w-xs md:max-w-sm">
                        {file.name}
                      </p>
                      <p className="text-sm text-slate-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!isAnalyzing && issues.length === 0 && (
                      <button
                        onClick={analyzePdf}
                        disabled={!file || isAnalyzing || !token}
                        className="px-5 py-2.5 rounded-xl font-medium bg-white text-black hover:bg-slate-100 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                      >
                        {tokenError
                          ? tokenError.status === 429
                            ? t.pdf.analyze.limitExceeded
                            : t.pdf.analyze.unavailable
                          : t.pdf.analyze.button}
                      </button>
                    )}
                    <button
                      onClick={() => { setFile(null); setIssues([]); setError(null); }}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-900/20 border border-transparent hover:border-red-500/30 transition-all duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30 flex items-center gap-3 text-red-400">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Analyzing State */}
            {isAnalyzing && (
              <div className="text-center space-y-4 py-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-white/10 border border-purple-400/50 flex items-center justify-center animate-pulse">
                  <Loader2 className="text-purple-400 animate-spin" size={28} />
                </div>
                <div>
                  <div className="flex justify-center items-center gap-2 text-lg font-semibold mb-2 text-white">
                    <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                    {t.pdf.analyze.title}
                  </div>
                  <p className="text-sm text-slate-400">{t.pdf.analyze.subtitle}</p>
                </div>
                <div className="max-w-md mx-auto mt-6">
                  {progress ? (
                    <>
                      <div className="flex justify-between text-xs mb-2 text-slate-500">
                        <span>{t.pdf.analyze.steps.analyzing}</span>
                        <span>{progress.current}/{progress.total}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                          style={{ width: `${(progress.current / progress.total) * 100}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between text-xs mb-2 text-slate-500">
                        <span>{t.pdf.analyze.steps.extracting}</span>
                        <span>{t.pdf.analyze.steps.analyzing}</span>
                        <span>{t.pdf.analyze.steps.checking}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ width: '20%' }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Results */}
            {issues.length > 0 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-lg font-semibold text-white">
                  {t.pdf.results.issuesDetected
                    .replace('{count}', issues.length.toString())
                    .replace('{plural}', issues.length > 1 ? 's' : '')}
                </h2>
                {issues.map((issue, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-white">{issue.issue}</h3>
                        <p className="text-sm text-purple-400">{issue.law_reference}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 whitespace-nowrap shrink-0 h-fit ${getSeverityBadge(issue.severity)}`}>
                        {getSeverityIcon(issue.severity)} {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                      </span>
                    </div>
                    {issue.clause && (
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye size={16} className="text-purple-400" />
                          <p className="text-sm font-medium text-slate-300">{t.pdf.results.problematicClause}</p>
                        </div>
                        <p className="text-sm italic text-slate-400">"{issue.clause}"</p>
                      </div>
                    )}
                    <p className="text-sm text-slate-300">{issue.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* No Issues Found */}
            {!isAnalyzing && issues.length === 0 && file && !error && progress === null && (
              <div className="text-center space-y-3 py-8 animate-fade-in">
                <CheckCircle className="mx-auto w-12 h-12 text-green-400" />
                <h3 className="text-lg font-semibold text-white">{t.pdf.results.noIssues}</h3>
                <p className="text-slate-400">{t.pdf.results.noIssuesDescription}</p>
              </div>
            )}

            {/* Empty State */}
            {!isAnalyzing && !file && (
              <div className="text-center space-y-6 py-12">
                <div className="mx-auto w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <FileText className="text-slate-500" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{t.pdf.results.ready}</h3>
                  <p className="text-slate-400">{t.pdf.results.readyDescription}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
