'use client';

import { useState, ChangeEvent, useCallback, lazy, Suspense } from 'react';
import Link from 'next/link';
import { ApiError, pdfService } from '../../lib/api';
import { useToken } from '../hooks/useToken';
import { Bot } from 'lucide-react';

// Lazy load icons for performance
const ArrowLeft = lazy(() => import('lucide-react').then(m => ({ default: m.ArrowLeft })));
const FileText = lazy(() => import('lucide-react').then(m => ({ default: m.FileText })));
const CheckCircle = lazy(() => import('lucide-react').then(m => ({ default: m.CheckCircle })));
const Loader2 = lazy(() => import('lucide-react').then(m => ({ default: m.Loader2 })));
const AlertCircle = lazy(() => import('lucide-react').then(m => ({ default: m.AlertCircle })));
const Upload = lazy(() => import('lucide-react').then(m => ({ default: m.Upload })));
const Shield = lazy(() => import('lucide-react').then(m => ({ default: m.Shield })));
const Trash2 = lazy(() => import('lucide-react').then(m => ({ default: m.Trash2 })));
const Eye = lazy(() => import('lucide-react').then(m => ({ default: m.Eye })));

type Severity = 'low' | 'medium' | 'high';
type Issue = { issue: string; severity: Severity; law_reference: string; explanation: string; clause?: string };

