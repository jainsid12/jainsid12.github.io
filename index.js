var data = document.querySelector(".data");
var view = document.querySelector(".overview");
let url = 'https://covid-india-cases.herokuapp.com/states';

(async function go(){
    let response = await fetch(url);
    var info = await response.json();
    start(info);
})()
 
function start(info){
    console.table(info);
    info.sort( (a,b) => (a.noOfCases > b.noOfCases ? -1:1) );
    
    var table = `<table class = "table table-hover table-striped table-dark">
                    <thead class = "thead-dark">
                        <tr>
                            <th scope = "col">State</th>
                            <th scope = "col">Confirmed</th>
                            <th scope = "col">Active</th>
                            <th scope = "col">Recovered</th>
                            <th scope = "col">Deceased</th>
                        </tr>
                    </thead>
                ` ;
    let totalCase = active = cured = death = 0;
    for(val of info){
        totalCase += val.noOfCases;
        cured += val.cured;
        death += val.deaths;
        
        table += `<tr>
                    <td class = "table-active">${val.state}</td>
                    <td class = "table-warning status">${val.noOfCases.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
                    <td class = "table-secondary status">${(val.noOfCases-val.cured-val.deaths).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
                    <td class = "table-success status">${val.cured.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
                    <td class = "table-danger status">${val.deaths.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
                </tr>`;
    }
    active += totalCase - cured - death;
    table += `</table>`;
    data.innerHTML = `${table}`;

    view.innerHTML = `
                    <div id = "total" class = "d-flex                   
                                flex-md-row 
                                bd-highlight 
                                mb-3">
                        
                            <div class = "p-2 bd-highlight view"><p>Confirmed</p>${totalCase.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</div>
                            <div class = "p-2 bd-highlight view"><p>Active</p>${active.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</div>
                            <div class = "p-2 bd-highlight view"><p>Recovered</p>${cured.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</div>
                            <div class = "p-2 bd-highlight view"><p>Deceased</p>${death.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</div>
                        
                    </div> `;
}

