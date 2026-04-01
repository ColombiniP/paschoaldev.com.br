#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path('.').resolve()
HTML_EXTS = {'.html', '.htm'}

removed_script_patterns = [
    re.compile(r'<script[^>]+src=["\'][^"\']*wp-includes/js/jquery/jquery(?:\.min)?\.js[^"\']*["\'][^>]*>\s*</script>', re.I),
    re.compile(r'<script[^>]+src=["\'][^"\']*wp-includes/js/jquery/jquery-migrate(?:\.min)?\.js[^"\']*["\'][^>]*>\s*</script>', re.I),
    re.compile(r'<script[^>]+src=["\'][^"\']*wp-includes/js/wp-emoji-release(?:\.min)?\.js[^"\']*["\'][^>]*>\s*</script>', re.I),
    re.compile(r'<script[^>]+src=["\'][^"\']*wp-content/boost-cache/static/[^"\']+\.js[^"\']*["\'][^>]*>\s*</script>', re.I),
]

removed_link_patterns = [
    re.compile(r'<link[^>]+href=["\'][^"\']*wp-content/boost-cache/static/[^"\']+\.css[^"\']*["\'][^>]*>', re.I),
]

picture_pattern = re.compile(r'<picture\b[^>]*>.*?</picture>', re.I | re.S)
source_webp_pattern = re.compile(r'<source\b[^>]+srcset=["\'][^"\']*wp-content/webp-express/webp-images/[^"\']+["\'][^>]*>', re.I)
img_src_pattern = re.compile(r'<img\b[^>]*\bsrc=["\'][^"\']+["\'][^>]*>', re.I | re.S)

def normalize_img_tag(tag: str) -> str:
    tag = re.sub(r'\s+srcset=["\'][^"\']*["\']', '', tag, flags=re.I)
    tag = re.sub(r'\s+sizes=["\'][^"\']*["\']', '', tag, flags=re.I)
    return tag

def simplify_picture_blocks(text: str, stats: dict) -> str:
    def repl(match):
        block = match.group(0)
        if not source_webp_pattern.search(block):
            return block
        imgs = img_src_pattern.findall(block)
        if not imgs:
            return block
        stats['picture_simplified'] += 1
        return normalize_img_tag(imgs[-1])
    return picture_pattern.sub(repl, text)

def process_file(path: Path, stats: dict) -> bool:
    try:
        original = path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        original = path.read_text(encoding='latin-1')

    text = original

    for p in removed_script_patterns:
        text, n = p.subn('', text)
        stats['scripts_removed'] += n

    for p in removed_link_patterns:
        text, n = p.subn('', text)
        stats['links_removed'] += n

    text = simplify_picture_blocks(text, stats)
    text = re.sub(r'\n{3,}', '\n\n', text)

    if text != original:
        path.write_text(text, encoding='utf-8')
        return True
    return False

files_changed = []
stats = {'scripts_removed': 0, 'links_removed': 0, 'picture_simplified': 0}

for path in ROOT.rglob('*'):
    if not path.is_file():
        continue
    if path.suffix.lower() not in HTML_EXTS:
        continue
    if '.git' in path.parts:
        continue
    if process_file(path, stats):
        files_changed.append(str(path.relative_to(ROOT)))

report = []
report.append('Arquivos alterados:')
report.extend(files_changed if files_changed else ['(nenhum)'])
report.append('')
report.append(f"Scripts removidos: {stats['scripts_removed']}")
report.append(f"Links CSS boost removidos: {stats['links_removed']}")
report.append(f"Blocos <picture> simplificados: {stats['picture_simplified']}")

Path('cleanup-report.txt').write_text('\n'.join(report), encoding='utf-8')
print('\n'.join(report))