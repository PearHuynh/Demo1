// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, ref, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCmFDdAdkDgOxM0XEL5dkXpLph_R1uS-A",
    authDomain: "kc326-nhom3.firebaseapp.com",
    databaseURL: "https://kc326-nhom3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kc326-nhom3",
    storageBucket: "kc326-nhom3.appspot.com",
    messagingSenderId: "201228688501",
    appId: "1:201228688501:web:be2f3e102676486db0ac3c",
    measurementId: "G-EV8F0VE6FK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();

//--------------------------------------------------------------------------------

var people_id = document.getElementById("people_id");
var find_people_id = document.getElementById("find_people_id");
var people_name = document.getElementById("people_name");
var people_age = document.getElementById("people_age");

var txt_name = document.getElementById("txt_name");
var txt_age = document.getElementById("txt_age");

var btn_read_people = document.getElementById("btn_read_people");
var btn_insert_people = document.getElementById("btn_insert_people");
var btn_update_people = document.getElementById("btn_update_people");
var btn_remove_people = document.getElementById("btn_remove_people");

btn_read_people.addEventListener('click', fn_read_people);
btn_insert_people.addEventListener('click', fn_insert_people);
btn_update_people.addEventListener('click', fn_update_people);
btn_remove_people.addEventListener('click', fn_remove_people);

//----------------------------------------------------------------------------------

var txt_value = document.getElementById("txt_value");

var system_id = document.getElementById("system_id");
var system_value = document.getElementById("system_value");
var system_read_id = document.getElementById("system_read_id");

var btn_read_system = document.querySelector("#btn_read_system");
var btn_read_all_system = document.querySelector("#btn_read_all_system");
var btn_insert_system = document.getElementById("btn_insert_system");
var btn_update_system = document.getElementById("btn_update_system");
var btn_remove_system = document.getElementById("btn_remove_system");

btn_read_system.addEventListener('click', read_value);
btn_read_all_system.addEventListener('click', read_all_value);
btn_insert_system.addEventListener('click', fn_insert_system);
btn_update_system.addEventListener('click', fn_update_system);
btn_remove_system.addEventListener('click', fn_remove_system);

//---------------------------------------------------------------------------------------

function fn_read_people() {
    if (people_id.value != null && find_people_id.value != "") {
        get(child(ref(db), "People/" + find_people_id.value))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    txt_name.innerHTML = "Name: " + snapshot.val().Name;
                    txt_age.innerHTML = "Age: " + snapshot.val().Age;
                } else {
                    alert("Không có ID vừa tìm.");
                }
            })
            .catch((error) => {
                alert(error)
            })
    } else {
        alert("Vui long nhap ID");
    }
}

function fn_insert_people() {
    if (people_id.value != null && people_id.value != "") {
        get(child(ref(db), "People/" + people_id.value))
            .then((snapshot) => {
                if (!(snapshot.exists())) {
                    alert("ID chưa được sử dụng tiến hành tạo dữ liệu.");

                    set(ref(db, "People/" + people_id.value), {
                        ID: people_id.value,
                        Name: people_name.value,
                        Age: people_age.value,
                    })
                        .then(() => {
                            alert("Xác nhận đã tạo dữ liệu người dùng với ID " + people_id.value + ".")
                        })
                        .catch((error) => {
                            alert(error)
                        })

                } else {
                    alert("ID đã được sử dụng.");
                }
            })
            .catch((error) => {
                alert(error)
            })
    } else {
        alert("Vui lòng nhập ID.");
    }
}

function fn_update_people() {
    if (people_id.value != null && people_id.value != "") {
        get(child(ref(db), "People/" + people_id.value))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    alert("ID hợp lệ tiến hành cập nhật.");

                    update(ref(db, "People/" + people_id.value), {
                        Name: people_name.value,
                        Age: people_age.value
                    })
                        .then(() => {
                            alert("Dữ liệu với ID " + people_id.value + " đã được cập nhật.")
                        })
                        .catch((error) => {
                            alert(error)
                        })

                } else {
                    alert("ID chưa được sử dụng.");
                }
            })
    } else {
        alert("Vui lòng nhập ID.")
    }
}

