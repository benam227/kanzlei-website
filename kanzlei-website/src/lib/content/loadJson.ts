import type { FAQItem, DownloadItem, FAQData, DownloadsData } from './types';
import faqData from '../../../content/faq.json';
import downloadsData from '../../../content/downloads.json';

export function loadFAQ(): FAQItem[] {
  const data = faqData as FAQData;
  return data.items || [];
}

export function loadDownloads(): DownloadItem[] {
  const data = downloadsData as DownloadsData;
  return data.items || [];
}
