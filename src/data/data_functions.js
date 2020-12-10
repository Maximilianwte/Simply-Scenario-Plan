import $ from "jquery";

let logic_functions = {
    upload_request(in_file) {
        $.post("http://localhost:8888/.netlify/functions/send_upload",
            JSON.stringify(in_file),
            function (response) {
                return response;
            }
        );
    },
    set_authCookie(input = 7) {
        var d = new Date();
        d.setTime(d.getTime() + (input * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "auth=true" + ";" + expires + ";path=/";
        console.log("cookie set")
    },
    read_authCookie(cookie) {
        var name = cookie + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}

export default logic_functions