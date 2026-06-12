const fs = require('node:fs');
const path = './public/types/index.d.ts';

fs.appendFile(path, '\nexport {};', function (err) {
  if (err) {
    console.error('Failed to append export statement:', err);
  } else {
    console.log('Successfully appended export statement to index.d.ts');
  }
});
