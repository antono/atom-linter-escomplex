'use babel';

const escomplex = require('escomplex');

const fnSpecToMessage = (fn, editor) => {
  if (fn.cyclomaticDensity < 10.0) {
    let line = (fn.line - 1);
    let text = `Cyclomatic Density is ${fn.cyclomaticDensity}`;
    let range = [[line,0], [line, 100]];
    let filePath = editor.getPath();

    return {
      type: (fn.cyclomaticDensity < 20.0 ? 'error' : 'warning' ),
      text,
      range,
      filePath
    };
  } else {
    return false;
  }
};

const lint = (editor) => {
  try {
    const result = escomplex.analyse(editor.getText(), {});

    // console.log(result);

    return result
      .functions
      .map(fn => fnSpecToMessage(fn, editor))
      .filter(x => x != false);
  } catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = {
  activate() {
    console.log('linter-escomplex activated');
  },
  deactivate() {
    console.log('linter-escomplex deactivated');
  },
  provideLinter() {
    return {
      name: 'escomplex',
      grammarScopes: ['source.js'],
      scope: 'file',
      lintOnFly: false,
      lint
    };
  }
}
