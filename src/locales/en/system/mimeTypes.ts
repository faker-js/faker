import { SystemDefinitions } from '../../..';

export default {
  'application/epub+zip': {
    compressible: false,
    extensions: ['epub'],
  },
  'application/gzip': {
    compressible: false,
    extensions: ['gz'],
  },
  'application/java-archive': {
    compressible: false,
    extensions: ['jar', 'war', 'ear'],
  },
  'application/json': {
    charset: 'UTF-8',
    compressible: true,
    extensions: ['json', 'map'],
  },
  'application/ld+json': {
    compressible: true,
    extensions: ['jsonld'],
  },
  'application/msword': {
    compressible: false,
    extensions: ['doc', 'dot'],
  },
  'application/octet-stream': {
    compressible: false,
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
    compressible: false,
    extensions: ['ogx'],
  },
  'application/pdf': {
    compressible: false,
    extensions: ['pdf'],
  },
  'application/rtf': {
    compressible: true,
    extensions: ['rtf'],
  },
  'application/vnd.amazon.ebook': {
    extensions: ['azw'],
  },
  'application/vnd.apple.installer+xml': {
    compressible: true,
    extensions: ['mpkg'],
  },
  'application/vnd.mozilla.xul+xml': {
    compressible: true,
    extensions: ['xul'],
  },
  'application/vnd.ms-excel': {
    compressible: false,
    extensions: ['xls', 'xlm', 'xla', 'xlc', 'xlt', 'xlw'],
  },
  'application/vnd.ms-fontobject': {
    compressible: true,
    extensions: ['eot'],
  },
  'application/vnd.ms-powerpoint': {
    compressible: false,
    extensions: ['ppt', 'pps', 'pot'],
  },
  'application/vnd.oasis.opendocument.presentation': {
    compressible: false,
    extensions: ['odp'],
  },
  'application/vnd.oasis.opendocument.spreadsheet': {
    compressible: false,
    extensions: ['ods'],
  },
  'application/vnd.oasis.opendocument.text': {
    compressible: false,
    extensions: ['odt'],
  },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    compressible: false,
    extensions: ['pptx'],
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    compressible: false,
    extensions: ['xlsx'],
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    compressible: false,
    extensions: ['docx'],
  },
  'application/vnd.rar': {
    extensions: ['rar'],
  },
  'application/vnd.visio': {
    extensions: ['vsd', 'vst', 'vss', 'vsw'],
  },
  'application/x-7z-compressed': {
    compressible: false,
    extensions: ['7z'],
  },
  'application/x-abiword': {
    extensions: ['abw'],
  },
  'application/x-bzip': {
    compressible: false,
    extensions: ['bz'],
  },
  'application/x-bzip2': {
    compressible: false,
    extensions: ['bz2', 'boz'],
  },
  'application/x-csh': {
    extensions: ['csh'],
  },
  'application/x-freearc': {
    extensions: ['arc'],
  },
  'application/x-httpd-php': {
    compressible: true,
    extensions: ['php'],
  },
  'application/x-sh': {
    compressible: true,
    extensions: ['sh'],
  },
  'application/x-tar': {
    compressible: true,
    extensions: ['tar'],
  },
  'application/xhtml+xml': {
    compressible: true,
    extensions: ['xhtml', 'xht'],
  },
  'application/xml': {
    compressible: true,
    extensions: ['xml', 'xsl', 'xsd', 'rng'],
  },
  'application/zip': {
    compressible: false,
    extensions: ['zip'],
  },
  'audio/3gpp': {
    compressible: false,
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
    compressible: false,
    extensions: ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
  },
  'audio/ogg': {
    compressible: false,
    extensions: ['oga', 'ogg', 'spx', 'opus'],
  },
  'audio/opus': {
    extensions: ['opus'],
  },
  'audio/wav': {
    compressible: false,
    extensions: ['wav'],
  },
  'audio/webm': {
    compressible: false,
    extensions: ['weba'],
  },
  'font/otf': {
    compressible: true,
    extensions: ['otf'],
  },
  'font/ttf': {
    compressible: true,
    extensions: ['ttf'],
  },
  'font/woff': {
    extensions: ['woff'],
  },
  'font/woff2': {
    extensions: ['woff2'],
  },
  'image/avif': {
    compressible: false,
    extensions: ['avif'],
  },
  'image/bmp': {
    compressible: true,
    extensions: ['bmp'],
  },
  'image/gif': {
    compressible: false,
    extensions: ['gif'],
  },
  'image/jpeg': {
    compressible: false,
    extensions: ['jpeg', 'jpg', 'jpe'],
  },
  'image/png': {
    compressible: false,
    extensions: ['png'],
  },
  'image/svg+xml': {
    compressible: true,
    extensions: ['svg', 'svgz'],
  },
  'image/tiff': {
    compressible: false,
    extensions: ['tif', 'tiff'],
  },
  'image/vnd.microsoft.icon': {
    compressible: true,
    extensions: ['ico'],
  },
  'image/webp': {
    extensions: ['webp'],
  },
  'text/calendar': {
    extensions: ['ics', 'ifb'],
  },
  'text/css': {
    charset: 'UTF-8',
    compressible: true,
    extensions: ['css'],
  },
  'text/csv': {
    compressible: true,
    extensions: ['csv'],
  },
  'text/html': {
    compressible: true,
    extensions: ['html', 'htm', 'shtml'],
  },
  'text/javascript': {
    compressible: true,
    extensions: ['js', 'mjs']
  },
  'text/plain': {
    compressible: true,
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
    compressible: false,
    extensions: ['mp4', 'mp4v', 'mpg4'],
  },
  'video/mpeg': {
    compressible: false,
    extensions: ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
  },
  'video/ogg': {
    compressible: false,
    extensions: ['ogv'],
  },
  'video/webm': {
    compressible: false,
    extensions: ['webm'],
  },
  'video/x-msvideo': {
    extensions: ['avi'],
  },
} satisfies SystemDefinitions['mimeTypes'];
