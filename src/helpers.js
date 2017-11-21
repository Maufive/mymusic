export function formatDate(unix) {
  const timestamp = unix;
  // Months array
  const months_arr = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
  ];
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = months_arr[date.getMonth()];
  const day = date.getDate();
  const convdataTime = month + ' ' + day + ' ' + year;
  return convdataTime;
}

export const key = '3bd2bb523f1e2d97d92147aa51b6a9fb';

export const randomColors = () => {
  const colorArr = [];
  const dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    const singleColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    colorArr.push(singleColor);
  };
  for (var i = 0; i < 50; i++) {
    dynamicColors();
  }
  return colorArr;
};

export const Colors = [
  '#fe001a',
  '#ff6347',
  '#BDDE5C',
  '#eee8aa',
  '#afeeee',
  '#d87093',
  '#98fb98',
  '#663399',
  '#4169e1',
  '#da70d6',
  '#f08080',
  '#63D471',
  '#68B0AB',
];
