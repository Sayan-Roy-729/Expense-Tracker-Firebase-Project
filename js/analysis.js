if (window.localStorage.getItem('UserId') === null) {
    window.location.href = "index.html";
}

let user_id = localStorage.getItem('UserId');


// graph color list
var color_list = ['rgba( 232, 53, 88 , 0.5)', 'rgba(138, 10, 207 , 0.5)', 'rgba(115, 249, 35, 0.5)', 'rgba( 13, 129, 220, 0.5)', 'rgba( 125, 188, 238 , 0.5)', 'rgba( 191, 125, 238, 0.5)', 'rgba( 221, 92, 205 , 0.5)', 'rgba( 221, 92, 144 , 0.5)', 'rgba( 220, 10, 96, 0.5)', 'rgba( 10, 42, 220 , 0.5)', 'rgba( 46, 185, 32 , 0.5)', 'rgba( 191, 218, 18, 0.5)', 'rgba( 11, 181, 0 , 0.5)', 'rgba( 243, 69, 8 , 0.5)', 'rgba( 196, 62, 15 , 0.5)', 'rgba( 15, 196, 166 , 0.5)', 'rgba( 74, 162, 148 , 0.5)', 'rgba( 135, 10, 175 , 0.5)', 'rgba( 187, 114, 211 , 0.5)', 'rgba( 231, 108, 175 , 0.5)', 'rgba( 99, 214, 66 , 0.5)', 'rgba( 22, 172, 185 , 0.5)', 'rgba( 79, 186, 106 , 0.5)', 'rgba( 235, 121, 31 , 0.5)', 'rgba( 165, 6, 204 , 0.5)', 'rgba( 135, 235, 101 , 0.5)', 'rgba( 214, 16, 55 , 0.5)']



var key;
var key_list = [];

// Fetching current Month and Year
var newDate = new Date();
var month = newDate.getMonth();
var year = newDate.getFullYear();
var currentMonthName = monthList(month)


// Fetching last Month and Year
let lastMonthNumber = month - 1;
let newDate1 = new Date(year, lastMonthNumber);
let lastMonth = newDate1.getMonth();
var lastYear = newDate1.getFullYear();
var lastMonthName = monthList(lastMonth);

// Fetching last last Month and Year
let lastLastMonthNumber = month - 2;
let newDate2 = new Date(year, lastLastMonthNumber);
let lastLastMonth = newDate2.getMonth();
var lastLastYear = newDate2.getFullYear();
var lastLastMonthName = monthList(lastLastMonth);


var Jan_June_KeyList = [];
var July_Decem_KeyList = [];
var currentMonthKeyList = [];
var lastMonthKeyList = [];
var lastLastMonthKeyList = [];







document.getElementsByClassName('year')[0].innerHTML = year;
document.getElementsByClassName('year')[1].innerHTML = year;


document.getElementsByClassName('Plot_year')[0].innerHTML = year;
document.getElementsByClassName('Plot_year')[1].innerHTML = year;


document.getElementsByClassName('Plot_Day_Bar_year')[0].innerHTML = year;
document.getElementsByClassName('Plot_Day_Bar_year')[1].innerHTML = year;

document.getElementsByClassName('Plot_Day_line_year')[0].innerHTML = year;
document.getElementsByClassName('Plot_Day_line_year')[1].innerHTML = year;



document.querySelector("#firstMonth").textContent = currentMonthName;
document.querySelector("#lastMonth").textContent = lastMonthName;
document.querySelector("#lastLastMonth").textContent = lastLastMonthName;

document.querySelector("#Plot_firstMonth").textContent = currentMonthName;
document.querySelector("#Plot_lastMonth").textContent = lastMonthName;
document.querySelector("#Plot_lastLastMonth").textContent = lastLastMonthName;


document.querySelector("#Plot_Day_Bar_firstMonth").textContent = currentMonthName;
document.querySelector("#Plot_Day_Bar_lastMonth").textContent = lastMonthName;
document.querySelector("#Plot_Day_Bar_lastLastMonth").textContent = lastLastMonthName;


document.querySelector("#Plot_Day_line_firstMonth").textContent = currentMonthName;
document.querySelector("#Plot_Day_line_lastMonth").textContent = lastMonthName;
document.querySelector("#Plot_Day_line_lastLastMonth").textContent = lastLastMonthName;


function monthList(month){

    let MonthName;

    if (month === 0){
        MonthName = "January"
    } else if (month === 1){
        MonthName = "February"
    } else if (month === 2){
        MonthName = "Match"
    } else if (month === 3){
        MonthName = "April"
    } else if (month === 4){
        MonthName = "May"
    } else if (month === 5){
        MonthName = "June"
    } else if (month === 6){
        MonthName = "July"
    } else if (month === 7){
        MonthName = "August"
    } else if (month === 8){
        MonthName = "September"
    } else if (month === 9){
        MonthName = "October"
    } else if (month === 10){
        MonthName = "November"
    } else{
        MonthName = "December"
    }

    return MonthName;

}



var caregory_list = [];
var categoryAmount_List = [];

let ref = firebase.database().ref('/users/' + user_id + '/expenseTransDetails');

ref.on("value", function (snapshot) {

    let data = snapshot.val();

    let debitDetailsCounter = 1;
    let creditDetailsCounter = 1;

    document.querySelector('#debitDetailsModal').innerHTML = "";
    document.querySelector('#creditDetailsModal').innerHTML = ""; 



    //More widges
    let current_month_total_trans_number = 1;
    let last_month_total_trans_number = 1;
    let last_last_month_total_trans_number = 1;
    let jan_june_month_total_trans_number = 1;
    let july_december_month_total_trans_number = 1;



    let current_month_total_credit_amount = 0;
    let last_month_total_credit_amount = 0;
    let last_last_month_total_credit_amount = 0;
    let jan_june_month_total_credit_amount = 0;
    let july_december_month_total_credit_amount = 0;


    let current_month_total_debit_amount = 0;
    let last_month_total_debit_amount = 0;
    let last_last_month_total_debit_amount = 0;
    let jan_june_month_total_debit_amount = 0;
    let july_december_month_total_debit_amount = 0;

    for(let id in data){

        if (data[id].type === "credit"){

            document.querySelector('#creditDetailsModal').innerHTML += 
            `<tr>
            <th scope="row">${creditDetailsCounter}</th>
            <td>${data[id].name}</td>
            <td>${data[id].category}</td>
            <td>${data[id].amount}</td>
            <td>${data[id].date}</td>
            <td>${data[id].time}</td>

        </tr>`;

        creditDetailsCounter ++;


        } else {

            document.querySelector('#debitDetailsModal').innerHTML += 
            `<tr>
            <th scope="row">${debitDetailsCounter}</th>
            <td>${data[id].name}</td>
            <td>${data[id].category}</td>
            <td>${data[id].amount}</td>
            <td>${data[id].date}</td>
            <td>${data[id].time}</td>

        </tr>`;

        debitDetailsCounter ++;
        }


        let splitYear = Number(data[id].date.split('-')[0]);
        let splitMonth = Number(data[id].date.split('-')[1]);


        // July - December 
        if (splitYear === window.year && splitMonth > 06){
            window.July_Decem_KeyList.push(id);

            july_december_month_total_trans_number++;

            if (data[id].type === "credit"){
                july_december_month_total_credit_amount += Number(data[id].amount);
            } else{
                july_december_month_total_debit_amount += Number(data[id].amount);
            }
        } 
        
        // January - June
        if(splitYear === window.year && splitMonth < 06){
            window.Jan_June_KeyList.push(id);

            jan_june_month_total_trans_number++;

            if (data[id].type === "credit"){
                jan_june_month_total_credit_amount += Number(data[id].amount);
            } else{
                jan_june_month_total_debit_amount += Number(data[id].amount);
            }
        }

        // Current Month
        if(splitYear === window.year && splitMonth === (month + 1)){
            window.currentMonthKeyList.push(id);

            current_month_total_trans_number++;

            if (data[id].type === "credit"){
                current_month_total_credit_amount += Number(data[id].amount);
            } else{
                current_month_total_debit_amount += Number(data[id].amount);
            }
        }

        // Last Month
        if(splitYear === window.lastYear && splitMonth === (lastMonth + 1)){
            window.lastMonthKeyList.push(id);

            last_month_total_trans_number++;

            if (data[id].type === "credit"){
                last_month_total_credit_amount += Number(data[id].amount);
            } else{
                last_month_total_debit_amount += Number(data[id].amount);
            }
        }

        // Last last Month
        if(splitYear === window.lastLastYear && splitMonth === (lastLastMonth + 1)){
            window.lastLastMonthKeyList.push(id);

            last_last_month_total_trans_number++;

            if (data[id].type === "credit"){
                last_last_month_total_credit_amount += Number(data[id].amount);
            } else{
                last_last_month_total_debit_amount += Number(data[id].amount);
            }
        }



        if (caregory_list.includes(data[id].category)){

            // console.log(data[id].category);
            let index = caregory_list.indexOf(data[id].category);
            categoryAmount_List[index] += Number(data[id].amount);
            // console.log(index);

        } else {
            caregory_list.push(data[id].category);
            categoryAmount_List.push(Number(data[id].amount));
        }


        window.key_list.push(id);


       }

        // Current month
        if (current_month_total_trans_number === 1){
            document.querySelector('#current_month_total_trans_number').textContent = 0;
        } else {
            document.querySelector('#current_month_total_trans_number').textContent = current_month_total_trans_number - 1;
        }

        document.querySelector('#current_month_total_credit_amount').textContent = current_month_total_credit_amount;
        document.querySelector('#current_month_total_debit_amount').textContent = current_month_total_debit_amount;
        document.querySelector('#current_month_total_saving_amount').textContent = current_month_total_credit_amount - current_month_total_debit_amount;


        // Last month
        if (last_month_total_trans_number === 1){
            document.querySelector('#last_month_total_trans_number').textContent = 0;
        } else {
            document.querySelector('#last_month_total_trans_number').textContent = last_month_total_trans_number - 1;
        }

        document.querySelector('#last_month_total_credit_amount').textContent = last_month_total_credit_amount;
        document.querySelector('#last_month_total_debit_amount').textContent = last_month_total_debit_amount;
        document.querySelector('#last_month_total_saving_amount').textContent = last_month_total_credit_amount - last_month_total_debit_amount;


        // Last last Month
        if (last_last_month_total_trans_number === 1){
            document.querySelector('#last_last_month_total_trans_number').textContent = 0;
        } else {
            document.querySelector('#last_last_month_total_trans_number').textContent = last_last_month_total_trans_number - 1;
        }

        document.querySelector('#last_last_month_total_credit_amount').textContent = last_last_month_total_credit_amount;
        document.querySelector('#last_last_month_total_debit_amount').textContent = last_last_month_total_debit_amount;
        document.querySelector('#last_last_month_total_saving_amount').textContent = last_last_month_total_credit_amount - last_last_month_total_debit_amount;


        // January - June
        if (jan_june_month_total_trans_number === 1){
            document.querySelector('#january_june_month_total_trans_number').textContent = 0;
        } else {
            document.querySelector('#january_june_month_total_trans_number').textContent = jan_june_month_total_trans_number - 1;
        }

        document.querySelector('#january_june_month_total_credit_amount').textContent = jan_june_month_total_credit_amount;
        document.querySelector('#january_june_month_total_debit_amount').textContent = jan_june_month_total_debit_amount;
        document.querySelector('#january_june_month_total_saving_amount').textContent = jan_june_month_total_credit_amount - jan_june_month_total_debit_amount;


        // July - December
        if (july_december_month_total_trans_number === 1){
            document.querySelector('#july_december_month_total_trans_number').textContent = 0;
        } else {
            document.querySelector('#july_december_month_total_trans_number').textContent = july_december_month_total_trans_number - 1;
        }

        document.querySelector('#july_december_month_total_credit_amount').textContent = july_december_month_total_credit_amount;
        document.querySelector('#july_december_month_total_debit_amount').textContent = july_december_month_total_debit_amount;
        document.querySelector('#july_december_month_total_saving_amount').textContent = july_december_month_total_credit_amount - july_december_month_total_debit_amount;


    let pieChart = document.querySelector('#CategoryPieChart_All').getContext('2d')

        let pieChart_graph = new Chart(pieChart, {
            type: 'pie',
            data: {
                labels: caregory_list,
                datasets: [{
                    label: 'Expense Summery',
                    data: categoryAmount_List,
                    backgroundColor: color_list
                }]
            },

            options: {
                title: {
                    display: true,
                    text: 'ALL TRANSACTIONS CATEGORY WISE PIE CHART'
                  }
            }
        })

})


