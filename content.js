chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        if (request.method == "getTag") {
            let keywords = '';
            let x = document.getElementsByClassName("oc_x_c" );
            let i;

            keywords = [keywords].map(k => k.innerText).map(a => `<a href="/search/${a}">${a}</a>` -'<br>');
            for (i = 0; i < x.length; i++) {
                keywords = x[i].innerText + ', '; 
            }
            
            sendResponse({ data: keywords, count: x.length, method: "getTag" });
        }

        else if (request.method == "KeywordsCarousel_root_div") {

            let array = document.getElementsByClassName("relatedKeywords");
            for (let i = 0; i < array.length; i++) {
                array[i].style.height = "450px";
            }


            if (array.length > 0)
                sendResponse({ length: array.length, method: "KeywordsCarousel_root_div" });

            sendResponse({  });
        }
    }
);