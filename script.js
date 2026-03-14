// Brand data: replace `pdf` values with direct-download links for each PDF.
// Helpful conversions are in README.md (Google Drive, Dropbox).
const brands = [
  { name: 'Omega', pdf: 'REPLACE_WITH_DIRECT_LINK_FOR_OMEGA', logo: 'assets/logos/omega.png' },
  { name: 'Parker', pdf: 'https://drive.google.com/uc?export=download&id=1jhqB5WiQWmsa9yEcxPUQ_LLkr8TqDNLK', logo: 'assets/logos/parker.png' },
  { name: 'ITC', pdf: 'REPLACE_WITH_DIRECT_LINK_FOR_ITC', logo: 'assets/logos/itc.png' },
  { name: '3M', pdf: 'REPLACE_WITH_DIRECT_LINK_FOR_3M', logo: 'assets/logos/3m.png' },
  { name: 'Cross', pdf: 'https://drive.google.com/uc?export=download&id=1Mr5cyJILyd1Tr4BZMZdg6rwpkB-_oCGW', logo: 'assets/logos/cross.png' }
];

const grid = document.getElementById('brands');
const toast = document.getElementById('toast');

function showToast(text, timeout = 2200) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), timeout);
}

function normalizeUrl(url){
  if (!url) return url;
  // Only normalize Google Drive links. Expected output:
  // https://drive.google.com/uc?export=download&id=FILEID
  if (url.includes('drive.google.com')) {
    // Try patterns like: /file/d/FILEID/... or /d/FILEID
    const m = url.match(/(?:\/file\/d\/|\/d\/)([a-zA-Z0-9_-]+)/);
    if (m && m[1]) {
      return `https://drive.google.com/uc?export=download&id=${m[1]}`;
    }
    // Try id=FILEID in query string
    const m2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m2 && m2[1]) {
      return `https://drive.google.com/uc?export=download&id=${m2[1]}`;
    }
  }
  // Leave other URLs unchanged (we only support Google Drive normalization)
  return url;
}

function downloadCatalog(url, name){
  if (!url || url.includes('REPLACE_WITH_DIRECT_LINK')){
    showToast('Please replace the PDF link for ' + name + ' in script.js');
    return;
  }

  const finalUrl = normalizeUrl(url);
  // Create an anchor to force browser download where possible
  const a = document.createElement('a');
  a.href = finalUrl;
  a.setAttribute('download', `${name}-catalogue.pdf`);
  // Some browsers ignore the download attribute for cross-origin; opening in new tab as fallback
  document.body.appendChild(a);
  try {
    a.click();
    showToast('Download started for ' + name);
  } catch (err) {
    window.open(finalUrl, '_blank');
    showToast('Opened catalogue for ' + name + ' in a new tab');
  }
  a.remove();
}

function render(){
  grid.innerHTML = '';
  brands.forEach(b => {
    const card = document.createElement('div');
    card.className = 'brand-card';

    // Make the logo itself a button to download the PDF
    const logoBtn = document.createElement('button');
    logoBtn.className = 'brand-logo-button';
    logoBtn.setAttribute('aria-label', `Download ${b.name} catalogue`);
    logoBtn.addEventListener('click', () => downloadCatalog(b.pdf, b.name));

    if (b.logo) {
      const img = document.createElement('img');
      img.src = b.logo;
      img.alt = `${b.name} logo`;
      img.loading = 'lazy';
      img.width = 64;
      img.height = 64;
      logoBtn.appendChild(img);
    } else {
      logoBtn.textContent = b.name.slice(0,2).toUpperCase();
    }

    const name = document.createElement('div');
    name.className = 'brand-name';
    name.textContent = b.name;

    card.appendChild(logoBtn);
    card.appendChild(name);
    grid.appendChild(card);
  });
}

render();