//Current Month | Last Month | Last Last Month |January - June | July - December | All transactions details


ref.on("value", function (snapshot) {

    let data = snapshot.val();

    

    let mainCount = 1;
    let currentMonthCount = 1;
    let lastMonthCount = 1;
    let lastlastMonthCount = 1;
    let JanJunCount = 1;
    let julDecemCount = 1;
    let last10Count = 1;

    document.querySelector('#Jan_JuneTransactionShow').innerHTML = "";
    document.querySelector('#July_DecemTransactionShow').innerHTML = "";
    document.querySelector('#CurrentMonthTransactionShow').innerHTML = "";
    document.querySelector('#LastMonthTransactionShow').innerHTML = "";
    document.querySelector('#LastLastMonthTransactionShow').innerHTML = "";
    document.querySelector('#allTransactionShow').innerHTML = "";
    document.querySelector('#last10TransactionShow').innerHTML = "";


    //setup for last 10 Jan_JuneTransaction
    let length = window.key_list.length;
    let show_number = length - 10;
    let ifCounter = 1

    let last10keys = []



    // for wedges value
    let all_month_total_trans_number = 1;
    let last_10_trans_total_trans_number = 1;


    let all_month_total_credit_amount = 0;
    let last_10_trans_total_credit_amount = 0;



    let all_month_total_debit_amount = 0;
    let last_10_trans_total_debit_amount = 0;



    // Creating array for ploting grapgs--------->
    // For category graph
    let Jan_June_Category_List = [];
    let Jul_December_Category_List = [];
    let Current_Month_Category_List = [];
    let Last_Month_Category_List = [];
    let Last_Last_Month_Category_List = [];
    let Last_10_Trans_Category_List = [];

    let Jan_June_Amount_List = [];
    let Jul_December_Amount_List = [];
    let Current_Month_Amount_List = [];
    let Last_Month_Amount_List = [];
    let Last_Last_Month_Amount_List = [];
    let Last_10_Trans_Amount_List = [];


    // For day bar graph
    let current_Month_Day_Graph_Amount_List_Credit = [0, 0, 0, 0, 0, 0, 0];
    let last_Month_Day_Graph_Amount_List_Credit = [0, 0, 0, 0, 0, 0, 0];
    let last_last_Month_Day_Graph_Amount_List_Credit = [0, 0, 0, 0, 0, 0, 0];
    let jan_june_Month_Day_Graph_Amount_List_Credit = [0, 0, 0, 0, 0, 0, 0];
    let jul_December_Month_Day_Graph_Amount_List_Credit= [0, 0, 0, 0, 0, 0, 0];
    let last_10_trans_Day_Graph_Amount_List_Credit = [0, 0, 0, 0, 0, 0, 0];
    let all_trans_Day_Graph_Amount_List_Credit = [0, 0, 0, 0, 0, 0, 0];

    let current_Month_Day_Graph_Amount_List_Debit = [0, 0, 0, 0, 0, 0, 0];
    let last_Month_Day_Graph_Amount_List_Debit = [0, 0, 0, 0, 0, 0, 0];
    let last_last_Month_Day_Graph_Amount_List_Debit = [0, 0, 0, 0, 0, 0, 0];
    let jan_june_Month_Day_Graph_Amount_List_Debit = [0, 0, 0, 0, 0, 0, 0];
    let jul_December_Month_Day_Graph_Amount_List_Debit= [0, 0, 0, 0, 0, 0, 0];
    let last_10_trans_Day_Graph_Amount_List_Debit = [0, 0, 0, 0, 0, 0, 0];
    let all_trans_Day_Graph_Amount_List_Debit = [0, 0, 0, 0, 0, 0, 0];



    // For day line graph
    let current_Month_Date_Line_Graph_Label_List = [];
    let last_Month_Date_Line_Graph_Label_List = [];
    let last_Last_Month_Date_Line_Graph_Label_List = [];
    let last_10_trans_Line_Graph_Label_List = [];
    let Jan_June_Month_Date_Line_Graph_Label_List = [];
    let July_Decem_Month_Date_Line_Graph_Label_List = [];
    let All_Trans_Date_Line_Graph_Label_List = [];


    let current_Month_Credit_Line_Graph = [];
    let last_Month_Credit_Line_Graph = [];
    let last_Last_Month_Credit_Line_Graph = [];
    let last_10_trans_Credit_Line_Graph = [];
    let Jan_June_Credit_Line_Graph = [];
    let July_Decem_Credit_Line_Graph = [];
    let All_Trans_Credit_Line_Graph = [];


    let current_Month_Debit_Line_Graph = [];
    let last_Month_Debit_Line_Graph = [];
    let last_Last_Month_Debit_Line_Graph = [];
    let last_10_trans_Debit_Line_Graph = [];
    let Jan_June_Debit_Line_Graph = [];
    let July_Decem_Debit_Line_Graph = [];
    let All_Trans_Debit_Line_Graph = [];
     

    for(let j = length; j > show_number; j--) {
        last10keys.push(window.key_list[j - 1])
    }

    

    for (let id in data){

        let userYear = Number(data[id].date.split('-')[0]);
        let userMonth = Number(data[id].date.split('-')[1]) - 1;
        let userDay = Number(data[id].date.split('-')[2]);

        let newDate_Graph = new Date(userYear, userMonth, userDay);
        let day_value = newDate_Graph.getDay();


        // January - June Transaction
        if (Jan_June_KeyList.includes(id)){
            
            document.querySelector('#Jan_JuneTransactionShow').innerHTML +=
            `<tr class="font-table-items">
                <th scope="row">${JanJunCount}</th>
                <td>${data[id].name}</td>
                <td>${data[id].category}</td>
                <td>${data[id].amount}</td>
                <td>${data[id].date}</td>
                <td>${data[id].time}</td>
                <td>${data[id].type}</td>
                <td><a href="#" style="color: #1d2124;"><i class="fas fa-times-circle red"></i></a></td>
                <td><a href="#" style="color: #1d2124;"><i class="fas fa-times-circle red"></i></a></td>
            </tr>`;

            JanJunCount++;

            // For bar graph
            if (data[id].type === 'credit'){
                jan_june_Month_Day_Graph_Amount_List_Credit[day_value] += Number(data[id].amount);
            } else {
                jan_june_Month_Day_Graph_Amount_List_Debit[day_value] += Number(data[id].amount);
            }

             

            // For pie chart
            if (Jan_June_Category_List.includes(data[id].category)){

                let index = Jan_June_Category_List.indexOf(data[id].category);
                Jan_June_Amount_List[index] += Number(data[id].amount);

            } else {

                Jan_June_Category_List.push(data[id].category);
                Jan_June_Amount_List.push(Number(data[id].amount));
            }



            // For line graph
            if (Jan_June_Month_Date_Line_Graph_Label_List.includes(data[id].date)){

                let index_line = Jan_June_Month_Date_Line_Graph_Label_List.indexOf(data[id].date);

                if (data[id].type === 'credit'){
                    Jan_June_Credit_Line_Graph[index_line] += Number(data[id].amount);
                } else {
                    Jan_June_Debit_Line_Graph[index_line] += Number(data[id].amount);
                };

            } else {

                Jan_June_Month_Date_Line_Graph_Label_List.push(data[id].date);

                if (data[id].type === 'credit'){
                    Jan_June_Credit_Line_Graph.push(Number(data[id].amount));
                } else {
                    Jan_June_Credit_Line_Graph.push(Number(0));
                };

                if (data[id].type === 'debit'){
                    Jan_June_Debit_Line_Graph.push(Number(data[id].amount));
                } else {
                    Jan_June_Debit_Line_Graph.push(Number(0));
                };
            }

        }
        
        // July - December Transaction
        if(July_Decem_KeyList.includes(id)){

            document.querySelector('#July_DecemTransactionShow').innerHTML +=
            `<tr class="font-table-items">
                <th scope="row">${julDecemCount}</th>
                <td>${data[id].name}</td>
                <td>${data[id].category}</td>
                <td>${data[id].amount}</td>
                <td>${data[id].date}</td>
                <td>${data[id].time}</td>
                <td>${data[id].type}</td>
                <td><a href="#" style="color: #1d2124;"><i class="fas fa-times-circle red"></i></a></td>
                <td><a href="#" style="color: #1d2124;"><i class="fas fa-times-circle red"></i></a></td>
            </tr>`;

            julDecemCount++;

            // For bar graph
            if (data[id].type === 'credit'){
                jul_December_Month_Day_Graph_Amount_List_Credit[day_value] += Number(data[id].amount);
            } else {
                jul_December_Month_Day_Graph_Amount_List_Debit[day_value] += Number(data[id].amount);
            };

            // for pie chart
            if (Jul_December_Category_List.includes(data[id].category)){

                let index = Jul_December_Category_List.indexOf(data[id].category);
                Jul_December_Amount_List[index] += Number(data[id].amount);

            } else {

                Jul_December_Category_List.push(data[id].category);
                Jul_December_Amount_List.push(Number(data[id].amount));
            }

            // For line graph
            if (July_Decem_Month_Date_Line_Graph_Label_List.includes(data[id].date)){

                let index_line = July_Decem_Month_Date_Line_Graph_Label_List.indexOf(data[id].date);

                if (data[id].type === 'credit'){
                    July_Decem_Credit_Line_Graph[index_line] += Number(data[id].amount);
                } else {
                    July_Decem_Debit_Line_Graph[index_line] += Number(data[id].amount);
                };

            } else {

                July_Decem_Month_Date_Line_Graph_Label_List.push(data[id].date);

                if (data[id].type === 'credit'){
                    July_Decem_Credit_Line_Graph.push(Number(data[id].amount));
                } else {
                    July_Decem_Credit_Line_Graph.push(Number(0));
                };

                if (data[id].type === 'debit'){
                    July_Decem_Debit_Line_Graph.push(Number(data[id].amount));
                } else {
                    July_Decem_Debit_Line_Graph.push(Number(0));
                };
            }

        }

        // Current Month Transaction
        if(window.currentMonthKeyList.includes(id)){

            document.querySelector('#CurrentMonthTransactionShow').innerHTML +=
            `<tr class="font-table-items">
                <th scope="row">${currentMonthCount}</th>
                <td>${data[id].name}</td>
                <td>${data[id].category}</td>
                <td>${data[id].amount}</td>
                <td>${data[id].date}</td>
                <td>${data[id].time}</td>
                <td>${data[id].type}</td>
                <td><a href="#" style="color: #1d2124;"><i class="fas fa-times-circle red"></i></a></td>
                <td><a href="#" style="color: #1d2124;"><i class="fas fa-times-circle red"></i></a></td>
            </tr>`;

            currentMonthCount++;

            // for bar graph
            if (data[id].type === 'credit'){
                current_Month_Day_Graph_Amount_List_Credit[day_value] += Number(data[id].amount);
            } else {
                current_Month_Day_Graph_Amount_List_Debit[day_value] += Number(data[id].amount);
            };


            // for pie chart
            if (Current_Month_Category_List.includes(data[id].category)){

                let index = Current_Month_Category_List.indexOf(data[id].category);
                Current_Month_Amount_List[index] += Number(data[id].amount);

            } else {

                Current_Month_Category_List.push(data[id].category);
                Current_Month_Amount_List.push(Number(data[id].amount));
            }

            // For line graph
            if (current_Month_Date_Line_Graph_Label_List.includes(data[id].date)){

                let index_line = current_Month_Date_Line_Graph_Label_List.indexOf(data[id].date);

                if (data[id].type === 'credit'){
                    current_Month_Credit_Line_Graph[index_line] += Number(data[id].amount);
                } else {
                    current_Month_Debit_Line_Graph[index_line] += Number(data[id].amount);
                };

            } else {

                current_Month_Date_Line_Graph_Label_List.push(data[id].date);

                if (data[id].type === 'credit'){
                    current_Month_Credit_Line_Graph.push(Number(data[id].amount));
                } else {
                    current_Month_Credit_Line_Graph.push(Number(0));
                };

                if (data[id].type === 'debit'){
                    current_Month_Debit_Line_Graph.push(Number(data[id].amount));
                } else {
                    current_Month_Debit_Line_Graph.push(Number(0));
                };
            }

        }

        // Last Month Transaction
        if(window.lastMonthKeyList.includes(id)){

            document.querySelector('#LastMonthTransactionShow').innerHTML +=
            `<tr class="font-table-items">
                <th scope="row">${lastMonthCount}</th>
                <td>${data[id].name}</td>
                <td>${data[id].category}</td>
                <td>${data[id].amount}</td>
                <td>${data[id].date}</td>
                <td>${data[id].time}</td>
                <td>${data[id].type}</td>
                <td><a href="#" style="color: #1d2124;"><i class="fas fa-times-circle red"></i></a></td>
                <td><a href="#" style="color: #1d2124;"><i class="fas fa-times-circle red"></i></a></td>
            </tr>`;

            lastMonthCount++;

            // For bar graph
            if (data[id].type === 'credit'){
                last_Month_Day_Graph_Amount_List_Credit[day_value] += Number(data[id].amount);
            } else {
                last_Month_Day_Graph_Amount_List_Debit[day_value] += Number(data[id].amount);
            };

            // for pie chart
            if (Last_Month_Category_List.includes(data[id].category)){

                let index = Last_Month_Category_List.indexOf(data[id].category);
                Last_Month_Amount_List[index] += Number(data[id].amount);

            } else {

                Last_Month_Category_List.push(data[id].category);
                Last_Month_Amount_List.push(Number(data[id].amount));
            }



            // For line graph
            if (last_Month_Date_Line_Graph_Label_List.includes(data[id].date)){

                let index_line = last_Month_Date_Line_Graph_Label_List.indexOf(data[id].date);

                if (data[id].type === 'credit'){
                    last_Month_Credit_Line_Graph[index_line] += Number(data[id].amount);
                } else {
                    last_Month_Debit_Line_Graph[index_line] += Number(data[id].amount);
                };

            } else {

                last_Month_Date_Line_Graph_Label_List.push(data[id].date);

                if (data[id].type === 'credit'){
                    last_Month_Credit_Line_Graph.push(Number(data[id].amount));
                } else {
                    last_Month_Credit_Line_Graph.push(Number(0));
                };

                if (data[id].type === 'debit'){
                    last_Month_Debit_Line_Graph.push(Number(data[id].amount));
                } else {
                    last_Month_Debit_Line_Graph.push(Number(0));
                };
            }

        }

        // Last Last Month Transaction
        if(window.lastLastMonthKeyList.includes(id)){

            document.querySelector('#LastLastMonthTransactionShow').innerHTML +=
            `<tr class="font-table-items">
                <th scope="row">${lastlastMonthCount}</th>
                <td>${data[id].name}</td>
                <td>${data[id].category}</td>
                <td>${data[id].amount}</td>
                <td>${data[id].date}</td>
                <td>${data[id].time}</td>
                <td>${data[id].type}</td>
                <td><a href="#" style="color: #1d2124;"><i class="fas fa-times-circle red"></i></a></td>
                <td><a href="#" style="color: #1d2124;"><i class="fas fa-times-circle red"></i></a></td>
            </tr>`;

            lastlastMonthCount++;


            // For bar chart
            if (data[id].type === 'credit'){
                last_last_Month_Day_Graph_Amount_List_Credit[day_value] += Number(data[id].amount);
            } else {
                last_last_Month_Day_Graph_Amount_List_Debit[day_value] += Number(data[id].amount);
            };



            // For pie chart
            if (Last_Last_Month_Category_List.includes(data[id].category)){

                let index = Last_Last_Month_Category_List.indexOf(data[id].category);
                Last_Last_Month_Amount_List[index] += Number(data[id].amount);

            } else {

                Last_Last_Month_Category_List.push(data[id].category);
                Last_Last_Month_Amount_List.push(Number(data[id].amount));
            }


            // For line graph
            if (last_Last_Month_Date_Line_Graph_Label_List.includes(data[id].date)){

                let index_line = last_Last_Month_Date_Line_Graph_Label_List.indexOf(data[id].date);

                if (data[id].type === 'credit'){
                    last_Last_Month_Credit_Line_Graph[index_line] += Number(data[id].amount);
                } else {
                    last_Last_Month_Debit_Line_Graph[index_line] += Number(data[id].amount);
                };

            } else {

                last_Last_Month_Date_Line_Graph_Label_List.push(data[id].date);

                if (data[id].type === 'credit'){
                    last_Last_Month_Credit_Line_Graph.push(Number(data[id].amount));
                } else {
                    last_Last_Month_Credit_Line_Graph.push(Number(0));
                };

                if (data[id].type === 'debit'){
                    last_Last_Month_Debit_Line_Graph.push(Number(data[id].amount));
                } else {
                    last_Last_Month_Debit_Line_Graph.push(Number(0));
                };
            }

        }


        // last 10 transaction
        if (length > 10){

            if(last10keys.includes(id)){

                document.querySelector('#last10TransactionShow').innerHTML += 
                `<tr class="font-table-items">
                    <th scope="row">${ifCounter}</th>
                    <td>${data[id].name}</td>
                    <td>${data[id].category}</td>
                    <td>${data[id].amount}</td>
                    <td>${data[id].date}</td>
                    <td>${data[id].time}</td>
                    <td>${data[id].type}</td>
                    <td><a href="#" style="color: #1d2124;" data-toggle="modal" data-target=".editModal"><i class="fas fa-edit green-shade" id="storeID" data-id="${id}"></i></a></td>
                    <td><a href="#" style="color: #1d2124;" data-toggle="modal" data-target=".deleteModal"><i class="fas fa-trash red" id="deleteID" data-id="${id}"></i></a></td>
                </tr>`;
                ifCounter++;



                // for widges
                last_10_trans_total_trans_number++;

                if (data[id].type === "credit"){
                    last_10_trans_total_credit_amount += Number(data[id].amount);
                } else{
                    last_10_trans_total_debit_amount += Number(data[id].amount);
                }




                // For bar graph
                if (data[id].type === 'credit'){
                    last_10_trans_Day_Graph_Amount_List_Credit[day_value] += Number(data[id].amount);
                } else {
                    last_10_trans_Day_Graph_Amount_List_Debit[day_value] += Number(data[id].amount);
                };

                // For pie chart
                if (Last_10_Trans_Category_List.includes(data[id].category)){

                    let index = Last_10_Trans_Category_List.indexOf(data[id].category);
                    Last_10_Trans_Amount_List[index] += Number(data[id].amount);
    
                } else {
    
                    Last_10_Trans_Category_List.push(data[id].category);
                    Last_10_Trans_Amount_List.push(Number(data[id].amount));
                }



                // For line graph
                if (last_10_trans_Line_Graph_Label_List.includes(data[id].date)){

                    let index_line = last_10_trans_Line_Graph_Label_List.indexOf(data[id].date);

                    if (data[id].type === 'credit'){
                        last_10_trans_Credit_Line_Graph[index_line] += Number(data[id].amount);
                    } else {
                        last_10_trans_Debit_Line_Graph[index_line] += Number(data[id].amount);
                    };

                } else {

                    last_10_trans_Line_Graph_Label_List.push(data[id].date);

                    if (data[id].type === 'credit'){
                        last_10_trans_Credit_Line_Graph.push(Number(data[id].amount));
                    } else {
                        last_10_trans_Credit_Line_Graph.push(Number(0));
                    };

                    if (data[id].type === 'debit'){
                        last_10_trans_Debit_Line_Graph.push(Number(data[id].amount));
                    } else {
                        last_10_trans_Debit_Line_Graph.push(Number(0));
                    };
                }
            }

        } 
    
        if(length < 10){
            document.querySelector('#last10TransactionShow').innerHTML += 
                `<tr class="font-table-items">
                    <th scope="row">${mainCount}</th>
                    <td>${data[id].name}</td>
                    <td>${data[id].category}</td>
                    <td>${data[id].amount}</td>
                    <td>${data[id].date}</td>
                    <td>${data[id].time}</td>
                    <td>${data[id].type}</td>
                    <td><a href="#" style="color: #1d2124;" data-toggle="modal" data-target=".editModal"><i class="fas fa-edit green-shade" id="storeID" data-id="${id}"></i></a></td>
                    <td><a href="#" style="color: #1d2124;" data-toggle="modal" data-target=".deleteModal"><i class="fas fa-trash red" id="deleteID" data-id="${id}"></i></a></td>
                </tr>`;




            // for widges
            last_10_trans_total_trans_number++;

            if (data[id].type === "credit"){
                last_10_trans_total_credit_amount += Number(data[id].amount);
            } else{
                last_10_trans_total_debit_amount += Number(data[id].amount);
            }
        }
        



        // all transactions
        document.querySelector('#allTransactionShow').innerHTML += 
            `<tr class="font-table-items">
                <th scope="row">${mainCount}</th>
                <td>${data[id].name}</td>
                <td>${data[id].category}</td>
                <td>${data[id].amount}</td>
                <td>${data[id].date}</td>
                <td>${data[id].time}</td>
                <td>${data[id].type}</td>
                <td><a href="#" style="color: #1d2124;"><i class="fas fa-times-circle red"></i></a></td>
                <td><a href="#" style="color: #1d2124;"><i class="fas fa-times-circle red"></i></a></td>
            </tr>`;



            // for widges
            all_month_total_trans_number++;

            if (data[id].type === "credit"){
                all_month_total_credit_amount += Number(data[id].amount);
            } else{
                all_month_total_debit_amount += Number(data[id].amount);
            }






            // For bar graph
            if (data[id].type === 'credit'){
                all_trans_Day_Graph_Amount_List_Credit[day_value] += Number(data[id].amount);
            } else {
                all_trans_Day_Graph_Amount_List_Debit[day_value] += Number(data[id].amount);
            };


            // For line graph
            if (All_Trans_Date_Line_Graph_Label_List.includes(data[id].date)){

                let index_line = All_Trans_Date_Line_Graph_Label_List.indexOf(data[id].date);

                if (data[id].type === 'credit'){
                    All_Trans_Credit_Line_Graph[index_line] += Number(data[id].amount);
                } else {
                    All_Trans_Debit_Line_Graph[index_line] += Number(data[id].amount);
                };

            } else {

                All_Trans_Date_Line_Graph_Label_List.push(data[id].date);

                if (data[id].type === 'credit'){
                    All_Trans_Credit_Line_Graph.push(Number(data[id].amount));
                } else {
                    All_Trans_Credit_Line_Graph.push(Number(0));
                };

                if (data[id].type === 'debit'){
                    All_Trans_Debit_Line_Graph.push(Number(data[id].amount));
                } else {
                    All_Trans_Debit_Line_Graph.push(Number(0));
                };
            }
        
        mainCount++;

    }





    // for widges---------------------->


    // All transactions
    if (all_month_total_trans_number === 1){
        document.querySelector('#All_trans_transac_month_total_trans_number').textContent = 0;
    } else {
        document.querySelector('#All_trans_transac_month_total_trans_number').textContent = all_month_total_trans_number - 1;
    }

    document.querySelector('#All_trans_transac_month_total_credit_amount').textContent = all_month_total_credit_amount;
    document.querySelector('#All_trans_transac_month_total_debit_amount').textContent = all_month_total_debit_amount;
    document.querySelector('#All_trans_transac_month_total_saving_amount').textContent = all_month_total_credit_amount - all_month_total_debit_amount;




    // last 10 transactions
    if (last_10_trans_total_trans_number === 1){
        document.querySelector('#last_10_transac_month_total_trans_number').textContent = 0;
    } else {
        document.querySelector('#last_10_transac_month_total_trans_number').textContent = last_10_trans_total_trans_number - 1;
    }

    document.querySelector('#last_10_transac_month_total_credit_amount').textContent = last_10_trans_total_credit_amount;
    document.querySelector('#last_10_transac_month_total_debit_amount').textContent = last_10_trans_total_debit_amount;
    document.querySelector('#last_10_transac_month_total_saving_amount').textContent = last_10_trans_total_credit_amount - last_10_trans_total_debit_amount;



    // Category Graphs------------------------------------------->

    // January June Category Graph
    let pieChart_Jan_June = document.querySelector('#CategoryPieChart_Jan_June').getContext('2d')

        let pieChart_graph_Jan_June = new Chart(pieChart_Jan_June, {
            type: 'pie',
            data: {
                labels: Jan_June_Category_List,
                datasets: [{
                    label: 'Expense Summery',
                    data: Jan_June_Amount_List,
                    backgroundColor: color_list
                }]
            },
            options: {
                title: {
                    display: true,
                    text: `JANUARY - JUNE ${year} CATEGORY WISE PIE CHART`
                  }
            }
        })


    // July December Category Graph
    let pieChart_Jaly_December = document.querySelector('#CategoryPieChart_Jal_Decem').getContext('2d')

        let pieChart_graph_Jaly_December = new Chart(pieChart_Jaly_December, {
            type: 'pie',
            data: {
                labels: Jul_December_Category_List,
                datasets: [{
                    label: 'Expense Summery',
                    data: Jul_December_Amount_List,
                    backgroundColor: color_list
                }]
            },
            options: {
                title: {
                    display: true,
                    text: `JULY - DECEMBER ${year} CATEGORY WISE PIE CHART`
                  }
            }
        })


    // Current Month Category Graph
    let pieChart_Current_Month = document.querySelector('#CategoryPieChart_Current_Month').getContext('2d')

        let pieChart_graph_Current_Month = new Chart(pieChart_Current_Month, {
            type: 'pie',
            data: {
                labels: Current_Month_Category_List,
                datasets: [{
                    label: 'Expense Summery',
                    data: Current_Month_Amount_List,
                    backgroundColor: color_list,
                }]
            },
            options: {
                title: {
                    display: true,
                    text: `${currentMonthName} - ${year} CATEGORY WISE PIE CHART`
                  }
            }
        })


    // Last Month Category Graph
    let pieChart_Last_Month = document.querySelector('#CategoryPieChart_Last_Month').getContext('2d')

        let pieChart_graph_Last_Month = new Chart(pieChart_Last_Month, {
            type: 'pie',
            data: {
                labels: Last_Month_Category_List,
                datasets: [{
                    label: 'Expense Summery',
                    data: Last_Month_Amount_List,
                    backgroundColor: color_list,
                }]
            },
            options: {
                title: {
                    display: true,
                    text: `${lastMonthName} - ${year} CATEGORY WISE PIE CHART`
                  }
            }
        })



    // Last Last Month Category Graph
    let pieChart_Last_Last_Month = document.querySelector('#CategoryPieChart_Last_Last_Month').getContext('2d')

        let pieChart_graph_Last_Last_Month = new Chart(pieChart_Last_Last_Month, {
            type: 'pie',
            data: {
                labels: Last_Last_Month_Category_List,
                datasets: [{
                    label: 'Expense Summery',
                    data: Last_Last_Month_Amount_List,
                    backgroundColor: color_list,
                }]
            },

            options: {
                title: {
                    display: true,
                    text: `${lastLastMonthName} - ${year} CATEGORY WISE PIE CHART`
                  }
            }
        })

    // Last 10 Transaction Category Graph
    let pieChart_Last_10_trans = document.querySelector('#CategoryPieChart_Last_10_trans').getContext('2d')

        let pieChart_graph_Last_10_trans = new Chart(pieChart_Last_10_trans, {
            type: 'pie',
            data: {
                labels: Last_10_Trans_Category_List,
                datasets: [{
                    label: 'Expense Summery',
                    data: Last_10_Trans_Amount_List,
                    backgroundColor: color_list
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'LAST 10 TRANSACTIONS CATEGORY WISE PIE CHART'
                  }
            }
        })



    // Day Graphs---------------------------->
    //Current Month Day Graph
    let Current_Month_Day_Graph = document.querySelector('#Day_Bar_Graph_Current_Month').getContext('2d');

    let expenseCurrent_Month_Day_GraphChart = new Chart(Current_Month_Day_Graph, {
        type: 'bar',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Credit',
                data: current_Month_Day_Graph_Amount_List_Credit,
                backgroundColor: 'rgba( 138, 10, 207, 0.5)'
            },
        {
            label: 'Debit',
                data: current_Month_Day_Graph_Amount_List_Debit,
                backgroundColor: 'rgba( 229, 40, 68, 0.5)'
        }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Week Days'
                      }
                }]
            },

            title: {
                display: true,
                text: `${currentMonthName} - ${year} DAY WISE ANALYSIS`
              }
        }
    })

    // Last Month Day Graph
    let Last_Month_Day_Graph = document.querySelector('#Day_Bar_Graph_Last_Month').getContext('2d');

    let expenseLast_Month_Day_GraphChart = new Chart(Last_Month_Day_Graph, {
        type: 'bar',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Credit',
                data: last_Month_Day_Graph_Amount_List_Credit,
                backgroundColor: 'rgba( 138, 10, 207, 0.5)'
            },
        {
            label: 'Debit',
            data: last_Month_Day_Graph_Amount_List_Debit,
            backgroundColor: 'rgba( 229, 40, 68, 0.5)'
        }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Week Days'
                      }
                }]
            },

            title: {
                display: true,
                text: `${lastMonthName} - ${year} DAY WISE ANALYSIS`
              }
        }
    })

    // Last Last Month Day Graph
    let Last_Last_Month_Day_Graph = document.querySelector('#Day_Bar_Graph_Last_Last_Month').getContext('2d');

    let expenseLast_Last_Month_Day_GraphChart = new Chart(Last_Last_Month_Day_Graph, {
        type: 'bar',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Day wise Expense',
                data: last_last_Month_Day_Graph_Amount_List_Credit,
                backgroundColor: 'rgba( 138, 10, 207, 0.5)'
            },{
                label: 'Debit',
                data: last_last_Month_Day_Graph_Amount_List_Debit,
                backgroundColor: 'rgba( 229, 40, 68, 0.5)'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Week Days'
                      }
                }]
            },

            title: {
                display: true,
                text: `${lastLastMonthName} - ${year} DAY WISE ANALYSIS`
              }
        }
    })

    // January June Month Day Graph
    let Jan_June_Month_Day_Graph = document.querySelector('#Day_Bar_Graph_Jan_June').getContext('2d');

    let expenseJan_June_Month_Day_GraphChart = new Chart(Jan_June_Month_Day_Graph, {
        type: 'bar',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Credit',
                data: jan_june_Month_Day_Graph_Amount_List_Credit,
                backgroundColor: 'rgba( 138, 10, 207, 0.5)'
            },{
                label: 'Debit',
                data: jan_june_Month_Day_Graph_Amount_List_Debit,
                backgroundColor: 'rgba( 229, 40, 68, 0.5)'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Week Days'
                      }
                }]
            },

            title: {
                display: true,
                text: `JANUARY - JUNE ${year} DAY WISE ANALYSIS`
              }
        }
    })


    // July - December Month Day Graph
    let July_December_Month_Day_Graph = document.querySelector('#Day_Bar_Graph_Jal_Decem').getContext('2d');

    let expenseJuly_December_Month_Day_GraphChart = new Chart(July_December_Month_Day_Graph, {
        type: 'bar',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Credit',
                data: jul_December_Month_Day_Graph_Amount_List_Credit,
                backgroundColor: 'rgba( 138, 10, 207, 0.5)'
            },{
                label: 'Debit',
                data: jul_December_Month_Day_Graph_Amount_List_Debit,
                backgroundColor: 'rgba( 229, 40, 68, 0.5)'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Week Days'
                      }
                }]
            },
            title: {
                display: true,
                text: `JULY - DECEMBER ${year} DAY WISE ANALYSIS`
              }
        }
    })

    // Last 10 trans Day Graph 
    let Last_10_Trans_Day_Graph = document.querySelector('#Day_Bar_Graph_Last_10_trans').getContext('2d');

    let expenseLast_10_Trans_Day_GraphChart = new Chart(Last_10_Trans_Day_Graph, {
        type: 'bar',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Credit',
                data: last_10_trans_Day_Graph_Amount_List_Credit,
                backgroundColor: 'rgba( 138, 10, 207, 0.5)'
            },{
                label: 'Debit',
                data: last_10_trans_Day_Graph_Amount_List_Debit,
                backgroundColor: 'rgba( 229, 40, 68, 0.5)'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Week Days'
                      }
                }]
            },

            title: {
                display: true,
                text: 'LAST 10 TRANSACTIONS DAY WISE ANALYSIS'
              }
        }
    })


    // All transaction Day Graph
    let All_Trans_Day_Graph = document.querySelector('#Day_Bar_Graph_All').getContext('2d');

    let expenseAll_Trans_Day_GraphChart = new Chart(All_Trans_Day_Graph, {
        type: 'bar',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Credit',
                data: all_trans_Day_Graph_Amount_List_Credit,
                backgroundColor: 'rgba( 138, 10, 207, 0.5)'
            },{
                label: 'Debit',
                data: all_trans_Day_Graph_Amount_List_Debit,
                backgroundColor: 'rgba( 229, 40, 68, 0.5)'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Week Days'
                      }
                }]
            },

            title: {
                display: true,
                text: 'ALL TRANSACTIONS DAY WISE ANALYSIS'
              }
        }
    })










    // For Line Chart---------------------------------------------->

    // Current Month
    let Current_Month_Line_Day_Graph = document.querySelector('#Day_Line_Graph_Current_Month').getContext('2d');

    let expenseCurrent_Month_Line_Day_Graph_Chart = new Chart(Current_Month_Line_Day_Graph, {

        type: 'line',
        data: {
            labels: current_Month_Date_Line_Graph_Label_List,
            datasets: [{
                data: current_Month_Credit_Line_Graph,
                label: "Credit",
                borderColor: "rgba( 138, 10, 207, 0.5)",
                fill: false
            }, {
                data: current_Month_Debit_Line_Graph,
                label: "Debit",
                borderColor: "rgba( 229, 40, 68, 0.5)",
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              text: `${currentMonthName} - ${year} TRANSACTIONS WISE ANALYSIS`
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Dates'
                      }
                }]
            }
          }
    })


    // Last Month
    let Last_Month_Line_Day_Graph = document.querySelector('#Day_Line_Graph_Last_Month').getContext('2d');

    let expenseLast_Month_Line_Day_Graph_Chart = new Chart(Last_Month_Line_Day_Graph, {

        type: 'line',
        data: {
            labels: last_Month_Date_Line_Graph_Label_List,
            datasets: [{
                data: last_Month_Credit_Line_Graph,
                label: "Credit",
                borderColor: "rgba( 138, 10, 207, 0.5)",
                fill: false
            }, {
                data: last_Month_Debit_Line_Graph,
                label: "Debit",
                borderColor: "rgba( 229, 40, 68, 0.5)",
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              text: `${lastMonthName} - ${year} TRANSACTIONS WISE ANALYSIS`
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Dates'
                      }
                }]
            }
          }
    })


    // Last Last Month
    let Last_Last_Month_Line_Day_Graph = document.querySelector('#Day_Line_Graph_Last_Last_Month').getContext('2d');

    let expenseLast_Last_Month_Line_Day_Graph_Chart = new Chart(Last_Last_Month_Line_Day_Graph, {

        type: 'line',
        data: {
            labels: last_Last_Month_Date_Line_Graph_Label_List,
            datasets: [{
                data: last_Last_Month_Credit_Line_Graph,
                label: "Credit",
                borderColor: "rgba( 138, 10, 207, 0.5)",
                fill: false
            }, {
                data: last_Last_Month_Debit_Line_Graph,
                label: "Debit",
                borderColor: "rgba( 229, 40, 68, 0.5)",
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              text: `${lastLastMonthName} - ${year} TRANSACTIONS WISE ANALYSIS`
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Dates'
                      }
                }]
            }
          }
    })


    // Last 10 Trans
    let Last_10_Trans_Line_Day_Graph = document.querySelector('#Day_Line_Graph_Last_10_trans').getContext('2d');

    let expenseLast_10_Trans_Line_Day_Graph_Chart = new Chart(Last_10_Trans_Line_Day_Graph, {

        type: 'line',
        data: {
            labels: last_10_trans_Line_Graph_Label_List,
            datasets: [{
                data: last_10_trans_Credit_Line_Graph,
                label: "Credit",
                borderColor: "rgba( 138, 10, 207, 0.5)",
                fill: false
            }, {
                data: last_10_trans_Debit_Line_Graph,
                label: "Debit",
                borderColor: "rgba( 229, 40, 68, 0.5)",
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              text: `LAST 10 TRANSACTIONS WISE ANALYSIS`
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Dates'
                      }
                }]
            }
          }
    })


    // January June Month
    let Jan_June_Month_Line_Day_Graph = document.querySelector('#Day_Line_Graph_Jan_June').getContext('2d');

    let expenseJan_June_Month_Line_Day_Graph_Chart = new Chart(Jan_June_Month_Line_Day_Graph, {

        type: 'line',
        data: {
            labels: Jan_June_Month_Date_Line_Graph_Label_List,
            datasets: [{
                data: Jan_June_Credit_Line_Graph,
                label: "Credit",
                borderColor: "rgba( 138, 10, 207, 0.5)",
                fill: false
            }, {
                data: Jan_June_Debit_Line_Graph,
                label: "Debit",
                borderColor: "rgba( 229, 40, 68, 0.5)",
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              text: `JANUARY - JUNE ${year} TRANSACTIONS WISE ANALYSIS`
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Dates'
                      }
                }]
            }
          }
    })


    // July - December Month
    let July_Decem_Month_Line_Day_Graph = document.querySelector('#Day_Line_Graph_Jal_Decem').getContext('2d');

    let expenseJuly_Decem_Month_Line_Day_Graph_Chart = new Chart(July_Decem_Month_Line_Day_Graph, {

        type: 'line',
        data: {
            labels: July_Decem_Month_Date_Line_Graph_Label_List,
            datasets: [{
                data: July_Decem_Credit_Line_Graph,
                label: "Credit",
                borderColor: "rgba( 138, 10, 207, 0.5)",
                fill: false
            }, {
                data: July_Decem_Debit_Line_Graph,
                label: "Debit",
                borderColor: "rgba( 229, 40, 68, 0.5)",
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              text: `JULY - DECEMBER ${year} TRANSACTIONS WISE ANALYSIS`
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Dates'
                      }
                }]
            }
          }
    })


    // All transactions
    let All_Trans_Month_Line_Day_Graph = document.querySelector('#Day_Line_Graph_All').getContext('2d');

    let expenseAll_Trans_Month_Line_Day_Graph_Chart = new Chart(All_Trans_Month_Line_Day_Graph, {

        type: 'line',
        data: {
            labels: All_Trans_Date_Line_Graph_Label_List,
            datasets: [{
                data:  All_Trans_Credit_Line_Graph,
                label: "Credit",
                borderColor: "rgba( 138, 10, 207, 0.5)",
                fill: false
            }, {
                data: All_Trans_Debit_Line_Graph,
                label: "Debit",
                borderColor: "rgba( 229, 40, 68, 0.5)",
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              text: 'ALL TRANSACTIONS WISE ANALYSIS'
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Rupees'
                      }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Dates'
                      }
                }]
            }
          }
    })
})

