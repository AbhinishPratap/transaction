const link = "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

const mname = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const know_me = () => {
  let info_of_abhinish = {
    name:"Abhinish Pratap Singh",
    email:"abhinishpratapsingh@gmail.com",
    college:"Dronacharya college of engineering",
    
  };
  console.log(info_of_abhinish);
  getFunction(link);
}

async function getFunction(url) {
  const response = await fetch(url);
  var data = await response.json();
  const sortedInformation = sort_data(data);
  const result = splitTfunction(sortedInformation);
  add_Transaction(result);
}

function sort_data(data) {
  const sorted_data = data.transactions.sort((a, b) => {
    let da = new Date(a.startDate),
      db = new Date(b.startDate);
    return da - db;
  });
  return sorted_data;
}

function splitTfunction(sort_data = []) {
  const getDate = (date) => {
    return date.split("T")[0];
  };

  const new_data = {};

  sort_data.forEach((el) => {
    const key = getDate(el.startDate);
    if (!new_data[key]) {
      new_data[key] = [];
      new_data[key].push(el);
    } else {
      new_data[key].push(el);
    }
  });
  return new_data;
}

var date;
function add_Transaction(result) {

  for (let information in result) {
    var titledate = new Date(information);
    titledate = titledate.getDate() + " " + mname[(titledate.getMonth())] + " " + titledate.getFullYear();
    document.getElementById("lower").innerHTML += 
            `<div class="dateline">
              <div>
                <div>
                  <p >${titledate}</p>
                </div
              </div>
            </div>`;

    for (let i = 0; i < result[information].length; i++) {
      let type = result[information][i].type;
      let direction = result[information][i].direction;
      var new_date = new Date(result[information][i].startDate)
      var date = new_date.toLocaleTimeString();
      new_date = new_date.getDate() + " " + mname[(new_date.getMonth() )] + " " + new_date.getFullYear();
      if (type === 1 && direction === 1) {
        document.getElementById(
          "lower"
        ).innerHTML += 
                `<div class="rightalign"><div class="transactionbox">
                  <p class="amount">
                    &#8377; ${result[information][i].amount}
                  </p>
                  <p class="message"> ✔️ You paid</p>
                  <div class="id">
                  <p>Transaction ID</p>
                <p>${result[information][i].id}</p>
                </div>
                </div>
                </div>
                <div class="rightside">
                <p>${new_date}, ${date}</p>
                </div>`;
      }
     else if (type === 1 && direction === 2) {
        document.getElementById(
          "lower"
        ).innerHTML += `<div class="leftalign"><div class="transactionbox">
              <p class="amount">
               &#8377; ${result[information][i].amount}
             </p>
             <p class="message">✔️ You received</p>
             <div class="id">
             <p>Transaction ID</p>
              <p>${result[information][i].id}</p>
             </div>
             </div>
             </div>
              <div class="leftside">
              <p>${new_date}, ${date}</p>
            </div>`;
      }
     else if (type === 2 && direction === 2) {
        
        document.getElementById(
          "lower"
        ).innerHTML += `<div class="leftalign"><div class="transactionbox">
              <p class="amount">
               &#8377; ${result[information][i].amount}
             </p>
             <p class="message">🔗 Request received</p>
              <button class=\"paybtn\">Pay</button>
              <button class=\"cancelbtn\">Decline</button>
             </div>
             </div>
             <div class="leftside">
             <p>${new_date}, ${date}</p>
            </div>`;
      }
     else if (type === 2 && direction === 1) {

        document.getElementById(
          "lower"
        ).innerHTML += `<div class="rightalign"><div class="transactionbox">
              <p class="amount">
               &#8377; ${result[information][i].amount}
             </p>
             <p class="message">🔗 You requested</p>
             <div class="id">
              <button class=\"cancelbtn\">Cancel</button>
             </div>
             </div>
             </div>
             <div class="rightside">
             
             <p>${new_date}, ${date}</p>
           </div>`;
      }
    }
  }
}
