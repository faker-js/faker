// Sources: https://www.unicode.org/cldr/cldr-aux/charts/28/summary/es.html and https://www.wikilengua.org/index.php/Abreviaciones_en_fechas
export default {
  wide: [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ],
  abbr: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  // Property "abbr_context" is optional, if not set then "abbr" will be used instead
  // It is used to specify a word in context, which may differ from a stand-alone word
  abbr_context: ['dom.', 'lun.', 'mart.', 'miérc.', 'juev.', 'vier.', 'sáb.'],
};
