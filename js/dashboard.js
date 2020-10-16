if (window.localStorage.getItem('UserId') === null) {
    window.location.href = "index.html";
}

let user_id = localStorage.getItem('UserId');


// Fetching current Month and Year
var newDate = new Date();
var month = newDate.getMonth();
var year = newDate.getFullYear();



var current_month_key_list = [];


let ref = firebase.database().ref('/users/' + user_id + '/expenseTransDetails');
var keyList = [];

ref.on("value", function (snapshot) {

    let data = snapshot.val();
    
    let totalEarning = 0;
    let totalExpense = 0;
    let count = 0;

    let currentMonthCredit = 0;
    let currentMonthDebit = 0;

    for(let id in data){

        let splitYear = Number(data[id].date.split('-')[0]);
        let splitMonth = Number(data[id].date.split('-')[1]);


        if (data[id].type === "credit"){
            totalEarning += Number(data[id].amount);


        } else {
            totalExpense += Number(data[id].amount);
        }



        if(splitYear === window.year && splitMonth === (month + 1)){
            
            if (data[id].type === "credit"){
                currentMonthCredit += Number(data[id].amount);
    
    
            } else {
                currentMonthDebit += Number(data[id].amount);
            }
        }


        window.keyList.push(id);
        count++;
    }

    let totalSavings = totalEarning - totalExpense;

    document.querySelector("#totalEarning").textContent = totalEarning;
    document.querySelector("#totalExpense").textContent = totalExpense;
    document.querySelector("#totalSavings").textContent = totalSavings;

    document.querySelector("#totalTransactions").textContent = count;
    document.querySelector("#totalTransactionsHide").textContent = count;
    document.querySelector("#currentMonthCredit").textContent = currentMonthCredit;
    document.querySelector("#currentMonthDebit").textContent = currentMonthDebit;


})


// fetching last 10 transactions
ref.on("value", function (snapshot) {

    let data = snapshot.val();


    
    document.querySelector('#last10TransShow').innerHTML = ""
    let length = window.keyList.length;
    let show_number = length - 10;
    let counter = 1
    let ifCounter = 1

    let last10keys = []

    for(let j = length; j > show_number; j--) {
        last10keys.push(window.keyList[j - 1])
    }

    
    for(id in data){

        if (length > 10){

            if(last10keys.includes(id)){

                document.querySelector('#last10TransShow').innerHTML += 
                `<tr class="font-table-items">
                    <th scope="row">${ifCounter}</th>
                    <td>${data[id].name}</td>
                    <td>${data[id].category}</td>
                    <td>${data[id].amount}</td>
                    <td>${data[id].date}</td>
                    <td>${data[id].time}</td>
                    <td>${data[id].type}</td>
                </tr>`;
                ifCounter++;
            }

        } 
    
    if(length < 10){
        document.querySelector('#last10TransShow').innerHTML += 
            `<tr class="font-table-items">
                <th scope="row">${counter}</th>
                <td>${data[id].name}</td>
                <td>${data[id].category}</td>
                <td>${data[id].amount}</td>
                <td>${data[id].date}</td>
                <td>${data[id].time}</td>
                <td>${data[id].type}</td>
            </tr>`;
    }

    counter++;

}

})



// add expense on modal button click
document.querySelector("#addExpenseButtonFetch").addEventListener('click', function(){

    let expenseName = document.querySelector('#expenseName').value;
    let expenseCategory = document.querySelector('#expenseCategory').value;
    let expenseAmount = document.querySelector('#expenseAmount').value;
    let expenseDate = document.querySelector('#expenseDate').value;
    let expenseTime = document.querySelector('#expenseTime').value;
    let expenseType = document.querySelector('#expenseType').value;

    let addExpenseReturn = insertData(expenseName, expenseCategory, expenseAmount, expenseDate, expenseTime, expenseType);

    if(addExpenseReturn === 1){

        $('#exampleModal').modal('hide');


        document.querySelector('#alert').innerHTML = 
        `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Successfull!</strong> Your data is added successfully.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>`

        document.querySelector('#expenseName').value = "";
        document.querySelector('#expenseCategory').value = "";
        document.querySelector('#expenseAmount').value = "";
        document.querySelector('#expenseDate').value = "";
        document.querySelector('#expenseTime').value = "";
        document.querySelector('#expenseType').value = "";
    } else{

        document.querySelector('#addExpenseModalAlert').innerHTML = 
        `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Failed!</strong> Your data is not added. Please try again.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>`
    }

})

// add data on firebase function
function insertData(expenseName, expenseCategory, expenseAmount, expenseDate, expenseTime, expenseType) {

    firebase.database().ref('users/' + user_id + '/expenseTransDetails').push({
        name: expenseName,
        type: expenseType,
        amount: expenseAmount,
        date: expenseDate,
        time: expenseTime,
        category: expenseCategory
    }, function (error) {

        return 0;

    });

    return 1;
}


// fetch the file for update profile
var file = {};
function chooseFile(e){
    file = e.target.files[0];
    // console.log(file);
}