// show default transaction history table & widges-------------------->
// table
document.querySelector('#CurrentMonthTransactionShow').style.display = "";

document.querySelector("#LastMonthTransactionShow").style.display = 'none';
document.querySelector("#LastLastMonthTransactionShow").style.display = 'none';
document.querySelector('#Jan_JuneTransactionShow').style.display = 'none';
document.querySelector('#July_DecemTransactionShow').style.display = 'none';
document.querySelector('#allTransactionShow').style.display = 'none';
document.querySelector("#last10TransactionShow").style.display = 'none';


// widges
document.querySelector('#currentMonthDetails_History').style.display = '';


document.querySelector('#LastMonthDetails_History').style.display = 'none';
document.querySelector('#Last_LastMonthDetails_History').style.display = 'none';
document.querySelector('#Janu_June_MonthDetails_History').style.display = 'none';
document.querySelector('#Janu_June_MonthDetails_History').style.display = 'none';
document.querySelector('#July_December_MonthDetails_History').style.display = 'none';
document.querySelector('#All_trans_transactions_MonthDetails_History').style.display = 'none';
document.querySelector('#last_10_transactions_MonthDetails_History').style.display = 'none';




//dropdown selection ---> Current Month
document.querySelector("#current_Month").addEventListener('click', function(){

    document.querySelector('#CurrentMonthTransactionShow').style.display = "";

    document.querySelector("#LastMonthTransactionShow").style.display = 'none';
    document.querySelector("#LastLastMonthTransactionShow").style.display = 'none';
    document.querySelector('#Jan_JuneTransactionShow').style.display = 'none';
    document.querySelector('#July_DecemTransactionShow').style.display = 'none';
    document.querySelector('#allTransactionShow').style.display = 'none';
    document.querySelector("#last10TransactionShow").style.display = 'none';



    document.querySelector('#currentMonthDetails_History').style.display = '';


    document.querySelector('#LastMonthDetails_History').style.display = 'none';
    document.querySelector('#Last_LastMonthDetails_History').style.display = 'none';
    document.querySelector('#Janu_June_MonthDetails_History').style.display = 'none';
    document.querySelector('#Janu_June_MonthDetails_History').style.display = 'none';
    document.querySelector('#July_December_MonthDetails_History').style.display = 'none';
    document.querySelector('#All_trans_transactions_MonthDetails_History').style.display = 'none';
    document.querySelector('#last_10_transactions_MonthDetails_History').style.display = 'none';

})


