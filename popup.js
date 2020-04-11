
// When the popup HTML has loaded
window.addEventListener('DOMContentLoaded', function() {
    var btnGetKeyWord = document.getElementById('btnGetKeyWord');
    var lblFeedback = document.getElementById('lblFeedback');
    var txtResult = document.getElementById('txtResult');
    var btnCopy = document.getElementById('btnCopy');

    // Get Keyword
    btnGetKeyWord.onclick = function () {
        chrome.tabs.getSelected( function (tab) {
            chrome.tabs.sendRequest(tab.id, { method: "getTag" }, function (response) {
                if (response == undefined || response.method !== "getTag" || response.data == '') {
                    lblFeedback.innerText = chrome.i18n.getMessage("alertGetkey");
                    lblFeedback.className = "alert alert-danger";
                    return;
                }

                txtResult.innerText = response.data;
                lblFeedback.innerText = chrome.i18n.getMessage("alertFound") + response.count + chrome.i18n.getMessage("alertKeywords");
                lblFeedback.className = "alert alert-success";
            });
        });
    };
    // Function Copy
    btnCopy.onclick = function () {
        if (txtResult.innerText.indexOf('How to Use') !== -1) {
            lblFeedback.innerText = 'Active when keyword is detected.';
            lblFeedback.className = "alert alert-danger";
            return;
        }

        if (lblFeedback.innerText.indexOf('Copied') == -1 && lblFeedback.innerText.indexOf('Not found words.') === -1) {
            lblFeedback.innerText = lblFeedback.innerText + chrome.i18n.getMessage("alertCopied");
            lblFeedback.className = "alert alert-success";
        }

        txtResult.select();
        document.execCommand('copy');
    };

});