// update profile
document.querySelector('#edit_profile_submit').addEventListener('click', function(){

    // For update profile image
    let fileName = window.file.name;

    if (fileName !== undefined){

        // Create a root reference
        var storageRef = firebase.storage().ref();

        let getLastProfileImageName = localStorage.getItem('ProfileImageFileName');

        // Create a reference to the file to delete
        var desertRef = storageRef.child('images/' + getLastProfileImageName);

        // Delete the file
        let returnValue = desertRef.delete().then(function() {

            // File deleted successfully
            console.log("Delete successfull");
            
            return 1

        }).catch(function(error) {
        // Uh-oh, an error occurred!

            console.log("Failed. Was not deleted");
            return 0;
        });

        // Create a reference to 'images/' + User file name
        var imageNameRef = storageRef.child('images/' + fileName);


        // var file = ... // use the Blob or File API
        imageNameRef.put(window.file).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
            alert("Your profile is updated. If the new profile image was not seen then please refresh the page");

            firebase.database().ref("/users/" + user_id + "/profileInformation").update({
                profilePhotoName: fileName
            });
        });


        localStorage.setItem("ProfileImageFileName", fileName);

    }


    // For update the user name
    let userNameProfile = document.querySelector('#edit-name').value;

    if (userNameProfile !== ""){

        firebase.database().ref("/users/" + user_id + "/profileInformation").update({
            userName: userNameProfile
        });
        
        // alert("Your profile is updated. Please wait for a moment to change your profile completely");
        document.querySelector('#edit-name').value = ""; 
    }


    // For update the occupation
    let userOccupation = document.querySelector('#occupationOptions').value;

    if (userOccupation !== "") {

        firebase.database().ref("/users/" + user_id + "/profileInformation").update({
            Occupation: userOccupation
        });

        // alert("Your profile is updated. Please wait for a moment to change your profile completely or refresh the page.");
        document.querySelector('#occupationOptions').value = "";
    }


    // For update Date of Birth
    let dateOB = document.querySelector('#DOB').value;

    if (dateOB.length !== 0) {

        firebase.database().ref("/users/" + user_id + "/profileInformation").update({
            DateOFBirth: dateOB
        });

        // alert("Your profile is updated. Please wait for a moment to change your profile completely or refresh the page.");
        document.querySelector('#DOB').value = "";
    }


    // For update address
    let address = document.querySelector('#address').value;

    if (address.length !== 0){

        firebase.database().ref("/users/" + user_id + "/profileInformation").update({
            Address: address
        });

        // alert("Your profile is updated. Please wait for a moment to change your profile completely or refresh the page.");
        document.querySelector('#address').value = "";
    }
    
    $('#profileModal').modal('hide');
    // alert("Your profile is updated. Please wait for a moment to change your profile completely or refresh the page.");



})


// For displaying profile of user
let profileInformationRef = firebase.database().ref('/users/' + user_id + "/profileInformation");

profileInformationRef.on("value", function (snapshot) {
    let profileData = snapshot.val();

    
    let name = profileData.userName;
    let userOccupation = profileData.Occupation;
    let userDOB = profileData.DateOFBirth;
    let userAddress = profileData.Address;

    if (name !== undefined){
        document.querySelector('#user_name').textContent = name;
        document.querySelector('#edit-name').value = name;
        document.querySelector('#ResponsiveProfileName').textContent = name;
    }

    if (userOccupation !== undefined){
        document.querySelector('#Updatedoccupation').textContent = userOccupation;
        document.querySelector('#occupationOptions').value = userOccupation;
        document.querySelector('#ResponsiveProfileOccupation').textContent = userOccupation;
    }

    if (userDOB !== undefined){
        document.querySelector('#UpdatedDOB').textContent = userDOB;
        document.querySelector('#DOB').value = userDOB;
        document.querySelector('#ResponsiveProfileDOB').textContent = userDOB;
    }

    if(userAddress !== undefined) {
        document.querySelector('#UpdatedAddress').textContent = userAddress;
        document.querySelector('#address').value = userAddress;
        document.querySelector('#ResponsiveProfileAddress').textContent = userAddress;
    }


    let photoImageName = profileData.profilePhotoName;

    var storageRef = firebase.storage().ref();

    // Create a reference to the file for profile image
    var starsRef = storageRef.child('images/' + photoImageName);

    // Get the download URL of profile image
    starsRef.getDownloadURL().then(function(url) {

        document.querySelector('#user_image').setAttribute('src', url);
        document.querySelector('#nav_image').setAttribute('src', url);
        document.querySelector('#ResponsiveImage').setAttribute('src', url);

    }).catch(function(error) {

        // alert("Profile image loading failed. Please upload image");

        switch (error.code) {
            case 'storage/object-not-found':
            // File doesn't exist
            console.log("File doesn't exist");
            // alert("Profile image loading failed. Please upload image");
            break;

            case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log("User doesn't have permission to access the object");
            // alert("Profile image loading failed. Please upload image");
            break;

            case 'storage/canceled':
            // User canceled the upload
            console.log("User canceled the upload");
            // alert("Profile image loading failed. Please upload image");
            break;

            // ...

            case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            console.log("Unknown error occurred, inspect the server response");
            // alert("Profile image loading failed. Please upload image");
            break;
        }
    });
})




// logout code
document.querySelector('#logout').addEventListener('click', function () {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.localStorage.removeItem('UserId');
        window.localStorage.clear();
        window.location.href = "index.html";

    }).catch(function (error) {
        // An error happened.
        alert("Some error occurred");
    });

})