//dropdown selection ---> Last Month
document.querySelector('#Last_Month').addEventListener('click', function(){

    document.querySelector("#LastMonthTransactionShow").style.display = '';

    document.querySelector("#CurrentMonthTransactionShow").style.display = 'none';
    document.querySelector("#LastLastMonthTransactionShow").style.display = 'none';
    document.querySelector('#Jan_JuneTransactionShow').style.display = 'none';
    document.querySelector('#July_DecemTransactionShow').style.display = 'none';
    document.querySelector('#allTransactionShow').style.display = 'none';
    document.querySelector("#last10TransactionShow").style.display = 'none';


    document.querySelector('#LastMonthDetails_History').style.display = '';


    document.querySelector('#currentMonthDetails_History').style.display = 'none';
    document.querySelector('#Last_LastMonthDetails_History').style.display = 'none';
    document.querySelector('#Janu_June_MonthDetails_History').style.display = 'none';
    document.querySelector('#Janu_June_MonthDetails_History').style.display = 'none';
    document.querySelector('#July_December_MonthDetails_History').style.display = 'none';
    document.querySelector('#All_trans_transactions_MonthDetails_History').style.display = 'none';
    document.querySelector('#last_10_transactions_MonthDetails_History').style.display = 'none';
})


// dropdown selection ---> Last Last Month
document.querySelector('#Last_last_Month').addEventListener('click', function(){

    document.querySelector("#LastLastMonthTransactionShow").style.display = '';

    document.querySelector("#CurrentMonthTransactionShow").style.display = 'none';
    document.querySelector("#LastMonthTransactionShow").style.display = 'none';
    document.querySelector('#Jan_JuneTransactionShow').style.display = 'none';
    document.querySelector('#July_DecemTransactionShow').style.display = 'none';
    document.querySelector('#allTransactionShow').style.display = 'none';
    document.querySelector("#last10TransactionShow").style.display = 'none';



    document.querySelector('#Last_LastMonthDetails_History').style.display = '';


    document.querySelector('#currentMonthDetails_History').style.display = 'none';
    document.querySelector('#LastMonthDetails_History').style.display = 'none';
    document.querySelector('#Janu_June_MonthDetails_History').style.display = 'none';
    document.querySelector('#Janu_June_MonthDetails_History').style.display = 'none';
    document.querySelector('#July_December_MonthDetails_History').style.display = 'none';
    document.querySelector('#All_trans_transactions_MonthDetails_History').style.display = 'none';
    document.querySelector('#last_10_transactions_MonthDetails_History').style.display = 'none';
})


