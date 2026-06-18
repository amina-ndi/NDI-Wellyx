import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const appRoot = path.resolve(__dirname, '..');

const routeMap = {
  'index.html': '/',
  'about.html': '/about',
  'services.html': '/services',
  'products.html': '/products',
  'portfolio.html': '/portfolio',
  'industries.html': '/industries',
  'contact.html': '/contact',
  'careers.html': '/careers',
  'blog.html': '/blog',
};

const pages = [
  { file: 'index.html', component: 'home' },
  { file: 'about.html', component: 'about' },
  { file: 'services.html', component: 'services' },
  { file: 'products.html', component: 'products' },
  { file: 'portfolio.html', component: 'portfolio' },
  { file: 'industries.html', component: 'industries' },
  { file: 'contact.html', component: 'contact' },
  { file: 'careers.html', component: 'careers' },
  { file: 'blog.html', component: 'blog' },
];

function extractBodyContent(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)/i);
  if (!bodyMatch) return html;
  let content = bodyMatch[1];
  content = content.replace(/<!-- Navigation -->[\s\S]*?<\/nav>\s*/i, '');
  content = content.replace(/<nav[\s\S]*?<\/nav>\s*/i, '');
  content = content.replace(/<footer class="footer"[\s\S]*?<\/footer>\s*/gi, '');
  content = content.replace(/<a href="https:\/\/wa\.me\/[^"]*" class="whatsapp-float"[\s\S]*?<\/a>\s*/gi, '');
  content = content.replace(/<script[\s\S]*?<\/script>\s*/gi, '');
  content = content.replace(/<\/body>[\s\S]*/i, '');
  return content.trim();
}

function convertLinks(html) {
  let result = html;

  result = result.replace(/href="([^"#]+)\.html#([^"]+)"/g, (_, page, fragment) => {
    const route = routeMap[`${page}.html`] || `/${page}`;
    return `routerLink="${route}" fragment="${fragment}"`;
  });

  result = result.replace(/href="([^"]+)\.html"/g, (_, page) => {
    if (page === 'index') return 'routerLink="/"';
    const route = routeMap[`${page}.html`] || `/${page}`;
    return `routerLink="${route}"`;
  });

  result = result.replace(/href="#([^"]+)"/g, 'routerLink="/" fragment="$1"');

  // Replace inline contact forms with component tag
  result = result.replace(
    /<form class="contact-form[\s\S]*?<\/form>/g,
    '<app-contact-form [subject]="contactSubject" [redirectHash]="contactHash"></app-contact-form>'
  );

  return result;
}

for (const { file, component } of pages) {
  const srcPath = path.join(root, file);
  const destPath = path.join(appRoot, 'src/app/pages', component, `${component}.component.html`);
  const html = fs.readFileSync(srcPath, 'utf8');
  let content = extractBodyContent(html);
  content = convertLinks(content);
  fs.writeFileSync(destPath, content, 'utf8');
  console.log(`Converted ${file} -> ${component}.component.html`);
}
