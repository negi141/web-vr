import {Generator} from './obj_generator.js';

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

const gen = new Generator(scene);

/** 現在のクイズのインデックス */
let quizIndex = 0;

// シーンのセット
const setScene = function() {
  gen.removeObject('msgBox');
  
  gen.removeObject('sky');
  gen.removeObject('question');
  gen.removeObject('sel' + 0);
  gen.removeObject('sel' + 1);
  gen.removeObject('sel' + 2);
  gen.removeObject('sel' + 3);
  
  let q = quiz[quizIndex];
  scene.appendChild(gen.sky(q.image));
  scene.appendChild(gen.question(q.question));
  selections(q.sel, q.answer);
}

// 正解メソッド
const wasCorrect = function (){
  scene.appendChild(gen.messageBox('Correct!', '#26b'));
  document.querySelector('a-scene').enterVR()
  quizIndex++;

  // 3秒後にシーンを変える
  setTimeout(setScene, 3000);
};
// 不正解メソッド
const wazIncorrect = function (index){
  scene.appendChild(gen.messageBox('Incorrect!', '#b62'));
  
  // 2秒後にメッセージは消す
  setTimeout(function(){gen.removeObject('msgBox');}, 2000);
};

// 選択肢
const selections = function(sels, answer) {
  for (var i = 0 ; i < sels.length ; i++){
    let new_sel = gen.sel(sels[i], i);

    new_sel.addEventListener('click', (answer == i) ? wasCorrect : wazIncorrect);

    scene.appendChild(new_sel);
  }
}

let startBoxElem = gen.startBox('Start');
scene.appendChild(startBoxElem);
startBoxElem.addEventListener('click', function(){
  gen.removeObject('startBox');
  setScene();
  document.querySelector('a-scene').enterVR()
});