// dropdown selections--> January to June 
document.querySelector('#Jan_Jun').addEventListener('click', function(){

    document.querySelector('#Jan_JuneTransactionShow').style.display = '';

    document.querySelector('#July_DecemTransactionShow').style.display = 'none';
    document.querySelector('#allTransactionShow').style.display = 'none';
    document.querySelector("#CurrentMonthTransactionShow").style.display = 'none';
    document.querySelector("#LastMonthTransactionShow").style.display = 'none';
    document.querySelector("#LastLastMonthTransactionShow").style.display = 'none';
    document.querySelector("#last10TransactionShow").style.display = 'none';


    document.querySelector('#Janu_June_MonthDetails_History').style.display = '';


    document.querySelector('#currentMonthDetails_History').style.display = 'none';
    document.querySelector('#LastMonthDetails_History').style.display = 'none';
    document.querySelector('#Last_LastMonthDetails_History').style.display = 'none';
    document.querySelector('#July_December_MonthDetails_History').style.display = 'none';  
    document.querySelector('#All_trans_transactions_MonthDetails_History').style.display = 'none';
    document.querySelector('#last_10_transactions_MonthDetails_History').style.display = 'none';  

})

// dropdown selections--> July to December
document.querySelector('#Jul_Decem').addEventListener('click', function () {

    document.querySelector('#July_DecemTransactionShow').style.display = '';

    document.querySelector('#Jan_JuneTransactionShow').style.display = 'none';
    document.querySelector('#allTransactionShow').style.display = 'none';
    document.querySelector("#CurrentMonthTransactionShow").style.display = 'none';
    document.querySelector("#LastMonthTransactionShow").style.display = 'none';
    document.querySelector("#LastLastMonthTransactionShow").style.display = 'none';
    document.querySelector("#last10TransactionShow").style.display = 'none';



    document.querySelector('#July_December_MonthDetails_History').style.display = '';


    document.querySelector('#currentMonthDetails_History').style.display = 'none';
    document.querySelector('#LastMonthDetails_History').style.display = 'none';
    document.querySelector('#Last_LastMonthDetails_History').style.display = 'none';
    document.querySelector('#Janu_June_MonthDetails_History').style.display = 'none';
    document.querySelector('#All_trans_transactions_MonthDetails_History').style.display = 'none';
    document.querySelector('#last_10_transactions_MonthDetails_History').style.display = 'none';
})


