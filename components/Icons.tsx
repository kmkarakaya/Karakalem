import React from 'react';
import { UploadCloud, Download, RefreshCw, Image as ImageIcon, Loader2, AlertCircle, X, Key } from 'lucide-react';

export const UploadIcon = () => <UploadCloud className="w-12 h-12 text-charcoal-400 mb-4" />;
export const DownloadIcon = ({ className }: { className?: string }) => <Download className={className || "w-5 h-5"} />;
export const RefreshIcon = ({ className }: { className?: string }) => <RefreshCw className={className || "w-5 h-5"} />;
export const ImageIconStyled = ({ className }: { className?: string }) => <ImageIcon className={className || "w-6 h-6"} />;
export const LoadingIcon = ({ className }: { className?: string }) => <Loader2 className={`animate-spin ${className || "w-8 h-8"}`} />;
export const ErrorIcon = () => <AlertCircle className="w-10 h-10 text-red-500 mb-2" />;
export const CloseIcon = ({ className }: { className?: string }) => <X className={className || "w-6 h-6"} />;
export const KeyIcon = ({ className }: { className?: string }) => <Key className={className || "w-5 h-5"} />;