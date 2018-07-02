// import { companiesToAdd } from "../actions/list";
export const csvToDb = company => {
  return {
    venture: company.Name,
    source: "Crunchbase",
    description_source: company.Info,
    HQ_source: company.Location,
    laurie_sector_input: company.Business
  };
};

export const newComp = (databases, csv) => {
  let newCompaniesList = [];
  let comp = [];
  let found = false;
  if (databases) {
    const dbArray = Object.keys(databases).map(i => databases[i]);
    // console.log(dbArray.length, "LENGTH OF DATABASES");
    Object.keys(csv).map(company => {
      comp = Object.keys(databases).map((entry, index) => {
        // console.log(index, "INDEX");
        if (databases[entry].venture === csv[company].Name) {
          //if the company is in the csv AND the excel sheet
          found = true;
          // console.log(csv[company].Name, "FOUND IN DATABASES");
          // return;
        } else {
          //this is when the company is not in the excel and we need to add it to new companies
          // newCompaniesList.push(csv[company]);
          if (index == dbArray.length - 1 && !found) {
            newCompaniesList.push(csv[company]);
            // console.log(csv[company], "pushing this");
          } else {
            return;
          }
        }
        // if (!found) ;
        // found = false;
      });
      found = false;
    });
    // found = false;
    // console.log(newCompaniesList, "NEW COMPANIES");
    let stringToPrint = ""
    if (newCompaniesList.length > 0){
      newCompaniesList.map(company => {
        console.log(company.Name)
        stringToPrint += " "
        stringToPrint += company.Name
      })
      // console.log(newList)
      // let outputstring = ""
      // newList.map(company => {outputstring + " " + company})
      // alert(newList[0], " were added to your working sheet")
    }
    // alert(stringToPrint += " were added to your working sheet!")
    // companiesToAdd(newCompaniesList);
    return newCompaniesList;
  }
};

export const changes = (databases, csv) => {
  let changes = [];
  let change = [];
  let comp = [];
  if (databases) {
    Object.keys(csv).map(company => {
      comp = Object.keys(databases)
        .map(entry => {
          if (databases[entry].venture === csv[company].Name) {
            let location;
            if (databases[entry].HQ_source !== csv[company].Location) {
              location = "changed";
            } else {
              location = "same";
            }
            const correctAddress = csv[company].Location.includes(
              "The Netherlands"
            );
            let newAddress = "";
            if (correctAddress === false) {
              console.log(newAddress, "WRONG ADDRESS FOUND");
              return {
                id: databases[entry].id,
                venture: databases[entry].venture,
                csv_location: csv[company].Location,
                HQ_source: databases[entry].HQ_source,
                LOCATION: "not correct"
                // LOCATION: newAddress
              };
            } else {
              return {
                id: databases[entry].id,
                venture: databases[entry].venture,
                csv_location: csv[company].Location,
                HQ_source: databases[entry].HQ_source,
                LOCATION: location
              };
            }
          } else return false;
        })
        .filter(x => {
          if (x !== true) return x;
        });
      // if (comp.length > 1) {
      //   comp.map(entry =>
      //     console.log(
      //       "multiple entries for " + entry.venture + " with ID: " + entry.id
      //     )
      //   );
      // }
      changes.push(comp);
    });
    // console.log(changes, "CHANGES");
  }
  const newChanges = changes.filter(
    entry => entry[0] && entry[0].LOCATION == "changed"
  );
  // const newChanges = changes.map(entry => console.log(entry[0], "entry"))
  // console.log(newChanges, "NEW CHANGES");
  return newChanges
};