// dropdown selection ---> Last 10 Transaction
document.querySelector("#last10TransDetails").addEventListener('click', function(){

    document.querySelector("#last10TransactionShow").style.display = "";

    document.querySelector("#CurrentMonthTransactionShow").style.display = 'none';
    document.querySelector("#LastMonthTransactionShow").style.display = 'none';
    document.querySelector("#LastLastMonthTransactionShow").style.display = 'none';
    document.querySelector('#Jan_JuneTransactionShow').style.display = 'none';
    document.querySelector('#July_DecemTransactionShow').style.display = 'none';
    document.querySelector('#allTransactionShow').style.display = 'none';


    document.querySelector('#last_10_transactions_MonthDetails_History').style.display = '';


    document.querySelector('#currentMonthDetails_History').style.display = 'none';
    document.querySelector('#LastMonthDetails_History').style.display = 'none';
    document.querySelector('#Last_LastMonthDetails_History').style.display = 'none';
    document.querySelector('#Janu_June_MonthDetails_History').style.display = 'none';
    document.querySelector('#All_trans_transactions_MonthDetails_History').style.display = 'none';
    document.querySelector('#July_December_MonthDetails_History').style.display = 'none';

})


// dropdown selections--> all
document.querySelector('#allTransDetails').addEventListener('click', function(){

    document.querySelector('#allTransactionShow').style.display = '';

    document.querySelector('#Jan_JuneTransactionShow').style.display = 'none';
    document.querySelector('#July_DecemTransactionShow').style.display = 'none';
    document.querySelector("#CurrentMonthTransactionShow").style.display = 'none';
    document.querySelector("#LastMonthTransactionShow").style.display = 'none';
    document.querySelector("#LastLastMonthTransactionShow").style.display = 'none';
    document.querySelector("#last10TransactionShow").style.display = 'none';



    document.querySelector('#All_trans_transactions_MonthDetails_History').style.display = '';


    document.querySelector('#currentMonthDetails_History').style.display = 'none';
    document.querySelector('#LastMonthDetails_History').style.display = 'none';
    document.querySelector('#Last_LastMonthDetails_History').style.display = 'none';
    document.querySelector('#Janu_June_MonthDetails_History').style.display = 'none';
    document.querySelector('#July_December_MonthDetails_History').style.display = 'none';
    document.querySelector('#last_10_transactions_MonthDetails_History').style.display = 'none';
})


