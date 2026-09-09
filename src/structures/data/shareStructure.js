/** Native sharing can fail even when present; copying remains a useful fallback. */
export async function shareStructure(data, browser = navigator) {
  if (browser.share) {
    try {
      await browser.share(data);
      return '';
    } catch (error) {
      if (error.name === 'AbortError') return '';
    }
  }
  try {
    await browser.clipboard.writeText(data.url);
    return 'Link copied.';
  } catch {
    return 'Could not copy the link. You can copy this page’s address instead.';
  }
}
