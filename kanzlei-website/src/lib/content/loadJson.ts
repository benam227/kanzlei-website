import type { FAQItem, DownloadItem, FAQData, DownloadsData, FooterData } from './types';
import faqData from '../../../content/faq.json';
import downloadsData from '../../../content/downloads.json';
import footerData from '../../../content/footer.json';

export function loadFAQ(): FAQItem[] {
  const data = faqData as FAQData;
  return data.items || [];
}

export function loadDownloads(): DownloadItem[] {
  const data = downloadsData as DownloadsData;
  return data.items || [];
}

export function loadFooter(): FooterData {
  return footerData as FooterData;
}