//// Category wise Graphs Control----------------------------------->

// By-default--->

document.querySelector('#CategoryPieChart_Current_Month').style.display = '';

document.querySelector('#CategoryPieChart_All').style.display = 'none';
document.querySelector('#CategoryPieChart_Jan_June').style.display = 'none';
document.querySelector('#CategoryPieChart_Jal_Decem').style.display = 'none';
document.querySelector('#CategoryPieChart_Last_Month').style.display = 'none';
document.querySelector('#CategoryPieChart_Last_Last_Month').style.display = 'none';
document.querySelector('#CategoryPieChart_Last_10_trans').style.display = 'none';


// Category Graph dropdown selections --> Current Month
document.querySelector('#Plot_current_Month').addEventListener('click', function() {

    document.querySelector('#CategoryPieChart_Current_Month').style.display = '';

    document.querySelector('#CategoryPieChart_All').style.display = 'none';
    document.querySelector('#CategoryPieChart_Jan_June').style.display = 'none';
    document.querySelector('#CategoryPieChart_Jal_Decem').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_Last_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_10_trans').style.display = 'none';
})


// Category Graph dropdown selections ---> Last month
document.querySelector('#Plot_Last_Month').addEventListener('click', function(){

    document.querySelector('#CategoryPieChart_Last_Month').style.display = '';

    document.querySelector('#CategoryPieChart_All').style.display = 'none';
    document.querySelector('#CategoryPieChart_Jan_June').style.display = 'none';
    document.querySelector('#CategoryPieChart_Jal_Decem').style.display = 'none';
    document.querySelector('#CategoryPieChart_Current_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_Last_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_10_trans').style.display = 'none';
})



// Category Graph dropdown selections ---> Last Last Month
document.querySelector('#Plot_Last_last_Month').addEventListener('click', function(){

    document.querySelector('#CategoryPieChart_Last_Last_Month').style.display = '';

    document.querySelector('#CategoryPieChart_All').style.display = 'none';
    document.querySelector('#CategoryPieChart_Jan_June').style.display = 'none';
    document.querySelector('#CategoryPieChart_Jal_Decem').style.display = 'none';
    document.querySelector('#CategoryPieChart_Current_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_10_trans').style.display = 'none';
})


// Category Graph dropdown selections ---> January - June
document.querySelector('#Plot_Jan_Jun').addEventListener('click', function(){

    document.querySelector("#CategoryPieChart_Jan_June").style.display = '';

    document.querySelector('#CategoryPieChart_All').style.display = 'none';
    document.querySelector('#CategoryPieChart_Jal_Decem').style.display = 'none';
    document.querySelector('#CategoryPieChart_Current_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_Last_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_10_trans').style.display = 'none';
})


// Category Graph dropdown selections ---> July - December
document.querySelector('#Plot_Jul_Decem').addEventListener('click', function(){

    document.querySelector('#CategoryPieChart_Jal_Decem').style.display = '';

    document.querySelector('#CategoryPieChart_All').style.display = 'none';
    document.querySelector('#CategoryPieChart_Jan_June').style.display = 'none';
    document.querySelector('#CategoryPieChart_Current_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_Last_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_10_trans').style.display = 'none';
})


// Category Graph dropdown selections ---> last 10 trans
document.querySelector('#Plot_last10TransDetails').addEventListener('click', function(){

    document.querySelector('#CategoryPieChart_Last_10_trans').style.display = '';

    document.querySelector('#CategoryPieChart_All').style.display = 'none';
    document.querySelector('#CategoryPieChart_Jan_June').style.display = 'none';
    document.querySelector('#CategoryPieChart_Jal_Decem').style.display = 'none';
    document.querySelector('#CategoryPieChart_Current_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_Last_Month').style.display = 'none';
})


// Category Grapg dropdown selections ---> All trans
document.querySelector('#Plot_allTransDetails').addEventListener('click', function(){

    document.querySelector('#CategoryPieChart_All').style.display = '';

    document.querySelector('#CategoryPieChart_Jan_June').style.display = 'none';
    document.querySelector('#CategoryPieChart_Jal_Decem').style.display = 'none';
    document.querySelector('#CategoryPieChart_Current_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_Last_Month').style.display = 'none';
    document.querySelector('#CategoryPieChart_Last_10_trans').style.display = 'none';
})







// Day Bar Graph Show Control------------------------------------------------------->

// By-default bar day graph
document.querySelector('#Day_Bar_Graph_Current_Month').style.display = '';

document.querySelector('#Day_Bar_Graph_All').style.display = 'none';
document.querySelector('#Day_Bar_Graph_Jan_June').style.display = 'none';
document.querySelector('#Day_Bar_Graph_Jal_Decem').style.display = 'none';
document.querySelector('#Day_Bar_Graph_Last_Month').style.display = 'none';
document.querySelector('#Day_Bar_Graph_Last_Last_Month').style.display = 'none';
document.querySelector('#Day_Bar_Graph_Last_10_trans').style.display = 'none';


