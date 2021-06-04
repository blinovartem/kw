//Code by Artem Blinov - blinow99@yandex.com

// When the popup HTML has loaded
window.addEventListener('DOMContentLoaded', function() {
    var btnGetKeyWord = document.getElementById('btnGetKeyWord');
    var lblFeedback = document.getElementById('lblFeedback');
    var txtResult = document.getElementById('txtResult');
    var btnCopy = document.getElementById('btnCopy');

    // Get Keyword
    btnGetKeyWord.onclick = function () {
        browser.tabs.query({currentWindow: true, active: true}); {
            browser.tabs.sendMessage(tab.id, { method: "getTag" }, function (response) {
                if (response == undefined || response.method !== "getTag" || response.data == '') {
                    lblFeedback.innerText = browser.i18n.getMessage("alertGetkey");
                    lblFeedback.className = "alert alert-danger";
                    return;
                }

                txtResult.innerText = response.data;
                lblFeedback.innerText = browser.i18n.getMessage("alertFound") + response.count + browser.i18n.getMessage("alertKeywords");
                lblFeedback.className = "alert alert-success";
            });
        };
    };
    // Function Copy
    btnCopy.onclick = function () {
        if (txtResult.innerText.indexOf('How to Use') !== -1) {
            lblFeedback.innerText = 'Active when keyword is detected.';
            lblFeedback.className = "alert alert-danger";
            return;
        }

        if (lblFeedback.innerText.indexOf('Copied') == -1 && lblFeedback.innerText.indexOf('Not found words.') === -1) {
            lblFeedback.innerText = lblFeedback.innerText + browser.i18n.getMessage("alertCopied");
            lblFeedback.className = "alert alert-success";
        }

        txtResult.select();
        document.execCommand('copy');
    };

});