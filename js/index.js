/* var url ="http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?"
 */




// var url = "http://quotes.stormconsultancy.co.uk/random.json?callback=?";
//var url = "http://quotes.stormconsultancy.co.uk/random.json?";
 var ponteapi = "";
var  apiAutor= "";
var conteudo = ponteapi;




$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    //options.url = "http://cors.corsproxy.io/url=" + options.url;
  }
});

// $.get(
//     'http://quotes.stormconsultancy.co.uk/random.json',
//     function (response) {
//         console.log("> ", response);
//         $("#viewer").html(response);
// });

var url = "http://quotes.stormconsultancy.co.uk/random.json?";




var pegaCitacoes = function( ) {

  $.get(url, function(data) {
    //console.log(data);

    var twUrl = 'https://twitter.com/intent/tweet?text=' + data.quote + ' -' + data.author + '@EluanDias';

    $(".load").hide();
    $("blockquote").show();

   //$(".citacao-texto").html(data.quote);

    ponteapi = data.quote;
    apiAutor=data.author;
    tradutor(ponteapi);
    maquina(ponteapi);


    $(".twitter-share-button").attr("href", twUrl);

    if (data.quoteAuthor !== '') {

    $('.autor').html(data.author);
    } else {

      $('.autor').html('Desconhecido');
    }


  });

};


$(document).ready(function() {

  $(".load").show();
  $("blockquote").hide();
  pegaCitacoes();

});






var tradutor = function() {

  var targetLang = $(".lang-select").val();
  var sourceText = ponteapi;
   var sourceAutor= apiAutor;

  var url2 = "http://api.grimmstudios.biz/translate/" + targetLang + "/" + encodeURI(sourceText);

  $.getJSON(url2, function(data) {

    //alert(data[0].Translated);
    var setTranslate = function( valor , call){
      setTimeout(call,valor) };
    setTranslate (1400,()=>{
                    $(".txtTraduzido").html("<spam>"+data[0].Translated+"</spam>");
    $(".autorApi").html(sourceAutor);


  });



  });

};







// ################### efeito maquina de escrever##############

//





var texto = "";
var count = 0;
var maxspeed = 50;


  var maquina =  function( ponteapi) {

     texto = ponteapi;


   // alert(sourceText);
   // alert(texto);
    digitar();

  }



  function digitar() {
    //console.log("ok", count);

    if(count < texto.length){
    setTimeout(digitar, maxspeed);
  $('.citacao-texto').html('<spam>'+texto.substring(0 , count)+'</spam');
        //console.log(texto.substring(0 , count))

    count++;
      console.log(count);
      $("#numChars").html(count);

      if ((count > 70 ) && (count < 140)){
        $("#numChars").css("color","blue");
        $("#btTw").css("color","blue");
      }
      else if((count > 140)){
               $("#numChars").css("color","red");
        $("#btTw").css("color","red");

              }

    }



  }


$("#btnCitacao").click(function() {
  $(".load").show();
  $("blockquote").hide();
   count = 0;
 pegaCitacoes();
tradutor(ponteapi);
    maquina(ponteapi);

   $('html, body').animate({
      scrollTop: 10
    }, 800);


});