// Day Bar Graph dropdown selections --> Current Month
document.querySelector('#Plot_Day_Bar_current_Month').addEventListener('click', function() {

    document.querySelector('#Day_Bar_Graph_Current_Month').style.display = '';

    document.querySelector('#Day_Bar_Graph_All').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Jan_June').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Jal_Decem').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_Last_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_10_trans').style.display = 'none';
})

// Day Bar Graph dropdown selections ---> Last month
document.querySelector('#Plot_Day_Bar_Last_Month').addEventListener('click', function(){

    document.querySelector('#Day_Bar_Graph_Last_Month').style.display = '';

    document.querySelector('#Day_Bar_Graph_All').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Jan_June').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Jal_Decem').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Current_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_Last_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_10_trans').style.display = 'none';
})

// Day Bar Graph dropdown selections ---> Last Last month
document.querySelector('#Plot_Day_Bar_Last_last_Month').addEventListener('click', function(){

    document.querySelector('#Day_Bar_Graph_Last_Last_Month').style.display = '';

    document.querySelector('#Day_Bar_Graph_All').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Jan_June').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Jal_Decem').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Current_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_10_trans').style.display = 'none';
})

// Day Bar Graph dropdown selections ---> January - June month
document.querySelector('#Plot_Day_Bar_Jan_Jun').addEventListener('click', function(){

    document.querySelector('#Day_Bar_Graph_Jan_June').style.display = '';

    document.querySelector('#Day_Bar_Graph_All').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_Last_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Jal_Decem').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Current_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_10_trans').style.display = 'none';
})

// Day Bar Graph dropdown selections ---> July - December month
document.querySelector('#Plot_Day_Bar_Jul_Decem').addEventListener('click', function(){

    document.querySelector('#Day_Bar_Graph_Jal_Decem').style.display = '';

    document.querySelector('#Day_Bar_Graph_All').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_Last_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Jan_June').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Current_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_10_trans').style.display = 'none';
})

// Day Bar Graph dropdown selections ---> last 10 trans
document.querySelector('#Plot_Day_Bar_last10TransDetails').addEventListener('click', function(){

    document.querySelector('#Day_Bar_Graph_Last_10_trans').style.display = '';

    document.querySelector('#Day_Bar_Graph_All').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_Last_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Jan_June').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Current_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Jal_Decem').style.display = 'none';
})

// Day Bar Graph dropdown selections ---> All trans
document.querySelector('#Plot_Day_Bar_allTransDetails').addEventListener('click', function(){

    document.querySelector('#Day_Bar_Graph_All').style.display = '';

    document.querySelector('#Day_Bar_Graph_Last_10_trans').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_Last_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Jan_June').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Current_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Last_Month').style.display = 'none';
    document.querySelector('#Day_Bar_Graph_Jal_Decem').style.display = 'none';
})





// Day Line Graph Show Control  ---------------------------------------------------------------->

// by-dafult show--->
document.querySelector("#Day_Line_Graph_Current_Month").style.display = '';

document.querySelector('#Day_Line_Graph_All').style.display = 'none';
document.querySelector('#Day_Line_Graph_Jan_June').style.display = 'none';
document.querySelector('#Day_Line_Graph_Jal_Decem').style.display = 'none';
document.querySelector('#Day_Line_Graph_Last_Month').style.display = 'none';
document.querySelector('#Day_Line_Graph_Last_Last_Month').style.display = 'none';
document.querySelector('#Day_Line_Graph_Last_10_trans').style.display = 'none';


// Current Month Line Chart
document.querySelector('#Plot_Day_line_current_Month').addEventListener('click', function(){

    document.querySelector("#Day_Line_Graph_Current_Month").style.display = '';

    document.querySelector('#Day_Line_Graph_All').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Jan_June').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Jal_Decem').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_Last_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_10_trans').style.display = 'none';
})


// Last Month Line Chart
document.querySelector('#Plot_Day_line_Last_Month').addEventListener('click', function(){

    document.querySelector('#Day_Line_Graph_Last_Month').style.display = '';

    document.querySelector('#Day_Line_Graph_All').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_10_trans').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Current_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_Last_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Jan_June').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Jal_Decem').style.display = 'none';
})


// Last Last Month Line Chart
document.querySelector('#Plot_Day_line_Last_last_Month').addEventListener('click', function(){

    document.querySelector('#Day_Line_Graph_Last_Last_Month').style.display = '';

    document.querySelector('#Day_Line_Graph_All').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_10_trans').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Current_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Jan_June').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Jal_Decem').style.display = 'none';
})

// January - June Month Line Chart
document.querySelector('#Plot_Day_line_Jan_Jun').addEventListener('click', function(){

    document.querySelector('#Day_Line_Graph_Jan_June').style.display = '';

    document.querySelector('#Day_Line_Graph_All').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_10_trans').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Current_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_Last_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Jal_Decem').style.display = 'none';
})

// Jule - December Month Line Chart
document.querySelector('#Plot_Day_line_Jul_Decem').addEventListener('click', function(){

    document.querySelector('#Day_Line_Graph_Jal_Decem').style.display = '';

    document.querySelector('#Day_Line_Graph_All').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_10_trans').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Current_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_Last_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Jan_June').style.display = 'none';
})

// Last 10 Trans Month Line Chart
document.querySelector('#Plot_Day_line_last10TransDetails').addEventListener('click', function(){

    document.querySelector('#Day_Line_Graph_Last_10_trans').style.display = '';

    document.querySelector('#Day_Line_Graph_All').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Current_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_Last_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Jan_June').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Jal_Decem').style.display = 'none';
})

// All trans Month Line Chart
document.querySelector('#Plot_Day_line_allTransDetails').addEventListener('click', function(){

    document.querySelector('#Day_Line_Graph_All').style.display = '';

    document.querySelector('#Day_Line_Graph_Current_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_Last_Month').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Jan_June').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Jal_Decem').style.display = 'none';
    document.querySelector('#Day_Line_Graph_Last_10_trans').style.display = 'none';
})


























































































// Edit transactions
$(document).on('click', '#storeID', function() {

    window.key = $(this).data("id");
    
    document.querySelector('#updateExpenseButton').addEventListener('click', function(){

        let updateExpenseName = document.querySelector('#updateExpenseName').value;
        let updateExpenseCategory = document.querySelector('#updateExpenseCategory').value;
        let updateExpenseAmount = document.querySelector('#updateExpenseAmount').value;
        let updateExpenseDate = document.querySelector('#updateExpenseDate').value;
        let updateExpenseTime = document.querySelector('#updateExpenseTime').value;
        let updateExpenseType = document.querySelector('#updateExpenseType').value;


        if (updateExpenseName !== '' && updateExpenseCategory !== '' && updateExpenseAmount !== '' && updateExpenseDate !== '' && updateExpenseTime !== '' && updateExpenseType) {

            firebase.database().ref("/users/" + user_id + "/expenseTransDetails/" + window.key).update({
                name: updateExpenseName,
                type: updateExpenseType,
                amount: updateExpenseAmount,
                date: updateExpenseDate,
                time: updateExpenseTime,
                category: updateExpenseCategory
          });

          $('#editExpenseModal').modal('hide');

          document.querySelector('#alert').innerHTML +=
          `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Successfull!</strong> Your data is edited successfully.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>`;


        } else{
            $('#editExpenseModal').modal('hide');

          document.querySelector('#alert').innerHTML +=
            `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Failed!</strong> Your data was not edited. Please try again.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>`;
        }


        document.querySelector('#updateExpenseName').value = "";
        document.querySelector('#updateExpenseCategory').value = "";
        document.querySelector('#updateExpenseAmount').value = "";
        document.querySelector('#updateExpenseDate').value = "";
        document.querySelector('#updateExpenseTime').value = "";
        document.querySelector('#updateExpenseType').value = "";

    })

})



// Delete Transaction
$(document).on('click', '#deleteID', function(){

    window.key = $(this).data("id");

    // console.log(window.key);

    document.querySelector('#confirmDelete').addEventListener('click', function(){

        firebase.database().ref('/users/' + user_id + '/expenseTransDetails/' + window.key).remove();

        document.querySelector('#alert').innerHTML += 
        `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong><i class="fas fa-exclamation-triangle"></i>&nbsp;Successfull!</strong> Your data was deleted successfully.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>`;


        $('.deleteModal').modal('hide');

    })
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





// For displaying profile of user
let profileInformationRef = firebase.database().ref('/users/' + user_id + "/profileInformation");

profileInformationRef.on("value", function (snapshot) {
    let profileData = snapshot.val();

    
    let name = profileData.userName;
    let userOccupation = profileData.Occupation;
    let userDOB = profileData.DateOFBirth;
    let userAddress = profileData.Address;

    if (name !== undefined){
        document.querySelector('#ResponsiveProfileName').textContent = name;
    }

    if (userOccupation !== undefined){
        document.querySelector('#ResponsiveProfileOccupation').textContent = userOccupation;
    }

    if (userDOB !== undefined){
        document.querySelector('#ResponsiveProfileDOB').textContent = userDOB;
    }

    if(userAddress !== undefined) {
        document.querySelector('#ResponsiveProfileAddress').textContent = userAddress;
    }


    let photoImageName = profileData.profilePhotoName;

    var storageRef = firebase.storage().ref();

    // Create a reference to the file for profile image
    var starsRef = storageRef.child('images/' + photoImageName);

    // Get the download URL of profile image
    starsRef.getDownloadURL().then(function(url) {

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
