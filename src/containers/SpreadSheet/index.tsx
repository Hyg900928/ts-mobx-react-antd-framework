import React from 'react'
import Spreadsheet from '@/components/SpreadSheet/src/index';
// import zhCN from 'x-data-spreadsheet/dist/locale/zh-cn';

// Spreadsheet.locale('zh-cn', zhCN);
// console.log(Spreadsheet)
class Sheet extends React.Component {
  componentDidMount() {
    const s = new Spreadsheet(document.getElementById('x-spreadsheet-demo'), { row: { len: 101 }, col: { len: 50 } })
    .loadData({}) // load data
    .change(data => {
        console.log(data);
        console.log(s.validate());
    });
  }

  render() {
    return (
      <div id="x-spreadsheet-demo">

      </div>
    )
  }
}

export default Sheet
