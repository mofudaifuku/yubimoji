var display_moji;
var arr;
var loginflg=0;
var syuwanko_comment = ['がんばれ！　　',
                        'いいかんじ！　',
                        'きみはすごい！',
                        '楽しんでる？　',
                        'おなかすいた…',
                        'カッパもいるよ',
                        'ねむいなぁ…　',
                        'やったー！！　',
                        'かんぺき！！　',
                        'きみは天才だ！',
                        '飛行機とんだ？',
                        'いい天気！　　',
                        'ゆびもじ覚えた！？',
                        'うれしいな！　',
                        '会いに来てくれてありがとう！',
                        'もふもふする？',
                        'レッスンモードで復習しよう',
                        'ネコは好き？　',
                        '暑いのはニガテ',
                        'お散歩いきたいな！',
                        'リンゴ食べたいな',
                        'グッジョブ！　',
                        'Hello world！',
                        'ハム子ダイエット中',
                        'ワンダフル！！',
                        '画面横向きもオススメ',
                        '使い方説明は、ぼくをタップ！',
                        'みんな大好き！'];

app = angular.module('myApp', ['onsen']);
ons.bootstrap(['myApp'])
//topページ****************************************************************
app.controller('topController', ['$scope', '$http', function($scope, $http){
  //ゲームモード画面表示ボタンイベント
  this.gamebtn = function(){
    myNavigator.resetToPage('game.html');
  };
  //レッスンモード画面表示ボタンイベント
  this.lessonbtn = function(){
    myNavigator.resetToPage('lesson.html');
  };

  //JSONファイル取得
  $http({
    method: 'get', 
    url: 'yubimoji_explain.json'
  }).then(function (response) {
    arr=response.data.record    
  },function (error){
    console.log(error, 'can not get data.');
  });
}]); 

//メニューバー*************************************************************
app.controller('AppController', function($scope) {
  //初期表示
  $scope.lesson_moji="あ";
  $scope.lesson_explain = "「a」のかたち";
  $scope.yubimoji = "images/yubimoji/yubimoji_00.png";
  display_moji=0;

  //メニュー選択時イベント
  this.load = function(hiragana_id) {
    lesson_html(hiragana_id);
    $scope.splitter.left.close();
  };
  //メニューボタンイベント
  this.toggle = function() {
    $scope.splitter.left.toggle();
  };
  //戻るボタンイベント
  this.back_page = function(){
    var back_int=0;
    if(display_moji==0){
      back_int=45;
    }else{
      back_int=display_moji-1; 
    }
          
    lesson_html(back_int);
  };     
  //進むボタンイベント      
  this.next_page = function(){
    var int=0;
    if(display_moji==45){
      int=0;
    }else{
      int=display_moji+1; 
    }    
    lesson_html(int);
  };
  //ゲームモード画面表示ボタンイベント
  this.gamebtn = function(){
    myNavigator.resetToPage('game.html');
  };

  //レッスンモード画面再描画メソッド
  //引数:ひらがなID
  function lesson_html(hiragana_id){
    var str = getHiragana(hiragana_id);
    $scope.lesson_moji=str
    display_moji=hiragana_id;
    var click_str = ( '00' + hiragana_id ).slice( -2 );
    $scope.yubimoji="images/yubimoji/yubimoji_"+click_str+".png";
    $scope.lesson_explain = get_explain(str);
    myNavigator.resetToPage('lesson.html');
  };
});

//ゲームモード*************************************************************
app.controller('gameController', function($scope) {
  //初期表示
  //表示-上段
  $scope.image_teacher = 'images/teacher.gif';
  $scope.image_blackboard = 'images/blackboard.png';
  moji = new set_moji();
  $scope.image_paper = 'images/yubimoji/yubimoji_' + moji.anser_str +'.png';
    $scope.image_airplain ='images/airplain_1.gif';
  
 //わんこ先生吹き出し(初回のセリフは固定)
 if(loginflg==0){
  $scope.comment = '使い方説明は、ぼくをタップ！';
  loginflg = 1;
 }else{
  $scope.comment = syuwanko_comment[Math.floor(Math.random() *28)];
  loginflg = 1; 
 }

   //しゅわんこ先生押下イベント
  this.howto_show = function(){
    howto_modal.show();
  };
  
  //使い方画面、閉じるボタンイベント
  this.howto_close = function(){
    howto_modal.hide();
  }  

  //表示-中段
  $scope.image1 = 'images/box.png';
  $scope.image2 = 'images/box.png';
  $scope.image3 = 'images/box.png';
  $scope.hiragana1 = moji.left_box;
  $scope.hiragana2 = moji.center_box;
  $scope.hiragana3 = moji.right_box;

  //BOX-左 押下イベント
  this.gameStart1 = function(){
    $scope.image1 = 'images/animal/'+ Math.floor(Math.random() *20) + '.gif';
    check(moji.left_box,$scope);
  };
  //BOX-中 押下イベント
  this.gameStart2 = function(){
    $scope.image2 = 'images/animal/'+ Math.floor(Math.random() *20) + '.gif';
    check(moji.center_box,$scope);
  };
  //BOX-中 押下イベント
  this.gameStart3 = function(){
    $scope.image3 = 'images/animal/'+ Math.floor(Math.random() *20) + '.gif';
    check(moji.right_box,$scope);
  };
  //閉じるボタンイベント
  this.btn_close = function(){
    miss_modal.hide();
  }
  //レッスンモード画面表示イベント
  this.lessonbtn = function(){
    myNavigator.resetToPage('lesson.html');
  };
});  

//答え確認メソッド**********************
//引数1：クリックした文字
//引数2:スコープ
function check(str,obj){
  click_int =  get_Hiragana_id(str);
  //正解
  if(moji.anser_str==click_int){
    obj.image_airplain ='images/airplain.png';
    corect_modal.show();
    setTimeout(function(){corect_modal.hide()},5000);
    setTimeout(function(){myNavigator.resetToPage('game.html')},5000);
  //不正解
  }else{
    miss_modal.show();
    obj.moji = str;
    var click_str = ( '00' + click_int ).slice( -2 );
    obj.yubimoji = "images/yubimoji/yubimoji_"+click_str+".png";
    obj.explain = get_explain(str);
    }
};

//表示文字取得メソッド*******************     
function set_moji(){
  var hakomozi_int=[];
  var int=0;
  var i=0;
  while (i<3){
    int = Math.floor(Math.random() *46);

      switch(i){
        case 0:
        case 1:
          if(hakomozi_int[i-1]==int)break;
        case 2:
          if(hakomozi_int[i-1]==int || hakomozi_int[i-2]==int)break;
          hakomozi_int[i]=int;
          i++;
      }
  }
  var anser =hakomozi_int[Math.floor( Math.random() * 3 )];
  this.anser_str = ( '00' + anser ).slice( -2 );
  this.left_box = getHiragana(hakomozi_int[0]);
  this.center_box = getHiragana(hakomozi_int[1]);
  this.right_box = getHiragana(hakomozi_int[2]);
};