function fn_remove_people() {
    if (people_id.value != null && people_id.value != "") {
        get(child(ref(db), "People/" + people_id.value))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    alert("ID hợp lệ tiến hành xóa dữ liệu với ID " + people_id.value + ".");

                    remove(ref(db, "People/" + people_id.value))
                        .then(() => {
                            alert("Đã xóa thành công.")
                        })
                        .catch((error) => {
                            alert(error)
                        })

                } else {
                    alert("ID chưa được sử dụng.");
                }
            })
            .catch((error) => {
                alert(error)
            })
    } else {
        alert("Vui lòng nhập ID.")
    }
}

//--------------------------------------------------------------------------

function read_value() {
    if (system_read_id.value != null && system_read_id.value != "") {
        get(child(ref(db), "number/" + system_read_id.value))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    txt_value.innerHTML = "value: " + snapshot.val().value;
                } else {
                    alert("Không có ID vừa tìm.");
                }
            })
            .catch((error) => {
                alert(error)
            })
    } else {
        alert("Vui lòng nhập ID.");
    }
}

function read_all_value() {//Được gọi khi nhấn read all value
    for (var idx = 1; idx <= 9; idx++) {
        read_all(idx);
    }
}
function read_all(idx) {//Được gọi khi read all value
    get(child(ref(db), "number/" + "value" + idx))
        .then((snapshot) => {
            if (snapshot.exists()) {
                document.getElementById("value" + (idx)).innerHTML
                    = "value" + idx + ": " + snapshot.val().value;
            }
        })
        .catch((error) => {
            alert(error)
        })
}

function fn_insert_system() {
    if (system_id.value != null && system_id.value != "") {
        get(child(ref(db), "number/" + system_id.value))
            .then((snapshot) => {
                if (!(snapshot.exists())) {
                    alert("ID chưa được sử dụng tiến hành tạo dữ liệu.");

                    set(ref(db, "number/" + system_id.value), {
                        value: system_value.value
                    })
                        .then(() => {
                            alert("Xác nhận đã tạo dữ liệu hệ thốngthống ID " + system_id.value + ".")
                        })
                        .catch((error) => {
                            alert(error)
                        })

                } else {
                    alert("ID đã được sử dụng.");
                }
            })
            .catch((error) => {
                alert(error)
            })
    } else {
        alert("Vui lòng nhập ID.")
    }
}

function fn_update_system() {
    if (system_id.value != null && system_id.value != "") {
        get(child(ref(db), "number/" + system_id.value))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    alert("ID hợp lệ tiến hành cập nhật.");

                    update(ref(db, "number/" + system_id.value), {
                        value: system_value.value
                    })
                        .then(() => {
                            alert("Dữ liệu với ID " + system_id.value + " đã được cập nhật.")
                        })
                        .catch((error) => {
                            alert(error)
                        })

                } else {
                    alert("ID chưa được sử dụng.");
                }
            })
            .catch((error) => {
                alert(error)
            })
    } else {
        alert("Vui lòng nhập ID.");
    }
}

function fn_remove_system() {
    if (system_id.value != null && system_id.value != "") {
        get(child(ref(db), "number/" + system_id.value))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    alert("ID hợp lệ tiến hành xóa dữ liệu với ID " + system_id.value + ".");

                    remove(ref(db, "number/" + system_id.value))
                        .then(() => {
                            alert("Đã xóa thành công.")
                        })
                        .catch((error) => {
                            alert(error)
                        })

                } else {
                    alert("ID chưa được sử dụng.");
                }
            })
            .catch((error) => {
                alert(error)
            })
    } else {
        alert("Vui lòng nhập ID.")
    }
}

