export default {
  'application/epub+zip': {
    source: 'iana',
    compressible: false,
    extensions: ['epub'],
  },
  'application/gzip': {
    source: 'iana',
    compressible: false,
    extensions: ['gz'],
  },
  'application/java-archive': {
    source: 'apache',
    compressible: false,
    extensions: ['jar', 'war', 'ear'],
  },
  'application/json': {
    source: 'iana',
    charset: 'UTF-8',
    compressible: true,
    extensions: ['json', 'map'],
  },
  'application/ld+json': {
    source: 'iana',
    compressible: true,
    extensions: ['jsonld'],
  },
  'application/msword': {
    source: 'iana',
    compressible: false,
    extensions: ['doc', 'dot'],
  },
  'application/octet-stream': {
    source: 'iana',
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
    source: 'iana',
    compressible: false,
    extensions: ['ogx'],
  },
  'application/pdf': {
    source: 'iana',
    compressible: false,
    extensions: ['pdf'],
  },
  'application/rtf': {
    source: 'iana',
    compressible: true,
    extensions: ['rtf'],
  },
  'application/vnd.amazon.ebook': {
    source: 'apache',
    extensions: ['azw'],
  },
  'application/vnd.apple.installer+xml': {
    source: 'iana',
    compressible: true,
    extensions: ['mpkg'],
  },
  'application/vnd.mozilla.xul+xml': {
    source: 'iana',
    compressible: true,
    extensions: ['xul'],
  },
  'application/vnd.ms-excel': {
    source: 'iana',
    compressible: false,
    extensions: ['xls', 'xlm', 'xla', 'xlc', 'xlt', 'xlw'],
  },
  'application/vnd.ms-fontobject': {
    source: 'iana',
    compressible: true,
    extensions: ['eot'],
  },
  'application/vnd.ms-powerpoint': {
    source: 'iana',
    compressible: false,
    extensions: ['ppt', 'pps', 'pot'],
  },
  'application/vnd.oasis.opendocument.presentation': {
    source: 'iana',
    compressible: false,
    extensions: ['odp'],
  },
  'application/vnd.oasis.opendocument.spreadsheet': {
    source: 'iana',
    compressible: false,
    extensions: ['ods'],
  },
  'application/vnd.oasis.opendocument.text': {
    source: 'iana',
    compressible: false,
    extensions: ['odt'],
  },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    source: 'iana',
    compressible: false,
    extensions: ['pptx'],
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    source: 'iana',
    compressible: false,
    extensions: ['xlsx'],
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    source: 'iana',
    compressible: false,
    extensions: ['docx'],
  },
  'application/vnd.rar': {
    source: 'iana',
    extensions: ['rar'],
  },
  'application/vnd.visio': {
    source: 'iana',
    extensions: ['vsd', 'vst', 'vss', 'vsw'],
  },
  'application/x-7z-compressed': {
    source: 'apache',
    compressible: false,
    extensions: ['7z'],
  },
  'application/x-abiword': {
    source: 'apache',
    extensions: ['abw'],
  },
  'application/x-bzip': {
    source: 'apache',
    compressible: false,
    extensions: ['bz'],
  },
  'application/x-bzip2': {
    source: 'apache',
    compressible: false,
    extensions: ['bz2', 'boz'],
  },
  'application/x-csh': {
    source: 'apache',
    extensions: ['csh'],
  },
  'application/x-freearc': {
    source: 'apache',
    extensions: ['arc'],
  },
  'application/x-httpd-php': {
    compressible: true,
    extensions: ['php'],
  },
  'application/x-sh': {
    source: 'apache',
    compressible: true,
    extensions: ['sh'],
  },
  'application/x-tar': {
    source: 'apache',
    compressible: true,
    extensions: ['tar'],
  },
  'application/xhtml+xml': {
    source: 'iana',
    compressible: true,
    extensions: ['xhtml', 'xht'],
  },
  'application/xml': {
    source: 'iana',
    compressible: true,
    extensions: ['xml', 'xsl', 'xsd', 'rng'],
  },
  'application/zip': {
    source: 'iana',
    compressible: false,
    extensions: ['zip'],
  },
  'audio/3gpp': {
    source: 'iana',
    compressible: false,
    extensions: ['3gpp'],
  },
  'audio/3gpp2': {
    source: 'iana',
  },
  'audio/aac': {
    source: 'iana',
  },
  'audio/midi': {
    source: 'apache',
    extensions: ['mid', 'midi', 'kar', 'rmi'],
  },
  'audio/mpeg': {
    source: 'iana',
    compressible: false,
    extensions: ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
  },
  'audio/ogg': {
    source: 'iana',
    compressible: false,
    extensions: ['oga', 'ogg', 'spx', 'opus'],
  },
  'audio/opus': {
    source: 'iana',
  },
  'audio/wav': {
    compressible: false,
    extensions: ['wav'],
  },
  'audio/webm': {
    source: 'apache',
    compressible: false,
    extensions: ['weba'],
  },
  'font/otf': {
    source: 'iana',
    compressible: true,
    extensions: ['otf'],
  },
  'font/ttf': {
    source: 'iana',
    compressible: true,
    extensions: ['ttf'],
  },
  'font/woff': {
    source: 'iana',
    extensions: ['woff'],
  },
  'font/woff2': {
    source: 'iana',
    extensions: ['woff2'],
  },
  'image/avif': {
    source: 'iana',
    compressible: false,
    extensions: ['avif'],
  },
  'image/bmp': {
    source: 'iana',
    compressible: true,
    extensions: ['bmp'],
  },
  'image/gif': {
    source: 'iana',
    compressible: false,
    extensions: ['gif'],
  },
  'image/jpeg': {
    source: 'iana',
    compressible: false,
    extensions: ['jpeg', 'jpg', 'jpe'],
  },
  'image/png': {
    source: 'iana',
    compressible: false,
    extensions: ['png'],
  },
  'image/svg+xml': {
    source: 'iana',
    compressible: true,
    extensions: ['svg', 'svgz'],
  },
  'image/tiff': {
    source: 'iana',
    compressible: false,
    extensions: ['tif', 'tiff'],
  },
  'image/vnd.microsoft.icon': {
    source: 'iana',
    compressible: true,
    extensions: ['ico'],
  },
  'image/webp': {
    source: 'apache',
    extensions: ['webp'],
  },
  'text/calendar': {
    source: 'iana',
    extensions: ['ics', 'ifb'],
  },
  'text/css': {
    source: 'iana',
    charset: 'UTF-8',
    compressible: true,
    extensions: ['css'],
  },
  'text/csv': {
    source: 'iana',
    compressible: true,
    extensions: ['csv'],
  },
  'text/html': {
    source: 'iana',
    compressible: true,
    extensions: ['html', 'htm', 'shtml'],
  },
  'text/javascript': {
    source: 'iana',
    compressible: true,
  },
  'text/plain': {
    source: 'iana',
    compressible: true,
    extensions: ['txt', 'text', 'conf', 'def', 'list', 'log', 'in', 'ini'],
  },
  'video/3gpp': {
    source: 'iana',
    extensions: ['3gp', '3gpp'],
  },
  'video/3gpp2': {
    source: 'iana',
    extensions: ['3g2'],
  },
  'video/mp2t': {
    source: 'iana',
    extensions: ['ts'],
  },
  'video/mp4': {
    source: 'iana',
    compressible: false,
    extensions: ['mp4', 'mp4v', 'mpg4'],
  },
  'video/mpeg': {
    source: 'iana',
    compressible: false,
    extensions: ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
  },
  'video/ogg': {
    source: 'iana',
    compressible: false,
    extensions: ['ogv'],
  },
  'video/webm': {
    source: 'apache',
    compressible: false,
    extensions: ['webm'],
  },
  'video/x-msvideo': {
    source: 'apache',
    extensions: ['avi'],
  },
};
