import type { SystemDefinitions } from '../../..';

export default {
  'application/epub+zip': {
    extensions: ['epub'],
  },
  'application/gzip': {
    extensions: ['gz'],
  },
  'application/java-archive': {
    extensions: ['jar', 'war', 'ear'],
  },
  'application/json': {
    extensions: ['json', 'map'],
  },
  'application/ld+json': {
    extensions: ['jsonld'],
  },
  'application/msword': {
    extensions: ['doc', 'dot'],
  },
  'application/octet-stream': {
    extensions: [
      'bin',
      'dms',
      'lrf',
      'mar',
      'so',
      'dist',
      'distz',
      'pkg',
      'bpk',
      'dump',
      'elc',
      'deploy',
      'exe',
      'dll',
      'deb',
      'dmg',
      'iso',
      'img',
      'msi',
      'msp',
      'msm',
      'buffer',
    ],
  },
  'application/ogg': {
    extensions: ['ogx'],
  },
  'application/pdf': {
    extensions: ['pdf'],
  },
  'application/rtf': {
    extensions: ['rtf'],
  },
  'application/vnd.amazon.ebook': {
    extensions: ['azw'],
  },
  'application/vnd.apple.installer+xml': {
    extensions: ['mpkg'],
  },
  'application/vnd.mozilla.xul+xml': {
    extensions: ['xul'],
  },
  'application/vnd.ms-excel': {
    extensions: ['xls', 'xlm', 'xla', 'xlc', 'xlt', 'xlw'],
  },
  'application/vnd.ms-fontobject': {
    extensions: ['eot'],
  },
  'application/vnd.ms-powerpoint': {
    extensions: ['ppt', 'pps', 'pot'],
  },
  'application/vnd.oasis.opendocument.presentation': {
    extensions: ['odp'],
  },
  'application/vnd.oasis.opendocument.spreadsheet': {
    extensions: ['ods'],
  },
  'application/vnd.oasis.opendocument.text': {
    extensions: ['odt'],
  },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    extensions: ['pptx'],
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    extensions: ['xlsx'],
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    extensions: ['docx'],
  },
  'application/vnd.rar': {
    extensions: ['rar'],
  },
  'application/vnd.visio': {
    extensions: ['vsd', 'vst', 'vss', 'vsw'],
  },
  'application/x-7z-compressed': {
    extensions: ['7z'],
  },
  'application/x-abiword': {
    extensions: ['abw'],
  },
  'application/x-bzip': {
    extensions: ['bz'],
  },
  'application/x-bzip2': {
    extensions: ['bz2', 'boz'],
  },
  'application/x-csh': {
    extensions: ['csh'],
  },
  'application/x-freearc': {
    extensions: ['arc'],
  },
  'application/x-httpd-php': {
    extensions: ['php'],
  },
  'application/x-sh': {
    extensions: ['sh'],
  },
  'application/x-tar': {
    extensions: ['tar'],
  },
  'application/xhtml+xml': {
    extensions: ['xhtml', 'xht'],
  },
  'application/xml': {
    extensions: ['xml', 'xsl', 'xsd', 'rng'],
  },
  'application/zip': {
    extensions: ['zip'],
  },
  'audio/3gpp': {
    extensions: ['3gpp'],
  },
  'audio/3gpp2': {
    extensions: ['3g2'],
  },
  'audio/aac': {
    extensions: ['aac'],
  },
  'audio/midi': {
    extensions: ['mid', 'midi', 'kar', 'rmi'],
  },
  'audio/mpeg': {
    extensions: ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
  },
  'audio/ogg': {
    extensions: ['oga', 'ogg', 'spx', 'opus'],
  },
  'audio/opus': {
    extensions: ['opus'],
  },
  'audio/wav': {
    extensions: ['wav'],
  },
  'audio/webm': {
    extensions: ['weba'],
  },
  'font/otf': {
    extensions: ['otf'],
  },
  'font/ttf': {
    extensions: ['ttf'],
  },
  'font/woff': {
    extensions: ['woff'],
  },
  'font/woff2': {
    extensions: ['woff2'],
  },
  'image/avif': {
    extensions: ['avif'],
  },
  'image/bmp': {
    extensions: ['bmp'],
  },
  'image/gif': {
    extensions: ['gif'],
  },
  'image/jpeg': {
    extensions: ['jpeg', 'jpg', 'jpe'],
  },
  'image/png': {
    extensions: ['png'],
  },
  'image/svg+xml': {
    extensions: ['svg', 'svgz'],
  },
  'image/tiff': {
    extensions: ['tif', 'tiff'],
  },
  'image/vnd.microsoft.icon': {
    extensions: ['ico'],
  },
  'image/webp': {
    extensions: ['webp'],
  },
  'text/calendar': {
    extensions: ['ics', 'ifb'],
  },
  'text/css': {
    extensions: ['css'],
  },
  'text/csv': {
    extensions: ['csv'],
  },
  'text/html': {
    extensions: ['html', 'htm', 'shtml'],
  },
  'text/javascript': {
    extensions: ['js', 'mjs'],
  },
  'text/plain': {
    extensions: ['txt', 'text', 'conf', 'def', 'list', 'log', 'in', 'ini'],
  },
  'video/3gpp': {
    extensions: ['3gp', '3gpp'],
  },
  'video/3gpp2': {
    extensions: ['3g2'],
  },
  'video/mp2t': {
    extensions: ['ts'],
  },
  'video/mp4': {
    extensions: ['mp4', 'mp4v', 'mpg4'],
  },
  'video/mpeg': {
    extensions: ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
  },
  'video/ogg': {
    extensions: ['ogv'],
  },
  'video/webm': {
    extensions: ['webm'],
  },
  'video/x-msvideo': {
    extensions: ['avi'],
  },
} satisfies SystemDefinitions['mimeTypes'];
