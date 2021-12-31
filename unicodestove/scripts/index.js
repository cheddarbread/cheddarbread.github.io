import anyAscii from "any-ascii";

function main() {
    const scheme = getCookie("colorScheme");
    const doc = document.querySelector("html");

    if (scheme === "dark") {
        doc.classList.add("dark");
    } else if (scheme === "light") {
        doc.classList.add("light");
    } else if (scheme === null) {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            doc.classList.add("dark");
        } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
            doc.classList.add("light");
        }
    }

    document.querySelector("textarea.unicode").addEventListener(
        "input",
        function () {
            // event handling code for sane browsers
            const toProcess = document.querySelector("textArea.unicode").value;
            const processed = anyAscii(toProcess);
            document.querySelector("textArea.ascii").value = processed;
        },
        false
    );

    document.querySelector(".colorChangeBtn").addEventListener(
        "click",
        function () {
            if (doc.classList.contains("dark")) {
                doc.classList.add("light");
                doc.classList.remove("dark");

                document.cookie = "colorScheme=light; expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/";
            } else {
                doc.classList.add("dark");
                doc.classList.remove("light");

                document.cookie = "colorScheme=dark; expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/";
            }
        },
        false
    );

    document.querySelector(".copyBtn").addEventListener(
        "click",
        function () {
            document.querySelector("textarea.ascii").focus();
            document.execCommand("selectall", null, false);
            document.execCommand("copy");
        },
        false
    );

    setTimeout(function () {
        doc.classList.remove("noAnimation");
    }, 300);
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

main();
