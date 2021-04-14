const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
const info = document.querySelector(".info");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  // recognition.lang = "en-US";

  searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
  searchFormInput.style.paddingRight = "50px";

  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    if(micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    }
    else {
      recognition.stop();
    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    if(transcript.toLowerCase().trim()==="detener") {
      recognition.stop();
    }
    else if(transcript.toLowerCase().trim()==="ayuda del sitio") {
      window.open("instrucciones.html","width=1000,height=500,scrollbars=YES")
    }
    else if(!searchFormInput.value) {
      searchFormInput.value = transcript;
    }
    else if(transcript.toLowerCase().trim()==="salir del sitio") { 
      var res=confirm("Si desea salir da clic en aceptar");
      if (res==true) {
         window.close();}}
    else {
     if(transcript.toLowerCase().trim()==="localiza") {
       searchForm.submit();
     }
      else if(transcript.toLowerCase().trim()==="borrar") {
        searchFormInput.value = "";
      }
        else if(transcript.toLowerCase().trim()==="sandía") {
          // 1.- GOOGLE
          searchForm.setAttribute('action', 'https://www.google.com/search?q=');
          const query1 = document.getElementById("q");
          query1.id="q";
          query1.setAttribute("name","q");
          searchForm.submit();
          // 2.- YAHOO
          searchForm.setAttribute('action', 'https://espanol.search.yahoo.com/search?p=');
          query1.id="p";
          query1.setAttribute("name","p");
          searchForm.submit();
          // 3.- YOUTUBE
          searchForm.setAttribute('action', 'https://www.youtube.com/results?search_query=');
          query1.id="q";
          query1.setAttribute("name","q");
          searchForm.submit();
          // 4.- BING
          searchForm.setAttribute('action', 'https://www.bing.com/search?q=');
          query1.id="q";
          query1.setAttribute("name","q");
          searchForm.submit();
          // 5.- ASK
          searchForm.setAttribute('action','https://www.ask.com/web?o=0&l=dir&qo=homepageSearchBox&q=');
          query1.id="q";
          query1.setAttribute("name","q");
          searchForm.submit();}
    else {
      searchFormInput.value = transcript;
    }}}

info.textContent = 'Voice Commands: "detener", "ayuda del sitio", "salir del sitio", "localiza", "borrar","sandia"';}
else {
  console.log("Your Browser does not support speech Recognition");
  info.textContent = "Your Browser does not support Speech Recognition";
}