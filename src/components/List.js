import React from "react";
import { connect } from "react-redux";
import HotTable from "react-handsontable";
import {
  changeCell,
  fetchAllData,
  updateData,
  companiesToAdd
} from "../actions/list";
import { changes, newComp } from "../lib/functions";
import FileSelector from "./FileSelector";
import { fetchUpdates, addUpdate } from "../actions/updates";
import Paper from "@material-ui/core/Paper";

export class List extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAllData();
  }

  render() {
    const { listRed, databases, csv, changes } = this.props;
    let ChangesfromCSV = [];
    if (changes) {
      ChangesfromCSV = Object.keys(changes).map(i => changes[i]);
      ChangesfromCSV.map(change => {
        const dbupdate = {
          HQ_source: change[0].csv_location
        };

        this.props.changeCell(change[0].id, dbupdate);
      });
    }
    let dbArray = [];
    if (databases) dbArray = Object.keys(databases).map(i => databases[i]);
    let columnNames = [];
    if (dbArray[0]) columnNames = Object.keys(dbArray[0]).map(i => i);
    let data = [];
    let values = [];
    if (dbArray) {
      values = dbArray.map(entry => {
        return Object.values(entry).map(i => i);
      });
      const newNames = columnNames.map(name => {
        const ArrayOfStrings = name.split("_");
        return ArrayOfStrings.join(" ");
      });
      data.push(newNames);
      values.map(entry => data.push(entry));
    }

    return (
      <div id="example-component">
        <FileSelector />
        <HotTable
          root="hot"
          settings={{
            data: data.slice(1),
            colHeaders: [
              "id",
              "source",
              "CRM lead gen",
              "CRM status",
              "follow for upcoming edition",
              "venture",
              "website",
              "email",
              "category source",
              "description source",
              "founding date source",
              "HQ source",
              "portfolio awards source",
              "CEO",
              "status",
              "Laurie sector input",
              "sector see list input",
              "is product service<br>business model tech driven",
              "BM focus target clients",
              "business model type",
              "scalable business model",
              "convincing 3P",
              "max employees",
              "no of employees<br>min fte",
              "no of employees<br>max fte",
              "total funding raised EUR",
              "last funding type",
              "product in market",
              "no of funder with<br>entrepreneurial experience",
              "1 non ScaleUp / 2 ScaleUp<br>/ 3 potencial ScaleUp",
              "alive<br>1Y/2N",
              "FTE check complete<br>1Y/2N",
              "remarks",
              "Added on"
            ],
            stretchH: "all",
            autoWrapRow: true,
            rowHeaders: true,
            filters: true,
            columnSorting: true,
            sortIndicator: true,
            contextMenu: true,
            manualRowResize: true,
            manualColumnResize: true,
            onAfterChange: (listRed, source) => {
              if (source !== "loadData") {
                let payload = {
                  id: listRed.length,
                  row: listRed[0][0],
                  column: listRed[0][1],
                  oldValue: listRed[0][2],
                  newValue: listRed[0][3]
                };
                const name = columnNames[payload.column];
                const value = payload.newValue;
                const newPayload = { [name]: value };
                this.props.changeCell(payload.row + 1, newPayload);
                const companyName = databases[payload.row + 1].venture;
                const date = Date.now();
                const update = {
                  company: companyName,
                  columnName: name,
                  change: value
                };
                this.props.addUpdate(update);
              }
            }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ listRed, databases, csv, newCompanies }) => ({
  listRed,
  databases,
  csv,
  changes: changes(databases, csv),
  newCompanies
});

export default connect(
  mapStateToProps,
  { changeCell, fetchAllData, addUpdate }
)(List);
