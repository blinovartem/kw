//Code by Artem Blinov - blinow99@yandex.com

chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        if (request.method == "getTag") {
            var tempTags = '';
            var x = document.getElementsByClassName("C_b_8978e" );
            var i;
            for (i = 0; i < x.length; i++) {
                tempTags = tempTags + x[i].innerHTML + ', ';
            }
            tempTags = tempTags.substring(0, tempTags.length - 2);

            sendResponse({ data: tempTags, count: x.length, method: "getTag" });
        }
        else if (request.method == "ExpandableKeywordsList") {

            var array = document.getElementsByClassName("relatedKeywords");
            for (var i = 0; i < array.length; i++) {
                array[i].style.height = "450px";
            }


            if (array.length > 0)
                sendResponse({ length: array.length, method: "ExpandableKeywordsList" });

            sendResponse({  });
        }
    }
);