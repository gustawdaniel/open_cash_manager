export const dateToDisplayString = (date) => new Intl.DateTimeFormat(
  'pl-PL',
  {year: 'numeric', month: '2-digit', day: '2-digit'}
).format(new Date(date)).split( '.' ).reverse( ).join( '-' );

export const dateToInputString = (date) => dateToDisplayString(date) + 'T00:00:00.000Z';