onFormSubmit(e) {
  //
}

function Test_1() {
  var a = getMatchStringsPct('Мама мыла раму', 'Мама мыла малину');

  var  b = 1;
}

function getMatchStringsPct(src, dst) {
  var src_buff = src.split(''),
      matches = '';

  for (var i = 0; i < dst.length; i++) {
    var char = dst[i];

    if (src_buff.indexOf(char) == 0) {
      src_buff.splice(0, 1);

      matches += char;
    }
  }

  return ((matches.length / src.length) * 100);
}