export default function PdfAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const { token, isLoading: tokenLoading, error: tokenError, refetch } = useToken();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
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
        setError('Please upload a PDF file only.');
      }
    }
  }, []);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid PDF file.');
      setFile(null);
    }
  };

  const analyzePdf = async () => {
    if (!file || !token) {
      setError(!token ? 'Authentication token not available. Please refresh the page.' : 'No file selected.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    try {
      const response = await pdfService.analyzePdf(file, token);
      setIssues(response.issues || []);
    } catch (err) {
      console.error('PDF analysis error:', err);

      if (err instanceof ApiError && err.status === 429) {
        setError("⚠️ Daily limit exceeded. Try again tomorrow.");
      } else {
        setError("Failed to analyze PDF. Please try again.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityBadge = (severity: Severity) => {
    const badges = {
      low: 'bg-green-900/30 text-green-400 border border-green-500/30',
      medium: 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30',
      high: 'bg-red-900/30 text-red-400 border border-red-500/30'
    };
    return badges[severity];
  };

  const getSeverityIcon = (severity: Severity) =>
    ({ low: '✅', medium: '⚠️', high: '🚨' }[severity]);

  if (tokenLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="text-center space-y-6 relative z-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
              <Bot size={32} className="text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 border-r-purple-400 animate-spin"></div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Waking AI up
            </h2>
            <div className="flex justify-center items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-all duration-500 relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="absolute left-[-48px] top-[-48px] w-[192px] h-[192px] rounded-full blur-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/30" />
        <div className="absolute bottom-[-24px] right-[-24px] w-[128px] h-[128px] rounded-full blur-3xl bg-gradient-to-br from-blue-500/20 to-pink-500/20" />

        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-40 bg-purple-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center space-x-2 px-4 py-2 backdrop-blur-md rounded-xl shadow-lg border bg-slate-800/80 border-slate-600 text-slate-300 hover:text-purple-400 hover:bg-slate-700/80 hover:scale-105 transition-all"
        >
          <Suspense fallback={<span>←</span>}><ArrowLeft size={16} /></Suspense>
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      <section className="relative z-10 pt-24 pb-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 backdrop-blur-md bg-slate-800/50 text-purple-400">
              <Suspense fallback={<span>🛡️</span>}><Shield size={16} className="animate-pulse" /></Suspense>
              <span className="text-sm font-medium">AI Contract Analyzer</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">AI PDF Analyzer</h1>
            <p className="text-lg text-slate-300">
              Upload employment contracts to detect potential EU labor law compliance issues.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl shadow-2xl border overflow-hidden backdrop-blur-md p-6 space-y-6 bg-slate-800/50 border-slate-600/50">

            <div className="space-y-4">
              {!file ? (
                <div
                  className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 p-8 ${dragActive
                    ? 'border-purple-500 bg-purple-900/20'
                    : 'border-slate-600 hover:border-slate-500 bg-slate-800/30'
                    }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
                      <Suspense fallback={<span>↑</span>}><Upload className="text-white" size={28} /></Suspense>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Upload Your Contract</h3>
                      <p className="text-sm text-slate-300">Drag and drop a PDF file here, or click to browse</p>
                    </div>
                    <div className="space-y-4">
                      <input type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" id="file-upload" />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:from-purple-700 hover:to-blue-700 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <Suspense fallback={<span>📄</span>}><FileText size={20} /></Suspense>
                        Choose PDF File
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border bg-slate-700/50 border-slate-600/50 shadow-sm transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-900/30 shrink-0">
                        <Suspense fallback={<span>📄</span>}><FileText className="text-red-500" size={20} /></Suspense>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-md">
                          Selected: {file.name}
                        </p>
                        <p className="text-sm text-slate-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {!isAnalyzing && issues.length === 0 && (
                        <button
                          onClick={analyzePdf}
                          disabled={!file || isAnalyzing || !token}
                          className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:from-purple-700 hover:to-blue-700 hover:scale-105 transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                        >
                          {tokenError
                            ? tokenError.status === 429
                              ? 'Limit Exceeded'
                              : 'AI Unavailable'
                            : isAnalyzing
                              ? 'Analyzing...'
                              : 'Analyze'}                        </button>
                      )}
                      <button
                        onClick={() => { setFile(null); setIssues([]); setError(null); }}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-900/20 hover:scale-105 transition-all"
                      >
                        <Suspense fallback={<span>✖</span>}><Trash2 size={18} /></Suspense>
                      </button>
                    </div>
                  </div>
                </div>

              )}

              {error && (
                <div className="p-4 rounded-xl border flex items-center gap-3 bg-red-900/20 text-red-400 border-red-500/30">
                  <Suspense fallback={<span>!</span>}><AlertCircle size={16} /></Suspense>
                  {error}
                </div>
              )}
            </div>

            {isAnalyzing && (
              <div className="text-center space-y-4 py-8">
                <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg animate-pulse">
                  <Suspense fallback={<span>⏳</span>}><Loader2 className="text-white animate-spin" size={28} /></Suspense>
                </div>
                <div>
                  <div className="flex justify-center items-center gap-2 text-lg font-semibold mb-2 text-white">
                    <Suspense fallback={<span>⏳</span>}><Loader2 className="w-5 h-5 animate-spin text-purple-400" /></Suspense>
                    Analyzing contract...
                  </div>
                  <p className="text-sm text-slate-300">Our AI is reviewing your document for EU law compliance</p>
                </div>
                <div className="max-w-md mx-auto mt-6">
                  <div className="flex justify-between text-xs mb-2 text-slate-400">
                    <span>Extracting text...</span>
                    <span>Analyzing clauses...</span>
                    <span>Checking compliance...</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-700">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            )}

            {!isAnalyzing && issues.length > 0 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-lg font-semibold text-white">
                  {issues.length} issue{issues.length > 1 ? 's' : ''} detected
                </h2>
                {issues.map((issue, i) => (
                  <div key={i} className="border rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1 bg-slate-700/50 border-slate-600/50 hover:bg-slate-700/70">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-white">{issue.issue}</h3>
                        <p className="text-sm text-purple-400">{issue.law_reference}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getSeverityBadge(issue.severity)}`}>
                        {getSeverityIcon(issue.severity)} {issue.severity}
                      </span>
                    </div>
                    {issue.clause && (
                      <div className="border rounded-lg p-3 mb-2 bg-slate-800/50 border-slate-600/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Suspense fallback={<span>👁</span>}><Eye size={16} className="text-purple-400" /></Suspense>
                          <p className="text-sm font-medium text-slate-300">Problematic Clause:</p>
                        </div>
                        <p className="text-sm italic text-slate-400">"{issue.clause}"</p>
                      </div>
                    )}
                    <p className="text-sm text-slate-300">{issue.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {!isAnalyzing && issues.length === 0 && file && (
              <div className="text-center space-y-3 animate-fade-in">
                <Suspense fallback={<span>✔</span>}><CheckCircle className="mx-auto w-12 h-12 text-green-400" /></Suspense>
                <h3 className="text-lg font-semibold text-white">No issues detected</h3>
                <p className="text-slate-300">The contract appears compliant with EU labor law.</p>
              </div>
            )}

            {!isAnalyzing && !file && (
              <div className="text-center space-y-6 py-12">
                <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center bg-slate-700/50 shadow-lg">
                  <Suspense fallback={<span>📄</span>}><FileText className="text-slate-400" size={32} /></Suspense>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Ready to Analyze</h3>
                  <p className="text-slate-300">Upload a PDF contract to start the analysis.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}