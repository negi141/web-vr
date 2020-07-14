/** シーン */
const scene = document.querySelector('a-scene');

/** クイズデータ */
const quiz = [
  {
    question: 'Where is here?',
    image: 'images/verona.jpg',
    sel: ['Milan', 'Florence', 'Rome', 'Venice'],
    answer: 2 //0,1,2,3
  },
  {
    question: 'Where are you(2)?',
    image: 'images/sakura.jpg',
    sel: ['aa', 'bb', 'cc'],
    answer: 1
  },
  {
    question: 'Where are you(3)?',
    image: 'images/sea.jpg',
    sel: ['1111', '22222'],
    answer: 1
  }
];

/** 現在のクイズのインデックス */
let quizIndex = 0;

const sky = function(imageSrc) {
  var elm = document.createElement('a-sky');
  elm.id = 'sky';
  elm.setAttribute('src', imageSrc);
  elm.setAttribute('rotation', '0 -130 0');
  return elm;
}

/** 問題文 */
const question = function(question) {
  var elm = document.createElement('a-text');console.log(question);
  elm.id = 'question';
  elm.setAttribute('value', question);
  elm.setAttribute('position', '0 2 -4');

  elm.setAttribute('align', 'center');
  elm.setAttribute('color', 'black');
  elm.setAttribute('width', '6');
  elm.setAttribute('material', 'color: #FFF');
  elm.setAttribute('geometry', 'primitive:plane; width: 10');
  return elm;
}

/** 選択肢 */
const sel = function(sel, index) {
  var elm = document.createElement('a-text');
  elm.id = 'sel' + index;
  elm.setAttribute('value', sel);
  var pos = 1 - index * 1;
  elm.setAttribute('position', '0 '+pos+' -4');

  elm.setAttribute('align', 'center');
  elm.setAttribute('color', 'black');
  elm.setAttribute('width', '6');
  elm.setAttribute('material', 'color: #acf');
  elm.setAttribute('geometry', 'primitive:plane; height: 0.7; width: 4; ');
  return elm;
}

/** 正解/不正解のテキスト */
const messageBox = function(messageText, color) {
  removeObject('msgBox');
  var elm = document.createElement('a-text');
  elm.id = 'msgBox';
  elm.setAttribute('value', messageText);
  elm.setAttribute('position', '0 1.5  -3.5');

  elm.setAttribute('align', 'center');
  elm.setAttribute('color', color);
  elm.setAttribute('width', '8');
  elm.setAttribute('material', 'color: #fff');
  elm.setAttribute('geometry', 'primitive:plane; height: 0.7; width: 2;');
  return elm;
}
// シーンのセット
const setScene = function(){

  removeObject('msgBox');
  removeObject('sky');
  removeObject('question');
  removeObject('sel' + 0);
  removeObject('sel' + 1);
  removeObject('sel' + 2);
  removeObject('sel' + 3);
  
  let q = quiz[quizIndex];
  scene.appendChild(sky(q.image));
  scene.appendChild(question(q.question));
  selections(q.sel, q.answer);
}

const removeObject = function(id){
  let elem = document.getElementById(id);
  if (elem) scene.removeChild(elem);
};

// 正解メソッド
const wasCorrect = function (){
  scene.appendChild(messageBox('Correct!', '#26b'));
  
  quizIndex++;

  // 3秒後にシーンを変える
  setTimeout(setScene, 3000);
};
// 不正解メソッド
const wazIncorrect = function (index){
  scene.appendChild(messageBox('Incorrect!', '#b62'));
};

// 選択肢
const selections = function(sels, answer) {
  for (var i = 0 ; i < sels.length ; i++){
    let new_sel = sel(sels[i], i);

    new_sel.addEventListener('click', (answer == i) ? wasCorrect : wazIncorrect);

    scene.appendChild(new_sel);
  }
}
setScene();