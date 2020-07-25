
export class Generator {

  constructor(scene) {
    this.scene = scene;
  }

  removeObject(id) {
    let elem = document.getElementById(id);
    if (elem) this.scene.removeChild(elem);
  }

  /** 天球 */
  sky(imageSrc) {
    let elm = document.createElement('a-sky');
    elm.id = 'sky';
    elm.setAttribute('src', imageSrc);
    elm.setAttribute('rotation', '0 -130 0');
    return elm;
  }
    
  /** 問題文 */
  question(question) {
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
  sel(sel, index) {
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
  messageBox(messageText, color) {
    this.removeObject('msgBox');
    var elm = document.createElement('a-text');
    elm.id = 'msgBox';
    elm.setAttribute('value', messageText);
    elm.setAttribute('position', '0 -2.0  -3.5');

    elm.setAttribute('align', 'center');
    elm.setAttribute('color', color);
    elm.setAttribute('width', '8');
    elm.setAttribute('material', 'color: #fff');
    elm.setAttribute('geometry', 'primitive:plane; height: 0.7; width: 2;');
    return elm;
  }
  /** Startのテキスト */
  startBox(messageText) {
    this.removeObject('startBox');
    var elm = document.createElement('a-text');
    elm.id = 'startBox';
    elm.setAttribute('value', messageText);
    elm.setAttribute('position', '0 0.0  -3.5');

    elm.setAttribute('align', 'center');
    elm.setAttribute('color', "#00f");
    elm.setAttribute('width', '8');
    elm.setAttribute('material', 'color: #fff');
    elm.setAttribute('geometry', 'primitive:plane; height: 5; width: 5;');
    return elm;
  }
}