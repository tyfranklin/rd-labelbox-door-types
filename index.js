import fs from 'fs';
import bar from '@gribnoysup/wunderbar';

const rawFile = fs.readFileSync('./export-2019-08-30T10_57_42.796Z.json');
const labels = JSON.parse(rawFile);
const doors = labels.reduce((acc, { Label }) => {
  if (typeof Label === 'object' && Label.Door) {
    acc = acc.concat(Label.Door);
  }

  return acc;
}, []);
const dataTemplate = [
  { value: 0, label: 'single' },
  { value: 0, label: 'double' },
  { value: 0, label: 'automatic' },
  { value: 0, label: 'revolving' },
  { value: 0, label: 'unknown' }
];
const data = doors.reduce((acc, { type }) => {
  const entry =
    acc.find(({ label }) => label === type) ||
    acc.find(({ label }) => label === 'unknown');

  entry.value += 1;

  return acc;
}, dataTemplate);
const { chart, legend, scale } = bar(data, {
  min: 0,
  length: 42
});

console.info(scale);
console.info(chart);
console.info();
console.info(legend);
