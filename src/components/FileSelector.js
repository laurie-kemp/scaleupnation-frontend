import React, { Component } from "react";
import Papa from "papaparse/papaparse.min.js";
import { updateCSV, companiesToAdd } from "../actions/list";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/FileUpload";
import { newComp, changes } from "../../src/lib/functions";

export class FileSelector extends Component {
  state = {
    docs: null,
    data: null,
    filename: null
  };

  handleChange = selectorFiles => {
    Papa.parse(selectorFiles[0], {
      delimiter: ";",
      escapeChar: '"""',
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData
    });
    this.setState({ filename: selectorFiles[0].name });
  };

  updateData = result => {
    const { updateCSV, databases, csv } = this.props;
    let dbArray = [];
    if (databases) dbArray = Object.keys(databases).map(i => databases[i]);
    let csvArray = [];
    if (csv) csvArray = Object.keys(csv).map(i => csv[i]);


    const data = result.data;
    this.setState({ data });

    updateCSV(this.state.data);
    };

  render() {
    const { databases, csv, companiesToAdd, newCompanies } = this.props;
    const comp = newCompanies
    let dbArray = [];
    if (databases) dbArray = Object.keys(databases).map(i => databases[i]);
    let csvArray = [];
    if (csv) csvArray = Object.keys(csv).map(i => csv[i]);
    if (dbArray.length > 0 && csvArray.length > 0) {
      companiesToAdd(newComp(dbArray, csvArray));
    }
    return (
      <div>
        <input
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={e => this.handleChange(e.target.files)}
        />
        <label htmlFor="contained-button-file">
          {this.state.filename}
          <Button component="div" className="upload-button">
            Upload
            <FileUpload />
          </Button>
        </label>
      </div>
    );
  }
}

const mapStateToProps = ({ databases, csv}) => ({
  databases,
  csv
});

export default connect(
  mapStateToProps,
  { updateCSV, companiesToAdd }
)(FileSelector);
