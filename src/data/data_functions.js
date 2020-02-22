var path = require("path");
import $ from "jquery";
//import Store from "../store";
import key_file from "./keys"
const firebase = require("firebase");
var firebaseConfig = key_file;
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

let logic_functions = {
    upload_request(in_file) {
        db.collection("requests").add({
                products: in_file.products,
                email: in_file.email,
                size: in_file.size,
                date: new Date().toLocaleString()
            })
            .then(function (docRef) {
                return 0;
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    },
    upload_requestx(in_file) {
        console.log("here")
        $.ajax({
            url: 'https://determined-meitner-4c20bf.netlify.com/.netlify/functions/send_upload',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(in_file),
            processData: false,
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( JSON.stringify( data ) );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
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