//数字からひらがなを取得する関数*************************************
//引数:ひらがなID
//戻り値:ひらがな
function getHiragana(suffix) {
  var hiragana;
  angular.forEach(arr, function(item, i){
        if(item.id==suffix){
           hiragana = item.hiragana;    
        }         
  });
  return hiragana;
};

//ひらがなから数字を取得する関数*************************************
//引数:ひらがな
//戻り値:ひらがなID
function get_Hiragana_id(suffix) {
  var id;
  angular.forEach(arr, function(item, i){
    if(item.hiragana==suffix){
      id = item.id;    
    }         
  });
  return id;
};

//ひらがなから説明を取得する関数*******************************
//引数:ひらがな
//戻り値:説明
function get_explain(suffix) {
  var explain;
  angular.forEach(arr, function(item, i){
    if(item.hiragana==suffix){
      explain = item.explain;    
    }         
  });
  return explain;
};